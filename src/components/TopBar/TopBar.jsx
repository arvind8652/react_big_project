import React, { useEffect, useState } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import { Menu, Popover, Badge } from 'antd';
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import dynamicConfig from '../../config/dynamicConfig';

import signOut from '../../assets/img/icons/topbar/signOut.svg';

import { CONSTANTS } from '../../constants/constants';
import { executeLogout } from '../../redux/actions/authActions';
import { executeGetFavourites } from '../../redux/actions/favouriteActions';
import { getTimeStamp } from '../../utils/utils';
import './topBar.scss';

import {
	faBell,
	faCalendar,
	faPlus,
	faSearch,
	faStar,
	faBars
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RenderOrderModal from '../TopBarOptions/QuickAdd/RenderOrderModal';

import { QuickAdd } from '../TopBarOptions/QuickAdd/QuickAdd';

import { Notification } from '../TopBarOptions/Notification';
import { Favourite } from '../TopBarOptions/Favourite/Favourite';
import { Calender } from '../TopBarOptions/Calender/Calender';

import { executeGetQuickAddMenuItems } from '../../redux/actions/topBarActions';
import { executeGetNotifications } from '../../redux/actions/notificationsActions';
import TopSearchMain from '../TopBarSearch/TopSearchMain';
import { getEncryptedString } from '../../api/SSO';

const userDetails = (user, handleSignOut) => {
	let dateTime = getTimeStamp();
	if (!user) return null;
	return (
		<div className='userDetails'>
			<div className='user'>
				<div className='avatarContainer'>
					<Avatar
						size={76}
						className='avatar'
						style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
					>
						{user.profileImage}
					</Avatar>
				</div>
				<div className='userInfo'>
					<div className='userName'>{user.userName}</div>
					<div className='groupName'> {user.groupName}</div>
					<div className='branch'>{user.branch}</div>
				</div>
			</div>
			<div className='userInfoItem'>
				<div className='infoItem'>
					<div> {CONSTANTS.topBar.contact}:</div> <div>{user.mobile}</div>
				</div>
				<div className='infoItem'>
					<div> {CONSTANTS.topBar.mail}:</div>
					<div>{user.email}</div>
				</div>
				<div className='infoItem'>
					<div> {CONSTANTS.topBar.language}: </div>
					<div>{user.language}</div>
				</div>
				<div className='infoItem'>
					<div>{CONSTANTS.topBar.lastSignIn}:</div>{' '}
					<div>
						{moment(user.lastLoginDt).format('HH:mm')}{' '}
						{moment(user.lastLoginDt).format('DD-MM-YYYY')}
					</div>
				</div>
				<div className='infoItem'>
					<div>{CONSTANTS.topBar.systemDate}:</div>
					<div> {moment(dateTime).format('DD-MM-YYYY')}</div>
				</div>
				<div className='infoItem'>
					<div> {CONSTANTS.topBar.curDate}:</div>
					<div> {moment(user.curDate).format('DD-MM-YYYY')}</div>
				</div>
			</div>
			<div className='navItems'>
				{/* <div className="settings">
          <div className="topBarSettings">
            <img src={settings} alt="settings" />
          </div>
          <div> {CONSTANTS.topBar.settings}</div>
        </div> */}
				<div className='signOut' onClick={handleSignOut}>
					<div className='topBarSignOut'>
						<img src={signOut} alt='settings' />
					</div>
					<div>{CONSTANTS.topBar.signOut}</div>
				</div>
			</div>
		</div>
	);
};

const TopBar = (props) => {
	const [isQuickAddVisible, setQuickAddVisible] = useState(false);
	const [selectedNavbar, setSelectedNavbar] = useState(0);
	const [isNotificationVisible, setNotificationVisible] = useState(false);
	const [isFavouriteVisible, setFavouriteVisible] = useState(false);
	const [isOrderModalVisible, setOrderModalVisible] = useState(false);
	const [notificationPresent, setNotificationPresent] = useState(false);

	useEffect(() => {
		executeGetQuickAddMenuItems();

		// POLLING FOR NOTIFICATIONS
		setInterval(() => {
			executeGetNotifications();
		}, 300000);
	}, []);

	const { executeLogout, toggle } = props;
	const user = useSelector((state) => state.auth.user);

	const history = useHistory();
	// const location = useLocation();

	// useEffect(() => {
	//   return () => {
	//     if (history.action === "POP") {
	//       executeLogout(history, "logout");
	//     }
	//   };
	// }, [location]);

	const handleSignOut = () => {
		executeLogout(history, 'logout');
	};

	const toggleQuickAddDrawer = (key) => {
		setSelectedNavbar(key);
		setQuickAddVisible(key);
	};

	const toggleNotificationDrawer = (key) => {
		setSelectedNavbar(key);
		setNotificationVisible(!isNotificationVisible);
	};

	const toggleFavouriteDrawer = (key) => {
		if (!isFavouriteVisible) {
			['PROSPECTADD', 'CLIENTADD', 'OPPORTUNITYADD', 'SECURITY'].map((eachFavourite) =>
				executeGetFavourites(eachFavourite)
			);
		}
		setSelectedNavbar(key);
		setFavouriteVisible(!isFavouriteVisible);
	};

	const renderQuickAddDrawerContent = () => {
		return (
			<QuickAdd
				quickAddMenuItems={props?.quickAddMenuItems}
				setOrderModalVisible={setOrderModalVisible}
				isQuickAddVisible={isQuickAddVisible > 0}
				toggleQuickAddDrawer={toggleQuickAddDrawer}
				onCloseQuickAddDrawer={onCloseQuickAddDrawer}
			/>
		);
	};
	const renderCalenderDrawer = () => {
		return (
			<Calender
				isQuickAddVisible={isQuickAddVisible > 0}
				toggleQuickAddDrawer={toggleQuickAddDrawer}
				onCloseQuickAddDrawer={onCloseQuickAddDrawer}
			/>
		);
	};

	const renderNotificationContent = () => {
		return (
			<Notification
				toggleNotification={toggleNotificationDrawer}
				isNotificationVisible={isNotificationVisible}
				onCloseDrawer={onCloseNotificationDrawer}
				setNotificationPresent={setNotificationPresent}
			/>
		);
	};

	const renderFavouriteContent = () => {
		return (
			<Favourite
				toggleFavourite={toggleFavouriteDrawer}
				isFavouriteVisible={isFavouriteVisible}
				onCloseFavouriteDrawer={onCloseFavouriteDrawer}
			/>
		);
	};

	const renderSearchDrawer = () => {
		return <TopSearchMain visible={isQuickAddVisible > 0} onClose={onCloseQuickAddDrawer} />;
	};

	const onCloseNotificationDrawer = () => {
		setNotificationVisible(false);
	};

	const onCloseFavouriteDrawer = () => {
		setFavouriteVisible(false);
	};

	const onCloseQuickAddDrawer = () => {
		setQuickAddVisible(0);
	};

	const renderNavDrawer = () => {
		switch (selectedNavbar) {
			case 1:
				return renderSearchDrawer();
			case 2:
				return renderFavouriteContent();
			case 3:
				return renderNotificationContent();
			case 4:
				return renderCalenderDrawer();
			case 5:
				return renderCalenderDrawer();
			case 6:
				return renderQuickAddDrawerContent();
			default:
				break;
		}
	};

	// useEffect(() => {
	//   renderNavDrawer()
	// }, [selectedNavbar])
	const userData = useSelector((state) => state.auth.user);

	const backToBackOffice = () => {
		getEncryptedString(userData.userID, userData.authCode).then((res) => {
			let encryptKey = res?.data?.encryptedText;
			window.open(
				`${dynamicConfig.mfundUrl}/UserManagement/autologin/autologin1.aspx?AutoUser_ID=${encryptKey}&authcode=${userData.authCode}`,
				'_self'
			);
			handleSignOut();
		});
	};

	return (
		<div>
			<div>
				<FontAwesomeIcon icon={faBars} onClick={toggle} className='menuIcon' />
			</div>
			<Menu mode='horizontal' className='topMenuBar'>
				{userData.isSSO && <Menu.Item onClick={backToBackOffice}> Back Office</Menu.Item>}

				<Menu.Item onClick={() => toggleQuickAddDrawer(1)} key='1'>
					<FontAwesomeIcon icon={faSearch} className='favicon' />
				</Menu.Item>
				<Menu.Item onClick={() => toggleFavouriteDrawer(2)} key='2'>
					<FontAwesomeIcon icon={faStar} className='favicon' />
				</Menu.Item>
				<Menu.Item onClick={() => toggleNotificationDrawer(3)} key='3'>
					{/* {notificationPresent && */}
					<Badge dot={notificationPresent} color='#CD0000'>
						<FontAwesomeIcon icon={faBell} className='favicon' />
					</Badge>
					{/* } */}
				</Menu.Item>
				<Menu.Item onClick={() => toggleQuickAddDrawer(4)} key='4'>
					<FontAwesomeIcon icon={faCalendar} className='favicon' />
				</Menu.Item>
				{/* <Menu.Item onClick={() => toggleQuickAddDrawer(5)} key="5">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Menu.Item> */}
				<Menu.Item onClick={() => toggleQuickAddDrawer(6)} key='6'>
					<FontAwesomeIcon icon={faPlus} />
				</Menu.Item>
				{/* <Menu.Item key="7">
          <Popover
            placement="bottomRight"
            content={userDetails(user, handleSignOut)}
            overlayClassName="userPopUp"
          >
            <Avatar
              size={32}
              className="avatar"
              style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              U
            </Avatar>
          </Popover>
        </Menu.Item> */}
			</Menu>
			{/* ---------------------- */}
			<Menu mode='horizontal' className='topMenuBar1'>
				<Menu.Item>
					<Popover
						placement='bottomRight'
						content={userDetails(user, handleSignOut)}
						overlayClassName='userPopUp'
					>
						<Avatar
							size={32}
							className='avatar'
							style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
						>
							U
						</Avatar>
					</Popover>
				</Menu.Item>
			</Menu>
			{/* ----------------------- */}
			{renderNavDrawer()}
			<RenderOrderModal isVisible={isOrderModalVisible} setVisible={setOrderModalVisible} />
		</div>
	);
};

const mapDispatchToProps = {
	executeLogout
};

const mapStateToProps = (state) => {
	return {
		quickAddMenuItems: state?.topBar?.quickAddMenuItems
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

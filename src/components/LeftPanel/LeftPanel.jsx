import React from 'react';
import './leftPanel.scss';
import { fetchAsset } from '../../utils/utils';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { fontSet, palette, theme } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Row, Col } from 'antd';
import { connect } from 'react-redux';
import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import { executeSetChildMenuFlag } from '../../redux/actions/dashboardActions';
import { executeSelectedCustomerInfo } from '../../redux/actions/commonActions';
const { SubMenu } = Menu;
const LeftPanel = ({
	leftPanelData,
	expandLeftPanel,
	avatarSize,
	img = '',
	customerInfo,
	childMFlag = false
}) => {
	const [openKeys, setOpenKeys] = React.useState(['']);
	const history = useHistory();
	const { leftPanel } = leftPanelData;
	const { path } = useRouteMatch();
	if (!leftPanelData) return null;

	const navigate = (routeURL) => {
		history.push(`${path}/${routeURL}`);
	};

	const styleSet = {
		bottomNav: {
			position: 'fixed',
			bottom: 0
		},
		menu: {
			backgroundColor: palette.secondary.heavy,
			color: palette.invert.heavy,
			fontSize: fontSet.heading.medium,
			lineHeight: '25px',
			height: '550px',
			border: '0px',
			overflowY: 'scroll',
			overscrollBehavior: 'contain',
			scrollbarWidth: 'thin'
			//   scrollbarColor: palette.secondary.heavy,
		},
		subMenu: {
			fontSize: fontSet.heading.medium,
			color: 'white'
		},
		menuIcon: {
			margin: '20px'
		},
		menuTitle: {
			lineHeight: '25px',
			padding: '19px 0px'
		},
		menuContainer: {
			display: 'flex'
		},
		homeMenu: {
			margin: '0px 20px'
		}
	};
	const collapseStyle = {
		menuIcon: {},
		menuTitle: {
			fontSize: '11px'
		},
		menuContainer: {
			textAlign: 'center',
			lineHeight: '25px'
		},
		homeMenu: {
			margin: '0px -4px'
		},
		home: {
			margin: '0px 20px'
		}
	};

	const renderTitle = (title, icon) => {
		return (
			<div style={expandLeftPanel ? collapseStyle.menuContainer : styleSet.menuContainer}>
				<img
					src={fetchAsset('icon', icon)}
					alt='logo'
					style={expandLeftPanel ? collapseStyle.menuIcon : styleSet.menuIcon}
				/>
				<div style={expandLeftPanel ? collapseStyle.menuTitle : styleSet.menuTitle}>{title}</div>
			</div>
		);
	};

	//Menu Collapse functionality
	let rootSubmenuKeys;
	if (leftPanel) {
		rootSubmenuKeys = leftPanel.map((item, index) => `${index}`);
	}
	const onOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};
	const handleHomeClick = () => {
		// setChildMenuFlag(false)
		executeSetChildMenuFlag(false);
		const customerInfo = {
			customerCode: false
		};
		executeSelectedCustomerInfo(customerInfo);
		history.push('/dashboard');
	};

	return (
		<>
			{leftPanel && (
				<Menu
					theme='light'
					style={styleSet.menu}
					className='scroller'
					mode='inline'
					inlineCollapsed={expandLeftPanel}
					openKeys={openKeys}
					onOpenChange={onOpenChange}
				>
					<Menu.Item style={styleSet.subMenu}>
						<div
							onClick={handleHomeClick}
							style={expandLeftPanel ? collapseStyle.homeMenu : styleSet.homeMenu}
						>
							<FontAwesomeIcon
								icon={faHome}
								style={{
									marginRight: 18,
									fontSize: '1.5rem'
								}}
								size={'1x'}
							></FontAwesomeIcon>
							{!expandLeftPanel ? 'Home' : ''}
						</div>
					</Menu.Item>
					{expandLeftPanel && <div style={collapseStyle.home}>Home</div>}
					{childMFlag && (
						<div style={{ margin: '0px 20px' }}>
							<Row>
								<Col span={8}>
									<AvatarLogo
										imgsrc={customerInfo?.profileImage}
										profileName={customerInfo?.customerName}
										avatarSize={avatarSize || AvatarSize.small}
									/>
								</Col>
								<Col span={16}>
									<div style={{ padding: '8px' }}>
										<div style={theme.secondaryHeader}>{customerInfo?.customerName}</div>
										<div>{customerInfo?.familyName}</div>
									</div>
								</Col>
							</Row>
						</div>
					)}
					{leftPanel ? (
						leftPanel.map((menuItem, index) => {
							return (
								<SubMenu key={index} title={renderTitle(menuItem.title, menuItem.icon)}>
									{menuItem.subMenu !== null &&
										menuItem?.subMenu.map((subMenu) => (
											<Menu.Item
												key={subMenu.id}
												style={styleSet.subMenu}
												onClick={() => navigate(subMenu.routeURL)}
											>
												{subMenu.subMenuTitle}
											</Menu.Item>
										))}
								</SubMenu>
							);
						})
					) : (
						<></>
					)}
					{/* {leftPanel !== null ? leftPanel.map((menuItem, index) => (
            <SubMenu
              key={index}
              title={renderTitle(menuItem.title, menuItem.icon)}
            >
              {menuItem?.subMenu.map((subMenu) => (
                <Menu.Item
                  key={subMenu.id}
                  style={styleSet.subMenu}
                  onClick={() => navigate(subMenu.routeURL)}
                >
                  {subMenu.subMenuTitle}
                </Menu.Item>
              ))}
            </SubMenu>
          )) : ''} */}
				</Menu>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		customerInfo: state.common.customerInfo
	};
};

export default connect(mapStateToProps)(LeftPanel);

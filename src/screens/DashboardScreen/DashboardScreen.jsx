import React, { useState, useEffect } from 'react';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import TopBar from '../../components/TopBar/TopBar';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	executeGetLeftPanelData,
	executeGetClientLeftPanelData
} from '../../redux/actions/dashboardActions';
import {
	executeSelectedCustomerInfo,
	executeClearReduxStore
} from '../../redux/actions/commonActions';
import DashboardRouter from '../../navigation/DashboardRouter';
import './dashboardScreen.scss';
import { executeLogout } from '../../redux/actions/authActions';
import { Layout, Popover } from 'antd';
import shortLogo from '../../assets/img/logos/shortLogo.svg';
import threeILogo from '../../assets/img/logos/3i.svg';
import { fetchAsset } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons';
import { palette, theme } from '../../theme';
import '../../components/TopBar/topBar.scss';

import '../../antd-override.scss';

const { Header, Sider, Content } = Layout;
const DashboardScreen = (props) => {
	const {
		executeGetLeftPanelData,
		executeGetClientLeftPanelData,
		executeClearReduxStore,
		executeLogout,
		leftPanelData,
		auth,
		childMenuFlag,
		ClientID = 'WMSJ001',
		customerInfo
	} = props;
	const [collapsed, setCollapsed] = useState(false);
	const { leftPanelBottomNav } = leftPanelData;

	const toggle = () => {
		setCollapsed(!collapsed);
	};
	const history = useHistory();

	//   call left panel api
	useEffect(() => {
		const user = (auth && auth.user) || '';
		// if user object is not there or if user object is there but token is not there
		if (!user || (user && !user.token)) {
			// execute clear redux store
			executeClearReduxStore();
			history.push('/login');
		}
		//  childMenuFlag && childMenuFlag === false &&
		if (user && user !== '' && user.token) {
			if (childMenuFlag) {
				executeGetClientLeftPanelData(customerInfo?.customerCode);
			} else executeGetLeftPanelData();
		}
	}, [childMenuFlag]);

	// window.onbeforeunload = () => {
	//   executeLogout();
	// };

	const leftPanelBottomNavMorePopOver = (bottomNav) => {
		return (
			<div className='smallLeftPanelPopup'>
				{bottomNav &&
					bottomNav.map((item, index) => {
						if (index < 3) return null;
						return (
							<div className='popupContent' key={index}>
								<img src={fetchAsset('icon', item.icon)} alt='logo' className='icon' />
								<div
									className='popupTitle'
									onClick={() => history.push('/dashboard/' + item.routeURL)}
								>
									{item.subMenuTitle}
								</div>
							</div>
						);
					})}
			</div>
		);
	};

	const styleSet = {
		topBar: {
			height: '72px',
			backgroundColor: palette.invert.heavy,
			borderBottomLeftRadius: '8px',
			position: 'sticky',
			top: 0,
			zIndex: 1000
		},
		topNavContainer: {
			display: 'flex',
			justifyContent: 'space-between'
		},
		sider: {
			backgroundColor: palette.secondary.heavy,
			borderBottomRightRadius: '16px',
			height: '101vh',
			position: 'sticky',
			top: 0,
			left: 0
			// overflow: "scroll",
		},
		content: {
			margin: '24px 16px 0',
			overflowX: 'scroll',
			padding: 24
		},
		bottomNav: {
			padding: '10px',
			position: 'absolute',
			width: '100%',
			bottom: '10px',
			borderTop: '1px solid #F0F2FB',
			backgroundColor: palette.secondary.heavy
		}
	};

	const collapseStyle = {
		iconSet: {},
		icon: {
			padding: '8px'
			// display: "block",
		}
	};
	const handle3iLogoClick = () => {
		const customerInfo = {
			customerCode: false
		};
		executeSelectedCustomerInfo(customerInfo);
		history.push('/dashboard');
	};
	const callEvent = (navItem) => {
		if (navItem.subMenuTitle === 'Calendar') {
			history.push('/dashboard/Calendar');
		}
		if (navItem.subMenuTitle === 'Profile') {
			history.push('/dashboard/profile');
		}
		if (navItem.subMenuTitle === 'Documents') {
			history.push('/dashboard/documentManager');
		}
	};
	return (
		<Layout>
			<Sider
				width={280}
				trigger={null}
				collapsedWidth={80}
				collapsible
				collapsed={collapsed}
				style={styleSet.sider}
			>
				<div style={styleSet.topBar}>
					<img
						src={collapsed ? shortLogo : threeILogo}
						onClick={handle3iLogoClick}
						alt='logo'
						className={collapsed ? 'topBarShortLogo' : 'topBarLogo'}
					/>
				</div>
				<LeftPanel
					expandLeftPanel={collapsed}
					childMFlag={childMenuFlag}
					leftPanelData={leftPanelData}
				/>
				<div style={styleSet.bottomNav}>
					{leftPanelBottomNav && (
						<div style={collapsed ? collapseStyle.iconSet : theme.justify}>
							{leftPanelBottomNav?.subMenu.map((navItem, index) => {
								if (index < 3) {
									return (
										<img
											key={index}
											src={fetchAsset('icon', navItem.icon)}
											alt='logo'
											style={collapsed ? collapseStyle.icon : {}}
											onClick={() => callEvent(navItem)}
										/>
									);
								}
								return null;
							})}

							{leftPanelBottomNav.subMenu.length > 3 && (
								<Popover
									placement='rightBottom'
									content={leftPanelBottomNavMorePopOver(leftPanelBottomNav.subMenu)}
								>
									<FontAwesomeIcon icon={faEllipsisH} style={{ color: '#d8e6fd' }} size='2x' />
								</Popover>
							)}
						</div>
					)}
				</div>
			</Sider>

			<Layout>
				<Header style={styleSet.topBar}>
					<TopBar toggle={toggle} />
				</Header>
				<Content
					// className="content"
					style={styleSet.content}
				>
					<DashboardRouter />
				</Content>
			</Layout>
		</Layout>
		// <div className="main-dashboard-screen">

		// </div>
	);
};
const mapStateToProps = (state) => {
	return {
		auth: state.auth || '',
		leftPanelData: state.dashboard || '',
		childMenuFlag: state.dashboard.childMenuFlag || false,
		customerInfo: state.common.customerInfo
	};
};
const mapDispatchToProps = {
	executeGetLeftPanelData,
	executeGetClientLeftPanelData,
	executeClearReduxStore,
	executeLogout
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

import { Row, Col, Divider } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { CloseOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { faChartLine, faStreetView, faUserFriends } from '@fortawesome/pro-light-svg-icons';

import GenericDrawer from '../../components/GenericDrawer/GenericDrawer';

import {
	executeUpdateNotifications,
	executeGetNotifications
} from '../../redux/actions/notificationsActions';

import '../TopBar/topBar.scss';
import { useEffect } from 'react';

const defaultValue = [
	{
		notificationDate: '2021-05-19T18:45:30.803',
		eventType: 'AutoApprove',
		title: 'PROSPECTADD',
		message: 'Your PROSPECTADD PSGLOBAL2021100340 is approved',
		tagName: 'Prospect',
		name: 'Vinodd Adhikarii',
		status: 'READ',
		notificationId: 2,
		purpose: 'CONVERTED'
	},
	{
		notificationDate: '2021-05-19T18:47:18.84',
		eventType: 'AutoApprove',
		title: 'PROSPECTADD',
		message: 'Your PROSPECTADD PSGLOBAL2021100341 is approved',
		tagName: 'Prospect',
		name: 'Vinodd1 Adhikari1',
		status: 'NEW',
		notificationId: 3,
		purpose: 'CONVERTED'
	}
];

const styles = {
	desc: { color: '#696A91' },
	darkest: { color: 'rgba(34, 39, 71, 1)' },
	divider: { backgroundColor: '#CBD6FF' },
	bottomTab: {
		bottom: '0',
		position: 'absolute',
		backgroundColor: 'white',
		width: '100%',
		padding: '15px 0'
	},
	clearAllText: {
		color: '#5D6DD1',
		textAlign: 'right',
		fontSize: '16px',
		margin: '-30px -20px -20px 1px',
		backgroundColor: '#FFFFFF',
		padding: '10px 1px 10px 200px'
	},
	date: { fontSize: '12px', textAlign: 'right' },
	closeIcon: {
		position: 'absolute',
		right: '10px',
		bottom: '85px'
	},
	iconStyle: {
		height: '63px',
		width: '63px'
	}
};

const NotificationBody = ({ notifications = defaultValue, setNotifications }) => {
	const setAsRead = (notificationId, index) => {
		executeUpdateNotifications({ notificationId: notificationId.toString() });
		let notificationsTemp = notifications;
		notificationsTemp.splice(index, 1);
		setNotifications([...notificationsTemp]);
	};

	useEffect(() => {}, [notifications]);

	const displayIconForNotification = (type) => {
		switch (type) {
			case 'Prospect':
			case 'Lead':
				return faUserFriends;
			case 'Opportunity':
				return faChartLine;
			case 'Client':
				return faStreetView;
			default:
				return faChartLine;
		}
	};
	useEffect(() => {}, [notifications]);

	const history = useHistory();
	const allCustomerOnboardingData = useSelector(
		(state) => state.customerOnboardingListing.allCustomerOnboarding
	);

	const getNotification = (eachNotification) => {
		//   const {lstOnboardingResponse} = allCustomerOnboardingData;
		//   const filterClientRequisitionN = lstOnboardingResponse.find(each=>each.clientRequisitionN === eachNotification.keyVal1)
		//   const {clientRequisitionN, customerCode} = filterClientRequisitionN

		if (eachNotification.progName === 'CLIENTREQADD') {
			history.push('/dashboard/MyCustomer/Onboarding/CustomerView', {
				customerOnboardingtIds: [eachNotification.keyVal1],
				rowIndex: 0,
				allCustomerOnboarding: allCustomerOnboardingData
			});
			return;
		}
	};

	return (
		<>
			{notifications.length > 0 &&
				notifications.map((eachNotification, notificationIndex) => (
					<div
						className='notificationColumn'
						onClick={() => getNotification(eachNotification)}
						key={eachNotification.notificationId}
					>
						<Row justify='space-around' align='middle'>
							<Col span={6}>
								<FontAwesomeIcon
									icon={displayIconForNotification(eachNotification.tagName)}
									style={{ ...styles.darkest, ...styles.iconStyle }}
									className='notificationIcon'
								/>
							</Col>
							<Col span={12}>
								<h4 style={styles.darkest}>
									{eachNotification.title} {eachNotification.purpose}
								</h4>
								<p style={styles.desc}>{eachNotification.message}</p>
							</Col>
							<Col span={6}>
								<CloseOutlined
									style={styles.closeIcon}
									className='closeIcon'
									onClick={() => {
										setAsRead(eachNotification.notificationId, notificationIndex);
									}}
								/>
								<p style={{ ...styles.darkest, ...styles.date }}>
									{moment(eachNotification.notificationDate).format('DD MMM YYYY')}
								</p>
								<p style={styles.darkest} title={eachNotification.name} className='userName'>
									{eachNotification.name}
								</p>
								<span style={styles.desc}>{eachNotification.tagName}</span>
							</Col>
						</Row>
						<Divider style={styles.divider} />
					</div>
				))}
		</>
	);
};

export const Notification = ({
	toggleNotification,
	isNotificationVisible,
	onCloseDrawer,
	setNotificationPresent
}) => {
	useEffect(() => {
		executeGetNotifications();
	}, []);

	const [notifications, setNotifications] = useState(defaultValue);
	const notificationsData = useSelector((state) => state.notifications.notifications);

	useEffect(() => {
		setNotifications(notificationsData);
		if (Array.isArray(notificationsData) && notificationsData.length > 0) {
			setNotificationPresent(true);
		}
	}, [notificationsData]);

	return (
		<GenericDrawer
			showDrawer={isNotificationVisible}
			onCloseDrawer={onCloseDrawer}
			renderBody={
				<NotificationBody notifications={notifications} setNotifications={setNotifications} />
			}
			renderFooter={
				<p
					onClick={() => {
						setNotifications([]);
						setNotificationPresent(false);
						executeUpdateNotifications({ notificationId: null });
					}}
					style={styles.clearAllText}
				>
					Clear All Notifications
				</p>
			}
		/>
	);
};

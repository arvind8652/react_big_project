import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Popover, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'antd/dist/antd.css';
import {
	faBirthdayCake,
	faPhoneAlt,
	faUserFriends,
	faFile,
	faEnvelope,
	faCommentLines,
	faCheckDouble
} from '@fortawesome/pro-regular-svg-icons';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import { palette, fontSet, theme } from '../../theme';
import moment from 'moment';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import GenericBadge from '../../components/GenericBadge/GenericBadge';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { useHistory } from 'react-router-dom';
import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { exportJSON } from '../../utils/utils';
import { ScButtonText } from '../../components/StyledComponents/genericElements';
const { Text } = Typography;

const EventDataScreen = ({ eventData, viewAll, tabType, meatballOptions }) => {
	const history = useHistory();
	const rowStyle = {
		// margin: "12px 0px",
	};

	const styleSet = {
		amountBlock: {
			fontSize: fontSet.heading.large
		},
		rowStyle: {
			marginBottom: '30px'
		},
		avatarBody: {
			lineHeight: '12px',
			margin: '30px 15px 5px'
		},
		rowAlign: {
			margin: '5px 13px'
		},
		birthDay: {
			width: 21,
			height: 24,
			color: palette.secondary.light,
			margin: '5px'
		},
		activity: {
			// width: 21,
			height: 16,
			color: palette.secondary.light,
			margin: '0px 5px'
		}
	};

	const feedsStyle = {
		button: {
			borderRadius: '8px',
			fontSize: '22px',
			width: 'max-content'
		},
		buttonCal: {
			border: '1px solid #6674c7',
			borderRadius: '8px',
			fontSize: '18px',
			color: '#6674c7',
			marginLeft: '5%'
		}
	};

	const data = [
		{
			id: 0,
			type: 'AUM',
			rank: 60,
			totalAmount: 400,
			name: 'Chris Ramdos',
			role: 'Prospect',
			address: 'New York City Area',
			date: '31 Mar 2021',
			subject: 'Birthday',
			activityPurpose: '32nd birthday for Jonathan Doe'
		},
		{
			id: 1,
			type: 'Revenue',
			rank: 100,
			totalAmount: 400,
			name: 'Chris Ramdos',
			role: 'Prospect',
			address: 'New York City Area',
			date: '31 Mar 2021',
			subject: 'Birthday',
			activityPurpose: '32nd birthday for Jonathan Doe'
		},
		{
			id: 2,
			type: 'Convertion',
			rank: 23,
			totalAmount: 400,
			name: 'Chris Ramdos',
			role: 'Prospect',
			address: 'New York City Area',
			date: '31 Mar 2021',
			subject: 'Birthday',
			activityPurpose: '32nd birthday for Jonathan Doe'
		}
	];

	const [eventList, setEventList] = useState(data);

	const apiData = eventData?.map((item, index) => {
		return {
			id: index,
			type: item.profileInitial,
			rank: 23,
			totalAmount: 400,
			name: item.name,
			role: item.tagName,
			address: 'New York City Area',
			date: item.activityDate,
			subject: item.subject,
			activityPurpose: item.activityPurpose,
			activityType: item.activityType,
			activityStatus: item.activityStatus,
			profileImage: item.profileImage,
			refId: item.refID
		};
	});

	useEffect(() => {
		setEventList(apiData);
	}, [eventData]);

	const setActivityIcon = (activity) => {
		switch (activity) {
			case 'BirthDay':
				return faBirthdayCake;
			case 'Call':
				return faPhoneAlt;
			case 'Meeting':
				return faUserFriends;
			case 'Document Expired':
				return faFile;
			case 'Email':
				return faEnvelope;
			case 'Chat':
				return faCommentLines;
			default:
				return faCheckDouble;
		}
	};

	function handleCreateInteractionClick() {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	}

	function handleCreateOpportunityClick() {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate'
		};

		history.push(toObject);
	}

	const handleUpdateProspectClick = (prospectId) => {
		const toObject = {
			pathname: '/dashboard/MyProspect/ProspectCreate',
			state: { screen: 'list', data: prospectId?.prospectClientData?.refId, action: 'edit' }
		};
		const toObject2 = {
			pathname: '/dashboard/MyCustomers/CustomerEdit',
			state: { refID: prospectId?.prospectClientData?.refId, action: 'edit', refType: 'CLIENTADD' }
		};
		if (prospectId?.prospectClientData?.role === 'Prospect') {
			history.push(toObject);
		}
		if (prospectId?.prospectClientData?.role === 'Client') {
			history.push(toObject2);
		}
	};

	// const handleEditInteractionClick = (activityID) => {
	//   const toObject = {
	//     pathname: "/dashboard/MyInteractions/InteractionCreate",
	//   }

	//   history.push(toObject);
	// }

	function handleCreateInteractionClick() {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	}

	const handleCreateTaskClick = (id, toObject) => {
		toObject = {
			pathname: `/dashboard/TaskBoard/TaskCreate`
			// state: { screen: "list", data: id, mode: "edit" },
		};
		history.push(toObject);
	};

	function handleCreateOpportunityClick() {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate'
		};

		history.push(toObject);
	}

	// const handleUpdateProspectClick = (prospectId) => {
	//   const toObject = {
	//     pathname: "/dashboard/MyProspect/ProspectCreate",
	//     state: { screen: "list", data: prospectId, mode: "edit" },
	//   };
	//   history.push(toObject);
	// };

	// const handleEditInteractionClick = (activityID, dataObject) => {
	//   const toObject = {
	//     pathname: "/dashboard/MyInteractions/InteractionCreate",
	//     state: { screen: "list", data: activityID, mode: "edit", dataObject },
	//   };

	//   history.push(toObject);
	// };

	const renderMoreOptions = (opportunityId, dataObject) => {
		const content = () => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{meatballOptions.map((option, index) => {
					return (
						<div key={index} className={`row-action-option`}>
							<span
								onClick={() => {
									if (tabType === 'Interactions') {
										// setSelectedRowKeys([...selectedRowKeys, id]);
										// setSelectedRows([...selectedRows, dataObject]);
										// option.toLowerCase() === "edit" && handleEditInteractionClick(id, dataObject);
										// option.toLowerCase() === "close" && handleCloseInteractionClick(id, dataObject);
										option.toLowerCase() == 'create task' &&
											// handleCreateTaskClick(id, dataObject);
											handleCreateTaskClick();
										//   option.toLowerCase() == "take note" && setShowTitleStageModal(true);
										option.toLowerCase() == 'create new interaction' &&
											handleCreateInteractionClick();
										option.toLowerCase() == 'create opportunity' && handleCreateOpportunityClick();
										option.toLowerCase() == 'update prospect/client' &&
											handleUpdateProspectClick(dataObject);
									} else if (tabType == 'Tasks') {
										// setSelectedRowKeys([...selectedRowKeys, activityID]);
										// setSelectedRows([...selectedRows, dataObject]);
										// option.toLowerCase() == "edit" &&
										//   handleEditInteractionClick();
										option.toLowerCase() == 'create task' &&
											// handleCreateTaskClick(id, dataObject);
											handleCreateTaskClick();
										option.toLowerCase() == 'create new interaction' &&
											handleCreateInteractionClick();
										option.toLowerCase() == 'create opportunity' && handleCreateOpportunityClick();
										option.toLowerCase() == 'update prospect/client' &&
											handleUpdateProspectClick(dataObject);
									}
								}}
							>
								{option}
							</span>
						</div>
					);
				})}
			</div>
		);
		return (
			<div className='col-more'>
				<Popover
					placement='bottomLeft'
					content={content}
					overlayClassName='opportunity-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};

	const tablecolumns = [
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			align: 'left'
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			align: 'left'
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		},
		{
			title: 'Purpose',
			dataIndex: 'purpose',
			key: 'purpose',
			align: 'left'
		},
		{
			title: 'Client/ Prospect Name',
			dataIndex: 'clientProspectName',
			key: 'clientProspectName',
			align: 'left'
		},

		{
			title: '',
			dataIndex: 'menu',
			key: 'menu',
			render: (opportunityId, dataObject) => renderMoreOptions(opportunityId, dataObject)
		}
	];

	const dataSource = eventList?.map((item, index) => {
		return {
			key: index,
			prospectClientData: item,
			subject: (
				<>
					<div style={theme.secondaryHeader}>{item.subject}</div>
					<GenericBadge badgeBody={item.activityStatus}></GenericBadge>
				</>
			),
			type: (
				<>
					<FontAwesomeIcon icon={setActivityIcon(item.activityType)} style={styleSet.activity} />
					{item.activityType}
				</>
			),
			date: (
				<>
					<span style={theme.smallText}>{moment(item.date).format('DD MMM YYYY')}</span>
				</>
			),
			purpose: (
				<>
					<div>
						<h3>{item.activityPurpose}</h3>
					</div>
				</>
			),
			clientProspectName: (
				<>
					<Row>
						<Col>
							<AvatarLogo
								imgsrc={item.profileImage}
								profileName={item.type}
								avatarSize={AvatarSize.extrasmall}
							/>
						</Col>
						<Col>
							<div style={styleSet.rowAlign}>
								<div style={theme.secondaryHeader}>{item.name}</div>
								<div style={theme.tertiaryBody}>{item.role}</div>
							</div>
						</Col>
					</Row>
				</>
			)
		};
	});

	const downloadRecords = () => {
		const downloadData =
			eventList &&
			eventList.length > 0 &&
			eventList.map((item, index) => ({
				'Sr.No': index + 1,
				Subject: item.subject,
				Type: item.activityType,
				Date: moment(item.date).format('DD MMM YYYY'),
				Purpose: item.activityPurpose,
				'Client/Prospect Name': item.name,
				Role: item.role
			}));

		exportJSON(downloadData, tabType);
	};

	const openBigCalendar = () => {
		const toObject = {
			pathname: `/dashboard/Calendar`
		};
		history.push(toObject);
	};

	const [visible, setVisible] = useState(false);

	const viewClick = (event) => {
		setVisible(true);
	};

	return (
		<>
			{eventList?.slice(0, 3).map((item) => (
				<Row key={item.id}>
					<Col span={24}>
						<Row>
							<Col span={24}>
								{tabType === 'Reminder' ? (
									<Row>
										<Col>
											<Row>
												<Col span={24} style={theme.dFlex}>
													<FontAwesomeIcon
														icon={setActivityIcon(item.subject)}
														style={styleSet.birthDay}
													/>
													<div style={theme.secondaryHeader}>{item.subject}</div>
												</Col>
											</Row>
											<Row>
												<Col span={24}>
													<div>
														{/* <h3 style={{fontSize:"1.1vw"}}>{item.activityPurpose}</h3> */}
														<h3 style={{ fontSize: '1.1vw' }}>
															<Text
																ellipsis={true}
																title={item.activityPurpose}
																style={theme.secondaryHeader}
															>
																{item.activityPurpose}
															</Text>
														</h3>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
								) : (
									<Row>
										<Col span={24}>
											<Row>
												<Col>
													<div style={theme.secondaryHeader}>{item.subject}</div>
													{/* <div>{item.activityPurpose}</div> */}
													<div>
														<Text
															ellipsis={true}
															title={item.activityPurpose}
															style={theme.secondaryHeader}
														>
															{item.activityPurpose}
														</Text>
													</div>
												</Col>
											</Row>
											<Row>
												<Col span={12}>
													<FontAwesomeIcon
														icon={setActivityIcon(item.activityType)}
														style={styleSet.activity}
													/>
													{item.activityType}
												</Col>
												<Col span={12} style={theme.textRight}>
													<GenericBadge badgeBody={item.activityStatus}></GenericBadge>
												</Col>
											</Row>
										</Col>
									</Row>
								)}

								<Row style={styleSet.rowStyle} gutter={6}>
									<Col span={4}>
										<AvatarLogo
											imgsrc={item.profileImage}
											profileName={item.type}
											avatarSize={AvatarSize.extrasmall}
										/>
									</Col>
									<Col span={12}>
										<div style={styleSet.rowAlign}>
											<Text ellipsis={true} title={item.name} style={theme.secondaryHeader}>
												{item.name}
											</Text>
											<br />
											<Text style={theme.tertiaryBody}> {item.role}</Text>
										</div>
									</Col>
									<Col span={8}>
										<div style={styleSet.rowAlign}>
											<Text
												ellipsis={true}
												title={moment(item.date).format('DD MMM YYYY')}
												style={theme.extrasmall}
											>
												{moment(item.date).format('DD MMM YYYY')}
											</Text>
											<br />
											<Text style={theme.tertiaryBody}> Date</Text>
										</div>
										{/* <Row>
                          <div>
                            <span style={theme.secondaryHeader}>
                              {moment(item.date).format("DD MMM YYYY")}
                            </span>
                          </div>
                        </Row>
                        <Row style={styleSet.rowAlign}>
                          <Col>Date</Col>
                        </Row> */}
									</Col>
								</Row>
							</Col>
						</Row>
						{/* <Divider style={{ marginTop: 5, marginBottom: 5 }} /> */}
					</Col>
				</Row>
			))}
			<Row>
				{/* <Col span={8} offset={16}> */}
				<Col span={24} align='right'>
					{tabType !== 'Reminder' && (
						<Button size={'large'} style={feedsStyle.buttonCal} onClick={viewClick}>
							View All
						</Button>
					)}
					<Button size={'large'} style={feedsStyle.buttonCal} onClick={openBigCalendar}>
						View Calendar
					</Button>
				</Col>
			</Row>
			<CustomModal
				visible={visible}
				width={'80vw'}
				closable={true}
				handleCancel={() => setVisible(false)}
				handleOk={() => setVisible(true)}
				title={tabType}
			>
				<Table columns={tablecolumns} dataSource={dataSource} />
				<ScButtonText
					type='text'
					margin='18px 0 0 auto'
					padding='4px 15px'
					position='absolute'
					bottom='20px'
					right='0px'
					left='auto'
					color='#354081'
					onClick={() => {
						downloadRecords();
					}}
				>
					<FontAwesomeIcon icon={faDownload} />
					&nbsp;&nbsp;Download report
				</ScButtonText>
			</CustomModal>
		</>
	);
};
export default connect()(EventDataScreen);

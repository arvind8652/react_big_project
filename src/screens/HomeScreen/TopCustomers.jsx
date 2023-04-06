import { React, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Avatar, Button, Card, Popover, Row, Col, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsisHAlt,
	faSnowflake,
	faStar as faStarOutlined
} from '@fortawesome/pro-light-svg-icons';
import { faFire, faStar } from '@fortawesome/pro-solid-svg-icons';
import { faClipboardCheck } from '@fortawesome/pro-regular-svg-icons';
import axios from 'axios';
import { getOpenTaskApi } from '../../api/EngagementOverviewApi';
import { useHistory } from 'react-router-dom';
import { palette, theme } from '../../theme';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';

const { Text } = Typography;

const TopCustomers = () => {
	const [loading, setLoading] = useState();
	const [openTask, setOpenTask] = useState();
	const [taskModalShow, setTaskModalShow] = useState(false);
	const history = useHistory();
	useEffect(() => {
		axios
			.all([getOpenTaskApi()])
			.then(
				axios.spread((...responses) => {
					setOpenTask(responses[0].data);
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	const RenderMiniRecentTableSection = ({ data }) => {
		const RenderClientProspectProfile = ({ record }) => (
			<div className='profile'>
				<div style={{ width: '106px', height: '106px', fontSize: '1vw' }}>
					<AvatarLogo
						imgsrc={record.profileImage}
						profileName={record.profileInitial}
						avatarSize={AvatarSize.aboveMedium}
					/>
					{/* {record.profileImage === null || record.profileImage === "U" ? (
                        <div>{record.profileInitial}</div>
                    ) : (
                            <Avatar
                                size={56}
                                className="avatar"
                                style={{ color: "#f56a00", backgronudColor: "#fde3cf" }}
                                icon={
                                    <img
                                        src={`data:image/jpeg;base64,${record.profileImage}`}
                                        alt="I"
                                    />
                                }
                            />
                        )} */}
				</div>
			</div>
		);

		const RenderRow = ({ record, index }) => {
			return (
				<div className={`record ${index === 0 ? 'first' : index === 2 ? 'last' : ''}`}>
					<Col>
						<Row justify='space-between'>
							<Row>
								<RenderClientProspectProfile record={record} />

								<Col style={{ marginLeft: 5 }}>
									<div className='header'>
										<Row justify='space-between'>
											<span style={{ fontWeight: 'bold', fontSize: 22 }}>
												{/* {record.activityDetail.subject} */}
												{'Peter Dudchenko'}
											</span>
											<div style={{ justify: 'space-between' }}>
												<FontAwesomeIcon
													icon={faStar}
													size='2x'
													style={{
														marginRight: 15,
														color: palette.primary.main
													}}
													className='row-actions-menu-icon'
												/>

												<FontAwesomeIcon
													icon={faEllipsisHAlt}
													size='2x'
													style={{ color: palette.primary.main }}
													className='row-actions-menu-icon'
												/>
											</div>
											<div className='more'>{/* <RenderMoreOptions record={record} /> */}</div>
										</Row>
									</div>
									<span style={{}}>
										{/* {record.activityDetail.activityPurpose} */}
										{'Asan102104 | Dudchenko Family'}
									</span>

									<Row justify='space-between'>
										<Col style={{ marginLeft: '10px', marginTop: '10px' }}>
											<Row>
												<Col style={{ marginRight: 5 }}>
													<Avatar size={40}>{'#1'}</Avatar>
												</Col>
												<Col>
													<div>
														<span style={{ fontWeight: 'bold' }}>
															{/* {record.name} */}
															{'$450,000'}
														</span>
													</div>
													<div>
														<span> {'AUM'}</span>
													</div>
												</Col>
											</Row>
										</Col>
										<Col style={{ marginTop: '10px' }}>
											<Row>
												<Col style={{ marginRight: 5 }}>
													<Avatar size={40}>{'#5'}</Avatar>
												</Col>
												<Col>
													<div>
														<span style={{ fontWeight: 'bold' }}>
															{/* {moment(record.activityDetail.activityDate).format(
                                            "DD MMM YYYY"
                                        )} */}
															{'$450,000'}
														</span>
													</div>
													<div>
														<span> {'Revenue'}</span>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
								</Col>
							</Row>
						</Row>
					</Col>
				</div>
			);
		};
		return (
			<div className='mini-table'>
				{data.map((record, index) => {
					return index < 3 ? <RenderRow record={record} index={index} /> : null;
				})}
			</div>
		);
	};
	const RenderMoreOptions = ({ record }) => {
		const options = [
			'Edit',
			'Close',
			'Take Note',
			'Create New Interaction',
			'Create Task',
			'Create Opportunity',
			'Update Prospect/Client'
		];

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
				state: { screen: 'listing', data: prospectId }
			};
			history.push(toObject);
		};

		const handleEditInteractionClick = (activityID) => {
			const toObject = {
				pathname: '/dashboard/MyInteractions/InteractionCreate'
			};

			history.push(toObject);
		};

		const content = () => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								option.toLowerCase() == 'edit' && handleEditInteractionClick();
								option.toLowerCase() === 'create new interaction' && handleCreateInteractionClick();
								option.toLowerCase() === 'create opportunity' && handleCreateOpportunityClick();
								option.toLowerCase() === 'update prospect/client' && handleUpdateProspectClick();
							}}
						>
							{option}
						</span>
					</div>
				))}
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

	function prospectColumns(data) {
		return [
			{
				title: 'Name',
				// dataIndex: data.firstName,
				render: (data) => (
					<Row justify='center'>
						<Space>
							<AvatarLogo
								imgsrc={data.profileImage}
								profileName={data.profileInitial}
								avatarSize={AvatarSize.medium}
							/>
							<Space direction='vertical' size={2}>
								<Text
									style={{
										fontWeight: '600'
									}}
								>
									{data.firstName}
								</Text>
								<Space>
									<Text
										style={{
											backgroundColor: '#F0F2FB',
											color: '#354081',
											padding: '2px 10px',
											borderRadius: '20px',
											fontSize: '12px',
											marginRight: '2px'
										}}
									>
										{data.category}
									</Text>
									{data.interestlevel === 'Hot' ? (
										<FontAwesomeIcon
											icon={faFire}
											size='1x'
											color='orange'
											className='socialList'
										/>
									) : (
										<FontAwesomeIcon icon={faSnowflake} className='socialList' color='#56B8BE' />
									)}
									{data.qualificationStatus === 'Qualified' ? (
										<FontAwesomeIcon
											icon={faClipboardCheck}
											className='socialList'
											color='#696A91'
										/>
									) : (
										<FontAwesomeIcon icon={faClipboardCheck} className='socialList' color='red' />
									)}
								</Space>
							</Space>
						</Space>
					</Row>
				)
			},
			{
				title: 'Contact',
				// dataIndex: data.mobile,
				render: (data) => (
					<Row justify='center'>
						<Space direction='vertical' size={2}>
							{data.mobile}
							{data.email}
						</Space>
					</Row>
				)
			},
			{
				title: 'Source',
				// dataIndex: data.source,
				render: (data) => {
					return <Row justify='center'>{data.source}</Row>;
				}
			},
			{
				title: 'Type',
				// dataIndex: data.sourceType,
				render: (data) => {
					return <Row justify='center'>{data.sourceType}</Row>;
				}
			},
			{
				title: 'Relationship Manager',
				// dataIndex: data.relationshipManager,
				render: (data) => {
					return <Row justify='center'>{data.relationshipManager}</Row>;
				}
			},
			{
				title: '',
				// dataIndex: data,
				render: (data) => {
					const { value, setter } = data;
					return (
						<Row justify='center'>
							<Button type='text' shape='circle' onClick={() => setter(!value)}>
								{value ? (
									<FontAwesomeIcon icon={faStar} color='#354081' />
								) : (
									<FontAwesomeIcon icon={faStarOutlined} color='#354081' />
								)}
							</Button>
						</Row>
					);
				}
			},
			{
				title: '',
				render: () => (
					<Row justify='center'>
						{/* <Dropdown
                            className="menu-dropdown"
                            overlay={<MenuOverlay menu={menuItems} />}
                            placement="bottomRight"
                        > */}
						<Button type='text'>
							<FontAwesomeIcon icon={faEllipsisHAlt} size='lg' color='#354081' />
						</Button>
						{/* </Dropdown> */}
					</Row>
				)
			}
		];
	}
	return (
		<Card
			loading={loading}
			className='prospects-card'
			title='Top Customers'
			style={theme.cardStyle}
		>
			{openTask && <RenderMiniRecentTableSection data={openTask} />}
			<div className='view-all-btn'>
				<Button onClick={() => setTaskModalShow(true)}>View All</Button>
				{/* <RecentModal
                    data={openTask}
                    showModal={taskModalShow}
                    setShowModal={(val) => setTaskModalShow(val)}
                    columns={prospectColumns(openTask)}
                    title={<h2>Open Tasks</h2>}
                /> */}
			</div>
		</Card>
	);
};

export default connect()(TopCustomers);

import { React, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Col, Popover, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faUserCheck
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faCircle as NormalFaCircle,
	faFileTimes,
	faFileCheck,
	faEllipsisVAlt
} from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import { palette } from '../../theme';

const { Text, Link, Title } = Typography;
const defaultValue = {
	name: '',
	permAdd1: '',
	permCityName: '',
	legalStatusName: '',
	mobileNo: '',
	eMail: '',
	customerTypeName: '',
	permCountryName: '',
	workFlowStatus: '',
	taxStatusName: ''
};

const ProfileTopBanner = ({ profileTopBanner = defaultValue, customerCode }) => {
	const history = useHistory();
	const { opportunityViewData } = profileTopBanner;
	const styleSet = {
		container: {
			color: palette.text.banner,
			fontWeight: 'normal',
			fontSize: '20px',
			fontFamily: 'Open Sans',
			fontStyle: 'normal',
			lineHeight: '25 px'
			//marginBottom: "15px",
		},
		subContainer: {
			color: palette.text.banner,
			marginBottom: '15px'
		}
	};
	const goToEdit = () => {
		const toObject = {
			pathname: '/dashboard/MyCustomers/CustomerEdit',
			state: {
				refID: customerCode,
				action: 'edit',
				refType: 'CLIENTADD'
			}
		};
		history.push(toObject);
	};

	const handleAddInteractionClick = () => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: {
				data: profileTopBanner,
				refType: 'CLIENTADD',
				mode: 'create',
				screen: 'customer-view'
			}
		};
		history.push(toObject);
	};
	const handleCreateOpportunityClick = () => {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate',
			state: {
				data: profileTopBanner,
				refType: 'CLIENTADD',
				mode: 'create',
				screen: 'customer-view'
			}
		};
		history.push(toObject);
	};

	const handleCreateTaskClick = () => {
		const toObject = {
			pathname: '/dashboard/TaskBoard/TaskCreate',
			state: {
				data: profileTopBanner,
				refType: 'CLIENTADD',
				mode: 'create',
				screen: 'customer-view'
			}
		};
		history.push(toObject);
	};

	const RenderMoreOptions = () => {
		const options = ['Create Opportunity', 'Create Interaction', 'Create Task'];
		const content = () => (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					paddingLeft: '20px'
				}}
			>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								option.toLowerCase() === 'record interaction' && handleAddInteractionClick();
								option.toLowerCase() === 'create opportunity' && handleCreateOpportunityClick();
								option.toLowerCase() === 'create task' && handleCreateTaskClick();
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<Popover
				placement='bottomLeft'
				content={content}
				overlayClassName='prospect-listing-actions-popover'
			>
				<FontAwesomeIcon icon={faEllipsisVAlt} size='sm' className='opportunityViewTopBarIcons' />
			</Popover>
		);
	};

	return (
		<>
			<Card
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					borderBottomRightRadius: '12px',
					borderBottomLeftRadius: '12px'
				}}
			>
				<Row>
					<Col style={{ width: '75%' }}>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className='profileTopBannerArrow'
							// size='10x'
							// onClick={() => history.push('/dashboard/MyCustomers')}
							onClick={() => history.push('/dashboard/PortfolioOverview')}
						/>
					</Col>
					<Col>
						<FontAwesomeIcon
							icon={faEdit}
							onClick={goToEdit}
							className='opportunityViewTopBarIcons'
						/>
						<RenderMoreOptions />
					</Col>

					<Col>
						{/* <FontAwesomeIcon
							icon={faUserCheck}
							onClick={() => ''(true)}
							className='opportunityViewTopBarIcons'
						/>
						<FontAwesomeIcon
							icon={faFileCheck}
							onClick={() => ''(true)}
							className='opportunityViewTopBarIcons'
						/> */}
						{/* <FontAwesomeIcon
							icon={faFileTimes}
							onClick={() => ''(true)}
							className='opportunityViewTopBarIcons'
						/> */}
						{/* <FontAwesomeIcon
							icon={faTrashAlt}
							onClick={() => ''(true)}
							className='opportunityViewTopBarIcons'
						/> */}

						{/* <FontAwesomeIcon
							icon={faChevronLeft}
							onClick={''}
							className='opportunityViewTopBarIcons'
						/> */}
						{/* <FontAwesomeIcon
							icon={faChevronRight}
							onClick={''}
							className='opportunityViewTopBarIcons'
						/> */}
					</Col>
				</Row>
				<Row justify='space-between' align='bottom'>
					<Col span={11}>
						<Row align='bottom' style={{ padding: '5px 0px' }}>
							<Col className='gutter-row' align='middle' span={7}>
								{profileTopBanner?.profileImage != null ? (
									<div style={{ width: '85%', height: 'auto' }}>
										<img
											src={`data:image/jpeg;base64,${profileTopBanner?.profileImage}`}
											className='opportunityCircleImg'
											alt='user-img'
										/>
									</div>
								) : (
									<div className='opportunityInitialsCircleImg'>
										{profileTopBanner.profileInitial}
									</div>
								)}
							</Col>
							<Col className='gutter-row' span={16}>
								<Row>
									<Title level={3} style={{ color: '#FFF', margin: 0 }} className='opportunityName'>
										{/* {profileTopBanner?.name?.length > 30 ? profileTopBanner.name.substr(0, 29) + '......' : profileTopBanner.name} */}
										{profileTopBanner?.firstName} {profileTopBanner?.secondName}{' '}
										{profileTopBanner?.thirdName}
									</Title>
								</Row>

								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<div
										// className="opportunityDescriptionText"
										style={styleSet.container}
									>
										<FontAwesomeIcon
											icon={faMapMarkerAlt}
											className='opportuntiyViewHeaderDetailIcon'
										/>
										{/* {profileTopBanner?.permAdd1?.length > 35 ? profileTopBanner.permAdd1.substr(0, 35) + '......' : profileTopBanner.permAdd1} */}
										{profileTopBanner.permAdd1},{profileTopBanner.permCityName}
									</div>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<div className='opportunityTag'>{profileTopBanner.legalStatusName}</div>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<FontAwesomeIcon icon={faPhoneAlt} className='opportuntiyViewHeaderDetailIcon' />
									<p className='opportunityDescriptionText' style={styleSet.container}>
										{profileTopBanner.mobileNo}
									</p>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<FontAwesomeIcon icon={faEnvelope} className='opportuntiyViewHeaderDetailIcon' />
									<p className='opportunityDescriptionText' style={styleSet.container}>
										{profileTopBanner.eMail}
									</p>
								</Row>
							</Col>
						</Row>
					</Col>

					<Col span={13}>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={12} className='opportunityDetailText' style={styleSet.container}>
									{profileTopBanner.customerTypeName}
								</Row>
								<Row
									gutter={16}
									className='opportunityDescriptionText'
									style={styleSet.subContainer}
								>
									Type
								</Row>
							</Col>
							{/* <Col className="gutter-row" span={8}>
                                <Row
                                    gutter={16}
                                    className="opportunityDetailText"
                                    style={styleSet.container}>
                                    {profileTopBanner.currencySymbol === null && profileTopBanner.currencySymbol === ""
                                        ? profileTopBanner.currencySymbol + profileTopBanner.workFlowStatus
                                        : profileTopBanner.workFlowStatus}

                                </Row>
                                <Row
                                    gutter={16}
                                    className="opportunityDescriptionText"
                                    style={styleSet.subContainer}>
                                    Status
                                </Row>
                            </Col> */}
						</Row>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{profileTopBanner.permCountryName}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Nationality
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{profileTopBanner.taxStatusName}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Tax Status
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{profileTopBanner.riskCategory} -{' '}
									{profileTopBanner?.sophisticatedYn == 'Y' ? 'Sophisticated' : 'Non Sophisticated'}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Agreed Risk Profile
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Card>
		</>
	);
};

export default ProfileTopBanner;

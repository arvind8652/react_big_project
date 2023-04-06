import { React, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Col, Row, Typography } from 'antd';
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
	faFileCheck
} from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import { palette } from '../../theme';

const { Text, Link, Title } = Typography;
const defaultValue = {
	name: 'Alexandra Romous',
	id: 'Asan 102104',
	familyName: 'Sandrlock Family',
	legalStatusName: 'Wealth',
	mobileNo: '+63 8888888888',
	address: 'Address',
	customerTypeName: '',
	permCountryName: '',
	workFlowStatus: '',
	taxStatusName: ''
};

const PortfolioOverviewProfile = ({ portfolioOverviewProfile = defaultValue }) => {
	const { opportunityViewData } = portfolioOverviewProfile;
	const styleSet = {
		container: {
			color: palette.text.banner
			//marginBottom: "15px",
		},
		subContainer: {
			color: palette.text.banner,
			marginBottom: '15px'
		}
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
				<Row justify='space-between' align='bottom'>
					<Col span={11}>
						<Row align='bottom' style={{ padding: '5px 0px' }}>
							<Col className='gutter-row' align='middle' span={7}>
								{portfolioOverviewProfile.profileImage != null ? (
									<div style={{ width: '85%', height: 'auto' }}>
										<img
											src={`data:image/jpeg;base64,${portfolioOverviewProfile.profileImage}`}
											className='opportunityCircleImg'
											alt='user-img'
										/>
									</div>
								) : (
									<div className='opportunityInitialsCircleImg'>
										{portfolioOverviewProfile.profileInitial}
									</div>
								)}
							</Col>
							<Col className='gutter-row' span={12}>
								<Row>
									<Title level={3} style={{ color: '#FFF', margin: 0 }} className='opportunityName'>
										{portfolioOverviewProfile.name}
									</Title>
								</Row>

								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<p className='opportunityDescriptionText' style={styleSet.container}>
										{portfolioOverviewProfile.id} | {portfolioOverviewProfile.familyName}
									</p>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<div className='opportunityTag'>{portfolioOverviewProfile.legalStatusName}</div>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<FontAwesomeIcon icon={faPhoneAlt} className='opportuntiyViewHeaderDetailIcon' />
									<p className='opportunityDescriptionText' style={styleSet.container}>
										{portfolioOverviewProfile.mobileNo}
									</p>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className='opportuntiyViewHeaderDetailIcon'
									/>
									<p className='opportunityDescriptionText' style={styleSet.container}>
										{portfolioOverviewProfile.address}
									</p>
								</Row>
							</Col>
						</Row>
					</Col>

					<Col span={13}>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{portfolioOverviewProfile.relationshipManager}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Relationship Manager
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={[16, 16]}>
									<Col className='gutter-row' span={8}>
										<Row gutter={12} className='opportunityDetailText' style={styleSet.container}>
											{portfolioOverviewProfile.investmentValue}
										</Row>
										<Row
											gutter={16}
											className='opportunityDescriptionText'
											style={styleSet.subContainer}
										>
											Investment Value
										</Row>
									</Col>
								</Row>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{portfolioOverviewProfile.capitalInvested}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Capital Invested
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{portfolioOverviewProfile.investibleCash}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Investible Cash
								</Row>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{portfolioOverviewProfile.creditLimit}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Credit Limit
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Card>
		</>
	);
};

export default PortfolioOverviewProfile;

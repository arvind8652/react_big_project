import { React, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, Col, Row, Typography, Divider, Progress, PageHeader } from 'antd';
import { LeftOutlined, UserAddOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faCheckCircle,
	faCaretUp,
	faCaretDown,
	faPaperclip,
	faUpload,
	faUser,
	faUserAltSlash,
	faUserAlt,
	faUserAlien,
	faUserCheck
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faCircle as NormalFaCircle,
	faPencilAlt,
	faChevronDoubleDown,
	faChevronDoubleUp,
	faFileTimes,
	faFileCheck
} from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import { palette } from '../../theme';
import ProfileHeader from './ProfileHeader';

const { Text, Link, Title } = Typography;
const defaultValue = {
	name: 'Alexandra Romus',
	address: 'Central ave, Albany',
	tagName: 'Wealth',
	mobile: '+63 98468265802',
	email: 'alxendra@yahoo.com',
	opportunityName: 'Individual',
	stage: 'USA',
	targetAmount: 'Pending',
	probability: 'Resident India'
};

const CustomerViewProfileBannerList = ({}) => {
	const styleSet = {
		container: {
			color: palette.text.banner
		}
	};
	const profileBannerList = defaultValue;
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
						<FontAwesomeIcon icon={faArrowLeft} className='opportunityViewTopBarIcons' size='15x' />
					</Col>

					<Col>
						<FontAwesomeIcon
							icon={faUserCheck}
							onClick={() => ''(true)}
							className='opportunityViewTopBarIcons'
						/>
						<FontAwesomeIcon
							icon={faFileCheck}
							onClick={() => ''(true)}
							className='opportunityViewTopBarIcons'
						/>
						<FontAwesomeIcon
							icon={faFileTimes}
							onClick={() => ''(true)}
							className='opportunityViewTopBarIcons'
						/>
						<FontAwesomeIcon
							icon={faTrashAlt}
							onClick={() => ''(true)}
							className='opportunityViewTopBarIcons'
						/>

						<FontAwesomeIcon icon={faEdit} onClick={''} className='opportunityViewTopBarIcons' />
						<FontAwesomeIcon
							icon={faChevronLeft}
							onClick={''}
							className='opportunityViewTopBarIcons'
						/>
						<FontAwesomeIcon
							icon={faChevronRight}
							onClick={''}
							className='opportunityViewTopBarIcons'
						/>
					</Col>
				</Row>
				<Row justify='space-between' align='bottom'>
					<Col span={11}>
						<Row align='bottom' style={{ padding: '5px 0px' }}>
							<Col className='gutter-row' align='middle' span={9}>
								{profileBannerList.profileImage != null ? (
									<div style={{ width: '85%', height: 'auto' }}>
										<img
											src={`data:image/jpeg;base64,${profileBannerList.profileImage}`}
											className='opportunityCircleImg'
											alt='user-img'
										/>
									</div>
								) : (
									<div className='opportunityInitialsCircleImg'>
										{profileBannerList.profileInitial}
									</div>
								)}
							</Col>
							<Col className='gutter-row' span={12}>
								<Row>
									<Title level={3} style={{ color: '#FFF', margin: 0 }} className='opportunityName'>
										{profileBannerList.fullName}
									</Title>
								</Row>

								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className='opportuntiyViewHeaderDetailIcon'
									/>
									<p className='opportunityDescriptionText' style={styleSet.container}>
										{profileBannerList.permCityName}
									</p>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<div className='opportunityTag'>{profileBannerList.legalStatusName}</div>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<FontAwesomeIcon icon={faPhoneAlt} className='opportuntiyViewHeaderDetailIcon' />
									<p className='opportunityDescriptionText' style={styleSet.container}>
										{profileBannerList.mobileNo}
									</p>
								</Row>
								<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
									<FontAwesomeIcon icon={faEnvelope} className='opportuntiyViewHeaderDetailIcon' />
									<p className='opportunityDescriptionText' style={styleSet.container}>
										{profileBannerList.eMail}
									</p>
								</Row>
							</Col>
						</Row>
					</Col>

					<Col span={13}>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={12} className='opportunityDetailText' style={styleSet.container}>
									<strong>{profileBannerList.customerTypeName}</strong>
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Type
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{profileBannerList.currencySymbol === null &&
									profileBannerList.currencySymbol === ''
										? profileBannerList.currencySymbol + profileBannerList.targetAmount
										: profileBannerList.targetAmount}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Status
								</Row>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									<strong>{profileBannerList.permCountryName}</strong>
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Resident Country
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									<strong>{profileBannerList.taxStatusName}</strong>
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Tax Status
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{moment(profileBannerList.dueDate).format(getDateFormat())}
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

export default CustomerViewProfileBannerList;

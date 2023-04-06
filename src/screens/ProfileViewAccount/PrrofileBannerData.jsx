import React from 'react';
import { AvatarSize } from '../../constants/AvatarSize';
import '../ProspectViewScreen/ProspectViewScreen.scss';
import 'antd/dist/antd.css';
import HeaderTextSubText from '../ProspectViewScreen/ProspectComponent/HeaderTextSubText';
import { Row, Col, Space, Typography } from 'antd';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvatarLogo from '../../components/Avatar/AvatarLogo';

const { Text, Title } = Typography;

const ProfileTopBannerData = (props) => {
	return (
		<>
			<Row justify='space-between' align='bottom'>
				<Col span={10}>
					<Row align='bottom' style={{ padding: '10px 0px' }}>
						<Col className='gutter-row' span={9} align='middle'>
							{props?.profileData?.profileImage ? (
								<div style={{ height: 'auto' }}>
									<AvatarLogo
										imgsrc={props?.profileData?.profileImage}
										profileName={props.profileData?.profileInitial}
										avatarSize={AvatarSize.large}
									/>
								</div>
							) : (
								<AvatarLogo
									profileName={props.profileData?.profileInitial}
									avatarSize={AvatarSize.large}
								/>
							)}
						</Col>
						<Col span={15} style={{ padding: '0 10px' }}>
							<Space direction='vertical'>
								<Title level={3} style={{ color: '#FFF', margin: 0 }}>
									{props.profileData?.firstName} {props.profileData?.secondName}{' '}
									{props.profileData?.thirdName}
								</Title>
								<Text
									type='secondary'
									className='basicDetailLabel'
									style={{ color: '#D9DFFF', margin: 0 }}
								>
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										style={{ color: 'white', marginRight: '5px' }}
										className='prospectViewHeaderDetailIcon'
									/>
									{props.profileData?.permAdd1}
									{','}
									{props.profileData?.permCityName}
								</Text>
								<Text
									className='header-badge'
									style={{
										backgroundColor: '#D9DFFF',
										color: '#354081',
										padding: '4px 16px',
										borderRadius: '20px'
									}}
								>
									{props.profileData?.legalStatusName}
								</Text>
								<Text
									type='secondary'
									className='basicDetailLabel'
									style={{ color: '#D9DFFF', margin: 0 }}
								>
									<FontAwesomeIcon
										icon={faPhoneAlt}
										className='prospectViewHeaderDetailIcon'
										style={{ color: 'white', marginRight: '5px' }}
									/>
									{'+'}
									{props.profileData?.mobileNo}
								</Text>
								<Text
									type='secondary'
									className='basicDetailLabel'
									style={{ color: '#D9DFFF', margin: 0 }}
								>
									<FontAwesomeIcon
										icon={faEnvelope}
										className='prospectViewHeaderDetailIcon'
										style={{ color: 'white', marginRight: '5px' }}
									/>
									{props.profileData?.eMail}
								</Text>
							</Space>
						</Col>
					</Row>
				</Col>
				<Col span={14}>
					<Row>
						<Col span={12} style={{ margin: '10px 0' }}>
							<HeaderTextSubText text={props.profileData?.customerTypeName ?? '-'} subtext='Type' />
						</Col>
						<Col span={7} offset={5} style={{ marginTop: '10px' }}>
							<HeaderTextSubText text={props.profileData?.clientId ?? '-'} subtext='Client Code' />
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<HeaderTextSubText
								text={props.profileData?.permCountryName ?? '-'}
								subtext='Nationality'
							/>
						</Col>
						<Col span={5}>
							<HeaderTextSubText
								text={props.profileData?.taxStatusName ?? '-'}
								subtext='Tax Status'
							/>
						</Col>
						<Col span={7}>
							<HeaderTextSubText
								text={`${props.profileData?.riskCategory}
                                ${
																	props.profileData?.sophisticatedYn == 'Y'
																		? 'Sophisticated'
																		: 'Non Sophisticated'
																}`}
								subtext='Agreed Risk Profile'
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default ProfileTopBannerData;

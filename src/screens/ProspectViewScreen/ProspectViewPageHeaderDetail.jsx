import React from 'react';
import { AvatarSize } from '../../constants/AvatarSize';
import './ProspectViewScreen.scss';
import 'antd/dist/antd.css';
import { getDateFormat } from '../../utils/utils';

import HeaderIconTextSubText from './ProspectComponent/HeaderIconTextSubText';
import HeaderTextSubText from './ProspectComponent/HeaderTextSubText';
import { Row, Col, Space, Typography } from 'antd';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faCalendarCheck,
	faCalendarAlt,
	faBullseyeArrow,
	//   faFire,
	faClipboard
} from '@fortawesome/pro-solid-svg-icons';
import { faSnowflake, faClipboardCheck } from '@fortawesome/pro-regular-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';

const { Text, Title } = Typography;

const ProspectViewPageHeaderDetail = (props) => {
	return (
		<>
			<Row justify='space-between' align='bottom'>
				<Col span={10}>
					<Row align='bottom' style={{ padding: '10px 0px' }}>
						<Col className='gutter-row' span={9} align='middle'>
							{props.prospectDetail.profileImage ? (
								<div style={{ height: 'auto' }}>
									<AvatarLogo
										imgsrc={props.prospectDetail.profileImage}
										profileName={props.prospectDetail.profileInitials}
										avatarSize={AvatarSize.large}
									/>
								</div>
							) : (
								<AvatarLogo
									profileName={props.prospectDetail.profileInitials}
									avatarSize={AvatarSize.large}
								/>
							)}
						</Col>
						<Col span={15} style={{ padding: '0 10px' }}>
							<Space direction='vertical'>
								<Title level={3} style={{ color: '#FFF', margin: 0 }}>
									{props.prospectDetail.type === 'Corporate'
										? props.prospectDetail.firstName
										: `${props.prospectDetail.firstName} ${props.prospectDetail.lastName ?? ''}`}
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
									{props.prospectDetail.address}
									{','}
									{props.prospectDetail.city}
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
									{props.prospectDetail.category}
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
									{/* {'+'} */}
									{props?.prospectDetail?.dialCode} {props.prospectDetail.mobile}
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
									{props.prospectDetail.email}
								</Text>
							</Space>
						</Col>
					</Row>
				</Col>
				<Col span={5}>
					<Row>
						<Col span={24} style={{ margin: '10px 0' }}>
							<HeaderTextSubText text={props.prospectDetail.type} subtext='Type' />
						</Col>
						<Col span={12}>
							<HeaderTextSubText
								text={props.prospectDetail.interestlevel}
								suffixIcon={
									<FontAwesomeIcon
										className='prospectViewHeaderDetailIcon'
										size='xs'
										icon={props.prospectDetail.interestlevel === 'Hot' ? faHotjar : faSnowflake}
									/>
								}
								subtext='Interest'
							/>
						</Col>
						<Col span={12}>
							<HeaderTextSubText
								text={props.prospectDetail.qualificationStatus}
								suffixIcon={
									<FontAwesomeIcon
										size
										icon={
											props.prospectDetail.qualificationStatus === 'Not Qualified'
												? faClipboard
												: faClipboardCheck
										}
										color='#fff'
									/>
								}
								subtext='Status'
							/>
						</Col>
					</Row>
				</Col>
				<Col span={9}>
					<Space direction='vertical'>
						<Row>
							<Space size={25} style={{ margin: '10px 0' }}>
								<Col>
									<HeaderIconTextSubText
										icon={<FontAwesomeIcon icon={faBullseyeArrow} size='lg' />}
										text={props.opportunityCount}
										subtext='Opportunities'
									/>
								</Col>
								<Col>
									{/* <HeaderTextSubText text={props.expectedBusiness} subtext='Expected Business' /> */}
									<HeaderTextSubText
										text={<RupeeOrNonRupee amount={props.expectedBusiness} />}
										subtext='Expected Business'
									/>
								</Col>
							</Space>
						</Row>
						<Row>
							<Space size={25} style={{ margin: '10px 0' }}>
								<Col>
									<HeaderIconTextSubText
										icon={<FontAwesomeIcon icon={faCalendarAlt} size='lg' />}
										text={props.interactionCount}
										subtext='Interactions'
									/>
								</Col>
								<Col>
									<HeaderIconTextSubText
										icon={<FontAwesomeIcon icon={faCalendarCheck} size='lg' />}
										text={props.taskCount}
										subtext='Tasks'
									/>
								</Col>
								{/* <Col>
                  <HeaderTextSubText
                    text={props.nextInteractionDate && moment(props.nextInteractionDate).format(getDateFormat())}
                    subtext="Next Activity"
                  />
                </Col> */}
							</Space>
						</Row>
					</Space>
				</Col>
			</Row>
			{/* <ConvertProspectModal
              modal={convertProspectModalOpen}
              modalClose={() => setConvertProspectModalOpen(false)}
            />
            <DowngradeProspectModal
              modal={downgradeProspectModalOpen}
              modalClose={() => setDowngradeProspectModalOpen(false)}
            /> */}
		</>
	);
};

export default ProspectViewPageHeaderDetail;

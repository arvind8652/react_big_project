import React from 'react';
import './ProspectViewScreen.scss';
import 'antd/dist/antd.css';
import { getDateFormat } from '../../utils/utils';
import { Row, Col, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import TextSubText from './ProspectComponent/TextSubText';
import {
	faFacebookSquare,
	faLinkedin,
	faTwitter,
	faWhatsapp,
	faViber
} from '@fortawesome/free-brands-svg-icons';

const ProspectDetailsCardView = (props) => {
	const detail = props.data;

	const RenderContactDetailsWithConditions = ({ dialCode, contactNumber }) => {
		return (
			<>
				{dialCode ? `${dialCode}` : ''} {contactNumber ?? ''}
			</>
		);
	};

	return (
		<>
			<Space direction='vertical' class='prospect-details' style={{ width: '100%' }} size={5}>
				<Row gutter={5}>
					<Col span={8}>
						{detail.prospectDetail.type === 'Corporate' ? (
							<TextSubText text={`${detail?.prospectDetail?.firstName}`} subtext='Company Name ' />
						) : (
							<TextSubText
								text={`
                  ${detail.prospectDetail.salutation ?? ''}  
                  ${detail.prospectDetail.firstName ?? ''} 
                  ${detail.prospectDetail.middleName ?? ''} 
                  ${detail.prospectDetail.lastName ?? ''}
                `}
								subtext='Full Name '
							/>
						)}
					</Col>
					{detail.prospectDetail.type === 'Corporate' && (
						<>
							<Col span={8}>
								<TextSubText
									text={`${detail?.prospectDetail?.middleName ?? '-'}`}
									subtext='Contact Person Name'
								/>
							</Col>
							<Col span={8}>
								<TextSubText
									text={`${detail?.prospectDetail?.lastName ?? '-'}`}
									subtext='Contact Person Details'
								/>
							</Col>
						</>
					)}
					<Col span={8}>
						<TextSubText text={detail.prospectDetail.category} subtext='Category' />
					</Col>
					<Col span={8}>
						<TextSubText text={detail.prospectDetail.cifnumber} subtext='CIF' />
					</Col>
					<Col span={8}>
						<TextSubText text={detail.prospectDetail.reference ?? 'CIF'} subtext='Reference' />
					</Col>
					{detail.prospectDetail.type !== 'Corporate' && (
						<Col span={8}>
							<TextSubText text={detail.prospectDetail.suffix} subtext='Suffix' />
						</Col>
					)}
					<Col span={8}>
						<TextSubText
							text={moment(detail.prospectDetail.dateofBirthCorp).format(getDateFormat())}
							subtext={
								detail.prospectDetail.type === 'Corporate'
									? 'Date Of Incorporation'
									: 'Date of Birth'
							}
						/>
					</Col>

					{detail.prospectDetail.type === 'Corporate' ? (
						' '
					) : (
						<Col span={8}>
							<TextSubText text={detail.prospectDetail.gender} subtext='Gender' />
						</Col>
					)}

					<Col span={8}>
						<TextSubText
							flag={detail.prospectDetail.countryCode}
							text={detail.prospectDetail.nationality}
							subtext='Nationality'
						/>
					</Col>
					<Col span={8}>
						<Row>
							<Col>
								<TextSubText
									flag={detail.prospectDetail.mobile ? detail.prospectDetail.countryCode : null}
									text={
										detail?.prospectDetail?.mobile && (
											<RenderContactDetailsWithConditions
												dialCode={detail.prospectDetail.dialCode}
												contactNumber={detail.prospectDetail.mobile}
											/>
										)
									}
									subtext='Contact Number'
								/>
							</Col>
							{detail.socialList.WhatsApp && (
								<Col>
									<a href='https://www.whatsapp.com/' target='_blank'>
										<FontAwesomeIcon
											className='prospectViewSocialMediaIcon'
											icon={faWhatsapp}
											style={{ color: '#075e54' }}
										/>
									</a>
								</Col>
							)}
							{detail.socialList.Viber && (
								<Col>
									<FontAwesomeIcon
										className='prospectViewSocialMediaIcon'
										icon={faViber}
										style={{ color: '#59267c' }}
									/>
								</Col>
							)}
						</Row>
					</Col>
					<Col span={8}>
						<TextSubText
							flag={
								detail.prospectDetail.alternateNumber ? detail.prospectDetail.countryCode : null
							}
							text={
								detail?.prospectDetail?.alternateNumber && (
									<RenderContactDetailsWithConditions
										dialCode={detail.prospectDetail.alternateDialCode}
										contactNumber={detail.prospectDetail.alternateNumber}
									/>
								)
							}
							// text={
							// 	<RenderContactDetailsWithConditions
							// 		dialCode={detail.prospectDetail.alternateDialCode}
							// 		contactNumber={detail.prospectDetail.alternateNumber}
							// 	/>
							// }
							subtext='Alternate Contact Number'
						/>
					</Col>
					<Col span={8}>
						<TextSubText text={detail.prospectDetail.email} subtext='Email Id' />
					</Col>
					<Col span={8}>
						<TextSubText text={detail.prospectDetail.address} subtext='Address' />
					</Col>
					<Col span={8}>
						<TextSubText
							flag={detail.prospectDetail.countryCode}
							text={detail?.prospectDetail?.country}
							subtext='Country'
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							// flag={detail.prospectDetail.countryCode}
							text={detail?.prospectDetail?.state}
							subtext='State'
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							// flag={detail.prospectDetail.countryCode}
							text={detail?.prospectDetail?.city}
							subtext='City'
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							text={detail.prospectDetail.zipCode ? detail.prospectDetail.zipCode : ''}
							subtext='Pincode'
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							icon={
								<FontAwesomeIcon
									className='prospectViewSocialMediaIcon'
									icon={faTwitter}
									style={{ color: '#00acee', marginRight: '5px' }}
								/>
							}
							text={detail.socialList.Twitter}
							subtext=''
							link={`https://twitter.com/${detail.socialList.Twitter}`}
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							icon={
								<FontAwesomeIcon
									className='prospectViewSocialMediaIcon'
									icon={faFacebookSquare}
									style={{ color: '#3b5998', marginRight: '5px' }}
								/>
							}
							text={detail.socialList.Facebook}
							subtext=''
							link={`https://facebook.com/${detail.socialList.Facebook}`}
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							icon={
								<FontAwesomeIcon
									className='prospectViewSocialMediaIcon'
									icon={faLinkedin}
									style={{ color: '#0a66c2', marginRight: '5px' }}
								/>
							}
							text={detail.socialList.LinkedIn}
							subtext=''
							link={`https://linkedin.com/${detail.socialList.LinkedIn}`}
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							text={detail.prospectDetail.relationshipManager}
							subtext='Relationship Manager'
						/>
					</Col>
					<Col span={8}>
						<TextSubText text={detail.prospectDetail.branch} subtext='Office' />
					</Col>
				</Row>
			</Space>
		</>
	);
};

export default ProspectDetailsCardView;

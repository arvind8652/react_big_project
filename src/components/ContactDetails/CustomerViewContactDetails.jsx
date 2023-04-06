import { React, useState } from 'react';
import { Col, Row } from 'antd';

import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextSubText from '../../screens/ProspectViewScreen/ProspectComponent/TextSubText';
import {
	faFacebookSquare,
	faLinkedin,
	faTwitter,
	faWhatsapp,
	faViber
} from '@fortawesome/free-brands-svg-icons';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';

const defaultValue = {
	contactNumber: '+654  4567 5443',
	alternateContactNumber: '+654  4567 5443',
	email: 'Peter34@gmail.com',
	twitterUrl: '',
	facebookUrl: '',
	linkedinUrl: '',
	comAddress: 'Park Aveneue, 21 Ny',
	comCity: 'Berlin, Germany',
	comCode: 234532,
	perAddress: 'Park Aveneue, 21 Ny',
	perCity: 'Berlin, Germany',
	perPinCode: 234532
};
const ContactDetails = ({ contactDetails = defaultValue, socialList = defaultValue }) => {
	const styleSet = {
		contactBlock: {
			color: palette.secondary.light,
			height: 0.5
		},
		container: {
			flex: 1,
			width: '100%',
			marginTop: '10px',
			marginBottom: '15px'
		},
		subCardHeader: {
			fontSize: fontSet.body.xlarge,
			color: palette.text.dark
		},

		parentCheckBox: { display: 'flex', alignItems: 'center', padding: '10px' },
		checkboxContainer: {
			flex: 0.1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		itemCheckbox: { flex: 0.9 },
		tag: {
			display: 'flex',
			backgroundColor: '#F6F7FB',
			color: '#5D6DD1',
			alignItems: 'center',
			borderRadius: 10,
			padding: 5,
			marginRight: 3
		},
		close: {
			paddingLeft: 5,
			paddingRight: 5
		},
		name: {
			whiteSpace: 'nowrap',
			width: '100%',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		},
		tagContainer: { overflowX: 'auto', display: 'flex', paddingBottom: 10 },
		dropDownHeight: { maxHeight: '150px', overflowY: 'scroll' }
	};
	return (
		<>
			<GenericCard header={'Contact Details'}>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TextSubText
							// flag={
							//   contactDetails?.mobileNo
							//     ? contactDetails?.permCountry
							//     : null
							// }
							text={
								<span>
									{contactDetails?.mobileNo
										? ' +' +
										  contactDetails?.dialCode?.replace('+', '') +
										  ' ' +
										  contactDetails?.mobileNo
										: '-'}
								</span>
							}
							iconNext={
								socialList?.hasOwnProperty('WhatsApp') && (
									<FontAwesomeIcon
										className='prospectViewSocialMediaIcon'
										icon={faWhatsapp}
										style={{
											color: '#48A1EC',
											marginRight: '5px',
											fontSize: '25px',
											marginLeft: '10px'
										}}
									/>
								)
							}
							iconNextAfter={
								socialList?.hasOwnProperty('Viber') && (
									<FontAwesomeIcon
										className='prospectViewSocialMediaIcon'
										icon={faViber}
										style={{
											color: '#48A1EC',
											marginRight: '5px',
											fontSize: '25px',
											marginLeft: '10px'
										}}
									/>
								)
							}
							// subtext='Contact Number'
							subtext='Wealth Mobile'
						/>
					</Col>

					<Col span={8}>
						{/* <TypoGraphy label={'Alternate Contact Number'}> */}
						<TypoGraphy label={'Bank Mobile'}>
							{/* <div style={styleSet.subCardHeader}> */}
							{contactDetails?.telephoneHome && contactDetails?.alternateDialCode  ? (
								<span>
									{contactDetails?.alternateDialCode &&
									contactDetails?.alternateDialCode.includes('+')
										? ''
										: '+'}{' '}
									{`${contactDetails?.alternateDialCode} ${contactDetails?.telephoneHome}`}
								</span>
							) : contactDetails?.telephoneHome ? (
								<span>
									{contactDetails?.telephoneHome}
								</span>
							) : (
								<span>-</span>
							)}
							{/* </div> */}
						</TypoGraphy>
					</Col>

					{/* <Col style={styleSet.container}>
            <TypoGraphy label={"Alternate Contact Number"}>
              <div style={styleSet.subCardHeader}>
                <span>
                  {contactDetails?.alternateDialCode &&
                  contactDetails?.alternateDialCode.includes("+")
                    ? ""
                    : "+"}{" "}
                  {contactDetails?.alternateDialCode}
                </span>{" "}
                &nbsp;
                <span>{contactDetails?.telephoneHome}</span>
              </div>
            </TypoGraphy>
          </Col> */}
					<Col span={8}></Col>

					<Col span={8}>
						{socialList?.Twitter && (
							<TextSubText
								icon={
									<FontAwesomeIcon
										className='prospectViewSocialMediaIcon'
										icon={faTwitter}
										style={{ color: '#48A1EC', marginRight: '5px' }}
									/>
								}
								text={socialList?.Twitter}
								subtext=''
								link={`https://twitter.com/${socialList?.Twitter}`}
							/>
						)}
					</Col>
					<Col span={8}>
						{socialList?.Facebook && (
							<TextSubText
								icon={
									<FontAwesomeIcon
										className='prospectViewSocialMediaIcon'
										icon={faFacebookSquare}
										style={{ color: '#274D95', marginRight: '5px' }}
									/>
								}
								text={socialList?.Facebook}
								subtext=''
								link={`https://facebook.com/${socialList?.Facebook}`}
							/>
						)}
					</Col>
					<Col span={8}>
						{socialList?.LinkedIn && (
							<TextSubText
								icon={
									<FontAwesomeIcon
										className='prospectViewSocialMediaIcon'
										icon={faLinkedin}
										style={{ color: '#3568AD', marginRight: '5px' }}
									/>
								}
								text={socialList?.LinkedIn}
								subtext=''
								link={`https://linkedin.com/${socialList?.LinkedIn}`}
							/>
						)}
					</Col>
					{/* </Row>
				<Row> */}
					<Col span={8}>
						<TypoGraphy label={'Communication Preference'}>
							{contactDetails?.communicationPre?.length > 0 && (
								<div style={styleSet.tagContainer}>
									{contactDetails?.communicationPre?.map((e) => (
										<Col span={12}>
											<div style={styleSet.tag}>
												<div style={styleSet.close}>
													<UserOutlined />
												</div>
												<div style={styleSet.name}>
													{e?.display_value ? e?.display_value : e?.displayValue}
												</div>
											</div>
										</Col>
									))}
								</div>
							)}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Wealth Email Id'}>
							<span>{contactDetails?.eMail ?? '-'}</span>
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Bank Email Id'}>
							<span>{contactDetails?.race ?? '-'}</span>
						</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default ContactDetails;

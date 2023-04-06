import React, { useState } from 'react';
import { Checkbox, Col, Row, Typography } from 'antd';
import rcbclogo from '../../../../assets/img/rcbc.png';
import './SupplementalTermsAndConditions.scss';

const { Title, Text } = Typography;

const SuppliTermsAndConditions = () => {
	const [data] = useState([1, 2, 3, 4, 5]);
	return (
		<>
			<Row className='border-top'>
				<Col>
					<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
					<Text className='text-h3'>Securities,Inc.</Text>
				</Col>
				<Col style={{ marginLeft: '40%', marginTop: '40px' }}>
					<Title level={4}>Supplemental Terms and Conditions</Title>
					<Text className='text-h1'>2020 Version 3</Text>
				</Col>
			</Row>
			<Row className='border-top'>
				<Col span={24}>
					<Row>
						<Text className='text-h1' underline strong>
							FATCA Information for Retail Clients:
						</Text>
					</Row>
					<Row>
						<Col span={12} offset={1} className='space'>
							<table id='style-table'>
								<tbody>
									<tr style={{ border: 'none' }}>
										<td>
											<Text className='text-h1' strong>
												{' '}
												Name:
											</Text>
										</td>
										<td>
											<input type='text' id='supply' name='fname' readOnly />
											<br></br>
											<Text> LAST NAME</Text>
										</td>
										<td>
											<input type='text' id='supply' name='fname' readOnly />
											<br></br>
											<Text> FIRST NAME</Text>
										</td>
										<td>
											<input type='text' id='supply' name='fname' readOnly />
											<br></br>
											<Text>MIDDLE NAME</Text>
										</td>
									</tr>
								</tbody>
							</table>
						</Col>

						<Col span={13} offset={1} className='space'>
							<table id='style-table'>
								<tbody>
									<tr style={{ border: 'none' }}>
										<td>
											<Text className='text-h1' strong>
												{' '}
												Place of Birth:
											</Text>
										</td>
										<td>
											<input type='text' id='supply' name='fname' readOnly />
											<br></br>
											<Text>City,</Text>
										</td>
										<td>
											<input type='text' id='supply' name='fname' readOnly />
											<br></br>
											<Text> Country</Text>
										</td>
										<td>
											<Text>US Citizen</Text>
											<Text className='text-h2'>__Yes</Text>
											<Text className='text-h2'>__No</Text>
										</td>
									</tr>
								</tbody>
							</table>
						</Col>

						<Col span={24} offset={1} className='space'>
							<Text className='text-h1' strong>
								U.S. Address, if any:
							</Text>
							<Text className='text-h2'>__Yes</Text>
							<Text className='text-h2'>__No</Text>
						</Col>
						<Col span={24} offset={1}>
							<Text strong italic>
								(If Yes, please indicate whether Present, Permanent, Mailing):
							</Text>
						</Col>

						<Col span={24} offset={1} className='space'>
							<Text className='text-h1' strong>
								U.S. Phone Number, if any:
							</Text>
							<Text className='text-h2'>__Yes</Text>
							<Text className='text-h2'>__No</Text>
						</Col>
						<Col span={24} offset={1}>
							<Text strong italic style={{ marginRight: '10px' }}>
								(If Yes, please indicate including country code and area code):
								<Text strong>Country Code + </Text>
								<Text strong>Area Code + </Text>
								<Text strong> Phone Number</Text>
							</Text>
						</Col>

						<Col span={24} offset={1} className='space'>
							<Text strong>
								Did the customer stay in the U.S. for 183 days or more for the last 3 years?
							</Text>
							<Text strong>____Yes</Text>
							<Text strong>____No</Text>
						</Col>

						<Col span={24} offset={1} className='space'>
							<Text className='text-h1' italic strong>
								This should be computed as follows under Section 7701(b) (3) of the US Tax Code
							</Text>
						</Col>
						<Col span={24} offset={1} className='space'>
							<ol>
								<Col>
									<Text className='text-h1' italic strong>
										<li>All the days present in the current year, and</li>
									</Text>
									<Text className='text-h1' italic strong>
										<li>1/3 of the days presentsin the first year before the current year, and</li>
									</Text>
									<Text className='text-h1' italic strong>
										<li>1/6 of the days present in the second year before the current year.</li>
									</Text>
								</Col>
							</ol>
						</Col>

						<Col span={24} offset={1} className='space'>
							<Text className='text-h1' strong>
								Is U.S. TIN Available?
							</Text>
							<Text strong>____Yes</Text>
							<Text strong>____No</Text>
						</Col>
						<Col span={24} offset={1}>
							<Text italic strong>
								(If Yes, please indicate U.S. TIN):
							</Text>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Text className='text-h1' underline strong>
							FATCA Information for Corporate Clients:
						</Text>
					</Row>
					<Row>
						<Col span={24} offset={1} className='space'>
							<Text className='text-h1' strong>
								CLIENT NAME:
							</Text>
						</Col>
						<Col span={24} offset={1} className='space'>
							<Text strong>U.S. Place of Incorporation/Establishment:</Text>
							<Text strong>__Yes</Text>
							<Text strong>__No</Text>
						</Col>
						<Col span={24} offset={1} className='space'>
							<Text strong>U.S. Phone Number, if any:</Text>
							<Text strong>__Yes</Text>
							<Text strong>__No</Text>
						</Col>
						<Col span={24} offset={1}>
							<Text strong italic style={{ marginRight: '10px' }}>
								(If Yes, please indicate including country code and area code):
							</Text>
							<Text strong>Country Code + </Text>
							<Text strong>Area Code + </Text>
							<Text strong> Phone Number</Text>
						</Col>

						<Col span={24} offset={1} className='space'>
							<Text strong>Any of the authorized signatories has US address? </Text>
							<Text className='text-h2'>__Yes</Text>
							<Text className='text-h2'>__No</Text>
						</Col>
					</Row>
				</Col>
				<Col span={24}>
					<Row>
						<Text className='text-h1' underline strong>
							Other Information:
						</Text>
					</Row>

					<Col span={24} offset={1} className='space'>
						<Text className='text-h1'>A:</Text>
						<Checkbox>Agree</Checkbox>
						<Checkbox>Disagree</Checkbox>
					</Col>
					<Row justify={'center'} className='space'>
						<Text className='text-h2'>
							To disclose my personal, customer data, and account or transaction information/records
							to YGC, RCBC, and its subsidiary, affiliate, agent and authorized representative for
							processing, referring, offering and cross-selling of products and services that I
							maybe eligible for, subject to their respective Terms & Conditions and limitations set
							forth by law.
						</Text>
					</Row>

					<Col span={24} offset={1} className='space'>
						<Text className='text-h1'>B:</Text>
						<Checkbox>Agree</Checkbox>
						<Checkbox>Disagree</Checkbox>
					</Col>
					<Row justify={'center'} className='space'>
						<Text className='text-h2'>
							To disclose my personal, customer data, and account or transaction information/records
							to RCBC Wealth Management for data processing, profiling, reporting, statistical, and
							risk analysis purposes. (Applicable only to Wealth Management Group Clients)
						</Text>
					</Row>

					<Col span={24} offset={1} className='space'>
						<Text className='text-h1'>C:</Text>
						<Text>Are you related to any broker dealer?* </Text>
						<Checkbox>Yes</Checkbox>
						<Checkbox>No</Checkbox>
					</Col>
					<Row justify={'center'} className='space'>
						<Text className='text-h2'>
							To disclose my personal, customer data, and account or transaction information/records
							to RCBC Wealth Management for data processing, profiling, reporting, statistical, and
							risk analysis purposes. (Applicable only to Wealth Management Group Clients)
						</Text>
					</Row>
				</Col>
			</Row>
			<Row className='border-top'>
				<Col span={24}>
					<Row justify='center'>
						<Col className='space'>
							<Title level={4}>SUPPLEMENTAL TERMS AND CONDITIONS</Title>
							<Title italic level={5}>
								General Provisions for Trading Account
							</Title>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<ol className='olpaddingTerms'>
								<Col>
									<Text className='text-h2'>
										<li>
											Documents and Information for Opening of Accounts: The CLIENT represents and
											warrants that all documents, including identification papers/cards, presented
											or to be presented, and all information provided or to be provided by the
											CLIENT to RCBCSI, in connection with the CLIENT's application for the opening
											of, or for any transaction under, any and all present and future accounts (the
											“Account/s”) with it are all genuine, true, complete and v alid and that the
											said documents have not been cancelled or revoked and the information correct
											and subsisting as of the date they were provided to RCBCSI
											<br />
											<br />
											The CLIENT also warrantsthat he will submit the documents and information
											required by RCBCSI, in relation to such account opening within the required
											period as may be imposed by RCBCSI. Failure to submitsaid documents or
											information shall result in closure of the Account/s.
											<br />
											<br />
											The CLIENT also warrantsthat, in case of any change in the submitted documents
											and information, the CLIENT will immediately inform RCBCSI in writing and
											submit all relevant documents and information in relation to such change;
											otherwise, correspondence sent to the last address given shall be deemed to
											have been received by the CLIENT.
										</li>
									</Text>
									<Text className='text-h2'>
										<li>
											Authority to Disclose: The CLIENT hereby authorizes RCBCSI and any affiliate,
											agent, representative, third party or its duly authorized personnel to
											transfer or disclose to the Bangko Sentral ng Pilipinas, Anti-Money Laundering
											Council, Bureau of Internal Revenue, the U.S. IRS, or such other relevant
											regulatory agency and their duly authorized representatives, any information
											in relation to the Account/s with RCBCSI as may be required by law,
											regulation, or agreement.
											<br />
											<br />
											The Client acknowledges that the applicable laws may require the disclosure of
											information relating to the Client and/or the accounts as required by a
											regulatory authority (anybody that has legal authority in the Philippines to
											regulate the conduct of the Client, Broker or any Exchange, Clearing House).
											The Client hereby authorizes RCBCSI whether during the continuance or after
											the termination of the Agreement, to disclose such information and to provide
											such documents (or copies) in RCBCSI's possession as may be legally requested
											by the regulatory authority, including without limitation the name of the
											Client and where known by RCBCSI the identity of the ultimate beneficiary
											which transaction are effected by the Client, and the financial position of
											the Client f or the time being as may be known to RCBCSI. The CLIENT agrees to
											indemnify and hold RCBCSI free and harmless, includi ng its officers,
											directors, employees and representatives, against any and all disputes,
											claims, demands, losses, penalties, liabilities, costs and expenses of any
											kind whatsoever, imposed on, incurred by or assessed against the CLIENT in
											respect of or in connection with the information provided in relation to the
											Accounts, the disclosure of such documents and information on the Accounts,
											and the consent herein granted
										</li>
									</Text>
									<Text className='text-h2'>
										<li>
											U.S. Person Declaration: If the CLIENT is a U.S. person (i.e., a citizen or
											lawful resident [green card holder] of the United States of America, or
											juridical entity organized under the laws of the United States of America),
											the CLIENT shall identify himself/itself as one, provide RCBC with his/its
											U.S. taxpayer identification number, and comply with all information and
											documentary requirements under U.S. regulations/agreements. The CLIENT hereby
											declares under penalty of perjury that:
											<br />
											<br />
											(a) The U.S. taxpayeridentification number provided is true and correct; and{' '}
											<br />
											(b) It/He agrees to waive any bank secrecy, privacy or data protection
											rightsrelated to the CLIENT’s Account/s
										</li>
									</Text>
									<Text className='text-h2'>
										<li>
											Withholding: The CLIENT hereby authorizes RCBCSI to withhold any and all
											taxes/ amounts in accordance with applicable local and foreign laws or
											regulations, or as may be required by or pursuant to agreements with local or
											foreign regulators, authorities or bodies. RCBCSI shall notify the CLIENT
											thereof via mail to the CLIENT’s last known address on file or via electronic
											mail to the CLIENT’s designated email address if enrolled in RCBCSI’s
											electronic channels.
										</li>
									</Text>
									<Text className='text-h2'>
										<li>
											Applicable Rules and Regulations: In all cases not specifically provided for
											in the foregoing or otherwise by writt en agreement between RCBCSI and the
											CLIENT, the usual customs and procedure common in brokers in the Philippines
											shall exclusively govern all transactions betwee n RCBCSI and the CLIENT, with
											regard to the Account/s. The Account/s are also subject to such regulations,
											terms and/or conditions as may be imposed by BSP, U.S. IRS, and other
											regulatory agencies relative to the establishment and operation of the
											Account/s
										</li>
									</Text>
									<Text className='text-h2'>
										<li>
											Lodgment in Depository.
											<br />
											<br />
											<Text>a.</Text> The CLIENT agrees that the Securities purchased by RCBCSI on
											behalf of the CLIENT may be deposited by RCBCSI in the PDTC or such other
											depository of the PSE. The CLIENT agrees to be bound by the Rules of the PDTC,
											as may be amended, supplemented, or modified from time to time, including: (i)
											Rule 2.5.2 regarding due authorization from the CLIENT for RCBCSI to lodge the
											Securities into the PDTC and the agreement by the CLIENT to abide by RCBCSI
											instructions to PDTC; and (ii) Rule 5.3 regarding the limitation of the
											CLIENT’s recovery against the PDTC in case of any loss of the Securities or
											which the CLIENT may otherwise suffer due to PDTC’s fault. For such purpose,
											the CLIENT hereby appoints RCBCSI as its agent f or the sole purpose of
											dealing with the PDTC with respect to the Securities purchased hereby, and to
											perform such other acts necessary or incidental in the operation of the PDTC.
											The CLIENT agrees to hold RCBCSI free and harmless from any and all liability
											arising from the lodging of the Securitie s in the PDTC except if due to the
											fault of RCBCSI..
											<br />
											<br />
											b. In the absence of the Client’s written instructions, securities purchased
											by the CLIENT shall be in the Street Form. Should Securities be recorded under
											the CLIENT’s name in the PDTC Depository, RCBCSI is hereby authorized
											<br />
											<br />
											(i) to enter into contracts or agreements with PDTC for the use or availment
											of the Name on Central Depository (NoCD) Facility that will allow RCBCSI
											and/or PDTC, as the case may be, to (a) open a sub-account within RCBCSI’s
											Omnibus Client Securities Account held with PDTC, lodge, account, and maintain
											the Securities holdings in the RCBCSI Omnibus Client Securities Account in a
											segregated manner and set-up, and (b) to effect transfers or movements in to
											the sub-account upon CLIENT’s instructions, and/or as warranted under the
											terms of the existing ag reements between CLIENT and RCBCSI, or in connection
											with secondary market transactions undertaken in accordance with the terms of
											the relevant Securitie s;
											<br />
											<br />
											(ii) to sign, execute and deliver the required agreements, documents and forms
											for CLIENT’s use and availment of the NoCD Facility under the applicable PDTC
											Rules and that of the relevant International Central Securities Depositories
											(ICSD) and upon such terms and c onditions, rules, policies and procedure
											acceptable to RCBCSI, as the same may be amended; and,
											<br />
											<br />
											(iii) to deduct from the proceeds of CLIENT’s sale transaction or cash
											dividend of Securities the necessary commission, fees, taxes, other trading
											charges.
											<br />
											<br />
											c. The CLIENT hereby appoints RCBCSI as the CLIENT’s agent or attorney-in-fact
											for the purpose of dealing with the PDTC with respect to the Securities
											purchased hereby, and to perform such other acts necessary or incidental in
											the operation of the PDTC. The CLIENT agrees to hold RCBCSI free and harmless
											from any and all liability arising from the lodging of the Securities in the
											PDTC except if due to RCBCSI’s gross negligence or willful misconduct. RCBCSI
											shall assist the CLIENT, as far as legally allowable, in facilitating any
											request for informatio n or filing any complaint or otherwise coordinating
											with the PDTC in connection with the Securities hereby
										</li>
									</Text>
									<Text className='text-h2'>
										<li>
											That the information collected, to be processed and retained, including
											updates shall be for the following purposes:
											<br />
											a. Account opening and client identification;
											<br />
											b. Client risk profile assessment;
											<br />
											c. Offer and referral of other products and services, and cross-selling
											subject to client’s consent herein; and
											<br />
											d. Compliance with BSP rules, AMLA, PDTC, FATCA and such other purposes that
											may be required or allowed by law.
										</li>
									</Text>
									<Text className='text-h2'>
										<li>
											Amendment: RCBCSI reserves the right to amend these Terms and Conditions at
											any time and without need of prior or subsequent notice of changes to the
											CLIENT.
											<br />
											<br />
											Any amendments or changes may be posted through the Company’s website, or by
											publication or other means of communication, electronic or otherwise.
										</li>
									</Text>
									<Text className='text-h2'>
										<li>
											Repeal: All the other terms and conditionsinconsistentwith these Supplemental
											Terms and Conditions are hereby superseded or modified accordingly
										</li>
									</Text>
								</Col>
							</ol>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row className='border-top'>
				<Title level={4} bold>
					Client Acknowledgement{' '}
				</Title>
			</Row>

			<Row className='border-top'>
				<Text className='text-h1'>
					I/We, hereby acknowledge having read and clearly understood the foregoing and agree to
					have my present and future accounts governed by these Supplemental Terms and Conditions.
				</Text>
				<Row align='middle'>
					{[...Array(4)].map((e, i) => {
						return (
							<Col span={8} offset={3} className='space'>
								<hr className='signature' />
								<Text className='text-h2'>Client Signature over Printed Name / Date</Text>
							</Col>
						);
					})}
				</Row>
			</Row>
		</>
	);
};

export default SuppliTermsAndConditions;

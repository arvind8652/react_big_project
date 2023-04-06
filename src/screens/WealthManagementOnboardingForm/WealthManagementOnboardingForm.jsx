import React, { useEffect, useState, useRef } from 'react';
import { Card, Col, Divider, Form, Row, Space, Input, Typography, Layout, Checkbox } from 'antd';
import './WealthManagement.scss';
import rcbclogo from '../../assets/img/rcbc.png';
import ClientFormData from './ClientFormData';
import jsonData from './wealthManagementOnboarding.json';
import { connect } from 'react-redux';

const { Title, Text, Paragraph } = Typography;

const WealthManagementOnboardingForm = (props) => {
	// console.log('FOOOMMM', props?.formData?.formData);
	const formData = props?.formData?.formData ? props?.formData?.formData : {};
	// console.log('FFFFF', formData);
	const styleSet = {
		space1: {
			padding: '0 0 0 5px',
			lineHeight: '25px'
		},
		name: {
			border: '1px solid black',
			borderBottom: '1px solid black',
			padding: '0 0 0 5px'
			// color: 'white',
			// backgroundColor: 'rgb(0, 89, 255)'
		},
		border: {
			border: '1px solid black'
		},

		checkBox: {
			padding: '0 0 0 5px'
		}
	};

	// console.log("JSONDATA:", jsonData);
	return (
		<div className='wealthmain'>
			<div className='wealthpage'>
				<div className='header'>
					<div className='first'>
						<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
					</div>
					<div className='wealthtitle'>
						WEALTH MANAGEMENT ONBOARDING FORM -{' '}
						{formData?.customerType === 'I' ? 'INDIVIDUAL' : 'CORPORATE'}
						{/* <span style={{ margin: "0 0 0 40px" }}>For {customerType()} Accounts</span> */}
					</div>
				</div>

				<div className='heading1'>Personal Information</div>
				{formData?.customerType === 'I' && (
					<div>
						<Row style={styleSet.name}>
							<Col span={24}>Name</Col>
						</Row>
					</div>
				)}
				{formData?.customerType === 'C' && (
					<div>
						<Row style={styleSet.name}>
							<Col span={24}>Corporate Name</Col>
						</Row>
						<Row style={styleSet.name}>
							<Col span={24}>Corporate Representative/Contact Person</Col>
						</Row>
					</div>
				)}
				<br />
				<div className='heading1'>
					Wealth Management <br />
					Statement of Account(SOA) Mailing Instructions
				</div>
				<div>
					<Row>
						<Col>
							<Text>Preferred form and frequency of mailing the SOA:</Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Text>Form (please choose one only)</Text>
						</Col>
					</Row>
					<Row>
						<Checkbox>Electronic Delivery (send to my e-Mail Address per RCBC records)</Checkbox>
					</Row>
					<Row>
						<Checkbox>
							Printed / Hard Copy (send to my Present or Office or Mailing Address per RCBC records)
						</Checkbox>
					</Row>
					<Row>
						<Checkbox>Present Address</Checkbox>
						<Checkbox>Office Address</Checkbox>
						<Checkbox>Mailing Address</Checkbox>
					</Row>
					<Row>
						<Checkbox>Mailed or delivered to me only</Checkbox>
					</Row>
					<Row>
						<Col>
							<Checkbox>Mailed or delivered to me or to my authorized representative:</Checkbox>
						</Col>
						<Col>
							<Text underline> (Name of Authorized Representative)</Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Checkbox> Pick-up by me or by my authorized representative:</Checkbox>
						</Col>
						<Col>
							<Text underline>(Name of Authorized Representative)</Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Text underline>(Preferred RCBC Branch or Office where to pick-up the SOA)</Text>
						</Col>
					</Row>
					<Row>
						<Text>
							<b>Frequency</b>
						</Text>
					</Row>
					<Row>
						<Col>
							<Checkbox>Monthly</Checkbox>
						</Col>
						<Col>
							<Checkbox>Semi-Annual</Checkbox>
						</Col>
						<Col>
							<Checkbox>Quarterly</Checkbox>
						</Col>
						<Col>
							<Checkbox>Annual</Checkbox>
						</Col>
						<Col>
							<Checkbox>Upon request</Checkbox>
						</Col>
					</Row>
					<Row>
						<Paragraph>
							Should I/we fail to notify RCBC Wealth Management in writing of any changes in my/our
							preferred mailing address, SOA shall be directed to my/our mailing address per RCBC
							records.
						</Paragraph>
					</Row>
				</div>
				<div className='heading1'>Electronic Instructions Agreement</div>
				<div>
					{formData?.customerType === 'I' && (
						<Row>
							<Checkbox>
								<b>
									I/we would like to avail of the Electronic Instruction service and hereby agree to
									the pertinent terms and conditions governing the same as provided below.
								</b>
							</Checkbox>
						</Row>
					)}
					<Row>
						<Text> "KNOW ALL MEN BY THESE PRESENTS:"</Text>
					</Row>
					<Row>
						<Text>This Electronic Instructions Agreement (the “Agreement”) executed by:</Text>
					</Row>
					{formData?.customerType === 'I' && (
						<Row>
							________________________________________________________________ Filipino, of legal
							age, (single/married), with residence at _________________________________________
							_______________________________________________________ (hereinafter referred to as
							the “CLIENT”);
						</Row>
					)}
					{formData?.customerType === 'C' && (
						<Row>
							________________________________________________________________, a corporation duly
							organized and existing under the laws of the Republic of the Philippines, with
							principal office address at
							___________________________________________________________________________________________________
							_______________________________, as herein represented by its
							_____________________________________________________________, (hereinafter referred
							to as the “CLIENT”);
						</Row>
					)}
					<Row>
						<Text>- In favor of – </Text>
					</Row>
					<Row>
						<Paragraph>
							RIZAL COMMERCIAL BANKING CORPORATION, a banking corporation duly organized and
							existing in accordance with Philippine laws, with principal office address at
							Yuchengco Tower, RCBC Plaza, 6819 Ayala Avenue, Makati City, as herein represented by
							its ________________________, through its _________________,
							____________________________, hereinafter referred to as the “BANK”;
						</Paragraph>
					</Row>
					<Row>WITNESSETH: That –</Row>
					<Row>WHEREAS:</Row>
					<Row>
						<Col span={24} style={styleSet.space1}>
							<ol type='a'>
								<li>{ClientFormData.dataA}</li>
								{/* <br/> */}
								<li>{ClientFormData.dataB}</li>
							</ol>
						</Col>
					</Row>
					<Row>
						<Col>
							NOW, THEREFORE, in consideration of the foregoing premises, the Client hereby agrees
							as follows:
							<ol>
								{jsonData &&
									jsonData?.electronic.map((item) => {
										return (
											<li>
												<b>{item.title}</b>
												<br />
												{item.text && <Text>{item.text}</Text>}
												{!item.para ? (
													<ol type='a'>
														{item.list.map((list) => {
															return (
																<div>
																	<li>{list}</li>
																	<br />
																</div>
															);
														})}
													</ol>
												) : (
													item.para.map((subItem) => {
														return (
															<div>
																<span>{subItem}</span>
																<br />
															</div>
														);
													})
												)}
												<br />
												<span>{item.subText && item.subText}</span>
												{item.subText && <br />}
												{item.subList ? (
													<ol type='a'>
														{item.subList.map((subList) => {
															return (
																<div>
																	<li>{subList}</li>
																	<br />
																</div>
															);
														})}
													</ol>
												) : (
													''
												)}
											</li>
										);
									})}
								{/* <li>
                  <b>ISSUANCE OF E-INSTRUCTIONS</b>
                  <ol type="a">
                    <li> {ClientFormData.insuranceA}</li>
                    <li> {ClientFormData.insuranceB}</li>
                    <li>{ClientFormData.insuranceC}</li>
                  </ol>
                </li>
                <li>
                  <b>FORM OF E-INSTRUCTIONS</b>
                  <br />
                  <Text> The Client shall ensure that all E-mail Instructions:</Text>
                  <ol type="a">
                    <li>{ClientFormData.formA}</li>
                    <li>{ClientFormData.formB}</li>
                    <li>{ClientFormData.formC}</li>
                    <li>{ClientFormData.formD}</li>
                    <li>{ClientFormData.formE}</li>
                    <li>{ClientFormData.formF}</li>
                  </ol>
                  <br />
                  The Client shall ensure that all Ephemeral Instructions:
                  <ol type="a">
                    <li>{ClientFormData.formEphemeralA}</li>
                    <li>{ClientFormData.formEphemeralB}</li>
                    <li>{ClientFormData.formEphemeralC}</li>
                  </ol>
                </li>
                <br />
                <li>
                  <b>ACTS OF THE BANK</b>
                  <br />
                  <Text>As an accommodation to the Client:</Text>

                  <ol type="a">
                    <li>{ClientFormData.AccomodationA}</li>
                    <li>{ClientFormData.AccomodationB}</li>
                    <li>{ClientFormData.AccomodationC}</li>
                    <li>{ClientFormData.AccomodationD}</li>
                    <li>{ClientFormData.AccomodationE}</li>
                    <li>{ClientFormData.AccomodationF} </li>
                    <li>{ClientFormData.AccomodationG}</li>
                    <li>{ClientFormData.AccomodationH}</li>
                  </ol>
                  <li>
                    <b>RISKS ASSUMED BY THE CLIENT</b>
                    <br />
                    {ClientFormData.RiskDescpFirst} <br />
                    {ClientFormData.RiskDescpSecond} <br />
                    {ClientFormData.RiskDescpThird}
                  </li>

                  <li>
                    <b>SUSPENSION OF PROCESS</b> <br />
                    {ClientFormData.SuspensionProcess}
                  </li>
                  <li>
                    <b>CONCLUSIVENESS OF E-INSTRUCTIONS</b> <br />
                    {ClientFormData.ConclusivenessFirst}
                    <br />
                    {ClientFormData.ConclusivenessSecond}. <br /> {ClientFormData.ConclusivenessThird} <br />{" "}
                    {ClientFormData.ConclusivenessFourth}
                  </li>
                  <li>
                    <b>INDEMNITY</b>
                    <br />
                    {ClientFormData.IndemnityFirst}
                    <br />
                    {ClientFormData.IndemnitySecond}
                  </li>
                  <li>
                    <b>ENFORCEABILITY, AMENDMENTS, GOVERNING LAW and VENUE</b>
                    <br />
                    {ClientFormData.EnforeabilityFirst}
                    <br />
                    {ClientFormData.EnforeabilitySecond}
                  </li>
                  <li>
                    <b> EFFECTIVITY</b>
                    {ClientFormData.Effectivity}
                  </li>
                  <li>
                    <b> SEVERABILITY</b>
                    <br />
                    {ClientFormData.Serverability}
                  </li>
                  <li>
                    <b>NO WAIVER</b>
                    <br />
                    {ClientFormData.NoWaiver}
                  </li>
                  <li>
                    <b>COUNTERPARTS</b>
                    <br />
                    {ClientFormData.Counterparts}
                  </li>
                  <li>
                    <b>MISCELLANEOUS</b>
                    <br />
                    {ClientFormData.MiscellaneousFirst}
                    <br />
                    {ClientFormData.MiscellaneousSecond}
                  </li>
                </li> */}
							</ol>
						</Col>
						<div>
							<h4>
								<center style={{ backgroundColor: '#DCDCDC' }}>SCHEDULE 1</center>
							</h4>
							<div>
								"DESIGNATED EMAIL/TELEPHONE NUMBER/MESSAGE APP ACCOUNTS OF ACCOUNTHOLDER AUTHORIZED
								TO SIGN, EXECUTE, ISSUE, AND/OR DELIVER TO THE BANK E-INSTRUCTIONS"
							</div>
							<br />
							<Row>
								<Col span={4}>EMAIL ACCOUNT</Col>
								<Col span={20}>
									<Input
										type='text'
										style={{
											borderBottom: '1px solid black',
											borderLeft: '0',
											borderTop: '0',
											borderRight: '0',
											borderRadius: '0',
											backgroundColor: 'white'
										}}
									/>
								</Col>
							</Row>
							<Row>
								<Col span={8}>TELEPHONE (CELLPHONE) NUMBER:</Col>
								<Col span={16}>
									<Input
										type='text'
										style={{
											borderBottom: '1px solid black',
											borderLeft: '0',
											borderTop: '0',
											borderRight: '0',
											borderRadius: '0',
											backgroundColor: 'white'
										}}
									/>
								</Col>
							</Row>
							<Row>
								<Col span={4}>VIBER ACCOUNT:</Col>
								<Col span={20}>
									<Input
										type='text'
										style={{
											borderBottom: '1px solid black',
											borderLeft: '0',
											borderTop: '0',
											borderRight: '0',
											borderRadius: '0',
											backgroundColor: 'white'
										}}
									/>
								</Col>
							</Row>
							<Row>
								<Col span={4}>WHATSAPP ACCOUNT:</Col>
								<Col span={20}>
									<Input
										type='text'
										style={{
											borderBottom: '1px solid black',
											borderLeft: '0',
											borderTop: '0',
											borderRight: '0',
											borderRadius: '0',
											backgroundColor: 'white'
										}}
									/>
								</Col>
							</Row>
							<div>
								"DESIGNATED EMAIL/TELEPHONE NUMBER/MESSAGE APP ACCOUNTS OF ACCOUNTHOLDER AUTHORIZED
								TO CONFIRM TO THE BANK E-INSTRUCTIONS"
							</div>
							<br />
							<Row>
								<Col span={4}>EMAIL ACCOUNT</Col>
								<Col span={20}>
									<Input
										type='text'
										style={{
											borderBottom: '1px solid black',
											borderLeft: '0',
											borderTop: '0',
											borderRight: '0',
											borderRadius: '0',
											backgroundColor: 'white'
										}}
									/>
								</Col>
							</Row>
							<Row>
								<Col span={8}>TELEPHONE (CELLPHONE) NUMBER:</Col>
								<Col span={16}>
									<Input
										type='text'
										style={{
											borderBottom: '1px solid black',
											borderLeft: '0',
											borderTop: '0',
											borderRight: '0',
											borderRadius: '0',
											backgroundColor: 'white'
										}}
									/>
								</Col>
							</Row>
							<Row>
								<Col span={4}>VIBER ACCOUNT:</Col>
								<Col span={20}>
									<Input
										type='text'
										style={{
											borderBottom: '1px solid black',
											borderLeft: '0',
											borderTop: '0',
											borderRight: '0',
											borderRadius: '0',
											backgroundColor: 'white'
										}}
									/>
								</Col>
							</Row>
							<Row>
								<Col span={4}>WHATSAPP ACCOUNT:</Col>
								<Col span={20}>
									<Input
										type='text'
										style={{
											borderBottom: '1px solid black',
											borderLeft: '0',
											borderTop: '0',
											borderRight: '0',
											borderRadius: '0',
											backgroundColor: 'white'
										}}
									/>
								</Col>
							</Row>
							<div>AUTHORIZED PERSONNEL</div>
							<div>
								"to accept, receive and/or pick-up manager’s checks, bank statements, checkbook
								orders, bank certification, if requested by the Client."
							</div>
							<div>
								<table id='customers'>
									<tbody>
										<tr style={{ height: '40px' }}>
											<td style={{ width: '200px' }}>Name</td>
											<td>Position</td>
											<td>Email Account</td>
											<td>Contact Number</td>
											<td>Specimen Signature</td>
										</tr>
										<tr style={{ height: '40px' }}>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr style={{ height: '40px' }}>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr style={{ height: '40px' }}>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr style={{ height: '40px' }}>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
									</tbody>
								</table>
							</div>
							<br />
							<div>
								<h4>
									<center style={{ backgroundColor: '#DCDCDC' }}>SCHEDULE 2</center>
								</h4>
								<h4>
									<center style={{ fontWeight: 'bold' }}>(Attach Special Power of Attorney)</center>
								</h4>
							</div>
							<div>
								<h4 className='heading1'>Settlement Through Checks Agreement</h4>
								<Row>
									<Checkbox>
										<b>
											I/we would like to avail of the Settlement Through Checks service and hereby
											agree to the pertinent terms and conditions governing the same as provided
											below.
										</b>
									</Checkbox>
								</Row>
								<br />
								<Row>
									<Col>
										<Paragraph>
											In relation to any bill(s) of change and/or check/s (collectively, "BILL/S")
											that I/we may from time to time deliver RCBC for RCBC for the purpose of
											funding any time deposit/s, purchasing any bonds and securities, or placing
											any investments in my/our behalf (collectively, "Investments"), I/we hereby
											confirm, undertake, warrant and agree as follows:
										</Paragraph>
										<ol>
											{jsonData &&
												jsonData?.settlement.map((item) => {
													return !item.list ? (
														<div>
															<li>
																<Text>{item.text}</Text>
															</li>
															<br />
														</div>
													) : (
														<ol type='a'>
															{item.list.map((list, idx) => {
																return (
																	<div key={idx}>
																		<li>
																			<Text>{list}</Text>
																		</li>
																		<br />
																	</div>
																);
															})}
														</ol>
													);
												})}
										</ol>
									</Col>
								</Row>
							</div>
							<div>
								<div className='heading1'>Data Privacy Consent Form</div>
								<br />
								<Row>
									<Paragraph>
										This is to grant consent on the use and sharing of my/our personal information
										obtained in the course of any commercial or other contractual transactions
										between me/us, my/our company and any of the following Yuchengco Group of
										Companies (YGC):
									</Paragraph>
								</Row>
								<Row>
									<Paragraph>
										Rizal Commercial Banking Corporation (RCBC), RCBC Securities Inc., RCBC Bankard
										Services Corp., RCBC Leasing and Finance Corp., RCBC Rental Corp., RCBC Capital
										Corp., Sunlife Grepa, Merchants Savings & Loan Association Inc. (Rizal
										Microbank), Malayan Insurance Co. Inc., RCBC Forex Brokers Corp., First
										Nationwide Assurance Corp., Bankers Assurance Corp., Malayan Education System
										Inc., EEI Corp., House of Investments Inc., MICO Equities Inc., and Blackhounds
										Security and Investigation Agency, Inc.
									</Paragraph>
								</Row>
								<Row>
									<Paragraph>
										I/we acknowledge and agree that any of the above members of the YGC may share my
										personal and sensitive personal data with RCBC which may include the following:
										Name, Address, Gender, Birthdate, Marital Status, Contact Details, SSS, GSIS,
										TIN, Financial Information, Risk Profile, Information Relation To My/Our Account
										or Transactions.
									</Paragraph>
								</Row>
								<Row>
									<Paragraph>
										These data may be collected, processed, stored, updated, or disclosed by any
										member of the YGC entities and shared among them for the following purposes:
									</Paragraph>
								</Row>
								<Row>
									<Col>
										<ol type='i'>
											{jsonData &&
												jsonData?.dataPrivacy.map((item, idx) => {
													return (
														<div key={idx}>
															<li>
																<Text>{item.text}</Text>
															</li>
															<br />
															{item.list && (
																<ol type='a'>
																	{item.list.map((list, idx) => {
																		return (
																			<div key={idx}>
																				<li>
																					<Text>{list}</Text>
																				</li>
																				<br />
																			</div>
																		);
																	})}
																</ol>
															)}
														</div>
													);
												})}
										</ol>
									</Col>
								</Row>
								<Row>
									<Paragraph>
										I/We  Agree  Disagree that YGC entities may process, disclose, use my/our
										information for profiling, direct marketing, selling, and cross-selling of
										products and services.
									</Paragraph>
								</Row>
								<Row>
									<Paragraph>
										My/Our consent authorizes members of the YGC entities to process, collect, use,
										store, or disclose my/our information between them and to other members, and to
										Governmental Authorities, as may be necessary.
									</Paragraph>
								</Row>
								<Row>
									<Paragraph>
										I/We understand that YGC entities are committed to ensuring the confidentiality
										of my/our information under Republic Act No. 1405 or the “Bank Secrecy Law,”
										Republic Act No. 8791 or the “General Banking Law of 2000,” Republic Act No.
										6426 or “The Foreign Currency Deposit Act”, Republic Act No. 10173 or “Data
										Privacy Act”, subject to Applicable Law and will exert reasonable efforts to
										protect against unauthorized use or disclosure.
									</Paragraph>
								</Row>
								<Row>
									<Paragraph>
										Further, I/We understand that I may access, update, or correct certain personal
										information, or withdraw consent to the use of any of my information as set out
										in this letter at any given time by communicating with RCBC Data Protection
										Officer (DPO) at RCBC Head Office, Yuchengco Tower, RCBC Plaza, 6819 Ayala Ave.,
										0727, Makati City, tel no. 8894-9000 and dataprivacy@rcbc.com.
									</Paragraph>
								</Row>
								<Row>
									<Paragraph>
										I/We recognize that I/We may file complaints with and/or seek assistance from
										the National Privacy Commission.
									</Paragraph>
								</Row>
								<Row>
									<Paragraph>
										I/We hereby acknowledge that this record supplements any other consent I/We may
										have previously provided to YGC entities. This form is to be construed in
										accordance with Philippine Law.
									</Paragraph>
								</Row>
							</div>
							<div>
								<div className='heading1'>Client Acknowledgement</div>
								<Row>
									<Paragraph>
										"I/we confirm that I/we have read and understood the above terms and conditions
										for the foregoing services and agree to abide by the foregoing. I/we likewise
										hereby agree to be bound by the appropriate Terms and Conditions governing the
										operation of each of my/our aforementioned present and future Accounts /
										Investments as stated in this form."{' '}
									</Paragraph>
								</Row>
								<Row>
									"REPUBLIC OFTHE PHILIPPINES <br />
									SS. "
								</Row>
								<Row>
									BEFORE ME, Notary Public for and in ________________________________________,
									personally appeared the following persons with their respective Government-Issued
									IDs:
								</Row>
								<br />
								<Row>
									<Col span={8}>
										<div style={{ textAlign: 'center', height: '20px' }}> Name</div>
									</Col>
									<Col span={8}>
										<div style={{ textAlign: 'center' }}> Government Issued ID</div>
									</Col>
									<Col span={8}>
										<div style={{ textAlign: 'center' }}> Date and Place of Issue</div>
									</Col>
								</Row>
								<Row>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
								</Row>
								<Row>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
								</Row>
								<Row>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
									<Col span={8}>
										<div
											style={{
												borderBottom: '1px solid black',
												backgroundColor: 'white',
												marginLeft: '20px',
												height: '20px'
											}}
										></div>
									</Col>
								</Row>

								<Row>
									<Text>
										Known to me and to me known to be the same person/s who executed the foregoing
										instrument and they/he/she acknowledged to me that the same is their/his/her
										free act and deed and that of the corporations represented herein
									</Text>
								</Row>
								<Row>
									<Text>
										This instrument refers to a Wealth Management Onboarding Form consisting of ____
										(__) pages, including this page whereon this Acknowledgment is written, each of
										which is signed by the parties and their instrumental witnesses.{' '}
									</Text>
								</Row>

								<div
									style={{
										borderRight: '1px solid black',
										borderLeft: '1px solid black',
										borderBottom: '1px solid black',
										borderTop: '1px solid black'
									}}
								>
									<Row>
										<Col span={12} style={{ borderRight: '1px solid black' }}>
											<div style={{ width: '90%', padding: '0 0 0 60px' }}>
												<Input
													type='text'
													style={{
														borderBottom: '1px solid black',
														borderLeft: '0',
														borderTop: '0',
														borderRight: '0',
														borderRadius: '0',
														backgroundColor: 'white'
													}}
												/>
											</div>
											<div style={{ padding: '0 0 0 60px' }}>Signature over Printed Name/Date</div>
										</Col>
										<Col span={12}>
											<div style={{ width: '90%', padding: '0 0 0 60px' }}>
												<Input
													type='text'
													style={{
														borderBottom: '1px solid black',
														borderLeft: '0',
														borderTop: '0',
														borderRight: '0',
														borderRadius: '0',
														backgroundColor: 'white'
													}}
												/>
											</div>
											<div style={{ padding: '0 0 0 60px' }}>Signature over Printed Name/Date</div>
										</Col>
									</Row>
									<Row>
										<Col span={24}>
											<div
												style={{
													textAlign: 'center',
													borderTop: '1px solid black',
													borderBottom: '1px solid black'
												}}
											>
												Signed in the presence of:
											</div>
										</Col>
									</Row>
									<Row style={{ height: '100px' }}>
										<Col span={12} style={{ borderRight: '1px solid black' }}>
											<div style={{ width: '90%', marginBottom: '20px', padding: '0 0 0 60px' }}>
												<Input
													type='text'
													style={{
														borderBottom: '1px solid black',
														borderLeft: '0',
														borderTop: '0',
														borderRight: '0',
														borderRadius: '0',
														backgroundColor: 'white'
													}}
												/>
											</div>
										</Col>
										<Col span={12}>
											<div style={{ width: '90%', marginBottom: '20px', padding: '0 0 0 60px' }}>
												<Input
													type='text'
													style={{
														borderBottom: '1px solid black',
														borderLeft: '0',
														borderTop: '0',
														borderRight: '0',
														borderRadius: '0',
														backgroundColor: 'white'
													}}
												/>
											</div>
										</Col>
									</Row>
									<div className='heading1'>FOR BANK'S USE ONLY</div>
									<div>
										<Row>
											<Col>CIF Number</Col>
										</Row>
									</div>
								</div>
							</div>
						</div>
					</Row>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		formData: state.customerCreateFormData
	};
};

export default connect(mapStateToProps, null)(WealthManagementOnboardingForm);

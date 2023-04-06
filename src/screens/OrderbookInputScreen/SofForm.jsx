import { Row, Col, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import './SofForm.scss';
import rcbclogo from '../../assets/img/rcbc.png';
import moment from 'moment';
import { connect } from 'react-redux';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';

const { Title, Text, Paragraph } = Typography;

const SofForm = ({ sofFormData, settleMentDate, jointAccountDetails, secondaryOrder }) => {
	const styleSet = {
		name: {
			padding: '40px',
			border: '2px solid gray'
		},
		signature: {
			border: '2px solid gray'
		},
		space: {
			paddingTop: '20px'
		},
		innerSpace: {
			paddingTop: '60px'
		},
		instruction: {
			border: '2px solid gray',
			padding: '0px 15px'
		},
		text: {
			color: 'gray'
		}
	};

	return (
		<>
			<Row>
				<Col span={9} offset={1}>
					{/* <span style={{color: '#0a7fdf',fontSize:"50px"}}>RCBC</span> */}
					{/* <div className="first"> */}
					<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
					{/* </div> */}
					{/* <img src={pnbLogo} alt="logo" /> */}
					{/* <div className="first">
                        <span style={{ color: 'blue' }}>PNB</span>
                        <span style={{ color: 'green', margin: '0 0 0 3px' }}>Wealth</span>
                    </div> */}
					<Title level={3}>SECURITIES ORDER FORM</Title>
					<Text underline strong>
						Date:({moment(sofFormData?.date).format('DD-MMMM-YYYY')})
					</Text>
					<div style={styleSet.space}>
						<Text strong>Client Name</Text>
					</div>
					<Row>
						<Col span={18}>
							<table id='customers'>
								<tbody>
									<tr>
										<th>Last Name</th>
										<th>First Name</th>
										<th>Middle Initial</th>
									</tr>
									{jointAccountDetails?.map((e) => (
										<tr>
											<td className='head'>{e?.lastName}</td>
											<td>{e?.firstName}</td>
											<td>{e?.middelName}</td>
										</tr>
									))}
									{/* <tr>
                                        <td className="head">{sofFormData?.client?.lastName}</td>
                                        <td>{sofFormData?.client?.firstName}</td>
                                        <td>{sofFormData?.client?.midddleName}</td>
                                    </tr> */}
								</tbody>
							</table>
						</Col>
					</Row>
					<div style={styleSet.space}>
						<Text>Please Refer to My Instruction Below</Text>
					</div>
					<div style={styleSet.space}>
						<Col span={16}>
							<div style={styleSet.instruction}>
								<Row>
									<Col span={3}>
										<Text>RCBC</Text>
									</Col>
									<Col>
										<Checkbox checked={sofFormData?.pnb == 'BUY'}>BUYS</Checkbox>
									</Col>
									<Col>
										{' '}
										<Checkbox checked={sofFormData?.pnb == 'SELL'}>SELLS</Checkbox>
									</Col>
								</Row>
							</div>
							<table id='customers'>
								<tbody>
									<tr>
										<td className='head'>Trade Date</td>
										<td>{moment(sofFormData?.date).format('DD-MMMM-YYYY')}</td>
									</tr>
									<tr>
										<td className='head'>Settlement Date</td>
										<td>{settleMentDate && moment(settleMentDate).format('DD-MMMM-YYYY')}</td>
									</tr>
									<tr>
										<td className='head'>Value Date</td>
										<td>{moment(sofFormData?.date).format('DD-MMMM-YYYY')}</td>
									</tr>
									<tr>
										<td className='head'>Security Name/ID</td>
										<td>{secondaryOrder?.security}</td>
									</tr>
									<tr>
										<td>Face Amount</td>
										<td className='head'>
											{<RupeeOrNonRupee amount={secondaryOrder?.fcyGrossVal || ' '} />}
										</td>
									</tr>
								</tbody>
							</table>
							<div style={styleSet.space}>
								<table id='customers'>
									<tbody>
										<tr>
											<td className='head2'>
												<Checkbox
													className='large-checkbox'
													checked={secondaryOrder?.otherInstruction == 'AORN'}
												></Checkbox>
											</td>
											<td>{'All or Nothing'}</td>
										</tr>

										<tr>
											<td className='head2'>
												<Checkbox
													className='large-checkbox'
													checked={secondaryOrder?.otherInstruction == 'EAA'}
												></Checkbox>
											</td>
											<td>
												{
													'Execute available amount(below face Amount) if within target price.Total transacted amount should not exceed face mount'
												}
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div style={styleSet.space}>
								<Title level={5}>YTM/Price(Gross)</Title>
								<table id='customers'>
									<tbody>
										<tr>
											<td className='head2'>
												<Checkbox className='large-checkbox' checked={true}></Checkbox>
											</td>
											<td>
												{'One YTM/Price' + '  '}
												<Text style={{ marginRight: '10px' }} underline strong>
													{secondaryOrder?.purYield || secondaryOrder?.rate}
												</Text>
												{'or better' + ' '}
											</td>
										</tr>

										<tr>
											<td className='head2'>
												<Checkbox className='large-checkbox'></Checkbox>
											</td>
											<td>
												Range<Text underline>{'________________'}</Text>or better{' '}
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div style={styleSet.space}>
								<Title level={5}>Validity Period</Title>
								<table id='customers'>
									<tbody>
										<tr>
											<td className='head2'>
												<Checkbox
													className='large-checkbox'
													checked={secondaryOrder?.orderInstruction == 'GFD'}
												></Checkbox>
											</td>
											<td>Good For The Day</td>
										</tr>

										<tr>
											<td className='head2'>
												<Checkbox
													className='large-checkbox'
													checked={secondaryOrder?.orderInstruction == 'GTC'}
												></Checkbox>
											</td>
											<td>Good Until Cancelled per Terms and Conditions nos. 4 and 5</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div style={styleSet.space}>
								<Title level={5}>Fee Disclosure</Title>
								<Text strong>
									Our Standard broker's fee is 25bps as may be adjusted from time to time based on
									face value traded .Please Note that other fee such as transfer, and settlement
									fees may be charged by Third Parties i.e. Registry ,Depository ,or Clearing
									House(detail of the fees are in the confirmation of sale or purchase) .If you have
									any questions,please contact your Relationship Manager.
								</Text>
							</div>
							<div style={styleSet.space}>
								<table id='customers'>
									<tbody>
										<tr>
											<td>Other Instruction/s</td>
										</tr>
										<tr style={{ height: '40px' }}>
											<td></td>
										</tr>
										<tr style={{ height: '40px' }}>
											<td></td>
										</tr>
										<tr style={{ height: '40px' }}>
											<td></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div style={styleSet.space}>
								<Text>
									By Sigining below,I/We authorize Rizal Commercial Banking Corporation (RCBC) to
									execute my/our instructions above and I/We agree to the Terms and Conditions below
									which include the processing of all personal data obtained from me to effect
									my/our instructions above in accordance with the Bank's data Privacy Policy
								</Text>
								<div style={styleSet.space}>
									<table id='customers'>
										<tbody>
											<tr style={{ height: '80px' }}>
												<td>
													{sofFormData?.client?.firstName ||
														' ' + ' ' + sofFormData?.client?.lastname ||
														' ' + sofFormData?.client?.middleName ||
														' '}
												</td>
											</tr>
											<tr>
												<td>{" CLIENT'S SIGNATURE OVER PRINTED NAME"}</td>
											</tr>
											<tr style={{ height: '80px' }}>
												<td></td>
											</tr>
											<tr>
												<td>{" CLIENT'S SIGNATURE OVER PRINTED NAME"}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div style={styleSet.space}>
									<div style={styleSet.signature}>
										<Title level={5}>FOR BANKS USE ONLY</Title>
										<Title level={5}>Signature Verified By</Title>
										<Title level={5} underline>
											{'SSO__________________________________________'}
										</Title>
									</div>
								</div>
							</div>
						</Col>
					</div>
				</Col>
				<Col span={12}>
					<div style={styleSet.space}>
						<table id='customers'>
							<tbody>
								<tr style={{ width: '400px' }}>
									<td className='head'>Branch/Unit</td>
									<td>{secondaryOrder?.branch}</td>
								</tr>

								<tr style={{ width: '400px' }}>
									<td className='head'>Reference</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div style={styleSet.space}>
						<Title level={4}>Terms And Conditions</Title>
						<div style={styleSet.space}>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>1.</Text>
								RCBC is only acting as my/our Broker in the purchase and sale of fixed income
								securities/corporate bonds. I/We have conducted my/our own research and due
								diligence in studying the risk of trading securities.
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>2.</Text>
								All gains and losses shall be for my/our account,The issuer of the securities
								guarantees the payment of the principal and interest. The transaction is not covered
								by the Phillipine Deposit insuarance Corporation
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>3.</Text>
								This provides as my/our firm, unqualified and irrecocable commitment to trade the
								security indicated bove and that RCBC as my/our Broker will work on the order on the
								order on a best effort basis.
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>4.</Text>
								if my/our order has been executed already .I/we cannot cancel my/our order but I/we
								can instruct RCBC as my/our broker,to buy or sell the security I/we sold or bought
								and if there is any LOSS .it will be for my account
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>5.</Text>
								If my/our order has not yet been executed .I/We can cancel my/our order by advising
								the Bank trough my/our registered mobile number using any mobile app
								(e.g.text,viber,etc.),registered email address or a signed letter of cancellation
								given to branch of account .The order is deemed cancelled upon my/our receipt of the
								Bank's email confirming my/our cancellation order
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>6.</Text>
								if the good for the day order is not executed within the day ,I/We confirm that the
								order is automatically cancelled including this form.
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>7.</Text>
								I/We understand that the Broker shall use resonable diligence to ascertain the best
								market for the security, in accordance with the best execution rule.
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>8.</Text>
								The National Registry of Scripless Securities(NRoSS) administered by the Bureau of
								Treasury is the official Registry for Phillippine Peso-denominated Government
								Securities . The Phillippine Depository and Trust Corp.(PDTC)is the registry for
								phillippine Peso-denominated corporate bonds and teh custodian for USD-denominated
								securities,My/Our Registry/Custody/Account shall reflect the balance of securities
								under my name .I/We ,as authorized signatories ,have read and understood the
								BTR/PDTC Rules ,Terms and Conditions ,and prospectus distributed by the
								issuer,Underwriters,and selling Agents in relation to the offer and sales of Bonds
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>9.</Text>
								The final Terms of the deal including face amount ,YTM,fees,etc.are found in the
								confirmation of Sale/Purchase upon settlement.
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>10.</Text>
								I/we acknowledge that the offering Circular of the security i bought has the
								complete terms and conditions of the security
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>11.</Text>
								Dealing the securities may expose me to certain risks including but not lmited to
								the following:a.) risk that the price of the security may move higher or lower tha
								its purchase price resulting in profit or loss;b.) risk that the issuer of the
								security may not be able to pay the coupons and/or face amount of the security at if
								fail due;c.) risk that the security may not be sold the desired price and time
								especially if amount of security purchased below minimum tradeable lot size .If
								order is below minimum tradable lot size,the Bank will exercise its best efforts in
								executiong the order
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>12.</Text>
								I/We acknowledge that Register ,Paying Agent,Selling Agents shall perform their
								obiligations and be liable only to the extent provided in the revalent agreements.
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>13.</Text>
								I/we understand that all personal data obtained from me for this transaction will be
								used only for effecting my/our security transaction and will be processed in
								accordance with the Bank's Data Privcy policy provided in the Bank's website
								(www.rcbc.com) and applicable data privacy laws,rules and regulation as may be
								amended from time to time.
							</Paragraph>
							<Paragraph>
								<Text style={{ marginRight: '20px' }}>14.</Text>
								Rizal Commercial Banking Corporation is regulated by the Bangko Sentral ng Pilipinas
								for inquiries/complaints,you may contact the BSP thru the BSP webchat -
								http://www.bsp.gov.ph/ or send a SMS using 021582277 (for Globe subscibers only) or
								message BSP via the BSP Facebook page
								https://www.facebook.com/BangkoSentralngPilipinas .You may also email RCBC at
								customercare@rcbc.com
							</Paragraph>
						</div>
					</div>
					<Col span={16} offset={16}>
						<div style={styleSet.space}>
							<Title level={5}>Form No.WMG012</Title>
						</div>
					</Col>
				</Col>
			</Row>
		</>
	);
};

// export default SofForm;

const mapStateToProps = (state) => {
	return {
		sofFormData: state.pNBData?.sofFormData,
		settleMentDate: state.pNBData?.calculateSMOrder?.dealRequisition?.delDate,
		jointAccountDetails: state.pNBData?.jointAccountDetails,
		secondaryOrder: state.pNBData?.secondaryOrder
	};
};

export default connect(mapStateToProps)(SofForm);

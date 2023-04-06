import { Col, Row, Table } from 'antd';
import React from 'react';
import './CIAFPersonal.scss';
import CIAFPersonalInformation from './CIAFPersonalInformation';
import { CIAFTermsAndConditions } from './CIAFTearmsAndConditions';
import '../SigCardPersonal.scss';
import imgSrc from '../../../../assets/img/rcbcSecurities.png';

const CIAFPersonal = () => {
	return (
		<div className='print'>
			<div>
				<p className='styled-note'>
					Note: All fields are required and must be filled-up. Please put "<b>N/A</b>" if not
					applicable
				</p>
			</div>

			<table className='styled-table applyed-mrgn'>
				<tr>
					<Row>
						<Col span={6}>
							<img className='placing-img' src={imgSrc} />
						</Col>
						<Col>
							<p className='styled-heading' style={{ textAlign: 'right' }} span={4}>
								CUSTOMER ACCOUNT INFORMATION FORM & AGREEMENT PERSONAL
							</p>
						</Col>
					</Row>
				</tr>

				<th className='styled-t-d-h'>
					<p className='bg-clr lft-alg'>ACCOUNT CODE:</p>
					<tr>
						<td className='styled-t-d-h'>Customer Type:</td>
						<td className='styled-t-d-h'>Individual</td>
						<td className='styled-t-d-h'>
							Joint "and" <input type='checkbox'></input>
						</td>

						<td className='styled-t-d-h'>Joint "and/or"</td>
					</tr>
					<tr>
						<td className='styled-t-d-h'></td>
						<td className='styled-t-d-h'>
							Walk-in Client <input type='checkbox'></input>
						</td>

						<td className='styled-t-d-h'>
							Existing Client <input type='checkbox'></input>
						</td>

						<td className='styled-t-d-h'>
							Referred by: <span className='empty-space'></span>
						</td>
					</tr>
					<tr>
						<td className='styled-t-d-h'>Account Type:</td>
						<td className='styled-t-d-h'>Cash</td>
						<td className='styled-t-d-h'>Discretionary</td>
						<td className='styled-t-d-h'>Margin</td>
					</tr>
				</th>
				<tr>
					<th className='styled-t-d-h'>
						<table className='styled-table'>
							<tr>
								<th className='styled-t-d-h'>
									<p className='bg-clr lft-alg'>PERSONAL INFORMATION:</p>
									<tr>
										<td className='styled-t-d-h'>NAME</td>
										<td className='styled-t-d-h'></td>
										<td className='styled-t-d-h'></td>
									</tr>
									<Row className='wder-clm rt-spc'>
										<Col span={8}>Last Name</Col>
										<Col span={8}>First Name</Col>
										<Col span={8}>Middle Name</Col>
									</Row>
									<Row className='wder-clm'>
										<Col span={8}>Date of Birth (mm/dd/yy)</Col>
										<Col>Place of Birth</Col>
									</Row>
									<Row className='wder-clm'>
										<Col span={8}>Citizenship/ Nationality</Col>
										<Col span={8}>Civil Status</Col>
										<Col span={2}>Gender:</Col>
										<Col span={2}>Male</Col>
										<Col span={2}>Female</Col>
									</Row>
									<tr>
										<td className='styled-t-d-h applied-wdt'>
											<p>No. and Street Village/Brgy Municipality/City Province</p>
										</td>
										<th className='styled-t-d-h cntr-aln'>
											PRESENT ADDRESS
											<Row className='adjust'></Row>
											<Row className='adjust'></Row>
											<Row className='adjust'></Row>
											<Row className='adjust'></Row>
											<Row className='wder-clm '>
												Zip Code<Col className='adjust-rt'></Col>
											</Row>
										</th>
										<th className='styled-t-d-h cntr-aln'>
											PRESENT ADDRESS
											<Row className='adjust'></Row>
											<Row className='adjust'></Row>
											<Row className='adjust'></Row>
											<Row className='adjust'></Row>
											<Row className='wder-clm '>
												Zip Code<Col className='adjust-rt'></Col>
											</Row>
										</th>
									</tr>
									<Row>
										<Col span={12}>If married, Spouse's Name</Col>
										<Col>Mother's Maiden Name</Col>
									</Row>
									<tr>
										<th className='styled-t-d-h'>TIN No.</th>
										<th className='styled-t-d-h'>SSS/GSIS No.</th>
									</tr>
									<Row className='wder-clm'>
										<Col span={12}>Of legal age?</Col>
										<Col span={4}>Yes</Col>
										<Col>No</Col>
									</Row>
									<Row className='wder-clm'>
										Nature of work : <span className='empty-space-two'></span> Employed
										<span className='empty-space-two'></span>Self-employed
										<span className='empty-space-two'></span>Housewife
										<span className='empty-space-two'></span>Student
										<span className='empty-space-two'></span>Others, pls. specify
									</Row>
									<Row className='wder-clm'>Position/Rank :</Row>
									<Row className='wder-clm'>
										<Col span={12}>Are you an officer/director of a listed corporation</Col>
										<Col span={4}>Yes</Col>
										<Col>No</Col>
									</Row>
									<Row className='wder-clm'>
										<Col>If yes, state: Name of Corp:</Col>
										<Col>Position:</Col>
									</Row>
									<tr>
										<td className='styled-t-d-h'>Occupation</td>
										<td className='styled-t-d-h'>Nature of Work/Business</td>
										<td className='styled-t-d-h'>Name of Employer</td>
										<td className='styled-t-d-h'>Office Address</td>
									</tr>
									<Row className='wder-clm'>
										<Col span={12}>Is your employer a registered broker dealer?</Col>
										<Col span={4}>Yes</Col>
										<Col>No</Col>
									</Row>
									<Row className='wder-clm'>
										<Col span={12}>
											Are you an officer, Director or Shareholder of a Broker Dealer?
										</Col>
										<Col span={4}>Yes</Col>
										<Col>No</Col>
									</Row>
									<Row className='wder-clm'>
										<Col span={12}>Broker dealer and describe relationship</Col>
									</Row>
								</th>
							</tr>
							<tr>
								<th className='styled-t-d-h'>
									<p className='bg-clr cntr-aln'>INVESTMENT INFORMATION</p>
									<tr>
										<th className='styled-t-d-h'>Investment Objective:</th>
										<th className='styled-t-d-h'>
											Speculation <input type='checkbox'></input>
										</th>
										<th className='styled-t-d-h'>Growth</th>
										<th className='styled-t-d-h'>
											Preservation of Capital <input type='checkbox'></input>
										</th>
										<th className='styled-t-d-h'>Long term Investment</th>
									</tr>
									<Row className='wder-clm'>
										<Col span={6}>Years of experiance in equity investment:</Col>
										<Col span={4}>Less than 1 year</Col>
										<Col span={4}>Less than 5 year</Col>
										<Col span={4}>More than 5 year</Col>
										<Col span={5}>More than 10 year</Col>
									</Row>
								</th>
							</tr>
							<tr>
								<th className='styled-t-d-h'>
									<p className='bg-clr lft-alg'>CONTACT INFORMATION:</p>
									<tr>
										<th className='styled-t-d-h'>Home Phone</th>
										<th className='styled-t-d-h'>Business Phone</th>
										<th className='styled-t-d-h'>Mobile Phone</th>
										<th className='styled-t-d-h'>E-mail address</th>
										<th className='styled-t-d-h'>Fax No.</th>
									</tr>
								</th>
							</tr>
							<tr>
								<th className='styled-t-d-h'>
									<p className='bg-clr lft-alg'>FINANTIAL INFORMATION:</p>
									<Row className='txt-update'>
										<Col span={4}>
											Sources/s of Funds:
											<Col>Annual income:</Col>
											<Col>Assets:</Col>
											<Col>Net Worth:</Col>
										</Col>
										<Col span={4}>
											Employment
											<Col>Less than 1MM</Col>
											<Col>Less than 1MM</Col>
											<Col>Less than 1MM</Col>
										</Col>
										<Col span={4}>
											Business
											<Col>Less than 5MM</Col>
											<Col>Less than 5MM</Col>
											<Col>Less than 5MM</Col>
										</Col>
										<Col span={4}>
											Remittances
											<Col>More than 5MM</Col>
											<Col>More than 5MM</Col>
											<Col>More than 5MM</Col>
										</Col>
										<Col span={4}>
											Others, pls. specify
											<Col>Others, please indicate</Col>
											<Col>Others, please indicate</Col>
											<Col>Others, please indicate</Col>
										</Col>
										<Col span={4}>
											<span className='otr-spec'></span>
											<Col>
												<span className='otr-spec'></span>
											</Col>
											<Col>
												<span className='otr-spec'></span>
											</Col>
											<Col>
												<span className='otr-spec'></span>
											</Col>
										</Col>
									</Row>
									<Row>
										<Col span={4}>Customer's Bank:</Col>
										<Col span={8}>
											<span className='empty-space added-size'></span>
										</Col>
										<Col span={4}>Branch:</Col>
										<Col span={2}>
											<span className='empty-space added-size'></span>
										</Col>
									</Row>
									<Row>
										<Col span={12}>Account Type:</Col>
										<Col span={2}>Account No.:</Col>
										<Col>
											<span className='empty-space added-size'></span>
										</Col>
									</Row>
									<Row className='wder-clm txt-update'>
										<Col span={8}>Do you have accounts with other broker dealers?</Col>
										<Col span={1}>Yes</Col>
										<Col span={1}>No</Col>
										<Col>If so, please indicate names/s of broker/s:</Col>
										<Col>
											<span className='empty-space added-size'></span>
										</Col>
									</Row>
								</th>
							</tr>
							<tr>
								<th className='styled-t-d-h'>
									<p className='bg-clr bg-clr cntr-aln'>SETTLEMENT/DELIVERY/OTHER INSTRUCTION</p>
									<Row className='wder-clm-up'>
										<Col>Confirmation of orders would be via:</Col>
										<Col span={4}>Courier</Col>
										<Col span={4}>Facsimile</Col>
										<Col span={4}>E-mail</Col>
									</Row>
									<Row>
										(For Facsimile or electronic transmission, please confirm orders not later than
										12:00 noon of the next business day)
									</Row>
									<Row>
										<Col>Are duplicate confirmations required</Col>
										<Col span={2}>Yes</Col>
										<Col span={2}>No</Col>
										<Col>Person to send to and relationship to customer:</Col>
										<Col>
											<span className='empty-space added-size'></span>
										</Col>
									</Row>
									<Row>
										<Col span={5}>Documantation of certificate</Col>
										<Col span={4}>Client's Name</Col>
										<Col span={4}>RCBCSI's Name</Col>
									</Row>
									<Row className='wder-clm'>
										<Col span={8}>Trade Confirmations/ Other Correspandance Diposition:</Col>
										<Col span={3}>Mail</Col>
										<Col span={3}>Delivery</Col>
										<Col span={3}>Home or</Col>
										<Col span={3}>Office</Col>
										<Col span={3}>Pick-up</Col>
									</Row>
								</th>
							</tr>
							<tr>
								<th className='styled-t-d-h'>
									<p className='bg-clr bg-clr cntr-aln'>SPECIMEN SIGNATURE/S:</p>
									<Row>
										<Col>
											<h3>1.</h3>
										</Col>
										<Col>
											<span className='empty-space added-size'></span>
										</Col>
										<Col className='rt-spc'>
											<h3>1.</h3>
										</Col>
										<Col>
											<span className='empty-space added-size'></span>
										</Col>
									</Row>
									<Row className='wder-clm'>
										<Col>
											<h3>2.</h3>
										</Col>
										<Col>
											<span className='empty-space added-size'></span>
										</Col>
										<Col className='rt-spc'>
											<h3>2.</h3>
										</Col>
										<Col>
											<span className='empty-space added-size'></span>
										</Col>
									</Row>
								</th>
							</tr>
						</table>
					</th>
				</tr>
				<Row>
					<h3>ACCOUNT OPENING APPROVED:</h3>
				</Row>
				<Row className='wder-clm'>
					<Col span={8}>SIGNATURE OVER PRINTED NAME</Col>
					<Col span={4}>DATE</Col>
					<Col span={8}>SIGNATURE OVER PRINTED NAME</Col>
					<Col span={4}>DATE</Col>
				</Row>

				<tr>
					<th className='styled-t-d-h bg-clr bg-clr cntr-aln'>
						SCHEDULE OF OTHER FEES AND CHARGES
					</th>
				</tr>
				<Row className='wder-clm adjust-text'>
					<Col span={12}>
						<b>The following are the charges for buy transaction:</b>
						<Row>
							<Col>
								Commission:
								<Col>VAT:</Col>
								<Col>SCCP Fee:</Col>
								<Col>Transaction Fee:</Col>
							</Col>

							<Col>
								<span className='otr-spec'></span>of the gross value or a minimum of P150.00
								<Col>12% of commission</Col>
								<Col>.01% of the gross value</Col>
								<Col>.005% of the gross value</Col>
							</Col>
						</Row>
					</Col>
					<Col span={12}>
						<b>The following are the charges for sell transaction:</b>
						<Row>
							<Col>
								Commission:
								<Col>Sales Tax:</Col>
								<Col>VAT:</Col>
								<Col>SCCP Fee:</Col>
								<Col>Transaction Fee:</Col>
							</Col>

							<Col>
								<span className='otr-spec'></span>of the gross value or a minimum of P150.00
								<Col>.6% of the gross value</Col>
								<Col>12% of commission</Col>
								<Col>.01% of the gross value</Col>
								<Col>.005% of the gross value</Col>
							</Col>
						</Row>
					</Col>
				</Row>
				<tr>
					<th className='styled-t-d-h'>
						<p className='bg-clr bg-clr cntr-aln'>UNDERTAKING</p>
						<Row>
							I hereby undertake to ensure that I will comply with my obligations under SRC Rule
							30.2-1 of the implementing rules and regulations of the Securities Regulation Code and
							of the client account information and agreement form. The client agreement shall not
							operate to remove, exclude or restrict any rights of the client or obligations of
							RCBCSI. RCBCSI undertakes to notify the client in writing of new or modified
							compliance obligations or in the event of any material change to the information
							provided in this form and agreement.
						</Row>
						<Row className='wder-clm'>
							<Col span={12}>
								SIGNATURE OVER PRINTED NAME - SALESPERSON
								<Col>
									<span className='empty-space added-size'></span>
								</Col>
							</Col>
							<Col>
								SIGNATURE OVER PRINTED NAME -ASSOCIATED PERSON
								<Col>
									<span className='empty-space added-size'></span>
								</Col>
							</Col>
						</Row>
					</th>
				</tr>

				<tr>
					<th className='styled-t-d-h'>
						<td className='styled-t-d-h'>
							CIAF ENCODED BY:<span className='empty-space'></span>DATE:
							<span className='empty-space '></span>
						</td>
						<td className='styled-t-d-h'>
							REVIEWED BY:<span className='empty-space '></span>DATE:
							<span className='empty-space '></span>
						</td>
					</th>
				</tr>
				<Row className='page-break'></Row>
				<tr>
					<th className='styled-t-d-h'>
						<CIAFPersonalInformation />
					</th>
				</tr>
				<tr>
					<th className='styled-t-d-h'>
						<CIAFPersonalInformation />
					</th>
				</tr>
				<Row className='page-break'></Row>
				<CIAFTermsAndConditions />
			</table>
		</div>
	);
};

export default CIAFPersonal;

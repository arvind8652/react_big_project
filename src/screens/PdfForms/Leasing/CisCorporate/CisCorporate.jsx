import React, { useState } from 'react';
import { Row, Col, Checkbox, Typography } from 'antd';
import rcbclogo from '../../../../assets/img/rcbc.png';
import './CisCorporate.scss';

const { Text, Title } = Typography;

const Cis = () => {
	const [data] = useState([1, 2, 3, 4, 5]);

	return (
		<>
			<div className='main-page'>
				<Row className='main-page-next' align='middle'>
					<Col>
						<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
					</Col>
					<Col span={8}>
						<Text className='head-2'>RCBC Leasing</Text>
						<h1 className='head-1'>RCBC Leasing and Finance Corporation</h1>
						<Text className='head-1'>A YGC Member</Text>
					</Col>
					<Col span={8}>
						<h1
							className='head-3'
							style={{ textAlign: 'end', marginLeft: '50%', fontSize: '20px' }}
						>
							Customer Information Sheet(BUISNESS)
						</h1>
						<h1
							className='head-3'
							style={{ textAlign: 'end', marginLeft: '50%', fontSize: '20px' }}
						>
							MONEY MARKET INVESTOR
						</h1>
					</Col>
				</Row>
				<Row className='page-border'>
					<Col span={15} style={{ height: '40px' }}>
						<Text className='head-3'>Date(MM/DD/YYYY)</Text>
					</Col>
					<Col span={9}>
						<Checkbox true>
							<Text className='head-3'>Initial</Text>
						</Checkbox>
						<Checkbox true>
							<Text className='head-3'>Updating</Text>
						</Checkbox>
					</Col>
				</Row>
				<Row className='page-border'>
					<Col span={24} style={{ backgroundColor: '#3CB371', height: '30px' }}>
						<Text className='head-3' style={{ color: 'white' }}>
							General Information
						</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={14} className='page-border-next'>
						<Text className='head-3'>Registered Name</Text>
					</Col>

					<Col span={10}>
						<Text className='head-3'>Date of Registration</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={14} className='page-border-next'>
						<Text className='head-3'>Trade Name</Text>
					</Col>

					<Col span={10}>
						<Text className='head-3'>Date of Initial Operation/incorporation</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={8} className='page-border-next'>
						<Text className='head-3'>nature/Line of Buisness</Text>
					</Col>
					<Col span={6} className='page-border-next'>
						<Text className='head-3'>Type of Buisness Organisation</Text>
					</Col>
					<Col span={10}>
						<Text className='head-3'>Country of Incorporation Organisation</Text>
					</Col>
				</Row>

				<Row className='page-border' align='middle'>
					<Col span={4} style={{ height: '70px' }}>
						<Text className='head-3'>Registered address</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Barangay
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							City/provinance
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Zip Code
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Phone no
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Fax no
						</Text>
					</Col>
				</Row>

				<Row className='page-border' align='middle'>
					<Col span={4} style={{ height: '70px' }}>
						<Text className='head-3'>Office address</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Barangay
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							City/provinance
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Zip Code
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Phone no
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Fax no
						</Text>
					</Col>
				</Row>

				<Row className='page-border' align='middle'>
					<Col span={4} style={{ height: '70px' }}>
						<Text className='head-3'>US address</Text>
					</Col>
					<Col span={4}></Col>
					<Col span={4}>
						<Text className='head-3' italic>
							City/provinance
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Zip Code
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Phone no
						</Text>
					</Col>
					<Col span={4}>
						<Text className='head-3' italic>
							Fax no
						</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={14} className='page-border-next'>
						<Row>
							<Text className='head-3'>Mailing Address</Text>
						</Row>
						<Checkbox true>
							<Text className='head-3'>Registered Address</Text>
						</Checkbox>
						<Checkbox true>
							<Text className='head-3'>Office Address</Text>
						</Checkbox>
						<Checkbox true>
							<Text className='head-3'>US Address</Text>
						</Checkbox>
					</Col>

					<Col span={8}>
						<Text className='head-3'>Size of Firm(No.of Employee)</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={8} className='page-border-next'>
						<Text className='head-3'>Buisness Email Address</Text>
					</Col>
					<Col span={6} className='page-border-next'>
						<Text className='head-3'>Tax Identification No(TIN)</Text>
					</Col>
					<Col span={10}>
						<Text className='head-3'>SSS/GSSS No.</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={8} className='page-border-next'>
						<Text className='head-3'>Facta Reistered(Y/N) For Financial Entity</Text>
					</Col>
					<Col span={6} className='page-border-next'>
						<Text className='head-3'>US (TIN) Y/N (if applicable)</Text>
					</Col>
					<Col span={10}>
						<Text className='head-3'>GIIN (For Partcipating Foreign Financial Entity)</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={24} style={{ backgroundColor: '#3CB371', height: '30px' }}>
						<Text className='head-3' style={{ color: 'white' }}>
							Qwnership an Management(Please Fill up seperate client information sheet for each
							principals)
						</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={24} style={{ height: '40px' }}>
						<Text className='head-3'>
							PRINCIPAL STOCKHOLDERS (OWNING AT LEAST 10%)/PARTNERS/MEMBERS (For Juridical
							Entities):
						</Text>
					</Col>
				</Row>

				<Row>
					<table id='customer-table'>
						<tbody>
							<tr>
								<th>
									<Text className='head5' italic>
										Client Id
									</Text>
								</th>
								<th style={{ width: '30%' }}>
									<Text className='head5' italic>
										Name
									</Text>
								</th>
								<th>
									<Text className='head5' italic>
										Director(Y/N)
									</Text>
								</th>
								<th>
									<Text className='head5' italic>
										Officer(Y/N)
									</Text>
								</th>
								<th>
									<Text className='head5' italic>
										Nationality
									</Text>
								</th>
								<th>
									<Text className='head5' italic>
										Paid-up Capital
									</Text>
								</th>
								<th>
									<Text className='head5' italic>
										%Ownership
									</Text>
								</th>
							</tr>
							{data?.map((e) => (
								<tr>
									<td className='t-head1'></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							))}
						</tbody>
					</table>
				</Row>
				<Row className='page-border'>
					<Col span={24} style={{ height: '40px' }}>
						<Text className='head-3'>OWNERS/DIRECTORS/SENIOR OFFICERS:</Text>
					</Col>
				</Row>
				<Row>
					<table id='customer-table'>
						<tbody>
							<tr>
								<th>
									<Text className='head5' italic>
										Client Id
									</Text>
								</th>
								<th style={{ width: '30%' }}>
									<Text className='head5' italic>
										Name
									</Text>
								</th>
								<th>
									<Text className='head5' italic>
										Position
									</Text>
								</th>
								<th>
									<Text className='head5' italic>
										Contact No
									</Text>
								</th>
								<th style={{ width: '120px' }}>
									<Text className='head5' italic>
										No.of years in company
									</Text>
								</th>
								<th>
									<Text className='head5' italic>
										Signature
									</Text>
								</th>
							</tr>
							{data?.map((e) => (
								<tr>
									<td className='t-head1'></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							))}
						</tbody>
					</table>
				</Row>
				<Row className='page-border'>
					<Col span={24} style={{ backgroundColor: '#3CB371', height: '30px' }}>
						<Text className='head-3' style={{ color: 'white' }}>
							Client Aknowledgement
						</Text>
					</Col>
				</Row>
				<Row className='page-border'>
					<Col span={24}>
						<Text italic className='head-3'>
							authorizes RCBC Leasing and Finance Corporation to verify such information as it may
							require. We hereto agree to notify you in writing of any change in the information
							supplied in this form. authorizes RCBC Leasing and Finance Corporation to verify such
							information as it may require. We hereto agree to notify you in writing of any change
							in the information supplied in this form.
						</Text>
						<Row align='middle'>
							{[...Array(4)].map((e, i) => {
								return (
									<Col span={8} offset={3} style={{ marginTop: '30px' }}>
										<hr />
										<Text className='head-3'>Print Name,Sign,Date</Text>
									</Col>
								);
							})}
						</Row>
					</Col>
				</Row>

				<Row className='page-border' justify='center'>
					<Col span={24} style={{ backgroundColor: '#32CD32', height: '40px' }}>
						<Text className='head-3' style={{ color: 'white' }} strong>
							For RCBC Leasing's Use Only
						</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={8} style={{ borderRight: '2px solid #888', height: '50px' }}>
						<Text className='head-3' italic>
							Buisness Unit
						</Text>
					</Col>
					<Col span={8} style={{ borderRight: '2px solid #888', height: '50px' }}>
						<Text className='head-3' italic>
							Client id
						</Text>
					</Col>
					<Col span={8} style={{ borderRight: '2px solid #888', height: '50px' }}>
						<Text className='head-3' italic>
							Group id
						</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={12} style={{ borderRight: '2px solid #888', height: '50px' }}>
						<Text className='head-3' italic>
							Industry BSP Eco Act
						</Text>
					</Col>
					<Col span={12} style={{ borderRight: '2px solid #888', height: '50px' }}>
						<Text className='head-3' italic>
							PSIC Code
						</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={24} style={{ backgroundColor: '#3CB371', height: '30px' }}>
						<Text className='head-3' style={{ color: 'white' }}>
							Documents Submitted
						</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<table style={{ border: 'none', width: '100%' }}>
						<tbody>
							<tr style={{ border: 'none' }}>
								<td className='head5'>Income Documents</td>
								<td className='head5'> Partnership/Corporate/Others</td>
								<td className='head5'> Money Chargers/Foregin Exchange</td>
							</tr>
							<tr style={{ border: 'none' }}>
								<td>( )Latest Audited Financial Statement</td>
								<td>( )Certificate of Registration/Organization</td>
								<td className='head5'>Dealers/Remittance agents</td>
							</tr>
							<tr style={{ border: 'none' }}>
								<td>( )Latest Income Tax Return</td>
								<td>( )Articles of Co-Partnership/Incorporation</td>
								<td>( )BSP Certificate of Registration</td>
							</tr>
							<tr style={{ border: 'none' }}>
								<td className='head5'>Sole Proprietorship</td>
								<td>( )By-Laws</td>
								<td>( )Mayor's Permit</td>
							</tr>
							<tr style={{ border: 'none' }}>
								<td>( )Mayor’s Business Permit</td>
								<td>( )List of Directors/Trustees Officers/Latest GIS</td>
								<td className='head5'>Exception Remarks:</td>
							</tr>
							<tr style={{ border: 'none' }}>
								<td>( )DTI Certificate for Registration</td>
							</tr>
						</tbody>
					</table>
				</Row>

				<Row className='page-border'>
					<Col span={24} style={{ backgroundColor: '#3CB371', height: '30px' }}>
						<Text className='head-3' style={{ color: 'white' }}>
							Identification/Documents Presented
						</Text>
					</Col>
				</Row>

				<Row>
					<table id='customer-table'>
						<tbody>
							<tr>
								<th>
									<Text className='head5'>Documents</Text>
								</th>
								<th>
									<Text className='head5'>Reference/ID number</Text>
								</th>
								<th>
									<Text className='head5'>Date of issue</Text>
								</th>
								<th>
									<Text className='head5'>Expiry Date</Text>
								</th>
							</tr>
							{data?.map((e) => (
								<tr>
									<td className='t-head2'></td>

									<td></td>
									<td></td>
									<td></td>
								</tr>
							))}
						</tbody>
					</table>
				</Row>

				<Row className='page-border'>
					<Col span={24} style={{ backgroundColor: '#3CB371', height: '30px' }}>
						<Text className='head-3' style={{ color: 'white' }}>
							Relationship Details
						</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={24} style={{ height: '40px' }}>
						<Text className='head-3'>RCBC Leasing Relationship</Text>
						<Checkbox true>
							<Text className='head-3'>Non Dosri</Text>
						</Checkbox>
						<Checkbox true>
							<Text className='head-3'>Dosri</Text>
						</Checkbox>
						<Text className='head-3'>If Dosri What Position</Text>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={24} style={{ height: '40px' }}>
						<Text className='head-3'>How Obtained</Text>
						<Checkbox true>
							<Text className='head-3'>Walk In</Text>
						</Checkbox>
						<Checkbox true>
							<Text className='head-3'>REFFERED BY</Text>
						</Checkbox>
						<Checkbox true>
							<Text className='head-3'>SOLICITED BY</Text>
						</Checkbox>
					</Col>
				</Row>

				<Row className='page-border'>
					<Col span={12} style={{ borderRight: '2px solid #888', height: '50px' }}>
						<Text className='head-3'>Relationship Start Date:</Text>
					</Col>

					<Col span={12}>
						<Text className='head-3'>Relationship Officer:</Text>
					</Col>
				</Row>
			</div>

			<div style={{ margin: '30px' }}>
				<Row justify='center'>
					<Title level={3}>CERTIFICATION, CONSENT AND WAIVER</Title>
				</Row>
				<Row>
					<Text className='head4'>
						This is to certify that
						<span className='line-Bottom'></span>
						(the “Entity”) is:
					</Text>
					<ol className='olpadding-head-1'>
						<li className='head4'>
							[ ] a U.S. Person:and will submit a copy of W-9 (Request for Taxpayer Identification
							Number and Certification) for each of the directors, principal officers and principal
							stockholders owning at least ten percent (10%) of the capital stock that are U.S.
							persons, within the 90 days from the date of account opening.
						</li>
						<li className='head4'>
							[ ] nota U.S. Person and certify that its directors, principal officers and
							stockholders personal information does not contain any U.S. Indiciaz.
						</li>
						<li className='head4'>
							[ ] not a U.S. Person, even if the personal information of each of the directors,
							principal officers and stockholders declare the presence of U.S. Indicia, and in
							support of this, it will submit copies of any the following documents within 90 days
							after the account opening to prove such status: O W-8BEN-E (Certificate of Foreign
							Status of Beneficial Owner for United States Tax Withholding and Reporting -Entities).
						</li>
						<ol className='olpadding-head-2'>
							<li className='head4'>
								[] W-8BEN-E (Certificate of Foreign Status of Beneficial Owner for United States Tax
								Withholding and Reporting -Entities).
							</li>
							<li className='head4'>
								[] Documentary and identification requirements (i.e., local and foreign passports,
								Philippine government valid IDs, birth certificates) for Company’s background
								investigation
							</li>
							<li className='head4'>
								[] Document to prove that each directors, principal officers and stockholders ofa
								local entity do not have substantial U.S. ownership or do not own more than ten
								percent (10%) of shares of stocks from U.S. entities.
							</li>
						</ol>
					</ol>
				</Row>
				<Row>
					{' '}
					<Text className='head4'>
						Failure to submit the required documents within the 90 days from the date of account
						opening entitles the Company (as defined below) to treat the Entity as a U.S. Person.
					</Text>
				</Row>
				<Row>
					{' '}
					<Text className='head4'>
						That, the Entity maintains financial account(s)3 (the “Account, irrespective of number)
						with RCBC Leasing and Finance Corporation, a financing institution duly registered under
						the laws of the Republic of the Philippines, with head office address at 2na Floor
						Grepalife Bldg., 221 Sen. Gil Puyat Ave., Makati City Philippines (hereinafter referred
						to as the “Company”);
					</Text>
				</Row>
				<Row>
					{' '}
					<Text className='head4'>
						FOR U.S. PERSONS ONLY: That, as a U.S. Person, the Entity is subject to the requirements
						of the United States Foreign Account Tax Compliance Act (“FATCA”) and the regulations of
						the United States Internal Revenue Services (“US IRS”), including all subsequent
						amendments or supplements thereto (collectively “FATCA US IRS Regulations”), which
						require the Company to report directly to the US IRS information about financial
						accounts held by US taxpayers or held by foreign entities in which US taxpayers hold a
						substantial ownership interest. This Certification, Consent and Waiver signify:
					</Text>
					<ol className='olpadding-head-3'>
						<li className='head-3'>
							the Entity’s consent and waiver of its right of confidentiality under bank secrecy
							laws, including but not limited to, Republic Act Number 1405 or the Law on Secrecy of
							Bank Deposits, Republic Act Number 6426 or the Foreign Currency Deposit Act and
							Republic Act Number 8791 or the General Banking Law of 2000, as amended in each case;
						</li>

						<li className='head-3'>
							the Entity’s agreement and consent to the processing and updating of all information
							relative to its Account under Republic Act Number 10173 or the Data Privacy Act of
							2012;
						</li>
						<li className='head-3'>
							the Entity’s consent and waiver of such rights and privileges under any other law of
							the Philippines which will require the issuance of a consent and/or waiver for the
							disclosure and/or processing of any and all information relating to its Account with
							the Company for purposes of compliance with FATCA; and
						</li>

						<li className='head-3'>
							the Entity’s acknowledgement and consent for the Company to report and disclose to the
							US IRS the following information (and/or such other information as may be required),
							relative to the Account pursuant to the FATCA US IRS Regulations (the “Required
							Information”):
						</li>
						<ol className='olpadding-head-4'>
							<li className='head-3'>
								The name, address and U.S. tax identification number (TIN);
							</li>
							<li className='head-3'>
								Inthe case of any account holder that is a U.S. entity with one or more U.S. owners,
								the name, address and TIN of each substantials U.S. owner of such entity;
							</li>
							<li className='head-3'>The account number/s;</li>
							<li className='head-3'>The year-end account balances or values; and</li>
							<li className='head-3'>
								Gross receipts and gross withdrawals or payments from the accounts.
							</li>
						</ol>
					</ol>
					<Row>
						{' '}
						<Text className='head4'>
							If the Company is not already in possession of the Required Information, the Entity
							undertakes to provide the Company such information within the period as may be
							requested by the Company. This Certification, Consent and Waiver is given by the
							Entity only for purposes of compliance by the Company with the FATCA.
							<br />
							<br />
						</Text>
						<Text className='head4'>
							Where it is indicated above that the Entity is not a U.S. Person and the Entity has
							submitted the required documents in support thereof; the Entity hereby affirms and
							confirms the truth of such declaration and the authenticity of the submitted
							supporting documents. The Entity undertakes to inform the Company in writing of any
							change in circumstance that will affect the accuracy of such declaration or documents
							within thirty (30) calendar days from the occurrence of such change. Further, the
							Entity hereby acknowledge/s that the Company shall operate the Account on the basis of
							such declaration. In the event that the Company discovers that the Entity is a U.S.
							Person, then the Company, its subsidiaries and affiliates, are hereby absolutely and
							unconditionally authorized to report and disclose to the U.S. IRS the Required
							Information. The Entity further undertakes to provide the Company with such Required
							Information as may be requested by the Company.
							<br />
							<br />
						</Text>
						<Text className='head4'>
							With the signing this Certification, Consent and Waiver by its duly authorized
							representative(s), the Entity hereby undertakes to indemnify and hold the Company, its
							directors, stockholders, officers, employees, representatives, agents or relevant
							units of the Company, free and harmless from and against all liabilities, claims,
							demands, actions, proceedings, losses, expenses and all other liabilities of
							whatsoever nature or description which may be suffered or incurred by the Company, its
							directors, stockholders, officers, employees, representatives, agents or relevant
							units of the Company, arising from or in connection with the implementation of this
							Certification, Consent and Waiver.
							<br />
							<br />
						</Text>
						<Text className='head4'>
							The Entity represents warrants and confirms that (1) it has read and understood this
							Certification, Consent and Waiver and (2) the undersigned is its duly authorized
							representative authorized to execute and deliver this Certification, Consent and
							Waiver for and on behalf of the Entity, as evidenced by the duly executed
							authorization, a copy of which is attached hereto.
							<br />
							<br />
						</Text>
					</Row>
				</Row>
				<Row justify='end'>
					<Text>
						<span className='line-Bottom' style={{ paddingRight: '410px' }}></span>
						<br />
						<Text className='head-3'>(Printed Name and signature of Account Holder)</Text>
						<br />
						<br />
						<Text className='head-3'>Designation/Date:</Text>
						<span className='line-Bottom'></span>
					</Text>
				</Row>
				<Row>
					<Text className='head4'>1 “United States Person” as defined in the FATCA means:</Text>
					<ol className='olpadding-head-3'>
						<li className='head-3'>
							A domestic partnership/corporation /company or association created or organized in the
							US or under the laws of the US
						</li>
						<li className='head-3'>Adomestic trust</li>
						<li className='head-3'>
							Acompany that has a U.S, substantial ownership of at least 10%.
						</li>
					</ol>
				</Row>

				<Row>
					<Text className='head4'>
						2 U.S Indicia as defined in the FATCA refer to any of the following:
					</Text>
					<ol className='olpadding-head-3'>
						<li className='head-3'>
							Classification of an account holder as a U.S; resident in the withholding agent’s
							customer files;
						</li>
						<li className='head-3'> Acurrent U.S. residence address or U.S. mailing address;</li>
						<li className='head-3'>
							‘With respect to an offshore obligation, standing instructions to pay amounts to a
							U.S. address or an account maintained in the United States;
						</li>
						<li className='head-3'>
							Acurrent telephone number for the entity in the United States in addition to a
							telephone number for the entity outside of the United States;
						</li>
						<li className='head-3'>
							Acurrent telephone number for the entity in the United States in addition to a
							telephone number for the entity outside of the United States;
						</li>
						<li className='head-3'>
							A power of attorney or signatory authority granted to a person with a U.S. address;
							and
						</li>
						<li className='head-3'>
							An“in-care-of” address or “hold mail” address that is the sole address provided for
							the entity.
						</li>
					</ol>
				</Row>
				<Row>
					<Text className='head4'>
						3 The term means (as defined under the FATCA ), with respect to the Foreign Financial
						Institution (FFI), (1) any depository account maintained by the FFI (2) any custodial
						account maintained by the FFI; and (3) anon-publicly traded debt or equity interest in
						the FFI.
					</Text>
					<Text className='head4'>4 Substantial means ownership of 10% or more</Text>
				</Row>
			</div>
		</>
	);
};
export default Cis;

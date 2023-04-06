import React, { useState } from 'react';
import { connect } from 'react-redux';
import './newPdf.scss';
import { Row, Col, Checkbox, Typography, Space } from 'antd';
const { Text, Title, Paragraph, Link } = Typography;
import rcbclogo from '../../../assets/img/RCBC_CSAF.png';
import moment from 'moment';
import { useEffect } from 'react';
const NewCsafPdf = (props) => {
	const { csCustomer, csAccount, formData, questionList, answerList } = props;
	const [SQA, setSQA] = useState([]);

	const [totalScore, setTotalScore] = useState();

	const styles = {
		tableHead: {
			backgroundColor: 'black',
			height: '22px',
			textAlign: 'center',
			padding: '0px 0px'
		},
		mainHead: {
			textAlign: 'end',
			fontWeight: 'bold',
			fontSize: '15px',
			fontFamily: 'Arial',
			color: 'black'
		},
		height: {
			border: '1px solid $black-color',
			height: '40px'
		},
		checkBox: {
			paddingLeft: '30px'
		},
		checkBox1: {
			paddingLeft: '5px',
			borderRight: '1px ridge black'
		},
		infoText: {
			fontSize: '12px',
			fontFamily: 'Calibri Light',
			fontWeight: 'bold'
		}
	};

	let title = '';

	const getTitle = () => {
		const { title } = formData;
		if (formData?.customerType === 'I') {
			return title ? title : '';
		}
		if (formData?.customerType === 'C') {
			return '';
		}
	};

	const customerType = () => {
		switch (formData?.customerType) {
			case 'I':
				return 'INDIVIDUAL';
			case 'C':
				return 'CORPORATE';
			default:
				return '';
		}
	};

	const getNamesTogether = () => {
		const { firstName, secondName, thirdName, accType, accountName } = formData;

		if ((accType === 'CUSTOMER' && title) || firstName || secondName || thirdName) {
			return `${getTitle()} ${firstName ? firstName : ''} ${secondName ? secondName : ''} ${
				thirdName ? thirdName : ''
			}`;
		}
		if (accType === 'ACCOUNT') {
			return accountName ? accountName : '';
		}

		return '';
	};

	useEffect(() => {
		let localSQA = [];
		questionList &&
			questionList.length !== 0 &&
			questionList.forEach((ele, idx) => {
				const saAnswers = answerList[idx]?.lstAnswers ? answerList[idx]?.lstAnswers : [];
				const lstAnswers = ele.lstAnswers.map((item, index) => {
					for (const ele of saAnswers) {
						if (item.answerID === ele.answerID) {
							return {
								...item,
								checked: true
							};
						}
					}

					return {
						...item,
						checked: false
					};
				});
				let obj = {
					ipsDescriptionName: ele.ipsDescriptionName,
					lstAnswers: [...lstAnswers],
					questionDesc: ele.questionDesc,
					questionID: ele.questionID,
					questionType: ele.questionType,
					sophisticatedMinAns: ele.sophisticatedMinAns
				};
				localSQA.push(obj);
			}, []);

		setSQA([...localSQA]);
	}, [questionList]);

	// function to calculate score
	const calculateScore = (item) => {
		return item?.issubsetquestions
			? Math.max(item?.lstAnswers?.map((each) => each.score))
			: item?.lstAnswers?.reduce((p, n) => p + n.score, 0);
	};

	// useEffect(() => {
	// 	let scoreTotal = formData?.riskProfileModel?.lstQuestionsAnswers?.reduce((p, item) => {
	// 		return p + calculateScore(item);
	// 	}, 0);
	// 	setTotalScore(scoreTotal);
	// }, [formData]);

	const findInvestorProfile = () => {
		// if (totalScore >= 5 && totalScore <= 9) {
		// 	return 'Conservative';
		// } else if (totalScore >= 10 && totalScore <= 16) {
		// 	return 'Moderate';
		// } else if (totalScore >= 17 && totalScore <= 20) {
		// 	return 'Agressive';
		// } else {
		// 	return 'UNK';
		// }

		if (formData?.riskProfileModel?.score >= 5 && formData?.riskProfileModel?.score <= 9) {
			return 'Conservative';
		} else if (formData?.riskProfileModel?.score >= 10 && formData?.riskProfileModel?.score <= 16) {
			return 'Moderate';
		} else if (formData?.riskProfileModel?.score >= 17 && formData?.riskProfileModel?.score <= 20) {
			return 'Agressive';
		} else {
			return 'UNK';
		}
	};

	return (
		<div className='print'>
			<div class='pagebr'>
				<div className='para-1'>
					<Row align='middle'>
						<Col span={12}>
							<div style={{ display: 'flex', marginBottom: '10px', marginTop: '25px' }}>
								<img src={rcbclogo} alt='rcbcLogo' height='80px' width='250px' />
							</div>
						</Col>
						<Col span={12}>
							<h1 className='head-3' style={styles.mainHead}>
								CLIENT SUITABILITY QUESTIONNAIRE {'INDIVIDUAL'}
							</h1>
						</Col>
					</Row>
					<Row>
						<Text
							className='head4'
							style={{
								paddingBottom: '10px',
								fontSize: '14px',
								lineHeight: '15px',
								color: 'black'
							}}
						>
							This Client Suitability Assessment (CSA) questionnaire shall be accomplished prior to
							the availment of any financial product with RCBC. The results of the CSA shall be used
							as a basis to recommend various classes of financial products that may be offered
							based on your investment objectives, liquidity requirements, risk tolerance and
							financial situation. Please indicate your answers in questions indicated below. Please
							note that there is no right or wrong answer for each question. Your replies shall be
							scored and totalled to arrive at your risk profile.
						</Text>
					</Row>
					<Row style={{ height: '15px' }}>
						<Col span={24} style={styles.tableHead}>
							<Text className='head-3' style={{ color: 'white' }}>
								CLIENT INFORMATION
							</Text>
						</Col>
					</Row>
					<div style={{ border: '0.1px solid black' }}>
						<Row style={{ border: '0.1px ridge black', marginTop: '3px' }}>
							<Col span={20} style={{ borderRight: '0.1px ridge black' }}>
								<Text
									className='head-1'
									style={{ fontSize: '12px', fontWeight: '800', color: 'black' }}
								>
									Name: {getNamesTogether()}
								</Text>
							</Col>
							<Col span={4}>
								<Text
									className='head-1'
									style={{ fontSize: '12px', fontWeight: '800', color: 'black' }}
								>
									Date: {moment(new Date()).format('DD-MM-YYYY')}
								</Text>
							</Col>
						</Row>
						<Row>
							<Col
								span={9}
								style={{
									borderRight: '1px ridge black',
									marginBottom: 'none',
									paddingBottom: 'none'
								}}
							>
								<Text
									className='head-1'
									style={{ fontSize: '12px', fontWeight: '800', color: 'black' }}
								>
									Financial Situation
									<div style={{ marginLeft: '5px' }}>
										<Row>
											{csCustomer[0]?.controlStructureField
												.find((each) => each.keyField === 'NetWorth')
												?.dropDownValue?.map((each) => (
													<Col span={8}>
														<Checkbox checked={each.dataValue === formData.networth ? true : false}>
															<Text style={styles.infoText}>{each.displayValue}</Text>
														</Checkbox>
													</Col>
												))}
										</Row>
									</div>
								</Text>
							</Col>
							<Col span={15}>
								<Text
									className='head-1'
									style={{ fontSize: '12px', fontWeight: '800', color: 'black' }}
								>
									Investible Funds
									<div style={{ marginLeft: '5px' }}>
										<Row>
											{csCustomer[0]?.controlStructureField
												.find((each) => each.keyField === 'InvestmentValue')
												?.dropDownValue?.map((each) => (
													<Col span={6}>
														<Checkbox
															checked={each.dataValue === formData.investmentValue ? true : false}
														>
															<Text style={styles.infoText}>{each.displayValue}</Text>
														</Checkbox>
													</Col>
												))}
										</Row>
									</div>
								</Text>
							</Col>
						</Row>
					</div>
					<Row>
						<Col span={24} style={styles.tableHead}>
							<Text className='head-3' style={{ color: 'white' }}>
								INVESTMENT, RISK, AND SOPHISTICATION PROFILE
							</Text>
						</Col>
					</Row>
					{SQA?.map((item, index) => {
						return (
							<div>
								{!(index % 5) && index != 0 && <div className='page-break'></div>}
								<Row key={item.questionID} className='list-border'>
									<Col span={24}>
										<Text style={{ paddingLeft: '10px', fontWeight: 'bold' }}>
											{item?.questionDesc === item?.ipsDescriptionName ? '' : item?.questionDesc}
										</Text>
									</Col>

									<Col span={24}>
										{item?.lstAnswers?.map((item) => {
											return (
												<div>
													<Space direction='veritcal' style={{ paddingLeft: '20px' }}>
														<Checkbox
															checked={
																formData?.riskProfileModel?.lstQuestionsAnswers?.[index]
																	?.lstAnswers[0]?.answerID === item?.answerID
																	? true
																	: false
															}
															value={item?.answerID}
														>
															{item?.answerDesc}
														</Checkbox>
													</Space>
												</div>
											);
										})}
									</Col>
								</Row>
							</div>
						);
					})}
				</div>

				<div style={{ marginLeft: '30px', marginRight: '30px' }}>
					<Row>
						<Col span={24} style={styles.tableHead}>
							<Text className='head-3' style={{ color: 'white' }}>
								CLIENT ACKNOWLEDGMENT
							</Text>
						</Col>
					</Row>
					<Row style={{ borderLeft: '0.1px ridge black', borderRight: '0.1px ridge black' }}>
						<Col span={24}>
							<Paragraph className='para' style={{ lineHeight: '18px', fontSize: '16px' }}>
								I/We certify that I/we have completely and accurately accomplished the Client
								Suitability Assessment (CSA) Form and that an RCBC representative has fully
								explained the purpose of the CSA and its corresponding results. I/We likewise
								understand that if RCBC is unable to obtain sufficient information, it shall refrain
								from offering any financial product.
							</Paragraph>
							<Paragraph className='para' style={{ lineHeight: '18px', fontSize: '16px' }}>
								I/We agree with the result of the CSA indicated above and the recommended investment
								outlets/derivative product suitable to meet my/our needs.
							</Paragraph>
							<Paragraph className='para' style={{ lineHeight: '18px', fontSize: '16px' }}>
								I/We have made an informed decision to execute a derivative transaction or to open a
								regular trust/fiduciary/investment management account with RCBC after having read
								and/or understood the general features and terms and conditions of such product or
								service as explained in the product presentation. I/We understand that this type of
								investment/transaction does not guarantee against losses.
							</Paragraph>
							<Paragraph className='para' style={{ lineHeight: '18px', fontSize: '16px' }}>
								I/We agree to update my/our client information and investment/risk profile 1) prior
								to transacting a new kind or type of product; 2) in case of material changes in
								my/our financial situation or goal; 3) or periodically, in line with RCBC’s policies
								and procedures, and applicable BSP regulations.
							</Paragraph>
							<Paragraph className='para' style={{ lineHeight: '18px', fontSize: '16px' }}>
								I/We understand that RCBC is regulated by the Bangko Sentral ng Pilipinas. I/We were
								made aware that we may call 8877-7222 or email customercare@rcbc.com for more
								information, inquiries or complaints and that I/we may also file my/our complaints
								with the BSP Financial Consumer Department at 8708-7087 or
								consumeraffairs@bsp.gov.ph or via BSP Webchat (http://www.bsp.gov.ph/) or BSP
								Facebook
								<a href='https://www.facebook.com/BangkoSentralngPilipinas' target='_blank'>
									(https://www.facebook.com/BangkoSentralngPilipinas/)
								</a>
								. I/We understand that Investment products are not deposit accounts and are not
								insured by the Philippine Deposit Insurance Corporation (PDIC).
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col
							span={24}
							style={{
								display: 'flex',
								border: '0.1px solid black',
								textAlign: 'center'
							}}
						>
							<div style={{ position: 'relative', left: '11rem' }}>
								<p>Name: {getNamesTogether()}</p>
								<p>Date: {moment(new Date()).format('DD-MM-YYYY')}</p>
								<div
									style={{
										width: '20rem',
										borderTop: '0.1px solid black',
										marginTop: '20px',
										height: '20px',
										marginBottom: '5px'
									}}
								>
									Client Signature Over Printed Name / Date
									<br />
								</div>
							</div>
						</Col>
					</Row>
				</div>
				<div style={{ marginLeft: '30px', marginRight: '30px' }}>
					<Row>
						<Col span={24} style={styles.tableHead}>
							<Text className='head-3' style={{ color: 'white' }}>
								FOR BANK’S USE ONLY
							</Text>
						</Col>
						<th
							className='added-styled-border'
							style={{ width: '100%', textAlign: 'left', borderLeft: '0.1px solid black' }}
						>
							CIF Number: {formData.otherIdNo ? formData.otherIdNo : null}
						</th>
					</Row>
				</div>
			</div>
			<div class='pagebr'>
				<div style={{ marginLeft: '30px', marginRight: '30px' }}>
					<Row style={{ marginTop: '60px' }}>
						<Col span={24} style={styles.tableHead}>
							<Text className='head-3' style={{ color: 'white', textAlign: 'center' }}>
								QUESTIONNAIRE SCORE
							</Text>
						</Col>
					</Row>
					<Row>
						<Col
							style={{
								backgroundColor: '#dcddde',
								textAlign: 'center',
								borderLeft: '0.1px solid black',
								borderRight: '0.1px solid black'
							}}
							span={18}
						>
							<b>Investment Risk Profile</b>
						</Col>
						<Col
							style={{
								backgroundColor: '#dcddde',
								textAlign: 'center',
								borderLeft: '0.1px solid black',
								borderRight: '0.1px solid black'
							}}
							span={6}
						>
							<b>Score</b>
						</Col>
					</Row>

					{formData?.riskProfileModel?.lstQuestionsAnswers?.map((item, index) => {
						return (
							<Row className='added-styled-border'>
								<Col span={18} style={{ borderLeft: '0.1px solid black' }}>
									<b>Question {index + 1}:</b>
									<Text> {item?.ipsDescriptionName}</Text>
								</Col>
								<Col style={{ borderLeft: '0.1px solid black' }}>
									<span style={{ paddingLeft: '5em' }}>{calculateScore(item)}</span>
								</Col>
							</Row>
						);
					})}

					<Row className='added-styled-border'>
						<Col span={18} style={{ borderLeft: '0.1px solid black' }}>
							<b>Total </b> (Sum of the scores above)
						</Col>
						<Col
							span={6}
							style={{
								paddingLeft: '5em',
								borderLeft: '0.1px solid black'
							}}
						>
							{formData?.riskProfileModel?.score}
						</Col>
					</Row>
					<Row className='added-styled-border'>
						<Col span={18} style={{ borderLeft: '0.1px solid black' }}>
							<b>Investor Profile </b> (Refer to Investor Profile Table below)
						</Col>
						<Col span={6}>
							<span style={{ borderLeft: '0.1px solid black', paddingLeft: '3.5em' }}>
								{findInvestorProfile()}
							</span>
						</Col>
					</Row>
					<Row className='styled-remarks'>
						<Col span={24} className='aln-txt'>
							Remarks
						</Col>
					</Row>
					<Row style={{ marginTop: '20px' }}>
						<Col
							span={2}
							className='added-styled-border'
							style={{
								textAlign: 'center',
								borderLeft: '0.1px solid black',
								borderTop: '0.1px solid black'
							}}
						>
							<Col
								className='added-style'
								style={{
									// borderTop: '0.1px solid black',
									borderLeft: '0.1px solid black',
									margin: 'none'
									// width: '4.5em'
									// borderRight: '0.1px solid black'
								}}
							>
								<b>Score</b>
							</Col>
							<Row
								className='added-styled-border-scores'
								style={{ height: '90px', textAlign: 'center' }}
							>
								<b>5 – 9</b>
							</Row>
							<Row
								className='added-styled-border-scores'
								style={{ height: '90px', textAlign: 'center' }}
							>
								<b>10 – 16</b>
							</Row>
							<Row
								className='added-styled-border-scores'
								style={{ height: '90px', textAlign: 'center' }}
							>
								<b>17 – 20</b>
							</Row>
						</Col>
						<Col span={10} className='added-styled-border' style={{ fontWeight: '400' }}>
							<Col
								className='added-style'
								style={{
									borderTop: '0.1px solid black',
									borderRight: '0.1px solid black'
								}}
							>
								<b>Investor Profile</b>
							</Col>
							<Row
								className='added-styled-border-scores'
								style={{ height: '90px', paddingLeft: '10px' }}
							>
								<u>Conservative</u> – Simple & highly liquid instruments that ascertain capital
								preservation
							</Row>
							<Row
								className='added-styled-border-scores'
								style={{ height: '90px', paddingLeft: '10px' }}
							>
								<u>Moderate</u> – Inclined to moderate level of risk due to volatility in price &/or
								return and possible capital loss
							</Row>
							<Row
								className='added-styled-border-scores'
								style={{ height: '90px', paddingLeft: '10px' }}
							>
								<u>Aggressive</u> – Higher risk due to volatility &/or return and even possible
								capital loss
							</Row>
						</Col>
						<Col span={12} className='added-styled-border' style={{ fontWeight: '400' }}>
							<Col
								className='added-style'
								style={{
									borderTop: '0.1px solid black',
									borderRight: '0.1px solid black'
								}}
							>
								<b>Suitable Products*</b>
							</Col>
							<Row
								className='added-styled-border-scores'
								style={{
									height: '90px',
									paddingLeft: '10px',
									lineHeight: '15px',
									fontSize: '12px',
									paddingTop: '3px'
								}}
							>
								Deposits
								<br /> Spot FX
								<br /> Peso Government Securities
								<br /> Money Market Funds
							</Row>
							<Row
								className='added-styled-border-scores'
								style={{
									height: '90px',
									paddingLeft: '10px',
									lineHeight: '15px',
									fontSize: '12px',
									paddingTop: '3px'
								}}
							>
								All products under the &nbsp;
								<u> Conservative rating</u>
								Bonds, Notes, and Tier 2 Unsecured Subordinated Debt Certain Derivatives and
								Structured Products Preferred Equity Stocks Bond and Balanced Funds
							</Row>
							<Row
								className='added-styled-border-scores'
								style={{
									height: '90px',
									paddingLeft: '10px',
									lineHeight: '15px',
									fontSize: '12px',
									paddingTop: '3px'
								}}
							>
								All products under the &nbsp;<u>Conservative</u> &nbsp;and &nbsp;<u>Moderate</u>{' '}
								&nbsp;ratings Bonds, Notes, Tier 1 Unsecured Subordinated Debt Common Equity Stocks
								Certain Derivatives and Structured Products Equity, Hedge, Exchange Traded Funds
							</Row>
						</Col>
					</Row>

					<i>*refer to the product catalogue for more information</i>
				</div>
			</div>
			<div class='pagebr' style={{ marginLeft: '30px', marginRight: '30px', marginTop: '60px' }}>
				<Row style={{ border: '1px solid black' }}>
					<div
						style={{
							marginLeft: '5px',
							marginRight: '5px',
							textAlign: 'justify',
							marginBottom: '60px'
						}}
					>
						I acknowledge that I have (1) advised the client to read and truthfully accomplish the
						CSA; (2) advised the client to read and understand the Risk Disclosure Statement; (3)
						encouraged the client to ask questions on matters contained therein; and (4) fully
						explained to the client the result of the CSA, the basis of the recommendation, and the
						terms and conditions of the investment outlet or financial product from Trust &
						Investments Group or Treasury Group, as applicable.
					</div>
					<Row
						style={{
							borderTop: '1px solid black',
							borderBottom: '1px solid black',
							textAlign: 'center',
							marginBottom: '40px',
							marginLeft: '60px'
						}}
					>
						Accredited Marketing Personnel / Representative Signature Over Printed Name / Date
					</Row>
				</Row>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		csCustomer: state.customerCreate.controlStructure,
		csAccount: state.accountCreate.controlStructure?.csList,
		formData: state.customerCreateFormData.formData,
		questionList: state.riskProfileQa?.riskProfileQa?.qaList?.lstQuestionsAnswers,
		answerList: state.riskProfileQa?.riskProfileQa?.slctdAns,
		riskProfileData: state.riskProfileQa?.riskProfileQa?.clctdScore?.lstCategories,
		isRiskProfileValue: state.riskProfileQa?.riskProfileQa?.isRiskProfile,
		recommendedCategoryCode: state.riskProfileQa?.riskProfileQa?.clctdScore?.recommendedCategoryCode
	};
};

export default connect(mapStateToProps)(NewCsafPdf);
// export default NewCsafPdf;

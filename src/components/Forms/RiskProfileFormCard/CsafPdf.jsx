import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Pdf.scss';
import rcbclogo from '../../../assets/img/rcbc.png';
import {
	Card,
	Col,
	Divider,
	Form,
	Radio,
	Row,
	Space,
	Input,
	Typography,
	Layout,
	Checkbox
} from 'antd';
import Logo from '../../../components/Logo/Logo';

const { Title, Text, Paragraph } = Typography;

const CasfPdf = (props) => {
	const { csCustomer, csAccount, formData, questionList, answerList } = props;
	let csList = [];
	if (formData?.accType === 'ACCOUNT') {
		csList = Array.isArray(csAccount) ? csAccount : [];
	}
	if (formData?.accType === 'CUSTOMER') {
		csList = Array.isArray(csCustomer) ? csCustomer : [];
	}

	const todayDate = moment(new Date());
	const dob =
		formData?.accType === 'ACCOUNT'
			? moment(formData?.DateofBirth).format('DD-MM-YYYY')
			: moment(formData?.dob).format('DD-MM-YYYY');
	const diff = todayDate.diff(dob, 'years');

	const birthYearDiff = () => {
		if (diff >= 18 && diff <= 30) {
			return 'first';
		}
		if (diff >= 31 && diff <= 45) {
			return 'second';
		}
		if (diff >= 45 && diff <= 60) {
			return 'third';
		}
		if (diff >= 61 && diff <= 75) {
			return 'fourth';
		}
		if (diff >= 76) {
			return 'fifth';
		}
	};

	let SQA = [];
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
			SQA.push(obj);
		});

	let sourceOfFund = {};
	if (csList.length !== 0) {
		csList.forEach((item) => {
			if (item.sectionName === 'Main') {
				sourceOfFund = {
					...sourceOfFund,
					...item.controlStructureField.find((item) => {
						return item.keyField.toLowerCase() === 'sourceoffund';
					})
				};
			}
		});
	}

	let otherBankList = {};
	if (csList.length !== 0) {
		csList.forEach((item) => {
			if (item.sectionName === 'Miscellaneous') {
				otherBankList = {
					...otherBankList,
					...item.controlStructureField.find((item) => {
						return item.keyField === 'OTHRBANK';
					})
				};
			}
		});
	}

	const srcOfFnds = (value) => {
		if (formData?.accType === 'CUSTOMER') {
			return value === formData?.sourceOfFund;
		}
		if (formData?.accType === 'ACCOUNT') {
			return value === formData?.SourceOfFund;
		}
	};

	let othrBankName = '';
	const otherBanks = (bankName) => {
		if (formData?.miscellaneous && formData?.miscellaneous.length !== 0) {
			for (const item of formData?.miscellaneous) {
				if (item?.miscellaneous === bankName) {
					return true;
				}
				if (bankName === 'OTHERS' && item?.type === 'OTHERBANK') {
					othrBankName = item?.miscellaneous;
					return true;
				}
			}
		}

		return false;
	};

	let title = '';
	const headerName = (name) => {
		if (title !== name) {
			title = name;

			return name;
		}
		title = name;

		return '';
	};

	const getTitle = () => {
		const { title } = formData;
		if (formData?.customerType === 'I') {
			return title ? title : '';
		}
		if (formData?.customerType === 'C') {
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

	const getSignature = () => {
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

	const customerType = () => {
		switch (formData?.customerType) {
			case 'I':
				return 'Individual';
			case 'C':
				return 'Corporate';
			default:
				return '';
		}
	};

	const styleSet = {
		space: {
			padding: '0 0 0 5px'
		},
		client: {
			border: '1px solid black',
			borderBottom: 'none',
			padding: '0 0 0 5px'
			// color: 'white',
			// backgroundColor: 'rgb(0, 89, 255)'
		},
		border: {
			border: '1px solid black'
		},
		value: {
			fontSize: '13px',
			padding: '0 0 0 5px'
		},
		sourceOfFund: {
			padding: '2px 0 10px 5px',
			fontWeight: 'bold',
			fontSize: '13px'
		},
		checkBox: {
			padding: '0 0 0 5px'
		}
	};

	return (
		<div className='book'>
			<div className='page'>
				<div className='header'>
					<div className='first'>
						<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
					</div>
					<div className='second'>
						Client Suitability Assessment <br />{' '}
						<span style={{ margin: '0 0 0 40px' }}>For {customerType()} Accounts</span>
					</div>
				</div>
				<div>
					<Row style={styleSet.client}>
						<Col span={24}>CLIENT INFORMATION</Col>
					</Row>
					<Row style={styleSet?.border}>
						<Col span={12} style={{ borderRight: '1px solid black' }}>
							<div className='head'>Account Name</div>
							<div style={styleSet.value}>{getNamesTogether()}</div>
						</Col>
						<Col span={8} style={{ borderRight: '1px solid black' }}>
							<Text className='head'>SEC Qualified Investor Buyer</Text>
							<Row>
								<div className='sec'>
									<Col span={4}>
										<Checkbox
											checked={
												formData?.qib === 'Yes' ? true : formData?.QIB === 'Y' ? true : false
											}
										>
											YES
										</Checkbox>
									</Col>
								</div>
								<div className='sec'>
									<Col span={4}>
										<Checkbox
											checked={formData?.qib === 'No' ? true : formData?.QIB === 'N' ? true : false}
										>
											NO
										</Checkbox>
									</Col>
								</div>
							</Row>
						</Col>
						<Col span={4}>
							<div className='head'>CIF Number</div>
							<div style={styleSet.value}>
								{formData.accType === 'ACCOUNT' ? formData?.CustomerID : formData?.clientId}
							</div>
						</Col>
					</Row>
					<Row>
						<Col span={6} style={{ borderRight: '1px solid black', borderLeft: '1px solid black' }}>
							<div className='head'>Telephone Number</div>
							<div style={styleSet.value}>
								{formData?.accType === 'ACCOUNT'
									? formData?.Telephone
									: formData?.telephoneHome
									? formData?.telephoneHome
									: ''}
							</div>
						</Col>
						<Col span={6} style={{ borderRight: '1px solid black' }}>
							<div className='head'>Mobile Number</div>
							<div style={styleSet.value}>
								{formData?.accType === 'ACCOUNT'
									? formData?.Mobile
									: formData?.mobileNo
									? formData?.mobileNo
									: ''}
							</div>
						</Col>
						<Col
							span={12}
							className='head'
							style={{ borderRight: '1px solid black', fontWeight: 'bold' }}
						>
							{formData?.customerType !== 'C' && 'Age Group'}
						</Col>
					</Row>
					<Row>
						<Col span={12} style={{ border: '1px solid black' }}>
							<div className='head'>E-mail Address</div>
							{formData?.accType === 'ACCOUNT' && (
								<div>{formData?.Email ? formData?.Email.toLowerCase() : ''}</div>
							)}
							{formData?.accType === 'CUSTOMER' && (
								<div>{formData?.eMail ? formData?.eMail.toLowerCase() : ''}</div>
							)}
						</Col>
						{formData?.customerType === 'C' && (
							<Col span={6} style={{ borderBottom: '1px solid black' }} />
						)}
						{formData?.customerType !== 'C' && (
							<Col span={6} style={{ borderBottom: '1px solid black' }}>
								<div style={styleSet.checkBox}>
									<Checkbox checked={birthYearDiff() === 'first' ? true : false}>18-30</Checkbox>
								</div>
								<div style={styleSet.checkBox}>
									<Checkbox checked={birthYearDiff() === 'second' ? true : false}>31-45</Checkbox>
								</div>
								<div style={styleSet.checkBox}>
									<Checkbox checked={birthYearDiff() === 'third' ? true : false}>45-60</Checkbox>
								</div>
							</Col>
						)}
						{formData?.customerType === 'C' && (
							<Col
								span={6}
								style={{ borderBottom: '1px solid black', borderRight: '1px solid black' }}
							/>
						)}
						{formData?.customerType !== 'C' && (
							<Col
								span={6}
								style={{ borderBottom: '1px solid black', borderRight: '1px solid black' }}
							>
								<div>
									<Checkbox checked={birthYearDiff() === 'fourth' ? true : false}>61-75</Checkbox>
								</div>
								<div>
									<Checkbox checked={birthYearDiff() === 'fifth' ? true : false}>
										76 and over
									</Checkbox>
								</div>
							</Col>
						)}
					</Row>
					<Row>
						<Col
							span={12}
							style={{
								borderBottom: '1px solid black',
								borderRight: '1px solid black',
								borderLeft: '1px solid black'
							}}
						>
							<div style={styleSet.sourceOfFund}>Source of Funds</div>
							{sourceOfFund &&
								sourceOfFund?.dropDownValue &&
								sourceOfFund?.dropDownValue.map((item) => {
									return (
										<div style={styleSet.checkBox}>
											<Checkbox checked={srcOfFnds(item?.dataValue)} value={item?.dataValue}>
												{item?.displayValue}
											</Checkbox>
										</div>
									);
								})}
							<div style={{ width: '90%', padding: '0 0 10px 25px' }}>
								<Input
									type='text'
									value={formData?.sourceOfFund === 'OTHERS' ? formData?.sourceOfFundsOth : ''}
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
						<Col
							span={12}
							style={{ borderBottom: '1px solid black', borderRight: '1px solid black' }}
						>
							{formData.accType !== 'ACCOUNT' && (
								<div style={styleSet.sourceOfFund}>Other Banks</div>
							)}
							{formData.accType !== 'ACCOUNT' &&
								Object.keys(otherBankList).length !== 0 &&
								otherBankList?.dropDownValue.map((item) => {
									return (
										<div style={styleSet.checkBox}>
											<Checkbox checked={otherBanks(item?.dataValue)} value={item?.dataValue}>
												{item?.displayValue}
											</Checkbox>
										</div>
									);
								})}
							{formData.accType !== 'ACCOUNT' && (
								<div style={{ width: '90%', padding: '0 0 0 25px' }}>
									<Input
										type='text'
										value={othrBankName}
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
							)}
						</Col>
					</Row>
					<Row></Row>
					{SQA.length !== 0 &&
						SQA?.map((item) => {
							// let answer='';

							return (
								<Row
									key={item.questionID}
									style={{
										borderBottom: '1px solid black',
										borderRight: '1px solid black',
										borderLeft: '1px solid black'
									}}
								>
									{item?.ipsDescriptionName && (
										<Col
											span={24}
											style={{
												borderBottom: '1px solid black',
												borderRight: '1px solid black',
												borderLeft: '1px solid black',
												backgroundColor: '#34bdeb'
											}}
										>
											<Text>{headerName(item?.ipsDescriptionName)}</Text>
										</Col>
									)}
									<Col span={24}>
										<Text>
											{item?.questionDesc === item?.ipsDescriptionName ? '' : item?.questionDesc}
										</Text>
									</Col>
									<Col span={24}>
										{item?.lstAnswers?.map((item) => {
											return (
												<div>
													<Space direction='vertical'>
														<Checkbox checked={item?.checked} value={item?.answerID}>
															{item?.answerDesc}
														</Checkbox>
													</Space>
												</div>
											);
										})}
									</Col>
								</Row>
							);
						})}
				</div>
			</div>
			<div className='page'>
				<div className='header'>
					<div className='first'>
						<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
					</div>
					<div className='second'>
						Client Suitability Assessment <br />{' '}
						<span style={{ margin: '0 0 0 40px' }}>For Individual Accounts</span>
					</div>
				</div>
				<div>
					<Row>
						<Col span={24} style={{ border: '1px solid black', backgroundColor: '#34bdeb' }}>
							CLIENT'S CONFORME AND SIGNATURE
						</Col>
					</Row>
					<Row>
						<Col
							span={24}
							style={{ borderRight: '1px solid black', borderLeft: '1px solid black' }}
						>
							<div style={styleSet.space}>
								I attest that the answers supplied herein truly describe my financial status,
								investment objectives, investment horizon, knowledge, experience and risk tolerance.
								I understand that the Client Suitability Assessment Form (CSAF) serves as guide for
								my Relationship Manager to recommend investment alternatives but does not provide
								any guarantee against possible losses as to the income or principal of my
								investment/s.
							</div>
						</Col>
					</Row>
					<Row>
						<Col
							span={24}
							style={{ borderRight: '1px solid black', borderLeft: '1px solid black' }}
						>
							<div style={styleSet.space}>
								This is to confirm that I have been:
								<ol>
									<li>
										Advised to read and truthfully answer the Client Suitability Assessment Form
										(CSAF).
									</li>
									<li>
										Encouraged to ask questions on matters contained in the Client Suitability
										Assessment Form (CSAF).
									</li>
									<li>
										Profiled based on my Net Worth, Knowledge, Experience and Understanding of
										Investment.
									</li>
									<li>
										Guided on which investment products to take based on the results / scores
										obtained from the Client Suitability Assessment Form (CSAF).
									</li>
								</ol>
							</div>
							<div style={styleSet.space}>
								<Checkbox>
									<Paragraph>
										I agree to the collection and processing of personal data provided herein that
										will be used solely for the assessment of my/our suitability and appropriateness
										to avail of hedging instruments, derivatives, and/or investment products offered
										by Bank. All personal data will be processed in accordance with the Bank's Data
										Privacy Policy provided in the Bank's website (www.pnb.com.ph) and applicable
										data privacy laws, rules and regulations as maybe amended from time to time.
									</Paragraph>
								</Checkbox>
							</div>
						</Col>
					</Row>
					<Row
						style={{
							borderRight: '1px solid black',
							borderLeft: '1px solid black',
							borderBottom: '1px solid black'
						}}
					>
						<Col span={12}>
							<div style={{ width: '90%', padding: '0 0 0 60px' }}>
								<Input
									type='text'
									value={getSignature()}
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
							<div style={{ padding: '0 0 0 60px' }}>Signature over Printed Name</div>
						</Col>
						<Col span={12}>
							<div style={{ width: '40%', margin: '0 0 0 130px' }}>
								<Input
									type='text'
									value={moment(new Date()).format('DD-MM-YYYY')}
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
							<div style={{ margin: '0 0 0 150px' }}>Date</div>
						</Col>
					</Row>
				</div>
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

export default connect(mapStateToProps)(CasfPdf);

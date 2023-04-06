import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import moment from 'moment';
import './InvestmentPolicy.scss';
import NumberFormat from '../../../constants/NumberFormat';
import imgSrc from '../../../assets/img/rcbc.png';
import RiskProfile from '../../../components/RiskProfile/AccountDrilldownRiskProfile';
import { getDateFormat } from '../../../utils/utils';
import Finance from './FinanceGoals';

const { Text, Title } = Typography;

const InvestmentPolicy = ({ investmentData, authData }) => {
	const items = investmentData?.fpGoalCalculation ? [...investmentData?.fpGoalCalculation] : [];
	const chunks = [];
	let i = 1;
	while (items?.length) {
		chunks.push(items.splice(0, i));
		i = 1;
	}

	const bottomData = (pageNumber) => {
		return (
			<Row>
				<Col span={23}>
					<img
						src={imgSrc}
						alt='rcbcLogo'
						height='70px'
						width='70px'
						style={{ marginTop: '-9px' }}
					/>
					<span style={{ color: '#6495ED', fontWeight: '500' }}>Wealth Management</span>
					<h3 style={{ textAlign: 'end' }}>{pageNumber}</h3>
				</Col>
			</Row>
		);
	};

	const makeBold = (item) => {
		const re = new RegExp('');
		return item?.replace(re, '');
	};

	return (
		<>
			<div className='main-page-invest'>
				<div className='main-page-style'>
					<Row justify='center' align='top'>
						<Col>
							<Row>
								<Text className='title-text space-below' underline style={{ marginLeft: '50px' }}>
									Investment Policy Statement
								</Text>
							</Row>

							<Row className='txt-ctr'>
								<Col style={{ marginTop: '60px' }}>
									<Title level={3}>Financial Plan</Title>
									<Title level={3}>For</Title>
									<Title level={3}>
										{`${investmentData?.clientRequisition?.titleName}`}
										{'. '}
										{`${investmentData?.clientRequisition?.firstName}`}
									</Title>
									<Title level={3}>Prepared by</Title>
									<Title level={3}>
										Relationship Manager: {`${investmentData?.clientRequisition?.custRelMgrName}`}
									</Title>
									<Title level={3}>
										Date: <span>{moment().format(getDateFormat())}</span>
									</Title>
									<Title level={3}>PRIVATE AND CONFIDENTIAL</Title>
									{/* <Title level={3}>Denomination:</Title> */}
									<Title level={3}>
										Currency: {`${investmentData?.clientRequisition?.currency}`}
									</Title>
								</Col>
							</Row>
						</Col>
					</Row>

					<div class='foot border'>{bottomData(1)}</div>
				</div>
			</div>
			<div className='main-page-invest page-break '>
				<div className='main-page-style'>
					<Row justify='center'>
						<Row>
							<Text className='title-text added-box' underline>
								Table of Contents
							</Text>
						</Row>
					</Row>
					<Row>
						<ul style={{ listStyleType: 'square', fontSize: '30px', margin: '10px' }}>
							<li>Personal Information</li>
							<li style={{ width: '600px' }}>Key Data & Assumptions</li>
							<li>Your Risk Profile</li>
							<li>Financial Goal Summary</li>
							<li>Your Financial Goals</li>
							<li>Disclaimer</li>
						</ul>
					</Row>
					<div class='foot border'>{bottomData(2)}</div>
				</div>
			</div>
			<div className='main-page-invest page-break'>
				<div className='main-page-style'>
					<Row justify='center'>
						<Text className='title-text added-box' underline>
							Personal Information
						</Text>
					</Row>
					<div className='styled-blk'>
						<Row>First Name: {`${investmentData?.clientRequisition?.firstName}`}</Row>
						<Row>Last Name: {`${investmentData?.clientRequisition?.surnameName}`}</Row>
						<Row>
							Date of Birth:{' '}
							<span>
								{moment(investmentData?.clientRequisition?.dateOfBirth).format(getDateFormat())}
							</span>
						</Row>
						<Row>Age: {`${investmentData?.fPGetKeyData?.[0]?.currentAge ?? ''}`}</Row>
						<Row>Marital Status: {`${investmentData?.clientRequisition?.maritalStatusName}`}</Row>
						<Row>Employer: {`${investmentData?.clientRequisition?.employment ?? ' '}`}</Row>
						<Row>Address: {`${investmentData?.clientRequisition?.mailAdd1 ?? ' '} `}</Row>
						<Row>Contact details: {`${investmentData?.clientRequisition?.firstName}`}</Row>
						<Row>Email Address: {`${investmentData?.clientRequisition?.eMail}`}</Row>
					</div>
					<div class='foot border'>{bottomData(3)}</div>
				</div>
			</div>
			<div className='main-page-invest page-break'>
				<div className='main-page-style'>
					<Row justify='center'>
						<Text className='title-text added-box' underline>
							Key Data
						</Text>
					</Row>
					<Row style={{ marginBottom: '4rem', margin: '6px' }}>
						<h2>
							We have used the following information provided by you in creating the Financial Plan:
						</h2>
					</Row>
					<ul style={{ listStyleType: 'square', marginBottom: '4rem', fontSize: '20px' }}>
						<li
							dangerouslySetInnerHTML={{ __html: makeBold(investmentData?.fPGetKeyData?.[0]?.age) }}
						></li>
						<li
							dangerouslySetInnerHTML={{
								__html: makeBold(investmentData?.fPGetKeyData?.[0]?.lifeExpectancy)
							}}
						></li>
					</ul>
					<Row justify='center'>
						<Text className='title-text added-box' underline>
							Key Assumptions
						</Text>
					</Row>
					<Row style={{ marginBottom: '4rem', margin: '6px' }}>
						<h2>The different rates assumed for making the Plan are :</h2>
					</Row>
					<ul style={{ listStyleType: 'square', marginBottom: '4rem', fontSize: '20px' }}>
						<li
							dangerouslySetInnerHTML={{
								__html: makeBold(investmentData?.fPGetKeyAssumptions?.[0]?.inflationRate)
							}}
						></li>
						<li
							dangerouslySetInnerHTML={{
								__html: makeBold(investmentData?.fPGetKeyAssumptions?.[0]?.rateOfReturn)
							}}
						></li>
					</ul>
					<div class='foot border'>{bottomData(4)}</div>
				</div>
			</div>
			<div className='main-page-invest page-break'>
				<div className='main-page-style'>
					<Row justify='center'>
						<Text className='title-text added-box' underline>
							Your Risk Profile
						</Text>
					</Row>
					<div style={{ margin: '5px', fontSize: '20px' }}>
						<p>
							After assessing your attitude towards investing based on the analysis of the risk
							profiler, you are defined as an{' '}
							<span style={{ fontWeight: 'bold' }}>
								{investmentData?.riskProfileModel?.recommendedQuesBasedCategoryName}
							</span>{' '}
							investor.
						</p>
						<p style={{ color: 'rgb(12, 148, 176)' }}>
							<u>P.S:</u> This is Client specific risk profiling & not Goal Specific. The Goal
							Specific Risk profile can be different from the current one.
						</p>
						<RiskProfile riskProfileData={investmentData?.riskProfileModel} />
					</div>
					<div class='foot border'>{bottomData(5)}</div>
				</div>
			</div>
			<div className='main-page-invest page-break'>
				<div className='main-page-style'>
					<Row justify='center'>
						<Text className='title-text added-box' underline>
							Goal Summary
						</Text>
					</Row>
					<table className='styled-tbl'>
						<tr className='applied-tbl'>
							<th className='applied-tbl-bold'>Sr.No.</th>
							<th className='applied-tbl-bold'>Goal</th>
							<th className='applied-tbl-bold'>Achievement Year</th>
							<th className='applied-tbl-bold'>Target Corpus</th>
							<th className='applied-tbl-bold'>Estimated Corpus</th>
						</tr>
						{investmentData?.fpGoalCalculation?.slice(0, 15)?.map((item, index) => {
							return (
								<tr className='applied-tbl styled-wgth'>
									<th className='applied-tbl'>{index + 1}</th>
									<th className='applied-tbl' style={{ textAlign: 'left' }}>
										{item?.goalName}
									</th>
									<th className='applied-tbl' style={{ textAlign: 'left' }}>
										{item?.targetDate}
									</th>
									<th className='applied-tbl' style={{ textAlign: 'right' }}>
										{NumberFormat(authData, item?.targetCorpus)}
									</th>
									<th className='applied-tbl' style={{ textAlign: 'right' }}>
										{NumberFormat(authData, item?.estimatedCorpus)}
									</th>
								</tr>
							);
						})}
					</table>
					<div class='foot border'>{bottomData(6)}</div>
				</div>
			</div>
			{chunks.map((e, index) => {
				return (
					<div className='main-page-invest page-break'>
						<div className='main-page-style'>
							{index === 0 && (
								<Row justify='center'>
									<Text className='title-text added-box' underline>
										Your Financial Goals
									</Text>
								</Row>
							)}
							<div style={{ margin: '5px' }}>
								<Finance
									fpGoalCalculation={e}
									authData={authData}
									indexFinance={index}
									investmentData={investmentData}
								/>
							</div>
							<div class='foot border'>{bottomData(7 + index)}</div>
						</div>
					</div>
				);
			})}

			<div className='main-page-invest page-break'>
				<div className='main-page-style'>
					<Row justify='center'>
						<Text className='title-text added-box' underline>
							Disclaimer
						</Text>
					</Row>
					<div style={{ margin: '1rem', textAlign: 'justify' }}>
						<p>{investmentData?.goalDisclaimer}</p>
					</div>
					<div class='foot border'>{bottomData(chunks?.length + 7)}</div>
				</div>
			</div>
		</>
	);
};

export default InvestmentPolicy;

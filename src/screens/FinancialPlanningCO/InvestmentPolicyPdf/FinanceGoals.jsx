import React from 'react';
import { Col, Row } from 'antd';
import RiskProfile from '../../../components/RiskProfile/AccountDrilldownRiskProfile';

const Finance = ({ fpGoalCalculation, indexFinance, investmentData }) => {
	const InvestmentModelData = (fpGoalCalculation) => {
		if (fpGoalCalculation?.goalName === 'Retirement Planning') {
			return (
				<Row className='border-background spaced-below-margin'>
					<Col span={10}>
						<h1 className='update-no-margin'>{fpGoalCalculation?.retirementAge}</h1>
						<Col className='styled-text'>Retirement Age</Col>
					</Col>
					<Col span={10}>
						<h1 className='update-no-margin'>{fpGoalCalculation?.monthlyexpense}</h1>
						<Col className='styled-text'>Monthly Expense</Col>
					</Col>
				</Row>
			);
		}
		if (fpGoalCalculation?.goalName === 'Wealth Creation') {
			return (
				<Row className='border-background spaced-below-margin'>
					<Col span={10}>
						<h1 className='update-no-margin'>{fpGoalCalculation?.targetCorpus}</h1>
						<Col className='styled-text'>Target wealth</Col>
					</Col>
					<Col span={10}>
						<h1 className='update-no-margin'>{fpGoalCalculation?.investmenthorizonForEF}</h1>
						<Col className='styled-text'>Investment Horizon</Col>
					</Col>
				</Row>
			);
		}
		if (fpGoalCalculation?.goalName === 'Emergency Fund') {
			return (
				<Row className='border-background spaced-below-margin'>
					<Col span={10}>
						<h1 className='update-no-margin'>{fpGoalCalculation?.monthlyexpense}</h1>
						<Col className='styled-text'>Monthly Expense</Col>
					</Col>
					<Col span={10}>
						<h1 className='update-no-margin'>{fpGoalCalculation?.expenseRetirment}</h1>
						<Col className='styled-text'>Expenses earmarked</Col>
					</Col>
				</Row>
			);
		} else {
			return (
				<Row className='border-background spaced-below-margin'>
					<Col span={10}>
						<h1 className='update-no-margin'>{fpGoalCalculation?.amountNeeded}</h1>
						<Col className='styled-text'>Amount Needed</Col>
					</Col>
					<Col span={10}>
						<h1 className='update-no-margin'>{fpGoalCalculation?.investmenthorizonForEF}</h1>
						<Col className='styled-text'>Investment Horizon</Col>
					</Col>
				</Row>
			);
		}
	};
	return (
		<>
			{fpGoalCalculation?.map((fpGoalCalculation, index) => {
				return (
					<>
						<h2 style={{ textAlign: 'center', marginTop: '1px' }}>
							{indexFinance + index + 1} .{fpGoalCalculation?.goalName}
						</h2>
						<h2 style={{ marginBottom: '10px' }}>
							<h4>{fpGoalCalculation?.goalTypeDescription}</h4>
							{/* <u>Goal Specific Risk Profiling</u> */}
						</h2>
						<p>
							After assessing your attitude towards investing based on the analysis of the tisk
							profiler, you are defined as an{' '}
							<span style={{ fontWeight: 'bold' }}>
								{/* {fpGoalCalculation?.riskProfileModel?.recommendedQuesBasedCategoryName} */}
								{
									investmentData?.goalWiseRiskProfileModel?.find(
										(item) => item?.financialPlanningId === fpGoalCalculation?.financialPlanningId
									)?.recommendedQuesBasedCategoryName
								}
							</span>{' '}
							investor.
						</p>
						<h2>
							<i>
								{
									investmentData?.goalWiseRiskProfileModel?.find(
										(item) => item?.financialPlanningId === fpGoalCalculation?.financialPlanningId
									)?.recommendedQuesBasedCategoryName
								}{' '}
								Investor {/* {fpGoalCalculation?.riskProfileModel?.riskCategoryDescription} */}
								{
									investmentData?.goalWiseRiskProfileModel?.find(
										(item) => item?.financialPlanningId === fpGoalCalculation?.financialPlanningId
									)?.riskCategoryDescription
								}
							</i>
						</h2>
						<div style={{ marginBottom: '10px' }}>
							{/* <RiskProfile riskProfileData={fpGoalCalculation?.riskProfileModel} /> */}

							<RiskProfile
								riskProfileData={investmentData?.goalWiseRiskProfileModel?.find(
									(item) => item?.financialPlanningId === fpGoalCalculation?.financialPlanningId
								)}
							/>
						</div>
						{InvestmentModelData(fpGoalCalculation)}

						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Starting investment
								<Col>
									{fpGoalCalculation?.goalInvestmentModels?.map((e) => {
										if (e?.investmenttype === 'STARTINV') {
											{
												return e?.investmentvalue;
											}
										}
									})}
								</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Systematic Contribution
								<Col>
									{fpGoalCalculation?.goalInvestmentModels?.map((e) => {
										if (e?.investmenttype === 'SIPINV') {
											{
												return e?.investmentvalue;
											}
										}
									})}
								</Col>
							</Col>

							<Col span={6} className='styled-text'>
								Installments in a year
								<Col>
									{fpGoalCalculation?.goalInvestmentModels?.map((e) => {
										if (e?.investmenttype === 'SIPINV') {
											{
												return e?.frequency;
											}
										}
									})}
								</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Annual Increase
								<Col>{fpGoalCalculation?.percentageInvestment + '%'}</Col>
							</Col>
						</Row>
						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Estimated corpus
								<Col>{fpGoalCalculation?.estimatedCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Targeted Corpus
								<Col>{fpGoalCalculation?.targetCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{fpGoalCalculation?.estimatedCorpus < fpGoalCalculation?.targetCorpus
									? 'Below Target'
									: 'Above Target'}
								<Col>
									{fpGoalCalculation?.estimatedCorpus < fpGoalCalculation?.targetCorpus
										? fpGoalCalculation?.targetCorpus - fpGoalCalculation?.estimatedCorpus
										: fpGoalCalculation?.estimatedCorpus - fpGoalCalculation?.targetCorpus}
								</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{fpGoalCalculation?.estimatedCorpus < fpGoalCalculation?.targetCorpus
									? 'Deficit'
									: 'Surplus'}
								<Col>
									{fpGoalCalculation?.estimatedCorpus < fpGoalCalculation?.targetCorpus
										? ((fpGoalCalculation?.targetCorpus - fpGoalCalculation?.estimatedCorpus) *
												100) /
												fpGoalCalculation?.targetCorpus +
										  '%'
										: ((fpGoalCalculation?.estimatedCorpus - fpGoalCalculation?.targetCorpus) *
												100) /
												fpGoalCalculation?.targetCorpus +
										  '%'}
								</Col>
							</Col>
						</Row>
					</>
				);
			})}
		</>
	);
};

export default Finance;

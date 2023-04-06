import React from 'react';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { Col, Row, Button } from 'antd';
import NumberFormat from '../../constants/NumberFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FinancialPlanning.scss';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';

const PostGoal = ({
	openPostGoal,
	setOpenPostGoal,
	goalName,
	formData,
	setPageId,
	authData,
	backArrow = () => {},
	setRetirementPlanning,
	deleteAPI = () => {}
}) => {
	const data = () => {
		switch (goalName) {
			case 'Retirement Planning':
				return (
					<>
						<Row className='border-background spaced-below-margin'>
							<Col span={10}>
								<h1 className='update-no-margin'>{formData.retirementAge}</h1>
								<Col className='styled-text'>Retirement Age</Col>
							</Col>
							<Col span={10}>
								<h1 className='update-no-margin'>{formData.monthlyexpense}</h1>
								<Col className='styled-text'>Monthly Expense</Col>
							</Col>
							<Col span={4}>
								<a
									className='start-over-btn'
									onClick={() => {
										setOpenPostGoal(false);
										// beginGoalCreation();
										setRetirementPlanning(true);
										deleteAPI(formData.financialplanninigid, 'N');
									}}
								>
									Start Over
								</a>
							</Col>
						</Row>

						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Starting investment
								<Col>{formData.startInvestment}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Systematic Contribution
								<Col>{formData.systematicInvestment}</Col>
							</Col>
							{/* <FontAwesomeIcon
								icon='fa-solid fa-arrow-up'
								size='2x'
								style={{
									color: false ? '#CD0000' : '#05BC6A',
									marginLeft: '-25px',
									marginRight: '10px'
								}}
							/> */}
							<Col span={6} className='styled-text'>
								Installments in a year
								<Col>{formData.frequency}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Annual Increase
								<Col>{formData.percentageInvestment + '%'}</Col>
							</Col>
						</Row>
						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Estimated corpus
								<Col>{formData.estimatedCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Targeted Corpus
								<Col>{formData.targetCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{formData.estimatedCorpus < formData.targetCorpus ? 'Below Target' : 'Above Target'}
								<Col>
									{formData.estimatedCorpus < formData.targetCorpus
										? NumberFormat(authData, formData.targetCorpus - formData.estimatedCorpus)
										: NumberFormat(authData, formData.estimatedCorpus - formData.targetCorpus)}
								</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{formData.estimatedCorpus < formData.targetCorpus ? 'Deficit' : 'Surplus'}
								<Col>
									{formData.estimatedCorpus < formData.targetCorpus
										? NumberFormat(
												authData,
												((formData.targetCorpus - formData.estimatedCorpus) * 100) /
													formData.targetCorpus
										  ) + '%'
										: NumberFormat(
												authData,
												((formData.estimatedCorpus - formData.targetCorpus) * 100) /
													formData.targetCorpus
										  ) + '%'}
								</Col>
							</Col>
						</Row>
					</>
				);
			case 'Emergency Fund':
				return (
					<>
						<Row className='border-background spaced-below-margin'>
							<Col span={10}>
								<h1 className='update-no-margin'>{formData.monthlyexpense}</h1>
								<Col className='styled-text'>Monthly Expense</Col>
							</Col>
							<Col span={10}>
								<h1 className='update-no-margin'>{formData.expenseearmark}</h1>
								<Col className='styled-text'>Expenses earmarked</Col>
							</Col>
							<Col span={4}>
								<a
									className='start-over-btn'
									onClick={() => {
										setOpenPostGoal(false);
										// beginGoalCreation();
										setRetirementPlanning(true);
										deleteAPI(formData.financialplanninigid, 'N');
									}}
								>
									Start Over
								</a>
							</Col>
						</Row>

						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Starting investment
								<Col>{formData.startInvestment}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Systematic Contribution
								<Col>{formData.systematicInvestment}</Col>
							</Col>
							{/* <FontAwesomeIcon
								icon='fa-solid fa-arrow-up'
								size='2x'
								style={{
									color: false ? '#CD0000' : '#05BC6A',
									marginLeft: '-25px',
									marginRight: '10px'
								}}
							/> */}
							<Col span={6} className='styled-text'>
								Installments in a year
								<Col>{formData.frequency}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Annual Increase
								<Col> {formData.percentageInvestment + '%'}</Col>
							</Col>
						</Row>
						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Estimated corpus
								<Col>{formData.estimatedCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Targeted Corpus
								<Col>{formData.targetCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{formData.estimatedCorpus < formData.targetCorpus ? 'Below Target' : 'Above Target'}
								<Col>
									{formData.estimatedCorpus < formData.targetCorpus
										? NumberFormat(authData, formData.targetCorpus - formData.estimatedCorpus)
										: NumberFormat(authData, formData.estimatedCorpus - formData.targetCorpus)}
								</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{formData.estimatedCorpus < formData.targetCorpus ? 'Deficit' : 'Surplus'}
								<Col>
									{formData.estimatedCorpus < formData.targetCorpus
										? NumberFormat(
												authData,
												((formData.targetCorpus - formData.estimatedCorpus) * 100) /
													formData.targetCorpus
										  ) + '%'
										: NumberFormat(
												authData,
												((formData.estimatedCorpus - formData.targetCorpus) * 100) /
													formData.targetCorpus
										  ) + '%'}
								</Col>
							</Col>
						</Row>
					</>
				);
			case 'Wealth Creation':
				return (
					<>
						<Row className='border-background spaced-below-margin'>
							<Col span={10}>
								<h1 className='update-no-margin'>{formData.targetWealth}</h1>
								<Col className='styled-text'>Target wealth</Col>
							</Col>
							<Col span={10}>
								<h1 className='update-no-margin'>{formData.investmenthorizonForEF}</h1>
								<Col className='styled-text'>Investment Horizon</Col>
							</Col>
							<Col span={4}>
								<a
									className='start-over-btn'
									onClick={() => {
										setOpenPostGoal(false);
										// beginGoalCreation();
										setRetirementPlanning(true);
										deleteAPI(formData.financialplanninigid, 'N');
									}}
								>
									Start Over
								</a>
							</Col>
						</Row>

						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Starting investment
								<Col>{formData.startInvestment}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Systematic Contribution
								<Col>{formData.systematicInvestment}</Col>
							</Col>
							{/* <FontAwesomeIcon
								icon='fa-solid fa-arrow-up'
								size='2x'
								style={{
									color: false ? '#CD0000' : '#05BC6A',
									marginLeft: '-25px',
									marginRight: '10px'
								}}
							/> */}
							<Col span={6} className='styled-text'>
								Installments in a year
								<Col>{formData.frequency}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Annual Increase
								<Col>{formData.percentageInvestment + '%'}</Col>
							</Col>
						</Row>
						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Estimated corpus
								<Col>{formData.estimatedCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Targeted Corpus
								<Col>{formData.targetCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{formData.estimatedCorpus < formData.targetCorpus ? 'Below Target' : 'Above Target'}
								<Col>
									{formData.estimatedCorpus < formData.targetCorpus
										? NumberFormat(authData, formData.targetCorpus - formData.estimatedCorpus)
										: NumberFormat(authData, formData.estimatedCorpus - formData.targetCorpus)}
								</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{formData.estimatedCorpus < formData.targetCorpus ? 'Deficit' : 'Surplus'}
								<Col>
									{formData.estimatedCorpus < formData.targetCorpus
										? NumberFormat(
												authData,
												((formData.targetCorpus - formData.estimatedCorpus) * 100) /
													formData.targetCorpus
										  ) + '%'
										: NumberFormat(
												authData,
												((formData.estimatedCorpus - formData.targetCorpus) * 100) /
													formData.targetCorpus
										  ) + '%'}
								</Col>
							</Col>
						</Row>
					</>
				);
			default:
				return (
					<>
						<Row className='border-background spaced-below-margin'>
							<Col span={10}>
								<h1 className='update-no-margin'>{formData.amountNeeded}</h1>
								<Col className='styled-text'>Amount Needed</Col>
							</Col>
							<Col span={10}>
								<h1 className='update-no-margin'>{formData.investmenthorizonForEF}</h1>
								<Col className='styled-text'>Investment Horizon</Col>
							</Col>
							<Col span={4}>
								<a
									onClick={() => {
										setOpenPostGoal(false);
										// beginGoalCreation();
										setRetirementPlanning(true);
										deleteAPI(formData.financialplanninigid, 'N');
									}}
									className='start-over-btn'
								>
									Start Over
								</a>
							</Col>
						</Row>

						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Starting investment
								<Col>{formData.startInvestment}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Systematic Contribution
								<Col>{formData.systematicInvestment}</Col>
							</Col>
							{/* <FontAwesomeIcon
								icon='fa-solid fa-arrow-up'
								size='2x'
								style={{
									color: false ? '#CD0000' : '#05BC6A',
									marginLeft: '-25px',
									marginRight: '10px'
								}}
							/> */}
							<Col span={6} className='styled-text'>
								Installments in a year
								<Col>{formData.frequency}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Annual Increase
								<Col>{formData.percentageInvestment + '%'}</Col>
							</Col>
						</Row>
						<Row className='spaced-below-margin'>
							<Col span={6} className='styled-text'>
								Estimated corpus
								<Col>{formData.estimatedCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								Targeted Corpus
								<Col>{formData.targetCorpus}</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{formData.estimatedCorpus < formData.targetCorpus ? 'Below Target' : 'Above Target'}
								<Col>
									{formData.estimatedCorpus < formData.targetCorpus
										? NumberFormat(authData, formData.targetCorpus - formData.estimatedCorpus)
										: NumberFormat(authData, formData.estimatedCorpus - formData.targetCorpus)}
								</Col>
							</Col>
							<Col span={6} className='styled-text'>
								{formData.estimatedCorpus < formData.targetCorpus ? 'Deficit' : 'Surplus'}
								<Col>
									{formData.estimatedCorpus < formData.targetCorpus
										? NumberFormat(
												authData,
												((formData.targetCorpus - formData.estimatedCorpus) * 100) /
													formData.targetCorpus
										  ) + '%'
										: NumberFormat(
												authData,
												((formData.estimatedCorpus - formData.targetCorpus) * 100) /
													formData.targetCorpus
										  ) + '%'}
								</Col>
							</Col>
						</Row>
					</>
				);
		}
	};
	return (
		<CustomModal
			width='80vw'
			title={
				<>
					<FontAwesomeIcon icon={faChevronLeft} onClick={() => backArrow('PostGoals')} />
					&nbsp;
					{goalName}
				</>
			}
			visible={openPostGoal}
			handleCancel={() => {
				setOpenPostGoal(false);
				setPageId(0);
			}}
			closable={true}
		>
			{data()}
			<Row>
				<Button className='calculate-btn' onClick={() => setPageId(5)}>
					Submit
				</Button>
			</Row>
		</CustomModal>
	);
};

export default PostGoal;

import { Col, Row, Button, Input, InputNumber, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import './FinancialPlanning.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from '../../constants/NumberFormat';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';

const { Option } = Select;
const IncomeProjections = ({
	openIncomeProjections,
	setOpenIncomeProjections,
	setOpenPostGoal,
	setPageId,
	calculateEditToggle,
	onFormPageSubmit = () => {},
	frequencyDropdown,
	formData,
	goalName,
	authData,
	backArrow = () => {},
	rules = {},
	setCalculateEditToggle
}) => {
	return (
		<CustomModal
			width='80vw'
			title={
				<>
					<FontAwesomeIcon icon={faChevronLeft} onClick={() => backArrow('IncomeProjection')} />
					&nbsp;
					{goalName}
				</>
			}
			visible={openIncomeProjections}
			handleCancel={() => {
				setOpenIncomeProjections(false);
				setPageId(0);
			}}
			closable={true}
		>
			<Row className='styled-text'>
				<Col span={5}>
					Starting Investment
					<Col>
						<FormItem name='startInvestment' rules={rules?.startInvestment ?? []}>
							<InputNumber
								controls={false}
								style={{ width: '100%', borderRadius: '5px' }}
								disabled={!calculateEditToggle}
							/>
						</FormItem>
					</Col>
				</Col>
			</Row>
			<Row>
				<Col span={5} className='styled-text'>
					Systematic Investment
					<Col>
						<FormItem name='systematicInvestment' rules={rules?.systematicInvestment ?? []}>
							<InputNumber
								controls={false}
								style={{ width: '100%', borderRadius: '5px' }}
								disabled={!calculateEditToggle}
							/>
						</FormItem>
					</Col>
				</Col>
				<Col span={5} className='style-input styled-text'>
					Installments in a year
					<Col>
						<FormItem name='frequency' rules={rules?.frequency ?? []}>
							<Select
								mode='single'
								style={{ width: '100%', borderRadius: '5px' }}
								disabled={!calculateEditToggle}
							>
								{frequencyDropdown?.map((eachOption, idx) => {
									return (
										<Option
											value={parseInt(eachOption.dataValue)}
											label={eachOption.displayValue}
											key={idx}
										>
											{eachOption.displayValue}
										</Option>
									);
								})}
							</Select>
						</FormItem>
					</Col>
				</Col>
				<Col span={5} className='style-input styled-text'>
					Annual Increase (%)
					<Col>
						<FormItem name='percentageInvestment' rules={rules?.percentageInvestment ?? []}>
							<InputNumber
								controls={false}
								style={{ width: '100%', borderRadius: '5px' }}
								disabled={!calculateEditToggle}
							/>
						</FormItem>
					</Col>
				</Col>
			</Row>
			<Row>
				<Button
					className='calculate-btn-second'
					onClick={() => onFormPageSubmit('IncomeProjections')}
				>
					{calculateEditToggle ? 'Calculate' : 'Edit'}
				</Button>
			</Row>
			<>
				<Row className='spaced-below-margin styled-text clr-bordered'></Row>
				<Row>
					<Col span={4} className='styled-font update-no-margin'>
						{formData?.estimatedCorpus && NumberFormat(authData, formData?.estimatedCorpus)}
					</Col>
					<Col span={4} className='styled-font update-no-margin'>
						{formData?.estimatedCorpus && NumberFormat(authData, formData?.targetCorpus)}
					</Col>
					<Col span={4} className='styled-font update-no-margin'>
						{formData?.estimatedCorpus &&
							(formData.estimatedCorpus < formData.targetCorpus
								? NumberFormat(authData, formData.targetCorpus - formData.estimatedCorpus)
								: NumberFormat(authData, formData.estimatedCorpus - formData.targetCorpus))}
					</Col>
					<FontAwesomeIcon
						icon={
							formData?.estimatedCorpus &&
							(formData.estimatedCorpus < formData.targetCorpus
								? 'fa-solid fa-arrow-down'
								: 'fa-solid fa-arrow-up')
						}
						size='2x'
						style={{
							color: formData?.estimatedCorpus < formData?.targetCorpus ? '#CD0000' : '#05BC6A',
							marginLeft: '-25px',
							marginRight: '10px'
						}}
					/>
					<Col span={10} className='styled-font update-no-margin'>
						{formData?.estimatedCorpus &&
							(formData.estimatedCorpus < formData.targetCorpus
								? NumberFormat(
										authData,
										((formData.targetCorpus - formData.estimatedCorpus) * 100) /
											formData.targetCorpus
								  ) + '%'
								: NumberFormat(
										authData,
										((formData.estimatedCorpus - formData.targetCorpus) * 100) /
											formData.targetCorpus
								  ) + '%')}
					</Col>
				</Row>
				<Row>
					<Col span={4} style={{ color: '#898EA9' }}>
						{formData?.estimatedCorpus && 'Estimated Corpus'}
					</Col>
					<Col span={4} style={{ color: '#898EA9' }}>
						{formData?.estimatedCorpus && 'Targeted Corpus'}
					</Col>
					<Col span={4} style={{ color: '#898EA9' }}>
						{formData?.estimatedCorpus &&
							(formData.estimatedCorpus < formData.targetCorpus ? 'Below Target' : 'Above Target')}
					</Col>
					<Col span={10} style={{ marginLeft: '10px', color: '#898EA9' }}>
						{formData?.estimatedCorpus &&
							(formData.estimatedCorpus < formData.targetCorpus ? 'Deficit' : 'Surplus')}
					</Col>
				</Row>
				<Row className='spaced-above-margin styled-text'>
					{formData?.estimatedCorpus &&
						(formData.estimatedCorpus === formData.targetCorpus
							? null
							: formData.estimatedCorpus < formData.targetCorpus
							? `To achieve required corpus either you need do starting investment is of
				${NumberFormat(authData, formData.startInvestmentWhatIf)} or to increase systematic investment to
				${NumberFormat(authData, formData.systematicInvestmentWhatIf)}.`
							: `With planned investment you will be able to achieve
				you planned goal. You can reduce starting investment to ${NumberFormat(
					authData,
					formData.startInvestmentWhatIf
				)} or
				can decrease systematic investment to ${NumberFormat(
					authData,
					formData.systematicInvestmentWhatIf
				)} to reduce
				surplus investment.`)}
				</Row>
				<Row>
					<Button
						className='calculate-btn'
						onClick={() => {
							setOpenPostGoal(true);
							setOpenIncomeProjections(false);
							setCalculateEditToggle(true);
						}}
						disabled={calculateEditToggle}
					>
						Submit
					</Button>
				</Row>
			</>
		</CustomModal>
	);
};

export default IncomeProjections;

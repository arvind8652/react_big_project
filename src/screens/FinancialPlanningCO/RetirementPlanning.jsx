import { Col, Row, Button, Input, InputNumber, Checkbox } from 'antd';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import './FinancialPlanning.scss';
import FormItem from 'antd/lib/form/FormItem';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { RESP_FIELD_SIZE, RESP_TEXT_AREA_ROW, theme } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RetirementPlanning = ({
	retirementPlanning,
	setRetirementPlanning,
	goalName,
	goalType,
	planningObject,
	flag,
	setFlag,
	setPageId,
	rules = {},
	onFormPageSubmit,
	backArrow = () => {},
	setCheckprop,
	checkprop
}) => {
	const cancelModal = () => {
		setRetirementPlanning(false);
		setFlag(false);
		setPageId(0);
	};

	const inputHandler = (goalType) => {
		switch (goalType) {
			case 'RP':
				return (
					<FormItem name='expenseRetirement' label='Expense Retirement'>
						<Input type='text' size='large' />
					</FormItem>
				);
			case 'EF':
				return (
					<FormItem name='emergencyFundNeeded' label='Emergency Fund Needed'>
						<Input type='text' size='large' />
					</FormItem>
				);
			// case 'CG':
			// 	return (
			// 		<>
			// 			<FormItem name='amountNeeded' label='Amount Needed'>
			// 				<Input type='text' size='large' />
			// 			</FormItem>
			// 		</>
			// 	);

			default:
				return;
		}
	};

	const selectBoxHandler = (item) => {
		switch (item?.controlType) {
			case 'TextBox':
				// return <NewGenericInput type='text' keyField={planningObject?.keyField} />;
				return (
					<Input
						type='text'
						size='large'
						controls={false}
						disabled={!item?.isEditable}
						placeholder={`Enter ${item.fieldLabel}`}
					/>
				);
			case 'CheckBox':
				return <Checkbox onChange={(e) => setCheckprop(e.target.checked)} />;

			default:
				return (
					<InputNumber
						style={{ width: '100%', borderRadius: '5px' }}
						size='large'
						controls={false}
						disabled={item?.fieldLabel === `Loan%` ? !checkprop : !item?.isEditable}
						placeholder={`Enter ${item.fieldLabel}`}
					/>
				);
		}
	};

	// HARDCODED fields
	const StaticFields = {
		inflationRate: {
			fieldLabel: 'Inflation',
			keyField: 'inflation',
			isEditable: false
		},
		GoalPriority: {
			fieldLabel: 'Goal Priority',
			keyField: 'priority',
			isEditable: true
		}
	};

	const styles = {
		eqMargin: { margin: '0.8em' }
	};

	return (
		<>
			<CustomModal
				title={
					<>
						<FontAwesomeIcon icon={faChevronLeft} onClick={() => backArrow('RetirementPlanning')} />
						&nbsp;
						{goalName}
					</>
				}
				visible={retirementPlanning}
				handleCancel={cancelModal}
				closable
			>
				<Row>
					{planningObject &&
						Object.values(planningObject).map((item, idx) => {
							return (
								<Col
									span={item?.controlType == 'CheckBox' ? 2 : 7}
									key={idx}
									offset={1}
									style={styles.eqMargin}
								>
									<FormItem
										label={item?.fieldLabel}
										name={item?.keyField}
										colon={false}
										rules={rules[item.keyField] ?? []}
										validateTrigger={['onChange', 'onBlur']}
									>
										{selectBoxHandler(item)}
									</FormItem>
								</Col>
							);
						})}

					{StaticFields &&
						Object.values(StaticFields).map((item, idx) => (
							<Col span={7} offset={1} key={idx} style={styles.eqMargin}>
								<FormItem
									name={item.keyField}
									label={item.fieldLabel}
									colon={false}
									className='textStyle'
									rules={rules[item.keyField] ?? []}
									validateTrigger={['onChange', 'onBlur']}
								>
									<Input
										placeholder={`Enter ${item.fieldLabel}`}
										size='large'
										style={{ color: '#696A91' }}
										disabled={item?.isEditable == false}
									/>
								</FormItem>
							</Col>
						))}
					<Col span={7} offset={1} style={styles.eqMargin}>
						<FormItem name='remarks' label='Remarks' colon={false}>
							<Input.TextArea rows={RESP_TEXT_AREA_ROW} size={RESP_FIELD_SIZE} />
						</FormItem>
					</Col>
				</Row>
				{flag != false && (
					<Row>
						<Col span={7} offset={1} style={styles.eqMargin}>
							<FormItem name='targetCorpus' label='Target Corpus' colon={false}>
								<Input size='large' />
							</FormItem>
						</Col>

						{goalType === 'RP' && (
							<Col span={7} offset={1} style={styles.eqMargin}>
								<FormItem name='investmentHorizon' label='Investment Horizon' colon={false}>
									<Input size='large' />
								</FormItem>
							</Col>
						)}
						<Col span={7} offset={1} style={styles.eqMargin}>
							{inputHandler(goalType)}
						</Col>
						{/* {goalType === 'CG' && (
							<Col span={7} offset={1} style={styles.eqMargin}>
								<FormItem name='loan' label='Loan %'>
									<Input type='text' size='large' />
								</FormItem>
							</Col>
						)} */}
					</Row>
				)}
				<div style={{ marginTop: '1em' }}>
					<Button
						className='calculate-btn'
						type='primary'
						style={{ fontSize: '28px' }}
						onClick={() => onFormPageSubmit('RetirementPlanning')}
					>
						{flag ? 'Save & Next' : 'Calculate'}
					</Button>
				</div>
			</CustomModal>
		</>
	);
};
export default RetirementPlanning;

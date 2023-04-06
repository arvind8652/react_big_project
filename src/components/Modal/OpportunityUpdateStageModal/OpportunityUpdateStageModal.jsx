import { Form, Button, Select, Radio, Input, DatePicker, InputNumber, Modal, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getDependentStageDataApi } from '../../../api/commonApi';
import { getProbablityByStageApi } from '../../../api/opportunityViewApi';
import { getOpportunityAddCs } from '../../../redux/actions/opportunityCreateActions';
import { createValidators, generateCsObject, kFormatter } from '../../../utils/utils';
import CustomModal from '../CustomModal/CustomModal';
import TextArea from 'antd/lib/input/TextArea';
import { ScButtonPrimary, ScButtonText, ScModal } from '../../StyledComponents/genericElements';
import {
	ScDatePicker,
	ScInput,
	ScRadioButton,
	ScRadioGroup,
	ScSelect,
	ScTextArea
} from '../../StyledComponents/formElements';
const { Option } = Select;

export const OpportunityUpdateStageModal = (props) => {
	const {
		controlStructure,
		getOpportunityAddCs,
		visible,
		handleOk,
		handleCancel,
		stageData,
		selectedRows
	} = props;

	const [updateStageFormData, setUpdateStageFormData] = useState({
		records: stageData && stageData.recordId,
		status: (stageData && stageData.status && stageData.status.toUpperCase()) || 'OPEN',
		// stage: stageData.stage || null,
		stage: props?.selectedRows?.[0]?.['stage'] || null,
		// stage: null,
		probability: null,
		preferredCurrency: null,
		closureAmount: null,
		closureDate: moment(),
		reason: '',
		remark: ''
	});
	const [stageDropdownOptions, setStageDropdownOptions] = useState();
	const [form] = Form.useForm();
	useEffect(() => {
		(!controlStructure || controlStructure.length === 0) && getOpportunityAddCs();
		if (updateStageFormData.status) {
			getDependentStageDataApi(updateStageFormData.status).then((res) => {
				setStageDropdownOptions(res.data.lookUpValues);
			});
		}
		// console.log('check opport----------', updateStageFormData);
	}, [updateStageFormData]);
	useEffect(() => {
		// console.log('stages data-----------', stageData);
		setUpdateStageFormData({
			...updateStageFormData,
			records: props && props.stageData ? props.stageData.recordId : null,
			status:
				(props &&
					props.stageData &&
					props.stageData.status &&
					props.stageData.status.toUpperCase()) ||
				'OPEN',
			stage: props?.selectedRows?.[0]?.['stage'] || null,
			preferredCurrency: null,
			closureAmount: null,
			closureDate: moment(),
			reason: '',
			remark: ''
		});
		if (props?.selectedRows?.[0]?.['stage']) {
			// getProbablityByStageApi(props.stageData.stage).then((res) => {
			getProbablityByStageApi(props?.selectedRows?.[0]?.['stage']).then((res) => {
				setUpdateStageFormData({
					...updateStageFormData,
					stage: props?.selectedRows?.[0]?.['stage'],
					records: props && props.stageData ? props.stageData.recordId : null,
					probability: res.data,
					preferredCurrency: null,
					closureAmount: undefined,
					closureDate: moment(),
					reason: '',
					remark: ''
				});
				form.setFieldsValue({
					records: props && props.stageData ? props.stageData.recordId : null,
					stage: props?.selectedRows?.[0]?.['stage'],
					probability: res.data,
					preferredCurrency: null,
					closureAmount: undefined,
					closureDate: moment(),
					reason: '',
					remark: ''
				});
			});
		}
		form.setFieldsValue({
			...updateStageFormData,
			recordId: props && props.stageData ? props.stageData.recordId : null,
			status:
				(props &&
					props.stageData &&
					props.stageData.status &&
					props.stageData.status.toUpperCase()) ||
				'OPEN',
			stage: props?.selectedRows?.[0]?.['stage'] || null,
			preferredCurrency: null,
			closureAmount: null,
			closureDate: moment(),
			reason: '',
			remark: ''
		});
	}, [stageData]);
	let updateStageCs;
	let formRules;
	if (controlStructure && controlStructure.length > 0) {
		updateStageCs = controlStructure && [
			generateCsObject(controlStructure[0].controlStructureField),
			generateCsObject(controlStructure[1].controlStructureField)
		];
		formRules = {
			...createValidators(controlStructure[0].controlStructureField, form),
			...createValidators(controlStructure[1].controlStructureField, form)
		};
	}
	const handleFormValueChange = (values) => {
		if (values.status && values.status !== updateStageFormData.status) {
			getDependentStageDataApi(values.status).then((res) => {
				setStageDropdownOptions(res.data.lookUpValues);
			});
			setUpdateStageFormData({
				...updateStageFormData,
				...values,
				stage: null,
				probability: null,
				preferredCurrency: null,
				closureAmount: null,
				closureDate: null,
				reason: '',
				remark: ''
			});
			form.setFieldsValue({
				stage: null,
				probability: null,
				preferredCurrency: null,
				closureAmount: null,
				closureDate: null,
				reason: '',
				remark: ''
			});
		} else if (values.stage && values.stage !== updateStageFormData.stage) {
			getProbablityByStageApi(values.stage).then((res) => {
				setUpdateStageFormData({
					...updateStageFormData,
					...values,
					probability: res.data,
					preferredCurrency: null,
					closureAmount: undefined,
					closureDate: undefined,
					reason: '',
					remark: ''
				});
				form.setFieldsValue({
					probability: res.data,
					preferredCurrency: null,
					closureAmount: undefined,
					closureDate: undefined,
					reason: '',
					remark: ''
				});
			});
		} else if (values.closureDate && values.closureDate !== updateStageFormData.closureDate) {
			setUpdateStageFormData({
				...updateStageFormData,
				closureDate: values.closureDate ? moment(values.closureDate).toISOString() : undefined
			});
		} else {
			setUpdateStageFormData({ ...updateStageFormData, ...values });
		}
	};
	const handleFinish = (values) => {
		// call handleOk
		handleOk(values);
	};
	const statusRadioOptions = ['Open', 'Close'];
	const preferredCurrencyDenotion = (
		<Form.Item
			name='preferredCurrency'
			noStyle
			rules={formRules ? formRules.preferredcurrency : []}
		>
			{updateStageCs && (
				<ScSelect value={updateStageFormData ? updateStageFormData.preferredCurrency : ''}>
					{updateStageCs[1] &&
						updateStageCs[1].PreferredCurrency.dropDownValue.map((currency) => (
							<Option value={currency.dataValue}>{currency.displayValue}</Option>
						))}
				</ScSelect>
			)}
		</Form.Item>
	);
	if (!updateStageCs) return null;
	return (
		<ScModal
			title='Update Stage'
			visible={visible}
			onCancel={handleCancel}
			width='50vw'
			closable
			maskClosable
			centered
			closeIcon={null}
			footer={[
				<ScButtonText type='text' key='back' onClick={handleCancel}>
					Cancel
				</ScButtonText>,
				<ScButtonPrimary
					htmlType='submit'
					key='submit'
					type='primary'
					size='large'
					margin='0 0 0 16px'
					onClick={() => {
						form
							.validateFields()
							.then(() => {
								handleOk(updateStageFormData);
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				>
					Update
				</ScButtonPrimary>
			]}
		>
			<Form
				form={form}
				layout='vertical'
				className='update-opportunity-stage-form'
				initialValues={updateStageFormData}
				onValuesChange={handleFormValueChange}
				onFinish={handleFinish}
			>
				<Row align='middle' justify='space-between'>
					<Col span={8}>
						<Form.Item name='status' label='Status' rules={formRules ? formRules.isopen : []}>
							<ScRadioGroup
								value={updateStageFormData.status}
								size='large'
								disabled={updateStageFormData.status === 'CLOSE' ? true : false}
							>
								{statusRadioOptions.map((radioOption) => (
									<>
										{updateStageFormData &&
										updateStageFormData.status === radioOption.toUpperCase() ? (
											<ScRadioButton active value={radioOption.toUpperCase()}>
												{radioOption}
											</ScRadioButton>
										) : (
											<ScRadioButton value={radioOption.toUpperCase()}>{radioOption}</ScRadioButton>
										)}
									</>
								))}
							</ScRadioGroup>
						</Form.Item>
					</Col>
					<Col span={8} offset={4}>
						<Form.Item name='stage' label='Stage' rules={formRules ? formRules.stage : []}>
							{stageDropdownOptions && (
								<ScSelect
									value={updateStageFormData.stage}
									disabled={updateStageFormData.status === 'CLOSE' ? true : false}
								>
									{stageDropdownOptions.map((option) => (
										<Option value={option.data_value}>{option.display_value}</Option>
									))}
								</ScSelect>
							)}
						</Form.Item>
					</Col>
					<Col span={3} offset={1}>
						<Form.Item name='probability' label='Probability'>
							<ScInput value={updateStageFormData.probability} disabled />
						</Form.Item>
					</Col>
				</Row>
				{updateStageFormData.status === 'CLOSE' ? (
					// updateStageFormData.stage === 'WON' ? (
					stageData.stage === 'WON' ? (
						<Row align='middle' justify='space-between'>
							<Col span={11}>
								<Form.Item
									name='closureAmount'
									label='Closure Amount'
									rules={formRules ? formRules.targetamount : []}
								>
									<ScInput
										addonBefore={preferredCurrencyDenotion}
										value={updateStageFormData.closureAmount}
									/>
								</Form.Item>
							</Col>
							<Col span={12} offset={1}>
								<Form.Item
									name='closureDate'
									label='Closure Date'
									rules={formRules ? formRules.duedate : []}
								>
									<ScDatePicker
										placeholder='DD/MM/YYYY'
										value={
											updateStageFormData.closureDate
												? moment(updateStageFormData.closureDate)
												: moment()
										}
										format='DD-MM-YYYY'
										disabledDate={(d) =>
											updateStageFormData.stage === 'WON'
												? !d || d.isAfter(new Date().setDate(new Date().getDate()))
												: null
										}
									/>
								</Form.Item>
							</Col>
						</Row>
					) : (
						<Row align='middle' justify='left'>
							<Col span={11}>
								<Form.Item
									name='reason'
									label='Reason'
									rules={formRules ? formRules.closereason : []}
								>
									<ScSelect className='close-reason-select' value={updateStageFormData.stage}>
										{updateStageCs[1] &&
											updateStageCs[1].CloseReason.dropDownValue.map((option) => (
												<Option value={option.dataValue}>{option.displayValue}</Option>
											))}
									</ScSelect>
								</Form.Item>
							</Col>
							<Col span={12} offset={1}>
								<Form.Item
									name='closureDate'
									label='Closure Date'
									rules={formRules ? formRules.duedate : []}
								>
									<ScDatePicker
										placeholder='DD/MM/YYYY'
										value={
											updateStageFormData.closureDate
												? moment(updateStageFormData.closureDate)
												: moment()
										}
										format='DD-MM-YYYY'
									/>
								</Form.Item>
							</Col>
						</Row>
					)
				) : null}
				<div className='remark-section'>
					<label htmlFor='remark'>Remark</label>
					<Form.Item name='remark' rules={formRules ? formRules.remark : []}>
						<ScTextArea rows={4} />
					</Form.Item>
				</div>
			</Form>
		</ScModal>
	);
};

const mapStateToProps = (state) => {
	return {
		controlStructure:
			(state &&
				state.opportunityCreation &&
				state.opportunityCreation.opportunityFullControlStructure) ||
			''
	};
};
const mapDispatchToProps = {
	getOpportunityAddCs
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityUpdateStageModal);

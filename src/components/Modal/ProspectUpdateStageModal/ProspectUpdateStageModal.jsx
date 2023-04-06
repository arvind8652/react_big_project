import React, { useState } from 'react';
import { ScModal, ScButtonPrimary, ScButtonText } from '../../StyledComponents/genericElements';
import { Select, Form, Row, Col } from 'antd';
import {
	ScDatePicker,
	ScInput,
	ScRadioButton,
	ScRadioGroup,
	ScSelect,
	ScTextArea
} from '../../StyledComponents/formElements';

import moment from 'moment';
//import { executeGetProspectCreateCs } from "../../redux/actions/prospectCreateActions";
import { connect } from 'react-redux';

const { Option } = Select;
const ProspectUpdateStageModal = (props) => {
	const { visible, handleOk, handleCancel, stageData } = props;
	const [form] = Form.useForm();
	const [stageDropdownOptions, setStageDropdownOptions] = useState();
	const [updateStageFormData, setUpdateStageFormData] = useState({
		records: stageData && stageData.recordId,
		status: (stageData && stageData.status && stageData.status.toUpperCase()) || 'OPEN',
		stage: stageData.stage || null,
		probability: null,
		preferredCurrency: null,
		closureAmount: null,
		closureDate: moment(),
		reason: '',
		remark: ''
	});

	const statusRadioOptions = ['Open', 'Close'];

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
				// initialValues={updateStageFormData}
				// onValuesChange={handleFormValueChange}
				// onFinish={handleFinish}
			>
				<Row align='middle' justify='space-between'>
					<Col span={8}>
						<Form.Item
							name='status'
							label='Status'
							//rules={formRules ? formRules.isopen : []}
						>
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
						<Form.Item
							name='stage'
							label='Stage'
							//rules={formRules ? formRules.stage : []}
						>
							{stageDropdownOptions && (
								<ScSelect
									value={updateStageFormData.stage}
									disabled={updateStageFormData.status === 'CLOSE' ? true : false}
								>
									{stageDropdownOptions.map((option) => (
										<Option value={option.dataValue}>{option.displayValue}</Option>
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
					updateStageFormData.stage === 'WON' ? (
						<Row align='middle' justify='space-between'>
							<Col span={11}>
								<Form.Item
									name='closureAmount'
									label='Closure Amount'
									//rules={formRules ? formRules.targetamount : []}
								>
									{/* <ScInput
                    addonBefore={preferredCurrencyDenotion}
                    value={updateStageFormData.closureAmount}
                  /> */}
								</Form.Item>
							</Col>
							<Col span={12} offset={1}>
								<Form.Item
									name='closureDate'
									label='Closure Date'
									//rules={formRules ? formRules.duedate : []}
								>
									<ScDatePicker
										placeholder='DD/MM/YYYY'
										// value={
										//   updateStageFormData.closureDate
										//     ? moment(updateStageFormData.closureDate)
										//     : moment()
										// }
										format='DD-MM-YYYY'
										// disabledDate={(d) =>
										//   updateStageFormData.stage === "WON"
										//     ? !d ||
										//       d.isAfter(new Date().setDate(new Date().getDate()))
										//     : null
										// }
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
									//rules={formRules ? formRules.closereason : []}
								>
									<ScSelect
										className='close-reason-select'
										//value={updateStageFormData.stage}
									>
										{/* {updateStageCs[1] &&
                      updateStageCs[1].CloseReason.dropDownValue.map(
                        (option) => (
                          <Option value={option.dataValue}>
                            {option.displayValue}
                          </Option>
                        )
                      )} */}
									</ScSelect>
								</Form.Item>
							</Col>
							<Col span={12} offset={1}>
								<Form.Item
									name='closureDate'
									label='Closure Date'
									//rules={formRules ? formRules.duedate : []}
								>
									<ScDatePicker
										placeholder='DD/MM/YYYY'
										// value={
										//   updateStageFormData.closureDate
										//     ? moment(updateStageFormData.closureDate)
										//     : moment()
										// }
										format='DD-MM-YYYY'
									/>
								</Form.Item>
							</Col>
						</Row>
					)
				) : null}
				<div className='remark-section'>
					<label htmlFor='remark'>Remark</label>
					<Form.Item
						name='remark'
						//rules={formRules ? formRules.remark : []}
					>
						<ScTextArea rows={4} />
					</Form.Item>
				</div>
			</Form>
		</ScModal>
	);
};

//export default ProspectUpdateStageModal
const mapStateToProps = (state, ownProps) => {
	return {
		user: state && state.auth && state.auth.user,
		cs: state.prospectCreate.controlStructure
	};
};
// const mapDispatchToProps = {
//   executeGetProspectCreateCs,
//   excecuteGetProspect360View,
// };

export default connect(
	mapStateToProps
	//mapDispatchToProps
)(ProspectUpdateStageModal);

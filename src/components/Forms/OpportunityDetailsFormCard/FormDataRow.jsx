import { Form, Input, InputNumber, Select, Row, Col, DatePicker } from 'antd';
import { CONSTANTS } from '../../../constants/constants';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { getOpportunityProbabilityApi } from '../../../api/opportunityCreateApi';
import NumberFormat from '../../../constants/NumberFormat';
import moment from 'moment';

const FormDataRow = ({ csObject, mode, rules, formData, form, authData, capStartDate }) => {
	const [probabilityDropdown, setProbabilityDropdown] = useState();

	useEffect(() => {
		getOpportunityProbabilityApi(formData.stage).then((res) => {
			setProbabilityDropdown(res.data);
			formData.probability = res.data;
			form.setFieldsValue({
				probability: res.data
			});
		});
	}, [formData.stage]);
	useEffect(() => {
		form.setFieldsValue({
			stage: '',
			probability: '',
			closeReason: ''
		});
		formData.probability = '';
		setProbabilityDropdown('');
		formData.stage = '';
		formData.closeReason = '';
	}, [formData.status]);

	function onFormatter(value) {
		let newval = value.replace(/\D/g, '');
		const formattedValue = newval.replace(/\$\s?|(,*)/g, '');
		return NumberFormat(authData, formattedValue);
	}

	useEffect(() => {
		if (formData?.targetAmount) {
			let newval = formData.targetAmount.toString().replace(/\D/g, '');
			formData.targetAmount = newval;
			form.setFieldsValue({
				targetAmount: newval
			});
		}
		if (formData?.opportunityType === 'OB') {
			formData.targetAmount = '';
			form.setFieldsValue({
				targetAmount: ''
			});
		}
	}, [formData?.targetAmount, formData?.opportunityType]);

	// const disabledPastDate = (curDate) => {
	//  if(user) {
	//   return  moment(user.curDate, 'YYYY-MM-DD') > curDate
	// } else {
	//    return false
	//  }

	// };

	const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);
	return (
		<>
			{formData.status === 'OPEN' ? (
				<Row gutter={16}>
					<Col className='gutter-row' span={5}>
						<Form.Item
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.stage}
								</div>
							}
							name='stage'
							rules={rules ? rules.stage : []}
						>
							<Select
								className='opp-filter-dropdown'
								size='large'
								mode='single'
								placeholder={CONSTANTS.placeholders.select}
								value={formData.stage}
								// onClick={() => {
								//   form.setFieldsValue({
								//     Probability: "",
								//   });
								//   formData.probability = "";
								// }}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								disabled={mode === 'edit' && csObject && csObject.Stage.isKeyColumn}
								showSearch
							>
								{csObject &&
									csObject.OpenStage &&
									csObject.OpenStage.dropDownValue &&
									csObject.OpenStage.dropDownValue.length > 0 &&
									csObject.OpenStage.dropDownValue.map((item, index) => (
										<Select.Option value={item.dataValue} key={index}>
											{item.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={3}>
						<Form.Item
							name='probability'
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.probability}
								</div>
							}
							rules={rules ? rules.probability : []}
						>
							<Input
								value={probabilityDropdown}
								className='opp-text'
								size='large'
								placeholder={probabilityDropdown}
								defaultValue={probabilityDropdown}
								disabled
							/>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='targetAmount'
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.targetAmount}
								</div>
							}
							//  rules={rules ? rules.targetamount : []}
							rules={rules && formData?.opportunityType !== 'OB' ? rules.targetamount : []}
						>
							<Row>
								<Col span={6}>
									<Form.Item
										name='preferredCurrency'
										// defaultValue={ csObject?.PreferredCurrency?.defaultvalue}
										//  rules={rules ? [rules.preferredcurrency] : []}
									>
										<Select
											size='large'
											mode='single'
											value={formData.preferredCurrency}
											// defaultValue={"PHP"}
											filterOption={(input, opt) => {
												return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
											}}
											disabled={
												(mode === 'edit' && csObject && csObject.PreferredCurrency.isKeyColumn) ||
												formData?.opportunityType === 'OB'
											}
											showSearch
											placeholder={CONSTANTS.placeholders.select}
										>
											{csObject &&
												csObject.PreferredCurrency &&
												csObject.PreferredCurrency.dropDownValue &&
												csObject.PreferredCurrency.dropDownValue.map((item, index) => (
													<Select.Option value={item.dataValue} key={index}>
														{item.dataValue}
													</Select.Option>
												))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={18}>
									<Form.Item
										name='targetAmount'
										type='number'
										// rules={rules && formData?.opportunityType!=="OB"? rules.targetamount : []}
										// rules={rules ? rules.targetamount : []}
									>
										{/* <Input
                      className="opp-input-field quantity"
                      placeholder={CONSTANTS.placeholders.enter}
                      type="number"
                      onKeyDown={(e) =>
                        symbolsArr.includes(e.key) && e.preventDefault()
                      }
                      disabled={
                        mode === "edit" &&
                        csObject &&
                        csObject.TargetAmount.isKeyColumn
                      }
                    /> */}
										<InputNumber
											style={{ width: '100%' }}
											className='opp-input-field quantity'
											placeholder={CONSTANTS.placeholders.enter}
											// formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											formatter={onFormatter}
											defaultValue={formData?.opportunityType ? '' : 0}
											parser={(value) => value.replace(/\D/g, '')}
											onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
											disabled={
												(mode === 'edit' && csObject && csObject.TargetAmount.isKeyColumn) ||
												formData?.opportunityType === 'OB'
											}
											maxLength={csObject?.TargetAmount?.fieldLength}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='expectedDate'
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.expectedDate}
								</div>
							}
							rules={rules ? rules.duedate : []}
						>
							<DatePicker
								value={formData?.expectedDate}
								style={{
									width: '100%',
									height: '44px'
								}}
								placeholder={CONSTANTS.placeholders.date}
								allowClear={false}
								// disabledDate={disabledPastDate}
								// defaultValue={formData?.expectedDate}

								format='DD-MM-YYYY'
								//   disabledDate={(d) =>
								//    { let customDate = "2021-12-07"
								//     moment(customDate).isBefore(new Date().setDate(new Date().getDate()))                }
								// }
								disabledDate={(d) => {
									return !d || capStartDate !== undefined
										? d.isBefore(capStartDate)
										: d.isBefore(new Date().setDate(new Date().getDate()));
									// d.isBefore(new Date().setDate(new Date().getDate()))
								}}
								disabled={mode === 'edit' && csObject && csObject.DueDate.isKeyColumn}
							/>
						</Form.Item>
					</Col>
				</Row>
			) : (
				<Row gutter={16}>
					<Col className='gutter-row' span={5}>
						<Form.Item
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.stage}
								</div>
							}
							name='stage'
							rules={rules ? rules.stage : []}
						>
							<Select
								className='opp-filter-dropdown'
								size='large'
								mode='single'
								placeholder={CONSTANTS.placeholders.select}
								value={formData.stage}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								disabled={mode === 'edit' && csObject && csObject.Stage.isKeyColumn}
								showSearch
							>
								{csObject &&
									csObject.CloseStage &&
									csObject.CloseStage.dropDownValue &&
									csObject.CloseStage.dropDownValue.length > 0 &&
									csObject.CloseStage.dropDownValue.map((item, index) => (
										<Select.Option value={item.dataValue} key={index}>
											{item.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					{formData.stage === 'WON' ? (
						<>
							<Col className='gutter-row' span={3}>
								<Form.Item
									name='probability'
									label={
										<div className='opp-text'>
											{CONSTANTS.opportunityCreate.opportunityDetails.probability}
										</div>
									}
									// rules={rules ? rules.probability : []}
								>
									<Input
										value={probabilityDropdown}
										className='opp-text'
										size='large'
										placeholder={probabilityDropdown}
										defaultValue={probabilityDropdown}
										disabled
									/>
								</Form.Item>
							</Col>
							<Col className='gutter-row' span={8}>
								<Form.Item
									name='closureAmount'
									label={
										<div className='opp-text'>
											{CONSTANTS.opportunityCreate.opportunityDetails.closureAmount}
										</div>
									}
									rules={rules ? rules.amount : []}
								>
									<Row>
										<Col span={6}>
											<Form.Item name='preferredCurrency'>
												<Select
													className='opp-filter-dropdown'
													size='large'
													mode='single'
													value={formData.preferredCurrency}
													filterOption={(input, opt) => {
														return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
													}}
													disabled={
														mode === 'edit' && csObject && csObject.PreferredCurrency.isKeyColumn
													}
													showSearch
													placeholder={CONSTANTS.placeholders.select}
												>
													{csObject &&
														csObject.PreferredCurrency &&
														csObject.PreferredCurrency.dropDownValue &&
														csObject.PreferredCurrency.dropDownValue.map((item, index) => (
															<Select.Option value={item.dataValue} key={index}>
																{item.dataValue}
															</Select.Option>
														))}
												</Select>
											</Form.Item>
										</Col>
										<Col span={16}>
											<Input
												className='opp-input-field quantity'
												type='number'
												disabled={mode === 'edit' && csObject && csObject.Amount.isKeyColumn}
											/>
										</Col>
									</Row>
								</Form.Item>
							</Col>
						</>
					) : (
						<>
							<Col className='gutter-row' span={3}>
								<Form.Item
									name='probability'
									label={
										<div className='opp-text'>
											{CONSTANTS.opportunityCreate.opportunityDetails.probability}
										</div>
									}
									// rules={rules ? rules.probability : []}
								>
									<Input
										value={probabilityDropdown}
										className='opportunity-input-field'
										size='large'
										placeholder={probabilityDropdown}
										defaultValue={probabilityDropdown}
										disabled
									/>
								</Form.Item>
							</Col>
							<Col className='gutter-row' span={8}>
								<Form.Item
									name='closeReason'
									label={<div className='opp-text'>Reason</div>}
									rules={rules ? rules.closereason : []}
								>
									<Select
										className='opp-filter-dropdown'
										size='large'
										mode='single'
										placeholder={CONSTANTS.placeholders.select}
										value={formData.closeReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										disabled={mode === 'edit' && csObject && csObject.CloseReason.isKeyColumn}
										showSearch
									>
										{csObject &&
											csObject.CloseReason &&
											csObject.CloseReason.dropDownValue &&
											csObject.CloseReason.dropDownValue.length > 0 &&
											csObject.CloseReason.dropDownValue.map((item, index) => (
												<Select.Option value={item.dataValue} key={index}>
													{item.displayValue}
												</Select.Option>
											))}
									</Select>
								</Form.Item>
							</Col>
						</>
					)}
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='closeDate'
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.closureDate}
								</div>
							}
							rules={rules ? rules.closedate : []}
						>
							<DatePicker
								value={formData.closeDate}
								style={{
									width: '100%',
									height: '44px'
								}}
								placeholder={CONSTANTS.placeholders.date}
								format='DD-MM-YYYY'
								disabledDate={(d) => !d || d.isAfter(new Date().setDate(new Date().getDate()))}
								disabled={mode === 'edit' && csObject && csObject.CloseDate.isKeyColumn}
							/>
						</Form.Item>
					</Col>
				</Row>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2
		// user: state && state.auth && state.auth.user,
	};
};
export default connect(mapStateToProps)(FormDataRow);

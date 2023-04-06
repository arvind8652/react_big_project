import { Form, Card, Input, Radio, Select, Row, Col, DatePicker } from 'antd';
import { CONSTANTS } from '../../../constants/constants';
import { connect } from 'react-redux';
import { getProdSerDependentDataApi, getStatusDependentDataApi } from '../../../api/commonApi';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { getOpportunityProbabilityApi } from '../../../api/opportunityCreateApi';
import FormDataRow from './FormDataRow';
import GenericCard from '../../GenericCard/GenericCard';

const OpportunityDetailsFormCard = ({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	mode,
	user
}) => {
	const [prodServDropdown, setProdServDropdown] = useState();
	const [statusDropdown, setStatusDropdown] = useState([]);
	const [probabilityDropdown, setProbabilityDropdown] = useState();
	const [capStartDate, setCapStartDate] = useState();
	const [loading, setLoading] = useState(true);
	const { TextArea } = Input;

	useEffect(() => {
		getProdSerDependentDataApi(formData.opportunityType)
			.then((res) => {
				res.data.returnColumn === 'product_id' && setProdServDropdown(res.data.lookUpValues);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [formData.opportunityType]);

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
		getStatusDependentDataApi(formData.status)
			.then((res) => {
				// res.data.returnColumn === "data_value" &&
				setStatusDropdown(res.data.lookUpValues);
				res.data.lookUpValues && setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [formData.status]);

	useEffect(() => {
		form.setFieldsValue({
			stage: '',
			probability: '',
			// targetAmount: "",
			// preferredCurrency: "",
			closeReason: ''
		});
		formData.probability = '';
		setProbabilityDropdown('');
		formData.stage = '';
		// formData.targetAmount = "";
		// formData.preferredCurrency = "";
		formData.closeReason = '';
	}, [formData.status]);

	const disablefutureDate = (curDate) => {
		if (user) {
			return moment(user.curDate, 'YYYY-MM-DD') < curDate;
		} else {
			return false;
		}
	};
	const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);
	return (
		<GenericCard
			header='Opportunity Details'
			menuFlag={0}
			loading={loading}
			className='opp-det-card-type'
		>
			<Form
				className='opp-det-form'
				layout='vertical'
				initialValues={formData}
				form={form}
				onValuesChange={onValuesChange}
			>
				<Row gutter={16}>
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='opportunityName'
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.opportunityName}
								</div>
							}
							rules={rules ? rules.opportunityname : []}
						>
							<Input
								className='opp-input-field'
								type='text'
								// disabled={
								//   mode === "edit" &&
								//   csObject &&
								//   csObject.OpportunityName.isKeyColumn
								// }
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={8}>
						<Form.Item
							label={<div className='opp-text'>Opportunity Type</div>}
							name='opportunityType'
							rules={rules ? rules.opportunitytype : []}
						>
							<Select
								className='opp-select'
								placeholder={CONSTANTS.placeholders.select}
								size='large'
								mode='single'
								value={formData.opportunityType}
								// disabled={
								//   mode === "edit" &&
								//   csObject &&
								//   csObject.OpportunityType.isKeyColumn
								// }
								onClick={() => {
									form.setFieldsValue({
										ProductOrService: ''
									});
									formData.productOrService = '';
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{csObject &&
									csObject.OpportunityType &&
									csObject.OpportunityType.dropDownValue.length > 0 &&
									csObject.OpportunityType.dropDownValue.map((item, index) => (
										<Select.Option value={item.dataValue} key={index}>
											{item.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={8}>
						<Form.Item
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.productOrService}
								</div>
							}
							name='productOrService'
							rules={rules ? rules.product : []}
						>
							<Select
								className='opp-filter-dropdown'
								placeholder={CONSTANTS.placeholders.select}
								size='large'
								// disabled={
								//   !formData.opportunityType ||
								//   (mode === "edit" &&
								//     csObject &&
								//     csObject.Product &&
								//     csObject.Product.isKeyColumn)
								// }
								mode='single'
								value={formData.productOrServiceType}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{prodServDropdown &&
									prodServDropdown.map((item) => (
										<Select.Option key={item.product_id} value={item.product_id}>
											{item.name}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={16} className='gutter-row'>
						<Form.Item
							//   name="isOpen"
							name='status'
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.status}
								</div>
							}
							rules={rules ? rules.isopen : []}
						>
							<Radio.Group
								defaultvalue='OPEN'
								value={formData.status}
								disabled={mode === 'edit' && csObject && csObject.isOpen.isKeyColumn}
							>
								<Radio.Button
									value='OPEN'
									className={`opp-radio-field ${formData.status === 'OPEN' && 'active'}`}
								>
									{CONSTANTS.opportunityCreate.opportunityDetails.open}
								</Radio.Button>
								<Radio.Button
									value='CLOSE'
									className={`opp-radio-field ${formData.status === 'CLOSE' && 'active'}`}
								>
									{CONSTANTS.opportunityCreate.opportunityDetails.close}
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Col>
					<Col span={8} className='gutter-row'>
						<Form.Item
							name='startDate'
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.startDate}
								</div>
							}
							rules={rules ? rules.creationdate : []}
						>
							<DatePicker
								placeholder={CONSTANTS.placeholders.date}
								// placeholder={"select Date"}
								value={formData.startDate}
								style={{
									width: '100%',
									height: '44px'
								}}
								size='large'
								format='DD-MM-YYYY'
								// disabledDate={disablefutureDate}
								onChange={(e) => setCapStartDate(new Date(e))}
								disabledDate={(d) => d.isAfter(new Date().setDate(new Date().getDate()))}
								disabled={mode === 'edit' && csObject && csObject.StartDate.isKeyColumn}
							/>
						</Form.Item>
					</Col>
				</Row>
				<FormDataRow
					csObject={csObject}
					mode={mode}
					rules={rules}
					formData={formData}
					form={form}
					capStartDate={capStartDate}
				/>
				<Row gutter={16}>
					<Col className='gutter-row' span={16}>
						<Form.Item
							name='remark'
							label={
								<div className='opp-text'>
									{CONSTANTS.opportunityCreate.opportunityDetails.remarks}
								</div>
							}
							rules={rules ? rules.remark : []}
						>
							<TextArea
								rows={4}
								className='text-area-field'
								disabled={mode === 'edit' && csObject && csObject.Remark.isKeyColumn}
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</GenericCard>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state && state.auth && state.auth.user
	};
};
export default connect(mapStateToProps)(OpportunityDetailsFormCard);

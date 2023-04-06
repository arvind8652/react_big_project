import { Form, Button, Card, Select, Radio, Row, Col, Typography, Space } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import './interactionCreate.scss';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
	getDependentProspectClientDataApi,
	getDependentOppNameDataApi
} from '../../../src/api/commonApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
const { Option } = Select;
const { Text } = Typography;

const ClientProspectDetailsForm2 = (props) => {
	const [nameDropdown, setNameDropdown] = useState([]);
	const location = useLocation();
	let screen;
	// let mode;
	if (location && location?.state) {
		screen = location?.state?.screen;
		// data = location?.state?.data;
		// mode = location?.state?.mode;
	}
	const [loading, setLoading] = useState(true);
	const [oppNameDropdown, setOppNameDropdown] = useState([]);
	const [userType, setUserType] = useState('PROSPECTADD');
	// props.form.setFieldsValue(props.ExistingData);

	props.form.setFieldsValue(props.formData);
	useEffect(() => {
		getDependentProspectClientDataApi(props.formData.refType)
			.then((res) => {
				res.data.returnColumn === 'CustomerID' &&
					setNameDropdown(res && res.data && res.data.lookUpValues);
				if (screen !== 'list' || props.mode !== 'create') {
					// if (screen !== "list" || mode !== "create") {
					res.data.lookUpValues && setLoading(false);
				}
			})
			.catch((err) => {});
	}, [props.formData.refType]);

	// useEffect(() => {
	//   if (props.mode === "edit") {
	//     setNameDropdown([
	//       {
	//         CustomerID: props.data.taskScheduler.refID,
	//         Name: props.data.taskScheduler.clientProspectName,
	//       },
	//     ]);
	//   }
	// }, [props.data]);

	useEffect(() => {
		if (props.formData && props.formData.refID) {
			props.onValuesChange({
				relationshipManager:
					nameDropdown.length !== 0 && props.formData?.refID
						? nameDropdown.filter((item) => item.CustomerID === props.formData.refID.value)[0]
								?.RelationshipManager
						: undefined
			});
		}
		if ((screen === 'list' || screen === 'view') && props.mode === 'create') {
			// if ((screen === "list" || screen === "view") && mode === "create")
			props.onValuesChange({
				relationshipManager:
					nameDropdown.length !== 0 && props.formData?.refID
						? nameDropdown.filter((item) => item.CustomerID === props.formData.refID.key)[0]
								?.RelationshipManager
						: undefined
			});
			props.formData.refID.key && props.formData.relationshipManager && setLoading(false);
		}
	}, [props.formData.refID]);

	useEffect(() => {
		if (screen !== 'prospect-view') {
			props.onValuesChange({
				branch:
					nameDropdown.length !== 0 && props.formData?.refID
						? nameDropdown.filter(
								// (item) => item.CustomerID === props.formData.refID.key
								(item) =>
									item.CustomerID === props.formData.refID.value ||
									item.CustomerID === props.formData.refID
						  )[0]?.branch
						: undefined
			});
		}

		if ((screen === 'list' || screen === 'view') && props.mode === 'create') {
			// if ((screen === "list" || screen === "view") && mode === "create")
			props.onValuesChange({
				branch:
					nameDropdown.length !== 0 && props.formData?.refID
						? nameDropdown.filter(
								(item) =>
									item.CustomerID === props.formData.refID.key ||
									item.CustomerID === props.formData.refID
						  )[0]?.branch
						: undefined
			});
		}
	}, [props.formData.relationshipManager]);

	useEffect(() => {
		if (props?.formData?.screenName === 'oppo-list') {
			props.onValuesChange({
				branch:
					nameDropdown.length !== 0 && props.formData?.refID
						? nameDropdown.filter((item) => item.CustomerID === props.formData.refID.key)[0]?.branch
						: undefined,
				screenName: ''
			});
		}
	}, [nameDropdown]);

	useEffect(() => {
		props.onValuesChange({
			refID: '',
			relationshipManager: '',
			branch: '',
			targetAmount: '',
			preferredCurrency: '',
			opportunityName: ''
		});
		props.form.setFieldsValue({
			refID: '',
			relationshipManager: '',
			branch: '',
			opportunityName: ''
		});
	}, [props.formData.refType]);

	const updateEditData = () => {
		if (props.ExistingData) {
			props.onValuesChange({ ['refType']: props.ExistingData.refType });
			props.onValuesChange({ ['refID']: props.ExistingData.refID });
			props.onValuesChange({
				['opportunityName']: props.ExistingData.opportunityName
			});
			props.onValuesChange({
				['relationshipManager']: props.ExistingData.relationshipManager
			});
			props.onValuesChange({ ['branch']: props.ExistingData.branch });
		}
	};

	useEffect(() => {
		getDependentOppNameDataApi(props.formData.refType, props.formData.refID?.value)
			// getDependentOppNameDataApi(props.formData.refType, props.formData.refID)
			.then((res) => {
				res.data.returnColumn === 'opportunityid' && setOppNameDropdown(res.data.lookUpValues);
			})
			.catch((err) => {});
		updateEditData();
	}, [props.formData.refType, props.formData.refID]);

	const handleOnValuesChange = (key, value) => {
		props.onValuesChange({ [key]: value });
	};

	return (
		<Form
			className='clientProspect-form'
			form={props.form}
			loading={loading}
			layout='vertical'
			initialValues={props.formData}
			onValuesChange={props.onValuesChange}
		>
			<Card className='interaction-card-type' title='Client / Prospect Details'>
				<Row gutter={16}>
					{/* Select Section Starts */}
					<Col className='gutter-row' span={24}>
						<Form.Item
							label={<div className='interaction-text'>Select</div>}
							name='refType'
							validateTrigger={['onChange', 'onBlur']}
							rules={props.rules ? props.rules.reftype : []}
						>
							<Radio.Group
								size='large'
								value={props.formData.refType}
								// onChange={clearValues}
								onChange={(e) => handleOnValuesChange('refType', e.target.value)}
								onClick={() => {
									props.form.setFieldsValue({
										RefID: '',
										RelationshipManager: '',
										Branch: ''
									});
									props.formData.refID = '';
									props.formData.relationshipManager = '';
									props.formData.branch = '';
								}}
								disabled={
									(props.mode === 'edit' && props.csObject && props.csObject.RefID.isRequired) ||
									(props.formData.screenName === 'interaction-list' &&
										props.csObject &&
										props.csObject.RefID.isRequired)
								}
							>
								<Radio.Button
									value='PROSPECTADD'
									className={`interaction-radio-field ${
										props.formData.refType === 'PROSPECTADD' && 'active'
									}`}
								>
									Prospect
								</Radio.Button>
								<Radio.Button
									value='CLIENTADD'
									className={`interaction-radio-field ${
										props.formData.refType === 'CLIENTADD' && 'active'
									}`}
								>
									Client
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Col>
					{/* Select Section Ends */}

					{/* Name Section Starts */}
					<Col span={8} className='gutter-row'>
						<Form.Item
							label={<div className='interaction-text'>Name</div>}
							name='refID'
							rules={props.rules ? props.rules.refid : []}
							required
						>
							<Select
								labelInValue
								onChange={(value) => {
									handleOnValuesChange('refID', value);
								}}
								size='large'
								className='interaction-filter-dropdown name-input'
								placeholder='Search by name'
								optionFilterProp='children'
								value={props.formData.refID}
								disabled={
									(props.mode === 'edit' && props.csObject && props.csObject.RefID.isRequired) ||
									(props.formData.screenName === 'interaction-list' &&
										props.csObject &&
										props.csObject.RefID.isRequired)
								}
								// defaultValue={setDefaultName('refID')}
								defaultValue={props.formData.refID ? props.formData.refID : ''}
								suffixIcon={<UserAddOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
								// filterOption={(input, option) => {
								// 	const filterWith = ['Name', 'Mobile', 'Email', 'Address', 'City'];
								// 	nameDropdown.map((item) =>
								// 		item.Name
								// 			? filterWith.concat('Name')
								// 			: item.CustomerID
								// 			? filterWith.concat('CustomerID')
								// 			: filterWith.concat('Mobile')
								// 	);

								// 	return Object.keys(nameDropdown[option.value])
								// 		.filter((i) => filterWith && filterWith.includes(i))
								// 		.find((key) => {
								// 			return typeof nameDropdown[option.value][key] === 'string'
								// 				? nameDropdown[option.value][key]
								// 						.toLowerCase()
								// 						.includes(input.toLowerCase())
								// 				: nameDropdown[option.value][key].includes(input.toLowerCase());
								// 		});
								// }}
								filterOption={(input, option) => {
									const filterWith = ['Name', 'Mobile', 'Email'];
									return Object.keys(nameDropdown[option.key])
										.filter((i) => filterWith && filterWith.includes(i))
										.find((key) => {
											// (typeof(nameDropdown[option.key][key])==="string")
											return typeof nameDropdown[option.key][key] === 'string'
												? nameDropdown[option.key][key].toLowerCase().includes(input.toLowerCase())
												: nameDropdown[option.key][key].includes(input.toLowerCase());
										});
								}}
								showSearch
							>
								{nameDropdown &&
									nameDropdown.map((item, index) => (
										<Option
											value={item.CustomerID}
											// key={item.CustomerID}
											key={index}
											style={{ padding: '10px' }}
										>
											<Row>
												<Col span={4}>
													<AvatarLogo
														// imgsrc={item.FileString}
														profileName={item.ProfileInitial}
														avatarSize={AvatarSize.extrasmall}
														// style={{
														//   color: "#f56a00",
														//   backgroundColor: "#fde3cf",
														// }}
													/>
												</Col>
												<Col span={14} style={{ padding: '0 5px' }}>
													<Space direction='vertical' size={-1}>
														<Text>{item.Name}</Text>
														<Text style={{ color: '#5D6DD1', fontSize: '13px' }}>
															<FontAwesomeIcon
																icon={faMapMarkerAlt}
																style={{
																	marginRight: '2px'
																}}
															/>
															{item.Address}
														</Text>
													</Space>
												</Col>
												<Col span={6} style={{ textAlign: 'right' }}>
													<Text style={{ color: '#2C2D33', fontSize: '13px' }}>{item.City}</Text>
												</Col>
											</Row>
										</Option>
									))}
								{/* {nameDropdown &&
									nameDropdown.map((item, index) => (
										<Option value={item.CustomerID} key={index}>
											{item.Name}
										</Option>
									))} */}
							</Select>
						</Form.Item>
					</Col>
					{/* Name Section Ends */}

					{/* Opportunity Section Starts */}
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='opportunityName'
							label={<div className='interaction-text'>Opportunity</div>}
							rules={props.rules ? props.rules.opportunityname : []}
						>
							<Select
								onChange={(value) => handleOnValuesChange('opportunityName', value)}
								mode='single'
								placeholder='Select Option'
								value={props.formData.opportunityName}
								disabled={
									props.mode === 'edit' ||
									props?.existingInteractionData?.hasOwnProperty('opportunityName')
										? true
										: false ||
										  (props.formData.screenName === 'interaction-list' &&
												props.csObject &&
												props.csObject.RefID.isRequired)
								}
								size='large'
								style={{
									width: '100%'
								}}
								// defaultValue={props.formData.opportunityName}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								// disabled={
								// 	props.mode === 'edit' && props.csObject && props.csObject.RefID.isRequired
								// }
								showSearch
							>
								{oppNameDropdown &&
									oppNameDropdown.map((item, index) => (
										<Select.Option value={item.OPPORTUNITYID} key={index}>
											{item.opportunityname}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					{/* Opportunity Section Ends */}

					{/* Select Existing Inetraction Section Starts */}
					<Col className='gutter-row' span={8}>
						<Button type='link' onClick={() => props.setShowExistingInteractionModal(true)}>
							<u className='interaction-text'>Select Existing Interaction</u>
						</Button>
					</Col>
					{/* Select Existing Inetraction Section Ends */}

					{/* Relationship Manager Section Starts */}
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='relationshipManager'
							label={<div className='interaction-text'>Relationship Manager</div>}
							rules={props.rules ? props.rules.relationshipmanager : []}
							// defaultValue={(props.formData.refID===props.csObject &&
							//     props.csObject.CustomerID)?props.csObject && props.csObject.RelationshipManager &&
							//     props.csObject.RelationshipManager.lookupValue &&
							//     props.csObject.RelationshipManager.lookupValue.lookUpValues : undefined}
						>
							<Select
								className='opportunity-filter-dropdown'
								size='large'
								mode='single'
								placeholder='Select Option'
								value={props.formData.relationshipManager}
								defaultValue={
									props.formData.relationshipManager ? props.formData.relationshipManager : ''
								}
								disabled={
									props.formData.refID ||
									(props.mode === 'edit' && props.csObject && props.csObject.RefID.isRequired)
								}
								onChange={(value) => handleOnValuesChange('relationshipManager', value)}
								//   defaultValue={
								//     props.csObject &&
								//     props.csObject.RelationshipManager &&
								//     props.csObject.RelationshipManager.lookupValue &&
								//     props.csObject.RelationshipManager.lookupValue
								//       .lookUpValues &&
								//     props.csObject.RelationshipManager.lookupValue.lookUpValues
								//   }
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								// disabled={

								// }
								showSearch
							>
								{props.csObject &&
									props.csObject.RelationshipManager &&
									props.csObject.RelationshipManager.lookupValue &&
									props.csObject.RelationshipManager.lookupValue.lookUpValues &&
									props.csObject.RelationshipManager.lookupValue.lookUpValues.map((item, index) => (
										<Option value={item.ID} key={index}>
											{item.Name}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					{/* Relationship Manager Section Ends */}

					{/* Branch Section Starts */}
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='branch'
							label={<div className='interaction-text'>Office</div>}
							rules={props.rules ? props.rules.branch : []}
						>
							<Select
								className='opportunity-filter-dropdown'
								dropdownClassName='dropdown-style'
								size='large'
								mode='single'
								placeholder='Select Option'
								value={props.formData.branch}
								defaultValue={props.formData.branch ? props.formData.branch : ''}
								disabled={
									props.formData.refID ||
									(props.mode === 'edit' && props.csObject && props.csObject.RefID.isRequired)
								}
								onChange={(value) => handleOnValuesChange('branch', value)}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								// disabled={

								// }
								showSearch
							>
								{props.csObject &&
									props.csObject.Branch &&
									props.csObject.Branch.lookupValue &&
									props.csObject.Branch.lookupValue.lookUpValues &&
									props.csObject.Branch.lookupValue.lookUpValues.map((item, index) => (
										<Option value={item.Unit_Hierarchy} key={index}>
											{item.NAME}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					{/* Branch Section Ends */}
				</Row>
			</Card>
		</Form>
	);
};

export default ClientProspectDetailsForm2;

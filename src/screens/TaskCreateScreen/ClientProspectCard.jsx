import { Form, Card, Select, Radio, Row, Col, Typography, Space } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { CONSTANTS } from '../../constants/constants';
import { getDependentTaskNameDataApi, getDependentOppListDataApi } from '../../api/commonApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import './TaskCreateScreen.scss';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
const { Text } = Typography;

const ClientProspectCard = ({
	form,
	editData,
	formData,
	onValuesChange,
	rules,
	csObject,
	mode,
	screen
}) => {
	const [nameDropdown, setNameDropdown] = useState([]);
	const [opportunityDropdown, setOpportunityDropdown] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getDependentTaskNameDataApi(formData.prospectType)
			.then((res) => {
				res.data.returnColumn === 'CustomerID' &&
					setNameDropdown(res && res.data && res.data.lookUpValues);
				if (screen !== 'list' || mode !== 'create') {
					res.data.lookUpValues && setLoading(false);
				}
			})
			.catch((err) => {
				// console.log(err);
			});
	}, [formData.prospectType]);

	useEffect(() => {
		if (formData.prospectType && formData.refID) {
			getDependentOppListDataApi(formData.prospectType, formData.refID)
				.then((res) => {
					setOpportunityDropdown(res.data.lookUpValues);
					if (screen !== 'list' || mode !== 'create') {
						res.data.lookUpValues && setLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [formData.prospectType, formData.refID, mode, screen]);

	useEffect(() => {
		// if (formData && formData.refID) {
		//   onValuesChange({
		//     relationshipManager:
		//       nameDropdown &&
		//       nameDropdown.filter(
		//         (item) => item.CustomerID === formData.refID
		//       )[0] &&
		//       nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
		//         .RelationshipManager,
		//   });
		// }
		if (formData && formData.refID) {
			onValuesChange({
				relationshipManager:
					nameDropdown.length !== 0 && formData?.refID
						? nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
								?.RelationshipManager
						: undefined
			});
		}
		if ((screen === 'list' || screen === 'task-list') && mode === 'create') {
			// formData.relationshipManager =
			//   nameDropdown &&
			//   nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
			//   nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
			//     .RelationshipManager;
			// formData.relationshipManager && setLoading(false);
			///----------------------------
			//   {
			//   onValuesChange({
			//     relationshipManager:
			//       nameDropdown &&
			//       nameDropdown.filter(
			//         (item) => item.CustomerID === formData.refID
			//       )[0] &&
			//       nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
			//         .RelationshipManager,
			//   });
			//   formData.refID && formData.relationshipManager && setLoading(false);
			// }
			onValuesChange({
				relationshipManager:
					nameDropdown.length !== 0 && formData?.refID
						? nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
								?.RelationshipManager
						: undefined
			});
			formData.refID && formData.relationshipManager && setLoading(false);
		}
	}, [formData.refID]);

	useEffect(() => {
		// onValuesChange({
		//   branch:
		//     nameDropdown &&
		//     nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
		//     nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
		//       .branch,
		// });
		onValuesChange({
			branch:
				nameDropdown.length !== 0 && formData?.refID
					? nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]?.branch
					: undefined
		});
		if ((screen === 'list' || screen === 'task-list') && mode === 'create') {
			// onValuesChange({
			//   branch:
			//     nameDropdown &&
			//     nameDropdown.filter(
			//       (item) => item.CustomerID === formData.refID
			//     )[0] &&
			//     nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
			//       .branch,
			// });
			onValuesChange({
				branch:
					nameDropdown.length !== 0 && formData?.refID
						? nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]?.branch
						: undefined
			});
		}
	}, [formData.relationshipManager]);

	useEffect(() => {
		onValuesChange({
			preferredCurrency:
				nameDropdown &&
				nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
				nameDropdown.filter((item) => item.CustomerID === formData.refID)[0].Currency
		});
	}, [formData.branch]);
	useEffect(() => {
		onValuesChange({
			refID: '',
			relationshipManager: '',
			branch: '',
			targetAmount: '',
			preferredCurrency: ''
		});
		form.setFieldsValue({
			refID: '',
			relationshipManager: '',
			branch: '',
			targetAmount: '',
			preferredCurrency: ''
		});
	}, [formData.prospectType]);

	const handleOnValuesChange = (key, value) => {
		onValuesChange({ [key]: value });
	};

	return (
		<Card className='prospect-type-card-type' title='Client / Prospect Details' loading={loading}>
			<Form
				className='refType-form'
				layout='vertical'
				initialValues={formData}
				loading={loading}
				form={form}
				onValuesChange={onValuesChange}
			>
				<Row gutter={16}>
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='prospectType'
							label={<div className='task-text'>Select</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.reftype : []}
						>
							<Radio.Group
								value={formData.prospectType}
								onChange={(e) => handleOnValuesChange('prospectType', e.target.value)}
								// onClick={() => {
								// 	form.setFieldsValue({
								// 		RefID: '',
								// 		RelationshipManager: '',
								// 		Branch: ''
								// 	});
								// 	formData.refID = '';
								// 	formData.relationshipManager = '';
								// 	formData.branch = '';
								// }}
								size='large'
								style={{ width: '100%' }}
								// disabled={mode === "edit" && csObject && csObject.RefType.isKeyColumn}
								disabled={
									mode === 'edit'
										? true
										: false ||
										  (formData.screenName === 'task-list' && csObject && csObject.RefID.isRequired)
								}
							>
								<Radio.Button
									value='PROSPECTADD'
									className={`opp-radio-field ${
										formData.prospectType === 'PROSPECTADD' && 'active'
									}`}
								>
									Prospect
								</Radio.Button>
								<Radio.Button
									value='CLIENTADD'
									className={`opp-radio-field ${formData.prospectType === 'CLIENTADD' && 'active'}`}
								>
									Client
								</Radio.Button>
								<Radio.Button
									value='INTERNALADD'
									className={`opp-radio-field ${
										formData.prospectType === 'INTERNALADD' && 'active'
									}`}
								>
									Internal
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={24}>
					{formData.prospectType !== 'INTERNALADD' && (
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='refID'
								label={<div className='opp-text'>{CONSTANTS.taskCreate.name}</div>}
								rules={rules ? rules.refid : []}
							>
								<Select
									size='large'
									className='interaction-filter-dropdown name-input'
									placeholder='Search by name'
									optionFilterProp='children'
									value={formData.refID}
									onChange={(value) => handleOnValuesChange('refID', value)}
									defaultValue={formData.refID ? formData.refID : ''}
									suffixIcon={<UserAddOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
									filterOption={(input, option) => {
										const filterWith = ['Name', 'Mobile', 'Email'];
										return Object.keys(nameDropdown[option.key])
											.filter((i) => filterWith && filterWith.includes(i))
											.find((key) => {
												// (typeof(nameDropdown[option.key][key])==="string")
												return typeof nameDropdown[option.key][key] === 'string'
													? nameDropdown[option.key][key]
															.toLowerCase()
															.includes(input.toLowerCase())
													: nameDropdown[option.key][key].includes(input.toLowerCase());
											});
									}}
									// disabled={mode === "edit" && csObject && csObject.RefID.isKeyColumn}
									disabled={
										mode === 'edit'
											? true
											: false ||
											  (formData.screenName === 'task-list' &&
													csObject &&
													csObject.RefID.isRequired)
									}
									showSearch
								>
									{nameDropdown &&
										nameDropdown.map((item, index) => (
											<Select.Option
												value={item.CustomerID}
												key={index}
												style={{ padding: '10px' }}
											>
												<Row>
													<Col span={4}>
														<div>
															<AvatarLogo
																imgsrc={item.profileImage}
																profileName={item.ProfileInitial}
																avatarSize={AvatarSize.extrasmall}
															/>
															{/* <Avatar
                                size={50}
                                className="avatar"
                                style={{
                                  color: "#f56a00",
                                  backgroundColor: "#fde3cf",
                                }}
                                icon={
                                  item.FileString === null ||
                                  item.FileString === "" ? (
                                    <ScAvatarProfileInitialText>
                                      {item.ProfileInitial}
                                    </ScAvatarProfileInitialText>
                                  ) : (
                                    <img
                                      src={`data:image/jpeg;base64,${item.FileString}`}
                                      alt="img"
                                    />
                                  )
                                }
                              /> */}
														</div>
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
											</Select.Option>
										))}
								</Select>
							</Form.Item>
						</Col>
					)}
					{formData.prospectType !== 'INTERNALADD' && (
						<Col span={8} className='gutter-row'>
							<Form.Item
								name='opportunityName'
								label={<div className='opp-text'>{CONSTANTS.taskCreate.opportunity}</div>}
							>
								<Select
									className='opportunity-filter-dropdown'
									size='large'
									mode='single'
									placeholder='Select Option'
									onChange={(value) => handleOnValuesChange('opportunityName', value)}
									value={formData.opportunityName}
									// disabled={!formData.refID}
									disabled={
										mode === 'edit'
											? true
											: false ||
											  (formData.screenName === 'task-list' &&
													csObject &&
													csObject.RefID.isRequired)
									}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
								>
									{opportunityDropdown &&
										opportunityDropdown.map((item, index) => (
											<Select.Option value={item.OPPORTUNITYID} key={index}>
												{item.opportunityname}
											</Select.Option>
										))}
								</Select>
							</Form.Item>
						</Col>
					)}
					{formData.prospectType !== 'INTERNALADD' && <Col span={8} className='gutter-row'></Col>}
					<Col span={8} className='gutter-row'>
						<Form.Item
							name='relationshipManager'
							label={<div className='opp-text'>{CONSTANTS.taskCreate.relationshipManager}</div>}
							rules={rules ? rules.relationshipmanager : []}
							hidden={formData.prospectType === 'INTERNALADD' ? true : false}
							required
						>
							<Select
								className='opp-filter-dropdown'
								size='large'
								mode='single'
								placeholder='Select Option'
								value={formData.relationshipManager}
								defaultValue={formData.relationshipManager ? formData.relationshipManager : ''}
								onChange={(value) => handleOnValuesChange('relationshipManager', value)}
								// disabled={(formData.refID || !formData.refID) && formData.prospectType !== "INTERNALADD"}
								// disabled={mode === "edit" ? true : false}
								disabled={true}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{csObject &&
									csObject.RelationshipManager &&
									csObject.RelationshipManager.lookupValue &&
									csObject.RelationshipManager.lookupValue.lookUpValues &&
									csObject.RelationshipManager.lookupValue.lookUpValues.map((item, index) => (
										<Select.Option value={item.ID} key={index}>
											{item.Name}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8} className='gutter-row'>
						<Form.Item
							name='branch'
							label={
								// <div className="opp-text">{CONSTANTS.taskCreate.branch}</div>
								<div className='opp-text'>Office</div>
							}
							rules={rules ? rules.branch : []}
							hidden={formData.prospectType === 'INTERNALADD' ? true : false}
							required
						>
							<Select
								className='opportunity-filter-dropdown'
								size='large'
								mode='single'
								placeholder='Select Option'
								value={formData.branch}
								onChange={(value) => handleOnValuesChange('branch', value)}
								defaultValue={formData.branch ? formData.branch : ''}
								// disabled={(formData.refID || !formData.refID) && formData.prospectType !== "INTERNALADD"}
								// disabled={mode === "edit" ? true : false}
								disabled={true}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{csObject &&
									csObject.Branch &&
									csObject.Branch.lookupValue &&
									csObject.Branch.lookupValue.lookUpValues &&
									csObject.Branch.lookupValue.lookUpValues.map((item, index) => (
										<Select.Option value={item.Unit_Hierarchy} key={index}>
											{item.NAME}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8} className='gutter-row'></Col>
				</Row>
			</Form>
		</Card>
	);
};

export default ClientProspectCard;

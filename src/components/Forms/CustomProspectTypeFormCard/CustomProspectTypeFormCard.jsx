import { Form, Card, Select, Radio, Row, Col, Typography, Space } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { CONSTANTS } from '../../../constants/constants';
import { getDependentNameDataApi } from '../../../api/commonApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { ScAvatarProfileInitialText } from '../../StyledComponents/genericElements';
import { AvatarSize } from '../../../constants/AvatarSize';
import AvatarLogo from '../../Avatar/AvatarLogo';
// import Paragraph from "antd/lib/skeleton/Paragraph";
const { Paragraph, Text } = Typography;

const CustomProspectTypeFormCard = ({
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
	const [loading, setLoading] = useState(true);
	const [ellipsis, setEllipsis] = useState(true);
	useEffect(() => {
		getDependentNameDataApi(formData.prospectType, 'opportunity')
			.then((res) => {
				res.data.returnColumn === 'CustomerID' && setNameDropdown(res.data.lookUpValues);
				if (screen !== 'list' || mode !== 'create') {
					res.data.lookUpValues && setLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});

		onValuesChange({
			preferredCurrency: 'PHP'
		});
	}, [formData.prospectType]);

	useEffect(() => {
		if (formData && formData.refID) {
			onValuesChange({
				relationshipManager:
					nameDropdown &&
					nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
					nameDropdown.filter((item) => item.CustomerID === formData.refID)[0].RelationshipManager
			});
			// need to uncomment, when currency is changed to string(Do not remove)
			// let newCurrency = nameDropdown &&
			// nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
			// nameDropdown.filter((item) => item.CustomerID === formData.refID)[0].Currency
			// if(newCurrency === ""){
			//  onValuesChange({
			//    preferredCurrency:'PHP'
			//  });
			// }else{
			//  onValuesChange({
			//    preferredCurrency:newCurrency
			//  });
			// }
		}
		if ((screen === 'list' || screen === 'view') && mode === 'create') {
			// if (screen === "view" && mode === "create") {
			// formData.relationshipManager =
			//   nameDropdown &&
			//   nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
			//   nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
			//     .RelationshipManager;
			// formData.relationshipManager && setLoading(false);
			onValuesChange({
				relationshipManager:
					nameDropdown &&
					nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
					nameDropdown.filter((item) => item.CustomerID === formData.refID)[0].RelationshipManager
			});
			let newCurrency =
				nameDropdown &&
				nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
				nameDropdown.filter((item) => item.CustomerID === formData.refID)[0].Currency;
			if (newCurrency === '') {
				onValuesChange({
					preferredCurrency: 'PHP'
				});
			} else {
				onValuesChange({
					preferredCurrency: newCurrency
				});
			}
			formData.refID && formData.relationshipManager && setLoading(false);
		}
	}, [formData.refID]);
	useEffect(() => {
		onValuesChange({
			branch:
				nameDropdown &&
				nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
				nameDropdown.filter((item) => item.CustomerID === formData.refID)[0].branch
		});
		if ((screen === 'list' || screen === 'view') && mode === 'create') {
			// if (screen === "view" && mode === "create") {
			onValuesChange({
				branch:
					nameDropdown &&
					nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
					nameDropdown.filter((item) => item.CustomerID === formData.refID)[0].branch
			});
		}
	}, [formData.relationshipManager, nameDropdown]);

	useEffect(() => {
		// onValuesChange({
		//   preferredCurrency:
		//     nameDropdown &&
		//     nameDropdown.filter((item) => item.CustomerID === formData.refID)[0] &&
		//     nameDropdown.filter((item) => item.CustomerID === formData.refID)[0]
		//       .Currency,
		// });
	}, [formData.branch]);

	useEffect(() => {
		if (mode != 'edit' && mode != 'create-new') {
			onValuesChange({
				refID: '',
				relationshipManager: '',
				branch: '',
				targetAmount: '',
				preferredCurrency: ''
			});
		}
		form.setFieldsValue({
			refID: '',
			relationshipManager: '',
			branch: '',
			targetAmount: '',
			preferredCurrency: ''
		});
	}, [formData.prospectType]);

	return (
		<Card className='prospect-type-card-type' title={`Client / Prospect Details`} loading={loading}>
			<Form
				className='refType-form'
				layout='vertical'
				initialValues={formData}
				form={form}
				onValuesChange={onValuesChange}
			>
				<Row gutter={16}>
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='prospectType'
							label={<div className='opp-text'>Prospect Type</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.reftype : []}
						>
							<Radio.Group
								value={formData.prospectType}
								onClick={() => {
									form.setFieldsValue({
										RefID: '',
										RelationshipManager: '',
										Branch: ''
									});
									formData.refID = '';
									formData.relationshipManager = '';
									formData.branch = '';
								}}
								size='large'
								style={{ width: '100%' }}
								// disabled={
								//   mode === "edit" && csObject && csObject.RefType.isKeyColumn
								// }
								disabled={
									formData.screenName === 'oppo-list' && csObject && csObject.RefType.isKeyColumn
								}
							>
								<Radio.Button
									value='PROSPECTADD'
									className={`opp-radio-field ${
										formData.prospectType === 'PROSPECTADD' && 'active'
									}`}
									disabled={mode === 'edit'}
								>
									Prospect
								</Radio.Button>
								<Radio.Button
									value='CLIENTADD'
									className={`opp-radio-field ${formData.prospectType === 'CLIENTADD' && 'active'}`}
									disabled={mode === 'edit'}
								>
									Client
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col className='gutter-row' span={8}>
						<Form.Item
							name='refID'
							label={<div className='opp-text'>{CONSTANTS.opportunityCreate.name}</div>}
							rules={rules ? rules.refid : []}
						>
							<Select
								size='large'
								className='name-input'
								placeholder={CONSTANTS.placeholders.search}
								optionFilterProp='children'
								value={formData.refID}
								defaultValue={formData.refID ? formData.refID : ''}
								suffixIcon={<UserAddOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
								filterOption={(input, option) => {
									const filterWith = ['Name', 'Mobile', 'Email', 'Address', 'City'];
									nameDropdown.map((item) =>
										item.Name
											? filterWith.concat('Name')
											: item.CustomerID
											? filterWith.concat('CustomerID')
											: filterWith.concat('Mobile')
									);
									return Object.keys(nameDropdown[option.key])
										.filter((i) => filterWith && filterWith.includes(i))
										.find((key) => {
											// (typeof(nameDropdown[option.key][key])==="string")
											return typeof nameDropdown[option.key][key] === 'string'
												? nameDropdown[option.key][key].toLowerCase().includes(input.toLowerCase())
												: nameDropdown[option.key][key].includes(input.toLowerCase());
										});
								}}
								// disabled={
								//   mode === "edit" && csObject && csObject.RefID.isKeyColumn
								// }
								disabled={
									formData.screenName === 'oppo-list' && csObject && csObject.RefType.isKeyColumn
								}
								showSearch
							>
								{nameDropdown &&
									nameDropdown.map((item, index) => (
										<Select.Option value={item.CustomerID} key={index} style={{ padding: '10px' }}>
											<Row>
												<Col span={4}>
													<div>
														<AvatarLogo
															imgsrc={
																item?.FileString &&
																item?.FileString !== ' ' &&
																item.FileString !== null &&
																item.FileString
															}
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
														<Text
															// style={{ color: "#5D6DD1", fontSize: "13px" }}
															style={
																ellipsis
																	? {
																			width: 280,
																			color: '#5D6DD1',
																			fontSize: '13px'
																	  }
																	: {
																			width: 100
																	  }
															}
															ellipsis={ellipsis ? ellipsis : false}
														>
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

					{/* Relationship Manager section starts */}
					<Col span={8} className='gutter-row'>
						<Form.Item
							name='relationshipManager'
							label={
								<div className='opp-text'>{CONSTANTS.opportunityCreate.relationshipManager}</div>
							}
							rules={rules ? rules.relationshipmanager : []}
						>
							<Select
								className='opp-filter-dropdown'
								size='large'
								mode='single'
								placeholder={CONSTANTS.placeholders.select}
								value={formData.relationshipManager}
								defaultValue={formData.relationshipManager ? formData.relationshipManager : ''}
								// disabled={!formData.refID}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								showArrow={formData.refID ? true : false}
								disabled={true}
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
					{/* Relationship Manager section ends */}

					<Col span={8} className='gutter-row'>
						<Form.Item
							name='branch'
							label={<div className='opp-text'>{CONSTANTS.opportunityCreate.office}</div>}
							rules={rules ? rules.branch : []}
						>
							<Select
								className='opportunity-filter-dropdown'
								size='large'
								mode='single'
								placeholder={CONSTANTS.placeholders.select}
								value={formData.branch}
								defaultValue={formData.branch ? formData.branch : ''}
								// disabled={!formData.refID}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								showArrow={formData.refID ? true : false}
								disabled={true}
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
				</Row>
			</Form>
		</Card>
	);
};

export default CustomProspectTypeFormCard;

import { Form, Button, Card, Select, Radio, Row, Col, Typography, Space } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import './interactionCreate.scss';
import { useState, useEffect } from 'react';
import { getDependentProspectClientDataApi, getDependentOppNameDataApi } from '../../api/commonApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
const { Option } = Select;
const { Text } = Typography;

const ClientProspectDetailsForm = (props) => {
	const [nameDropdown, setNameDropdown] = useState([]);
	const [oppNameDropdown, setOppNameDropdown] = useState([]);

	useEffect(() => {
		getDependentProspectClientDataApi(props.formData.refType)
			.then((res) => {
				res.data.returnColumn === 'CustomerID' &&
					setNameDropdown(res && res.data && res.data.lookUpValues);
				props.form.setFieldsValue({
					refID: '',
					relationshipManager: '',
					branch: '',
					opportunity: ''
				});
				props.formData.refID = '';
				props.formData.relationshipManager = '';
				props.formData.branch = '';
				props.formData.opportunityName = '';
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.formData.refType]);
	useEffect(() => {
		getDependentOppNameDataApi(props.formData.refType)
			.then((res) => {
				res.data.returnColumn === 'opportunityname' && setOppNameDropdown(res.data.lookUpValues);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.formData.refType]);

	// const clearValues = () => {
	//   props.form.setFieldsValue({
	//     refID: "",
	//     relationshipManager: "",
	//     branch: "",
	//   });
	// };
	return (
		<>
			<Form
				className='clientProspect-form'
				form={props.form}
				layout='vertical'
				initialValues={props.formData}
				onValuesChange={props.onValuesChange}
			>
				<Card className='interaction-card-type' title={`Client / Prospect Details`}>
					<Row gutter={16}>
						<Col className='gutter-row' span={24}>
							<Form.Item
								label={<div className='interaction-text'>Select</div>}
								name='refType'
								validateTrigger={['onChange', 'onBlur']}
								rules={props.rules ? props.rules.reftype : []}
							>
								<Radio.Group
									size='large'
									value={props.formData.RefType}
									// onChange={clearValues}
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
						<Col span={8} className='gutter-row'>
							{/* <Form.Item
                label={<div className="interaction-text">Name</div>}
                name="RefID"
                required
              >
                <Select
                  value={props.formData.RefID}
                  size="large"
                  style={{
                    width: "100%",
                  }}
                >
                  {nameDropdown &&
                    nameDropdown.map((item, index) => (
                      <Option value={item.CustomerID} key={index}>
                        {item.Name}
                      </Option>
                    ))}
                </Select>
              </Form.Item> */}

							<Form.Item
								label={<div className='interaction-text'>Name</div>}
								name='refID'
								required
								rules={props.rules ? props.rules.refid : []}
							>
								<Select
									labelInValue
									size='large'
									className='interaction-filter-dropdown name-input'
									placeholder='Search by name'
									value={props.formData.refID}
									suffixIcon={<UserAddOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
									filterOption={(input, option) => {
										const filterWith = [
											// "Name",
											// "Mobile",
											// "Email",
											// "Address",
											// "City",
										];

										nameDropdown.map((item) => item.Name)
											? filterWith.concat('Name')
											: filterWith.concat('Mobile');

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
									// disabled={
									//   mode === "edit" && csObject && csObject.RefID.isKeyColumn
									// }
									showSearch
								>
									{nameDropdown &&
										nameDropdown.map((item, index) => (
											<Option value={item.CustomerID} key={index} style={{ padding: '10px' }}>
												<Row>
													<Col span={4}>
														<AvatarLogo
															imgsrc={item.FileString}
															profileName={item.ProfileInitial}
															avatarSize={AvatarSize.extrasmall}
															style={{
																color: '#f56a00',
																backgroundColor: '#fde3cf'
															}}
														/>
														{/* <Avatar
                              size={50}
                              className="avatar"
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                              }}
                              icon={
                                // <img
                                //   // src={`data:image/jpeg;base64,${record.profileImage}`}
                                //   alt="I"
                                // />
                                <div>
                                  {item.FileString === null ||
                                  item.FileString === "U" ? (
                                    <div className="prospectInitialsCircleImg">
                                      {item.ProfileInitial}
                                    </div>
                                  ) : (
                                    <Avatar
                                      size={80}
                                      className="avatar"
                                      style={{
                                        color: "#f56a00",
                                        backgroundColor: "#fde3cf",
                                      }}
                                      icon={
                                        <img
                                          // src={`data:image/jpeg;base64,${item.FileString}`}
                                          alt="I"
                                        />
                                      }
                                    />
                                  )}
                                </div>
                              }
                            /> */}
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
								</Select>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='opportunityName'
								label={<div className='interaction-text'>Opportunity</div>}
								rules={props.rules ? props.rules.opportunityname : []}
							>
								<Select
									value={props.formData.opportunityName}
									size='large'
									style={{
										width: '100%'
									}}
									defaultValue={props.formData.opportunityName}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
								>
									{oppNameDropdown &&
										oppNameDropdown.map((item, index) => (
											<Option value={item.opportunityname} key={index}>
												{item.opportunityname}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={8}>
							<Button type='link' onClick={() => props.setShowExistingInteractionModal(true)}>
								<u className='interaction-text'>Select Existing Interaction</u>
							</Button>
						</Col>
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='relationshipManager'
								label={<div className='interaction-text'>Relationship Manager</div>}
								rules={props.rules ? props.rules.relationshipmanager : []}
								// defaultValue={(props.formData.refID===props.csObject &&
								//   props.csObject.CustomerID)?props.csObject &&
								//   props.csObject.RelationshipManager &&
								//   props.csObject.RelationshipManager.lookupValue &&
								//   props.csObject.RelationshipManager.lookupValue
								//     .lookUpValues &&
								//   props.csObject.RelationshipManager.lookupValue.lookUpValues:undefined}
							>
								<Select
									className='opportunity-filter-dropdown'
									size='large'
									mode='single'
									placeholder='Select Option'
									defaultValue={
										props.csObject &&
										props.csObject.RelationshipManager &&
										props.csObject.RelationshipManager.lookupValue &&
										props.csObject.RelationshipManager.lookupValue.lookUpValues &&
										props.csObject.RelationshipManager.lookupValue.lookUpValues
									}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
								>
									{props.csObject &&
										props.csObject.RelationshipManager &&
										props.csObject.RelationshipManager.lookupValue &&
										props.csObject.RelationshipManager.lookupValue.lookUpValues &&
										props.csObject.RelationshipManager.lookupValue.lookUpValues.map(
											(item, index) => (
												<Option value={item.ID} key={index}>
													{item.Name}
												</Option>
											)
										)}
								</Select>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='branch'
								label={<div className='interaction-text'>Branch</div>}
								rules={props.rules ? props.rules.branch : []}
							>
								<Select
									className='opportunity-filter-dropdown'
									dropdownClassName='dropdown-style'
									size='large'
									mode='single'
									placeholder='Select Option'
									value={[]}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
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
					</Row>
				</Card>
			</Form>
		</>
	);
};

export default ClientProspectDetailsForm;

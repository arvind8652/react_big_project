import { memo, useEffect, useState } from 'react';

// external imports
import { Card, Form, Row, Col, Input, AutoComplete, Select, Avatar, Space, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-regular-svg-icons';
import { useLocation, useRouteMatch } from 'react-router-dom';

import './AccountCreateClientDetailsFormCard.scss';
import { getClientNameForAccountCreate } from '../../../api/commonApi';

import { UserAddOutlined } from '@ant-design/icons';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { ScAvatarProfileInitialText } from '../../StyledComponents/genericElements';
import { AvatarSize } from '../../../constants/AvatarSize';
import AvatarLogo from '../../Avatar/AvatarLogo';
const { Text } = Typography;
const { Option } = Select;
const CreateClientDetailsFormCard = ({
	action,
	rules,
	csObject,
	form,
	formData,
	setUserNameDropDownlist,
	onSelectCustomerType,
	onValuesChange = () => {},
	location,
	setClientCategory = {}
}) => {
	//const location = useLocation();
	const [names, setNames] = useState();
	const [profileName, setProfileName] = useState();
	const [nameDropdown, setNameDropdown] = useState([]);
	const [ellipsis, setEllipsis] = useState(true);
	const [render, setRender] = useState(false);
	const { Item } = Form;

	const suffixIcon = <FontAwesomeIcon icon={faUserPlus} size='0.5x' />;

	// useEffect(() => {
	//   if (location?.state?.contactDetails) {
	//     formData.relationshipManager = location?.state?.contactDetails?.relationshipManager
	//     formData.branch = location?.state?.contactDetails?.branch
	//     form.setFieldsValue({
	//       relationshipManager: location?.state?.contactDetails?.relationshipManager,
	//       branch: location?.state?.contactDetails?.branch,
	//       name: location?.state?.contactDetails?.name
	//     })
	//   }
	// }, [location?.state])

	const getName = async () => {
		try {
			const response = await getClientNameForAccountCreate();
			setNames(response.data);
			setUserNameDropDownlist(response.data.lookUpValues);
			setNameDropdown(response.data.lookUpValues);
		} catch (error) {}
	};

	useEffect(() => {
		getName();
	}, []);

	useEffect(() => {
		if (
			(action === 'edit' || action === 'profileEdit') &&
			nameDropdown?.length > 0 &&
			formData?.name
		) {
			let obj = nameDropdown?.find((o) => o?.CustomerID === formData?.name);
			setClientCategory(obj?.category);
		}
	}, [nameDropdown, formData?.name]);

	useEffect(() => {
		if (!(action === 'edit' || action === 'profileEdit')) {
			if (!(location.state === null || location.state === undefined)) {
				formData.name = location.state?.contactDetails?.clientId;
				onSelectCustomerType(location.state?.contactDetails?.clientId);
				formData.relationshipManager = location.state?.contactDetails?.custRelMgr;
				formData.branch = location.state?.contactDetails?.branch;
				form.setFieldsValue({
					name: location.state?.contactDetails?.clientId,
					relationshipManager: location.state?.contactDetails?.custRelMgr,
					branch: location.state?.contactDetails?.branch
				});
			}
		}
	}, [location.state?.contactDetails]);

	useEffect(() => {
		if (!(action === 'edit' || action === 'profileEdit')) {
			if (location.state === null || location.state === undefined) {
				let obj = nameDropdown.find((o) => o?.CustomerID === formData.name);
				onSelectCustomerType(obj?.CustomerID);
				setClientCategory(obj?.category);
				let obj2 = csObject?.RelationshipManager?.lookupValue?.lookUpValues.find(
					(o) => o?.ID === obj?.RelationshipManager
				);
				let obj3 = csObject?.Branch?.lookupValue?.lookUpValues.find(
					(o) => o?.Unit_Hierarchy === obj?.branch
				);
				formData.relationshipManager = obj2?.ID;
				formData.branch = obj3?.Unit_Hierarchy;
				form.setFieldsValue({
					relationshipManager: obj2?.Name,
					branch: obj3?.NAME
				});
			}
		}
	}, [formData.name]);

	return (
		<Card title='Client Details'>
			<Form onValuesChange={onValuesChange} layout='vertical' form={form} initialValues={formData}>
				<Row>
					<Col span={8}>
						<Item
							label='Name'
							validateTrigger={['onChange', 'onBlur']}
							rules={[{ required: true, message: '* Client Name cannot be empty' }]}
							name='name'
						>
							<Select
								size='large'
								className='name-input'
								placeholder='Search by name'
								// onChange={() => setRender(true)}
								onChange={() => setRender(true)}
								optionFilterProp='children'
								optionLabelProp='label'
								value={formData.refID}
								suffixIcon={<UserAddOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
								// filterOption={(input, option) => {
								//   const filterWith = [
								//     "Name",
								//     "Mobile",
								//     "Email",
								//     "Address",
								//     "City",
								//   ];
								//   nameDropdown.map((item) => item.Name
								//     ? filterWith.concat("Name") : item.CustomerID ? filterWith.concat("CustomerID")
								//       : filterWith.concat("Mobile"));
								//   return Object.keys(nameDropdown[option.key])
								//     .filter((i) => filterWith && filterWith.includes(i))
								//     .find((key) => {
								//       // (typeof(nameDropdown[option.key][key])==="string")
								//       return typeof nameDropdown[option.key][key] === "string"
								//         ? nameDropdown[option.key][key]
								//           .toLowerCase()
								//           .includes(input.toLowerCase())
								//         : nameDropdown[option.key][key].includes(
								//           input.toLowerCase()
								//         );
								//     });
								// }}
								filterOption={(input, option) =>
									option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
									option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								// disabled={
								//   mode === "edit" && csObject && csObject.RefID.isKeyColumn
								// }
								showSearch
							>
								{nameDropdown &&
									nameDropdown.map((item, index) => (
										<Select.Option
											value={item.CustomerID}
											label={item.Name}
											key={index}
											style={{ padding: '10px' }}
										>
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
								{/* {nameDropdown &&
                  nameDropdown.map((item, index) => (
                    <Option value={item.CustomerID} key={index}>
                      {item.Name}
                    </Option>
                  ))} */}
							</Select>
						</Item>
					</Col>

					<Col span={8}>
						<Item
							name='relationshipManager'
							required={csObject?.RelationshipManager.isRequired}
							rules={rules?.relationshipmanager ? rules?.relationshipmanager : []}
							label='Relationship Manager'
						>
							<Select
								placeholder='Search by name'
								showSearch={true}
								suffixIcon={suffixIcon}
								disabled={true}
								size='large'
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								options={csObject?.RelationshipManager?.lookupValue?.lookUpValues?.map((item) => ({
									label: item.Name,
									value: item.ID
								}))}
							/>
						</Item>
					</Col>

					<Col span={8}>
						<Item name='branch' required={true} rules={rules?.branch} label='Office'>
							{/* <AutoComplete
                required={true}
                placeholder="Search name"
                size="large"
                suffix={suffixIcon}
              >
                {csObject?.Branch.lookupValue.lookUpValues.map((item) => (
                  <AutoComplete.Option key={item.NAME} value={item.Unit_Hierarchy}>
                    {item.NAME}
                  </AutoComplete.Option>
                ))}
              </AutoComplete> */}

							<Select
								placeholder='Search by name'
								showSearch={true}
								suffixIcon={suffixIcon}
								disabled={true}
								size='large'
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								options={csObject?.Branch.lookupValue.lookUpValues?.map((item) => ({
									label: item.NAME,
									value: item.Unit_Hierarchy
								}))}
							/>
						</Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default memo(CreateClientDetailsFormCard);

import { useEffect, useState } from 'react';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Form, Col, DatePicker, Input, Radio, Row, Select, Card, message } from 'antd';
import { CONSTANTS } from '../../../constants/constants';
import { POLO_BLUE } from '../../../theme';
import { beforeUpload, dummyRequest } from '../../../utils/utils';
import UploadByFormat from '../../UploadByFormat/UploadByFormat';
import './profileDetailsFormCard.scss';
import React from 'react';

const ProfileDetailsFormCard = ({ form, formData, onValuesChange, rules, csObject, action }) => {
	const [errorList, setErrorList] = useState([]);
	// useEffect(() => {
	//   form.setFieldsValue(formData);
	// }, []);
	// const beforeUpload = (file) => {
	//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	//   if (!isJpgOrPng) {
	//     message.error("You can only upload JPG/PNG file!");
	//   }
	//   const isLt2M = file.size / 1024 / 1024 <= 1;
	//   if (!isLt2M) {
	//     message.error("Image must smaller than 1MB!");
	//   }
	//   return isJpgOrPng && isLt2M;
	// };
	useEffect(() => {
		const { title, titleCondition, individualGender } = formData;
		if (
			title &&
			titleCondition &&
			titleCondition !== individualGender &&
			titleCondition !== 'A' &&
			formData?.individualGender
		) {
			onValuesChange({ title: undefined, titleCondition: '' });
			if (formData?.individualGender === 'F') {
				message.warning(' Please select other salutation for gender female.');
			} else if (formData?.individualGender === 'M') {
				message.warning(' Please select other salutation for gender male.');
			}
		}
	}, [formData?.title, formData?.individualGender]);
	const handleOnTitleChange = (key, value) => {
		let titleCond = '';
		csObject?.Salutation?.lookupValue?.lookUpValues?.filter((item) => {
			if (item?.data_value === value) {
				titleCond = item?.chk_condn;
			}
		});
		onValuesChange({ [key]: value, ['titleCondition']: titleCond });
	};

	const blankSpaceValidator = async (rule, value, callback) => {
		if (value && value.toString().length > 0 && !value?.replace(/\s/g, '').length) {
			return Promise.reject(new Error('cannot be only blank space'));
		} else {
			return Promise.resolve();
		}
	};

	const checkAlphanumeric = async (rule, value, callback) => {
		let regex = new RegExp(/^(?=.*[a-zA-Z])[A-Za-z0-9 ]+$/); // this will check value should contain alphabet along with number
		if (value && value.toString().length > 0 && regex.test(value) != true) {
			return Promise.reject(new Error('error'));
		} else {
			return Promise.resolve();
		}
	};

	return (
		<Card
			title='Personal Details'
			className='prospect-profile-company-details-form-card profile-det-card-type'
		>
			<Form
				form={form}
				initialValues={formData}
				onValuesChange={onValuesChange}
				layout='vertical'
				className='form-container'
			>
				<Row>
					<Col span={9}>
						<Col span={8}>
							<Form.Item
								label='Salutation'
								name='title'
								validateTrigger={['onChange', 'onBlur']}
								rules={rules ? rules.salutation : []}
								// required
							>
								<Select
									value={formData.title}
									size='large'
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
									placeholder={CONSTANTS.placeholders.select}
									onChange={(val) => handleOnTitleChange('title', val)}
								>
									{csObject?.Salutation?.lookupValue?.lookUpValues?.map((item, index) => (
										<Select.Option key={index} value={item.data_value}>
											{item.display_value}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Col>
				</Row>
				<Row>
					<Col span={9}>
						<Row>
							<Col span={16}>
								<Form.Item
									name='individualFirstName'
									label='First Name'
									validateTrigger={['onChange', 'onBlur']}
									// rules={rules && rules.firstname ? rules.firstname : []}

									// rules={
									// 	rules
									// 		? [
									// 				...rules?.firstname,
									// 				...[
									// 					{
									// 						validator: blankSpaceValidator,
									// 						message: '* First Name cannot be only blank space'
									// 					}
									// 				]
									// 		  ]
									// 		: []
									// }

									rules={[
										{
											required: true,
											message: '* First Name cannot be empty'
										},
										{
											validator: checkAlphanumeric,
											message: 'Special characters and numberic are not allowed'
										},
										{
											validator: blankSpaceValidator,
											message: '* First Name cannot be only blank space'
										},
										{
											message: 'Maximum character length is 100',
											pattern: /^[\S\d\W]{0,100}$/
										}
									]}
									// required
								>
									<Input
										value={formData.individualFirstName}
										placeholder='Enter first name'
										size='large'
									/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									name='individualMiddleName'
									label='Middle Name'
									style={{
										width: '200%'
									}}
									validateTrigger={['onChange', 'onBlur']}
									// rules={rules ? rules.middlename : []}
									// rules={
									// 	rules
									// 		? [
									// 				...rules?.middlename,
									// 				...[
									// 					{
									// 						validator: blankSpaceValidator,
									// 						message: '* Middle Name cannot be only blank space'
									// 					}
									// 				]
									// 		  ]
									// 		: []
									// }
									rules={[
										{
											validator: checkAlphanumeric,
											message: 'Special characters and numberic are not allowed'
										},
										{
											validator: blankSpaceValidator,
											message: '* Middle Name cannot be only blank space'
										},
										{
											message: 'Maximum character length is 100',
											pattern: /^[\S\d\W]{0,100}$/
										}
									]}
								>
									<Input
										value={formData.individualMiddleName}
										size='large'
										placeholder='Enter middle name'
									/>
								</Form.Item>
							</Col>
						</Row>
					</Col>
					<Col span={8}>
						<Form.Item
							name='individualLastName'
							label='Last Name'
							style={{
								width: '100%',
								paddingLeft: '100px'
							}}
							validateTrigger={['onChange', 'onBlur']}
							// rules={rules ? rules.lastname : []}
							// rules={
							// 	rules
							// 		? [
							// 				...rules?.lastname,
							// 				...[
							// 					{
							// 						validator: blankSpaceValidator,
							// 						message: '* Last Name cannot be only blank space'
							// 					}
							// 				]
							// 		  ]
							// 		: []
							// }
							rules={[
								{
									validator: checkAlphanumeric,
									message: 'Special characters and numberic are not allowed'
								},
								{
									validator: blankSpaceValidator,
									message: '* Last Name cannot be only blank space'
								},
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
						>
							<Input
								value={formData.individualLastName}
								placeholder='Enter last name'
								size='large'
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='individualSuffix'
							label='Suffix'
							style={{
								width: '34%'
							}}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.suffix : []}
						>
							<Input value={formData.individualSuffix} placeholder='Suffix' size='large' />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={9}>
						<Row>
							<Col span={18} className='margin-tp'>
								<Form.Item name='profileImage' noStyle>
									{/* Image Upload Comp Start */}
									{/* <ImgCrop rotate grid shape="round"> */}
									<UploadByFormat
										action={action}
										formData={formData}
										shape='round'
										grid={true}
										rotate={true}
										uploadFormat='image'
										showPreview={true}
										allowCropping={true}
										icon={faUserCircle}
										color={POLO_BLUE}
										size='4x'
										text={'Upload Photo'}
										name='avatar'
										accept={CONSTANTS.attachmentFileTypes.uploadPhotoFileTypes}
										multiple={false}
										listType='text'
										showUploadList={false}
										customRequest={dummyRequest}
										onChange={({ file, fileList }) => {
											if (
												beforeUpload(
													file,
													setErrorList,
													CONSTANTS.attachmentFileTypes.uploadPhotoFileTypes
												)
											) {
												onValuesChange({
													profileImage: { file, fileList }
												});
											}
										}}
									></UploadByFormat>
									{/* </ImgCrop> */}
									{/* Image Upload Comp End */}
								</Form.Item>
							</Col>
						</Row>
						{/* {errorList.length > 0 && (
              <Row>
                <Col>
                  {errorList.map((error) => (
                    <>
                      <Row>{error}</Row>
                    </>
                  ))}
                </Col>
              </Row>
            )} */}
					</Col>
					<Col span={7}>
						<Form.Item
							name='individualDob'
							label='Date of Birth'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.dateofbirth : []}
							// required
						>
							<DatePicker
								value={formData.individualDob}
								style={{
									width: '100%'
								}}
								size='large'
								format='DD-MM-YYYY'
								disabledDate={(d) => !d || d.isAfter(new Date().setDate(new Date().getDate()))}
								placeholder={CONSTANTS.placeholders.date}
							/>
						</Form.Item>
						<Form.Item
							name='individualCategory'
							label='Category'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.category : []}
							// required
						>
							<Select
								value={formData.individualCategory}
								size='large'
								style={{
									width: '100%'
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								placeholder={CONSTANTS.placeholders.select}
								showSearch
							>
								{csObject?.Category?.dropDownValue?.map((category, index) => (
									<Select.Option key={index} value={category.dataValue}>
										{category.displayValue}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='individualGender'
							label='Gender'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.gender : []}
							// required
						>
							<Radio.Group value={formData.individualGender} size='large' style={{ width: '100%' }}>
								{csObject?.Gender?.dropDownValue?.map((gender, index) => (
									<Radio.Button key={index} value={gender.dataValue}>
										{gender.displayValue}
									</Radio.Button>
								))}
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name='individualNationality'
							label='Nationality'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.nationality : []}
							// required
						>
							<Select
								value={formData.individualNationality}
								size='large'
								style={{
									width: '100%'
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								placeholder={CONSTANTS.placeholders.select}
								showSearch
							>
								{csObject?.Nationality?.dropDownValue?.map((n, index) => (
									<Select.Option key={index} value={n.dataValue}>
										{n.displayValue}
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

export default ProfileDetailsFormCard;

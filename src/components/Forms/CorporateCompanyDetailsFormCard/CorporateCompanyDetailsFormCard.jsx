import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';
import { CONSTANTS } from '../../../constants/constants';
import { beforeUpload, dummyRequest } from '../../../utils/utils';
import './corporateCompanyDetailsFormCard.scss';
import UploadByFormat from '../../UploadByFormat/UploadByFormat';
import { POLO_BLUE } from '../../../theme';

const CorporateCompanyDetailsFormCard = ({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	action = ''
}) => {
	const [errorList, setErrorList] = useState([]);
	// const beforeUpload = (file) => {
	//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	//   if (!isJpgOrPng) {
	//   }
	//   const isLt2M = file.size / 1024 / 1024 < 2;
	//   if (!isLt2M) {
	//   }
	//   return isJpgOrPng && isLt2M;
	// };
	const corpBlankSpaceValidator = async (rule, value, callback) => {
		if (value && value.toString().length > 0 && !value?.replace(/\s/g, '').length) {
			return Promise.reject(new Error('cannot be only blank space'));
		} else {
			return Promise.resolve();
		}
	};
	return (
		<Card
			title='Company Details'
			className='prospect-profile-company-details-form-card company-det-card-type'
		>
			<Form
				form={form}
				initialValues={formData}
				onValuesChange={onValuesChange}
				layout='vertical'
				className='form-container'
			>
				<Row>
					<Col span={10}>
						<Form.Item
							name='corporateCompanyName'
							label='Company Name'
							validateTrigger={['onChange', 'onBlur']}
							// rules={rules ? rules.firstname : []}
							rules={[
								{
									required: true,
									message: '* Company Name cannot be empty'
								},
								{
									validator: corpBlankSpaceValidator,
									message: '* Company Name cannot be only blank space'
								},
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
							required
						>
							<Input
								value={formData.corporateCompanyName}
								className='field'
								placeholder={CONSTANTS.placeholders.enter}
								size='large'
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='corporateContactPerson'
							label='Contact Person'
							style={{
								width: '100%'
							}}
							validateTrigger={['onChange', 'onBlur']}
							// rules={rules ? rules.middlename : []}
							rules={[
								{
									validator: corpBlankSpaceValidator,
									message: '* Contact Person cannot be only blank space'
								},
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
						>
							<Input
								value={formData.corporateContactPerson}
								className='field'
								placeholder={CONSTANTS.placeholders.enter}
								size='large'
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='corporateContactPersonDetails'
							label="Contact Person's Detail"
							style={{
								width: '100%'
							}}
							validateTrigger={['onChange', 'onBlur']}
							// rules={rules ? rules.lastname : []}
							rules={[
								{
									validator: corpBlankSpaceValidator,
									message: '* Contact Persons Detail cannot be only blank space'
								},
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
						>
							<Input
								value={formData.corporateContactPersonDetails}
								className='field'
								placeholder={CONSTANTS.placeholders.enter}
								size='large'
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
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
								{/* <Form.Item name="profileImage" noStyle>
                  <ImgCrop rotate grid shape="round">
                    <Upload
                      name="avatar"
                      accept={CONSTANTS.attachmentFileTypes.uploadPhotoFileTypes}
                      multiple={false}
                      listType="picture-card"
                      showUploadList={false}
                      customRequest={dummyRequest}
                      // beforeUpload={(file) => {
                      //   beforeUpload(file, setErrorList);
                      // }}
                      onChange={({ file, fileList }) => {
                        if (
                          beforeUpload(
                            file,
                            setErrorList,
                            CONSTANTS.attachmentFileTypes.uploadPhotoFileTypes
                          )
                        ) {
                          onValuesChange({
                            profileImage: { file, fileList },
                          });
                        }
                      }}
                    >
                      {formData.profileImageString ? (
                        <Avatar
                          size={164}
                          icon={
                            <img src={formData.profileImageString} alt="avatar" />
                          }
                        />
                      ) : (
                        <div>
                          <p className="ant-upload-drag-icon">
                            <span className="fa-layers fa-fw user-circle">
                              <FontAwesomeIcon icon={faUser} size="4x" />
                              <FontAwesomeIcon icon={faCircle} size="7x" />
                            </span>
                          </p>
                          <p
                            className="ant-upload-hint"
                            style={{
                              textDecoration: "underline",
                              fontWeight: "600",
                              marginTop: 10,
                            }}
                          >
                            Upload Logo
                          </p>
                        </div>
                      )}
                    </Upload>
                  </ImgCrop>
                </Form.Item> */}
							</Col>
						</Row>
						{errorList.length > 0 && (
							<Row>
								<Col>
									{errorList.map((error) => (
										<>
											<Row>{error}</Row>
										</>
									))}
								</Col>
							</Row>
						)}
					</Col>
					<Col span={7}>
						{/* <Row style={{ marginBottom: 14 }} gutter={16}> */}
						{/* <Col span={12}> */}
						<Form.Item
							name='corporateDoi'
							label='Date of Incorporation'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.dateofbirth : []}
							required
						>
							<DatePicker
								value={formData.corporateDoi}
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
							name='corporateCategory'
							label='Category'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.category : []}
						>
							<Select
								value={formData.corporateCategory}
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
								{csObject &&
									csObject.Category &&
									csObject.Category.dropDownValue.map((category, index) => (
										<Select.Option key={index} value={category.dataValue}>
											{category.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
						{/* </Col> */}
						{/* </Row> */}
					</Col>
					<Col span={7}>
						<Form.Item
							name='corporateNationality'
							label={<div className='text'>Nationality</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.nationality : []}
						>
							<Select
								defaultValue={
									csObject && csObject.Nationality ? csObject.Nationality.defaultvalue : null
								}
								value={formData.corporateNationality}
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
								{csObject &&
									csObject.Nationality.dropDownValue.map((n, index) => (
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

export default CorporateCompanyDetailsFormCard;

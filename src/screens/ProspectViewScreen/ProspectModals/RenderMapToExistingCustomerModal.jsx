import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/pro-solid-svg-icons';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { Button, Modal, Typography, Form, Row, Col, Select, Space } from 'antd';
import './Modal.scss';
import AvatarLogo from '../../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../../constants/AvatarSize';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { useState } from 'react';

const { Option } = Select;
const { Title, Text } = Typography;
const RenderMapToExistingCustomerModal = ({
	mapToExistingCustomer,
	setMapToExistingCustomer,
	prospectViewRefId,
	prospectConversionDependantData,
	convertToCustomer,
	setConvertToCustomer,
	onMapToExistingCustomer
}) => {
	const nameDropdown = prospectConversionDependantData.lookUpValues;
	const [customerSelected, setCustomerSelected] = useState(true);
	const handleOnValuesChange = (key, value) => {
		setConvertToCustomer({ [key]: value });
		setCustomerSelected(false);
	};

	return (
		<Modal
			centered
			visible={mapToExistingCustomer}
			onCancel={() => setMapToExistingCustomer(false)}
			footer={null}
			className='convert-to-customer-modal'
			title={
				<div className='modal-header'>
					<FontAwesomeIcon icon={faSyncAlt} size='lg' className='header-icon' />
					<Title level={3} style={{ color: '#354081' }}>
						Map to Existing Customer
					</Title>
				</div>
			}
		>
			<div className='map-modal-body'>
				<Text className='text-value'>Select an existing customer to map this prospect</Text>
				{customerSelected ? (
					<>
						<div className='input-label'>Client</div>
						<Form.Item name='refID' required>
							<Select
								onChange={(value) => handleOnValuesChange('refID', value)}
								size='large'
								className='interaction-filter-dropdown name-input'
								placeholder='Search by name'
								value={convertToCustomer.refID}
								suffixIcon={<FontAwesomeIcon icon={faUserPlus} style={{ margin: '0 0 0 auto' }} />}
								filterOption={(input, option) => {
									const filterWith = ['Name', 'Mobile', 'Email', 'Address', 'City'];

									nameDropdown.map((item) => item.Name)
										? filterWith.concat('Name')
										: filterWith.concat('Mobile');

									return Object.keys(nameDropdown[option.key])
										.filter((i) => filterWith && filterWith.includes(i))
										.find((key) => {
											return typeof nameDropdown[option.key][key] === 'string'
												? nameDropdown[option.key][key].toLowerCase().includes(input.toLowerCase())
												: nameDropdown[option.key][key].includes(input.toLowerCase());
										});
								}}
								showSearch
							>
								{nameDropdown &&
									nameDropdown.map((item, index) => (
										<Option value={item.CustomerID} key={index} style={{ padding: '10px' }}>
											<Row>
												<Col span={4}>
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
					</>
				) : (
					<div>
						{nameDropdown &&
							nameDropdown.map(
								(item, index) =>
									item.CustomerID === convertToCustomer.refID && (
										<Row key={index} className='selected-customer'>
											<Col span={4}>
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
										</Row>
									)
							)}
						<a onClick={() => setCustomerSelected(true)}>Change</a>
					</div>
				)}
			</div>
			<div className='convert-modal-footer'>
				<Button
					className='text-only-btn'
					key='back'
					type='text'
					onClick={() => {
						setMapToExistingCustomer(false);
						setCustomerSelected(true);
					}}
				>
					Cancel
				</Button>
				<Button
					className='submit-btn'
					key='submit'
					type='primary'
					onClick={() => onMapToExistingCustomer(convertToCustomer.refID, prospectViewRefId)}
				>
					Convert
				</Button>
			</div>
		</Modal>
	);
};
export default RenderMapToExistingCustomerModal;

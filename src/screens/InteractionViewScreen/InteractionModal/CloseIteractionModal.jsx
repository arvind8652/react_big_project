import React, { useState } from 'react';
import { Button, Typography, Divider, Form, Row, Select, Col, Radio } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;
const { Title } = Typography;
const CloseInteraction = ({
	showCloseInteractionModal,
	setShowCloseInteractionModal,
	closeInteractionApi,
	selectedInteraction,
	setSelectedRowKeys,
	setSelectedRows,
	screen
}) => {
	const [closeInteractionFormDetail, setCloseInteractionFormDetail] = useState({
		closeReason: '',
		remarks: ''
	});
	const [form] = Form.useForm();
	const [showDeferredModal, setShowDeferredModal] = useState(false);
	const [radioValue, setRadioValue] = useState('selectedOccurence');

	const closeInteractionReasonDropdown = [
		{
			dataValue: 'C',
			displayValue: 'Close'
		},
		{
			dataValue: 'D',
			displayValue: 'Defer'
		}
	];
	/**
	 * Method for the to save the close Interaction Modal popup form values
	 * @param {*} values Close Interaction Modal Popup form Values
	 */
	const handleCloseInteractionFormChange = (values) => {
		if (values && values.closeReason === 'D') {
			setShowDeferredModal(true);
		}
		setCloseInteractionFormDetail({
			...closeInteractionFormDetail,
			...values
		});
	};
	const closeDeferredModal = () => {
		setShowDeferredModal(false);
		setShowCloseInteractionModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	const onRadioChange = (e) => {
		setRadioValue(e.target.value);
	};
	const closeInteraction = () => {
		let requestObject = {};
		requestObject.followUpActivityStatus = selectedInteraction.followUpActivityStatus;
		requestObject.id = selectedInteraction.id;
		if (closeInteractionFormDetail.closeReason === 'C') {
			requestObject.CloseReason = closeInteractionFormDetail.closeReason;
		} else if (radioValue === 'selectedOccurence') {
			requestObject.CloseReason = 'D';
		} else {
			requestObject.CloseReason = 'DA';
		}
		requestObject.Remarks = closeInteractionFormDetail.remarks;
		closeInteractionApi(requestObject);
		setShowDeferredModal(false);
		setShowCloseInteractionModal(false);
	};

	return (
		<>
			<Modal
				visible={showCloseInteractionModal}
				centered
				footer={null}
				onCancel={() => closeDeferredModal()}
				width={800}
			>
				<div>
					<Title level={3} style={{ color: '#354081' }}>
						{`Close ${screen}`}
					</Title>
					<Divider />
					<Form layout='vertical' form={form} onValuesChange={handleCloseInteractionFormChange}>
						<Row>
							<Col span={8}>
								<Form.Item label='Reason' name='closeReason'>
									<Select
										size='large'
										placeholder='Select option'
										style={{ width: '90%' }}
										value={closeInteractionFormDetail.closeReason}
									>
										{closeInteractionReasonDropdown.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item label='Meeting Notes' name='remarks'>
							<TextArea rows={7} value={closeInteractionFormDetail.remarks} />
						</Form.Item>
					</Form>
					<Row justify='end'>
						<Button
							className='text-only-btn'
							type='text'
							style={{ marginRight: '15px' }}
							onClick={() => closeDeferredModal()}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn'
							type='primary'
							htmlType='submit'
							onClick={closeInteraction}
						>
							Done
						</Button>
					</Row>
				</div>
			</Modal>
			<Modal
				visible={showDeferredModal}
				onCancel={closeDeferredModal}
				footer={null}
				width={700}
				centered
			>
				<div>
					<Title level={3} style={{ color: '#354081' }}>{`Close ${screen}`}</Title>
					<Divider />
					<div className='deferred-modal-body'>
						{/* Are you sure you want to Close the selected Interaction? */}
						Are you sure you want to defer the
						{/* {screen.toLowerCase()} */}? Only pending
						{/* {screen.toLowerCase()} */}s will be deferred
						<div className='modal-radio'>
							<Radio.Group onChange={onRadioChange} value={radioValue}>
								<Radio value='selectedOccurence' className='radio-style'>
									Selected Occurence
								</Radio>
								<Radio value='allOccurences' className='radio-style'>
									All Occurences
								</Radio>
							</Radio.Group>
						</div>
					</div>
					<Row justify='end'>
						<Button className='text-only-btn' key='back' type='text' onClick={closeDeferredModal}>
							Cancel
						</Button>
						<Button className='submit-btn' key='submit' type='primary' onClick={closeInteraction}>
							{/* Delete */}
							Defer
						</Button>
					</Row>
				</div>
			</Modal>
		</>
	);
};
export default CloseInteraction;

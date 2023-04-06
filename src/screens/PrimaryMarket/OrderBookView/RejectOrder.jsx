import { Button, Row, Form, Input, Select, Alert } from 'antd';
import { useState } from 'react';
import '../../../screens/ProspectViewScreen/ProspectComponent/CardView.scss';
import { FileExcelOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { updateWorkflowForOrder } from '../../../api/primaryMarketApi';
import CustomModal from '../../../components/Modal/CustomModal/CustomModal';
import { useSelector } from 'react-redux';
import { ActionSuccessModalScreen } from './ActionSuccessModal';
import { ActionFailModalScreen } from './ActionFailModal';

export const RejectOrder = (props) => {
	console.log('PROPS', props);
	const {
		showRejectModal = false,
		dealId = '',
		marketType = 'Primary',
		isUpload = true,
		setBoolean,
		selRow,
		selectedRows,
		selectedRowKeys,
		handleRejectModal = () => {},
		setShowRejectModal = () => {},
		setSelectedRows,
		setSelectedRowKeys
	} = props;
	const [rejectReason, setRejectReason] = useState('');
	const [rejectFailedArray, setRejectFailedArray] = useState([]);
	const [showOrderModal, setShowOrderModal] = useState(false);
	const [remarks, setRemarks] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	function onChange(value) {
		setRejectReason(value);
	}

	const handleRejectOk = async () => {
		try {
			if (rejectReason.length === 0) {
				setAlertMessage('Must select a reason to reject');
			} else if (rejectReason === 'O' && remarks.length === 0) {
				setAlertMessage('Please specify the reason');
			} else if (remarks.length > 20) {
				setAlertMessage('Max length of remark is 20 charachters');
			} else {
				const primaryData = selRow.filter((item) => item.marketType === 'Primary');
				const secondaryData = selRow.filter((item) => item.marketType === 'Secondary');
				let primaryReqBody = [];
				let secondaryReqBody = [];

				if (primaryData && primaryData.length > 0) {
					primaryData.forEach((ele) => {
						let payload = {};
						payload.dealId = ele.dealId;
						payload.isNew = false;
						payload.event = 'R';
						if (rejectReason === 'O') {
							payload.reason = 'O';
							payload.remarks = remarks;
						} else {
							payload.reason = rejectReason;
						}
						primaryReqBody.push(payload);
					});
				} else {
					let payload = {};
					payload.dealId = dealId;
					payload.isNew = false;
					payload.event = 'R';

					if (rejectReason === 'O') {
						payload.reason = 'O';
						payload.remarks = remarks;
					} else {
						payload.reason = rejectReason;
					}

					primaryReqBody.push(payload);
				}

				if (secondaryData && secondaryData.length > 0) {
					secondaryData.forEach((ele) => {
						let payload = {};
						payload.dealId = ele.dealId;
						payload.isNew = false;
						payload.event = 'R';
						if (rejectReason === 'O') {
							payload.reason = 'O';
							payload.remarks = remarks;
						} else {
							payload.reason = rejectReason;
						}
						secondaryReqBody.push(payload);
					});
				} else {
					let payload = {};
					payload.dealId = dealId;
					payload.isNew = false;
					payload.event = 'R';

					if (rejectReason === 'O') {
						payload.reason = 'O';
						payload.remarks = remarks;
					} else {
						payload.reason = rejectReason;
					}

					secondaryReqBody.push(payload);
				}

				const primaryResp = await updateWorkflowForOrder(primaryReqBody, 'Primary');
				const secondaryResp = await updateWorkflowForOrder(secondaryReqBody, 'Secondary');
				const resp = [...primaryResp.data, ...secondaryResp.data];
				setShowOrderModal(true);
				setRejectFailedArray(resp.filter((item) => !item.success));
				// if (response?.status === 200) {
				//   let resp = response.data;
				//   console.log('BBB', resp);
				//   setRejectFailedArray(resp);
				//   setShowOrderModal(true);
				//   // setShowRejectModal(false);
				//   // if (!resp[0].success) {
				//   //   setShowSuccessFailureDeleteModal(true);
				//   //   setDeleteProspectMessage(resp[0].message);
				//   //   setShowRejectModal(false);
				//   // } else {
				//   //   setShowSuccessFailureDeleteModal(true);
				//   //   setDeleteProspectMessage(resp[0].message);
				//   //   setShowRejectModal(false);
				//   // }
				// }
			}
		} catch (error) {
			console.log('Something went wrong', error);
		}
	};

	const rejectCancel = () => {
		setShowRejectModal(false);
		handleRejectModal();
	};

	const rejectOrderOptionsPrimary = useSelector(
		(state) =>
			state.orderBook.controlStructure?.csList[0].controlStructureField.find(
				(e) => e.keyField === 'PMApproveReason'
			).lookupValue
	);

	const closeModal = (val) => {
		setShowOrderModal(val);
		// setRejectFailedArray([]);
		setBoolean(false);
		setSelectedRows([]);
		setSelectedRowKeys([]);
		handleRejectModal();
	};

	return (
		<>
			<CustomModal visible={showRejectModal} handleCancel={rejectCancel} handleOk={handleRejectOk}>
				<h1 className='aprroval'>
					<FileExcelOutlined /> Reject
				</h1>
				<h3 className='approve-heading' style={{ marginBottom: '20px' }}>
					Are you sure you want to reject the account?
				</h3>
				<div>
					<Row>
						<label className='required' style={{ marginTop: '10px' }}>
							Please Specify Reason for Rejection
						</label>
						<br />
					</Row>
					<Select
						showSearch
						size='large'
						mode='single'
						style={{ width: '50%' }}
						placeholder='Specify a Reason'
						optionFilterProp='children'
						onChange={onChange}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{rejectOrderOptionsPrimary &&
							rejectOrderOptionsPrimary?.lookUpValues.map((eachOption, idx) => (
								<Select.Option key={idx} value={eachOption[rejectOrderOptionsPrimary.returnColumn]}>
									{eachOption[rejectOrderOptionsPrimary.displayColumn]}
								</Select.Option>
							))}
					</Select>
				</div>
				<br />
				<Form.Item name='otherRejectReason'>
					<Input
						maxLength={20}
						size='large'
						style={{ width: '50%' }}
						value={remarks}
						placeholder='Other Reasons'
						onChange={(e) => setRemarks(e.target.value)}
					/>
				</Form.Item>
				{alertMessage.length > 0 && (
					<Alert
						message='Error'
						description={alertMessage}
						type='error'
						closable
						onClose={setTimeout(() => {
							setAlertMessage('');
						}, 3500)}
					/>
				)}
				<Row>
					<div className='modal-footer'>
						<Button className='text-only-btn-cancel' key='back' type='text' onClick={rejectCancel}>
							Cancel
						</Button>
						<Button
							key='submit'
							type='primary'
							onClick={handleRejectOk}
							size='large'
							style={{ backgroundColor: '#354081', borderRadius: '8px' }}
						>
							Reject
						</Button>
					</div>
				</Row>
			</CustomModal>
			<CustomModal visible={showOrderModal}>
				{rejectFailedArray.length === 0 ? (
					<ActionSuccessModalScreen closeModal={closeModal} selectedRowKeys={selectedRowKeys} />
				) : (
					<ActionFailModalScreen
						errorArray={rejectFailedArray}
						closeModal={closeModal}
						selectedRowKeys={selectedRowKeys}
						selectedRows={selectedRows}
					/>
				)}
			</CustomModal>
		</>
	);
};

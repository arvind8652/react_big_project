import { Button } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, Form, Input, Alert } from 'antd';
import '../../../screens/ProspectViewScreen/ProspectComponent/CardView.scss';
import { FileDoneOutlined } from '@ant-design/icons';
import CustomModal from '../../../components/Modal/CustomModal/CustomModal';
import '../style.scss';
import { updateWorkflowForOrder } from '../../../api/primaryMarketApi';
import { ActionSuccessModalScreen } from './ActionSuccessModal';
import { ActionFailModalScreen } from './ActionFailModal';

const { Option } = Select;

export const ApproveOrder = ({
	showApproveModal = false,
	dealId = '',
	marketType = 'Primary',
	// handleApproveModal,
	setBoolean,
	selRow,
	selectedRows,
	selectedRowKeys,
	handleApproveModal = () => {},
	setShowApproveModal = () => {},
	setSelectedRowKeys,
	setSelectedRows
}) => {
	const [showOrderModal, setShowOrderModal] = useState(false);
	const [orderFailedArray, setOrderFailedArray] = useState([]);

	const [approveReason, setApprovalReason] = useState('');
	const [remarks, setRemarks] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	const handleApproveConfirm = async () => {
		try {
			if (approveReason === 'O' && remarks.length === 0) {
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
						payload.event = 'A';
						payload.reason = approveReason;
						payload.remarks = remarks.length > 0 ? remarks : '';
						primaryReqBody.push(payload);
					});
				} else {
					let payload = {};
					payload.dealId = dealId;
					payload.isNew = false;
					payload.event = 'A';
					payload.reason = approveReason;
					payload.remarks = remarks.length > 0 ? remarks : '';
					primaryReqBody.push(payload);
				}

				if (secondaryData && secondaryData.length > 0) {
					secondaryData.forEach((ele) => {
						let payload = {};
						payload.dealId = ele.dealId;
						payload.isNew = false;
						payload.event = 'A';
						payload.reason = approveReason;
						payload.remarks = remarks.length > 0 ? remarks : '';
						secondaryReqBody.push(payload);
					});
				} else {
					let payload = {};
					payload.dealId = dealId;
					payload.isNew = false;
					payload.event = 'A';
					payload.reason = approveReason;
					payload.remarks = remarks.length > 0 ? remarks : '';
					secondaryReqBody.push(payload);
				}

				if (marketType === 'Primary') {
					const primaryResp = await updateWorkflowForOrder(primaryReqBody, 'Primary');
					setOrderFailedArray(primaryResp.data.filter((item) => !item.success));
					setShowOrderModal(true);
				} else {
					const secondaryResp = await updateWorkflowForOrder(secondaryReqBody, 'Secondary');
					setOrderFailedArray(secondaryResp.data.filter((item) => !item.success));
					setShowOrderModal(true);
				}
				// const primaryResp = await updateWorkflowForOrder(primaryReqBody, 'Primary');
				// const secondaryResp = await updateWorkflowForOrder(secondaryReqBody, 'Secondary');

				// const resp = [...primaryResp.data, ...secondaryResp.data];

				// setOrderFailedArray(resp.filter((item) => !item.success));
				// setShowOrderModal(true);
			}
		} catch (error) {
			console.log('Something went wrong', error);
		}
	};

	const approveModalOptionsPrimary = useSelector(
		(state) =>
			state.orderBook.controlStructure?.csList[0].controlStructureField.find(
				(e) => e.keyField === 'PMApproveReason'
			).lookupValue
	);

	const approveCancel = () => {
		setShowApproveModal(false);
		handleApproveModal();
	};

	const onChangeReason = (val) => {
		setApprovalReason(val);
	};

	const closeModal = (val) => {
		setShowOrderModal(val);
		setOrderFailedArray([]);
		setBoolean(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		handleApproveModal();
	};

	return (
		<>
			<CustomModal visible={showApproveModal}>
				<h1 className='aprroval'>
					<FileDoneOutlined /> Approval
				</h1>
				<h3 className='approve-heading' style={{ marginBottom: '20px' }}>
					Are you sure you want to approve the Order?
				</h3>
				<h3 className='approve-heading' style={{ marginBottom: '20px' }}>
					Please specify the reason to approve.
				</h3>
				{approveModalOptionsPrimary && (
					<Select
						size='large'
						onChange={onChangeReason}
						placeholder='Select reason to approve'
						bordered={true}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						style={{ width: '50%' }}
					>
						{approveModalOptionsPrimary.lookUpValues.map((eachOption, idx) => (
							<Option key={idx} value={eachOption[approveModalOptionsPrimary.returnColumn]}>
								{eachOption[approveModalOptionsPrimary.displayColumn]}
							</Option>
						))}
					</Select>
				)}
				<br />
				<Form.Item name='otherRejectReason' style={{ marginTop: '20px' }}>
					<Input
						maxLength={20}
						size='large'
						style={{ width: '50%' }}
						value={remarks}
						placeholder='Other Reasons'
						onChange={(e) => setRemarks(e)}
						required={approveReason === 'O' ? true : false}
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
				<div className='modal-footer'>
					<Button className='text-only-btn-cancel' key='back' type='text' onClick={approveCancel}>
						Cancel
					</Button>
					<Button
						key='submit'
						type='primary'
						onClick={handleApproveConfirm}
						size='large'
						style={{ backgroundColor: '#354081', borderRadius: '8px' }}
					>
						Approve
					</Button>
				</div>
			</CustomModal>
			<CustomModal visible={showOrderModal}>
				{orderFailedArray.length === 0 ? (
					<ActionSuccessModalScreen closeModal={closeModal} selectedRowKeys={selectedRowKeys} />
				) : (
					<ActionFailModalScreen
						errorArray={orderFailedArray}
						closeModal={closeModal}
						selectedRowKeys={selectedRowKeys}
						selectedRows={selectedRows}
					/>
				)}
			</CustomModal>
		</>
	);
};

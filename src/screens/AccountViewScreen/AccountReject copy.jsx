import { Button, Row, Form, Input, Select } from 'antd';
import { useState } from 'react';
import '../../screens/ProspectViewScreen/ProspectComponent/CardView.scss';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { updateAccountStatus } from '../../redux/actions/accountViewAction';
import { FileExcelOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const AccountReject = (props) => {
	const {
		showRejectModalFlag = false,
		accountId = '',
		isUpload = true,
		handleRejectModal,
		controlStructure
	} = props;

	const [showRejectModal, setShowRejectModal] = useState(true);
	const [rejectReason, setRejectReason] = useState('');
	const [inputBox, setInputBox] = useState(false);
	const [otherRejectReason, setOtherRejectReason] = useState('');

	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [deleteProspectMessage, setDeleteProspectMessage] = useState('');

	function onChange(value) {
		setRejectReason(value);
		//maybe used in the future
		// if (value === "O") {
		//   setInputBox(true);
		// } else {
		//   setInputBox(false);
		// }
	}

	const handleOtherRejectReasonChange = (e) => {
		setOtherRejectReason(e.target.value);
	};

	const handleRejectOk = async (rejectReason, otherRejectReason) => {
		try {
			let requestBody = [];

			let payload = {};
			payload.Scheme = accountId;
			payload.IsNew = false;
			payload.Event = 'R';
			payload.Reason = rejectReason;
			payload.Remark = otherRejectReason;

			// maybe used in the future
			// if (rejectReason === "O") {
			//   payload.Reason = "O";
			//   payload.Remark = otherRejectReason;
			// } else {
			//   payload.Reason = rejectReason;
			// }

			requestBody.push(payload);
			let response = await updateAccountStatus(requestBody);
			if (!response[0].success) {
				setShowSuccessFailureDeleteModal(true);
				setDeleteProspectMessage(response[0].message);
				setShowRejectModal(false);
			} else {
				setShowSuccessFailureDeleteModal(true);
				setDeleteProspectMessage(response[0].message);
				setShowRejectModal(false);
			}
		} catch (error) {
			console.log('Something went wrong', error);
		}
	};

	const rejectCancel = () => {
		setShowRejectModal(false);
		handleRejectModal();
	};

	const handleRejectConfirm = () => {
		handleRejectOk(rejectReason, otherRejectReason);
	};

	const handleSuccessFailureDeleteModalOk = () => {
		setShowSuccessFailureDeleteModal(false);
		handleRejectModal();
	};
	const RenderSuccessFailureDeleteModal = () => {
		return (
			<CustomModal
				visible={showSuccessFailureDeleteModal}
				handleOk={handleSuccessFailureDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FileExcelOutlined />
					</div>
					<div className='header-title'>Reject</div>
				</div>
				<div className='modal-body'>{deleteProspectMessage}</div>
				<div className='modal-footer'>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleSuccessFailureDeleteModalOk}
					>
						OK
					</Button>
				</div>
			</CustomModal>
		);
	};

	return (
		<>
			{/* <RejectAccountModal /> */}
			<RenderSuccessFailureDeleteModal />
			<CustomModal visible={showRejectModal} handleCancel={rejectCancel} handleOk={handleRejectOk}>
				<h1 className='aprroval'>
					<FileExcelOutlined /> Reject
				</h1>
				<h3 className='approve-heading' style={{ marginBottom: '20px' }}>
					Are you sure you want to reject the account?
				</h3>
				<div>
					{/* <Row>
              <h4 className="retirement-portfolio">Retirement Portfolio</h4>
            </Row>
            <Row>
              <span className="account-nature">Account Nature</span>
            </Row>
            <Row>
              <Badge className="badge">Advisory</Badge>
            </Row> */}
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
						// onFocus={onFocus}
						// onBlur={onBlur}
						// onSearch={onSearch}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{controlStructure &&
							controlStructure?.AccountTerminateReason.dropDownValue.map((option) => (
								<Select.Option key={option.dataValue} value={option.dataValue}>
									{option.displayValue}
								</Select.Option>
							))}
					</Select>
				</div>
				<br />

				<Form.Item name='otherRejectReason'>
					<Input
						maxLength={15}
						size='large'
						style={{ width: '50%' }}
						value={otherRejectReason}
						placeholder='Other Reasons'
						onChange={(e) => handleOtherRejectReasonChange(e)}
					/>
				</Form.Item>

				<Row>
					<div className='modal-footer'>
						<Button className='text-only-btn' key='back' type='text' onClick={rejectCancel}>
							Cancel
						</Button>
						<Button
							className='submit-btn'
							key='submit'
							type='primary'
							onClick={handleRejectConfirm}
						>
							Reject
						</Button>
					</div>
				</Row>
			</CustomModal>
		</>
	);
};

export default AccountReject;

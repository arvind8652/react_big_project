import { Button } from 'antd';
import { useState } from 'react';
import '../../screens/ProspectViewScreen/ProspectComponent/CardView.scss';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { updateAccountStatus } from '../../redux/actions/accountViewAction';
import { FileDoneOutlined } from '@ant-design/icons';

const AccountAccept = (props) => {
	const {
		showApproveModalFlag = false,
		accountId = '',
		isUpload = true,
		handleApproveModal
	} = props;
	const [showApproveModal, setShowApproveModal] = useState(showApproveModalFlag);
	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [deleteProspectMessage, setDeleteProspectMessage] = useState('');

	const approveCancel = () => {
		setShowApproveModal(false);
		handleApproveModal();
	};

	const handleApproveConfirm = async () => {
		try {
			let payload = [
				{
					scheme: accountId,
					isNew: false,
					event: 'A'
				}
			];
			let response = await updateAccountStatus(payload);
			if (!response[0].success) {
				setShowSuccessFailureDeleteModal(true);
				setDeleteProspectMessage(response[0].message);
				setShowApproveModal(false);
			} else {
				setShowSuccessFailureDeleteModal(true);
				setDeleteProspectMessage(response[0].message);
				setShowApproveModal(false);
			}
		} catch (error) {
			console.log('Something went wrong', error);
		}
	};

	const handleSuccessFailureDeleteModalOk = () => {
		setShowSuccessFailureDeleteModal(false);
		handleApproveModal();
	};
	const RenderSuccessFailureDeleteModal = () => {
		return (
			<CustomModal
				visible={showSuccessFailureDeleteModal}
				handleOk={handleSuccessFailureDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FileDoneOutlined />
					</div>
					<div className='header-title'>Approval</div>
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

	const ApproveAccountModal = () => {
		return (
			<CustomModal visible={showApproveModal}>
				<h1 className='aprroval'>
					<FileDoneOutlined /> Approval
				</h1>
				<h3 className='approve-heading' style={{ marginBottom: '20px' }}>
					Are you sure you want to approve the account?
				</h3>
				<div className='modal-footer'>
					<Button className='text-only-btn' key='back' type='text' onClick={approveCancel}>
						Cancel
					</Button>
					<Button className='submit-btn' key='submit' type='primary' onClick={handleApproveConfirm}>
						Approve
					</Button>
				</div>
			</CustomModal>
		);
	};

	return (
		<>
			<ApproveAccountModal />
			<RenderSuccessFailureDeleteModal />
		</>
	);
};

export default AccountAccept;

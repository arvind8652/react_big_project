import React, { useEffect, useState } from 'react';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import Assign from './Assign';
import SuccessModal from '../SuccessActionModal/SuccessModal';
import FailureActionModal from '../FailureActionModal/FailureActionModal';
import { postConvertProspectToClientApi } from '../../api/prospectListingApi';

const AssignModal = ({
	showAssignModal,
	setAssignModal,
	selectedRowKeys,
	setSelectedRowKeys,
	cs,
	setRefresh,
	selectedRows,
	setSelectedRows
}) => {
	const [required, setRequired] = useState(false);
	const [failedArray, setFailedArray] = useState([]);
	const [formData, setFormData] = useState({
		assignRelationManager: '',
		assignBranchName: '',
		assignReason: '',
		oReason: ''
	});

	// Cancel Assign
	const cancelModal = () => {
		setAssignModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		setFormData({ assignBranchName: '', assignRelationManager: '', assignReason: '', oReason: '' });
		setFailedArray([]);
		setRequired(false);
	};

	// Submit Assign
	const onAssign = () => {
		const { assignRelationManager, assignBranchName, assignReason, oReason } = formData;

		if (assignRelationManager && assignBranchName) {
			let finalObj = {
				ProspectIds: selectedRowKeys,
				Branch: assignBranchName,
				RelationshipManager: assignRelationManager,
				AssignReason: assignReason === 'O' ? oReason : assignReason
			};
			setRequired(false);
			postConvertProspectToClientApi(finalObj)
				.then((res) => {
					setFailedArray(res.data);
					// cancelModal();
				})
				.catch(() => {});
		} else {
			setRequired(true);
		}
	};
	const isFailure = failedArray.filter((item) => !item.success).length > 0;

	return (
		<CustomModal handleCancel={cancelModal} handleOk={onAssign} visible={showAssignModal}>
			{failedArray.length === 0 && (
				<Assign
					formData={formData}
					setFormData={setFormData}
					cs={cs}
					setAssignModal={setAssignModal}
					onAssign={onAssign}
					cancelModal={cancelModal}
					selectedRowKeys={selectedRowKeys}
					required={required}
				/>
			)}
			{failedArray.length !== 0 && !isFailure && (
				<SuccessModal
					selectedRowKeys={selectedRowKeys}
					closeModal={cancelModal}
					setRefresh={setRefresh}
				/>
			)}
			{failedArray.length !== 0 && isFailure && (
				<FailureActionModal
					errorArray={failedArray}
					selectedRowKeys={selectedRowKeys}
					closeModal={cancelModal}
					setRefresh={setRefresh}
					selectedRows={selectedRows}
				/>
			)}
		</CustomModal>
	);
};

export default AssignModal;

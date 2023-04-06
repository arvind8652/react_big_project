import React, { useState } from 'react';
import FailedActionsList from './FailedActionsList';
import FailScreen from './FailedScreen';
// import "./style.scss";

const FailureActionModal = ({
	selectedRowKeys,
	errorArray,
	closeModal,
	setRefresh,
	selectedRows
}) => {
	const [showMoreActions, setMoreActions] = useState(false);

	return (
		<>
			{!showMoreActions ? (
				<FailScreen
					errorArray={errorArray}
					selectedRowKeys={selectedRowKeys}
					setMoreActions={setMoreActions}
				/>
			) : (
				<FailedActionsList
					errorArray={errorArray}
					closeModal={closeModal}
					setRefresh={setRefresh}
					selectedRows={selectedRows}
				/>
			)}
		</>
	);
};

export default FailureActionModal;

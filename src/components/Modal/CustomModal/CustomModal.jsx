import { Modal } from 'antd';
import React from 'react';
import './customModal.scss';

function CustomModal({
	children,
	title = false,
	visible,
	handleCancel,
	handleOk,
	closable = false,
	width = '50vw',
	destroyOnClose = false
}) {
	return (
		<Modal
			title={title}
			className='confirm-modal-container'
			visible={visible}
			footer={null}
			onCancel={handleCancel}
			onOk={handleOk}
			width={width}
			closable={closable}
			centered
			destroyOnClose={destroyOnClose}
		>
			{children}
		</Modal>
	);
}

export default CustomModal;

import { Modal } from 'antd';
import React from 'react';
import './customModalWithCloseIcon.scss';

function CustomModalWithCloseIcon({ children, visible, handleCancel, handleOk }) {
	return (
		<Modal
			className='confirm-modal-container customModalWithCloseIcon'
			visible={visible}
			renderBody={''}
			footer={null}
			onCancel={handleCancel}
			onOk={handleOk}
			width='50vw'
			// closable={false}
			centered
		>
			{children}
		</Modal>
	);
}

export default CustomModalWithCloseIcon;

import React from 'react';
import { Button } from 'antd';
import { assets } from '../../constants/assetPaths';
import './style.scss';

const SuccessModal = ({ selectedRowKeys, setRefresh, closeModal }) => (
	<>
		<div className='modal-body'>
			<div className='action-success-screen'>
				<img src={assets.common.successTick} alt='success' className='success-logo' />
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className='title'>
						{selectedRowKeys.length}/{selectedRowKeys.length} Successful Action
					</div>
					<div className='subtitle'>Your action has been completed successfully</div>
				</div>
			</div>
			<div className='modal-footer'>
				<Button
					className='text-only-btn'
					type='text'
					onClick={() => {
						closeModal();
						setRefresh(true);
					}}
				>
					Ok
				</Button>
			</div>
		</div>
	</>
);

export default SuccessModal;

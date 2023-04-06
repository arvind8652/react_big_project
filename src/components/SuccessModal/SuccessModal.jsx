import React from 'react';
import './successModal.scss';
import { assets } from '../../constants/assetPaths';

const SuccessModal = ({ message, failTickmark }) => (
	<div className='modal-body'>
		<div>
			<img
				src={failTickmark ? assets.common.triangleExclamation : assets.common.successTick}
				alt='success'
				className='success-logo'
			/>
		</div>
		<div className='title'>{message}</div>
	</div>
);
export default SuccessModal;

import React from 'react';
import { Button } from 'antd';
import { assets } from '../../constants/assetPaths';
// import "./style.scss";

const FailScreen = ({ selectedRowKeys, errorArray, setMoreActions }) => (
	<>
		<div className='modal-body'>
			<div
				className='action-fail-screen'
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<img src={assets.common.triangleExclamation} alt='fail' className='fail-logo' />
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className='title'>
						{selectedRowKeys.length - errorArray.length}/{selectedRowKeys.length} Successful Action
					</div>
					<div className='subtitle'>
						{errorArray.length} action{errorArray.length > 1 && 's'} could not be completed.&nbsp;
						<div
							className='view-failed-actions-screen'
							onClick={() => {
								setMoreActions(true);
							}}
						>
							View
						</div>
					</div>
				</div>
			</div>
			<div className='modal-footer'>
				<Button className='text-only-btn' type='text'>
					Ok
				</Button>
			</div>
		</div>
	</>
);

export default FailScreen;

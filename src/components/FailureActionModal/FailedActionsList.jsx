import React from 'react';
import { Button, Table } from 'antd';
import { assets } from '../../constants/assetPaths';
// import "./style.scss";

const FailedActionsList = ({ errorArray, closeModal, setRefresh, selectedRows }) => {
	const renderRecordDetailsCol = (errObject) => (
		<div className='record-details'>
			<div>
				{selectedRows.map(
					(row) =>
						row.prospectId === errObject.refID && <strong key={row.customerCode}>{row.name}</strong>
				)}
			</div>
		</div>
	);
	const renderFailReasonCol = (message) => <div style={{ color: '#bc0573' }}>{message}</div>;
	const failTableColumns = [
		{
			float: 'right',
			title: 'Customer',
			dataIndex: 'name',
			key: 'avatar',
			// width: 300,
			render: (name, dataObject) => renderRecordDetailsCol(dataObject)
		},
		{
			float: 'right',
			title: 'Failed Reason',
			dataIndex: 'message',
			key: 'name',
			// width: 300,
			render: (message) => renderFailReasonCol(message)
		}
	];
	return (
		<>
			<div className='modal-header'>
				<img src={assets.common.triangleExclamation} alt='fail' className='header-icon fail-logo' />
				<div className='failed-actions-title'>Failed Actions</div>
			</div>
			<div>
				<Table
					className='failed-actions-list-container'
					rowClassName='failed-action-row'
					columns={failTableColumns}
					dataSource={errorArray}
					rowKey='mobile'
					showHeader={true}
					bordered={false}
					pagination={false}
					// authorizeCode={authorizeCode}
				/>
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
		</>
	);
};

export default FailedActionsList;

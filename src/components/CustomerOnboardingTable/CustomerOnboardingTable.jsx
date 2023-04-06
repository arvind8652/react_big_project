import React, { useState } from 'react';
import { Table, Popover, Button, Row, Col, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsisHAlt,
	faCaretCircleDown,
	faCaretCircleUp,
	faInfoCircle
} from '@fortawesome/pro-light-svg-icons';
import { useHistory } from 'react-router-dom';
import CustomerOnboardingTextSubText from './CustomerOnboardingTextSubText';
import './CustomerOnboardingTable.scss';
import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { connect } from 'react-redux';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const CustomerOnboardingTable = ({
	loading,
	onCellDefault,
	onCellFavourite,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	tableData,
	setShowEndorseModal,
	setShowApproveModal,
	setShowRejectModal,
	setShowUpgradeModal,
	setShowDowngradeModal,
	setShowTerminateModal,
	authorizeCode,
	authData,
	onRowClick = () => {}
}) => {
	const history = useHistory();
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);
	const handleRecordModify = (customerCode) => {
		const toObject = {
			pathname: '/dashboard/MyProspect/ProspectCreate',
			state: { screen: 'listing', data: customerCode }
		};
		history.push(toObject);
	};
	const renderTaxStatusColumn = (taxStatus, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.taxStatusName}</div>
			</div>
		);
	};
	const renderAvatarColumn = (profileImage, dataObject) => {
		return (
			<div>
				{dataObject.profileImage === null || dataObject.profileImage === 'U' ? (
					<AvatarLogo
						imgsrc={profileImage}
						profileName={dataObject.profileInitial}
						avatarSize={AvatarSize.medium}
					/>
				) : (
					<AvatarLogo
						imgsrc={profileImage}
						profileName={dataObject.profileInitial}
						avatarSize={AvatarSize.medium}
					/>
				)}
			</div>
		);
	};
	const renderProfileColumn = (profile, dataObject) => {
		if (!dataObject) return null;
		return (
			<div className='col-profile'>
				<div className='name'>{dataObject.customerName}</div>
				<div className='code-family'>
					<div>
						{dataObject?.otherIdNo ?? ''} | {dataObject.familyName}
					</div>
					<div className='profile-tags'>
						<div className='category' style={{ marginTop: '10px' }}>
							{dataObject.customerCategoryName}
						</div>
					</div>
				</div>
			</div>
		);
	};
	const renderBranchNameColumn = (branchName, dataObject) => {
		return <div className='col-text'>{dataObject.branchName}</div>;
	};
	const renderTypeColumn = (type, dataObject) => {
		return <div className='col-text'>{dataObject.typeName}</div>;
	};
	const renderStatusColumn = (status, dataObject) => {
		const myStatus = dataObject?.status?.split('%~');
		return (
			<Row>
				<Col span={20} className='col-text' style={{ background: '#f0f2fb', width: 'fit-content' }}>
					{myStatus[0] + (myStatus[1] ? ' ' + myStatus[1] : '')}
				</Col>
				{myStatus[0]?.includes('Rejected') && (
					<Col span={4}>
						<Tooltip
							title={`${dataObject?.reason ? dataObject?.reason : ''} ${
								dataObject?.remarks ? ' - ' + dataObject?.remarks : ''
							}`}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
						</Tooltip>
					</Col>
				)}
			</Row>
		);
	};

	const renderExpand = (dataObject) => {
		return (
			<div>
				<Row gutter={7}>
					<Col span={4}>
						<CustomerOnboardingTextSubText
							text={dataObject.fatcaClassificationName}
							subtext='FATCA Classification'
						/>
					</Col>
					<Col span={4}>
						<CustomerOnboardingTextSubText
							text={dataObject.politicallyExposed}
							subtext='Politically Exposed'
						/>
					</Col>
					<Col span={4}>
						<CustomerOnboardingTextSubText
							text={dataObject.potentiallyVulnerableName}
							subtext='Potentially Vulnerable'
						/>
					</Col>
					<Col span={4}>
						<CustomerOnboardingTextSubText text={dataObject.amlaName} subtext='AMLA' />
					</Col>
					<Col span={4}>
						<CustomerOnboardingTextSubText text={dataObject.bannedListName} subtext='Banned List' />
					</Col>
					<Col span={4}>
						<CustomerOnboardingTextSubText
							text={dataObject.riskProfileName}
							subtext='Risk Profile'
						/>
					</Col>
				</Row>
			</div>
		);
	};

	const renderMoreOptions = (customerCode, dataObject) => {
		const options = [];

		// if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify)) {
		//   options.push("Edit");
		// }
		// if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approveReject)) {
		//   options.push("Approve", "Reject");
		// }
		if (dataObject.workFlowFormType === 'Process' && dataObject.workFlowUserGroup === authData) {
			options.push();
		}
		if (
			dataObject.workFlowFormType === 'Modificaiton' &&
			dataObject.workFlowUserGroup === authData
		) {
			authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify) && options.push('Edit');
			authorizeModule(authorizeCode, CONSTANTS.authorizeCode.terminate) &&
				options.push('Terminate');
		}
		if (
			dataObject.workFlowFormType === 'ApproveReject' &&
			dataObject.workFlowUserGroup === authData
		) {
			authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approve) && options.push('Approve');
			authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approveReject) &&
				options.push('Reject');
		}

		const content = () => (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					lignItems: 'flex-start',
					paddingLeft: '20px'
				}}
			>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								option.toLowerCase() === 'edit' &&
									history.push('/dashboard/MyCustomers/CustomerEdit', {
										refID: customerCode,
										action: 'edit',
										refType: 'CLIENTREQADD'
									});
								// setSelectedRowKeys([...selectedRowKeys, customerCode]);
								// setSelectedRows([...selectedRows, dataObject]);
								setSelectedRowKeys([customerCode]);
								setSelectedRows([dataObject]);

								option.toLowerCase() === 'endorse' && setShowEndorseModal(true);
								option.toLowerCase() === 'approve' && setShowApproveModal(true);
								option.toLowerCase() === 'reject' && setShowRejectModal(true);
								// option.toLowerCase() === "upgrade" && setShowUpgradeModal(true);
								// option.toLowerCase() === "downgrade" && setShowDowngradeModal(true);
								option.toLowerCase() === 'terminate' && setShowTerminateModal(true);
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);

		return (
			<span
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className='col-more'>
					<Popover
						placement='bottomLeft'
						content={content}
						overlayClassName='customerOnboarding-listing-actions-popover'
					>
						<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
					</Popover>
				</div>
			</span>
		);
	};
	const columns = [
		{
			float: 'right',
			title: ' ',
			dataIndex: 'profileImage',
			key: 'avatar',
			width: 64,
			onCell: onCellDefault,
			render: (profileImage, dataObject) => renderAvatarColumn(profileImage, dataObject)
		},
		{
			float: 'left',
			title: 'Name',
			dataIndex: 'name',
			key: 'name',

			onCell: onCellDefault,
			render: (name, dataObject) => renderProfileColumn(name, dataObject)
		},
		{
			title: 'Tax Status',
			dataIndex: 'taxStatus',
			key: 'taxStatus',
			align: 'center',
			onCell: onCellDefault,
			render: (taxStatus, dataObject) => renderTaxStatusColumn(taxStatus, dataObject)
		},
		{
			title: 'Office Name',
			dataIndex: 'branchName',
			key: 'branchName',
			align: 'center',
			onCell: onCellDefault,
			render: (branchName, dataObject) => renderBranchNameColumn(branchName, dataObject)
		},
		{
			title: 'Type',
			key: 'type',
			dataIndex: 'type',
			align: 'center',
			onCell: onCellDefault,
			render: (type, dataObject) => renderTypeColumn(type, dataObject)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'left',
			onCell: onCellDefault,
			render: (status, dataObject) => renderStatusColumn(status, dataObject)
		},
		{
			float: 'left',
			title: '',
			dataIndex: 'customerCode',
			key: 'customerCode',

			render: (customerCode, dataObject) => renderMoreOptions(customerCode, dataObject)
		}
	];
	const rowSelection = {
		onChange: (rowKeys, rows) => {
			setSelectedRowKeys(rowKeys);
			setSelectedRows(rows);
		},
		onSelectAll: (enabled) => {
			if (enabled) {
				setShowSelectAllofAllPrompt(true);
			} else {
				setShowSelectAllofAllPrompt(false);
				setSelectedRowKeys([]);
				setSelectedRows([]);
			}
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === 'Disabled User',
			name: record.name
		}),
		selectedRowKeys: selectedRowKeys
	};

	const selectAllRecords = () => {
		setSelectedRowKeys(tableData.map((item) => item.customerCode));
		setSelectedRows(tableData);
	};
	const clearSelection = () => {
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};

	return (
		<div className='customerOnboarding-table-container'>
			{selectedRowKeys.length > 0 && (
				<span className='selected-record-count'>
					{showSelectAllofAllPrompt ? (
						<>
							<div>All {selectedRowKeys.length} Customers on this page are selected.&nbsp;</div>
							{selectedRowKeys.length !== tableData.length ? (
								<Button
									type='link'
									className='link'
									onClick={() => {
										selectAllRecords();
									}}
									style={{ padding: 0 }}
								>
									Select all {tableData.length} Customers
								</Button>
							) : (
								<Button
									type='link'
									className='link'
									onClick={() => {
										clearSelection();
									}}
									style={{ padding: 0 }}
								>
									Clear Selection
								</Button>
							)}
						</>
					) : (
						<div>
							{selectedRowKeys.length} Customer
							{selectedRowKeys.length > 1 ? 's' : ' '}
							&nbsp;on this page {selectedRowKeys.length > 1 ? 'are' : 'is'} selected.&nbsp;
						</div>
					)}
				</span>
			)}
			<Table
				id='customerOnboarding-table'
				loading={loading}
				rowClassName='customerOnboarding-list-table-row'
				rowKey='customerCode'
				rowSelection={rowSelection}
				columns={columns}
				dataSource={tableData}
				pagination={{
					position: ['topRight'],
					pageSize: 25,
					showSizeChanger: false,
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
				}}
				onRow={(rowIndex) => {
					return {
						onClick: (event) => {
							event.stopPropagation();
							onRowClick(rowIndex);
						} // click row
					};
				}}
				expandable={{
					expandedRowRender: (record) => renderExpand(record),
					rowExpandable: (record) => record.name !== 'Not Expandable',
					expandIcon: ({ expanded, onExpand, record }) =>
						expanded ? (
							<FontAwesomeIcon
								className='expandIcon'
								style={{ color: '#6770A2', fill: '#6770A2' }}
								icon={faCaretCircleUp}
								onClick={(e) => onExpand(record, e)}
							/>
						) : (
							<FontAwesomeIcon
								className='expandIcon'
								style={{ color: '#6770A2', fill: '#6770A2' }}
								icon={faCaretCircleDown}
								onClick={(e) => onExpand(record, e)}
							/>
						)
				}}
				expandIconColumnIndex={columns.length}
			/>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		authData: state.auth.user.userRole
	};
};

export default connect(mapStateToProps)(CustomerOnboardingTable);

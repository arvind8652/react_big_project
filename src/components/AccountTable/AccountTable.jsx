import React, { useEffect, useState } from 'react';
import { Table, Popover, Button, Row, Col, Avatar, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsisHAlt,
	faCaretCircleDown,
	faCaretCircleUp
} from '@fortawesome/pro-light-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
// import { addFavouriteProspectApi } from "../../api/prospectListingApi";
import AccountTextSubText from './AccountTextSubText';
import './AccountTable.scss';
import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { connect } from 'react-redux';
import { getAccountBaseAccess } from '../../api/accountCreateApi';
import { profileImageApi } from '../../api/accountViewApi';
const AccountTable = ({
	loading,
	onCellDefault,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	tableData,
	authData,
	setShowApproveModal,
	setShowRejectModal,
	setShowTerminateModal,
	onRowClick = () => {}
}) => {
	const history = useHistory();
	const { path } = useLocation();
	const [aMDetails, getAMDetails] = useState();
	const [getProfilePhoto, setGetProfilePhoto] = useState();
	const [investmentData, setInvestmentData] = useState();
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);

	const getAccountbaseAccessData = async () => {
		try {
			const resp = await getAccountBaseAccess(
				investmentData?.accountType,
				investmentData?.accountClassification
			);
			getAMDetails(resp.data);
		} catch (error) {}
	};

	const getProfileImage = async () => {
		try {
			const resp = await profileImageApi(investmentData?.primaryHolderCode);
			setGetProfilePhoto(resp.data);
		} catch (error) {
			console.log('error-->', error);
		}
	};

	useEffect(() => {
		getAccountbaseAccessData();
		getProfileImage();
	}, [investmentData?.primaryHolderCode]);

	const onTableRowExpand = (expanded, record) => {
		const keys = [];
		if (expanded) {
			keys.push(record.scheme);
		}
		setExpandedRowKeys(keys);
		setInvestmentData(record);
	};

	const handleRecordModify = (scheme, action) => {
		const toObject = {
			pathname: '/dashboard/MyAccount/AccountEdit',
			// state: { action: 'edit', refID: scheme } //{ screen: "listing", data: scheme },
			state: { action: action, refID: scheme, refType: 'ACCOUNTREQADD' } //{ screen: "listing", data: scheme },
		};
		history.push(toObject);
	};
	const renderAccountHoldingColumn = (holdingPatternName, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.holdingPatternName}</div>
				{dataObject.holdingPatternName !== 'Single' && (
					<div>
						{dataObject.lstJointDetails && dataObject.lstJointDetails.length > 2 ? (
							<Avatar.Group
								maxCount={2}
								size='large'
								maxStyle={{ color: '#696A91', backgroundColor: '#F0F2FB' }}
							>
								<AvatarLogo
									imgsrc={dataObject.lstJointDetails[0].profileImage}
									profileName={dataObject.lstJointDetails[0].profileInitials}
									avatarSize='large'
								/>
								<AvatarLogo
									imgsrc={dataObject.lstJointDetails[1].profileImage}
									profileName={dataObject.lstJointDetails[1].profileInitials}
									avatarSize='large'
								/>
								{dataObject.lstJointDetails?.slice(2)?.map((ele, index) => {
									return (
										<Tooltip key={index} title={ele.profileInitials} placement='top'>
											<AvatarLogo
												imgsrc={ele.profileImage}
												profileName={ele.profileInitials}
												avatarSize='large'
											/>
										</Tooltip>
									);
								})}
							</Avatar.Group>
						) : (
							<Avatar.Group
								maxCount={2}
								size='large'
								maxStyle={{ color: '#696A91', backgroundColor: '#F0F2FB' }}
							>
								{dataObject.lstJointDetails?.map((ele, index) => {
									return (
										<Tooltip key={index} title={ele.profileInitials} placement='top'>
											<AvatarLogo
												imgsrc={ele.profileImage}
												profileName={ele.profileInitials}
												avatarSize='large'
											/>
										</Tooltip>
									);
								})}
							</Avatar.Group>
						)}
					</div>
				)}
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
				<div className='name'>{dataObject.accountName}</div>
				<div className='code-family'>
					{/* <div>Account Nature</div> */}
					<div>
						{dataObject.schemeN ?? ''} |{/* {dataObject.scheme} */}
					</div>
					<div className='profile-tags'>
						<div className='category' style={{ marginTop: '10px' }}>
							{dataObject.accountNatureName}
						</div>
					</div>
				</div>
			</div>
		);
	};
	const renderAccountTypeColumn = (accountTypeName, dataObject) => (
		<div className='col-text'>{dataObject.accountTypeName}</div>
	);
	// const renderAccountClassificationColumn = (accountClassification, dataObject) => (
	// 	<div className='col-text'>{dataObject.reason && dataObject.reason}</div>
	// );

	const renderStatusColumn = (status, dataObject) => {
		const myStatus = dataObject?.status?.split('%~');
		return (
			<div className='profile-tags'>
				<div className='category' style={{ marginTop: '10px' }}>
					{myStatus ? myStatus[0] : null}
				</div>
				<div className='mystatus' style={{ marginTop: '10px' }}>
					{myStatus ? myStatus[1] : null}
				</div>
			</div>
		);
	};
	const renderExpandableIcon = (scheme, dataObject) => (
		<FontAwesomeIcon
			icon={faCaretCircleDown}
			style={{ color: '#0085FF' }}
			// onClick={toggleCollapsible}
		/>
	);
	const renderExpand = (dataObject, profileImage) => {
		return (
			<div className='ant-d-row-expand'>
				<Row gutter={7}>
					<Col span={2}>
						<div>
							<AvatarLogo
								imgsrc={getProfilePhoto?.fileString}
								profileName={getProfilePhoto?.profileInitial}
								avatarSize={AvatarSize.medium}
							/>
						</div>
					</Col>
					<Col span={4}>
						<AccountTextSubText
							text={dataObject.primaryHolderName}
							subtext={dataObject.primaryHolderCode}
						/>
					</Col>
					<Col span={3}>
						<AccountTextSubText text={dataObject.currency} subtext='Currency' />
					</Col>
					<Col span={6}>
						<AccountTextSubText
							text={dataObject.benchmarkName}
							subtext='Benchmark'
							style={{ textAlign: 'center' }}
						/>
					</Col>
					<Col span={4}>
						<AccountTextSubText text={dataObject.riskProfileCategoryName} subtext='Risk Profile' />
					</Col>
					<Col span={4}>
						{dataObject.investmentAccess != null ? (
							<>
								{aMDetails?.investment.length > 0 && (
									<>
										<AvatarLogo
											imgsrc={''}
											profileName={aMDetails?.investment[0].name}
											avatarSize={AvatarSize.small}
										/>
										{aMDetails?.investment[1] != null && aMDetails?.investment.length > 0 && (
											<>
												<AvatarLogo
													imgsrc={''}
													profileName={aMDetails?.investment[1].name}
													avatarSize={AvatarSize.small}
												/>
												{aMDetails?.investment.length > 2 && (
													<AvatarLogo
														imgsrc={''}
														profileName={`+${aMDetails?.investment.length - 2}`}
														avatarSize={AvatarSize.xs}
													/>
												)}
											</>
										)}
										<AccountTextSubText
											// text={dataObject.investmentAccess}
											subtext='Investment Access'
										/>
										{/* <Avatar size={32}>{`+${dataObject.investmentAccess.length}`}</Avatar> */}
									</>
								)}
							</>
						) : (
							<>
								<AvatarLogo
									imgsrc={''}
									profileName={dataObject.investmentAccess}
									avatarSize={AvatarSize.xs}
								/>
								<AccountTextSubText
									// text={dataObject.investmentAccess}
									subtext='Investment Access'
								/>
							</>
						)}
					</Col>
				</Row>
			</div>
		);
	};

	const renderMoreOptions = (scheme, dataObject) => {
		const options = ['Copy'];

		if (dataObject.workFlowFormType === 'Process' && dataObject.workFlowUserGroup === authData) {
			options.push();
		}
		if (
			dataObject.workFlowFormType === 'Modificaiton' &&
			dataObject.workFlowUserGroup === authData
		) {
			options.push('Edit');
			options.push('Terminate');
			// options.push('Copy');
		}
		if (
			dataObject.workFlowFormType === 'ApproveReject' &&
			dataObject.workFlowUserGroup === authData
		) {
			options.push('Approve');
			options.push('Reject');
		}
		const content = () => (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					paddingLeft: '20px'
				}}
			>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								setSelectedRowKeys([scheme]);
								setSelectedRows([dataObject]);
								option.toLowerCase() === 'edit' && handleRecordModify(scheme, 'edit');
								option.toLowerCase() === 'approve' && setShowApproveModal(true);
								option.toLowerCase() === 'reject' && setShowRejectModal(true);
								option.toLowerCase() === 'terminate' && setShowTerminateModal(true);
								option.toLowerCase() === 'copy' && handleRecordModify(scheme, 'copy');
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<div className='col-more'>
				<Popover
					placement='bottomLeft'
					content={content}
					overlayClassName='customerOnboarding-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};
	const columns = [
		{
			float: 'left',
			title: 'Account Name',
			dataIndex: 'name',
			key: 'name',

			onCell: onCellDefault,
			render: (name, dataObject) => renderProfileColumn(name, dataObject)
		},
		{
			title: 'Account Holding',
			dataIndex: 'holdingPatternName',
			key: 'holdingPatternName',
			align: 'center',
			onCell: onCellDefault,
			render: (holdingPatternName, dataObject) =>
				renderAccountHoldingColumn(holdingPatternName, dataObject)
		},
		{
			title: 'Type',
			dataIndex: 'accountTypeName',
			key: 'accountTypeName',
			align: 'center',
			onCell: onCellDefault,
			render: (accountTypeName, dataObject) => renderAccountTypeColumn(accountTypeName, dataObject)
		},
		// {
		// 	title: 'Rejection Reason',
		// 	key: 'accountClassification',
		// 	dataIndex: 'accountClassification',
		// 	align: 'center',
		// 	onCell: onCellDefault,
		// 	render: (accountClassification, dataObject) =>
		// 		renderAccountClassificationColumn(accountClassification, dataObject)
		// },
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
			dataIndex: 'scheme',
			key: 'scheme',

			render: (scheme, dataObject) => renderMoreOptions(scheme, dataObject)
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
		setSelectedRowKeys(tableData.map((item) => item.scheme));
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
				rowKey='scheme'
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
					rowExpandable: (record) => record.scheme !== 'Not Expandable',
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
						),
					onExpand: (expanded, record) => onTableRowExpand(expanded, record)
				}}
				expandIconColumnIndex={columns.length}
				expandedRowKeys={expandedRowKeys}
			/>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		authData: state.auth.user.userRole
	};
};

export default connect(mapStateToProps)(AccountTable);

import React, { useState } from 'react';
import { Table, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { ScRate } from '../StyledComponents/genericElements';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Space, Typography, Button } from 'antd';
import './CustomerTable.scss';
import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { executeSetChildMenuFlag } from '../../redux/actions/dashboardActions';
import { executeSelectedCustomerInfo } from '../../redux/actions/commonActions';
import RupeeOrNonRupee from '../RupeeOrNonRupee/RupeeOrNonRupee';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
const { Text } = Typography;

const CustomerTable = ({
	loading,
	onCellDefault,
	onCellFavourite,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	tableData,
	onProfileSelect,
	setShowUpgradeModal,
	setShowDowngradeModal,
	setShowEndorseModal,
	authorizeCode
}) => {
	const history = useHistory();
	const { path } = useRouteMatch();
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);

	const handleRecordModify = (customerCode) => {
		const toObject = {
			pathname: '/dashboard/MyCustomers/CustomerEdit',
			state: { refID: customerCode, action: 'edit', refType: 'CLIENTADD' }
		};
		history.push(toObject);
	};

	const renderContactColumn = (contact, dataObject) => {
		// dataObject = JSON.parse(dummyData);
		return (
			<div className='col-text'>
				<div>{dataObject.mobileNo}</div>
				<div>{dataObject.emailID}</div>
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
	const renderProfileColumn = (name, dataObject) => {
		if (!dataObject) return null;

		return (
			<div className='col-profile'>
				<div className='name'>{dataObject.customerName}</div>
				<div className='code-family'>
					<div>
						{dataObject?.otherIdNo} | {dataObject?.familyName}
					</div>
					<div className='profile-tags'>
						<div className='category' style={{ marginTop: '10px' }}>
							{dataObject?.customerCategory}
						</div>
					</div>
				</div>
			</div>
		);
	};
	const renderAUMColumn = (aum, dataObject) => {
		return (
			<div className='col-text'>
				{dataObject?.currencySymbol}
				&nbsp;
				<RupeeOrNonRupee amount={dataObject?.aum} />
			</div>
		);
	};

	const renderTypeColumn = (customerType, dataObject) => {
		return <div className='col-text'>{customerType}</div>;
	};

	const renderAccountsColumn = (lstAccountCode, dataObject) => {
		return (
			<Space size={4}>
				{lstAccountCode.length !== 0 &&
					lstAccountCode.slice(0, 2).map((item, index) => {
						return item.profileImage === 'U' || item.profileImage === null ? (
							<>
								<div
									title={item.cutomerName}
									key={index}
									style={{
										width: '28px',
										height: '28px',
										background: '#F0F2FB',
										padding: '10px',
										borderRadius: '50%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: '#F0F2FB'
									}}
								>
									{item.lstAccountCode}
								</div>
							</>
						) : (
							<span
								style={{
									width: '30px',
									height: '30px',
									borderRadius: '50%',
									backgroundColor: '#F0F2FB',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<Text style={{ fontSize: '12px' }}>{item.accCode}</Text>
							</span>
						);
					})}
				{lstAccountCode.length > 2 ? (
					<span
						style={{
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							backgroundColor: '#F0F2FB',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Text style={{ fontSize: '12px' }}>+{lstAccountCode.length - 2}</Text>
					</span>
				) : (
					''
				)}
			</Space>
		);
	};

	const renderFavourite = (customerCode, dataObject) => {
		return (
			// <div
			//   className="col-more"
			//   onClick={(e) => {
			//     e.stopPropagation();
			//     addFavouriteCustomerApi(
			//       dataObject.customerCode,
			//       CONSTANTS.progNames.CUSTOMERLIST
			//     ).then((res) => {
			//
			//       if (res.data) {
			//         // executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
			//       }
			//     });
			//   }}
			// >
			//   <div
			//   // onClick={(e) => {
			//   //   toggleFavourite(e);
			//   // }}
			//   >
			//     {dataObject.IsFavourite ? (
			//       <span className="favourite-icon active">&#9733;</span>
			//     ) : (
			//       <span className="favourite-icon inactive">&#9734;</span>
			//     )}
			//   </div>
			// </div>

			<div className='col-more'>
				<div>
					<ScRate allowHalf={false} count={1} value={dataObject.isFavourite} />
				</div>
			</div>
		);
	};

	function handleCreateOpportunityClick() {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate'
		};

		history.push(toObject);
	}

	function handleCreateTaskClick() {
		const toObject = {
			pathname: '/dashboard/TaskBoard/TaskCreate'
		};

		history.push(toObject);
	}

	function handleRecordInteractionClick() {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	}
	function handleProfileInteractionClick(selectedRows) {
		onProfileSelect(selectedRows);
	}

	function handlePortfolioHoldingsClick(selectedRows) {
		executeSetChildMenuFlag(true);
		const customerInfo = {
			customerCode: selectedRows.customerCode,
			customerName: selectedRows.customerName,
			familyName: selectedRows.familyName,
			profileImage: selectedRows.profileImage,
			type: 'customer'
		};
		executeSelectedCustomerInfo(customerInfo);
		const toObject = {
			pathname: '/dashboard/PortfolioOverview'
			// state: { CustomerID: selectedRows.customerCode },
		};

		history.push(toObject);
		// onPortfolioHoldingsSelect(selectedRows)
	}

	const handleTradeBookClick = (selectedRows) => {
		const toObject = {
			pathname: '/dashboard/CustomerTradeBook/listing',
			state: {
				clientId: selectedRows.customerCode,
				tradeBookType: 'CustomerTradeBook'
			}
		};

		history.push(toObject);
	};

	const renderMoreOptions = (customerCode, dataObject) => {
		const options = [
			'Portfolio Overview',
			'Create Task',
			'Create Interaction',
			'Create Opportunity'
		];

		if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify)) {
			options.push('Edit');
		}
		if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.downgrade)) {
			options.push('Downgrade');
		}
		if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.upgrade)) {
			options.push('Upgrade');
		}
		if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.assign)) {
			options.push('Assign');
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
								// setSelectedRowKeys([...selectedRowKeys, customerCode]);
								// setSelectedRows([...selectedRows, dataObject]);
								setSelectedRowKeys([customerCode]);
								setSelectedRows([dataObject]);
								option.toLowerCase() === 'upgrade' && setShowUpgradeModal(true);
								option.toLowerCase() === 'downgrade' && setShowDowngradeModal(true);
								// handleDowngradeClick();
								option.toLowerCase() === 'edit' && handleRecordModify(customerCode);
								// option.toLowerCase() === "create opportunity" &&
								//   handleCreateOpportunityClick();
								// option.toLowerCase() === "create task" &&
								//   handleCreateTaskClick();
								// option.toLowerCase() === "record interaction" &&
								//   handleRecordInteractionClick();
								// option.toLowerCase() === "profile" &&
								//   handleProfileInteractionClick(dataObject);
								option.toLowerCase() === 'portfolio overview' &&
									handlePortfolioHoldingsClick(dataObject);
								// option.toLowerCase() === "trade book" &&
								//   handleTradeBookClick(dataObject);
								option.toLowerCase() === 'assign' && setShowEndorseModal(true);
								option.toLowerCase() === 'create task' &&
									history.push('TaskBoard/TaskCreate', {
										screen: 'task-list',
										refType: 'CLIENTADD',
										data: dataObject,
										mode: 'create'
									});
								option.toLowerCase() === 'create interaction' &&
									history.push('MyInteractions/InteractionCreate', {
										screen: 'customer-list',
										refType: 'CLIENTADD',
										data: dataObject,
										mode: 'create'
									});
								option.toLowerCase() === 'create opportunity' &&
									history.push('MyOpportunity/OpportunityCreate', {
										screen: 'customer-list',
										refType: 'CLIENTADD',
										data: dataObject,
										mode: 'create'
									});
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
					overlayClassName='myCustomer-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};

	const columns = [
		{
			float: 'right',
			title: ' ',
			dataIndex: 'profileImage',
			// key: 'avatar',
			key: 'rowNumber',
			width: 64,
			onCell: onCellDefault,
			render: (profileImage, dataObject) => renderAvatarColumn(profileImage, dataObject)
		},
		{
			float: 'right',
			title: 'Name',
			dataIndex: 'CustomerName',
			// key: 'CustomerName',
			key: 'rowNumber',

			onCell: onCellDefault,
			render: (name, dataObject) => renderProfileColumn(name, dataObject)
		},
		{
			float: 'left',
			title: 'Contact',
			dataIndex: 'Contact',
			// key: 'Contact',
			key: 'rowNumber',
			onCell: onCellDefault,
			render: (contact, dataObject) => renderContactColumn(contact, dataObject)
		},
		{
			float: 'left',
			title: 'AUM',
			dataIndex: 'AUM',
			// key: 'AUM',
			key: 'rowNumber',
			onCell: onCellDefault,
			render: (aum, dataObject) => renderAUMColumn(aum, dataObject)
		},
		{
			float: 'left',
			title: 'Type',
			// key: 'customerType',
			key: 'rowNumber',
			dataIndex: 'customerType',
			width: 150,
			onCell: onCellDefault,
			render: (customerType, dataObject) => renderTypeColumn(customerType, dataObject)
		},
		{
			// float: "left",
			title: 'Accounts',
			dataIndex: 'lstAccountCode',
			// key: 'lstAccountCode',
			key: 'rowNumber',
			width: 364,
			onCell: onCellDefault,
			render: (lstAccountCode, dataObject) => renderAccountsColumn(lstAccountCode, dataObject)
		},
		{
			float: 'left',
			title: '',
			dataIndex: 'customerCode',
			// key: 'customerCode',
			key: 'rowNumber',
			onCell: onCellFavourite,
			render: (customerCode, dataObject) => renderFavourite(customerCode, dataObject)
		},
		{
			float: 'left',
			title: '',
			dataIndex: 'customerCode',
			// key: 'customerCode',
			key: 'rowNumber',
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
			disabled: record.CustomerName === 'Disabled User',

			name: record.CustomerName
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
		<div className='myCustomer-table-container'>
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
				loading={loading}
				rowClassName='myCustomer-list-table-row'
				// rowKey='customerCode'
				rowKey='rowNumber'
				rowSelection={rowSelection}
				columns={columns}
				dataSource={tableData}
				pagination={{
					position: ['topRight'],
					pageSize: 25,
					showSizeChanger: false,
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
				}}
			/>
		</div>
	);
};

export default CustomerTable;

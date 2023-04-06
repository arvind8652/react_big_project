import React, { useState } from 'react';
import { Popover, Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import './opportunityTable.scss';
import { ScRate, ScTable } from '../StyledComponents/genericElements';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../Avatar/AvatarLogo';
import RupeeOrNonRupee from '../RupeeOrNonRupee/RupeeOrNonRupee';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const OpportunityTable = ({
	loading,
	onCellDefault,
	onCellFavourite,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	opportunityStageData,
	setOpportunityStageData,
	setShowUpdateStageModal,
	tableData,
	miniMode,
	onSortSelect,
	sortBy,
	valueFiltered,
	authorizeCode
}) => {
	if (valueFiltered) {
		onSortSelect(sortBy);
	}
	const [showTitleStageModal, setShowTitleStageModal] = useState(false);
	const { TextArea } = Input;
	const handleCancel = () => {
		setShowTitleStageModal(false);
	};

	const history = useHistory();
	const { path } = useRouteMatch();
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);
	// render table columns
	const renderOpportunityColumn = (opportunityName, dataObject) => {
		return (
			<div className='col-text col-opportunity-name'>
				<div>{dataObject.opportunityName}</div>
				<div className='status-tag'>{dataObject.isOpen ? 'Open' : 'Closed'}</div>
			</div>
		);
	};
	const renderDueDateColumn = (dueDate, dataObject) => {
		return (
			<div className='col-text'>
				<div>{moment(dataObject.dueDate).format('DD MMM YYYY')}</div>
			</div>
		);
	};
	const renderStageColumn = (stage, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.stageName}</div>
			</div>
		);
	};
	const renderClientProspectProfile = (clientProspectName, dataObject) => {
		return (
			<div className='col-profile'>
				<div>
					<AvatarLogo
						imgsrc={dataObject.profileImage}
						profileName={dataObject.profileInitial}
						avatarSize={AvatarSize.small}
					/>
				</div>
				<div className='profile-details'>
					<div>{dataObject.clientProspectName}</div>
					<div className='profile-tag'>
						{dataObject.tagName &&
							dataObject.tagName.charAt(0).toUpperCase() +
								dataObject.tagName.substring(1).toLowerCase()}
					</div>
				</div>
			</div>
		);
	};
	const renderFavourite = (opportunityId, dataObject) => {
		return (
			<div
				className='col-more'
				// onClick={(e) => {
				//   addFavouriteOpportunityApi(
				//     dataObject.opportunityId,
				//     CONSTANTS.progNames.OPPORTUNITYADD
				//   ).then((res) => {
				//     if (res.data) {
				//       // executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
				//     }
				//   });
				// }}
			>
				<div
				// onClick={(e) => {
				//   toggleFavourite(e);
				// }}
				>
					<ScRate allowHalf={false} count={1} value={dataObject.isFavourite} />
					{/* {dataObject.isFavourite ? (
            <span className="favourite-icon active">&#9733;</span>
          ) : (
            // <FontAwesomeIcon icon={faStar} size="2x" className="favourite-icon" />
            <span className="favourite-icon inactive">&#9734;</span>
          )} */}
				</div>
			</div>
		);
	};
	const renderMoreOptions = (opportunityId, dataObject) => {
		const options = [
			// 'Modify',
			// 'Closed Won',
			// 'Closed Missed',
			// 'Take Note',
			'Create Task',
			'Create Interaction',
			'Create New Opportunity'
		].filter((type) => {
			switch (type) {
				case 'Modify':
					return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify);
				default:
					return true;
			}
		});

		// if (dataObject?.openOrClosed?.toLowerCase() === 'closed') {
		// 	var index = options.indexOf('Modify');
		// 	if (index !== -1) {
		// 		options.splice(index, 1);
		// 	}
		// }
		if (dataObject?.openOrClosed?.toLowerCase() !== 'closed') {
			options.push('Modify', 'Closed Won', 'Closed Missed');
		}
		const onMoreMenuSelect = (task) => {
			let toObject;
			switch (task) {
				case 'Modify':
					toObject = {
						pathname: miniMode ? `MyOpportunity/opportunityCreate` : `${path}/opportunityCreate`,
						state: { screen: 'list', data: opportunityId, mode: 'edit' }
					};
					history.push(toObject);
					break;
				case 'Closed Won':
					setOpportunityStageData({
						...opportunityStageData,
						recordId: opportunityId,
						status: 'CLOSE',
						stage: 'WON'
					});
					setShowUpdateStageModal(true);
					break;
				case 'Closed Missed':
					setOpportunityStageData({
						...opportunityStageData,
						recordId: opportunityId,
						status: 'CLOSE',
						stage: 'LOSS'
					});
					setShowUpdateStageModal(true);
					break;

				// case 'Take Note':
				// 	setShowTitleStageModal(true);
				// 	break;
				case 'Create Task':
					toObject = {
						pathname: `TaskBoard/TaskCreate`,
						state: { screen: 'task-list', data: dataObject, mode: 'create' }
					};
					history.push(toObject);
					break;
				case 'Create Interaction':
					// toObject = { pathname: `MyInteractions/InteractionCreate` };
					toObject = {
						pathname: `MyInteractions/InteractionCreate`,
						state: {
							screen: 'interaction-list',
							data: dataObject,
							mode: 'create'
						}
					};
					history.push(toObject);
					break;
				case 'Create New Opportunity':
					toObject = {
						pathname: miniMode ? `MyOpportunity/OpportunityCreate` : `${path}/OpportunityCreate`,
						// state: { screen: "list", data: dataObject, mode: "create" },
						state: { screen: 'list', data: opportunityId, mode: 'create-new' }
					};
					history.push(toObject);
					break;
				default:
					break;
			}
		};
		const content = () => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{options?.sort().map((option, index) => {
					return (
						<div
							key={index}
							className={`row-action-option ${
								dataObject &&
								dataObject.openOrClosed &&
								dataObject.openOrClosed.toLowerCase() === 'closed' &&
								['Modify', 'Closed Won', 'Closed Missed'].includes(option) &&
								'disabled'
							}`}
						>
							<span
								onClick={(e) => {
									// if (
									//   dataObject &&
									//   dataObject.openOrClosed &&
									//   (dataObject.openOrClosed.toLowerCase() !== "closed" ||
									//     e.target.innerHTML === "Create New Opportunity")
									// ) {
									onMoreMenuSelect(e.target.innerHTML);
									setSelectedRowKeys([opportunityId]);
									setSelectedRows([dataObject]);
									//}
								}}
							>
								{option}
							</span>
						</div>
					);
				})}
			</div>
		);
		return (
			<div
				className='col-more'
				// onClick={(e) => {
				//   e.stopPropagation();
				// }}
			>
				<Popover
					placement='bottomLeft'
					content={content}
					overlayClassName='opportunity-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};
	const columns = [
		{
			// width: 364,
			width: 200,
			title: 'Opportunity',
			dataIndex: 'opportunityName',
			key: 'opportunityName',
			onCell: onCellDefault,
			render: (opportunityName, dataObject) => renderOpportunityColumn(opportunityName, dataObject)
		},
		{
			width: 100,
			title: 'Target',
			dataIndex: 'targetAmount',
			key: 'targetAmount',
			onCell: onCellDefault,
			render: (amount, dataObject) => (
				// <div>{"$"} <RupeeOrNonRupee amount={amount} /></div>
				<div>
					{dataObject.currencySymbol} <RupeeOrNonRupee amount={amount} />
				</div>
			)
		},
		{
			//  width: window.innerWidth < 1400 ? 256 : 156,
			// width: window.innerWidth < 1400 ? 120 : 30,
			width: 100,
			title: 'Due Date',
			dataIndex: 'dueDate',
			key: 'dueDate',
			onCell: onCellDefault,
			render: (dueDate, dataObject) => renderDueDateColumn(dueDate, dataObject)
		},
		{
			width: 150,
			title: 'Stage',
			key: 'stage',
			dataIndex: 'stage',
			onCell: onCellDefault,
			render: (stage, dataObject) => renderStageColumn(stage, dataObject)
		},
		{
			// float: "left",
			title: 'Client / Prospect Name',
			dataIndex: 'clientProspectName',
			key: 'clientProspectName',
			// width: 364,
			width: 230,
			onCell: onCellDefault,
			render: (clientProspectName, dataObject) =>
				renderClientProspectProfile(clientProspectName, dataObject)
		},
		{
			title: '',
			dataIndex: 'opportunityId',
			key: 'opportunityId',
			onCell: onCellFavourite,
			render: (opportunityId, dataObject) => renderFavourite(opportunityId, dataObject)
		},
		{
			title: '',
			dataIndex: 'opportunityId',
			key: 'opportunityId',
			render: (opportunityId, dataObject) => renderMoreOptions(opportunityId, dataObject)
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
			// Column configuration not to be checked
			name: record.name
		}),
		selectedRowKeys
	};
	const selectAllRecords = () => {
		setSelectedRowKeys(tableData.map((item) => item.opportunityId));
		setSelectedRows(tableData);
	};
	const clearSelection = () => {
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	return (
		<>
			<div className='opportunity-table-container'>
				{!miniMode && selectedRowKeys.length > 0 && (
					<span className='selected-record-count'>
						{showSelectAllofAllPrompt ? (
							<>
								<div>All {selectedRowKeys.length} Leads on this page are selected.&nbsp;</div>
								{selectedRowKeys.length !== tableData.length ? (
									<Button
										type='link'
										className='link'
										onClick={() => {
											selectAllRecords();
										}}
										style={{ padding: 0 }}
									>
										Select all {tableData.length} Opportunities
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
								{selectedRowKeys.length} Opportunit
								{selectedRowKeys.length > 1 ? 'ies' : 'y'}
								&nbsp;on this page {selectedRowKeys.length > 1 ? 'are' : 'is'} selected.&nbsp;
							</div>
						)}
					</span>
				)}
				<ScTable
					id='opportunity-table'
					loading={loading}
					rowClassName='opportunity-list-table-row'
					rowKey='opportunityId'
					rowSelection={miniMode ? null : rowSelection}
					// onRow={onRow}
					columns={columns}
					dataSource={miniMode ? tableData.filter((item, index) => index < 10) : tableData}
					backgroundColor={miniMode ? '#F0F2FB' : '#ffffff'}
					scroll={{
						y: miniMode ? '30vw' : false
					}}
					pagination={
						miniMode
							? false
							: {
									position: ['topRight'],
									pageSize: 25,
									//  size: "small",
									showSizeChanger: false,
									showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
							  }
					}
					sticky
				/>
			</div>
		</>
	);
};

export default OpportunityTable;

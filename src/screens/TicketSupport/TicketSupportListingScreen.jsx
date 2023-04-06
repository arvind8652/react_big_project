import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Drawer, Menu, Dropdown, Tooltip, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import './TaskListingScreen.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { assets } from '../../constants/assetPaths';
import { faTrashAlt, faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { faFilter, faArrowAltToBottom, faThLarge } from '@fortawesome/pro-solid-svg-icons';
import { connect } from 'react-redux';
// import {
// 	executeGetAllTaskData,
// 	executeGetTaskListingCs
// } from '../../redux/actions/taskListingActions';
// import { executeGetInteractionAdvancedFilter } from '../../redux/actions/interactionListingActions';
import { authorizeModule, exportJSON, generateCsObject } from '../../utils/utils';
// import {
// 	deleteSelectedTaskApi,
// 	deleteSelectedTaskApiwithAllOccurrence
// } from '../../api/taskListingApi';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import GenericAdvancedFilterDrawer from '../../components/GenericAdvancedFilter/GenericAdvancedFilter';
import BackToTop from '../../components/BackToTop/BackToTop';
import TicketSupportTable from '../../components/TicketSupportTable/TicketSupportTable';
import TopBarHeader from '../../components/TopBarHeader/TopBarHeader';
import { CONSTANTS } from '../../constants/constants';
import { ScButtonPrimary, ScButtonText } from '../../components/StyledComponents/genericElements';
// import TicketSupportListingCard from './TaskListingCard';
import { faThList } from '@fortawesome/free-solid-svg-icons';

const TicketSupportListing = () => {
	const [loading, setLoading] = useState();
	// const defaultAdvState = { Dropdown: {}, Autocomplete: {}, Checkbox: {}, DateRange: {} };
	const [cardViewMode, setCardViewMode] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteFailedArray, setDeleteFailedArray] = useState();

	const [showFailedActions, setShowFailedActions] = useState(false);

	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	// const [localTaskData, setLocalTaskData] = useState(allTaskData);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [value, setValue] = useState(1);
	const [filterBy, setFilterBy] = useState('Show All');
	const [sortBy, setSortBy] = useState('Due Date (Near to Far)');
	const [showDrawer, setShowDrawer] = useState(false);
	const cancelOperation = (operationName) => {
		operationName === 'delete' && setShowDeleteModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};
	const handleConfirmDeleteModalOk = () => {
		// const arraylist = selectedRows.map((item) => item.activityID);
		// const selectedIDsList = selectedRows.map((item) => item.id);
		// if (value === 1) {
		// 	deleteSelectedTaskApi(selectedIDsList).then((res) => {
		// 		// setShowSuccessFailureDeleteModal(true);
		// 		// setDeleteInteractionMessage(res.data[0].message);
		// 		// setShowDeleteModal(false);
		// 		setDeleteFailedArray(res.data.filter((status) => !status.success));
		// 	});
		// } else {
		// 	deleteSelectedTaskApiwithAllOccurrence(arraylist).then((res) => {
		// 		// setShowSuccessFailureDeleteModal(true);
		// 		// setDeleteInteractionMessage(res.data[0].message);
		// 		// setShowDeleteModal(false);
		// 		setDeleteFailedArray(res.data.filter((status) => !status.success));
		// 	});
		// }
		// deleteSelectedTaskApi(selectedRowKeys).then((res) => {
		//   setDeleteFailedArray(res.data.filter((status) => !status.success));
		// });
	};
	const closeModal = (operationName) => {
		setDeleteFailedArray();
		operationName === 'delete' && setShowDeleteModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		// executeGetAllTaskData(setLocalTaskData, setLoading);
	};
	const RenderConfirmDeleteModal = () => {
		const ConfirmScreen = () => (
			<>
				<div className='modal-header'>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Support Ticket</div>
				</div>
				<div className='modal-body'>
					Are you sure you want to delete
					{selectedRowKeys.length > 1
						? ` ${selectedRowKeys.length} `
						: selectedRowKeys.length === 1 && ' '}
					selected record{selectedRowKeys.length > 1 ? 's' : ' '}?
					<div className='modal-radio' style={{ paddingTop: '30px' }}>
						<div className='modal-body-subtext'>
							<img src={assets.common.triangleExclamation} alt='fail' className='subtext-icon' />
							<div className='modal-subtext'>
								<span className='subtext-title'>
									{/* Warning: All open opportunities for selected Prospect/s shall be marked as Missed. */}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='modal-footer'>
					<ScButtonText
						key='back'
						type='text'
						onClick={() => {
							cancelOperation('delete');
						}}
					>
						Cancel
					</ScButtonText>
					<ScButtonPrimary key='submit' type='primary' onClick={handleConfirmDeleteModalOk}>
						Delete
					</ScButtonPrimary>
					{/* <Button
						className='text-only-btn'
						key='back'
						type='text'
						onClick={() => {
							cancelOperation('delete');
						}}
					>
						Cancel
					</Button>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleConfirmDeleteModalOk}
					>
						Delete
					</Button> */}
				</div>
			</>
		);
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('delete');
				}}
				handleOk={handleConfirmDeleteModalOk}
				visible={showDeleteModal}
			>
				{typeof deleteFailedArray === 'undefined' ? (
					<ConfirmScreen />
				) : deleteFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='delete' />
				) : (
					<ActionFailModalScreen errorArray={deleteFailedArray} operationName='delete' />
				)}
			</CustomModal>
		);
	};
	const ActionSuccessModalScreen = ({ operationName }) => (
		<>
			<div className='modal-body'>
				<div className='action-success-screen'>
					<img src={assets.common.successTick} alt='success' className='success-logo' />
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div className='title'>
							{selectedRowKeys.length}/{selectedRowKeys.length} Successful Action
						</div>
						<div className='subtitle'>You action has been completed successfully</div>
					</div>
				</div>
				<div className='modal-footer'>
					<Button
						className='text-only-btn'
						type='text'
						onClick={() => {
							closeModal(operationName);
						}}
					>
						Ok
					</Button>
				</div>
			</div>
		</>
	);
	const ActionFailModalScreen = ({ errorArray, operationName }) => {
		const FailScreen = () => (
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
								{selectedRowKeys.length - errorArray.length}/{selectedRowKeys.length} Successful
								Action
							</div>
							<div className='subtitle'>
								{errorArray.length} action{errorArray.length > 1 && 's'} could not be
								completed.&nbsp;
								<div
									className='view-failed-actions-screen'
									onClick={() => {
										setShowFailedActions(true);
									}}
								>
									View
								</div>
							</div>
						</div>
					</div>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							type='text'
							onClick={() => {
								closeModal(operationName);
							}}
						>
							Ok
						</Button>
					</div>
				</div>
			</>
		);
		const ListFailedActionsScreen = () => {
			const renderRecordDetailsCol = (errObject) => (
				<div className='record-details'>
					<div>
						<strong>{errObject.name}</strong>
					</div>
					<div>{errObject.mobile}</div>
				</div>
			);
			const renderFailReasonCol = (message) => <div className='failure-reason'>{message}</div>;
			const failTableColumns = [
				{
					float: 'right',
					title: '',
					dataIndex: 'name',
					key: 'avatar',
					// width: 300,
					render: (name, dataObject) => renderRecordDetailsCol(dataObject)
				},
				{
					float: 'right',
					title: '',
					dataIndex: 'message',
					key: 'name',
					// width: 300,
					render: (message) => renderFailReasonCol(message)
				}
			];
			return (
				<>
					<div className='modal-header'>
						<img
							src={assets.common.triangleExclamation}
							alt='fail'
							className='header-icon fail-logo'
						/>
						<div className='failed-actions-title'>Failed Actions</div>
					</div>
					<div
						className='modal-body'
						style={{
							height: 250,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							overflow: 'scroll'
						}}
					>
						<Table
							className='failed-actions-list-container'
							rowClassName='failed-action-row'
							columns={failTableColumns}
							dataSource={errorArray}
							rowKey='mobile'
							showHeader={false}
							bordered={false}
							pagination={false}
						/>
					</div>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							type='text'
							onClick={() => {
								closeModal(operationName);
							}}
						>
							Ok
						</Button>
					</div>
				</>
			);
		};
		return <>{!showFailedActions ? <FailScreen /> : <ListFailedActionsScreen />}</>;
	};
	const onFilterSelect = (value) => {
		// filter operation
		let allTaskData;
		let filteredTaskList;
		switch (value) {
			case 'Show All':
				filteredTaskList = allTaskData;

				break;
			case 'Open Only':
				filteredTaskList = allTaskData && allTaskData.filter((item) => item.activityStatus === 'O');
				break;
			case 'Recently Created':
				filteredTaskList =
					allTaskData &&
					allTaskData.filter((item) => {
						const now = moment();
						const date = moment(item.activityDate);
						return item.version && item.version === 1;
					});
				break;
			case 'Recently Modified':
				filteredTaskList =
					allTaskData &&
					allTaskData.filter((item) => {
						const now = moment();
						const date = moment(item.activityDate);
						return item.version && item.version > 1;
					});
				break;
			case 'Due in 7 Days':
				filteredTaskList = allTaskData && allTaskData.filter((item) => item.dueDays <= 7);
				break;
			case 'Due in 15 Days':
				filteredTaskList = allTaskData && allTaskData.filter((item) => item.dueDays <= 15);
				break;
			case 'Due in 30 Days':
				filteredTaskList = allTaskData && allTaskData.filter((item) => item.dueDays <= 30);
				break;
			default:
				break;
		}
		if (filteredTaskList) {
			setFilterBy(value);
			setLocalTaskData(filteredTaskList);
		} else {
			setLocalTaskData(allTaskData);
		}
		setLoading(false);
	};
	const onSortSelect = (value) => {
		// sort operation
		let sortedTaskList;
		switch (value) {
			case 'Due Date (Near to Far)':
				sortedTaskList = [...localTaskData].sort((a, b) => {
					return new Date(a.activityDate) - new Date(b.activityDate);
				});
				break;
			case 'Due Date (Far to Near)':
				sortedTaskList = [...localTaskData].sort((a, b) => {
					return new Date(b.activityDate) - new Date(a.activityDate);
				});
				break;
			case 'Recently Created':
				sortedTaskList = [...localTaskData].sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);

					if (a.version === 1 && b.version === 1) {
						return bTimestamp.diff(aTimestamp);
					}
				});
				break;
			case 'Recently Modified':
				sortedTaskList = [...localTaskData].sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				break;
			default:
				break;
		}

		if (sortedTaskList) {
			setSortBy(value);
			// setLocalTaskData(sortedTaskList);
		} else {
			// setLocalTaskData(allTaskData);
		}
		setLoading(false);
	};
	const RenderDropdown = ({ mode, onSelect }) => {
		let options = [];
		if (mode === 'filter') {
			options = [
				{ label: 'Show All', value: 'Show All' },
				{ label: 'Open Only', value: 'Open Only' },
				{ label: 'Recently Created', value: 'Recently Created' },
				{ label: 'Recently Modified', value: 'Recently Modified' },
				{ label: 'Due in 7 Days', value: 'Due in 7 Days' },
				{ label: 'Due in 15 Days', value: 'Due in 15 Days' },
				{ label: 'Due in 30 Days', value: 'Due in 30 Days' }
			];
		} else if (mode === 'sort') {
			options = [
				{
					label: 'Due Date (Near to Far)',
					value: 'Due Date (Near to Far)'
				},

				{
					label: 'Due Date (Far to Near)',
					value: 'Due Date (Far to Near)'
				},

				{
					label: 'Recently Created',
					value: 'Recently Created'
				},
				{
					label: 'Recently Modified',
					value: 'Recently Modified'
				}
			];
		}
		const menu = (
			<Menu>
				{options.map((item, idx) => (
					<div
						key={idx}
						onClick={() => {
							setLoading(true);
							onSelect(item.value);
						}}
					>
						{item.label}
					</div>
				))}
			</Menu>
		);
		return (
			<div style={{ position: 'relative' }}>
				<Dropdown
					className={'filter-sort-dropdown ' + mode}
					overlay={menu}
					overlayClassName='fs-dropdown'
					trigger={['click']}
				>
					<Button style={{ width: '16rem' }}>
						{mode === 'filter' ? 'Filter: ' + filterBy : 'Sort: ' + sortBy}
						<DownOutlined style={{ align: 'right' }} />
					</Button>
				</Dropdown>
			</div>
		);
	};
	return (
		<div>
			<RenderConfirmDeleteModal />
			<TopBarHeader
				headerName={'My Tickets'}
				buttonTitle={'Add'}
				// authorizeCode={authorizeCode}
				navigationLink={'/RM/ServiceTicket'}
			/>
			<div className='filters-panel'>
				<div className='left'>
					<Tooltip title='Delete'>
						<FontAwesomeIcon
							icon={faTrashAlt}
							className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
							onClick={() => selectedRowKeys.length > 0 && setShowDeleteModal(true)}
						/>
					</Tooltip>
				</div>
				<RenderDropdown mode='filter' onSelect={onFilterSelect} />
				<RenderDropdown mode='sort' onSelect={onSortSelect} />
				<div className='right'>
					<div className='icon-filter-wrapper'>
						<Tooltip title='Advance Filter'>
							<FontAwesomeIcon
								icon={faFilter}
								className={loading ? 'disabled-icon' : 'icon'}
								onClick={() => {
									toggleDrawer();
								}}
							/>
						</Tooltip>
						{isFilterApplied && <span className='filter-badge'></span>}
					</div>

					<Tooltip title='Download'>
						<FontAwesomeIcon
							icon={faArrowAltToBottom}
							className={loading ? 'disabled-icon' : 'icon'}
							onClick={() => {
								downloadRecords();
							}}
						/>
					</Tooltip>

					<Tooltip title={!cardViewMode ? 'Grid view' : 'List View'}>
						<FontAwesomeIcon
							icon={cardViewMode ? faThList : faThLarge}
							className={loading ? 'disabled-icon' : 'icon'}
							onClick={() => {
								setCardViewMode(!cardViewMode);
							}}
						/>
					</Tooltip>
				</div>
				<GenericAdvancedFilterDrawer
					showDrawer={showDrawer}
					toggleDrawer={toggleDrawer}
					closable={true}
					// defaultAdvState={defaultAdvState}
					setIsFilterApplied={setIsFilterApplied}
					setTableData={(data) => {
						setLocalTaskData(data);
						if (data) {
							setFilterBy('Show All');
							setSortBy('Due Date (Near to Far)');
						}
					}}
					// cacheData={allTaskData}
					// advFilterData={taskAdvFiltrList}
					// handleAppplyClick={handleAppplyClick}
				/>
			</div>

			<TicketSupportTable
				// onCellDefault={onCellDefault}
				loading={loading}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				// tableData={localTaskData}
				// setLocalTaskData={setLocalTaskData}
				setLoading={setLoading}
				// authorizeCode={authorizeCode}
				// onClickEdit={onClickEdit}
			/>

			<BackToTop />
		</div>
	);
};

export default TicketSupportListing;

import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Drawer, Menu, Dropdown, Tooltip } from 'antd';
import './TaskListingScreen.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { assets } from '../../constants/assetPaths';
import { faTrashAlt, faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { faFilter, faArrowAltToBottom, faThLarge } from '@fortawesome/pro-solid-svg-icons';
import { connect } from 'react-redux';
import {
	executeGetAllTaskData,
	executeGetTaskListingCs
} from '../../redux/actions/taskListingActions';
import { executeGetInteractionAdvancedFilter } from '../../redux/actions/interactionListingActions';
import { authorizeModule, exportJSON, generateCsObject } from '../../utils/utils';
import {
	deleteSelectedTaskApi,
	deleteSelectedTaskApiwithAllOccurrence
} from '../../api/taskListingApi';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import GenericAdvFilterForTaskInteraction from '../../components/GenericAdvancedFilter/GenericAdvFilterForTaskInteraction';
import BackToTop from '../../components/BackToTop/BackToTop';

import TaskTable from '../../components/TaskTable/TaskTable';
import { Radio } from 'antd';
import TopBarHeader from '../../components/TopBarHeader/TopBarHeader';
import { CONSTANTS } from '../../constants/constants';
import { ScButtonPrimary, ScButtonText } from '../../components/StyledComponents/genericElements';
import TaskListingCard from './TaskListingCard';
import { faThList } from '@fortawesome/free-solid-svg-icons';
function TaskListingScreen(props) {
	const {
		executeGetTaskListingCs,
		executeGetAllTaskData,
		// taskListingCs,
		allTaskData,
		taskAdvFiltrList,
		leftPanel
	} = props;
	const [loading, setLoading] = useState();
	// const defaultAdvState = { Dropdown: {}, Autocomplete: {}, Checkbox: {}, DateRange: {} };
	const [cardViewMode, setCardViewMode] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteFailedArray, setDeleteFailedArray] = useState();

	const [showFailedActions, setShowFailedActions] = useState(false);

	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [localTaskData, setLocalTaskData] = useState(allTaskData);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [value, setValue] = useState(1);
	const [filterBy, setFilterBy] = useState('Show All');
	const [sortBy, setSortBy] = useState('Due Date (Near to Far)');
	const [showDrawer, setShowDrawer] = useState(false);
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'TASKBOARD') authorizeCode = subMenu.authorizeCode;
			});
		});
	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};
	const { path } = useRouteMatch();
	const history = useHistory();
	const onRadioChange = (e) => {
		setValue(e.target.value);
	};
	useEffect(() => {
		executeGetTaskListingCs();
		executeGetInteractionAdvancedFilter('T');
		executeGetAllTaskData(setLocalTaskData, setLoading);
	}, []);

	const handleAppplyClick = (startDate, endDate) => {
		executeGetAllTaskData(setLocalTaskData, setLoading, startDate, endDate);
	};
	const toggleCardViewMode = () => {
		setCardViewMode(!cardViewMode);
	};
	const closeModal = (operationName) => {
		setDeleteFailedArray();
		operationName === 'delete' && setShowDeleteModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		executeGetAllTaskData(setLocalTaskData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'delete' && setShowDeleteModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	const handleConfirmDeleteModalOk = () => {
		const arraylist = selectedRows.map((item) => item.activityID);
		const selectedIDsList = selectedRows.map((item) => item.id);
		if (value === 1) {
			deleteSelectedTaskApi(selectedIDsList).then((res) => {
				// setShowSuccessFailureDeleteModal(true);
				// setDeleteInteractionMessage(res.data[0].message);
				// setShowDeleteModal(false);
				setDeleteFailedArray(res.data.filter((status) => !status.success));
			});
		} else {
			deleteSelectedTaskApiwithAllOccurrence(arraylist).then((res) => {
				// setShowSuccessFailureDeleteModal(true);
				// setDeleteInteractionMessage(res.data[0].message);
				// setShowDeleteModal(false);
				setDeleteFailedArray(res.data.filter((status) => !status.success));
			});
		}
		// deleteSelectedTaskApi(selectedRowKeys).then((res) => {
		//   setDeleteFailedArray(res.data.filter((status) => !status.success));
		// });
	};

	const downloadRecords = () => {
		const downloadData =
			selectedRows && selectedRows.length > 0
				? selectedRows.map((record, index) => ({
						'Sr.No': index + 1,
						Subject: record.subject,
						Type: record.interactionTypeName,
						'Due Date': moment(record.activityDate).format('DD MMM YYYY'),
						Purpose: record.activityPurposeName,
						'Client / Prospect Name': record.clientProspectName
				  }))
				: localTaskData.map((record, index) => ({
						'Sr.No': index + 1,
						Subject: record.subject,
						Type: record.interactionTypeName,
						'Due Date': moment(record.activityDate).format('DD MMM YYYY'),
						Purpose: record.activityPurposeName,
						'Client / Prospect Name': record.clientProspectName
				  }));

		exportJSON(downloadData, 'Tasks');
	};

	const radioStyle = {
		display: 'block',
		height: '30px',
		lineHeight: '30px',
		fontSize: 'large'
	};
	const RenderConfirmDeleteModal = () => {
		const ConfirmScreen = () => (
			<>
				<div className='modal-header'>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Tasks</div>
				</div>
				<div className='modal-body'>
					Are you sure you want to delete
					{selectedRowKeys.length > 1
						? ` ${selectedRowKeys.length} `
						: selectedRowKeys.length === 1 && ' '}
					selected record{selectedRowKeys.length > 1 ? 's' : ' '}?
					<div className='modal-radio' style={{ paddingTop: '30px' }}>
						<Radio.Group onChange={onRadioChange} style={{ fontSize: '14' }} value={value}>
							<Radio value={1} style={radioStyle}>
								Selected Occurence
							</Radio>
							<Radio value={2} style={radioStyle}>
								All Occurences
							</Radio>
						</Radio.Group>
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
					return new Date(a.endDate) - new Date(b.endDate);
				});
				break;
			case 'Due Date (Far to Near)':
				sortedTaskList = [...localTaskData].sort((a, b) => {
					return new Date(b.endDate) - new Date(a.endDate);
				});
				break;
			case 'Recently Created':
				let taskVersion1 = localTaskData?.filter((item) => item?.version === 1);
				let taskVersion2 = localTaskData?.filter((item) => item?.version > 1);
				let sortedTaskList1 = [...taskVersion1].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				let sortedTaskList2 = [...taskVersion2].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				sortedTaskList = [...sortedTaskList1, ...sortedTaskList2];
				break;
			case 'Recently Modified':
				let taskModVersion1 = localTaskData?.filter((item) => item?.version === 1);
				let taskModVersion2 = localTaskData?.filter((item) => item?.version > 1);
				let sortedTaskModList1 = [...taskModVersion1].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				let sortedTaskModList2 = [...taskModVersion2].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				sortedTaskList = [...sortedTaskModList2, ...sortedTaskModList1];
				break;
			default:
				break;
		}

		if (sortedTaskList) {
			setSortBy(value);
			setLocalTaskData(sortedTaskList);
		} else {
			setLocalTaskData(allTaskData);
		}
		setLoading(false);
	};

	const RenderDropdown = ({ mode, onSelect }) => {
		let options = [];
		if (mode === 'filter') {
			options = [
				{ label: 'Show All', value: 'Show All' },
				// { label: 'Open Only', value: 'Open Only' },
				// { label: 'Recently Created', value: 'Recently Created' },
				// { label: 'Recently Modified', value: 'Recently Modified' },
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
					<Button>
						{mode === 'filter' ? 'Filter: ' + filterBy : 'Sort: ' + sortBy}
						<FontAwesomeIcon icon={faChevronDown} />
					</Button>
				</Dropdown>
			</div>
		);
	};

	// const onClickEdit = (row, rowIndex) => {
	//   const allTaskIds = allTaskData.map((item) => item.taskIDs);
	//   const toObject = {
	//     pathname: `${url}/TaskCreate`,
	//     state: { allTaskIds: allTaskIds, rowIndex: rowIndex },
	//   };
	//   return {
	//     onCLick: (event) => {
	//       history.push(toObject);
	//     },
	//     onDoubleClick: (event) => {}, // double click row
	//     onContextMenu: (event) => {}, // right button click row
	//     onMouseEnter: (event) => {}, // mouse enter row
	//     onMouseLeave: (event) => {}, // mouse leave row
	//   };
	// };

	const onCellDefault = (row, rowNumber) => {
		const TaskIDs = localTaskData.map((item) => ({
			taskId: item.followUpID,
			id: item.id,
			activityID: item.activityID
		}));

		const toObject = {
			pathname: `${path}/TaskView`,
			state: { TaskIDs: TaskIDs, rowNumber: rowNumber }
		};
		return {
			onClick: (event) => {
				authorizeModule(authorizeCode, CONSTANTS.authorizeCode.view) && history.push(toObject);
			}, // click row
			onDoubleClick: (event) => {}, // double click row
			onContextMenu: (event) => {}, // right button click row
			onMouseEnter: (event) => {}, // mouse enter row
			onMouseLeave: (event) => {} // mouse leave row
		};
	};

	return (
		<div className='task-listing-container'>
			<RenderConfirmDeleteModal />
			<TopBarHeader
				headerName={'My Tasks'}
				buttonTitle={'Add'}
				navigationLink={'/dashboard/TaskBoard/TaskCreate'}
				authorizeCode={authorizeCode}
			/>
			<div className='filters-panel'>
				<div className='left'>
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) && (
						<Tooltip title='Delete'>
							<FontAwesomeIcon
								icon={faTrashAlt}
								className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
								onClick={() => selectedRowKeys.length > 0 && setShowDeleteModal(true)}
							/>
						</Tooltip>
					)}
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
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.download) && (
						<Tooltip title='Download'>
							<FontAwesomeIcon
								icon={faArrowAltToBottom}
								className={loading ? 'disabled-icon' : 'icon'}
								onClick={() => {
									downloadRecords();
								}}
							/>
						</Tooltip>
					)}
					<Tooltip title={!cardViewMode ? 'Grid view' : 'List View'}>
						<FontAwesomeIcon
							// icon={faThLarge}
							icon={cardViewMode ? faThList : faThLarge}
							className={loading ? 'disabled-icon' : 'icon'}
							onClick={() => {
								toggleCardViewMode();
							}}
						/>
					</Tooltip>
				</div>
				<GenericAdvFilterForTaskInteraction
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
					cacheData={allTaskData}
					advFilterData={taskAdvFiltrList}
					handleAppplyClick={handleAppplyClick}
				/>
			</div>
			{!cardViewMode ? (
				<TaskTable
					onCellDefault={onCellDefault}
					loading={loading}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					selectedRowKeys={selectedRowKeys}
					setSelectedRowKeys={setSelectedRowKeys}
					tableData={localTaskData}
					setLocalTaskData={setLocalTaskData}
					setLoading={setLoading}
					authorizeCode={authorizeCode}
					// onClickEdit={onClickEdit}
				/>
			) : (
				<TaskListingCard
					data={localTaskData}
					setLocalTaskData={setLocalTaskData}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					selectedRowKeys={selectedRowKeys}
					setSelectedRowKeys={setSelectedRowKeys}
					loading={loading}
					authorizeCode={authorizeCode}
					setLoading={setLoading}
				/>
			)}
			<BackToTop />
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		// taskListingCs: state.taskListing.controlStructure,
		allTaskData:
			state.taskListing &&
			state.taskListing.allTask &&
			state.taskListing.allTask.taskListResponseModel,
		rowsCount: state.taskListing && state.taskListing.allTask && state.taskListing.allTask.rowCount,
		taskAdvFiltrList:
			state.interactionListing &&
			state.interactionListing?.getInteractionAdvFilter?.advancedFiltersList,
		leftPanel: state.dashboard.leftPanel
	};
};
const mapDispatchToProps = {
	executeGetTaskListingCs,
	executeGetAllTaskData
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListingScreen);

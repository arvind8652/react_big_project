import React, { useEffect, useState } from 'react';
import { Button, Table, Menu, Select, Radio, Tooltip } from 'antd';
import './InteractionListingScreen.scss';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { assets } from '../../constants/assetPaths';
import { exportJSON, generateCsObject } from '../../utils/utils';
import { faPlus, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import {
	faFilter,
	faArrowAltToBottom,
	faThLarge,
	faThList
} from '@fortawesome/pro-solid-svg-icons';
import { connect } from 'react-redux';
import {
	executeGetInteractionListingCs,
	executeGetAllInteractionData,
	executeGetInteractionAdvancedFilter
} from '../../redux/actions/interactionListingActions';
import {
	deleteSelectedInteractionApi,
	deleteSelectedInteractionApiwithAllOccurrence
} from '../../api/interactionListingApi';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import BackToTop from '../../components/BackToTop/BackToTop';
// import InteractionListingFilterForm from "../../components/Forms/InteractionListingFilterForm/InteractionListingFilterForm";
import InteractionTable from '../../components/InteractionTable/InteractionTable';
import InteractionListingCard from './InteractionListingCard';
import GenericAdvFilterForTaskInteraction from '../../components/GenericAdvancedFilter/GenericAdvFilterForTaskInteraction';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { ScButtonPrimary, ScButtonText } from '../../components/StyledComponents/genericElements';

function InteractionListingScreen(props) {
	const {
		executeGetInteractionListingCs,
		executeGetAllInteractionData,
		interactionListingCs,
		allInteractionData,
		interactionAdvFilter,
		miniComponentData,
		miniMode,
		leftPanel
	} = props;
	const [loading, setLoading] = useState();
	const [cardViewMode, setCardViewMode] = useState(false);
	const defaultAdvState = { Dropdown: {}, Autocomplete: {}, Checkbox: {}, DateRange: {} };
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteFailedArray, setDeleteFailedArray] = useState();
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectedRowFollowUpId, setSelectedRowFollowUpId] = useState([]);
	const [localInteractionData, setLocalInteractionData] = useState(
		(miniMode && miniComponentData.tableData) || allInteractionData
	);
	const [value, setValue] = React.useState(1);
	const [filterBy, setFilterBy] = useState('Show All');
	const [sortBy, setSortBy] = useState('Due Date (Near to Far)');
	const { path } = useRouteMatch();
	const history = useHistory();
	const onRadioChange = (e) => {
		setValue(e.target.value);
	};

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};
	const [filterFormData, setFilterFormData] = useState({
		searchName: undefined,
		tag: undefined,
		type: undefined,
		purpose: undefined,
		status: undefined,
		ddrRange: undefined
	});
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'ACTIVITYADD') authorizeCode = subMenu.authorizeCode;
			});
		});
	useEffect(() => {
		setFilterFormData({
			searchName: undefined,
			tag: undefined,
			type: undefined,
			purpose: undefined,
			status: undefined,
			ddrRange: undefined
		});
		setCardViewMode(Boolean.valueOf(sessionStorage.getItem('cardViewMode')));
		executeGetInteractionAdvancedFilter('I');
		executeGetInteractionListingCs();
		!miniMode && executeGetAllInteractionData(setLocalInteractionData, setLoading);
	}, []);

	const handleAppplyClick = (startDate, endDate) => {
		executeGetAllInteractionData(setLocalInteractionData, setLoading, startDate, endDate);
	};

	const filterRecords = (filterData) => {
		let filteredInteractionData = allInteractionData;
		if (filterData.searchName) {
			filteredInteractionData = filteredInteractionData.filter((record) => {
				return (
					record.clientProspectName &&
					record.clientProspectName !== null &&
					record.clientProspectName.toLowerCase().includes(filterData.searchName.toLowerCase())
				);
			});
		}
		if (filterData.type && filterData.type.length > 0) {
			filteredInteractionData = filteredInteractionData.filter((record) => {
				return (
					record.interactionTypeName &&
					record.interactionTypeName !== null &&
					filterData.type.includes(record.interactionType)
				);
			});
		}
		if (filterData.purpose && filterData.purpose.length > 0) {
			filteredInteractionData = filteredInteractionData.filter((record) => {
				return (
					record.activityPurposeName &&
					record.activityPurposeName !== null &&
					filterData.purpose.includes(filterData.activityPurposeName)
				);
			});
		}
		if (filterData.status && filterData.status.length > 0) {
			filteredInteractionData = filteredInteractionData.filter((record) => {
				return (
					record.activityStatusName &&
					record.activityStatusName !== null &&
					filterData.status.includes(filterData.activityStatusName)
				);
			});
		}

		setLocalInteractionData(filteredInteractionData);
	};
	useEffect(() => {
		filterRecords(filterFormData);
	}, [filterFormData]);

	const toggleCardViewMode = () => {
		setCardViewMode(!cardViewMode);
	};

	const closeModal = (operationName) => {
		setDeleteFailedArray();
		operationName === 'delete' && setShowDeleteModal(false);

		setSelectedRowKeys([]);
		setSelectedRows([]);
		executeGetAllInteractionData(setLocalInteractionData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'delete' && setShowDeleteModal(false);

		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	// const handleConfirmDeleteModalOk = () => {
	//   deleteSelectedInteractionApi(selectedRowKeys).then((res) => {
	//     setDeleteFailedArray(res.data.filter((status) => !status.success));
	//   });
	// };

	const handleConfirmDeleteModalOk = () => {
		const arraylist = [];
		selectedRows.map((item) => {
			arraylist.push(item.followUpID);
		});
		if (value === 1) {
			deleteSelectedInteractionApi(selectedRowKeys).then((res) => {
				// setShowSuccessFailureDeleteModal(true);
				// setDeleteInteractionMessage(res.data[0].message);
				// setShowDeleteModal(false);
				setDeleteFailedArray(res.data.filter((status) => !status.success));
			});
		} else {
			deleteSelectedInteractionApiwithAllOccurrence(arraylist).then((res) => {
				// setShowSuccessFailureDeleteModal(true);
				// setDeleteInteractionMessage(res.data[0].message);
				// setShowDeleteModal(false);
				setDeleteFailedArray(res.data.filter((status) => !status.success));
			});
		}
	};

	const downloadRecords = () => {
		const downloadData =
			selectedRows && selectedRows.length > 0
				? selectedRows.map((record, index) => ({
						'Sr.No': index + 1,
						Subject: record.subject,
						Type: record.interactionType === 'C' ? 'Call' : 'Email',
						'Due Date': moment(record.activityDate).format('DD MMM YYYY'),
						Purpose: record.activityPurposeName,
						'Client / Prospect Name': record.clientProspectName
				  }))
				: localInteractionData.map((record, index) => ({
						'Sr.No': index + 1,
						Subject: record.subject,
						Type: record.interactionType === 'C' ? 'Call' : 'Email',
						'Due Date': moment(record.activityDate).format('DD MMM YYYY'),
						Purpose: record.activityPurposeName,
						'Client / Prospect Name': record.clientProspectName
				  }));
		exportJSON(downloadData, 'Interactions');
	};

	const RenderTopBar = () => {
		return (
			<div className='dashboard-topbar-container'>
				{/* <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" /> */}
				<div>My Interactions</div>
				{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.add) && (
					<Button className='topbar-btn'>
						<NavLink to='/dashboard/MyInteractions/InteractionCreate'>
							<FontAwesomeIcon
								icon={faPlus}
								style={{ marginRight: 8 }}
								// onClick={() => {
								//   history.push("MyInteraction/InteractionCreate");
								// }}
							/>
							Add
						</NavLink>
					</Button>
				)}
			</div>
		);
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
					<div className='header-title'>Delete Interactions</div>
				</div>
				<div className='modal-body'>
					Are you sure you want to delete the interaction.there is recurring interaction.
					{/* Are you sure you want to delete ---------- save for later changes
          {selectedRowKeys.length > 1
            ? ` ${selectedRowKeys.length} `
            : selectedRowKeys.length === 1 && " "}
          selected record{selectedRowKeys.length > 1 ? "s" : " "}? */}
					<div className='modal-radio' style={{ paddingTop: '30px' }}>
						<Radio.Group onChange={onRadioChange} style={{ fontSize: '14' }} value={value}>
							<Radio value={1} style={radioStyle}>
								Selected interaction
							</Radio>
							<Radio value={2} style={radioStyle}>
								All interaction
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
		let filteredInteractionList;
		switch (value) {
			case 'Show All':
				filteredInteractionList = allInteractionData;

				break;
			case 'Open Only':
				filteredInteractionList =
					allInteractionData && allInteractionData.filter((item) => item.activityStatus === 'O');
				break;
			case 'Recently Created':
				filteredInteractionList =
					allInteractionData &&
					allInteractionData.filter((item) => {
						const now = moment();
						const date = moment(item.activityDate);
						return item.version && item.version === 1;
					});
				break;
			case 'Recently Modified':
				filteredInteractionList =
					allInteractionData &&
					allInteractionData.filter((item) => {
						const now = moment();
						const date = moment(item.activityDate);
						return item.version && item.version > 1;
					});
				break;
			case 'Due in 7 Days':
				filteredInteractionList =
					allInteractionData && allInteractionData.filter((item) => item.dueDays <= 7);
				break;
			case 'Due in 15 Days':
				filteredInteractionList =
					allInteractionData && allInteractionData.filter((item) => item.dueDays <= 15);
				break;
			case 'Due in 30 Days':
				filteredInteractionList =
					allInteractionData && allInteractionData.filter((item) => item.dueDays <= 30);
				break;
			default:
				break;
		}
		if (filteredInteractionList) {
			setFilterBy(value);
			setLocalInteractionData(filteredInteractionList);
		} else {
			setLocalInteractionData(allInteractionData);
		}
		setLoading(false);
	};
	const onSortSelect = (value) => {
		// sort operation
		let sortedInteractionList;
		switch (value) {
			case 'Due Date (Near to Far)':
				sortedInteractionList = [...localInteractionData].sort((a, b) => {
					return new Date(a.endDate) - new Date(b.endDate);
				});
				break;
			case 'Due Date (Far to Near)':
				sortedInteractionList = [...localInteractionData].sort((a, b) => {
					return new Date(b.endDate) - new Date(a.endDate);
				});
				break;
			case 'Recently Created':
				let taskVersion1 = localInteractionData?.filter((item) => item?.version === 1);
				let taskVersion2 = localInteractionData?.filter((item) => item?.version > 1);
				let sortedTaskList1 = [...taskVersion1].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				let sortedTaskList2 = [...taskVersion2].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				sortedInteractionList = [...sortedTaskList1, ...sortedTaskList2];
				break;
			case 'Recently Modified':
				let taskModVersion1 = localInteractionData?.filter((item) => item?.version === 1);
				let taskModVersion2 = localInteractionData?.filter((item) => item?.version > 1);
				let sortedTaskModList1 = [...taskModVersion1].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				let sortedTaskModList2 = [...taskModVersion2].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				sortedInteractionList = [...sortedTaskModList2, ...sortedTaskModList1];
				break;
			default:
				break;
		}

		if (sortedInteractionList) {
			setSortBy(value);
			setLocalInteractionData(sortedInteractionList);
		} else {
			setLocalInteractionData(allInteractionData);
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
				{/* <Dropdown
          className={"filter-sort-dropdown " + mode}
          overlay={menu}
          overlayClassName="fs-dropdown"
          trigger={["click"]}
        >
          <Button>
            {mode === "filter" ? "Filter: " + filterBy : "Sort: " + sortBy}
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </Dropdown> */}
				<div className='dropdown-prefix'>{mode.charAt(0).toUpperCase() + mode.substring(1)}:</div>
				<Select
					className={'filter-sort-dropdown ' + mode}
					size='large'
					onSelect={onSelect}
					value={mode === 'filter' ? filterBy : sortBy}
					showArrow
				>
					{options &&
						options.map((option, index) => (
							<Select.Option key={index} value={option.value}>
								{option.label}
							</Select.Option>
						))}
				</Select>
			</div>
		);
	};

	const onRow = (record, index) => {
		console.log(record, index);
	};

	const onCellDefault = (row, rowNumber) => {
		const InteractionIDs = localInteractionData.map((item) => ({
			interactionId: item.followUpID,
			id: item.id,
			activityID: item.activityID
		}));

		const toObject = {
			pathname: `${path}/InteractionView`,
			state: { InteractionIDs: InteractionIDs, rowNumber: row.rowNumber - 1 }
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
		<div className='interaction-listing-container'>
			<RenderConfirmDeleteModal />
			<RenderTopBar />
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
					{/* <Tooltip title='Grid View'> */}
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
					defaultAdvState={defaultAdvState}
					setIsFilterApplied={setIsFilterApplied}
					setTableData={(data) => {
						setLocalInteractionData(data);
						if (data) {
							setFilterBy('Show All');
							setSortBy('Due Date (Near to Far)');
						}
					}}
					cacheData={allInteractionData}
					advFilterData={interactionAdvFilter}
					handleAppplyClick={handleAppplyClick}
				/>
			</div>
			{!cardViewMode ? (
				<InteractionTable
					onCellDefault={onCellDefault}
					loading={loading}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					selectedRowKeys={selectedRowKeys}
					selectedRowFollowUpId={selectedRowFollowUpId}
					setSelectedRowFollowUpId={setSelectedRowFollowUpId}
					setSelectedRowKeys={setSelectedRowKeys}
					tableData={localInteractionData}
					setLocalInteractionData={setLocalInteractionData}
					setLoading={setLoading}
					onRow={onRow}
					authorizeCode={authorizeCode}
					// onClickEdit={onClickEdit}
				/>
			) : (
				<InteractionListingCard
					data={localInteractionData}
					setLocalInteractionData={setLocalInteractionData}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					selectedRowKeys={selectedRowKeys}
					selectedRowFollowUpId={selectedRowFollowUpId}
					setSelectedRowFollowUpId={setSelectedRowFollowUpId}
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
		interactionListingCs: state.interactionListing.controlStructure,
		allInteractionData:
			state.interactionListing &&
			state.interactionListing.allInteractions &&
			state.interactionListing.allInteractions.taskListResponseModel
				? state.interactionListing.allInteractions.taskListResponseModel
				: [],
		rowsCount:
			state.interactionListing &&
			state.interactionListing.allInteractions &&
			state.interactionListing.allInteractions.rowCount,
		interactionAdvFilter:
			state.interactionListing &&
			state.interactionListing.getInteractionAdvFilter &&
			state.interactionListing.getInteractionAdvFilter.advancedFiltersList,
		leftPanel: state.dashboard.leftPanel
	};
};
const mapDispatchToProps = {
	executeGetInteractionListingCs,
	executeGetAllInteractionData
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractionListingScreen);

import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Drawer, Select, Menu, Tooltip } from 'antd';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faPlus, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import {
	faFilter,
	faArrowAltToBottom,
	faThLarge,
	faThList
} from '@fortawesome/pro-solid-svg-icons';
import { connect } from 'react-redux';
import {
	executeGetOpportunityListingCs,
	executeGetAllOpportunityData,
	executeGetOpportunityAdvancedFilter
} from '../../redux/actions/opportunityListingActions';
import { exportJSON, generateCsObject } from '../../utils/utils';
import {
	addFavouriteOpportunityApi,
	deleteSelectedOpportunityApi,
	updateOpportunityStageApi
} from '../../api/opportunityListingApi';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { assets } from '../../constants/assetPaths';
import moment from 'moment';
import OpportunityTable from '../../components/OpportunityTable/OpportunityTable';
import OpportunityUpdateStageModal from '../../components/Modal/OpportunityUpdateStageModal/OpportunityUpdateStageModal';
import './OpportunityListingScreen.scss';
import OpportunityListingFilterForm from '../../components/Forms/OpportunityListingFilterForm/OpportunityListingFilterForm';
import OpportunityListingCard from '../../components/OpportunityListingCard/OpportunityListingCard';
import FailModal from '../../components/Modal/FailModal/FailModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Modal from 'antd/lib/modal/Modal';
import BackToTop from '../../components/BackToTop/BackToTop';
import GenericAdvancedFilterDrawer from '../../components/GenericAdvancedFilter/GenericAdvancedFilter';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

function OpportunityListingScreen(props) {
	const {
		executeGetOpportunityListingCs,
		executeGetAllOpportunityData,
		opportunityListingCs,
		allOpportunityData,
		highProbability,
		miniComponentData,
		miniMode,
		isrecentData,
		opportunityAdvFilter,
		leftPanel
	} = props;
	const defaultAdvState = {
		Dropdown: {},
		Autocomplete: {},
		Checkbox: {},
		DateRange: {},
		Range: {}
	};
	const [loading, setLoading] = useState();
	const [cardViewMode, setCardViewMode] = useState(false);
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [localOpportunityData, setLocalOpportunityData] = useState(
		(miniMode && miniComponentData.tableData) || allOpportunityData
	);

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteFailedArray, setDeleteFailedArray] = useState();
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [showUpdateStageModal, setShowUpdateStageModal] = useState(false);
	const [opportunityStageData, setOpportunityStageData] = useState({
		recordId: undefined,
		status: undefined,
		stage: undefined,
		probability: undefined,
		preferredCurrency: undefined,
		closureAmount: undefined,
		closureDate: undefined,
		reason: undefined,
		remark: undefined
	});
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [deleteMessage, setDeleteMessage] = useState();
	const [showFailModal, setShowFailModal] = useState(false);
	const [opErrorArray, setOpErrorArray] = useState([]);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);
	const [filterBy, setFilterBy] = useState('Show All');
	const [sortBy, setSortBy] = useState('Probability (High to Low)');
	const [valueFiltered, setValueFiltered] = useState(false);
	const [filterFormData, setFilterFormData] = useState({
		searchName: undefined,
		tagName: undefined,
		stage: undefined,
		type: undefined,
		targetAmountRange: undefined,
		ddrRange: undefined
	});
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'OPPORTUNITYADD') authorizeCode = subMenu.authorizeCode;
			});
		});
	const { url } = useRouteMatch();
	const history = useHistory();
	const controlStructure =
		opportunityListingCs && generateCsObject(opportunityListingCs[0].controlStructureField);

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};
	useEffect(() => {
		setFilterFormData({
			searchName: undefined,
			stage: undefined,
			type: undefined,
			targetAmountRange: undefined,
			ddrRange: undefined
		});
		setCardViewMode(Boolean.valueOf(sessionStorage.getItem('cardViewMode')));
		executeGetOpportunityAdvancedFilter();
		executeGetOpportunityListingCs();
		!miniMode && executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
	}, []);

	useEffect(() => {
		if (!loading) {
			onFilterSelect(filterBy);
		}
	}, [loading]);

	const filterRecords = (filterData) => {
		let filteredOpportunityData = allOpportunityData;
		if (filterData.searchName) {
			filteredOpportunityData = filteredOpportunityData.filter(
				(record) =>
					record.clientProspectName &&
					record.clientProspectName !== null &&
					record.clientProspectName.toLowerCase().includes(filterData.searchName.toLowerCase())
			);
		}
		if (filterData.stage && filterData.stage.length > 0) {
			filteredOpportunityData = filteredOpportunityData.filter((record) => {
				return record.stage && record.stage !== null && filterData.stage.includes(record.stage);
			});
		}
		if (filterData.tagName && filterData.tagName.length > 0) {
			filteredOpportunityData = filteredOpportunityData.filter((record) => {
				return (
					record.tagName && record.tagName !== null && filterData.tagName.includes(record.tagName)
				);
			});
		}
		if (filterData.type && filterData.type.length > 0) {
			filteredOpportunityData = filteredOpportunityData.filter((record) => {
				return (
					record.opportunityType &&
					record.opportunityType !== null &&
					filterData.type.includes(record.opportunityType)
				);
			});
		}
		if (filterData.targetAmountRange) {
			filteredOpportunityData = filteredOpportunityData.filter((record) => {
				return (
					record.amount &&
					filterData.targetAmountRange &&
					record.amount >= filterData.targetAmountRange[0] &&
					record.amount <= filterData.targetAmountRange[1]
				);
			});
		}

		if (filterData.targetAmountMin || filterData.targetAmountMax) {
			filteredOpportunityData = filteredOpportunityData.filter((record) => {
				return (
					record.amount &&
					(filterData.targetAmountMin || filterData.targetAmountMax) &&
					record.amount >= filterData.targetAmountMin &&
					record.amount <= filterData.targetAmountMax
				);
			});
		}

		setLocalOpportunityData(filteredOpportunityData);
	};
	useEffect(() => {
		filterRecords(filterFormData);
	}, [filterFormData]);
	const toggleCardViewMode = () => {
		setCardViewMode(!cardViewMode);
		sessionStorage.setItem('cardViewMode', !cardViewMode);
	};
	const downloadRecords = () => {
		const downloadData =
			selectedRows && selectedRows.length > 0
				? selectedRows.map((opp, index) => ({
						'Sr.No': index + 1,
						Opportunity: opp.opportunityName,
						Currency: opp.currencySymbol,
						Target: opp.targetAmount,
						'Due Date': moment(opp.dueDate).format('DD-MMM-YYYY'),
						Stage: opp.stageName,
						'Client/Prospect Name': opp.clientProspectName,
						Type: opp.refType === 'PROSPECTADD' ? 'Prospect' : 'Client',

						// Newly Added
						'Relationship Manager': opp.relationshipManagerName,
						Branch: opp.branch,
						Probability: opp.probability,
						Status: opp.openOrClosed,
						'Opportunity Type': opp.opportunityType,
						'Product/Service/OtherBankingRelation': opp.productOrService,
						Remark: opp.Remark
				  }))
				: localOpportunityData.map((opp, index) => ({
						'Sr.No': index + 1,
						Opportunity: opp.opportunityName,
						Currency: opp.currencySymbol,
						Target: opp.targetAmount,
						'Due Date': moment(opp.dueDate).format('DD-MMM-YYYY'),
						Stage: opp.stageName,
						'Client/Prospect Name': opp.clientProspectName,
						Type: opp.refType === 'PROSPECTADD' ? 'Prospect' : 'Client',

						'Relationship Manager': opp.relationshipManagerName,
						Branch: opp.branchName,
						Probability: opp.probability,
						Status: opp.openOrClosed,
						'Opportunity Type': opp.opportunityTypeName,
						'Product/Service/OtherBankingRelation': opp.productOrService,
						Remark: opp.Remark
				  }));
		exportJSON(downloadData, 'opportunity');
	};
	const closeModal = (operationName) => {
		setDeleteFailedArray();
		operationName === 'delete' && setShowDeleteModal(false);
		operationName === 'updateStage' && setShowUpdateStageModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		miniMode
			? miniComponentData.getData()
			: executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'delete' && setShowDeleteModal(false);
		operationName === 'updateStage' && setShowUpdateStageModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	const handleConfirmDeleteModalOk = () => {
		deleteSelectedOpportunityApi(selectedRowKeys).then((res) => {
			setDeleteFailedArray(res.data.filter((status) => !status.success));
		});
	};
	const handleUpdateStageOk = (values) => {
		updateOpportunityStageApi(values)
			.then((res) => {
				// console.log('resp-----', res);
				// if (res.data[0].success) {
				let respData;
				if (Array.isArray(res.data)) {
					respData = res?.data[0];
				} else {
					respData = res?.data;
				}
				// if (res.data[0].success) {
				if (respData?.success) {
					miniMode
						? miniComponentData.getData()
						: executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
					// setDeleteMessage(res.data[0].message);
					setDeleteMessage(respData.message);
					setShowUpdateStageModal(false);
					setShowSuccessModal(true);
					setSelectedRows([]);
					setSelectedRowKeys([]);
				} else {
					setShowUpdateStageModal(false);
					!Array.isArray(res.data) ? setOpErrorArray([res.data]) : setOpErrorArray(res.data);
					executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
					setSelectedRows([]);
					setSelectedRowKeys([]);
					setShowFailModal(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const RenderTopBar = () => {
		const { path } = useRouteMatch();
		return (
			<div className='dashboard-topbar-container'>
				{/* <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" /> */}

				<div>My Opportunities</div>
				<Button className='topbar-btn'>
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.add) && (
						<NavLink to={`${path}/OpportunityCreate`}>
							<FontAwesomeIcon
								icon={faPlus}
								style={{ marginRight: 8 }}
								onClick={() => {
									history.push('MyOpportunity/OpportunityCreate');
								}}
							/>
							Add
						</NavLink>
					)}
				</Button>
			</div>
		);
	};
	const RenderConfirmDeleteModal = () => {
		const ConfirmScreen = () => (
			<>
				<div className='modal-header'>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					{/* <div className='header-title'>Delete Leads</div> */}
					<div className='header-title'>Delete Opportunity</div>
				</div>
				<div className='modal-body'>
					Are you sure you want to delete
					{selectedRowKeys.length > 1
						? ` ${selectedRowKeys.length} `
						: selectedRowKeys.length === 1 && ' '}
					selected Opportunit{selectedRowKeys.length > 1 ? 'ies' : 'y'}?
				</div>
				<div className='modal-footer'>
					<Button
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
					</Button>
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
						<div className='subtitle'>Your action has been completed successfully</div>
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
		setValueFiltered(true);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		let filteredOpportunityList;
		switch (value) {
			case 'Show All':
				filteredOpportunityList = allOpportunityData;
				break;
			case 'Favourites':
				filteredOpportunityList = allOpportunityData.filter((item) => item.isFavourite);
				break;
			case 'Open Only':
				filteredOpportunityList = allOpportunityData.filter((item) => item.isOpen);
				break;
			case 'High Probability':
				filteredOpportunityList = allOpportunityData.filter(
					(item) => item.probability >= highProbability
				);
				break;
			case 'Recently Created':
				filteredOpportunityList = allOpportunityData.filter((item) => {
					const now = moment();
					const dueDate = moment(item.dueDate);
					return item.version === 1;
				});
				break;
			case 'Recently Modified':
				filteredOpportunityList = allOpportunityData.filter((item) => {
					const now = moment();
					const dueDate = moment(item.dueDate);
					return item.version > 1;
				});
				break;
			case 'Due in 7 Days':
				filteredOpportunityList = allOpportunityData.filter((item) => item.dueDays <= 7);
				break;
			case 'Due in 15 Days':
				filteredOpportunityList = allOpportunityData.filter((item) => item.dueDays <= 15);
				break;
			case 'Due in 30 Days':
				filteredOpportunityList = allOpportunityData.filter((item) => item.dueDays <= 30);
				break;
			default:
				break;
		}
		if (filteredOpportunityList) {
			setFilterBy(value);
			setLocalOpportunityData(filteredOpportunityList);
		} else {
			setLocalOpportunityData(allOpportunityData);
		}
		setLoading(false);
	};
	const onSortSelect = (value) => {
		if (localOpportunityData) {
			// sort operation
			setValueFiltered(false);
			let sortedOpportunityList;
			switch (value) {
				case 'Due Date (Near to Far)':
					sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
						return new Date(b.dueDate) - new Date(a.dueDate);
					});
					break;
				case 'Due Date (Far to Near)':
					sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
						return new Date(a.dueDate) - new Date(b.dueDate);
					});
					break;
				case 'Probability (Low to High)':
					sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
						return a.probability - b.probability;
					});
					break;
				case 'Probability (High to Low)':
					sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
						return b.probability - a.probability;
					});
					break;
				case 'Target Value (Low to High)':
					sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
						return a.amount - b.amount;
					});
					break;
				case 'Target Value (High to Low)':
					sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
						return b.amount - a.amount;
					});
					break;
				case 'Recently Created':
					let oppListVersion1 = localOpportunityData.filter((item) => item.version === 1);
					let oppListVersion2 = localOpportunityData.filter((item) => item.version === 2);
					oppListVersion1 = oppListVersion1.sort((a, b) => {
						const aTimestamp = moment(a.inputDateTime);
						const bTimestamp = moment(b.inputDateTime);
						return bTimestamp.diff(aTimestamp);
					});
					oppListVersion2 = oppListVersion2.sort((a, b) => {
						const aTimestamp = moment(a.inputDateTime);
						const bTimestamp = moment(b.inputDateTime);
						return bTimestamp.diff(aTimestamp);
					});
					sortedOpportunityList = [...oppListVersion1, ...oppListVersion2];
					break;
				case 'Recently Modified':
					sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
						const aTimestamp = moment(a.inputDateTime);
						const bTimestamp = moment(b.inputDateTime);
						return bTimestamp.diff(aTimestamp);
					});
					break;
				default:
					console.log('DEFAULT');
					break;
			}

			if (sortedOpportunityList) {
				setSortBy(value);
				setLocalOpportunityData(sortedOpportunityList);
			} else {
				setLocalOpportunityData(allOpportunityData);
			}
			setLoading(false);
		}
	};
	const RenderDropdown = ({ mode, onSelect }) => {
		let options = [];
		if (mode === 'filter') {
			options = [
				{ label: 'Show All', value: 'Show All' },
				{ label: 'Favourites', value: 'Favourites' },
				{ label: 'Open Only', value: 'Open Only' },
				{ label: 'High Probability', value: 'High Probability' },
				// { label: 'Recently Created', value: 'Recently Created' },
				// { label: 'Recently Modified', value: 'Recently Modified' },
				{ label: 'Due in 7 Days', value: 'Due in 7 Days' },
				{ label: 'Due in 15 Days', value: 'Due in 15 Days' },
				{ label: 'Due in 30 Days', value: 'Due in 30 Days' }
			];
		} else if (mode === 'sort') {
			options = [
				{ label: 'Due Date (Near to Far)', value: 'Due Date (Near to Far)' },
				{ label: 'Due Date (Far to Near)', value: 'Due Date (Far to Near)' },
				{
					label: 'Probability (Low to High)',
					value: 'Probability (Low to High)'
				},
				{
					label: 'Probability (High to Low)',
					value: 'Probability (High to Low)'
				},
				{
					label: 'Target Value (Low to High)',
					value: 'Target Value (Low to High)'
				},
				{
					label: 'Target Value (High to Low)',
					value: 'Target Value (High to Low)'
				},
				{ label: 'Recently Created', value: 'Recently Created' },
				{ label: 'Recently Modified', value: 'Recently Modified' }
			];
		}
		// const menu = (
		//   <Menu>
		//     {options.map((item) => (
		//       <div
		//         onClick={() => {
		//           setLoading(true);
		//           onSelect(item.value);
		//         }}
		//       >
		//         {item.label}
		//       </div>
		//     ))}
		//   </Menu>
		// );
		return (
			<div style={{ position: 'relative' }}>
				{/* <div className="dropdown-prefix">
          {mode.charAt(0).toUpperCase() + mode.substring(1)}:
        </div> */}
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
					// defaultValue={mode === "filter" ? "Show All" : "Recently Modified"}
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

	// const RenderAdvancedFilterDrawer = ({
	//   showDrawer,
	//   toggleDrawer,
	//   filterCs,
	//   onAdvFilterSubmit,
	//   setBadgeFilterCount
	// }) => {
	//   const [form] = Form.useForm();
	//   const [filterCount, setFilterCount] = useState(0);
	//   const [formData, setFormData] = useState({
	//     searchName: filterFormData.searchName || undefined,
	//     tagName: filterFormData.tagName || undefined,
	//     stage: filterFormData.stage || undefined,
	//     type: filterFormData.type || undefined,
	//     targetAmountRange: filterFormData.targetAmountRange || undefined,
	//     ddrRange: filterFormData.ddrRange || undefined,
	//     targetAmountMin: filterFormData.targetAmountMin || undefined,
	//     targetAmountMax: filterFormData.targetAmountMax || undefined,
	//   });
	// useEffect(() => {
	//   const formDataKeys = Object.keys(formData);
	//   setFilterCount(
	//     formDataKeys.filter(
	//       (item) => formData[item] !== undefined && formData[item].length > 0
	//     ).length
	//   );
	//   setBadgeFilterCount(
	//     formDataKeys.filter(
	//       (item) => formData[item] !== undefined && formData[item].length > 0
	//     ).length
	//   );
	// }, [formData]);
	// const onValuesChange = (values) => {
	//   if (values.targetAmountRange) {
	//     if (values.targetAmountRange[0] < values.targetAmountRange[1]) {
	//       setFormData({
	//         ...formData,
	//         targetAmountRange: values.targetAmountRange,
	//         targetAmountMin: values.targetAmountRange[0],
	//         targetAmountMax: values.targetAmountRange[1],
	//       });
	//     }
	//     form.setFieldsValue({
	//       targetAmountRange: values.targetAmountRange,
	//       targetAmountMin: values.targetAmountRange[0],
	//       targetAmountMax: values.targetAmountRange[1],
	//     });
	//   } else if (values.targetAmountMin) {
	//     if (formData.targetAmountMax > values.targetAmountMin) {
	//       setFormData({
	//         ...formData,
	//         targetAmountMin: values.targetAmountMin,
	//         targetAmountRange: [
	//           values.targetAmountMin,
	//           formData.targetAmountRange[1],
	//         ],
	//       });
	//       form.setFieldsValue({
	//         targetAmountMin: values.targetAmountMin,
	//         targetAmountRange: [
	//           values.targetAmountMin,
	//           formData.targetAmountMax,
	//         ],
	//       });
	//     }
	//   } else if (values.targetAmountMax) {
	//     if (formData.targetAmountMin < values.targetAmountMax) {
	//       setFormData({
	//         ...formData,
	//         targetAmountMax: values.targetAmountMax,
	//         // targetAmountRange: [
	//         //   formData.targetAmountRange[0],
	//         //   values.targetAmountMax,
	//         // ],
	//       });
	//       form.setFieldsValue({
	//         targetAmountMax: values.targetAmountMax,
	//         // targetAmountRange: [
	//         //   formData.targetAmountMin,
	//         //   values.targetAmountMax,
	//         // ],
	//       });
	//     }
	//   } else if (values.ddrRange) {
	//     setFormData({
	//       ddrRange: values.ddrRange.map((date) => moment(date).toISOString()),
	//     });
	//   } else {
	//     setFormData({ ...formData, ...values });
	//   }
	// };
	// return (
	//   <Drawer
	//     width={"26vw"}
	//     className="oppor-list-advanced-filter-drawer-container"
	//     visible={showDrawer}
	//     onClose={toggleDrawer}
	//     closable
	//   >
	//     <div className="header">
	//       <div className="title">Filter</div>
	//       <div className="subtitle">
	//         {filterCount === 0 ? "No" : filterCount} tag
	//         {filterCount > 1 && "s "}
	//       </div>
	//     </div>

	//       <OpportunityListingFilterForm
	//         form={form}
	//         filterCs={filterCs}
	//         formData={formData}
	//         toggleDrawer={toggleDrawer}
	//         onFinish={onAdvFilterSubmit}
	//         onValuesChange={onValuesChange}
	//         setFilterFormData={setFilterFormData}
	//         setFormData={setFormData}
	//       />
	//     </Drawer>
	//   );
	// };
	// const RenderFiltersPanel = () => {
	// const [showDrawer, setShowDrawer] = useState(false);
	// const [filterCount, setFilterCount] = useState(0)
	// const toggleDrawer = () => {
	//   setShowDrawer(!showDrawer);
	// };
	// const onAdvancedFilterSubmit = (filterData) => {
	//   setFilterFormData(filterData);
	//   setFilterBy("Show All");
	//   setSortBy("Probability (High to Low)");
	// };
	// return (
	//   <div className="filters-panel">
	//     <div className="left">
	//       <FontAwesomeIcon
	//         icon={faWindowClose}
	//         className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
	//         onClick={() => {
	//           selectedRowKeys.length > 0 &&
	//             setOpportunityStageData({
	//               ...opportunityStageData,
	//               recordId: selectedRowKeys,
	//               status: "CLOSE",
	//               stage: "LOSS",
	//             });
	//           selectedRowKeys.length > 0 && setShowUpdateStageModal(true);
	//         }}
	//       />
	//       <FontAwesomeIcon
	//         icon={faTrashAlt}
	//         className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
	//         onClick={() =>
	//           selectedRowKeys.length > 0 && setShowDeleteModal(true)
	//         }
	//       />
	//     </div>
	//     <RenderDropdown mode="filter" onSelect={onFilterSelect} />
	//     <RenderDropdown mode="sort" onSelect={onSortSelect} />
	//     <div className="right">
	//     <div className="icon-filter-wrapper">
	//       <FontAwesomeIcon
	//         icon={faFilter}
	//         className={loading ? "disabled-icon" : "icon"}
	//         onClick={() => {
	//           toggleDrawer();
	//         }}
	//       />
	//        {/* {filterCount > 0 && <span class="filter-badge"></span>} */}
	//        {isFilterApplied && <span class="filter-badge"></span>}
	//       </div>
	//       <FontAwesomeIcon
	//         icon={faArrowAltToBottom}
	//         className={loading ? "disabled-icon" : "icon"}
	//         onClick={() => {
	//           downloadRecords();
	//         }}
	//       />
	//       <FontAwesomeIcon
	//         icon={cardViewMode ? faThList : faThLarge}
	//         className={loading ? "disabled-icon" : "icon"}
	//         onClick={() => {
	//           toggleCardViewMode();
	//         }}
	//       />
	//     </div>

	//     {/* <RenderAdvancedFilterDrawer
	//       showDrawer={showDrawer}
	//       toggleDrawer={toggleDrawer}
	//       onAdvFilterSubmit={onAdvancedFilterSubmit}
	//       filterCs={controlStructure}
	//       setBadgeFilterCount={setFilterCount}
	//     /> */}
	//      <GenericAdvancedFilterDrawer
	//       showDrawer={showDrawer}
	//       toggleDrawer={toggleDrawer}
	//       closable={true}
	//       advFilters={advFilters}
	//       setAdvFilters={(obj) => setAdvFilters(obj)}
	//       setIsFilterApplied={setIsFilterApplied}
	//       setTableData={(data) => {
	//         // {console.log("dataaaaaa",data)}
	//         setLocalOpportunityData(data);
	//         if (data) {
	//           setFilterBy("Show All");
	//           setSortBy("Probability (High to Low)");
	//         }
	//       }}
	//       cacheData={allOpportunityData}
	//       advFilterData={ opportunityAdvFilter}
	//     />
	//   </div>

	// );
	// };
	const onCellDefault = (row, rowIndex) => {
		const opportunityIds = miniMode
			? miniComponentData &&
			  miniComponentData.tableData &&
			  miniComponentData.tableData.map((item) => item.opportunityId)
			: localOpportunityData && localOpportunityData.map((item) => item.opportunityId);
		const index = miniMode
			? miniComponentData &&
			  miniComponentData.tableData &&
			  [
					...miniComponentData.tableData.map((item, index) => {
						if (item.opportunityId === row.opportunityId) {
							return index;
						} else return null;
					})
			  ].filter((item) => item !== null)
			: localOpportunityData &&
			  [
					...localOpportunityData.map((item, index) => {
						if (item.opportunityId === row.opportunityId) {
							return index;
						} else return null;
					})
			  ].filter((item) => item !== null);
		const toObject = {
			pathname: miniMode ? `MyOpportunity/OpportunityView` : `${url}/OpportunityView`,
			state: {
				opportunityIds: opportunityIds,
				rowIndex: index[0],
				miniMode: miniMode ? true : false
			}
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
	const onCellFavourite = (record, rowIndex) => {
		return {
			onClick: (event) => {
				addFavouriteOpportunityApi(record.opportunityId, CONSTANTS.progNames.OPPORTUNITYADD)
					.then((res) => {})
					.catch((err) => {
						console.log('EEROR: ', err);
					})
					.finally(() => {
						miniMode
							? miniComponentData.getData()
							: executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
					});
			}, // click row
			onDoubleClick: (event) => {}, // double click row
			onContextMenu: (event) => {}, // right button click row
			onMouseEnter: (event) => {}, // mouse enter row
			onMouseLeave: (event) => {} // mouse leave row
		};
	};

	return (
		<div className='opportunity-listing-container' style={miniMode && { padding: 0 }}>
			{showFailModal && (
				<FailModal
					visible={showFailModal}
					onOk={() => {
						setShowFailModal(false);
					}}
					onCancel={() => {
						setShowFailModal(false);
					}}
					errorArray={opErrorArray && opErrorArray.length > 0 ? opErrorArray : null}
				/>
			)}

			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							setDeleteMessage();
						}}
					>
						Ok
					</Button>
				}
				centered
			>
				<SuccessModal message={deleteMessage} />
			</Modal>
			{opportunityStageData.recordId && (
				<OpportunityUpdateStageModal
					selectedRows={selectedRows}
					records={selectedRowKeys[0]}
					visible={showUpdateStageModal}
					handleCancel={() => {
						cancelOperation('updateStage');
					}}
					handleOk={handleUpdateStageOk}
					stageData={opportunityStageData}
					status='close'
				/>
			)}
			<RenderConfirmDeleteModal />
			{!miniMode && (
				<>
					<RenderTopBar />
					<div className='filters-panel'>
						<div className='left'>
							<Tooltip title='Update Stage'>
								<FontAwesomeIcon
									icon={faWindowClose}
									className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
									onClick={() => {
										selectedRowKeys.length > 0 &&
											setOpportunityStageData({
												...opportunityStageData,
												recordId: selectedRowKeys,
												status: 'CLOSE',
												stage: 'LOSS'
											});
										selectedRowKeys.length > 0 && setShowUpdateStageModal(true);
									}}
								/>
							</Tooltip>
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
								{/* {filterCount > 0 && <span class="filter-badge"></span>} */}
								{isFilterApplied && <span class='filter-badge'></span>}
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
									icon={cardViewMode ? faThList : faThLarge}
									className={loading ? 'disabled-icon' : 'icon'}
									onClick={() => {
										toggleCardViewMode();
									}}
								/>
							</Tooltip>
						</div>
						<GenericAdvancedFilterDrawer
							showDrawer={showDrawer}
							toggleDrawer={toggleDrawer}
							closable={true}
							defaultAdvState={defaultAdvState}
							setIsFilterApplied={setIsFilterApplied}
							setTableData={(data) => {
								setLocalOpportunityData(data);
								if (data) {
									setFilterBy('Show All');
									setSortBy('Probability (High to Low)');
								}
							}}
							cacheData={allOpportunityData}
							advFilterData={opportunityAdvFilter}
						/>
					</div>
				</>
			)}

			{!cardViewMode ? (
				<OpportunityTable
					onCellDefault={onCellDefault}
					onCellFavourite={onCellFavourite}
					loading={loading}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					selectedRowKeys={selectedRowKeys}
					setSelectedRowKeys={setSelectedRowKeys}
					setOpportunityStageData={setOpportunityStageData}
					setShowUpdateStageModal={setShowUpdateStageModal}
					tableData={miniMode ? miniComponentData.tableData : localOpportunityData}
					miniMode={miniMode}
					onSortSelect={onSortSelect}
					sortBy={sortBy}
					valueFiltered={valueFiltered}
					isrecentData={isrecentData}
					authorizeCode={authorizeCode}
				/>
			) : (
				<OpportunityListingCard
					data={localOpportunityData}
					setLocalOpportunityData={setLocalOpportunityData}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					selectedRowKeys={selectedRowKeys}
					setSelectedRowKeys={setSelectedRowKeys}
					opportunityStageData={opportunityStageData}
					setOpportunityStageData={setOpportunityStageData}
					setShowUpdateStageModal={setShowUpdateStageModal}
					loading={loading}
					setLoading={setLoading}
					authorizeCode={authorizeCode}
				/>
			)}
			{!miniMode && localOpportunityData && <BackToTop />}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		opportunityListingCs: state.opportunityListing.controlStructure,
		allOpportunityData:
			state.opportunityListing &&
			state.opportunityListing.allOpportunity &&
			state.opportunityListing.allOpportunity.opportunityListResponse,
		highProbability:
			state.opportunityListing &&
			state.opportunityListing.allOpportunity &&
			state.opportunityListing.allOpportunity.highProbability,
		rowsCount:
			state.opportunityListing &&
			state.opportunityListing.allOpportunity &&
			state.opportunityListing.allOpportunity.rowCount,

		opportunityAdvFilter:
			state.opportunityListing &&
			state.opportunityListing.getOpportunityAdvFilter &&
			state.opportunityListing.getOpportunityAdvFilter.advancedFiltersList,
		leftPanel: state.dashboard.leftPanel
	};
};
const mapDispatchToProps = {
	executeGetOpportunityListingCs,
	executeGetAllOpportunityData
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityListingScreen);

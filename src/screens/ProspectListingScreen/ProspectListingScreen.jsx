import React, { useEffect, useState } from 'react';
import { Button, Table, Select, Modal, Tooltip, Form } from 'antd';
import './ProspectListingScreen.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { assets } from '../../constants/assetPaths';
import {
	faArrowCircleDown,
	faChevronSquareUp,
	faTrashAlt,
	faChevronSquareDown,
	faUserCheck
} from '@fortawesome/pro-light-svg-icons';
import {
	faFilter,
	faArrowAltToBottom,
	faThLarge,
	faThList,
	faRedo
} from '@fortawesome/pro-solid-svg-icons';
import { connect } from 'react-redux';
import {
	executeGetProspectListingCs,
	executeGetAllProspectData,
	executeGetProspectAdvancedFilter
} from '../../redux/actions/prospectListingActions';
import {
	excecuteGetProspect360View,
	getProspectDependantData
} from '../../redux/actions/prospectViewActions';
import { exportJSON, generateCsObject } from '../../utils/utils';
import { addFavouriteProspectApi, deleteSelectedProspectApi } from '../../api/prospectListingApi';
import { doRefreshClientApi } from '../../api/customerListingApi';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import RenderConfirmDowngradeModal from './RenderConfirmDowngradeModal';
import RenderConfirmUpgradeModal from './RenderConfirmUpgradeModal';
import ProspectCard from '../../components/ProspectCard/ProspectCard';
import ProspectTable from '../../components/ProspectTable/ProspectTable';
import TopBarHeader from '../../components/TopBarHeader/TopBarHeader';
import RenderConvertToCustomerModal from '../ProspectViewScreen/ProspectModals/RenderConvertToCustomerModal';
import RenderMapToExistingCustomerModal from '../ProspectViewScreen/ProspectModals/RenderMapToExistingCustomerModal';
import { postConvertProspectToCustomer } from '../../api/prospectViewApi';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import GenericAdvancedFilterDrawer from '../../components/GenericAdvancedFilter/GenericAdvancedFilter';
import BackToTop from '../../components/BackToTop/BackToTop';
import AssignModal from '../../components/Assign/AssignModal';
// import RenderDowngradeModal from './RenderDowngradeModal';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { ScButtonPrimary, ScButtonText } from '../../components/StyledComponents/genericElements';

function ProspectListingScreen(props) {
	const {
		executeGetProspectListingCs,
		executeGetAllProspectData,
		prospectListingCs,
		allProspectData,
		miniComponentData,
		miniMode,
		prospectViewData,
		prospectConversionDependantData,
		prospectAdvFilter,
		leftPanel,
		getProspectDependantData
	} = props;
	const emptyArray = 'emptyArray';
	const defaultAdvState = { Dropdown: {}, Autocomplete: {} };
	const [loading, setLoading] = useState();
	const [isRefresh, setRefresh] = useState(false);
	const [cardViewMode, setCardViewMode] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteFailedArray, setDeleteFailedArray] = useState();
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [showDowngradeModal, setShowDowngradeModal] = useState(false);
	const [showMovedownModal, setShowMovedownModal] = useState(false);
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const [headerName, setHeaderName] = useState('');
	const [submitText, setSubmitText] = useState('');
	const [showDowngradeProspectModal, setShowDowngradeProspectModal] = useState(false);
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [convertProspectModalOpen, setConvertProspectModalOpen] = useState(false);
	const [currentRowCount, setcurrentRowCount] = useState(null);
	const [prospectViewRefId, setProspectViewRefId] = useState(null);
	const [convertToCustomer, setConvertToCustomer] = useState('');
	const [mapToExistingCustomer, setMapToExistingCustomer] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [localProspectData, setLocalProspectData] = useState(
		(miniMode && miniComponentData.tableData) || allProspectData
	);
	const [filterBy, setFilterBy] = useState('Show All');
	const [sortBy, setSortBy] = useState('Creation Date Near To Far');
	const [upgradeFailedArray, setUpgradeFailedArray] = useState(emptyArray);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);
	const { path } = useRouteMatch();
	const history = useHistory();
	const [showAssignModal, setAssignModal] = useState(false);

	const controlStructure =
		prospectListingCs &&
		Array.isArray(prospectListingCs) &&
		prospectListingCs.length > 0 &&
		generateCsObject(prospectListingCs[0].controlStructureField);

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};

	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'PROSPECTADD') authorizeCode = subMenu.authorizeCode;
			});
		});
	useEffect(() => {
		setCardViewMode(Boolean.valueOf(sessionStorage.getItem('cardViewMode')));
		executeGetProspectAdvancedFilter();
		executeGetProspectListingCs();
		!miniMode && executeGetAllProspectData(setLocalProspectData, setLoading);
	}, []);

	useEffect(() => {
		executeGetAllProspectData(setLocalProspectData, setLoading);
		setRefresh(false);
		setSelectedRows([]);
		setSelectedRowKeys([]);
	}, [isRefresh]);

	useEffect(() => {
		excecuteGetProspect360View(prospectViewRefId);
		let payload = {
			FieldListId: 13,
			progName: 'PROSPECTADD',
			DependentValue: {
				RefType: 'CLIENTADD'
			}
		};

		getProspectDependantData(payload);
	}, [prospectViewRefId]);

	const onMapToExistingCustomer = (clientId, prospectId) => {
		let requestPayload = {
			clientId: clientId,
			prospectId: prospectId
		};
		postConvertProspectToCustomer(requestPayload)
			.then((res) => {
				if (res.data.success) {
					setShowSuccessModal(true);
				} else {
					setErrorArray([
						{
							message: res.data.message
						}
					]);
					setShowFailModal(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		setMapToExistingCustomer(false);
	};

	const toggleCardViewMode = () => {
		setCardViewMode(!cardViewMode);
	};

	const closeModal = (operationName) => {
		setDeleteFailedArray();
		operationName === 'delete' && setShowDeleteModal(false);
		if (operationName.toLowerCase() === 'downgrade') {
			setShowDowngradeModal(false);
			setUpgradeFailedArray(emptyArray);
		}
		operationName === 'movedown' && setShowMovedownModal(false);
		if (operationName.toLowerCase() === 'upgrade') {
			setShowUpgradeModal(false);
			setUpgradeFailedArray(emptyArray);
		}
		setSelectedRowKeys([]);
		setSelectedRows([]);
		executeGetAllProspectData(setLocalProspectData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'delete' && setShowDeleteModal(false);
		operationName.toLowerCase() === 'downgrade' && setShowDowngradeModal(false);
		operationName === 'movedown' && setShowMovedownModal(false);
		// operationName === "downgradeProspect" && setShowDowngradeProspectModal(false);
		operationName.toLowerCase() === 'upgrade' && setShowUpgradeModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	const handleConfirmDeleteModalOk = () => {
		deleteSelectedProspectApi(selectedRowKeys).then((res) => {
			setDeleteFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const downloadRecords = () => {
		const downloadData =
			selectedRows && selectedRows.length > 0
				? selectedRows.map((prospect, index) => ({
						'Sr.No': index + 1,
						Name: prospect.name,
						Category: prospect.categoryName,
						'Interest Level': prospect.interestlevel === 'H' ? 'Hot' : 'Cold',
						Contact: prospect.mobile,
						Email: prospect.email,
						Source: prospect.sourceName,
						Type: prospect.typeName,
						'Relationship Manager': prospect.relationshipManagerName
				  }))
				: localProspectData.map((prospect, index) => ({
						'Sr.No': index + 1,
						Name: prospect.name,
						Category: prospect.categoryName,
						'Interest Level': prospect.interestlevel === 'H' ? 'Hot' : 'Cold',
						Contact: prospect.mobile,
						Email: prospect.email,
						Source: prospect.sourceName,
						Type: prospect.typeName,
						'Relationship Manager': prospect.relationshipManagerName
				  }));

		exportJSON(downloadData, 'prospects');
	};

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
						<div className='action-fail-modal' style={{ display: 'flex', flexDirection: 'column' }}>
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
						<ScButtonText
							type='text'
							onClick={() => {
								closeModal(operationName);
							}}
						>
							Ok
						</ScButtonText>
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
						<ScButtonText
							type='text'
							onClick={() => {
								closeModal(operationName);
							}}
						>
							Ok
						</ScButtonText>
					</div>
				</>
			);
		};
		return <>{!showFailedActions ? <FailScreen /> : <ListFailedActionsScreen />}</>;
	};

	const RenderConfirmDeleteModal = () => {
		const ConfirmScreen = () => (
			<>
				<div className='modal-header'>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Prospects</div>
				</div>
				<div className='modal-body'>
					Are you sure you want to delete
					{selectedRowKeys.length > 1
						? ` ${selectedRowKeys.length} `
						: selectedRowKeys.length === 1 && ' '}
					selected Prospect{selectedRowKeys.length > 1 ? 's' : ' '}?
					<div className='modal-body-subtext'>
						<img src={assets.common.triangleExclamation} alt='fail' className='subtext-icon' />
						<div className='modal-subtext'>
							<span className='subtext-title'>
								Warning: All open opportunities for selected Prospect/s shall be marked as Missed.
							</span>
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
					<div
						className='action-success-modal'
						style={{ display: 'flex', flexDirection: 'column' }}
					>
						<div className='title'>
							{selectedRowKeys.length}/{selectedRowKeys.length} Successful Action
						</div>
						<div className='subtitle'>Your action has been completed successfully</div>
					</div>
				</div>
				<div className='modal-footer'>
					<ScButtonText
						type='text'
						onClick={() => {
							closeModal(operationName);
						}}
					>
						Ok
					</ScButtonText>
				</div>
			</div>
		</>
	);

	const onFilterSelect = (value) => {
		// filter operation
		let filteredProspectList;
		switch (value) {
			case 'Show All':
				filteredProspectList = allProspectData;
				break;
			case 'Favourites':
				filteredProspectList =
					allProspectData && allProspectData.filter((item) => item.isFavourite);
				break;
			case 'Hot Prospects':
				filteredProspectList =
					allProspectData && allProspectData.filter((item) => item.interestlevel === 'H');
				break;
			case 'Qualified Prospects':
				filteredProspectList =
					allProspectData && allProspectData.filter((item) => item.qualificationStatus === 'Q');
				break;
			case 'Recently Modified (Modified in last 30 days)':
				filteredProspectList =
					allProspectData &&
					allProspectData.filter((item) => {
						return item.version > 1;
					});
				break;
			case 'Created in last 7 Days':
				filteredProspectList =
					allProspectData && allProspectData.filter((item) => item.createdDays <= 7);
				break;
			case 'Created in last 15 Days':
				filteredProspectList =
					allProspectData && allProspectData.filter((item) => item.createdDays <= 15);
				break;
			case 'Created in last 30 Days':
				filteredProspectList =
					allProspectData && allProspectData.filter((item) => item.createdDays <= 30);
				break;
			default:
				break;
		}
		if (filteredProspectList) {
			setFilterBy(value);
			setLocalProspectData(filteredProspectList);
		} else {
			setLocalProspectData(allProspectData);
		}
		setLoading(false);
	};
	const onSortSelect = (value) => {
		// sort operation
		let sortedProspectList;
		switch (value) {
			case 'Creation Date Near To Far':
				let prospectListVersion1 = localProspectData?.filter((item) => item?.version === 1);
				let prospectListVersion2 = localProspectData?.filter((item) => item?.version === 2);
				prospectListVersion1 = prospectListVersion1?.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				prospectListVersion2 = prospectListVersion2?.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});

				sortedProspectList = [...prospectListVersion1, ...prospectListVersion2];

				break;
			case 'Creation Date Far To Near':
				let prospectListVersionFar1 = localProspectData?.filter((item) => item?.version === 1);
				let prospectListVersionFar2 = localProspectData?.filter((item) => item?.version === 2);
				prospectListVersionFar1 = prospectListVersionFar1?.sort((a, b) => {
					const aTimestamp = moment(a?.inputDateTime);
					const bTimestamp = moment(b?.inputDateTime);
					return aTimestamp?.diff(bTimestamp);
				});
				prospectListVersionFar2 = prospectListVersionFar2?.sort((a, b) => {
					const aTimestamp = moment(a?.inputDateTime);
					const bTimestamp = moment(b?.inputDateTime);
					return aTimestamp?.diff(bTimestamp);
				});
				sortedProspectList = [...prospectListVersionFar2, ...prospectListVersionFar1];
				break;
			case 'Modification Near To Far':
				let prospectListNearVersion2 = localProspectData?.filter((item) => item.version === 1);
				let prospectListNearVersion1 = localProspectData?.filter((item) => item.version >= 2);
				prospectListNearVersion1 = prospectListNearVersion1?.sort((a, b) => {
					return b.version - a.version;
				});
				prospectListNearVersion2 = prospectListNearVersion2?.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				sortedProspectList = [...prospectListNearVersion1, ...prospectListNearVersion2];
				break;
			case 'Modification Far To Near':
				let prospectListfar2Version = localProspectData?.filter((item) => item.version === 1);
				let prospectListFar1Version = localProspectData?.filter((item) => item.version >= 2);
				prospectListFar1Version = prospectListFar1Version?.sort((a, b) => {
					return a.version - b.version;
				});
				prospectListfar2Version = prospectListfar2Version?.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return aTimestamp.diff(bTimestamp);
				});
				sortedProspectList = [...prospectListFar1Version, ...prospectListfar2Version];
				break;
			default:
				break;
		}

		if (sortedProspectList) {
			setSortBy(value);
			setLocalProspectData(sortedProspectList);
		} else {
			setLocalProspectData(allProspectData);
		}
		setLoading(false);
	};

	const RenderDropdown = ({ mode, onSelect }) => {
		let options = [];
		if (mode === 'filter') {
			options = [
				{ label: 'Show All', value: 'Show All' },
				{ label: 'Hot Prospects', value: 'Hot Prospects' },
				{ label: 'Qualified Prospects', value: 'Qualified Prospects' },
				{ label: 'Favourites', value: 'Favourites' },
				// {
				// 	label: 'Recently Modified (Modified in last 30 days)',
				// 	value: 'Recently Modified (Modified in last 30 days)'
				// },
				{ label: 'Created in last 7 Days', value: 'Created in last 7 Days' },
				{ label: 'Created in last 15 Days', value: 'Created in last 15 Days' },
				{ label: 'Created in last 30 Days', value: 'Created in last 30 Days' }
			];
		} else if (mode === 'sort') {
			options = [
				{
					label: 'Creation Date Near To Far',
					value: 'Creation Date Near To Far'
				},
				{
					label: 'Creation Date Far To Near',
					value: 'Creation Date Far To Near'
				},
				{
					label: 'Modification Near To Far',
					value: 'Modification Near To Far'
				},
				{
					label: 'Modification Far To Near',
					value: 'Modification Far To Near'
				}
			];
		}
		return (
			<div style={{ position: 'relative' }}>
				<div className='dropdown-prefix'>{mode.charAt(0).toUpperCase() + mode.substring(1)}:</div>
				<Select
					className={`filter-sort-dropdown ${mode}`}
					size='large'
					onSelect={onSelect}
					value={mode === 'filter' ? filterBy : sortBy}
					showArrow={true}
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

	const onCellDefault = (row, rowIndex) => {
		const prospectIds = localProspectData.map((item) => item.prospectId);

		const index = [
			...localProspectData.map((item, index) => {
				if (item.prospectId === row.prospectId) {
					return index;
				} else return null;
			})
		].filter((item) => item !== null);
		const toObject = {
			pathname: `${path}/ProspectView`,
			state: { prospectIds: prospectIds, rowIndex: index[0] }
		};
		return {
			onClick: (event) => {
				{
					authorizeModule(authorizeCode, CONSTANTS.authorizeCode.view) && history.push(toObject);
				}
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
				addFavouriteProspectApi(record.prospectId, CONSTANTS.progNames.PROSPECTADD)
					.then((res) => {})
					.catch((err) => {
						console.log('EEROR: ', err);
					})
					.finally(() => {
						executeGetAllProspectData(setLocalProspectData, setLoading);
					});
			}, // click row
			onDoubleClick: (event) => {}, // double click row
			onContextMenu: (event) => {}, // right button click row
			onMouseEnter: (event) => {}, // mouse enter row
			onMouseLeave: (event) => {} // mouse leave row
		};
	};
	const showUpDowngradeModal = (modal) => {
		if (modal === 'Upgrade') {
			setShowUpgradeModal(true);
			setHeaderName('Upgrade Prospect');
			setSubmitText(modal);
		}
		if (modal === 'Downgrade') {
			setShowDowngradeModal(true);
			setHeaderName('Downgrade Prospect');
			setSubmitText(modal);
		}
	};

	return (
		<div className='prospect-listing-container'>
			<AssignModal
				showAssignModal={showAssignModal}
				setAssignModal={setAssignModal}
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				cs={controlStructure}
				setRefresh={setRefresh}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
			/>
			<RenderConfirmDowngradeModal
				props={props}
				showMovedownModal={showMovedownModal}
				setShowMovedownModal={setShowMovedownModal}
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				selectedRows={selectedRows}
				setRefresh={setRefresh}
				setSelectedRows={setSelectedRows}
			/>
			<RenderConfirmUpgradeModal
				props={props}
				headerName={headerName}
				submitText={submitText}
				cancelOperation={cancelOperation}
				showUpgradeModal={showUpgradeModal}
				selectedRowKeys={selectedRowKeys}
				closeModal={closeModal}
				controlStructure={controlStructure}
				selectedRows={selectedRows}
				upgradeFailedArray={upgradeFailedArray}
				setUpgradeFailedArray={setUpgradeFailedArray}
			/>
			<RenderConfirmUpgradeModal
				props={props}
				headerName={headerName}
				submitText={submitText}
				cancelOperation={cancelOperation}
				showUpgradeModal={showDowngradeModal}
				selectedRowKeys={selectedRowKeys}
				closeModal={closeModal}
				controlStructure={controlStructure}
				selectedRows={selectedRows}
				upgradeFailedArray={upgradeFailedArray}
				setUpgradeFailedArray={setUpgradeFailedArray}
			/>
			{/* <RenderDowngradeModal
        props={props}
        cancelOperation={cancelOperation}
        showUpgradeModal={showDowngradeProspectModal}
        selectedRowKeys={selectedRowKeys}
        closeModal={closeModal}
        controlStructure={controlStructure}
        selectedRows={selectedRows}
        upgradeFailedArray={upgradeFailedArray}
        setUpgradeFailedArray={setUpgradeFailedArray}
      /> */}
			<RenderConfirmDeleteModal />
			<TopBarHeader
				headerName={'My Prospects'}
				buttonTitle={'Add'}
				authorizeCode={authorizeCode}
				navigationLink={'/dashboard/MyProspect/ProspectCreate'}
			/>
			<div className='filters-panel'>
				<div className='left'>
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.assign) && (
						<Tooltip title='Assign'>
							<FontAwesomeIcon
								icon={faUserCheck}
								className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
								onClick={() => selectedRowKeys.length > 0 && setAssignModal(true)}
							/>
						</Tooltip>
					)}
					{/* <Tooltip title="Upgrade">
            <FontAwesomeIcon
              icon={faChevronSquareUp}
              className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={() => selectedRowKeys.length > 0 && showUpDowngradeModal('Upgrade')}
            />
          </Tooltip> */}
					{/* <Tooltip title="Downgrade">
            <FontAwesomeIcon
              icon={faChevronSquareDown}
              className={selectedRowKeys.length === 0 ?  "disabled-icon" : "icon"}
              onClick={() => selectedRowKeys.length > 0 && showUpDowngradeModal('Downgrade')}
            />
          </Tooltip> */}
					{/* <Tooltip title="Move Down">
            <FontAwesomeIcon
              icon={faArrowCircleDown}
              className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={() => selectedRowKeys.length > 0 && setShowMovedownModal(true)}
            />
          </Tooltip> */}
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
								className='icon'
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
					<FontAwesomeIcon
						icon={faRedo}
						className={loading ? 'disabled-icon' : 'icon'}
						onClick={() => {
							doRefreshClientApi()
								.then((res) => {
									if (res.status === 200) {
										executeGetAllProspectData(setLocalProspectData, setLoading);
									}
								})
								.catch((err) => {
									console.log(err);
								});
						}}
					/>
					{/* This map icon will be taken in phase 2 */}
					{/* <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className={loading ? "disabled-icon" : "icon"}
          /> */}
				</div>
				<GenericAdvancedFilterDrawer
					showDrawer={showDrawer}
					toggleDrawer={toggleDrawer}
					closable={true}
					defaultAdvState={defaultAdvState}
					setIsFilterApplied={setIsFilterApplied}
					setTableData={(data) => {
						setLocalProspectData(data);
						if (data) {
							setFilterBy('Show All');
							setSortBy('Recently Modified (modified in last 7 days)');
						}
					}}
					cacheData={allProspectData}
					advFilterData={prospectAdvFilter}
				/>
			</div>

			{!cardViewMode ? (
				<ProspectTable
					onCellDefault={onCellDefault}
					onCellFavourite={onCellFavourite}
					loading={loading}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					selectedRowKeys={selectedRowKeys}
					setSelectedRowKeys={setSelectedRowKeys}
					tableData={localProspectData}
					setShowMovedownModal={setShowMovedownModal}
					setConvertProspectModalOpen={setConvertProspectModalOpen}
					setcurrentRowCount={setcurrentRowCount}
					setProspectViewRefId={setProspectViewRefId}
					authorizeCode={authorizeCode}
				/>
			) : (
				<ProspectCard
					data={localProspectData}
					setLocalProspectData={setLocalProspectData}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					selectedRowKeys={selectedRowKeys}
					setSelectedRowKeys={setSelectedRowKeys}
					loading={loading}
					setLoading={setLoading}
					setShowMovedownModal={setShowMovedownModal}
					setConvertProspectModalOpen={setConvertProspectModalOpen}
					setcurrentRowCount={setcurrentRowCount}
					setProspectViewRefId={setProspectViewRefId}
					authorizeCode={authorizeCode}
				/>
			)}
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={[
					<ScButtonText
						onClick={() => {
							setShowSuccessModal(false);
							// history.goBack();
							setRefresh(true);
							// setSelectedRows([]);
							// setSelectedRowKeys([]);
						}}
						key={'ok'}
					>
						OK
					</ScButtonText>
				]}
				centered
			>
				<SuccessModal message='Action Completed Successfully' />
			</Modal>
			<FailModal
				visible={showFailModal}
				onOk={setShowFailModal}
				onCancel={setShowFailModal}
				errorArray={errorArray}
			/>
			<RenderConvertToCustomerModal
				convertProspectModalOpen={convertProspectModalOpen}
				setConvertProspectModalOpen={setConvertProspectModalOpen}
				setMapToExistingCustomer={setMapToExistingCustomer}
				prospectViewData={prospectViewData}
				prospectViewRefId={prospectViewRefId}
				currentRowCount={currentRowCount}
			/>
			<RenderMapToExistingCustomerModal
				mapToExistingCustomer={mapToExistingCustomer}
				setMapToExistingCustomer={setMapToExistingCustomer}
				prospectViewData={prospectViewData}
				prospectViewRefId={prospectViewRefId}
				currentRowCount={currentRowCount}
				prospectConversionDependantData={prospectConversionDependantData}
				convertToCustomer={convertToCustomer}
				setConvertToCustomer={setConvertToCustomer}
				onMapToExistingCustomer={onMapToExistingCustomer}
			/>
			<BackToTop />
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		prospectListingCs: state.prospectListing.controlStructure,
		allProspectData:
			state.prospectListing &&
			state.prospectListing.allProspect &&
			state.prospectListing.allProspect.prospectListResponseModel,
		rowsCount:
			state.prospectListing &&
			state.prospectListing.allProspect &&
			state.prospectListing.allProspect.rowCount,
		prospectViewData: state.prospectView.prospectViewData,
		prospectConversionDependantData: state.prospectView.prospectConversionDependantData,
		prospectAdvFilter:
			state.prospectListing &&
			state.prospectListing.getProspectAdvFilter &&
			state.prospectListing.getProspectAdvFilter.advancedFiltersList,
		leftPanel: state.dashboard.leftPanel
	};
};
const mapDispatchToProps = {
	executeGetProspectListingCs,
	executeGetAllProspectData,
	excecuteGetProspect360View,
	getProspectDependantData
};

export default connect(mapStateToProps, mapDispatchToProps)(ProspectListingScreen);

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Tooltip } from 'antd';
import { connect } from 'react-redux';
import {
	excecuteGetProspect360View,
	getProspectDependantData,
	executeSaveProspectEditDetail
} from '../../redux/actions/prospectViewActions';
import { deleteProspectApi, downgradeProspectApi } from '../../api/prospectViewApi';
import './ProspectViewScreen.scss';
import 'antd/dist/antd.css';
import TextSubText from './ProspectComponent/TextSubText';
import CustomerSourceView from './ProspectComponent/CustomerSourceCardView';
import AttachmentsCardView from './ProspectComponent/AttachmentsCardView';
import MiscellaneousCardView from './ProspectComponent/MiscellaneousCardView';
import ProspectOpportunityCardView from './ProspectComponent/ProspectOpportunityCardView';
import InteractionCardView from './ProspectComponent/InteractionCardView';
import TaskCardView from './ProspectComponent/TaskCardView';
// import NotesCardView from "./ProspectComponent/NotesCardView";
import ProspectVerticalTimelineCardView from './ProspectComponent/VerticalTimelineCardView';
import BackToTop from '../../components/BackToTop/BackToTop';
import {
	Button,
	Layout,
	PageHeader,
	Card,
	Row,
	Col,
	Modal,
	Space,
	Typography,
	Popover,
	Form,
	Select,
	Input,
	Table
} from 'antd';

import {
	faArrowLeft,
	faSyncAlt,
	faArrowCircleDown,
	faArrowCircleUp
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faChevronSquareUp,
	faChevronSquareDown
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { faEllipsisVAlt } from '@fortawesome/pro-light-svg-icons';
import ProspectViewPageHeaderDetail from './ProspectViewPageHeaderDetail';
import ProspectDetailsCardView from './ProspectDetailsCardView';
import RealtionDetailsCardView from './RealtionDetailsCardView';
// import { DocumentCardWithUpload } from './DocumentUploadDetails';

import { DocumentCardWithUpload } from '../../components/DocumentTable/DocumentCardWithUpload';
import KYCValidationDetails from './KycValidationDetails';
import RiskProfile from './RiskProfile';
import RenderConvertToCustomerModal from './ProspectModals/RenderConvertToCustomerModal';
import RenderMapToExistingCustomerModal from './ProspectModals/RenderMapToExistingCustomerModal';
import { postConvertProspectToCustomer } from '../../api/prospectViewApi';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import { generateCsObject } from '../../utils/utils';
import { upgradeSelectedProspectApi } from '../../api/prospectListingApi';
import { assets } from '../../constants/assetPaths';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';

const { Content } = Layout;
const { Link } = Typography;

function ProspectViewScreen(props) {
	const {
		excecuteGetProspect360View,
		getProspectDependantData,
		prospectViewData,
		verticalTimelineDetail,
		prospectOpportunityDetail,
		prospectMiscellaneousDetail,
		prospectAttachmentsDetail,
		prospectNotesDetail,
		prospectTaskDetail,
		prospectInteractionDetail,
		prospectRelationDetail,
		prospectCustomerDetail,
		prospectConversionDependantData,
		prospectListingCs,
		leftPanel,
		authData
	} = props;
	const location = useLocation();
	const [form] = Form.useForm();
	const controlStructure =
		prospectListingCs &&
		Array.isArray(prospectListingCs) &&
		prospectListingCs.length > 0 &&
		generateCsObject(prospectListingCs[0].controlStructureField);
	const emptyArray = 'emptyArray';
	const [upgradeFailedArray, setUpgradeFailedArray] = useState(emptyArray);
	const [prospectViewRefId, setProspectViewRefId] = useState();
	const { prospectIds, rowIndex } = location.state;
	const [convertProspectModalOpen, setConvertProspectModalOpen] = useState(false);
	const [mapToExistingCustomer, setMapToExistingCustomer] = useState(false);
	const [convertToCustomer, setConvertToCustomer] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [showDowngradeProspectModal, setShowDowngradeProspectModal] = useState(false);
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const [showDowngradeModal, setShowDowngradeModal] = useState(false);
	const [downgradeProspectMessage, setDowngradeProspectMessage] = useState('');
	const [showSuccessFailureDowngradeModal, setShowSuccessFailureDowngradeModal] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const history = useHistory();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [currentRowCount, setcurrentRowCount] = useState(rowIndex);
	const [deleteProspectMessage, setDeleteProspectMessage] = useState('');
	const [categoryDropdownValues, setCategoryDropdownValues] = useState([]);
	const [categoryFlag, setCategoryFlag] = useState(false);
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [headerName, setHeaderName] = useState('');
	const [submitText, setSubmitText] = useState('');

	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'PROSPECTADD') authorizeCode = subMenu.authorizeCode;
			});
		});

	useEffect(() => {
		excecuteGetProspect360View(prospectViewRefId, setErrorMsg);
		let payload = {
			FieldListId: 13,
			progName: 'PROSPECTADD',
			DependentValue: {
				RefType: 'CLIENTADD'
			}
		};

		getProspectDependantData(payload);
	}, [prospectViewRefId]);
	useEffect(() => {
		setProspectViewRefId(prospectIds[currentRowCount]);
	}, [currentRowCount]);
	useEffect(() => {
		if (
			prospectViewData &&
			prospectViewData.prospectDetail &&
			prospectViewData.prospectDetail.categoryDataValue &&
			!categoryFlag
		) {
			let categoryDropdownValues = controlStructure?.Category?.dropDownValue.filter((item) => {
				return (
					parseInt(item.dataValue) > parseInt(prospectViewData.prospectDetail.categoryDataValue)
				);
			});
			setCategoryFlag(true);
			setCategoryDropdownValues(categoryDropdownValues);
		}
	}, [controlStructure, prospectViewData]);
	function handleEditClick() {
		const toObject = {
			pathname: '/dashboard/MyProspect/ProspectCreate',
			state: {
				// data: {
				// 	...prospectViewData,
				// 	attachments: prospectAttachmentsDetail,
				// 	relationDetail: prospectRelationDetail
				// },
				data: prospectViewRefId,
				prospectId: prospectViewRefId,
				rowIndex: currentRowCount,
				mode: 'edit',
				action: 'edit',
				screen: 'list'
			}
		};
		history.push(toObject);
	}
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
				return;
			});
		setMapToExistingCustomer(false);
	};

	function handleAddOpportunityClick() {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate',
			state: {
				data: {
					...prospectViewData
					// attachments: prospectAttachmentsDetail,
					// relationDetail: prospectRelationDetail,
				},
				prospectId: prospectViewRefId,
				rowIndex: currentRowCount,
				mode: 'create',
				screen: 'prospect-view'
			}
		};
		history.push(toObject);
	}
	const handleAddInteractionClick = () => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: {
				// data: {
				// 	...prospectViewData
				// },
				data: prospectViewData?.prospectDetail,
				prospectId: prospectViewRefId,
				rowIndex: currentRowCount,
				mode: 'create',
				screen: 'prospect-view'
			}
		};
		history.push(toObject);
	};
	const handleCreateOpportunityClick = () => {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate',
			state: {
				data: {
					...prospectViewData
				},
				prospectId: prospectViewRefId,
				rowIndex: currentRowCount,
				mode: 'create',
				screen: 'prospect-view'
			}
		};
		history.push(toObject);
	};

	const handleCreateTaskClick = () => {
		const toObject = {
			pathname: '/dashboard/TaskBoard/TaskCreate',
			state: {
				// data: {
				//   ...prospectViewData,
				// },
				data: prospectViewData?.prospectDetail,
				// prospectId: prospectViewRefId,
				// rowIndex: currentRowCount,
				mode: 'create',
				screen: 'prospect-view'
			}
		};
		history.push(toObject);
	};

	function handlePreviousClick() {
		if (currentRowCount !== 0) {
			setcurrentRowCount(currentRowCount - 1);
		}
	}

	function handleNextClick() {
		if (prospectIds.length === currentRowCount) {
			setcurrentRowCount(0);
		} else {
			setcurrentRowCount(currentRowCount + 1);
		}
	}

	const RenderMoreOptions = () => {
		const options = [
			'Create Opportunity',
			'Create Interaction',
			// "Take Note",
			'Create Task'
		];
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
								// setSelectedRowKeys([...selectedRowKeys, activityID]);
								// setSelectedRows([...selectedRows, dataObject]);
								option.toLowerCase() === 'create interaction' && handleAddInteractionClick();
								// option.toLowerCase() == "edit" &&
								// handleEditInteractionClick();
								// option.toLowerCase() === "create new interaction" &&
								// handleCreateInteractionClick();
								option.toLowerCase() === 'create opportunity' && handleCreateOpportunityClick();
								option.toLowerCase() === 'create task' && handleCreateTaskClick();
								// option.toLowerCase() === "update prospect/client" &&
								// handleUpdateProspectClick();
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<Popover
				placement='bottomLeft'
				content={content}
				overlayClassName='prospect-listing-actions-popover'
			>
				<FontAwesomeIcon icon={faEllipsisVAlt} size='sm' className='prospectViewTopBarIcons' />
			</Popover>
		);
	};

	const handleConfirmDowngradeModalOk = () => {
		downgradeProspectApi(prospectViewRefId).then((res) => {
			setShowSuccessFailureDowngradeModal(true);
			setDowngradeProspectMessage(res.data[0].message);
			setShowDowngradeProspectModal(false);
		});
	};

	const handleSuccessFailureDowngradeModalOk = () => {
		setShowSuccessFailureDowngradeModal(false);
	};

	const handleConfirmDowngradeModalCancel = () => {
		setShowDowngradeProspectModal(false);
	};

	const RenderSuccessFailureDowngradeModal = () => {
		return (
			<CustomModal
				visible={showSuccessFailureDowngradeModal}
				handleOk={handleSuccessFailureDowngradeModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faArrowCircleDown} />
					</div>
					<div className='header-title'>Move Down</div>
				</div>
				<div className='modal-body'>{downgradeProspectMessage}</div>
				<div className='modal-footer'>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleSuccessFailureDowngradeModalOk}
					>
						OK
					</Button>
				</div>
			</CustomModal>
		);
	};

	const RenderConfirmDowngradeModal = () => {
		return (
			<CustomModal
				visible={showDowngradeProspectModal}
				handleCancel={handleConfirmDowngradeModalCancel}
				handleOk={handleConfirmDowngradeModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faArrowCircleDown} />
					</div>
					<div className='header-title'>Move Down </div>
				</div>
				<div className='modal-body'>Are you sure you want to downgrade this prospect to lead?</div>
				<div className='modal-footer'>
					<Button
						className='text-only-btn'
						key='back'
						type='text'
						onClick={handleConfirmDowngradeModalCancel}
					>
						Cancel
					</Button>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleConfirmDowngradeModalOk}
					>
						Submit
					</Button>
				</div>
			</CustomModal>
		);
	};

	const handleConfirmDeleteModalOk = () => {
		deleteProspectApi(prospectViewRefId).then((res) => {
			setShowSuccessFailureDeleteModal(true);
			setDeleteProspectMessage(res.data[0].message);
			setShowDeleteModal(false);
		});
	};

	const handleSuccessFailureDeleteModalOk = () => {
		setShowSuccessFailureDeleteModal(false);
		history.push('/dashboard/MyProspect');
	};

	const handleConfirmDeleteModalCancel = () => {
		setShowDeleteModal(false);
	};

	const RenderSuccessFailureDeleteModal = () => {
		return (
			<CustomModal
				visible={showSuccessFailureDeleteModal}
				handleOk={handleSuccessFailureDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Prospect</div>
				</div>
				<div className='modal-body'>{deleteProspectMessage}</div>
				<div className='modal-footer'>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleSuccessFailureDeleteModalOk}
					>
						OK
					</Button>
				</div>
			</CustomModal>
		);
	};

	const RenderConfirmDeleteModal = () => {
		return (
			<CustomModal
				visible={showDeleteModal}
				handleCancel={handleConfirmDeleteModalCancel}
				handleOk={handleConfirmDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Prospect</div>
				</div>
				<div className='modal-body'>Are you sure you want to delete this particular prospect ?</div>
				<div className='modal-footer-pros'>
					<Button
						className='text-only-btn-pros'
						key='back'
						type='text'
						onClick={handleConfirmDeleteModalCancel}
					>
						Cancel
					</Button>
					<Button
						className='submit-btn-pros'
						key='submit'
						type='primary'
						onClick={handleConfirmDeleteModalOk}
					>
						Delete
					</Button>
				</div>
			</CustomModal>
		);
	};

	if (!prospectViewData) {
		return null;
	}
	const ActionSuccessModalScreen = ({ operationName }) => (
		<>
			<div className='modal-body'>
				<div className='action-success-screen'>
					<img src={assets.common.successTick} alt='success' className='success-logo' />
					<div
						className='action-success-modal'
						style={{ display: 'flex', flexDirection: 'column' }}
					>
						<div className='title'>1/1 Successful Action</div>
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
						<div className='action-fail-modal' style={{ display: 'flex', flexDirection: 'column' }}>
							<div className='title'>{1 - errorArray.length}/1 Successful Action</div>
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
					render: (name, dataObject) => renderRecordDetailsCol(dataObject)
				},
				{
					float: 'right',
					title: '',
					dataIndex: 'message',
					key: 'name',
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

	const handleUpgradeOk = (upgradeData) => {
		let requestBody = {
			ProspectCategory: {
				ProspectID: [prospectViewRefId],
				Category: upgradeData.category
			}
		};
		upgradeSelectedProspectApi(requestBody).then((res) => {
			setUpgradeFailedArray(res.data.filter((status) => !status.success));
		});
	};
	const handleDowngradeOk = (downgradeData) => {
		// let requestBody = {
		//   ProspectCategory: {
		//     ProspectID: [prospectViewRefId],
		//     Category: downgradeData.category,
		//   },
		// };
		downgradeProspectApi(prospectViewRefId).then((res) => {
			setUpgradeFailedArray(res.data.filter((status) => !status.success));
		});
	};
	const closeModal = (operationName) => {
		if (operationName.toLowerCase() === 'upgrade') {
			setShowUpgradeModal(false);
			setUpgradeFailedArray(emptyArray);
		}
		if (operationName.toLowerCase() === 'downgrade') {
			setShowDowngradeModal(false);
			setUpgradeFailedArray(emptyArray);
		}
	};
	const cancelOperation = (operationName) => {
		if (operationName.toLowerCase() === 'upgrade') {
			setShowUpgradeModal(false);
		}
		if (operationName.toLowerCase() === 'downgrade') {
			setShowDowngradeModal(false);
		}
	};
	const RenderConfirmUpgradeModal = ({ isOpenModal, headerName }) => {
		const ConfirmUpgradeScreen = () => {
			const [upgradeReason, setUpgradeReason] = useState('');
			const [upgradeRelationManager, setUpgradeRelationManager] = useState('');
			const [upgradeBranchName, setUpgradeBranchName] = useState('');
			const [upgradeCategory, setUpgradeCategory] = useState('');
			const [otherUpgradeReason, setOtherUpgradeReason] = useState('');
			const handleUpgradeReasonChange = (key, value) => {
				setUpgradeReason({ [key]: value });
			};
			const handleUpgradeBranchChange = (key, value) => {
				setUpgradeBranchName({ [key]: value });
			};
			const handleUpgradeRMChange = (key, value) => {
				setUpgradeRelationManager({ [key]: value });
			};
			const handleUpgradeCategoryChange = (key, value) => {
				setUpgradeCategory({ [key]: value });
			};
			const emptyUpDOwngradeModal = () => {
				setUpgradeReason('');
				setUpgradeRelationManager('');
				setUpgradeBranchName('');
				setUpgradeCategory('');
				setOtherUpgradeReason('');
			};
			const onUpgrade = (prospecType) => {
				let upgradeData = {
					category: upgradeCategory.upgradeCategory,
					branch: upgradeBranchName.upgradeBranchName,
					relationshipManager: upgradeRelationManager.upgradeRelationManager,
					reason: upgradeReason.upgradeReason
				};

				if (upgradeReason.upgradeReason === 'O') {
					upgradeData.otherReason = otherUpgradeReason;
				}
				if (prospecType.toLowerCase() === 'upgrade') {
					handleUpgradeOk(upgradeData);
					emptyUpDOwngradeModal();
				}
				if (prospecType.toLowerCase() === 'downgrade') {
					handleDowngradeOk(upgradeData);
					emptyUpDOwngradeModal();
				}
			};

			const cancel = (text) => {
				cancelOperation(text);
				emptyUpDOwngradeModal();
			};

			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon
								icon={
									headerName.toLowerCase() === 'upgrade' ? faChevronSquareUp : faChevronSquareDown
								}
							/>
						</div>
						<div className='header-title'>{headerName} Prospect</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to {headerName.toLowerCase()} selected Prospect?
						<div className='modal-body-subtitle'>
							All Open Opportunities for this Prospect shall be marked as Missed
							<Form name='assign-leads-form' className='assign-leads-form' form={form}>
								<div id='upgradeCategory' className='field-section' style={{ marginTop: '1rem' }}>
									<label className='field-label' htmlFor='upgradeCategory'>
										Category
									</label>
									<Form.Item name='upgradeCategory'>
										<Select
											size='large'
											mode='single'
											placeholder='Select Category'
											onChange={(value) => handleUpgradeCategoryChange('upgradeCategory', value)}
											filterOption={(input, opt) => {
												return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
											}}
											showSearch
										>
											{categoryDropdownValues?.map((option) => (
												<Select.Option key={option.dataValue} value={option.dataValue}>
													{option.displayValue}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<label className='field-label' htmlFor='upgradeBranchName'>
										Branch Name
									</label>
									<Form.Item name='upgradeBranchName'>
										<Select
											size='large'
											mode='single'
											placeholder='Select Branch Name'
											onChange={(value) => handleUpgradeBranchChange('upgradeBranchName', value)}
											filterOption={(input, opt) => {
												return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
											}}
											showSearch
										>
											{controlStructure?.Branch?.lookupValue.lookUpValues.map((option) => (
												<Select.Option key={option.Unit_Hierarchy} value={option.Unit_Hierarchy}>
													{option.NAME}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
									<label className='field-label' htmlFor='upgradeRelationManager'>
										Relationship Manager
									</label>
									<Form.Item name='upgradeRelationManager'>
										<Select
											size='large'
											mode='single'
											placeholder='Select Relation Name'
											onChange={(value) => handleUpgradeRMChange('upgradeRelationManager', value)}
											filterOption={(input, opt) => {
												return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
											}}
											showSearch
										>
											{controlStructure?.RelationshipManager.lookupValue.lookUpValues.map(
												(option) => (
													<Select.Option key={option.ID} value={option.ID}>
														{option.Name}
													</Select.Option>
												)
											)}
										</Select>
									</Form.Item>
									<label className='field-label' htmlFor='upgradeReason'>
										Reason
									</label>
									<Form.Item name='upgradeReason'>
										<Select
											size='large'
											mode='single'
											placeholder='Select Reason'
											onChange={(value) => handleUpgradeReasonChange('upgradeReason', value)}
											filterOption={(input, opt) => {
												return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
											}}
											showSearch
										>
											{controlStructure?.ClientReason?.lookupValue?.lookUpValues.map(
												(option, index) => (
													<Select.Option key={index} value={option.data_value}>
														{option.display_value}
													</Select.Option>
												)
											)}
										</Select>
									</Form.Item>
									{upgradeReason.upgradeReason === 'O' ? (
										<Form.Item name='otherUpgradeReason'>
											<Input
												maxLength={20}
												onChange={(evt) => setOtherUpgradeReason(evt.target.value)}
												size='large'
												value={otherUpgradeReason}
												placeholder={'Enter Reason'}
											/>
										</Form.Item>
									) : (
										''
									)}
								</div>
							</Form>
						</div>
					</div>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							key='back'
							type='text'
							style={{ fontSize: '28px' }}
							onClick={() => {
								cancel(headerName);
							}}
						>
							Cancel
						</Button>
						<Button
							className='downgrade-submit-btn'
							key='submit'
							type='primary'
							onClick={() => {
								onUpgrade(headerName);
							}}
						>
							{headerName}
						</Button>
					</div>
				</>
			);
		};

		return (
			<CustomModal
				handleCancel={() => {
					closeModal(headerName);
				}}
				handleOk={handleUpgradeOk}
				visible={isOpenModal}
			>
				{upgradeFailedArray === 'emptyArray' ? (
					<ConfirmUpgradeScreen />
				) : upgradeFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName={headerName.toLowerCase()} />
				) : (
					<ActionFailModalScreen
						errorArray={upgradeFailedArray}
						operationName={headerName.toLowerCase()}
					/>
				)}
			</CustomModal>
		);
	};

	const setUpDowngradeModal = (text) => {
		if (text.toLowerCase() === 'upgrade') {
			setShowUpgradeModal(true);
		}
		if (text.toLowerCase() === 'downgrade') {
			setShowDowngradeModal(true);
		}
		// setSubmitText(text);
		setHeaderName(text);
	};

	return (
		<>
			<RenderConfirmDeleteModal />
			<RenderSuccessFailureDeleteModal />
			<RenderConfirmDowngradeModal />
			<RenderSuccessFailureDowngradeModal />
			<RenderConfirmUpgradeModal isOpenModal={showUpgradeModal} headerName={headerName} />
			<RenderConfirmUpgradeModal isOpenModal={showDowngradeModal} headerName={headerName} />
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={[
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							history.goBack();
						}}
						key={'ok'}
					>
						OK
					</Button>
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
			<PageHeader
				className='prospectViewPageHeader'
				onBack={() => history.push('/dashboard/MyProspect')}
				backIcon={
					<Tooltip title='Back'>
						<FontAwesomeIcon icon={faArrowLeft} size='sm' className='prospectViewTopBarIcons' />
					</Tooltip>
				}
				extra={[
					<Link
						key={1}
						onClick={() => setConvertProspectModalOpen(true)}
						style={{ color: '#fff', fontSize: '18px' }}
					>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.convert) && (
							<Tooltip title='Convert Prospect'>
								<FontAwesomeIcon icon={faSyncAlt} size='sm' className='prospectViewTopBarIcons' />
							</Tooltip>
						)}
					</Link>,
					// <Link
					//   key={2}
					//   onClick={() => setShowDowngradeProspectModal(true)}
					//   style={{ color: "#fff", fontSize: "18px" }}
					// >
					//   <Tooltip title="Move Down">
					//     <FontAwesomeIcon
					//       icon={faArrowCircleDown}
					//       inverse={true}
					//       size="sm"
					//       className="prospectViewTopBarIcons"
					//     />
					//   </Tooltip>
					// </Link>,
					// <Link
					//   key={2}
					//   onClick={() => setUpDowngradeModal('Upgrade')}
					//   style={{ color: "#fff", fontSize: "18px" }}
					// >
					//   <Tooltip title="Upgrade">
					//     <FontAwesomeIcon
					//       icon={faChevronSquareUp}
					//       size="sm"
					//       className="prospectViewTopBarIcons"
					//     />
					//   </Tooltip>
					// </Link>,
					// <Link
					//   key={2}
					//   onClick={() => setUpDowngradeModal('Downgrade')}
					//   style={{ color: "#fff", fontSize: "18px" }}
					// >
					//   <Tooltip title="Downgrade">
					//     <FontAwesomeIcon
					//       icon={faChevronSquareDown}
					//       size="sm"
					//       className="prospectViewTopBarIcons"
					//     />
					//   </Tooltip>
					// </Link>,
					<Link key={3} style={{ color: '#fff', fontSize: '18px' }}>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) && (
							<Tooltip title='Delete'>
								<FontAwesomeIcon
									icon={faTrashAlt}
									size='sm'
									onClick={() => setShowDeleteModal(true)}
									className='prospectViewTopBarIcons'
								/>
							</Tooltip>
						)}
					</Link>,
					<Link key={4} style={{ color: '#fff', fontSize: '18px' }}>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify) && (
							<Tooltip title='Edit'>
								<FontAwesomeIcon
									icon={faEdit}
									size='sm'
									onClick={handleEditClick}
									className='prospectViewTopBarIcons'
								/>
							</Tooltip>
						)}
					</Link>,
					<Link key={5} style={{ color: '#fff', fontSize: '18px' }}>
						<RenderMoreOptions />
					</Link>,

					<Link key={5} style={{ color: '#fff', fontSize: '18px' }}>
						<Tooltip title='Previous'>
							<FontAwesomeIcon
								icon={faChevronLeft}
								onClick={handlePreviousClick}
								size='sm'
								className='prospectViewTopBarIcons'
							/>
						</Tooltip>
					</Link>,
					<Link key={6} style={{ color: '#fff', fontSize: '18px' }}>
						<Tooltip title='Next'>
							<FontAwesomeIcon
								icon={faChevronRight}
								size='sm'
								onClick={handleNextClick}
								className='prospectViewTopBarIcons'
							/>
						</Tooltip>
					</Link>
				]}
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					borderRadius: '8px'
					// borderBottomLeftRadius: '12px'
				}}
			>
				<Content>
					<ProspectViewPageHeaderDetail {...prospectViewData} />
				</Content>
			</PageHeader>
			{/* <div className='prospectsViewBodyContent'> */}
			<Space direction='vertical' size={16} className='parent-form-container'>
				<ProspectDetailAndTimelineTabDetails
					detail={prospectViewData}
					timeline={verticalTimelineDetail}
				/>
				<RealtionDetailsCardView detail={prospectRelationDetail} source={prospectCustomerDetail} />
				<KYCValidationDetails detail={prospectViewData} source={prospectCustomerDetail} />
				<RiskProfile riskProfileData={prospectViewData?.riskProfileModel} />
				<DocumentCardWithUpload
					data={prospectViewData?.uploadedDocInfo?.lstDocumentInfo}
					action='view'
				/>
				<SourceDetailsCardView detail={prospectViewData} source={prospectCustomerDetail} />
				<OtherDetailsCardView detail={prospectViewData} source={prospectCustomerDetail} />
				{/* <AttachmentsCardView
					data={prospectAttachmentsDetail}
					refID={prospectViewData.prospectDetail.refID}
				/> */}
				<AttachmentUploadModal
					type={'PROSPECTADD'}
					selectedAccount={{
						scheme: prospectViewData?.prospectDetail?.refID,
						refType: 'PROSPECTADD'
					}}
					data={prospectAttachmentsDetail}
					// allCustomerOnboardingData={prospectViewData}
					// authData={authData}
					action={'view'}
				/>
				{prospectOpportunityDetail && (
					<ProspectOpportunityCardView
						data={prospectOpportunityDetail}
						onAdd={handleAddOpportunityClick}
					/>
				)}
				{/* {prospectInteractionDetail && (
					<InteractionCardView data={prospectInteractionDetail} onAdd={handleAddInteractionClick} />
				)} */}
				{prospectInteractionDetail && <InteractionCardView data={prospectInteractionDetail} />}
				{prospectTaskDetail && <TaskCardView data={prospectTaskDetail} />}
				{/* {prospectNotesDetail && <NotesCardView data={prospectNotesDetail} />} */}
				<MiscellaneousCardView detail={prospectMiscellaneousDetail} />
				<BackToTop />
			</Space>
			{/* </div> */}
		</>
	);
}

const OtherDetailsCardView = (props) => {
	const prospectDetail = props.detail.prospectDetail;
	const sourceDetail = props.source;
	return (
		<Card title='Other Details'>
			<Space direction='vertical' class='prospect-details' style={{ width: '100%' }} size={2}>
				<Row>
					<Col span={16}>
						<Row>
							<Col span={12}>
								<TextSubText
									flag={prospectDetail.countryCode}
									text={prospectDetail.preferredCurrency}
									subtext='Preferred Currency'
								/>
							</Col>
							<Col span={12}>
								<TextSubText
									text={prospectDetail.isActive ? 'Active' : 'Inactive'}
									subtext='Status'
								/>
							</Col>
							<Col span={12}>
								<TextSubText
									text={prospectDetail.reasonUpdateStatus}
									subtext='Inactivation Reason'
								/>
							</Col>

							<Col span={12}>
								<TextSubText
									text={prospectDetail.qualificationStatus}
									subtext='Qualification status'
								/>
							</Col>
							<Col span={8}>
								<TextSubText text={prospectDetail.interestlevel} subtext='Interest level' />
							</Col>

							<Col span={12}>
								{prospectDetail.isActive === false &&
								(prospectDetail.refType === 'LEADADD' || prospectDetail.refType === 'CLIENTADD') ? (
									<Row>
										<CustomerSourceView data={sourceDetail} prospectDetail={prospectDetail} />
									</Row>
								) : (
									<Space />
								)}
							</Col>
						</Row>
					</Col>

					<Col span={8}>
						<TextSubText
							subtext='Remark'
							text={prospectDetail.remark}
							endsubtext={`Last Update: ${prospectDetail.inputDateTime}`}
						/>
					</Col>
				</Row>
			</Space>
		</Card>
	);
};

const SourceDetailsCardView = (props) => {
	const prospectDetail = props.detail.prospectDetail;
	const sourceDetail = props.source;
	return (
		<Card title='Source Details' className='prospectViewCardDetail'>
			<Space direction='vertical' class='prospect-details' style={{ width: '100%' }} size={5}>
				<Row>
					<Col span={8}>
						<TextSubText text={prospectDetail?.sourceName} subtext='Source' />
					</Col>
					<Col span={8}>
						<TextSubText text={prospectDetail?.sourceTypeName} subtext='Type' />
					</Col>
					<Col span={8}>
						<TextSubText text={prospectDetail?.sourceValueName} subtext='Name' />
					</Col>
					<Col span={8}>
						<TextSubText text={prospectDetail?.sourcedByName} subtext='SourcedBy' />
					</Col>
					<Col span={8}>
						<Row>
							{sourceDetail && sourceDetail.recordId && <CustomerSourceView data={sourceDetail} />}
						</Row>
					</Col>
				</Row>
			</Space>
		</Card>
	);
};

const ProspectDetailAndTimelineTabDetails = (props) => {
	const tabListNoTitle = [
		{
			key: 'ProspectDetails',
			tab: 'Prospect Details'
		},
		{
			key: 'Timeline',
			tab: 'Timeline'
		}
	];

	const prospectDetail = props.detail;
	const timeline = props.timeline;

	const contentListNoTitle = {
		ProspectDetails: <ProspectDetailsCardView data={prospectDetail} />,
		Timeline: <ProspectVerticalTimelineCardView data={timeline} />
	};

	const [noTitleKey, setnoTitleKey] = useState('ProspectDetails');
	const onTabChange = (key, type) => {
		setnoTitleKey(key);
	};

	return (
		<Card
			className='prospectViewCardDetail'
			bordered={false}
			style={{ width: '100%' }}
			tabList={tabListNoTitle}
			activeTabKey={noTitleKey}
			onTabChange={(key) => {
				onTabChange(key, 'noTitleKey');
			}}
		>
			{contentListNoTitle[noTitleKey]}
		</Card>
	);
};

const mapStateToProps = (state) => {
	const { prospectView } = state;
	const prospectListingCs = state.prospectListing.controlStructure;
	const prospectViewData = prospectView.prospectViewData;
	const verticalTimelineDetail = prospectView.verticalTimelineDetail;
	const prospectOpportunityDetail = prospectView.prospectOpportunityDetail;
	const prospectAttachmentsDetail = prospectView.prospectAttachmentsDetail;
	const prospectMiscellaneousDetail = prospectView.prospectMiscellaneousDetail;
	const prospectNotesDetail = prospectView.prospectNotesDetail;
	const prospectTaskDetail = prospectView.prospectTaskDetail;
	const prospectInteractionDetail = prospectView.prospectInteractionDetail;
	const prospectCustomerDetail = prospectView.prospectCustomerDetail;
	const prospectRelationDetail = prospectView.prospectRelationDetail;
	const prospectConversionDependantData = prospectView.prospectConversionDependantData;
	return {
		prospectView,
		prospectViewData,
		verticalTimelineDetail,
		prospectOpportunityDetail,
		prospectAttachmentsDetail,
		prospectMiscellaneousDetail,
		prospectNotesDetail,
		prospectTaskDetail,
		prospectInteractionDetail,
		prospectCustomerDetail,
		prospectRelationDetail,
		prospectConversionDependantData,
		prospectListingCs,
		leftPanel: state.dashboard.leftPanel,
		authData: state?.auth?.user?.userRole
	};
};

const mapDispatchToProps = {
	excecuteGetProspect360View,
	getProspectDependantData,
	executeSaveProspectEditDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(ProspectViewScreen);

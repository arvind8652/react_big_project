import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Select, Input, Alert } from 'antd';
import './CustomerOnboardingListingScreen.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
	assignSelectedCustomerOnboardingApi,
	terminateCustomerOnboardingApi
} from '../../api/customerOnboardingListingApi';

import { approveRejectCustomer, upgradeOrDownGradeCustomer } from '../../api/customerViewApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { assets } from '../../constants/assetPaths';
import {
	faUserCheck,
	faFileCheck,
	faFileExcel,
	faArrowCircleDown,
	faArrowCircleUp,
	faStopCircle
} from '@fortawesome/pro-light-svg-icons';
import { connect } from 'react-redux';
import {
	executeGetCustomerOnboardingListingCs,
	executeGetAllCustomerOnboardingData
} from '../../redux/actions/customerOnboardingListingAction';
import { exportJSON, generateCsObject } from '../../utils/utils';

import CustomModal from '../../components/Modal/CustomModal/CustomModal';

import CustomerOnboardingTable from '../../components/CustomerOnboardingTable/CustomerOnboardingTable';
import RenderTopBar from './CustomerOnboardingLisitingComponent/RenderTopBar';
import RenderFiltersPanel from './CustomerOnboardingLisitingComponent/RenderFilterPanel';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import BackToTop from '../../components/BackToTop/BackToTop';

function CustomerOnboardingListingScreen(props) {
	const {
		executeGetCustomerOnboardingListingCs,
		executeGetAllCustomerOnboardingData,
		customerOnboardingListingCs,
		allCustomerOnboardingData,
		leftPanel
	} = props;
	const emptyArray = 'emptyArray';

	const [loading, setLoading] = useState();

	const [deleteFailedArray, setDeleteFailedArray] = useState();
	const [endorseFailedArray, setEndorseFailedArray] = useState(emptyArray);
	const [approveFailedArray, setApproveFailedArray] = useState(emptyArray);
	const [rejectFailedArray, setRejectFailedArray] = useState(emptyArray);

	const [upgradeFailedArray, setUpgradeFailedArray] = useState(emptyArray);
	const [downgradeFailedArray, setDowngradeFailedArray] = useState(emptyArray);
	const [terminateFailedArray, setTerminateFailedArray] = useState(emptyArray);
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [showEndorseModal, setShowEndorseModal] = useState(false);
	const [showApproveModal, setShowApproveModal] = useState(false);
	const [showRejectModal, setShowRejectModal] = useState();
	const [showUpgradeModal, setShowUpgradeModal] = useState();
	const [showDowngradeModal, setShowDowngradeModal] = useState(false);
	const [showTerminateModal, setShowTerminateModal] = useState(false);
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [localCustomerOnboardingData, setLocalCustomerOnboardingData] =
		useState(allCustomerOnboardingData);
	const [rmForDowngrade, setRmForDowngrade] = useState();
	const [categoryDropdownValues, setCategoryDropdownValues] = useState([]);
	const [categoryUpgradeDropdownValues, setCategoryUpgradeDropdownValues] = useState([]);
	const { path } = useRouteMatch();
	const history = useHistory();
	const controlStructure =
		customerOnboardingListingCs &&
		Array.isArray(customerOnboardingListingCs) &&
		customerOnboardingListingCs.length > 0 &&
		generateCsObject(customerOnboardingListingCs[0].controlStructureField);
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'CLIENTREQADD') authorizeCode = subMenu.authorizeCode;
			});
		});

	useEffect(() => {
		executeGetCustomerOnboardingListingCs();
		executeGetAllCustomerOnboardingData(setLocalCustomerOnboardingData, setLoading);
	}, []);
	useEffect(() => {
		if (selectedRows && selectedRows.length > 0) {
			let categoryDropdownValues = controlStructure?.Category?.dropDownValue.filter((item) => {
				return parseInt(item.dataValue) < parseInt(selectedRows[0].customerCategory);
			});
			setCategoryDropdownValues(categoryDropdownValues);
			let categoryUpgradeDropdownValues = controlStructure?.Category?.dropDownValue.filter(
				(item) => {
					return parseInt(item.dataValue) > parseInt(selectedRows[0].customerCategory);
				}
			);
			setCategoryUpgradeDropdownValues(categoryUpgradeDropdownValues);
		}
	}, [selectedRows]);
	const downloadRecords = () => {
		const downloadData =
			selectedRows && selectedRows.length > 0
				? selectedRows.map((customer, index) => ({
						'Sr.No': index + 1,
						'Client Code': customer.customerCode,
						'Client Name': customer.customerName,
						'Family Name': customer.familyName,
						'Client Category': customer.customerCategoryName,
						'Tax Status': customer.taxStatusName,
						Office: customer.branchName,
						Type: customer.typeName,
						Status: customer.status,
						// "Classification Name": customer.fatcaClassificationName,
						'FATCA Classification': customer.fatcaClassificationName,
						'Potentially Vulnerable Name': customer.potentiallyVulnerableName,
						AMLA: customer.amlaName,
						'Banned List': customer.bannedListName,
						'Risk Profile': customer.riskProfileName,
						'Relationship Manager': customer.relationshipManagerName,
						// "Date Time": customer.inputDateTime
						'Creation Date': customer.inputDateTime
				  }))
				: localCustomerOnboardingData.map((customer, index) => ({
						'Sr.No': index + 1,
						'Client Code': customer.customerCode,
						'Client Name': customer.customerName,
						'Family Name': customer.familyName,
						'Client Category': customer.customerCategoryName,
						'Tax Status': customer.taxStatusName,
						Office: customer.branchName,
						Type: customer.typeName,
						Status: customer.status,
						// "Classification Name": customer.fatcaClassificationName,
						'FATCA Classification': customer.fatcaClassificationName,
						'Potentially Vulnerable Name': customer.potentiallyVulnerableName,
						AMLA: customer.amlaName,
						'Banned List': customer.bannedListName,
						'Risk Profile': customer.riskProfileName,
						'Relationship Manager': customer.relationshipManagerName,
						// "Date Time": customer.inputDateTime
						'Creation Date': customer.inputDateTime
				  }));
		exportJSON(downloadData, 'ClientOnboard');
	};
	const handleEndorseOk = (values, setDisabled = () => {}) => {
		setDisabled(true);
		assignSelectedCustomerOnboardingApi(selectedRowKeys, values.relationshipManager).then((res) => {
			setDisabled(false);
			setEndorseFailedArray(res.data.filter((status) => !status.success));
		});
	};
	const handleTerminateOk = (data, setDisabled = () => {}) => {
		setDisabled(true);
		terminateCustomerOnboardingApi(selectedRowKeys).then((res) => {
			setDisabled(false);
			setTerminateFailedArray(res.data.filter((status) => !status.success));
		});
	};

	// const handleTerminateOk = (terminateFormData) => {
	//   let payload = {};
	//   // let requestBody = [];
	//   selectedRows.forEach(ele => {

	//     payload.lstRefID = selectedRowKeys;
	//     // payload.Reason = ele.approveReason;
	//     payload.Reason = terminateFormData.reason;
	//     if (terminateFormData.reason) {
	//     payload.Remark =terminateFormData.otherReason ;
	//     }
	//     // requestBody.push(payload);
	//     console.log("payload",payload)

	//   });
	//   terminateCustomerOnboardingApi(payload).then((res) => {
	//     setTerminateFailedArray(res.data.filter((status) => !status.success));
	//   });

	//  };

	const handleApproveOk = (approveFormData, setDisabled = () => {}) => {
		setDisabled(true);
		let requestBody = [];
		selectedRows.forEach((ele) => {
			let payload = {};
			payload.ClientId = ele.customerCode;
			payload.LegalStatus = ele.customerCategory;
			payload.IsNew = false;
			payload.Event = 'A';
			// payload.Reason = ele.approveReason;
			payload.Reason = approveFormData.reason;
			if (approveFormData.reason) {
				payload.Remark = approveFormData.otherReason;
			}
			requestBody.push(payload);
		});
		approveRejectCustomer(requestBody).then((res) => {
			setDisabled(false);
			setApproveFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleRejectOk = (rejectFormData, setDisabled = () => {}) => {
		let requestBody = [];
		setDisabled(true);
		selectedRows.forEach((ele) => {
			let payload = {};
			payload.ClientId = ele.customerCode;
			payload.LegalStatus = ele.customerCategory;
			payload.IsNew = false;
			payload.Event = 'R';
			payload.Reason = rejectFormData.reason;
			if (rejectFormData.reason) {
				payload.Remarks = rejectFormData.otherReason;
			}
			requestBody.push(payload);
		});

		approveRejectCustomer(requestBody).then((res) => {
			setDisabled(false);
			setRejectFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleUpgradeOk = (upgradeFormData, setDisabled = () => {}) => {
		setDisabled(true);
		let requestBody = [];
		selectedRows.forEach((ele) => {
			let payload = {};
			payload.ClientId = ele.customerCode;
			payload.LegalStatus = ele.customerCategory;
			payload.IsNew = false;
			payload.Event = 'U';
			payload.bankaccbranch = upgradeFormData.branch;
			payload.CustRelMgr = upgradeFormData.relationshipManager;
			payload.CategoryMfid = upgradeFormData.category;
			payload.Reason = upgradeFormData.reason;
			if (upgradeFormData.reason) {
				payload.Remark = upgradeFormData.otherReason;
			}
			requestBody.push(payload);
		});
		upgradeOrDownGradeCustomer(requestBody).then((res) => {
			setDisabled(false);
			setUpgradeFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleDowngradeOk = (downGradeFormData, setDisabled = () => {}) => {
		setDisabled(true);
		let requestBody = [];
		selectedRows.forEach((ele) => {
			let payload = {};
			payload.ClientId = ele.customerCode;
			payload.LegalStatus = ele.customerCategory;
			payload.IsNew = false;
			payload.Event = 'D';
			payload.bankaccbranch = downGradeFormData.branch;
			payload.CustRelMgr = downGradeFormData.relationshipManager;
			payload.CategoryMfid = downGradeFormData.category;
			payload.Reason = downGradeFormData.reason;
			if (downGradeFormData.reason === 'O') {
				payload.Remark = downGradeFormData.otherReason;
			}
			requestBody.push(payload);
		});
		upgradeOrDownGradeCustomer(requestBody).then((res) => {
			setDisabled(false);
			setDowngradeFailedArray(res.data.filter((status) => !status.success));
		});
	};

	// const handleTerminateOk = ()

	// const handleTerminateOk = (terminateReason) => {
	//   let requestBody = [];
	//   selectedRows.forEach(ele => {
	//     let payload = {};
	//     payload.ClientId = ele.customerCode;
	//     payload.LegalStatus = ele.customerCategory;
	//     payload.IsNew = false;
	//     payload.Event = "T";
	//     payload.Reason = terminateReason
	//     requestBody.push(payload);
	//   });
	// WILL ADD API ONCE BACKEND DEPENDENCY GET CLEAR
	// terminateClientApi(requestBody).then((res) => {
	//   setTerminateFailedArray(res.data.filter((status) => !status.success));
	// });
	//   setShowTerminateModal(false);
	// };

	const closeModal = (operationName) => {
		setDeleteFailedArray();
		if (operationName === 'endorse') {
			setEndorseFailedArray(emptyArray);
			setShowEndorseModal(false);
		}
		if (operationName === 'approve') {
			setApproveFailedArray(emptyArray);
			setShowApproveModal(false);
		}
		if (operationName === 'reject') {
			setShowRejectModal(false);
			setRejectFailedArray(emptyArray);
		}
		if (operationName === 'upgrade') {
			setShowUpgradeModal(false);
			setUpgradeFailedArray(emptyArray);
		}
		if (operationName === 'downgrade') {
			setShowDowngradeModal(false);
			setDowngradeFailedArray(emptyArray);
		}
		if (operationName === 'terminate') {
			setShowTerminateModal(false);
			setTerminateFailedArray(emptyArray);
		}
		setShowFailedActions(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		executeGetAllCustomerOnboardingData(setLocalCustomerOnboardingData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'endorse' && setShowEndorseModal(false);
		operationName === 'approve' && setShowApproveModal(false);
		operationName === 'reject' && setShowRejectModal(false);

		operationName === 'upgrade' && setShowUpgradeModal(false);
		operationName === 'downgrade' && setShowDowngradeModal(false);
		operationName === 'terminate' && setShowTerminateModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};

	const RenderConfirmEndorseModal = () => {
		const ConfirmScreen = () => {
			const [relationshipManager, setRelationshipManager] = useState();
			const [disabled, setDisabled] = useState(false);
			const handleOnValuesChange = (key, value) => {
				setRelationshipManager({ [key]: value });
			};
			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faUserCheck} />
						</div>
						<div className='header-title'>Endorsement</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to Endorse
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						selected Prospec{selectedRowKeys.length > 1 ? 'ts' : 't'}?
					</div>
					<Form name='assign-leads-form' className='assign-leads-form'>
						<div id='relationshipManager' className='field-section'>
							<label className='field-label' htmlFor='relationshipManager'>
								Relationship Manager
							</label>
							<Form.Item name='relationshipManager'>
								<Select
									className='filter-dropdown'
									size='large'
									mode='single'
									placeholder='Enter name'
									onChange={(value) => handleOnValuesChange('relationshipManager', value)}
									value={relationshipManager}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
								>
									{controlStructure.RelationshipManager.lookupValue.lookUpValues.map((option) => (
										<Select.Option key={option.ID} value={option.ID}>
											{option.Name}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</div>
					</Form>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							key='back'
							type='text'
							disabled={disabled}
							style={{ fontSize: '28px' }}
							onClick={() => {
								cancelOperation('endorse');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn'
							key='submit'
							type='primary'
							disabled={disabled}
							style={{ fontSize: '28px' }}
							onClick={() => handleEndorseOk(relationshipManager, setDisabled)}
						>
							Endorse
						</Button>
					</div>
				</>
			);
		};
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('endorse');
				}}
				handleOk={handleEndorseOk}
				visible={showEndorseModal}
			>
				{endorseFailedArray === 'emptyArray' ? (
					<ConfirmScreen />
				) : endorseFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='endorse' />
				) : (
					<ActionFailModalScreen errorArray={endorseFailedArray} operationName='endorse' />
				)}
			</CustomModal>
		);
	};
	const RenderConfirmApprovalModal = () => {
		const ApprovalConfirmScreen = () => {
			const [approveReason, setApproveReason] = useState('');
			const [otherApproveReason, setOtherApproveReason] = useState('');
			const [required, setRequired] = useState(false);
			const [disabled, setDisabled] = useState(false);
			const handleApproveReasonChange = (key, value) => {
				setRequired(false);
				setApproveReason({ [key]: value });
				setOtherApproveReason('');
			};
			const handleOtherApproveReasonChange = (e) => {
				if (approveReason.approveReason) {
					setOtherApproveReason(e.target.value);
				}
			};

			const onApprove = () => {
				let approveFormData = {
					reason: approveReason.approveReason,
					otherReason: otherApproveReason
				};
				if (approveReason.approveReason === 'O') {
					if (otherApproveReason) {
						setRequired(false);
						handleApproveOk(approveFormData, setDisabled);
					} else {
						setRequired(true);
						// handleApproveOk(approveReason.approveReason);
					}
				} else {
					setRequired(false);
					handleApproveOk(approveFormData, setDisabled);
				}
			};

			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faFileCheck} />
						</div>
						<div className='header-title'>Approval</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to approve selected
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Client{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form name='assign-leads-form' className='assign-leads-form'>
							<div id='approveReason' className='field-section' style={{ marginTop: '1rem' }}>
								<label className='field-label' htmlFor='approveReason'>
									Reason
								</label>
								<Form.Item name='approveReason'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Reason'
										onChange={(value) => handleApproveReasonChange('approveReason', value)}
										value={approveReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.ApproveReason.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{approveReason.approveReason ? (
									<Form.Item>
										<Input
											maxLength={400}
											onChange={(evt) => handleOtherApproveReasonChange(evt)}
											size='large'
											value={otherApproveReason}
											placeholder={'Enter Reason'}
										/>
									</Form.Item>
								) : (
									''
								)}
								{required && (
									<Form.Item>
										<Alert
											//style={{ marginBottom: "15px" }}
											message='Reason is required'
											type='error'
											closable
											//onClose={onCloseErrorAlertHandler}
										/>
									</Form.Item>
								)}
							</div>
						</Form>
						<div className='modal-footer1'>
							<Button
								className='text-only-btn'
								key='back'
								type='text'
								disabled={disabled}
								onClick={() => {
									cancelOperation('approve');
								}}
							>
								Cancel
							</Button>
							<Button
								className='submit-btn1'
								key='submit'
								type='primary'
								disabled={disabled}
								style={{ fontSize: '28px' }}
								onClick={onApprove}
							>
								Approve
							</Button>
						</div>
					</div>
				</>
			);
		};
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('approve');
				}}
				handleOk={handleApproveOk}
				visible={showApproveModal}
			>
				{approveFailedArray === 'emptyArray' ? (
					<ApprovalConfirmScreen />
				) : approveFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='approve' />
				) : (
					<ActionFailModalScreen errorArray={approveFailedArray} operationName='approve' />
				)}
			</CustomModal>
		);
	};
	const RenderUpgradeModal = () => {
		const UpgradeScreen = () => {
			const [upgradeReason, setUpgradeReason] = useState('');
			const [upgradeRelationManager, setUpgradeRelationManager] = useState('');
			const [upgradeBranchName, setUpgradeBranchName] = useState('');
			const [upgradeCategory, setUpgradeCategory] = useState('');
			const [otherUpgradeReason, setOtherUpgradeReason] = useState('');
			const [disabled, setDisabled] = useState(false);
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
			const handleOtherUpgradeReasonChange = (e) => {
				setOtherUpgradeReason(e.target.value);
			};
			const onUpgrade = () => {
				let upgradeFormData = {
					category: upgradeCategory.upgradeCategory,
					branch: upgradeBranchName.upgradeBranchName,
					relationshipManager: upgradeRelationManager.upgradeRelationManager,
					reason: upgradeReason.upgradeReason
				};
				if (upgradeReason.upgradeReason === 'O') {
					upgradeFormData.otherReason = otherUpgradeReason;
				}
				handleUpgradeOk(upgradeFormData, setDisabled);
			};
			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faArrowCircleUp} />
						</div>
						<div className='header-title'>Upgrade</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to Upgrade
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						the selected Customer{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form name='assign-leads-form' className='assign-leads-form'>
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
										{categoryUpgradeDropdownValues.map((option) => (
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
										value={upgradeBranchName}
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
										value={upgradeRelationManager}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{rmForDowngrade?.lookUpValues.map((option) => (
											<Select.Option key={option.user_id} value={option.user_id}>
												{option.user_name}
											</Select.Option>
										))}
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
										value={upgradeReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure?.ClientReason?.lookupValue?.lookUpValues.map((option) => (
											<Select.Option key={option.data_value} value={option.data_value}>
												{option.display_value}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{upgradeReason.upgradeReason === 'O' ? (
									<Form.Item name='otherUpgradeReason'>
										<Input
											maxLength={20}
											onChange={(evt) => handleOtherUpgradeReasonChange(evt)}
											size='large'
											value={otherUpgradeReason}
											placeholder={'Enter Reason'}
											max={20}
										/>
									</Form.Item>
								) : (
									''
								)}
							</div>
						</Form>
					</div>
					<div className='modal-footer1'>
						<Button
							className='text-only-btn'
							key='back'
							type='text'
							disabled={disabled}
							onClick={() => {
								cancelOperation('upgrade');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn1'
							key='submit'
							type='primary'
							style={{ fontSize: '28px' }}
							disabled={disabled}
							onClick={onUpgrade}
						>
							Upgrade
						</Button>
					</div>
				</>
			);
		};
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('upgrade');
				}}
				handleOk={handleApproveOk}
				visible={showUpgradeModal}
			>
				{upgradeFailedArray === 'emptyArray' ? (
					<UpgradeScreen />
				) : upgradeFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='upgrade' />
				) : (
					<ActionFailModalScreen errorArray={upgradeFailedArray} operationName='upgrade' />
				)}
			</CustomModal>
		);
	};

	const RenderDowngradeModal = () => {
		const DowngradeScreen = () => {
			const [downGradeReason, setDownGradeReason] = useState('');
			const [downGradeRelationManager, setDownGradeRelationManager] = useState('');
			const [downGradeBranchName, setDownGradeBranchName] = useState('');
			const [downGradeCategory, setDownGradeCategory] = useState('');
			const [otherDownGradeReason, setOtherDownGradeReason] = useState('');
			const [disabled, setDisabled] = useState(false);
			const handleDownGradeReasonChange = (key, value) => {
				setDownGradeReason({ [key]: value });
			};
			const handleDownGradeBranchChange = (key, value) => {
				setDownGradeBranchName({ [key]: value });
			};
			const handleDownGradeRMChange = (key, value) => {
				setDownGradeRelationManager({ [key]: value });
			};
			const handleDownGradeCategoryChange = (key, value) => {
				setDownGradeCategory({ [key]: value });
			};
			const handleOtherDownGradeReasonChange = (e) => {
				setOtherDownGradeReason(e.target.value);
			};
			const onDownGrade = () => {
				let downGradeFormData = {
					category: downGradeCategory.downGradeCategory,
					branch: downGradeBranchName.downGradeBranchName,
					relationshipManager: downGradeRelationManager.downGradeRelationManager,
					reason: downGradeReason.downgradeReason
				};
				if (downGradeReason.downGradeReason === 'O') {
					downGradeFormData.otherReason = otherDownGradeReason;
				}
				handleDowngradeOk(downGradeFormData, setDisabled);
			};
			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faArrowCircleDown} />
						</div>
						<div className='header-title'>Downgrade</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to Downgrade
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						the selected Customer{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form name='assign-leads-form' className='assign-leads-form'>
							<div id='downGradeCategory' className='field-section' style={{ marginTop: '1rem' }}>
								<label className='field-label' htmlFor='downGradeCategory'>
									Category
								</label>
								<Form.Item name='downGradeCategory'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Category'
										onChange={(value) => handleDownGradeCategoryChange('downGradeCategory', value)}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{categoryDropdownValues.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='downGradeBranchName'>
									Branch Name
								</label>
								<Form.Item name='downGradeBranchName'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Branch Name'
										onChange={(value) => handleDownGradeBranchChange('downGradeBranchName', value)}
										value={downGradeBranchName}
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
								<label className='field-label' htmlFor='downGradeRelationManager'>
									Relationship Manager
								</label>
								<Form.Item name='downGradeRelationManager'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Relation Name'
										onChange={(value) => handleDownGradeRMChange('downGradeRelationManager', value)}
										value={downGradeRelationManager}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{rmForDowngrade?.lookUpValues.map((option) => (
											<Select.Option key={option.user_id} value={option.user_id}>
												{option.user_name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='downGradeReason'>
									Reason
								</label>
								<Form.Item name='downGradeReason'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Reason'
										onChange={(value) => handleDownGradeReasonChange('downGradeReason', value)}
										value={downGradeReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure?.ClientReason?.lookupValue?.lookUpValues.map((option) => (
											<Select.Option key={option.data_value} value={option.data_value}>
												{option.display_value}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{downGradeReason.downGradeReason === 'O' ? (
									<Form.Item name='otherDownGradeReason'>
										<Input
											maxLength={20}
											onChange={(evt) => handleOtherDownGradeReasonChange(evt)}
											size='large'
											value={otherDownGradeReason}
											placeholder={'Enter Reason'}
										/>
									</Form.Item>
								) : (
									''
								)}
							</div>
						</Form>
					</div>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							key='back'
							type='text'
							disabled={disabled}
							onClick={() => {
								cancelOperation('downgrade');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn'
							key='submit'
							type='primary'
							style={{ fontSize: '28px' }}
							disabled={disabled}
							onClick={onDownGrade}
						>
							Downgrade
						</Button>
					</div>
				</>
			);
		};
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('downgrade');
				}}
				handleOk={handleDowngradeOk}
				visible={showDowngradeModal}
			>
				{downgradeFailedArray === 'emptyArray' ? (
					<DowngradeScreen />
				) : downgradeFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='downgrade' />
				) : (
					<ActionFailModalScreen errorArray={downgradeFailedArray} operationName='downgrade' />
				)}
			</CustomModal>
		);
	};
	const RenderTerminateModal = () => {
		const TerminateScreen = () => {
			const [terminateReason, setTerminateReason] = useState('');
			const [otherTerminateReason, setOtherTerminateReason] = useState('');
			const [required, setRequired] = useState(false);
			const [disabled, setDisabled] = useState(false);
			const handleTerminateReasonChange = (key, value) => {
				setRequired(false);
				setTerminateReason({ [key]: value });
				setOtherTerminateReason('');
			};
			const handleOtherTerminateReasonChange = (e) => {
				if (terminateReason.terminateReason) {
					setOtherTerminateReason(e.target.value);
				}
			};
			const onTerminate = () => {
				let terminateFormData = {
					reason: terminateReason.terminateReason,
					otherReason: otherTerminateReason
				};

				if (terminateReason.terminateReason) {
					if (terminateReason.terminateReason === 'O') {
						if (otherTerminateReason) {
							setRequired(false);
							// handleTerminateOk(otherTerminateReason);
							handleTerminateOk(terminateFormData, setDisabled);
						} else {
							setRequired(true);
						}
					} else {
						setRequired(false);
						handleTerminateOk(terminateFormData, setDisabled);
					}
				} else {
					setRequired(true);
				}
			};
			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faStopCircle} />
						</div>
						<div className='header-title'>Terminate</div>
					</div>
					<div className='modal-body1' style={{ fontsize: '5rem' }}>
						Are you sure you want to Terminate selected
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Client{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form name='assign-leads-form' className='assign-leads-form'>
							<div
								id='terminateReason'
								className='field-section'
								style={{ marginTop: '1rem', fontsize: '5rem' }}
							>
								<label className='field-label' htmlFor='terminateReason'>
									Reason
								</label>
								<Form.Item name='terminateReason'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Reason'
										onChange={(value) => handleTerminateReasonChange('terminateReason', value)}
										value={terminateReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.ClientTerminateReason.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{
									// terminateReason.terminateReason === "O" ?
									terminateReason.terminateReason ? (
										<Form.Item name='otherTerminateReason'>
											<Input
												maxLength={20}
												onChange={(evt) => handleOtherTerminateReasonChange(evt)}
												size='large'
												value={otherTerminateReason}
												placeholder={'Enter Reason'}
											/>
										</Form.Item>
									) : (
										''
									)
								}
								{required && (
									<Form.Item>
										<Alert
											//style={{ marginBottom: "15px" }}
											message='Reason is required'
											type='error'
											closable
											//onClose={onCloseErrorAlertHandler}
										/>
									</Form.Item>
								)}
							</div>
						</Form>
					</div>
					<div className='modal-footer1'>
						<Button
							className='text-only-btn'
							key='back'
							type='text'
							disabled={disabled}
							style={{ fontSize: '28px' }}
							onClick={() => {
								cancelOperation('terminate');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn1'
							key='submit'
							type='primary'
							disabled={disabled}
							style={{ fontSize: '28px' }}
							onClick={onTerminate}
						>
							Terminate
						</Button>
					</div>
				</>
			);
		};
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('terminate');
				}}
				handleOk={handleTerminateOk}
				visible={showTerminateModal}
			>
				{terminateFailedArray === 'emptyArray' ? (
					<TerminateScreen />
				) : terminateFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='terminate' />
				) : (
					<ActionFailModalScreen errorArray={terminateFailedArray} operationName='terminate' />
				)}
			</CustomModal>
		);
	};
	const RenderConfirmRejectModal = () => {
		const RejectConfirmScreen = () => {
			const [rejectReason, setRejectReason] = useState('');
			const [otherRejectReason, setOtherRejectReason] = useState('');
			const [required, setRequired] = useState(false);
			const [disabled, setDisabled] = useState(false);
			const handleRejectReasonChange = (key, value) => {
				setRequired(false);
				setRejectReason({ [key]: value });

				setOtherRejectReason('');
			};
			const handleOtherRejectReasonChange = (e) => {
				if (rejectReason.rejectReason) {
					setOtherRejectReason(e.target.value);
					setRequired(false);
				}
			};
			const onReject = () => {
				let rejectFormData = {
					reason: rejectReason.rejectReason,
					otherReason: otherRejectReason
				};

				if (rejectReason.rejectReason) {
					if (rejectReason.rejectReason === 'O') {
						if (otherRejectReason) {
							setRequired(false);
							// handleRejectOk(otherRejectReason);
							handleRejectOk(rejectFormData, setDisabled);
						} else {
							setRequired(true);
						}
					} else {
						setRequired(false);
						//  handleRejectOk(otherRejectReason);
						handleRejectOk(rejectFormData, setDisabled);
					}
				} else {
					setRequired(true);
				}
			};
			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faFileExcel} />
						</div>
						<div className='header-title'>Reject</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to reject the selected
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Client{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form name='assign-leads-form' className='assign-leads-form'>
							<div id='rejectReason' className='field-section' style={{ marginTop: '1rem' }}>
								<label className='field-label' htmlFor='rejectReason'>
									Reason
								</label>
								<Form.Item name='rejectReason'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Reason'
										onChange={(value) => handleRejectReasonChange('rejectReason', value)}
										value={rejectReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.RejectReason.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{rejectReason.rejectReason ? (
									// <Form.Item name="otherRejectReason" value={otherRejectReason}>
									<Form.Item>
										<Input
											maxLength={400}
											onChange={(evt) => handleOtherRejectReasonChange(evt)}
											size='large'
											value={otherRejectReason}
											placeholder={'Enter Reason'}
										/>
									</Form.Item>
								) : (
									''
								)}
								{required && (
									<Form.Item>
										<Alert
											//style={{ marginBottom: "15px" }}
											message='Reason is required'
											type='error'
											closable
											//onClose={onCloseErrorAlertHandler}
										/>
									</Form.Item>
								)}
							</div>
						</Form>
					</div>
					<div className='modal-footer1'>
						<Button
							className='text-only-btn'
							key='back'
							type='text'
							disabled={disabled}
							onClick={() => {
								cancelOperation('reject');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn1'
							key='submit'
							type='primary'
							disabled={disabled}
							style={{ fontSize: '28px' }}
							onClick={onReject}
						>
							Reject
						</Button>
					</div>
				</>
			);
		};
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('reject');
				}}
				handleOk={handleRejectOk}
				visible={showRejectModal}
			>
				{rejectFailedArray === 'emptyArray' ? (
					<RejectConfirmScreen />
				) : rejectFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='reject' />
				) : (
					<ActionFailModalScreen errorArray={rejectFailedArray} operationName='reject' />
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
						{selectedRows.map(
							(row) =>
								row.customerCode == errObject.refID && (
									<strong key={row.customerCode}>{row.customerName}</strong>
								)
						)}
					</div>
				</div>
			);
			const renderFailReasonCol = (message) => <div style={{ color: '#bc0573' }}>{message}</div>;
			const failTableColumns = [
				{
					float: 'right',
					title: 'Customer',
					dataIndex: 'name',
					key: 'avatar',
					// width: 300,
					render: (name, dataObject) => renderRecordDetailsCol(dataObject)
				},
				{
					float: 'right',
					title: 'Failed Reason',
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
					<div>
						<Table
							className='failed-actions-list-container'
							rowClassName='failed-action-row'
							columns={failTableColumns}
							dataSource={errorArray}
							rowKey='mobile'
							showHeader={true}
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

	const onCellDefault = (row, rowIndex) => {
		const customerOnboardingIds = localCustomerOnboardingData.map((item) => item.customerCode);

		const index = [
			...localCustomerOnboardingData.map((item, index) => {
				if (item.customerCode === row.customerCode) {
					return index;
				} else return null;
			})
		].filter((item) => item !== null);

		const toObject = {
			pathname: `${path}/CustomerView`,
			state: {
				customerOnboardingtIds: customerOnboardingIds,
				rowIndex: index[0],

				allCustomerOnboarding: allCustomerOnboardingData
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

	return (
		<div className='customerOnboarding-listing-container'>
			{/* <RenderConfirmEndorseModal /> */}
			<RenderConfirmApprovalModal />
			<RenderConfirmRejectModal />
			{/* <RenderDowngradeModal /> */}
			{/* <RenderUpgradeModal /> */}
			<RenderTerminateModal />
			<RenderTopBar loading={loading} authorizeCode={authorizeCode} />
			<RenderFiltersPanel
				selectedRowKeys={selectedRowKeys}
				selectedRows={selectedRows}
				setShowEndorseModal={setShowEndorseModal}
				setShowApproveModal={setShowApproveModal}
				setShowRejectModal={setShowRejectModal}
				setShowUpgradeModal={setShowUpgradeModal}
				setShowDowngradeModal={setShowDowngradeModal}
				setShowTerminateModal={setShowTerminateModal}
				loading={loading}
				setLoading={setLoading}
				controlStructure={controlStructure}
				executeGetAllCustomerOnboardingData={executeGetAllCustomerOnboardingData}
				setLocalCustomerOnboardingData={setLocalCustomerOnboardingData}
				allCustomerOnboardingData={allCustomerOnboardingData}
				localCustomerOnboardingData={localCustomerOnboardingData}
				downloadRecords={downloadRecords}
				setRmForDowngrade={setRmForDowngrade}
				authorizeCode={authorizeCode}
			/>

			<CustomerOnboardingTable
				onCellDefault={onCellDefault}
				loading={loading}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				tableData={localCustomerOnboardingData}
				setShowEndorseModal={setShowEndorseModal}
				setShowApproveModal={setShowApproveModal}
				setShowRejectModal={setShowRejectModal}
				setShowUpgradeModal={setShowUpgradeModal}
				setShowDowngradeModal={setShowDowngradeModal}
				setShowTerminateModal={setShowTerminateModal}
				authorizeCode={authorizeCode}
				// onClickEdit={onClickEdit}
			/>
			<BackToTop />
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		customerOnboardingListingCs: state.customerOnboardingListing.controlStructure,
		allCustomerOnboardingData:
			state.customerOnboardingListing &&
			state.customerOnboardingListing.allCustomerOnboarding &&
			state.customerOnboardingListing.allCustomerOnboarding.lstOnboardingResponse,
		rowsCount:
			state.customerOnboardingListing &&
			state.customerOnboardingListing.allcustomerOnboarding &&
			state.customerOnboardingListing.allcustomerOnboarding.rowCount,
		leftPanel: state.dashboard.leftPanel
	};
};
const mapDispatchToProps = {
	executeGetCustomerOnboardingListingCs,
	executeGetAllCustomerOnboardingData
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOnboardingListingScreen);

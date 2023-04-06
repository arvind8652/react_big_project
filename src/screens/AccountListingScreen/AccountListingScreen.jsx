import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Select, Input, Alert, Tooltip } from 'antd';
import './AccountListingScreen.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
	assignSelectedCustomerOnboardingApi,
	terminateCustomerOnboardingApi
} from '../../api/customerOnboardingListingApi';
import { approveAccountApi, rejectAccountApi } from '../../api/accountListApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { assets } from '../../constants/assetPaths';
import {
	faUserCheck,
	faFileCheck,
	faStopCircle,
	faFileExcel
} from '@fortawesome/pro-light-svg-icons';

import { connect } from 'react-redux';
import {
	executeGetCustomerOnboardingListingCs,
	executeGetAllCustomerOnboardingData
} from '../../redux/actions/customerOnboardingListingAction';
import { deleteAccountApi } from '../../api/accountViewApi';
import { authorizeModule, generateCsObject } from '../../utils/utils';

import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import AccountTable from '../../components/AccountTable/AccountTable';
import RenderTopBar from './AccountListingComponents/RenderTopBar';
import RenderFiltersPanel from './AccountListingComponents/RenderFilterPanel';
import {
	executeGetAllPendingAccounts,
	executeAccountListingCs
} from '../../redux/actions/accountListActions';
import { CONSTANTS } from '../../constants/constants';
import BackToTop from '../../components/BackToTop/BackToTop';
import { ScButtonPrimary, ScButtonText } from '../../components/StyledComponents/genericElements';

function AccountListingScreen(props) {
	const {
		accountList,
		allAccountData,
		executeGetAllPendingAccounts,
		executeAccountListingCs,
		accountListingCs,
		executeGetCustomerOnboardingListingCs,
		executeGetAllCustomerOnboardingData,
		customerOnboardingListingCs,
		allCustomerOnboardingData,
		leftPanel,
		allPendingData
	} = props;
	const emptyArray = 'emptyArray';
	const [terminateFailedArray, setTerminateFailedArray] = useState(emptyArray);
	const [loading, setLoading] = useState(false);
	const [localAccountData, setLocalAccountData] = useState(allAccountData);
	const [endorseFailedArray, setEndorseFailedArray] = useState();
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [showEndorseModal, setShowEndorseModal] = useState(false);
	const [showApproveModal, setShowApproveModal] = useState(false);
	const [showTerminateModal, setShowTerminateModal] = useState();
	const [showRejectModal, setShowRejectModal] = useState();
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [approveFailedArray, setApproveFailedArray] = useState(emptyArray);
	const [rejectFailedArray, setRejectFailedArray] = useState(emptyArray);
	const [categoryDropdownValues, setCategoryDropdownValues] = useState([]);
	const [categoryUpgradeDropdownValues, setCategoryUpgradeDropdownValues] = useState([]);
	const [localCustomerOnboardingData, setLocalCustomerOnboardingData] =
		useState(allCustomerOnboardingData);
	const { path } = useRouteMatch();
	const history = useHistory();
	localStorage.removeItem('modeOp');
	const controlStructure =
		accountListingCs &&
		Array.isArray(accountListingCs) &&
		accountListingCs.length > 0 &&
		generateCsObject(accountListingCs[0].controlStructureField);
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'ACCOUNTREQADD') authorizeCode = subMenu.authorizeCode;
			});
		});
	useEffect(() => {
		executeGetAllPendingAccounts(setLocalAccountData, setLoading);
		executeAccountListingCs();
		executeGetAllCustomerOnboardingData(setLocalCustomerOnboardingData, setLoading);
	}, []);
	useEffect(() => {
		if (selectedRows && selectedRows.length > 0) {
			let categoryDropdownValues = controlStructure?.Category?.dropDownValue.filter((item) => {
				return parseInt(item.dataValue) < parseInt(selectedRows[0].customerCategory);
			});
			setCategoryDropdownValues(categoryDropdownValues);
		}
	}, [selectedRows]);
	const handleEndorseOk = (values) => {
		assignSelectedCustomerOnboardingApi(selectedRowKeys, values.relationshipManager).then((res) => {
			setEndorseFailedArray(res.data.filter((status) => !status.success));
		});
	};

	// terminate
	// const handleTerminateOk = (para) => {
	//   deleteAccountApi(
	//     selectedRowKeys,
	//     para.LstRefID,
	//     para.Reason,
	//     para.Remarks
	//   ).then((res) => {
	//     setTerminateFailedArray(res.data.filter((status)=>!status.success))
	//   })
	// }
	const handleTerminateOk = () => {
		// let requestBody = [];
		let payload = {};
		selectedRows.forEach((ele) => {
			// let payload = {};
			payload.lstRefID = [ele.scheme];
			payload.Reason = ele.terminateReason;
			// payload.Remarks = "";

			// requestBody.push(payload);
		});
		deleteAccountApi(payload).then((res) => {
			setTerminateFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleApproveOk = () => {
		setLoading(true);
		let requestBody = [];
		selectedRows.map((ele) => {
			let payload = {};
			payload.Scheme = ele.scheme;
			payload.IsNew = false;
			payload.Event = 'A';
			payload.Remark = 'need to update data';
			requestBody.push(payload);
		});
		approveAccountApi(requestBody).then((res) => {
			setApproveFailedArray(res.data.filter((status) => !status.success));
			setLoading(false);
		});
	};

	const handleRejectOk = (rejectAndOtherReject, otherRejectReason) => {
		setLoading(true);
		let requestBody = [];
		selectedRows.map((ele) => {
			let payload = {};
			payload.Scheme = ele.scheme;
			payload.IsNew = false;
			payload.Event = 'R';
			payload.Remark = rejectAndOtherReject + (otherRejectReason && ' - ' + otherRejectReason);
			requestBody.push(payload);
		});
		rejectAccountApi(requestBody).then((res) => {
			setRejectFailedArray(res.data.filter((status) => !status.success));
			setLoading(false);
		});
	};

	const closeModal = (operationName) => {
		setShowFailedActions(false);
		if (operationName === 'approve') {
			setApproveFailedArray(emptyArray);
			setShowApproveModal(false);
		}
		if (operationName === 'reject') {
			setShowRejectModal(false);
			setRejectFailedArray(emptyArray);
		}
		if (operationName === 'terminate') {
			setShowTerminateModal(false);
			setTerminateFailedArray(emptyArray);
		}
		setSelectedRowKeys([]);
		setSelectedRows([]);
		executeGetAllPendingAccounts(setLocalAccountData, setLoading);
		executeGetAllCustomerOnboardingData(setLocalCustomerOnboardingData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'endorse' && setShowEndorseModal(false);
		operationName === 'approve' && setShowApproveModal(false);
		operationName === 'reject' && setShowRejectModal(false);
		operationName === 'terminate' && setShowTerminateModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};

	const RenderConfirmEndorseModal = () => {
		const ConfirmScreen = () => (
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
				<Form name='assign-leads-form' className='assign-leads-form' onFinish={handleEndorseOk}>
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
								value={[]}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{/* {controlStructure.RelationshipManager.lookupValue.lookUpValues.map(
                                    (option) => (
                                        <Select.Option key={option.ID} value={option.ID}>
                                            {option.Name}
                                        </Select.Option>
                                    )
                                )} */}
							</Select>
						</Form.Item>
					</div>
				</Form>
				<div className='modal-footer'>
					<ScButtonText
						key='back'
						type='text'
						onClick={() => {
							cancelOperation('endorse');
						}}
					>
						Cancel
					</ScButtonText>
					<ScButtonPrimary key='submit' type='primary' onClick={handleEndorseOk}>
						Endorse
					</ScButtonPrimary>
				</div>
			</>
		);
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('endorse');
				}}
				handleOk={handleEndorseOk}
				visible={showEndorseModal}
			>
				{typeof endorseFailedArray === 'undefined' ? (
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
		const ApprovalConfirmScreen = () => (
			<>
				<div className='modal-header'>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faFileCheck} />
					</div>
					<div className='header-title'>Approval</div>
				</div>
				<div className='modal-body'>
					Are you sure you want to approve
					{selectedRowKeys.length > 1
						? ` ${selectedRowKeys.length} `
						: selectedRowKeys.length === 1 && ' '}
					the selected Accoun{selectedRowKeys.length > 1 ? 'ts' : 't'}?
				</div>
				<div className='modal-footer'>
					<ScButtonText
						key='back'
						type='text'
						onClick={() => {
							cancelOperation('approve');
						}}
					>
						Cancel
					</ScButtonText>
					<ScButtonPrimary disabled={loading} key='submit' type='primary' onClick={handleApproveOk}>
						{' '}
						Approve
					</ScButtonPrimary>
				</div>
			</>
		);
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
	const RenderConfirmRejectModal = () => {
		const RejectConfirmScreen = () => {
			const [rejectReason, setRejectReason] = useState('');
			const [otherRejectReason, setOtherRejectReason] = useState('');
			const [rejectAndOtherReject, setRejectAndOtherReject] = useState();
			const [required, setRequired] = useState(false);
			const handleRejectReasonChange = (key, value, data) => {
				setRequired(false);
				setRejectReason({ [key]: value });
				setRejectAndOtherReject(data.children);
			};
			const handleOtherRejectReasonChange = (e) => {
				setOtherRejectReason(e.target.value);
			};
			const onReject = () => {
				if (rejectReason.rejectReason) {
					if (rejectReason.rejectReason === 'O') {
						if (otherRejectReason) {
							setRequired(false);
							handleRejectOk(rejectAndOtherReject, otherRejectReason);
						} else {
							setRequired(true);
						}
					} else {
						setRequired(false);
						handleRejectOk(rejectAndOtherReject, otherRejectReason);
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
						Are you sure you want to reject selected
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Account{selectedRowKeys.length > 1 ? 's' : ' '}?
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
										onChange={(value, data) =>
											handleRejectReasonChange('rejectReason', value, data)
										}
										value={rejectReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure &&
											controlStructure?.AccountTerminateReason.dropDownValue.map((option) => (
												<Select.Option key={option.dataValue} value={option.dataValue}>
													{option.displayValue}
												</Select.Option>
											))}
									</Select>
								</Form.Item>
								{rejectReason.rejectReason && (
									<Form.Item name='otherRejectReason'>
										<Input
											maxLength={500}
											onChange={(evt) => handleOtherRejectReasonChange(evt)}
											size='large'
											value={otherRejectReason}
											placeholder={'Enter Reason'}
										/>
									</Form.Item>
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
					<div className='modal-footer'>
						<ScButtonText
							key='back'
							type='text'
							onClick={() => {
								cancelOperation('reject');
							}}
						>
							Cancel
						</ScButtonText>
						<ScButtonPrimary key='submit' disabled={loading} type='primary' onClick={onReject}>
							Reject
						</ScButtonPrimary>
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

	// terminate Screen
	const RenderTerminateModal = () => {
		const TerminateScreen = () => {
			const [terminateReason, setTerminateReason] = useState('');
			const [otherTerminateReason, setOtherTerminateReason] = useState('');
			const [required, setRequired] = useState(false);
			const handleTerminateReasonChange = (key, value) => {
				setRequired(false);
				setTerminateReason({ [key]: value });
			};
			const handleOtherTerminateReasonChange = (e) => {
				if (terminateReason.terminateReason === 'O') {
					setOtherTerminateReason(e.target.value);
				}
			};
			const onTerminate = () => {
				if (terminateReason.terminateReason === 'O') {
					if (otherTerminateReason) {
						setRequired(false);

						handleTerminateOk(otherTerminateReason);
					} else {
						setRequired(true);
					}
				}
				// else {
				//   handleTerminateOk(terminateReason.terminateReason);
				// }
				else {
					setRequired(false);

					handleTerminateOk(otherTerminateReason);
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
					<div className='modal-body1' style={{ fontsize: '1rem' }}>
						Are you sure you want to Terminate selected
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Account{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form name='assign-leads-form' className='assign-leads-form'>
							<div id='terminateReason' className='field-section' style={{ marginTop: '1rem' }}>
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
										{controlStructure.AccountTerminateReason.dropDownValue.map((option) => (
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
					<div className='modal-footer'>
						<ScButtonText
							key='back'
							type='text'
							onClick={() => {
								cancelOperation('terminate');
							}}
						>
							Cancel
						</ScButtonText>
						<ScButtonPrimary key='submit' type='primary' onClick={onTerminate}>
							Terminate
						</ScButtonPrimary>
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
					title: 'Account',
					dataIndex: 'name',
					key: 'avatar',
					render: (name, dataObject) => renderRecordDetailsCol(dataObject)
				},
				{
					float: 'right',
					title: 'Failed Reason',
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
					<div>
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

	const onCellDefault = (row, rowIndex) => {
		const accountIds = localAccountData.map((item) => item.scheme);
		const index = [
			...localAccountData.map((item, index) => {
				if (item.scheme === row.scheme) {
					return index;
				} else return null;
			})
		].filter((item) => item !== null);
		const toObject = {
			pathname: `${path}/accountView`,
			state: {
				accountIds: accountIds,
				rowIndex: index[0],
				allAccountData: allAccountData
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
			<RenderConfirmEndorseModal />
			<RenderConfirmApprovalModal />
			<RenderConfirmRejectModal />
			<RenderTerminateModal />
			<RenderTopBar loading={loading} authorizeCode={authorizeCode} />
			<RenderFiltersPanel
				selectedRowKeys={selectedRowKeys}
				selectedRows={selectedRows}
				//setShowEndorseModal={setShowEndorseModal}
				setShowApproveModal={setShowApproveModal}
				setShowRejectModal={setShowRejectModal}
				loading={loading}
				setLoading={setLoading}
				// filterCs={filterCs}
				controlStructure={controlStructure}
				executeGetAllCustomerOnboardingData={executeGetAllCustomerOnboardingData}
				executeGetAllPendingAccounts={executeGetAllPendingAccounts}
				allPendingData={allPendingData}
				setLocalAccountData={setLocalAccountData}
				allAccountData={allAccountData}
				localAccountData={localAccountData}
				setLocalCustomerOnboardingData={setLocalCustomerOnboardingData}
				allCustomerOnboardingData={allCustomerOnboardingData}
				authorizeCode={authorizeCode}
			/>

			<AccountTable
				onCellDefault={onCellDefault}
				// onRowClick={rowSelect}
				// onCellFavourite={onCellFavourite}
				loading={loading}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				tableData={localAccountData}
				setShowEndorseModal={setShowEndorseModal}
				setShowApproveModal={setShowApproveModal}
				setShowRejectModal={setShowRejectModal}
				setShowTerminateModal={setShowTerminateModal}
				// onClickEdit={onClickEdit}
			/>
			<BackToTop />
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		allAccountData:
			state.accountList &&
			state.accountList.allAccount &&
			state.accountList.allAccount.accountResponseModel,
		accountListStatus: state.accountList.Status,
		accountListingCs: state.accountList.controlStructure,
		allCustomerOnboardingData:
			state.customerOnboardingListing &&
			state.customerOnboardingListing.allCustomerOnboarding &&
			state.customerOnboardingListing.allCustomerOnboarding.lstOnboardingResponse,
		rowsCount:
			state.customerOnboardingListing &&
			state.customerOnboardingListing.allcustomerOnboarding &&
			state.customerOnboardingListing.allcustomerOnboarding.rowCount,
		leftPanel: state.dashboard.leftPanel,
		allPendingData:
			state.accountList && state.accountList.allAccount && state.accountList.allAccount.status
	};
};
const mapDispatchToProps = {
	executeGetCustomerOnboardingListingCs,
	executeGetAllCustomerOnboardingData,
	executeGetAllPendingAccounts,
	executeAccountListingCs
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountListingScreen);

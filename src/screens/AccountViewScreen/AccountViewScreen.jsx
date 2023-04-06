import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Select, Alert, Button, Table } from 'antd';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import RiskProfile from '../../components/RiskProfile/RiskProfile';
import CardWithTableView from '../../components/CommonCards/CardWithTableView';
import BackToTop from '../../components/BackToTop/BackToTop';
import {
	BANKDETAILS_COL,
	SECURITYACCOUNTS_COL
} from '../../components/CommonCards/BankDetailsConstant';
import AccountDetailTabs from './AccountDetailTabs';
import OtherDetail from '../../components/OtherDetail/OtherDetail';
import { accountDetailsAllApi } from '../../redux/actions/accountViewAction';
import CustomerDetails from './CustomerDetails';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import MiscellaneousCardView from '../ProspectViewScreen/ProspectComponent/MiscellaneousCardView';
import { DocumentCardWithUpload } from '../../components/DocumentTable/DocumentCardWithUpload';
import AccountDeleteModal from './AccountDeleteModal';
import AccountAccept from './AccountAccept';
import AccountReject from './AccountReject';
import MailingInstruction from '../../components/MailingInstruction/CustomerViewMailingInstruction';
import { HorizontalTimeLine } from '../../components/Timeline/HorizontalTimeLine';
import { generateCsObject } from '../../utils/utils';
import {
	executeGetClientAccountDetailsByID,
	executegetProfileMiscellaneous,
	executegetProfileAttachmentDetails,
	executegetProfileVerticalTimeline
} from '../../redux/actions/profileViewAccountAction';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFileCheck } from '@fortawesome/pro-light-svg-icons';
import { ScButtonPrimary, ScButtonText } from '../../components/StyledComponents/genericElements';
import { approveAccountApi, rejectAccountApi } from '../../api/accountListApi';
import { assets } from '../../constants/assetPaths';
const styleSet = {
	cardStyle: {
		margin: '12px 0px'
	},
	redBorder: '1px solid red',
	errorMsg: { float: 'left', color: 'red', marginTop: 10, paddingLeft: '24px' }
};
const AccountViewScreen = (props) => {
	const { executeAccountListingCs, accountListingCs, leftPanel } = props;
	const location = useLocation();
	const [showApproveModal, setShowApproveModal] = useState(false);
	const [showRejectModal, setShowRejectModal] = useState(false);
	const { accountIds, rowIndex, allAccountData } = location.state;
	const [currentRowCount, setcurrentRowCount] = useState(rowIndex);
	const [selectedAccount, setSelectedAccount] = useState({});
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	// -----------------------------------------------
	const history = useHistory();
	const closeModal = (operationName) => {
		// if (operationName == 'endorse') {
		// 	setEndorseFailedArray(emptyArray);
		// 	setShowEndorseModal(false);
		// }
		if (operationName === 'approve') {
			setApproveFailedArray(emptyArray);
			setShowApproveModal(false);
		}
		if (operationName === 'reject') {
			setShowRejectModal(false);
			setRejectFailedArray(emptyArray);
		}
		// if (operationName === 'terminate') {
		// 	setShowTerminateModal(false);
		// 	setTerminateFailedArray(emptyArray);
		// }
		setShowFailedActions(false);

		// executeGetAllPendingAccounts(setLocalAccountData, setLoading);
		// executeGetAllCustomerOnboardingData(setLocalCustomerOnboardingData, setLoading);
	};

	const cancelOperation = (operationName) => {
		// operationName === 'endorse' && setShowEndorseModal(false);
		operationName === 'approve' && setShowApproveModal(false);
		operationName === 'reject' && setShowRejectModal(false);
		// operationName === 'terminate' && setShowTerminateModal(false);
	};

	const controlStructure =
		accountListingCs &&
		Array.isArray(accountListingCs) &&
		accountListingCs.length > 0 &&
		generateCsObject(accountListingCs[0].controlStructureField);

	const emptyArray = 'emptyArray';
	const [rejectFailedArray, setRejectFailedArray] = useState(emptyArray);
	const [approveFailedArray, setApproveFailedArray] = useState(emptyArray);

	const [showFailedActions, setShowFailedActions] = useState(false);

	const handleApproveOk = () => {
		let requestBody = [];
		let payload = {};
		payload.Scheme = selectedAccount?.scheme;
		payload.IsNew = false;
		payload.Event = 'A';
		payload.Remark = 'need to update data';
		requestBody.push(payload);
		approveAccountApi(requestBody).then((res) => {
			setApproveFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleRejectOk = (rejectAndOtherReject, otherRejectReason) => {
		let requestBody = [];
		let payload = {};
		payload.Scheme = selectedAccount?.scheme;
		payload.IsNew = false;
		payload.Event = 'R';
		payload.Remark = rejectAndOtherReject + (otherRejectReason && ' - ' + otherRejectReason);

		requestBody.push(payload);

		rejectAccountApi(requestBody).then((res) => {
			setRejectFailedArray(res.data.filter((status) => !status.success));
		});
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
					Are you sure you want to approve the selected Account
					{/* {selectedRowKeys.length > 1
						? ` ${selectedRowKeys.length} `
						: selectedRowKeys.length === 1 && ' '}
					the selected Accoun{selectedRowKeys.length > 1 ? 'ts' : 't'}? */}
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
					<ScButtonPrimary key='submit' type='primary' onClick={handleApproveOk}>
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
						Are you sure you want to reject selected Account
						{/* {selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Client{selectedRowKeys.length > 1 ? 's' : ' '}? */}
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
						<ScButtonPrimary key='submit' type='primary' onClick={onReject}>
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

	const ActionSuccessModalScreen = ({ operationName }) => (
		<>
			<div className='modal-body'>
				<div className='action-success-screen'>
					<img src={assets.common.successTick} alt='success' className='success-logo' />
					<div style={{ display: 'flex', flexDirection: 'column' }}>
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
							history.push('/dashboard/MyAccount');
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
						<img src={assets?.common?.triangleExclamation} alt='fail' className='fail-logo' />
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className='title'>0/1 Successful Action</div>
							<div className='subtitle'>
								{errorArray?.length} action{errorArray?.length > 1 && 's'} could not be
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
					{/* <div>
						{allCustomerOnboardingData.clientId == errObject.refID && (
							<strong key={allCustomerOnboardingData.clientId}>
								{allCustomerOnboardingData.fullName}
							</strong>
						)}
					</div> */}
					<div>
						<strong>{errObject?.name}</strong>
					</div>
					<div>{errObject?.mobile}</div>
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
	// -----------------------------------------------

	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'ACCOUNTREQADD') authorizeCode = subMenu.authorizeCode;
			});
		});

	useEffect(() => {
		filterAccountObject();
		if (location.state.progName === 'ACCOUNTADD') {
			executeGetClientAccountDetailsByID(accountIds[currentRowCount]);
			executegetProfileMiscellaneous('ACCOUNTADD', accountIds[currentRowCount]);
			executegetProfileAttachmentDetails('ACCOUNTADD', accountIds[currentRowCount]);
			executegetProfileVerticalTimeline(accountIds[currentRowCount]);
		} else {
			accountDetailsAllApi(accountIds[currentRowCount]);
		}
		return () => {
			filterAccountObject();
			if (location.state.progName === 'ACCOUNTADD') {
				executeGetClientAccountDetailsByID(accountIds[currentRowCount]);
				executegetProfileMiscellaneous('ACCOUNTADD', accountIds[currentRowCount]);
				executegetProfileAttachmentDetails('ACCOUNTADD', accountIds[currentRowCount]);
				executegetProfileVerticalTimeline(accountIds[currentRowCount]);
			} else {
				accountDetailsAllApi(accountIds[currentRowCount]);
			}
		};
	}, [currentRowCount]);

	const filterAccountObject = () => {
		let selectedObj = allAccountData.filter((ele) => {
			if (ele.scheme === accountIds[currentRowCount]) {
				ele.refType = 'ACCOUNTREQADD';
				return ele;
			}
		});
		if (selectedObj.length > 0) {
			setSelectedAccount(selectedObj[0]);
		}
	};

	const handlePreviousClick = () => {
		if (currentRowCount !== 0) setcurrentRowCount(currentRowCount - 1);
	};

	const handleNextClick = () => {
		// if (accountIds.length === currentRowCount) {
		if (accountIds.length - 1 === currentRowCount) {
			setcurrentRowCount(0);
		} else {
			setcurrentRowCount(currentRowCount + 1);
		}
	};

	const handleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};
	const handleApproveModal = () => {
		setShowApproveModal(!showApproveModal);
	};
	const handleRejectModal = () => {
		setShowRejectModal(!showRejectModal);
	};

	return (
		<>
			{showDeleteModal && (
				<AccountDeleteModal
					showDeleteModalFlag={showDeleteModal}
					handleDeleteModal={handleDeleteModal}
					accountId={accountIds[currentRowCount]}
					controlStructure={controlStructure}
				/>
			)}
			{showApproveModal && (
				// <AccountAccept
				// 	showApproveModalFlag={showApproveModal}
				// 	handleApproveModal={handleApproveModal}
				// 	accountId={accountIds[currentRowCount]}
				// />
				<RenderConfirmApprovalModal />
			)}
			{showRejectModal && (
				// <AccountReject
				// 	showRejectModalFlag={showRejectModal}
				// 	handleRejectModal={handleRejectModal}
				// 	accountId={accountIds[currentRowCount]}
				// 	controlStructure={controlStructure}
				// />
				<RenderConfirmRejectModal />
			)}
			<Row>
				<Col span={24}>
					<CustomerDetails
						currentRowCount={currentRowCount}
						action={location?.state?.action ?? ''}
						authorizeCode={authorizeCode}
						handlePreviousClick={handlePreviousClick}
						handleNextClick={handleNextClick}
						setShowRejectModal={handleRejectModal}
						setShowApproveModal={handleApproveModal}
						setShowDeleteModal={handleDeleteModal}
						customerDetails={
							location.state.progName === 'ACCOUNTADD'
								? props.profileCustomerDetails
								: props.customerDetails
						}
						allAccountData={allAccountData}
						baseSchemeRequisition={props.baseSchemeRequisition}
						accountDetails={
							location.state.progName === 'ACCOUNTADD'
								? props.profileAccountDetailsDataObj
								: props.accountDetailsDataObj
						}
						jointHolder={
							location.state.progName === 'ACCOUNTADD'
								? props.profileJointHolder
								: props.jointHolder
								? props.jointHolder
								: []
						}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24} style={styleSet.cardStyle}>
					<HorizontalTimeLine
						horizontalTimeline={
							location.state.progName === 'ACCOUNTADD'
								? props.profileHorizontalTimeline
								: props.horizontalTimeline
								? props.horizontalTimeline
								: []
						}
					/>
				</Col>
				{/* <Col span={24} style={styleSet.cardStyle}><HorizontalTimeline horizontalTimeline={props.horizontalTimeline ? props.horizontalTimeline : []} /></Col> */}
			</Row>
			<Row>
				<Col span={24} style={styleSet.cardStyle}>
					<AccountDetailTabs
						jointHolder={
							location.state.progName === 'ACCOUNTADD'
								? props.profileJointHolder
								: props.jointHolder
								? props.jointHolder
								: []
						}
						timelineDetails={
							location.state.progName === 'ACCOUNTADD'
								? props.profileTimelineDetails
								: props.timelineDetails
						}
						accountDetailsData={
							location.state.progName === 'ACCOUNTADD'
								? props.profileAccountDetailsDataObj
								: props.accountDetailsDataObj
						}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24} style={styleSet.cardStyle}>
					<OtherDetail
						otherDetail={
							location.state.progName === 'ACCOUNTADD'
								? props.profileAccountDetailsDataObj
								: props.accountDetailsDataObj
						}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24} style={styleSet.cardStyle}>
					<MailingInstruction
						screen={'accountViewScreen'}
						mailingInstructionDetail={
							location.state.progName === 'ACCOUNTADD'
								? props.profileAccountDetailsDataObj
								: props.accountDetailsDataObj
						}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24} style={styleSet.cardStyle}>
					<RiskProfile
						riskProfileData={
							location.state.progName === 'ACCOUNTADD'
								? props.profileRiskProfileModel
								: props.riskProfileModel
						}
					></RiskProfile>
				</Col>
			</Row>
			<Row style={styleSet.cardStyle}>
				<Col span={24}>
					<AttachmentUploadModal
						selectedAccount={selectedAccount}
						data={
							location.state.progName === 'ACCOUNTADD'
								? props.profileAttachmentDetails
								: props.attachmentDetails
						}
						action={'view'}
					/>
				</Col>
			</Row>
			<Row style={styleSet.cardStyle}>
				<Col span={24}>
					<DocumentCardWithUpload
						data={
							location.state.progName === 'ACCOUNTADD'
								? props.profileDocumentDetailsModel?.lstDocumentInfo
								: props.documentDetailsModel?.lstDocumentInfo
						}
						action={'view'}
					/>
				</Col>
			</Row>
			<Row style={styleSet.cardStyle}>
				<Col span={24}>
					<CardWithTableView
						header={'Bank Account'}
						columns={BANKDETAILS_COL}
						data={
							location.state.progName === 'ACCOUNTADD'
								? props.profileBankDetailsData
								: props.bankDetailsData
						}
					></CardWithTableView>
				</Col>
			</Row>
			{/* <Row style={styleSet.cardStyle}>
				<Col span={24}>
					<CardWithTableView
						header={'Security Account'}
						columns={SECURITYACCOUNTS_COL}
						data={
							location.state.progName === 'ACCOUNTADD'
								? props.profileSecurityAccountDetails
								: props.securityAccountDetails
						}
					></CardWithTableView>
				</Col>
			</Row> */}
			<Row>
				<Col span={24}>
					<MiscellaneousCardView
						detail={
							location.state.progName === 'ACCOUNTADD'
								? props.profileMiscellaneousDetails
								: props.miscellaneousDetails
						}
					/>
				</Col>
			</Row>
			<Row>
				<BackToTop />
			</Row>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		customerDetails: state.accountView.accountDetails.customerDetails,
		securityAccountDetails: state.accountView.accountDetails.securityAccountDetails,
		documentDetailsModel: state.accountView.accountDetails.uploadedDocInfo,
		jointHolder: state.accountView.accountDetails.jointHolder,
		accountDetailsDataObj: state.accountView.accountDetails.baseSchemeRequisition,
		bankDetailsData: state.accountView.accountDetails.bankDetails,
		riskProfileModel: state.accountView.accountDetails.riskProfileModel,
		horizontalTimeline: state.accountView.accountDetails.horizontalTimeline,
		timelineDetails: state.accountView.timelineDetails,
		attachmentDetails: state.accountView.attachmentDetails || [],
		miscellaneousDetails: state.accountView.miscellaneousDetails || [],
		accountListingCs: state.accountList.controlStructure,

		profileCustomerDetails: state.profileViewAccount.clientAccountDetailsByID.customerDetails,
		profileSecurityAccountDetails:
			state.profileViewAccount.clientAccountDetailsByID.securityAccountDetails,
		profileDocumentDetailsModel: state.profileViewAccount.clientAccountDetailsByID.uploadedDocInfo,
		profileJointHolder: state.profileViewAccount.clientAccountDetailsByID.jointHolder,
		profileAccountDetailsDataObj:
			state.profileViewAccount.clientAccountDetailsByID.baseSchemeRequisition,
		profileBankDetailsData: state.profileViewAccount.clientAccountDetailsByID.bankDetails,
		profileRiskProfileModel: state.profileViewAccount.clientAccountDetailsByID.riskProfileModel,
		profileHorizontalTimeline: state.profileViewAccount.clientAccountDetailsByID.horizontalTimeline,
		profileTimelineDetails: state.profileViewAccount.VerticalTimelineData,
		profileAttachmentDetails: state.profileViewAccount.attachmentDetailsData || [],
		profileMiscellaneousDetails: state.profileViewAccount.miscellaneousData || [],
		leftPanel: state.dashboard.leftPanel
	};
};
export default connect(mapStateToProps)(AccountViewScreen);

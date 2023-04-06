import { React, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Alert } from 'antd';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { Button, Card, Col, Row, Table, Typography, Form, Select, Tooltip } from 'antd';
import { generateCsObject } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faUserCheck
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faFileTimes,
	faFileCheck,
	faFileExcel,
	faStopCircle
} from '@fortawesome/pro-regular-svg-icons';
import { assets } from '../../constants/assetPaths';
import { palette } from '../../theme';
import {
	assignSelectedCustomerOnboardingApi,
	terminateCustomerOnboardingApi
} from '../../api/customerOnboardingListingApi';
import { approveRejectCustomer } from '../../api/customerViewApi';
import {
	executeGetCustomerOnboardingListingCs,
	executeGetAllCustomerOnboardingData
} from '../../redux/actions/customerOnboardingListingAction';
import TextSubText from '../../screens/ProspectViewScreen/ProspectComponent/TextSubText';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { ScButtonPrimary, ScButtonText } from '../StyledComponents/genericElements';
const { Title } = Typography;
const defaultValue = {
	name: '-',
	address: '-',
	tagName: '-',
	mobile: '-',
	email: '-',
	opportunityName: '-',
	stage: '-',
	targetAmount: '-',
	probability: '-'
};

const ProfileBannerList = ({
	allCustomerOnboardingData = defaultValue,
	allRiskProfileData = defaultValue,
	allWorkflowStatusData = defaultValue,
	handleNextClick,
	handlePreviousClick,
	setShowDeleteModal,
	executeGetCustomerOnboardingListingCs,
	executeGetAllCustomerOnboardingData,
	customerOnboardingListingCs,
	allCustomerListingOnboardingData,
	authorizeCode,
	authData
}) => {
	const styleSet = {
		container: {
			color: palette.text.banner
		}
	};
	const goToEdit = () => {
		const toObject = {
			pathname: '/dashboard/MyCustomers/CustomerEdit',
			state: { action: 'edit', refID: allCustomerOnboardingData?.clientId, refType: 'CLIENTREQADD' }
		};
		history.push(toObject);
	};
	const emptyArray = 'emptyArray';
	const [loading, setLoading] = useState();
	const [endorseFailedArray, setEndorseFailedArray] = useState(emptyArray);
	const [approveFailedArray, setApproveFailedArray] = useState(emptyArray);
	const [rejectFailedArray, setRejectFailedArray] = useState(emptyArray);
	const [terminateFailedArray, setTerminateFailedArray] = useState(emptyArray);
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [showEndorseModal, setShowEndorseModal] = useState(false);
	const [showApproveModal, setShowApproveModal] = useState(false);
	const [showTerminateModal, setShowTerminateModal] = useState(false);
	const [showRejectModal, setShowRejectModal] = useState();
	const [localCustomerOnboardingData, setLocalCustomerOnboardingData] = useState(
		allCustomerListingOnboardingData
	);

	const controlStructure =
		customerOnboardingListingCs &&
		Array.isArray(customerOnboardingListingCs) &&
		customerOnboardingListingCs.length > 0 &&
		generateCsObject(customerOnboardingListingCs[0].controlStructureField);

	useEffect(() => {
		executeGetCustomerOnboardingListingCs();
		executeGetAllCustomerOnboardingData(setLocalCustomerOnboardingData, setLoading);
	}, []);

	const handleEndorseOk = (values) => {
		assignSelectedCustomerOnboardingApi(
			[allCustomerOnboardingData.clientId],
			values.relationshipManager
		).then((res) => {
			setEndorseFailedArray(res.data.filter((status) => !status.success));
		});
	};

	// const handleTerminateOk = () => {
	//   terminateCustomerOnboardingApi([allCustomerOnboardingData.clientId]).then((res) => {
	//     setTerminateFailedArray(res.data.filter((status) => !status.success));
	//   });
	// };
	const handleTerminateOk = (terminateFormData) => {
		let payload = {};
		payload.lstRefID = [allCustomerOnboardingData.clientId];
		payload.Reason = terminateFormData.reason;
		if (terminateFormData.reason) {
			payload.Remark = terminateFormData.otherReason;
		}
		terminateCustomerOnboardingApi(payload).then((res) => {
			setTerminateFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleApproveOk = (approveFormData) => {
		let requestBody = [];
		let payload = {};
		payload.ClientId = allCustomerOnboardingData.clientId;
		payload.LegalStatus = allCustomerOnboardingData.legalStatus;
		payload.IsNew = false;
		payload.Event = 'A';
		payload.Reason = approveFormData.reason;
		if (approveFormData.reason) {
			payload.Remark = approveFormData.otherReason;
		}

		requestBody.push(payload);
		approveRejectCustomer(requestBody).then((res) => {
			setApproveFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleRejectOk = (rejectFormData) => {
		let requestBody = [];
		let payload = {};
		payload.ClientId = allCustomerOnboardingData.clientId;
		payload.LegalStatus = allCustomerOnboardingData.legalStatus;
		payload.IsNew = false;
		payload.Event = 'R';
		payload.Reason = rejectFormData.reason;
		if (rejectFormData.reason) {
			payload.Remark = rejectFormData.otherReason;
		}

		requestBody.push(payload);

		approveRejectCustomer(requestBody).then((res) => {
			setRejectFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const closeModal = (operationName) => {
		if (operationName == 'endorse') {
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
		if (operationName === 'terminate') {
			setShowTerminateModal(false);
			setTerminateFailedArray(emptyArray);
		}
		setShowFailedActions(false);

		executeGetAllCustomerOnboardingData(setLocalCustomerOnboardingData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'endorse' && setShowEndorseModal(false);
		operationName === 'approve' && setShowApproveModal(false);
		operationName === 'reject' && setShowRejectModal(false);
		operationName === 'terminate' && setShowTerminateModal(false);
	};

	const RenderTerminateModal = () => {
		const TerminateScreen = () => {
			const [terminateReason, setTerminateReason] = useState('');
			const [otherTerminateReason, setOtherTerminateReason] = useState('');
			const [required, setRequired] = useState(false);
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
				if (terminateReason.terminateReason === 'O') {
					if (otherTerminateReason) {
						setRequired(false);
						handleTerminateOk(terminateFormData);
					} else {
						setRequired(true);
					}
				} else {
					setRequired(false);
					handleTerminateOk(terminateFormData);
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
						Are you sure want to Terminate the client?
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
										{controlStructure.ClientTerminateReason.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{terminateReason.terminateReason ? (
									<Form.Item>
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
								)}
								{required && (
									<Form.Item>
										<Alert message='Reason is required' type='error' closable />
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

						{/* <Button
							className='text-only-btn'
							key='back'
							type='text'
							style={{ fontSize: '28px' }}
							onClick={() => {
								cancelOperation('terminate');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn'
							key='submit'
							type='primary'
							style={{ fontSize: '28px' }}
							onClick={onTerminate}
						>
							Terminate
						</Button> */}
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

	const RenderConfirmEndorseModal = () => {
		const ConfirmScreen = () => {
			const [relationshipManager, setRelationshipManager] = useState();
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
					<div className='modal-body'>Are you sure you want to Endorse the Client ?</div>
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
						<ScButtonText
							key='back'
							type='text'
							onClick={() => {
								cancelOperation('endorse');
							}}
						>
							Cancel
						</ScButtonText>
						<ScButtonPrimary
							key='submit'
							type='primary'
							onClick={() => handleEndorseOk(relationshipManager)}
						>
							Endorse
						</ScButtonPrimary>

						{/* <Button
							className='text-only-btn'
							key='back'
							type='text'
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
							style={{ fontSize: '28px' }}
							onClick={() => handleEndorseOk(relationshipManager)}
						>
							Endorse
						</Button> */}
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
						handleApproveOk(approveFormData);
					} else {
						setRequired(true);
						// handleApproveOk(approveReason.approveReason);
					}
				} else {
					setRequired(false);
					handleApproveOk(approveFormData);
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
						Are you sure you want to approve the client
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
						<ScButtonPrimary key='submit' type='primary' onClick={onApprove}>
							Approve
						</ScButtonPrimary>

						{/* <Button
								className='text-only-btn'
								key='back'
								type='text'
								onClick={() => {
									cancelOperation('approve');
								}}
							>
								Cancel
							</Button>
							<Button
								className='submit-btn'
								key='submit'
								type='primary'
								style={{ fontSize: '28px' }}
								onClick={onApprove}
							>
								Approve
							</Button> */}
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

	// const RenderConfirmApprovalModal = () => {
	//   const ApprovalConfirmScreen = () => {
	//     const [approveReason, setApproveReason] = useState('')
	//     const [otherApproveReason, setOtherApproveReason] = useState('')
	//     const handleApproveReasonChange = (key, value) => {
	//       // setRequired(false);
	//       setApproveReason({ [key]: value });
	//     };
	//     const handleOtherApproveReasonChange = (e) => {
	//       if (approveReason.approveReason) {

	//         setOtherApproveReason(e.target.value);
	//       }
	//     };
	//     const onApprove = () => {
	//       if (approveReason.approveReason) {
	//         handleApproveOk(approveReason.approveReason);
	//       }

	//       else {
	//         handleApproveOk(approveReason.approveReason);
	//       }

	//     }
	//     return (
	//       <>
	//         <div className="modal-header">
	//           <div className="header-icon">
	//             <FontAwesomeIcon icon={faFileCheck} />
	//           </div>
	//           <div className="header-title">Approval</div>
	//         </div>
	//         <div className="modal-body">
	//           Are you sure you want to approve the client
	//         </div>
	//         <Form
	//           name="assign-leads-form"
	//           className="assign-leads-form">

	//           <div id="approveReason" className="field-section" style={{ marginTop: "1rem" }}>
	//             <label className="field-label" htmlFor="approveReason">
	//               Reason
	//             </label>
	//             <Form.Item name="approveReason">
	//               <Select
	//                 size="large"
	//                 mode="single"
	//                 placeholder="Select Reason"
	//                 onChange={value => handleApproveReasonChange('approveReason', value)}
	//                 value={approveReason}
	//                 filterOption={(input, opt) => {
	//                   return (
	//                     opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
	//                   );
	//                 }}
	//                 showSearch
	//               >
	//                 {controlStructure.ApproveReason.dropDownValue.map(
	//                   (option) => (
	//                     <Select.Option key={option.dataValue} value={option.dataValue}>
	//                       {option.displayValue}
	//                     </Select.Option>
	//                   )
	//                 )}
	//               </Select>
	//             </Form.Item>
	//             {
	//               approveReason.approveReason ?
	//                 <Form.Item name="otherTerminateReason">
	//                   <Input
	//                     maxLength={20}

	//                     onChange={(evt) =>
	//                       handleOtherApproveReasonChange(evt)
	//                     }
	//                     size="large"
	//                     value={otherApproveReason}
	//                     placeholder={'Enter Reason'}
	//                   />
	//                 </Form.Item>
	//                 :''
	//             }
	//           </div>

	//         </Form>
	//         <div className="modal-footer">

	//           <Button
	//             className="text-only-btn"
	//             key="back"
	//             type="text"
	//             onClick={() => {
	//               cancelOperation("approve");
	//             }}
	//           >
	//             Cancel
	//           </Button>
	//           <Button
	//             className="submit-btn"
	//             key="submit"
	//             type="primary"
	//             style={{ fontSize: "28px" }}
	//             onClick={onApprove}
	//           >
	//             Approve
	//           </Button>
	//         </div>
	//       </>
	//     )
	//   };
	//   return (
	//     <CustomModal
	//       handleCancel={() => {
	//         closeModal("approve");
	//       }}
	//       handleOk={handleApproveOk}
	//       visible={showApproveModal}
	//     >
	//       {approveFailedArray === "emptyArray" ? (
	//         <ApprovalConfirmScreen />
	//       ) : approveFailedArray.length === 0 ? (
	//         <ActionSuccessModalScreen operationName="approve" />
	//       ) : (
	//         <ActionFailModalScreen
	//           errorArray={approveFailedArray}
	//           operationName="approve"
	//         />
	//       )}
	//     </CustomModal>
	//   );
	// };

	// const RenderConfirmApprovalModal = () => {
	//   const ApprovalConfirmScreen = () => (
	//     <>
	//       <div className="modal-header">
	//         <div className="header-icon">
	//           <FontAwesomeIcon icon={faFileCheck} />
	//         </div>
	//         <div className="header-title">Approval</div>
	//       </div>
	//       <div className="modal-body">
	//         Are you sure you want to approve the Client?
	//       </div>
	//       <div className="modal-footer">
	//         <Button
	//           className="text-only-btn"
	//           key="back"
	//           type="text"
	//           onClick={() => {
	//             cancelOperation("approve");
	//           }}
	//         >
	//           Cancel
	//         </Button>
	//         <Button
	//           className="submit-btn"
	//           key="submit"
	//           type="primary"
	//           style={{ fontSize: "28px" }}
	//           onClick={handleApproveOk}
	//         >
	//           Approve
	//         </Button>
	//       </div>
	//     </>
	//   );
	//   return (
	//     <CustomModal
	//       handleCancel={() => {
	//         closeModal("approve");
	//       }}
	//       handleOk={handleApproveOk}
	//       visible={showApproveModal}
	//     >
	//       {approveFailedArray === "emptyArray" ? (
	//         <ApprovalConfirmScreen />
	//       ) : approveFailedArray.length === 0 ? (
	//         <ActionSuccessModalScreen operationName="approve" />
	//       ) : (
	//         <ActionFailModalScreen
	//           errorArray={approveFailedArray}
	//           operationName="approve"
	//         />
	//       )}
	//     </CustomModal>
	//   );
	// };
	// const RenderConfirmRejectModal = () => {
	//   const RejectConfirmScreen = () => (
	//     <>
	//       <div className="modal-header">
	//         <div className="header-icon">
	//           <FontAwesomeIcon icon={faFileExcel} />
	//         </div>
	//         <div className="header-title">Reject</div>
	//       </div>
	//       <div className="modal-body">Do you want to reject Client?</div>
	//       <div className="modal-footer">
	//         <Button
	//           className="text-only-btn"
	//           key="back"
	//           type="text"
	//           onClick={() => {
	//             cancelOperation("reject");
	//           }}
	//         >
	//           Cancel
	//         </Button>
	//         <Button
	//           className="submit-btn"
	//           key="submit"
	//           type="primary"
	//           style={{ fontSize: "28px" }}
	//           onClick={handleRejectOk}
	//         >
	//           Reject
	//         </Button>
	//       </div>
	//     </>
	//   );
	//   return (
	//     <CustomModal
	//       handleCancel={() => {
	//         closeModal("reject");
	//       }}
	//       handleOk={handleRejectOk}
	//       visible={showRejectModal}
	//     >
	//       {rejectFailedArray === "emptyArray" ? (
	//         <RejectConfirmScreen />
	//       ) : rejectFailedArray.length === 0 ? (
	//         <ActionSuccessModalScreen operationName="reject" />
	//       ) : (
	//         <ActionFailModalScreen
	//           errorArray={rejectFailedArray}
	//           operationName="reject"
	//         />
	//       )}
	//     </CustomModal>
	//   );
	// };

	const RenderConfirmRejectModal = () => {
		const RejectConfirmScreen = () => {
			const [rejectReason, setRejectReason] = useState('');
			const [otherRejectReason, setOtherRejectReason] = useState('');
			const [required, setRequired] = useState(false);
			const handleRejectReasonChange = (key, value) => {
				setRequired(false);
				setRejectReason({ [key]: value });
				setOtherRejectReason('');
			};
			const handleOtherRejectReasonChange = (e) => {
				if (rejectReason.rejectReason) {
					setOtherRejectReason(e.target.value);
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
							handleRejectOk(rejectFormData);
						} else {
							setRequired(true);
						}
					} else {
						setRequired(false);
						handleRejectOk(rejectFormData);
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
						Are you sure you want to reject the client
						{/* {selectedRowKeys.length > 1
              ? ` ${selectedRowKeys.length} `
              : selectedRowKeys.length === 1 && " "}
           
            Client{selectedRowKeys.length > 1 ? "s" : " "}? */}
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
						{/* <Button
							className='text-only-btn'
							key='back'
							type='text'
							onClick={() => {
								cancelOperation('reject');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn'
							key='submit'
							type='primary'
							style={{ fontSize: '28px' }}
							onClick={onReject}
						>
							Reject
						</Button> */}
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

	// const RenderConfirmRejectModal = () => {
	//   const RejectConfirmScreen = () => {
	//     const [rejectReason, setRejectReason] = useState('')
	//     const [otherRejectReason, setOtherRejectReason] = useState('')
	//     const handleRejectReasonChange = (key, value) => {
	//       // setRequired(false);
	//       setRejectReason({ [key]: value });
	//     };
	//     const handleOtherRejectReasonChange = (e) => {
	//       if (rejectReason.rejectReason) {

	//         setOtherRejectReason(e.target.value);
	//       }
	//     };
	//     const onReject = () => {
	//       if (rejectReason.rejectReason) {
	//         handleRejectOk(rejectReason.rejectReason);
	//       }

	//       else {
	//         handleRejectOk(rejectReason.rejectReason);
	//       }

	//     }
	//     return (
	//       <>
	//         <div className="modal-header">
	//           <div className="header-icon">
	//             <FontAwesomeIcon icon={faFileExcel} />
	//           </div>
	//           <div className="header-title">Reject</div>
	//         </div>
	//         <div className="modal-body">
	//         Are you sure you want to reject the client
	//         </div>
	//         <Form
	//           name="assign-leads-form"
	//           className="assign-leads-form">

	//           <div id="rejectReason" className="field-section" style={{ marginTop: "1rem" }}>
	//             <label className="field-label" htmlFor="rejectReason">
	//               Reason
	//             </label>
	//             <Form.Item name="rejectReason">
	//               <Select
	//                 size="large"
	//                 mode="single"
	//                 placeholder="Select Reason"
	//                 onChange={value => handleRejectReasonChange('rejectReason', value)}
	//                 value={rejectReason}
	//                 filterOption={(input, opt) => {
	//                   return (
	//                     opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
	//                   );
	//                 }}
	//                 showSearch
	//               >
	//                 {controlStructure.RejectReason.dropDownValue.map(
	//                   (option) => (
	//                     <Select.Option key={option.dataValue} value={option.dataValue}>
	//                       {option.displayValue}
	//                     </Select.Option>
	//                   )
	//                 )}
	//               </Select>
	//             </Form.Item>
	//             {

	//               rejectReason.rejectReason ?
	//                 <Form.Item name="otherRejectReason">

	//                   <Input
	//                     maxLength={20}

	//                     onChange={(evt) =>
	//                       handleOtherRejectReasonChange(evt)
	//                     }
	//                     size="large"
	//                     value={otherRejectReason}
	//                     placeholder={'Enter Reason'}

	//                   />

	//                 </Form.Item>

	//                 :

	//                 ''
	//             }
	//           </div>

	//         </Form>
	//         <div className="modal-footer">
	//           <Button
	//             className="text-only-btn"
	//             key="back"
	//             type="text"
	//             onClick={() => {
	//               cancelOperation("reject");
	//             }}
	//           >
	//             Cancel
	//           </Button>
	//           <Button
	//             className="submit-btn"
	//             key="submit"
	//             type="primary"
	//             style={{ fontSize: "28px" }}
	//             onClick={onReject}
	//           >
	//             Reject
	//           </Button>
	//         </div>
	//       </>
	//     )
	//   };
	//   return (
	//     <CustomModal
	//       handleCancel={() => {
	//         closeModal("reject");
	//       }}
	//       handleOk={handleRejectOk}
	//       visible={showRejectModal}
	//     >
	//       {rejectFailedArray === "emptyArray" ? (
	//         <RejectConfirmScreen />
	//       ) : rejectFailedArray.length === 0 ? (
	//         <ActionSuccessModalScreen operationName="reject" />
	//       ) : (
	//         <ActionFailModalScreen
	//           errorArray={rejectFailedArray}
	//           operationName="reject"
	//         />
	//       )}
	//     </CustomModal>
	//   );
	// };

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
							history.push('/dashboard/MyCustomer/Onboarding');
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
							<div className='title'>0/1 Successful Action</div>
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
						{allCustomerOnboardingData.clientId == errObject.refID && (
							<strong key={allCustomerOnboardingData.clientId}>
								{allCustomerOnboardingData.fullName}
							</strong>
						)}
					</div>
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

	const history = useHistory();
	const path = useRouteMatch();

	return (
		<>
			<RenderConfirmEndorseModal />
			<RenderConfirmApprovalModal />
			<RenderConfirmRejectModal />
			<RenderTerminateModal />
			<Card
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					borderBottomRightRadius: '12px',
					borderBottomLeftRadius: '12px'
				}}
			>
				<Row>
					<Col style={{ width: '75%' }}>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className='opportunityViewTopBarIcons'
							size='15x'
							onClick={() => history.push('/dashboard/MyCustomer/Onboarding')}
						/>
					</Col>

					<Col>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.endorse) && (
							<Tooltip title=''>
								<FontAwesomeIcon
									icon={faUserCheck}
									onClick={() => setShowEndorseModal(true)}
									className='opportunityViewTopBarIcons'
								/>
							</Tooltip>
						)}
						{allCustomerOnboardingData?.workFlowFormType === 'ApproveReject' &&
							// allCustomerOnboardingData?.workFlowUserGroup === authData &&
							allCustomerOnboardingData?.workFlowUserGroup?.includes(authData) &&
							authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approve) && (
								<Tooltip title='Approve'>
									<FontAwesomeIcon
										icon={faFileCheck}
										onClick={() => setShowApproveModal(true)}
										className='opportunityViewTopBarIcons'
									/>
								</Tooltip>
							)}

						{allCustomerOnboardingData?.workFlowFormType === 'ApproveReject' &&
							// allCustomerOnboardingData?.workFlowUserGroup === authData &&
							allCustomerOnboardingData?.workFlowUserGroup?.includes(authData) &&
							// authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) && (
							authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approveReject) && (
								<Tooltip title='Reject'>
									<FontAwesomeIcon
										icon={faFileTimes}
										onClick={() => setShowRejectModal(true)}
										className='opportunityViewTopBarIcons'
									/>
								</Tooltip>
							)}
						{/* {
              authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) &&
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => setShowDeleteModal(true)}
                className="opportunityViewTopBarIcons"
              />
            } */}
						{allCustomerOnboardingData?.workFlowFormType === 'Modificaiton' &&
							// allCustomerOnboardingData?.workFlowUserGroup === authData && (
							allCustomerOnboardingData?.workFlowUserGroup?.includes(authData) && (
								<FontAwesomeIcon
									icon={faStopCircle}
									className='opportunityViewTopBarIcons'
									onClick={() => setShowTerminateModal(true)}
								/>
							)}
						{allCustomerOnboardingData?.workFlowFormType === 'Modificaiton' &&
							// allCustomerOnboardingData?.workFlowUserGroup === authData && (
							allCustomerOnboardingData?.workFlowUserGroup?.includes(authData) && (
								<FontAwesomeIcon
									icon={faEdit}
									onClick={goToEdit}
									className='opportunityViewTopBarIcons'
								/>
							)}
						<FontAwesomeIcon
							icon={faChevronLeft}
							onClick={() => handlePreviousClick()}
							className='opportunityViewTopBarIcons'
						/>
						<FontAwesomeIcon
							icon={faChevronRight}
							onClick={() => handleNextClick()}
							className='opportunityViewTopBarIcons'
						/>
					</Col>
				</Row>
				<Row justify='space-between' align='bottom'>
					<Col span={11}>
						{allCustomerOnboardingData && (
							<Row align='bottom' style={{ padding: '5px 0px' }}>
								<Col className='gutter-row' align='middle' span={9}>
									{allCustomerOnboardingData?.profileImage != null ? (
										<div style={{ width: '85%', height: 'auto' }}>
											<img
												src={`data:image/jpeg;base64,${allCustomerOnboardingData?.profileImage}`}
												className='opportunityCircleImg'
												alt='user-img'
											/>
										</div>
									) : (
										<div className='opportunityInitialsCircleImg'>
											{allCustomerOnboardingData?.profileInitial}
										</div>
									)}
								</Col>
								<Col className='gutter-row' span={12}>
									<Row>
										<Title
											level={3}
											style={{ color: '#FFF', margin: 0 }}
											className='opportunityName'
										>
											{allCustomerOnboardingData?.firstName} {allCustomerOnboardingData?.secondName}{' '}
											{allCustomerOnboardingData?.thirdName}
										</Title>
									</Row>

									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<FontAwesomeIcon
											icon={faMapMarkerAlt}
											className='opportuntiyViewHeaderDetailIcon'
										/>
										<p className='opportunityDescriptionText' style={styleSet.container}>
											{allCustomerOnboardingData?.mailAdd1},
											{allCustomerOnboardingData?.permCityName}
										</p>
									</Row>
									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<div className='opportunityTag'>
											{allCustomerOnboardingData?.legalStatusName}
										</div>
									</Row>
									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<FontAwesomeIcon
											icon={faPhoneAlt}
											className='opportuntiyViewHeaderDetailIcon'
										/>
										<p className='opportunityDescriptionText' style={styleSet.container}>
											{allCustomerOnboardingData?.dialCode}
										</p>{' '}
										&nbsp;
										<p className='opportunityDescriptionText' style={styleSet.container}>
											{allCustomerOnboardingData?.mobileNo}
										</p>
									</Row>
									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<FontAwesomeIcon
											icon={faEnvelope}
											className='opportuntiyViewHeaderDetailIcon'
										/>
										<p className='opportunityDescriptionText' style={styleSet.container}>
											{allCustomerOnboardingData?.eMail}
										</p>
									</Row>
								</Col>
							</Row>
						)}
					</Col>

					<Col span={13}>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={12} className='opportunityDetailText' style={styleSet.container}>
									<strong>
										{allCustomerOnboardingData && allCustomerOnboardingData?.customerTypeName
											? allCustomerOnboardingData?.customerTypeName
											: ''}
									</strong>
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Type
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{/* <strong>
                    {allWorkflowStatusData
                      ? allWorkflowStatusData[allWorkflowStatusData.length - 1]
                        .stageName
                      : ""}
                  </strong> */}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Status
								</Row>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									<TextSubText
										flag={
											allCustomerOnboardingData?.nationality
												? allCustomerOnboardingData?.nationality
												: null
										}
										iconNext={
											<h1
												style={{
													marginTop: '10px',
													color: 'white',
													fontSize: '20px'
												}}
											>
												{/* {allCustomerOnboardingData?.nationalityName} */}
												{allCustomerOnboardingData?.permCountryName}
											</h1>
										}
									/>
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									{allCustomerOnboardingData?.customerType === 'C' ? 'Domicile' : 'Nationality'}
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									<strong>
										{allCustomerOnboardingData && allCustomerOnboardingData?.taxStatusName
											? allCustomerOnboardingData?.taxStatusName
											: ''}
									</strong>
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Tax Status
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									<strong>
										{allRiskProfileData && allRiskProfileData?.recommendedCategoryCodeName
											? allRiskProfileData?.recommendedCategoryCodeName
											: ''}
										{/* {allCustomerOnboardingData?.sophisticatedYn!=null?' -'+allCustomerOnboardingData?.sophisticatedYn:''} */}
										{allCustomerOnboardingData?.sophisticatedYn === 'Y'
											? ' - Sophisticated'
											: ' - Non Sophisticated'}
									</strong>
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Agreed Risk Profile
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Card>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		authData: state.auth.user.userRole,
		customerOnboardingListingCs: state.customerOnboardingListing.controlStructure,
		allCustomerListingOnboardingData:
			state.customerOnboardingListing &&
			state.customerOnboardingListing.allCustomerOnboarding &&
			state.customerOnboardingListing.allCustomerOnboarding.lstOnboardingResponse
	};
};

const mapDispatchToProps = {
	executeGetCustomerOnboardingListingCs,
	executeGetAllCustomerOnboardingData
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBannerList);

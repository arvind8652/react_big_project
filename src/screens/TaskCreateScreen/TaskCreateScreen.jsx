import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './TaskCreateScreen.scss';
import moment from 'moment';
import AttachmentFormCard from '../../components/Forms/AttachmentFormCard/AttachmentFormCard';
import { Form, Button, Alert, Space } from 'antd';
import { CONSTANTS } from '../../constants/constants';
import { connect } from 'react-redux';
import { createValidators, generateCsObject, getBase64 } from '../../utils/utils';
import MiscellaneousFormCard from '../../components/Forms/MiscellaneousFormCard/MiscellaneousFormCard';
import {
	getTaskViewApi,
	getTaskAttachmentDetailApi,
	getTaskMiscellaneousDetailApi
} from '../../api/taskViewApi';
import { executeGetTaskCreateCs } from '../../redux/actions/taskCreateActions';
// import { postCompOpportunityApi } from "../../api/opportunityCreateApi";
import { postInteractionApi } from '../../api/interactionCreateApi';
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import ClientProspectCard from './ClientProspectCard';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Modal from 'antd/lib/modal/Modal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import axios from 'axios';
import OccurenceForm from './OccurenceForm';
import TaskDetailCard from './TaskDetailCard';
// import EditOccurenceForm from "../InteractionCreateScreen/editOccurrenceForm";
import EditOccurence from './EditOccurence';
import BackToTop from '../../components/BackToTop/BackToTop';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';

const TaskCreateScreen = (props) => {
	const [invitee, setInvitee] = useState([]);
	const { user, cs } = props;
	const [form] = Form.useForm();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [requiredFiled, setRequiredFiled] = useState(false);
	const [errorArray, setErrorArray] = useState();
	const [isMultiOcurrance, setIsMultiOccurence] = useState(false);
	const [relationDetail, setRelationDetail] = useState();
	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);
	const history = useHistory();
	const location = useLocation();
	let screen;
	let data;
	let mode;
	let taskIds;
	let rowIndex;
	let id;
	if (location?.state) {
		screen = location.state.screen;
		data = location.state.data;
		mode = location.state.mode;
		taskIds = location.state.taskIds;
		rowIndex = location.state.rowIndex;
		id = location?.state?.data?.id;
	}
	useEffect(() => {
		executeGetTaskCreateCs();
	}, []);
	let rules = [];
	let csObject = [];
	cs &&
		cs !== '' &&
		cs.length > 0 &&
		cs.forEach((s, index) => {
			rules[index] = createValidators(s.controlStructureField, form);
			csObject[index] = generateCsObject(s.controlStructureField);
		});
	const getExistingAttachments = () => {
		if (screen === 'view') {
			if (data && data.attachments && Array.isArray(data.attachments)) return data.attachments;
		} else if (screen === 'list') {
			if (editingData && editingData.attachments && Array.isArray(editingData.attachments))
				return editingData.attachments;
		}
		return [];
	};

	const datePreprocessing = () => {
		for (let i = 0; i < taskFormData.RelationDetail?.length; i++) {
			if (taskFormData.RelationDetail[i].startDate === undefined)
				taskFormData.RelationDetail[i].startDate = moment(new Date(), 'DD-MM-YYYY');
			if (taskFormData.RelationDetail[i].endDate === undefined)
				taskFormData.RelationDetail[i].endDate = moment(new Date(), 'DD-MM-YYYY');
		}
	};
	const handleFormSubmit = () => {
		datePreprocessing();
		form
			.validateFields()
			.then((res) => {
				postInteractionApi(
					taskFormData,
					'TASKADD',
					invitee,
					isMultiOcurrance,
					mode,
					[relationDetail],
					user?.userID
				).then((res) => {
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
				});
			})
			.catch((err) => {
				console.log('Got validation errror', err);
				setRequiredFiled(true);
			});
	};
	const onAlertClose = () => {
		setRequiredFiled(false);
	};
	const forInviteOnChange = (data) => {
		const ObjectInvite = [];
		data?.forEach(({ refID, refType, prog_name }) => {
			ObjectInvite.push({
				RefID: refID,
				RefType: refType,
				prog_name: prog_name
			});
		});
		setInvitee(ObjectInvite);
	};
	const [taskFormData, setTaskFormData] = useState({});
	const handleTaskFormData = () => {
		if (mode === 'create' || screen === 'task-list') {
			setTaskFormData({
				taskId: data?.activityID ? data?.activityID : null,
				// prospectType: data && data.refType ? data.refType : 'PROSPECTADD',
				prospectType:
					location?.state?.refType === 'CLIENTADD'
						? 'CLIENTADD'
						: data && data.refType
						? data.refType
						: 'PROSPECTADD',
				activityNature: 'T',
				relationshipManager:
					data?.relationshipManager || data?.custRelMgr
						? data?.relationshipManager || data?.custRelMgr
						: undefined,
				branch: data?.branch ? data?.branch : undefined,
				screenName: screen,
				// refID: data?.refID || data?.prospectId ? data?.refID || data?.prospectId : undefined,
				refID:
					data?.customerCode || data?.clientId || data?.refID || data?.prospectId
						? data?.customerCode || data?.clientId || data?.refID || data?.prospectId
						: undefined,
				status: data && data.isOpen ? data.isOpen : 'OPEN',
				stage: data && data.stageData_Value ? data.stageData_Value : undefined,
				probability: data && data.probability ? data.probability : undefined,
				startDate:
					data && data.creationDate
						? moment.utc(data.creationDate)
						: (cs &&
								cs.length > 0 &&
								cs[1].controlStructureField
									.map((item) => {
										if (item.keyField === 'CreationDate') {
											return item.defaultvalue && moment.utc(item.defaultvalue, 'DD-MM-YYYY');
										}
										return undefined;
									})
									.filter((item) => item !== undefined)[0]) ||
						  undefined,
				expectedDate: data && data.dueDate ? moment.utc(data.dueDate, 'DD-MM-YYYY') : undefined,
				targetAmount:
					data && data.isOpen === 'OPEN' && data.targetAmount ? data.targetAmount : undefined,
				opportunityName: data && data && data.opportunityName ? data.opportunityName : undefined,
				opportunityType:
					data && data && data.opportunityTypeData_Value
						? data.opportunityTypeData_Value
						: undefined,
				productOrService: data && data && data.productOrService ? data.productOrService : undefined,
				closureAmount:
					data && data && data.isOpen === 'CLOSED' && data.amount ? data.amount : undefined,
				closeDate: data && data.closeDate ? moment.utc(data.closeDate, 'DD-MM-YYYY') : undefined,
				closeReason: data && data.closeReason ? data.closeReason : undefined,
				preferredCurrency: data && data.preferredCurrency ? data.preferredCurrency : undefined,
				remark: data && data.remark ? data.remark : undefined,
				attachments: data && data.attachments ? data.attachments : [],
				fileList: [],
				miscellaneous: []
			});
		} else {
			setTaskFormData({
				taskId: data && data.opportunityId ? data.opportunityId : null,
				prospectType: data && data.refType ? data.refType : 'PROSPECTADD',
				activityNature: 'T',
				relationshipManager:
					data && data && data.relationshipManagerData_Value
						? data.relationshipManagerData_Value
						: undefined,
				branch: data && data.branch ? data.branch : undefined,
				refID: data && data.refID ? data.refID : undefined,
				status: data && data.isOpen ? data.isOpen : 'OPEN',
				stage: data && data.stageData_Value ? data.stageData_Value : undefined,
				probability: data && data.probability ? data.probability : undefined,
				startDate:
					data && data.creationDate
						? moment.utc(data.creationDate)
						: (cs &&
								cs.length > 0 &&
								cs[1].controlStructureField
									.map((item) => {
										if (item.keyField === 'CreationDate') {
											return item.defaultvalue && moment.utc(item.defaultvalue, 'DD-MM-YYYY');
										}
										return undefined;
									})
									.filter((item) => item !== undefined)[0]) ||
						  undefined,
				expectedDate: data && data.dueDate ? moment.utc(data.dueDate, 'DD-MM-YYYY') : undefined,
				targetAmount:
					data && data.isOpen === 'OPEN' && data.targetAmount ? data.targetAmount : undefined,
				opportunityName: data && data && data.opportunityName ? data.opportunityName : undefined,
				opportunityType:
					data && data && data.opportunityTypeData_Value
						? data.opportunityTypeData_Value
						: undefined,
				productOrService: data && data && data.productOrService ? data.productOrService : undefined,
				closureAmount:
					data && data && data.isOpen === 'CLOSED' && data.amount ? data.amount : undefined,
				closeDate: data && data.closeDate ? moment.utc(data.closeDate, 'DD-MM-YYYY') : undefined,
				closeReason: data && data.closeReason ? data.closeReason : undefined,
				preferredCurrency: data && data.preferredCurrency ? data.preferredCurrency : undefined,
				remark: data && data.remark ? data.remark : undefined,
				attachments: data && data.attachments ? data.attachments : [],
				fileList: [],
				miscellaneous: []
			});
		}
		setAttachmentsModalDataArray(data?.attachments ? data.attachments : []);
	};
	useEffect(() => {
		handleTaskFormData();
	}, [cs, location?.state]);
	const [editingData, setEditingData] = useState();

	useEffect(() => {
		if (screen === 'list' && mode === 'edit' && data && data?.activityID) {
			axios
				.all([
					getTaskViewApi(
						data.followUpId ? data.followUpId : data.followUpID,
						data.id,
						data.activityID,
						isMultiOcurrance
					),
					getTaskAttachmentDetailApi(data.activityID),
					getTaskMiscellaneousDetailApi(data.activityID)
				])
				.then(
					axios.spread((...responses) => {
						responses[0].data &&
							responses[1].data &&
							responses[2].data &&
							setEditingData({
								...responses[0].data,
								attachments: responses[1].data,
								miscellaneous: responses[2].data.miscellaneous,
								fileList: []
							});
					})
				);
		}
	}, [screen, mode, location?.state, data, isMultiOcurrance]);

	useEffect(() => {
		taskFormData && form.setFieldsValue(taskFormData);
	}, [taskFormData, form]);

	useEffect(() => {
		if (screen && data) {
			if (screen === 'view') {
				data &&
					setTaskFormData({
						opportunityId: data.opportunityId ? data.opportunityId : null,
						prospectType: data.refType ? data.refType : 'PROSPECTADD',
						relationshipManager: data.relationshipManagerData_Value
							? data.relationshipManagerData_Value
							: undefined,
						branch: data.branch ? data.branch : undefined,
						refID: data && data.refID ? data.refID : undefined,
						status: data.isOpen && data.isOpen ? data.isOpen : 'OPEN',
						stage: data.stageData_Value ? data.stageData_Value : undefined,
						closeStage: data.isOpen === 'CLOSED' ? data.stageData_Value : undefined,
						probability: data.probability ? data.probability : undefined,
						startDate: data.creationDate ? moment.utc(data.creationDate) : undefined,
						expectedDate: data.dueDate ? moment.utc(data.dueDate) : undefined,
						targetAmount:
							data && data.isOpen === 'OPEN' && data.targetAmount ? data.targetAmount : undefined,
						opportunityName: data.opportunityName ? data.opportunityName : undefined,
						opportunityType: data.opportunityTypeData_Value
							? data.opportunityTypeData_Value
							: undefined,
						productOrService: data.productOrServiceData_Value
							? data.productOrServiceData_Value
							: undefined,
						closureAmount: data.isOpen === 'CLOSED' && data.amount ? data.amount : undefined,
						closeDate: data.closeDate ? moment.utc(data.closeDate, 'DD-MM-YYYY') : undefined,
						closeReason: data.closeReasonData_Value ? data.closeReasonData_Value : undefined,
						preferredCurrency: data.preferredCurrency ? data.preferredCurrency : undefined,
						remark: data.remark ? data.remark : undefined,
						attachments: data && data.attachments ? data.attachments : [],
						fileList: [],
						miscellaneous: undefined
					});
				setAttachmentsModalDataArray(data?.attachments ? data.attachments : []);
			} else if (screen === 'list') {
				if (mode === 'edit' && editingData) {
					setIsMultiOccurence(location?.state?.singleOrMultiple === 1 ? false : true);
					forInviteOnChange(editingData.taskScheduler?.followuplist[0]?.inviteeadd);
					// setInvitee(editingData.taskScheduler.followuplist[0].inviteeadd);

					setTaskFormData({
						remark: editingData.taskScheduler.description
							? editingData.taskScheduler.description
							: null,
						inviteeadd: editingData.taskScheduler.inviteeadd
							? editingData.taskScheduler.inviteeadd
							: undefined,
						activityID: editingData.taskScheduler.activityID
							? editingData.taskScheduler.activityID
							: undefined,
						interactionType: editingData.taskScheduler.interactionType
							? editingData.taskScheduler.interactionType
							: undefined,
						subject: editingData.taskScheduler.subject
							? editingData.taskScheduler.subject
							: undefined,
						opportunity: editingData.taskScheduler.opportunity
							? editingData.taskScheduler.opportunity
							: null,
						prospectType: editingData.taskScheduler.refType
							? editingData.taskScheduler.refType
							: 'PROSPECTADD',
						relationshipManager: editingData.taskScheduler.relationshipManager
							? editingData.taskScheduler.relationshipManager
							: undefined,
						branch: editingData.taskScheduler.branch ? editingData.taskScheduler.branch : undefined,
						refID: editingData.taskScheduler.refID ? editingData.taskScheduler.refID : undefined,
						expectedDate:
							editingData.dueDate && editingData.dueDate
								? moment.utc(editingData.dueDate)
								: undefined,
						targetAmount:
							editingData && editingData.isOpen === 'OPEN' && editingData.targetAmount
								? editingData.targetAmount
								: undefined,
						opportunityName: editingData.taskScheduler.opportunityName
							? editingData.taskScheduler.opportunityName
							: undefined,
						opportunityType: editingData.opportunityTypeData_Value
							? editingData.opportunityTypeData_Value
							: undefined,
						productOrService: editingData.productOrServiceData_Value
							? editingData.productOrServiceData_Value
							: undefined,
						purpose: editingData.taskScheduler.activityPurpose
							? editingData.taskScheduler.activityPurpose
							: undefined,
						priority: editingData.taskScheduler.priority
							? editingData.taskScheduler.priority
							: undefined,
						closureAmount:
							editingData.isOpen === 'CLOSED' && editingData.amount
								? editingData.amount
								: undefined,
						closeDate:
							editingData.closeDate & editingData.closeDate
								? moment.utc(editingData.closeDate)
								: undefined,
						closeReason: editingData.closeReasonData_Value
							? editingData.closeReasonData_Value
							: undefined,
						preferredCurrency: editingData.preferredCurrency
							? editingData.preferredCurrency
							: undefined,
						// remark: editingData.remark ? editingData.remark : undefined,
						attachments:
							editingData.attachments &&
							Array.isArray(editingData.attachments) &&
							editingData.attachments.length > 0
								? editingData.attachments
								: [],
						fileList: [],
						stage:
							editingData.isOpen && editingData.isOpen === 'OPEN'
								? editingData.stageData_Value
								: undefined,
						closeStage: editingData.isOpen === 'CLOSED' ? editingData.stageData_Value : undefined,
						probability: editingData.probability ? editingData.probability : undefined,
						RelationDetail: editingData.taskScheduler.followuplist
							? editingData.taskScheduler.followuplist
							: null,
						// startDate: editingData.taskScheduler.followuplist[0].startDate
						//   ? moment(editingData.taskScheduler.followuplist[0].startDate)
						//   : null,
						// FollowUpActivityStatus: editingData.taskScheduler?.followuplist[0].followUpActivityStatusName
						//   ? editingData.taskScheduler.followuplist[0].followUpActivityStatusName
						//   : undefined,
						// InteractionType: editingData.taskScheduler?.followuplist[0].interactionTypeName
						//   ? editingData.taskScheduler.followuplist[0].interactionTypeName
						//   : undefined,
						// EndDate: editingData.taskScheduler.followuplist[0].endDate
						//   ? moment(editingData.taskScheduler.followuplist[0].endDate)
						//   : null,
						miscellaneous: editingData.miscellaneous ? editingData.miscellaneous : null,
						activityNature: 'T'
						// startTime: editingData.taskScheduler.followuplist[0].startTime
						//   ? moment(editingData.taskScheduler.followuplist[0].startTime)
						//   : null,
						// endTime: editingData.taskScheduler.followuplist[0].endTime
						//   ? moment(editingData.taskScheduler.followuplist[0].endTime)
						//   : null,
						// occurrence: editingData.taskScheduler.followuplist[0].occurrence
						//   ? editingData.taskScheduler.followuplist[0].occurrence
						//   : 1,
						// isAllDay: editingData.taskScheduler.followuplist[0].isAllDay
						//   ? editingData.taskScheduler.followuplist[0].isAllDay
						//   : false,
						// reminder: editingData.taskScheduler.followuplist[0].reminder
						//   ? editingData.taskScheduler.followuplist[0].reminder
						//   : "None",
						// frequency: editingData.taskScheduler.followuplist[0].frequencyName
						//   ? editingData.taskScheduler.followuplist[0].frequencyName
						//   : "None",
					});
					setAttachmentsModalDataArray(editingData?.attachments ? editingData.attachments : []);
				} else if (mode === 'create') {
					axios.all([getTaskViewApi(data.activityID, id), getTaskAttachmentDetailApi(data)]).then(
						axios.spread((...responses) => {
							responses[0].data &&
								responses[1].data &&
								editingData === undefined &&
								setEditingData({
									...responses[0].data,
									attachments: responses[1].data,
									fileList: []
								});
							setAttachmentsModalDataArray(responses[1].data ? responses[1].data : []);
						})
					);
					editingData &&
						setTaskFormData({
							prospectType: editingData && editingData.refType ? editingData.refType : undefined,
							status: editingData.isOpen === 'OPEN' ? 'OPEN' : 'CLOSE',
							// stage:
							//   editingData.isOpen === "CLOSED"
							//     ? editingData.stageData_Value
							//     : undefined,
							refID: editingData && editingData.refID ? editingData.refID : undefined,
							relationshipManager:
								editingData && editingData.relationshipManagerData_Value
									? editingData.relationshipManagerData_Value
									: undefined,
							branch: editingData && editingData.branch ? editingData.branch : undefined,
							preferredCurrency:
								editingData && editingData.preferredCurrency
									? editingData.preferredCurrency
									: undefined
						});
				}
			}
		}
	}, [form, editingData, cs]);

	const setAttachments = (attachments, fileList) => {
		setTaskFormData({
			...taskFormData,
			attachments: attachments,
			fileList: fileList
		});
		// }
	};
	const removeAttachment = (fileName) => {
		if (Array.isArray(taskFormData.attachments)) {
			setTaskFormData({
				...taskFormData,
				attachments: taskFormData.attachments.filter((item) => item.fileName !== fileName),
				fileList: taskFormData.fileList.filter((item) => item.name !== fileName)
			});
		}
	};

	const handleTaskFormChange = (values) => {
		if (!values.attachments) {
			setTaskFormData({
				...taskFormData,
				...values
			});
		}

		if (values.attachments && values.attachments.length > 0) {
			let attachmentsModalData = [];
			values.attachments.map((file) => {
				attachmentsModalData = [
					...attachmentsModalData,
					{
						fileDescription: 'Attachments',
						fileName: file.fileName,
						fileSize: file.fileSize,
						mimeType: file.mimeType,
						fileString: file.fileString,
						attachmentFor: 'Attachments',
						attachedBy: user && user.userName,
						sessionId: file.sessionId
					}
				];
			});
			let finalAttachmentsModalData = [...attachmentsModalDataArray];
			if (values?.operation && values?.operation === 'delete') {
				finalAttachmentsModalData = [];
			}
			attachmentsModalData.forEach((file) => {
				finalAttachmentsModalData = [...finalAttachmentsModalData, file];
			});
			setAttachmentsModalDataArray(finalAttachmentsModalData ? finalAttachmentsModalData : []);
		}
		if (
			values?.operation &&
			values?.operation === 'delete' &&
			values?.attachments &&
			values?.attachments?.length === 0
		) {
			setAttachmentsModalDataArray([]);
		}

		// if (values.attachments && values.attachments.fileList) {
		// 	if (values.attachments.file.status === 'removed') {
		// 		setTaskFormData({
		// 			...taskFormData,
		// 			attachments: taskFormData.attachments.filter(
		// 				(item) => item.fileName !== values.attachments.file.name
		// 			)
		// 		});
		// 	} else if (
		// 		Array.isArray(values.attachments.fileList) &&
		// 		values.attachments.fileList.length > 0
		// 	) {
		// 		let attachments = [];
		// 		values.attachments.fileList.forEach((file) => {
		// 			if (file.size / 1024 / 1024 <= 1) {
		// 				getBase64(file.originFileObj, (imageUrl) => {
		// 					// if (Array.isArray(attachments)) {

		// 					attachments = [
		// 						...attachments,
		// 						...getExistingAttachments(),
		// 						{
		// 							refType: null,
		// 							refId: null,
		// 							fileDescription: 'Attachments',
		// 							fileName: file.originFileObj.name,
		// 							fileSize: (file.originFileObj.size / 1024).toString() + 'KB',
		// 							mimeType: file.originFileObj.type,
		// 							fileString: imageUrl && imageUrl.split(',')[1],
		// 							attachmentFor: 'Attachments',
		// 							attachedBy: user && user.userName,
		// 							sessionId: ''
		// 						}
		// 					];
		// 					setAttachments(attachments, values.attachments.fileList);
		// 				});
		// 			}
		// 		});
		// 	}
		// }
	};

	useEffect(() => {
		setTaskFormData({ ...taskFormData, attachments: attachmentsModalDataArray });
	}, [attachmentsModalDataArray]);

	return (
		<div className='opp-create-container'>
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							history.goBack();
						}}
					>
						OK
					</Button>
				}
				// onOk={() => {
				//   setShowSuccessModal(false);
				//   history.goBack();
				// }}
				centered
			>
				<SuccessModal message='Action Completed Successfully' />
			</Modal>
			<FailModal
				visible={showFailModal}
				onOk={() => {
					setShowFailModal(false);
				}}
				onCancel={() => {
					setShowFailModal(false);
				}}
				errorArray={errorArray}
			/>
			<DashboardScreenTopbar
				screenText={mode && mode === 'edit' ? 'Edit Task' : 'Create Task'}
				breadCrumb=''
				cancelBtnText='Cancel'
				submitBtnText='Save'
				onSubmit={handleFormSubmit}
				onCancel={() => {
					if (screen === 'view') {
						const toObject = {
							pathname: `/dashboard/MyTask/TaskView`,
							state: {
								leadId: taskFormData.leadId,
								taskIds: taskIds,
								rowIndex: rowIndex
							}
						};
						history.push(toObject);
					} else {
						history.goBack();
					}
				}}
			/>

			<Space direction='vertical' size={16} className='parent-form-container'>
				{requiredFiled ? (
					<Alert
						message='Error'
						description={CONSTANTS.requiredFieldGenericMessage}
						type='error'
						closable
						onClose={setTimeout(() => {
							onAlertClose();
						}, 5000)}
					/>
				) : (
					''
				)}
				{/* <div className='parent-form-container'> */}
				<ClientProspectCard
					form={form}
					editData={data}
					formData={taskFormData}
					onValuesChange={handleTaskFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					mode={mode}
					screen={screen}
					// loading={() => setLoading}
				/>
				<TaskDetailCard
					form={form}
					formData={taskFormData}
					onValuesChange={handleTaskFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					setFormData={setTaskFormData}
					singleOrMultiple={location?.state?.singleOrMultiple}
					mode={mode}
				/>
				{/* <OccurenceForm
          onValuesChange={handleTaskFormChange}
          form={form}
          formData={taskFormData}
          csObject={csObject[0]}
          rules={rules.length > 0 ? rules[1] : undefined}
          ExistingData={location?.state?.data}
        /> */}
				{location.state?.mode === 'edit' ? (
					<EditOccurence
						onValuesChange={(data) => handleTaskFormChange(data)}
						form={form}
						formData={taskFormData}
						csObject={csObject[1]}
						controlstruct={csObject[0]}
						rules={rules.length > 0 ? rules[1] : undefined}
						singleOrMultiple={location?.state?.singleOrMultiple}
						setInvitee={setInvitee}
						relationDetail={relationDetail}
						setRelationDetail={setRelationDetail}
					/>
				) : (
					<OccurenceForm
						onValuesChange={handleTaskFormChange}
						form={form}
						formData={taskFormData}
						csObject={csObject[1]}
						controlstruct={csObject[0]}
						rules={rules.length > 0 ? rules[1] : undefined}
						setInvitee={setInvitee}
					/>
				)}
				{/* <AttachmentFormCard
					form={form}
					formData={taskFormData}
					onValuesChange={handleTaskFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					removeAttachment={removeAttachment}
					csObject={csObject[0]}
					controlstruct={csObject[0]}
					id={taskFormData.taskId}
				/> */}

				<AttachmentUploadModal
					selectedAccount={{
						// scheme: location.state?.refID,
						scheme: location?.state?.data?.activityID,
						refType: 'TASKADD'
					}}
					isUpload={false}
					type='TASKADD'
					onValuesChange={handleTaskFormChange}
					data={attachmentsModalDataArray}
				/>
				<MiscellaneousFormCard
					form={form}
					formData={taskFormData}
					onValuesChange={handleTaskFormChange}
					rules={rules.length > 0 ? rules[2] : undefined}
					csObject={csObject[2]}
					mode={mode}
				/>
				<BackToTop />
			</Space>

			{/* </div> */}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state && state.auth && state.auth.user,
		cs: state.taskCreate.controlStructure
	};
};

const mapDispatchToProps = { executeGetTaskCreateCs };

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreateScreen);

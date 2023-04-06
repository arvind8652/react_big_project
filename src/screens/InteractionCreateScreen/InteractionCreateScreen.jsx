import React, { useState, useEffect } from 'react';
import { Form, Alert, Space } from 'antd';
import './interactionCreate.scss';
import axios from 'axios';

import { connect } from 'react-redux';
import {
	executeGetInteractionCreateCs,
	executeGetExistingInteraction
} from '../../redux/actions/interactionCreateActions';
import { createValidators, generateCsObject, getBase64 } from '../../utils/utils';
import { postInteractionApi } from '../../api/interactionCreateApi';
import {
	getInteractionViewApi,
	getAttachmentDetailApi,
	getMiscellaneousDetailApi
} from '../../api/interactionViewApi';
import ExistingInteractionModal from './ExistingInteraction';
import ClientProspectDetailsForm from './clientProspectDetailsForm';
import InteractionDetailsForm from './interactionDetailsForm';
// import OccurenceForm from "./occurenceForm";
import OccurenceForm2 from './occurenceForm2';
import EditOccurenceForm from './editOccurrenceForm';
import OccurenceFormNew from './occurenceFormNew';
import AttachmentFormCard from '../../components/Forms/AttachmentFormCard/AttachmentFormCard';
import MiscellaneousFormCard from '../../components/Forms/MiscellaneousFormCard/MiscellaneousFormCard';
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Modal from 'antd/lib/modal/Modal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import BackToTop from '../../components/BackToTop/BackToTop';
import ClientProspectDetailsForm2 from './clientProspectDetailsForm2';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { CONSTANTS } from '../../constants/constants';
import UploadByFormat from '../../components/UploadByFormat/UploadByFormat';
import InteractionAttachmentsForm from './interactionAttachmentsForm';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';

const InteractionCreateScreen = (props) => {
	const { user, cs, existingInteraction } = props;

	const history = useHistory();
	const location = useLocation();
	const [form] = Form.useForm();
	let screen;
	let data;
	let mode;
	let id;
	if (location && location?.state) {
		screen = location?.state?.screen;
		data = location?.state?.data;
		mode = location?.state?.mode;
		id = location?.state?.data?.id;
	}

	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [existingInteractionData, setExistingInteractionData] = useState({});
	const [requiredFiled, setRequiredFiled] = useState(false);
	const [isMultiOcurrance, setIsMultiOccurence] = useState(false);
	const [interactionFormData, setInteractionFormData] = useState({
		refType: 'PROSPECTADD',
		activityNature: 'I',
		refID: { key: null }
		// refID:  null ,
	});

	const [_attachments, _setAttachments] = useState([]);
	const [selectedAccount, setSelectedAccount] = useState({});
	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);
	const [invitee, setInvitee] = useState([]);
	const [relationDetail, setRelationDetail] = useState();
	const [editingData, setEditingData] = useState();

	useEffect(() => {
		executeGetInteractionCreateCs();
	}, []);

	// const newFormData = (interactionDetails) => {
	//   return {
	//     //  id: interactionDetails.id ? interactionDetails.id : null,
	//     activityID: interactionDetails?.activityID ? interactionDetails?.activityID : null,
	//     refType: interactionDetails?.refType ? interactionDetails?.refType : "",
	//     refID:  interactionDetails?.refID ? interactionDetails?.refID :  "",
	//     // refID: { key: interactionDetails?.refID ? interactionDetails?.refID :  ""},
	//     // refID:interactionDetails?.clientProspectName? interactionDetails?.clientProspectName:  "" ,
	//     opportunityName: interactionDetails?.opportunityName ? interactionDetails?.relationshipManager : "",
	//     branch: interactionDetails?.branch ? interactionDetails?.branch : "",

	//     subject: interactionDetails?.subject ? interactionDetails?.subject : "",
	//     activityPurpose: interactionDetails?.activityPurpose ? interactionDetails?.activityPurpose : "",
	//     priority: interactionDetails?.priorityName ? interactionDetails?.priorityName : "",
	//     description: "",

	//     ActivityStatus: interactionDetails?.activityStatus ? interactionDetails?.activityStatus : "",
	//     interactionType: interactionDetails?.interactionType ? interactionDetails?.interactionType : "",
	//     startDate: interactionDetails?.startDate ? moment(interactionDetails?.startDate, "DD-MM-YYYY") : "",
	//     startTime: interactionDetails?.startTime ? interactionDetails?.startTime : null,
	//     endDate: interactionDetails?.endDate ? moment(interactionDetails?.endDate, "DD-MM-YYYY") : null,
	//     endTime: interactionDetails?.endTime ? interactionDetails?.endTime : null,
	//     isAllDay: interactionDetails?.isAllDay ? interactionDetails?.isAllDay : false,
	//     reminder: interactionDetails?.inviteeadd ? interactionDetails?.inviteeadd : undefined,
	//   };
	// };
	useEffect(() => {
		if (screen === 'list' && mode === 'edit' && data.activityID) {
			axios
				.all([
					getInteractionViewApi(
						data.followUpID ? data.followUpID : data.followUpId,
						data.id,
						data.activityID,
						isMultiOcurrance
					),
					getAttachmentDetailApi(data.activityID),
					getMiscellaneousDetailApi(data.activityID)
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
						setAttachmentsModalDataArray(responses[1].data);
					})
				);
		}
	}, [screen, mode, location?.state, data?.activityID, isMultiOcurrance]);

	useEffect(() => {
		interactionFormData && form.setFieldsValue(interactionFormData);
	}, [interactionFormData]);

	useEffect(() => {
		if (screen && data) {
			if (screen === 'view') {
				// data &&
				//   setInteractionFormData ({
				//     opportunityId: data.opportunityId ? data.opportunityId : null,
				//     prospectType: data.refType ? data.refType : "PROSPECTADD",
				//     relationshipManager: data.relationshipManagerData_Value ? data.relationshipManagerData_Value : undefined,
				//     branch: data.branch ? data.branch : undefined,
				//     refID: data && data.refID ? data.refID : undefined,
				//     status: data.isOpen && data.isOpen ? data.isOpen : "OPEN",
				//     stage: data.stageData_Value ? data.stageData_Value : undefined,
				//     closeStage: data.isOpen === "CLOSED" ? data.stageData_Value : undefined,
				//     probability: data.probability ? data.probability : undefined,
				//     startDate: data.creationDate
				//       ? moment.utc(data.creationDate)
				//       : // : (cs &&
				//         //     cs.length > 0 &&
				//         //     cs[1].controlStructureField
				//         //       .map((item) => {
				//         //         if (item.keyField === "CreationDate") {
				//         //           return (
				//         //             item.defaultvalue &&
				//         //             moment(item.defaultvalue, "DD-MM-YYYY")
				//         //           );
				//         //         }
				//         //         return undefined;
				//         //       })
				//         //       .filter((item) => item !== undefined)[0]) ||
				//         undefined,
				//     expectedDate: data.dueDate ? moment.utc(data.dueDate) : undefined,
				//     targetAmount: data && data.isOpen === "OPEN" && data.targetAmount ? data.targetAmount : undefined,
				//     opportunityName: data.opportunityName ? data.opportunityName : undefined,
				//     opportunityType: data.opportunityTypeData_Value ? data.opportunityTypeData_Value : undefined,
				//     productOrService: data.productOrServiceData_Value ? data.productOrServiceData_Value : undefined,
				//     closureAmount: data.isOpen === "CLOSED" && data.amount ? data.amount : undefined,
				//     closeDate: data.closeDate ? moment.utc(data.closeDate, "DD-MM-YYYY") : undefined,
				//     closeReason: data.closeReasonData_Value ? data.closeReasonData_Value : undefined,
				//     preferredCurrency: data.preferredCurrency ? data.preferredCurrency : undefined,
				//     remark: data.remark ? data.remark : undefined,
				//     attachments: data && data.attachments ? data.attachments : [],
				//     fileList: [],
				//     miscellaneous: undefined,
				//   });
			} else if (screen === 'list')
				if (mode === 'edit' && editingData) {
					// axios.all([
					//   getInteractionViewApi(data.activityID, data.id),
					//   getAttachmentDetailApi(data.activityID),
					//   getMiscellaneousDetailApi(data.activityID),
					// ]).then(
					//   axios.spread((...responses) => {
					//
					//     responses[0].data &&
					//     responses[1].data &&
					//     responses[2].data &&
					//       editingData === undefined &&
					//       setEditingData({
					//         ...responses[0].data,
					//         attachments: responses[1].data,
					//         miscellaneous: responses[2].data.miscellaneous,
					//         fileList: [],
					//       });
					//   })
					// );
					setIsMultiOccurence(location?.state?.singleOrMultiple === 1 ? false : true);
					forInviteOnChange(editingData.taskScheduler?.followuplist[0]?.inviteeadd);
					setInteractionFormData({
						RelationDetail: editingData.taskScheduler?.followuplist
							? editingData.taskScheduler.followuplist
							: null,
						// FollowUpActivityStatus: editingData.taskScheduler?.followuplist[0].followUpActivityStatusName
						//   ? editingData.taskScheduler?.followuplist[0].followUpActivityStatusName
						//   : undefined,
						// interactionTypeName: editingData.taskScheduler?.interactionTypeName
						//   ? editingData.taskScheduler.interactionTypeName
						//     : null,
						interactionType: editingData?.taskScheduler?.interactionType
							? editingData?.taskScheduler?.interactionType
							: undefined,
						activityNature: 'I',
						// interactionType: editingData.taskScheduler.interactionType
						// 	? editingData.taskScheduler.interactionType
						// 	: null,
						subject: editingData?.taskScheduler?.subject
							? editingData?.taskScheduler?.subject
							: undefined,
						// opportunityId: editingData.opportunityId ? editingData.opportunityId : null,
						activityID: editingData?.taskScheduler?.activityID
							? editingData?.taskScheduler?.activityID
							: null,
						refType: editingData?.taskScheduler?.refType
							? editingData?.taskScheduler?.refType
							: null,
						relationshipManager: editingData?.taskScheduler?.relationshipManager
							? editingData?.taskScheduler?.relationshipManager
							: undefined,
						branch: editingData?.taskScheduler?.branch ? editingData?.taskScheduler?.branch : null,
						refID: editingData?.taskScheduler?.refID ? editingData?.taskScheduler?.refID : null,
						reminder: editingData?.taskScheduler?.reminder
							? editingData?.taskScheduler?.reminder
							: null,
						activityStatus: editingData?.taskScheduler?.activityStatusName
							? editingData?.taskScheduler?.activityStatusName
							: '',
						// startDate: editingData.taskScheduler?.followuplist[0].startDate
						//         ? moment(editingData.taskScheduler.followuplist[0].startDate)
						//         : // moment.utc(editingData.taskScheduler.startDate)
						//           // : (cs &&
						//           //     cs.length > 0 &&
						//           //     cs[1].controlStructureField
						//           //       .map((item) => {
						//           //         if (item.keyField === "CreationDate") {
						//           //           return item.defaultvalue && moment(item.defaultvalue);
						//           //         }
						//           //         return undefined;
						//           //       })
						//           //       .filter((item) => item !== undefined)[0]) ||
						//           null,
						// endDate: editingData.taskScheduler.endDate && editingData.taskScheduler.endDate ? moment.utc(editingData.taskScheduler.endDate) : undefined,
						// EndDate: editingData.taskScheduler?.followuplist[0].endDate
						// ? moment(editingData.taskScheduler.followuplist[0].endDate)
						// : null,
						// isAllDay: editingData.taskScheduler.isAllDay ? editingData.taskScheduler.isAllDay : false,
						inviteeadd: editingData?.taskScheduler?.inviteeadd
							? editingData?.taskScheduler?.inviteeadd
							: undefined,
						opportunity: editingData?.taskScheduler?.opportunity
							? editingData?.taskScheduler?.opportunity
							: undefined,
						activityPurpose: editingData?.taskScheduler?.activityPurpose
							? editingData?.taskScheduler?.activityPurpose
							: undefined,
						priority: editingData?.taskScheduler?.priority
							? editingData?.taskScheduler?.priority
							: null,
						description: editingData?.taskScheduler?.notes
							? editingData?.taskScheduler?.notes
							: null,
						opportunityName: editingData?.taskScheduler?.opportunityName
							? editingData?.taskScheduler?.opportunityName
							: undefined,
						// closeReason: editingData.closeReasonData_Value ? editingData.closeReasonData_Value : undefined,
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
						// miscellaneous: undefined,
						miscellaneous: editingData?.miscellaneous ? editingData?.miscellaneous : undefined
						//       startTime: editingData.taskScheduler?.followuplist[0].startTime
						//         ? moment(editingData.taskScheduler.followuplist[0].startTime)
						//         : "03:30",
						//       endTime: editingData.taskScheduler?.followuplist[0].endTime
						//         ? moment(editingData.taskScheduler.followuplist[0].endTime)
						//         : "04:00",
						//       occurrence: editingData.taskScheduler?.followuplist[0].occurrence
						//         ? editingData.taskScheduler.followuplist[0].occurrence
						//     : 1,
						//     isAllDay: editingData.taskScheduler?.followuplist[0].isAllDay
						//     ? editingData.taskScheduler.followuplist[0].isAllDay
						//     : false,
						//   reminder: editingData.taskScheduler?.followuplist[0].reminder
						//     ? editingData.taskScheduler.followuplist[0].reminder
						//     : "None",
						//   frequency: editingData.taskScheduler?.followuplist[0].frequencyName
						//     ? editingData.taskScheduler.followuplist[0].frequencyName
						//     : "None",
					});
					setAttachmentsModalDataArray(editingData?.attachments);
				}
			// if (existingInteractionData) {
			//   // editData = {
			//   //   ...editData,
			//   editingData = {
			//       ...editingData,
			//     opportunityName: existingInteractionData.opportunityName,
			//     subject: existingInteractionData.subject,
			//     purpose: existingInteractionData.purpose,
			//     priority: existingInteractionData.priority,
			//   };
			// }
			// // handleInteractionFormChange(editData);
			// handleInteractionFormChange(editingData);
			// // form.setFieldsValue(editData);
			// form.setFieldsValue(editingData);
		}
		// }, [existingInteractionData, location?.state?.dataObject]
	}, [form, editingData]);

	useEffect(() => {
		// executeGetExistingInteraction(location?.state?.data?.refID);
		executeGetExistingInteraction(
			location?.state?.data?.refID
				? location?.state?.data?.refID
				: interactionFormData?.refID?.value
		);
	}, [interactionFormData?.refID?.value, location?.state?.data?.refID]);

	let rules = [];

	let csObject = [];
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

	form.setFieldsValue(interactionFormData);

	const [showExistingInteractionModal, setShowExistingInteractionModal] = useState(false);

	useEffect(() => {
		if (mode === 'create' && (screen === 'prospect-list' || screen === 'customer-list')) {
			setInteractionFormData({
				refType: location?.state?.refType === 'CLIENTADD' ? 'CLIENTADD' : 'PROSPECTADD',
				activityNature: 'I',
				relationshipManager: data ? data?.relationshipManager : undefined,
				branch: data ? data?.branch : undefined,
				refName: undefined,
				opportunityName: undefined,
				subject: undefined,
				activityPurpose: undefined, //purpose
				priority: undefined, //Priority
				description: undefined, //Description
				status: undefined,
				refID: {
					key: data?.prospectId || data?.customerCode || data?.clientId,
					value: data?.prospectId || data?.customerCode || data?.clientId,
					label: data?.name || data?.firstName || data?.customerName
				},
				inviteeadd: invitee || undefined
			});
		}
		if (mode === 'create' && (screen === 'prospect-view' || screen === 'customer-view')) {
			setInteractionFormData({
				refType: location?.state?.refType === 'CLIENTADD' ? 'CLIENTADD' : 'PROSPECTADD',
				activityNature: 'I',
				relationshipManager:
					data?.relationshipManager || data?.custRelMgr
						? data?.relationshipManager || data?.custRelMgr
						: undefined,
				branch: data ? data?.branch : undefined,
				opportunityName: undefined,
				refID: {
					key: data?.prospectId || data?.customerCode || data?.clientId,
					value: data?.prospectId || data?.customerCode || data?.clientId,
					label: data?.firstName + ' ' + (data?.lastName || data?.thirdName)
				}
			});
		}
		if (mode === 'create' && screen === 'oppo-list') {
			setInteractionFormData({
				refType: data ? data?.refType : undefined,
				relationshipManager: data ? data?.relationshipManager : undefined,
				branch: data ? data?.branch : undefined,
				refName: undefined,
				opportunityName: data ? data?.opportunityName : undefined,
				subject: undefined,
				activityPurpose: undefined, //purpose
				priority: undefined, //Priority
				description: undefined, //Description
				status: undefined,
				screenName: screen,
				refID: {
					key: data?.refID || data?.refId,
					value: data?.refID || data?.refId,
					label: data?.clientProspectName
				},
				inviteeadd: invitee || undefined,
				activityNature: 'I'
			});
		}
		if (mode === 'create' && screen === 'interaction-list') {
			setInteractionFormData({
				refType: data ? data?.refType : undefined,
				relationshipManager: data ? data?.relationshipManager : undefined,
				branch: data ? data?.branch : undefined,
				refName: undefined,
				opportunityName: data ? data?.opportunityName : undefined,
				subject: data ? data?.subject : undefined,
				activityPurpose: data ? data?.activityPurposeName : undefined, //purpose
				priority: data ? data?.priorityName : undefined, //Priority
				description: undefined, //Description
				status: undefined,
				screenName: screen,
				refID: {
					key: data?.refID || data?.refId,
					value: data?.refID || data?.refId,
					label: data?.clientProspectName
				},
				activityNature: 'I',
				inviteeadd: data ? data.inviteeadd : undefined,
				interactionType: data ? data?.interactionTypeName : undefined
			});
		}
		if (mode === 'create' && screen === 'task-list') {
			setInteractionFormData({
				refType: data ? data?.refType : undefined,
				relationshipManager: data ? data?.relationshipManager : undefined,
				branch: data ? data?.branch : undefined,
				refName: undefined,
				opportunityName: data ? data?.opportunityName : undefined,
				subject: undefined,
				activityPurpose: undefined, //purpose
				priority: undefined, //Priority
				description: undefined, //Description
				status: undefined,
				screenName: screen,
				refID: {
					key: data?.refID || data?.refId,
					value: data?.refID || data?.refId,
					label: data?.clientProspectName
				},
				activityNature: 'I'
			});
		}
	}, [cs, location?.state]);

	const handleChange = (values) => {};

	const datePreprocessing = () => {
		for (let i = 0; i < interactionFormData.RelationDetail?.length; i++) {
			if (interactionFormData.RelationDetail[i].startDate === undefined)
				interactionFormData.RelationDetail[i].startDate = moment(new Date(), 'DD-MM-YYYY');
			if (interactionFormData.RelationDetail[i].endDate === undefined)
				interactionFormData.RelationDetail[i].endDate = moment(new Date(), 'DD-MM-YYYY');
		}
	};

	const handleFormSubmit = () => {
		datePreprocessing();
		// handleUndefinedDate();
		form
			.validateFields()
			.then((res) => {
				postInteractionApi(
					interactionFormData,
					'ACTIVITYADD',
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
				setRequiredFiled(true);
				console.log('err---------', err);
			});
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

	const removeAttachment = (fileName) => {
		if (Array.isArray(interactionFormData.attachments)) {
			setInteractionFormData({
				...interactionFormData,
				attachments: interactionFormData.attachments.filter((item) => item.fileName !== fileName),
				fileList: interactionFormData.fileList.filter((item) => item.name !== fileName)
			});
		}
	};
	const setAttachments = (attachments, fileList) => {
		setInteractionFormData({
			...interactionFormData,
			attachments: attachments,
			fileList: fileList
		});
	};

	const handleInteractionFormChange = (values) => {
		if (!values.attachments) {
			//
			setInteractionFormData({
				...interactionFormData,
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
			setAttachmentsModalDataArray(finalAttachmentsModalData);
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
		// 		setInteractionFormData({
		// 			...interactionFormData,
		// 			attachments: interactionFormData.attachments.filter(
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

	// const handleInteractionFormChange = useCallback(
	//   (values) => {
	//     //
	//     // if (!values.attachments || values.attachments?.length === 0) {
	//     //   setInteractionFormData({
	//     //     ...interactionFormData,
	//     //     ...values,
	//     //   });
	//     // }
	//     if (!values.attachments) {
	//
	//       setInteractionFormData({
	//         ...interactionFormData,
	//         ...values,
	//       });
	//     }
	//     if (values.attachments && values.attachments.length > 0) {
	//       let attachments = [];
	//       let attachmentsModalData = [];
	//       values.attachments.forEach((file) => {
	//         attachments = [
	//           ...attachments,
	//           {
	//             FileDescription: "Attachments",
	//             FileName: file.FileName,
	//             FileSize: file.FileSize,
	//             MimeType: file.Mimetype,
	//             FileString: file.FileString,
	//             AttachmentFor: "Attachments",
	//             attachedBy: user && user.userName,
	//             SessionId: file.SessionId,
	//           },
	//         ];
	//         attachmentsModalData = [
	//           ...attachmentsModalData,
	//           {
	//             fileDescription: file.fileDescription,
	//             fileName: file.fileName,
	//             fileSize: file.fileSize,
	//             fileType: file.fileType,
	//             mimeType: file.mimetype,
	//             fileString: file.fileString,
	//             attachmentFor: file.fileName,
	//             attachedBy: user && user.userName,
	//             refId: file.refId,
	//             // refType: "OPPORTUNITYADD",
	//             sessionId: file.SessionId,
	//           },
	//         ];
	//       });
	//       let finalAttachmentsModalData = [...attachmentsModalDataArray],
	//         finalAttachments = [...interactionFormData.attachments];

	//       if (values?.operation && values?.operation === "delete") {
	//         finalAttachmentsModalData = [];
	//         finalAttachments = [];
	//       }

	//       attachmentsModalData.forEach((file) => {
	//         finalAttachmentsModalData = [...finalAttachmentsModalData, file];
	//       });
	//       attachments.forEach((file) => {
	//         finalAttachments = [...finalAttachments, file];
	//       });
	//       setAttachments(finalAttachments);
	//       setAttachmentsModalDataArray(finalAttachmentsModalData);
	//     }

	//     if (
	//       values?.operation &&
	//       values?.operation === "delete" &&
	//       values?.attachments &&
	//       values?.attachments?.length === 0
	//     ) {
	//       setAttachmentsModalDataArray([]);
	//       setAttachments([]);
	//     }
	//     // MAY BE USEFUL IN FUTURE SO KEPING THIS FOR WHILE
	//     // if (values.attachments && values.attachments.fileList) {
	//     //   if (values.attachments.file.status === "removed") {
	//     //     setOppFormData({
	//     //       ...oppFormData,
	//     //       attachments: oppFormData.attachments.filter(
	//     //         (item) => item.fileName !== values.attachments.file.name
	//     //       ),
	//     //     });
	//     //   } else if (
	//     //     Array.isArray(values.attachments.fileList) &&
	//     //     values.attachments.fileList.length > 0
	//     //   ) {
	//     //     let attachments = [];
	//     //     values.attachments.fileList.forEach((file) => {
	//     //       if (file.size / 1024 / 1024 <= 1) {
	//     //         getBase64(file.originFileObj, (imageUrl) => {
	//     //           // if (Array.isArray(attachments)) {

	//     // attachments = [
	//     //   ...attachments,
	//     //   ...getExistingAttachments(),
	//     //   {
	//     //     refType: null,
	//     //     refId: null,
	//     //     fileDescription: "Attachments",
	//     //     fileName: file.originFileObj.name,
	//     //     fileSize:
	//     //       (file.originFileObj.size / 1024).toFixed(2).toString() +
	//     //       "KB",
	//     //     mimeType: file.originFileObj.type,
	//     //     fileString: imageUrl && imageUrl.split(",")[1],
	//     //     attachmentFor: "Attachments",
	//     //     attachedBy: user && user.userName,
	//     //     sessionId: "",
	//     //   },
	//     // ];
	//     //           setAttachments(attachments, values.attachments.fileList);
	//     //         });
	//     //       }
	//     //     });
	//     //   }
	//     // }
	//   },
	//   // [interactionFormData, interactionFormData.RelationDetail]
	// );

	useEffect(() => {
		setInteractionFormData({
			...interactionFormData,
			attachments: attachmentsModalDataArray
		});
	}, [attachmentsModalDataArray]);

	const loadExistingInteractionData = (index) => {
		setExistingInteractionData({
			subject: existingInteraction[index].subject,
			opportunityName: existingInteraction[index].opportunity,
			priority: existingInteraction[index].priority,
			activityPurpose: existingInteraction[index].activityPurpose
		});
		setInteractionFormData({
			...interactionFormData,
			['subject']: existingInteraction[index]?.subject,
			['opportunityName']: existingInteraction[index]?.opportunity,
			['priority']: existingInteraction[index]?.priority,
			['activityPurpose']: existingInteraction[index]?.activityPurpose
			// ['opportunityName']: existingInteraction[index]?.opportunity
		});
	};
	const handleActionModalOkOrCancel = () => {
		//history.goBack()
		setShowFailModal(false);
		setShowSuccessModal(false);
	};
	const onSuccessOk = () => {
		setShowSuccessModal(false);
		history.goBack();
	};
	const onAlertClose = () => {
		setRequiredFiled(false);
	};
	return (
		<div className='interaction-create-container'>
			{/* {location.state?.mode === "edit" ? 
      <Modal visible={showSuccessModal} onOk={onSuccessOk} centered>
        <SuccessModal message="Edit Successfully" />
        </Modal> :
        <Modal visible={showSuccessModal} onOk={onSuccessOk} centered>
        <SuccessModal message="Action Completed Successfully" />
      </Modal>
      } */}
			<Modal visible={showSuccessModal} onOk={onSuccessOk} centered>
				<SuccessModal message='Action Completed Successfully' />
			</Modal>
			<FailModal
				visible={showFailModal}
				onOk={handleActionModalOkOrCancel}
				onCancel={handleActionModalOkOrCancel}
				errorArray={errorArray}
			/>
			<DashboardScreenTopbar
				// screenText="Create Interaction"
				screenText={mode && mode === 'edit' ? 'Edit Interaction' : 'Create Interaction'}
				breadCrumb=''
				cancelBtnText='Cancel'
				submitBtnText='Save'
				onSubmit={handleFormSubmit}
				onCancel={() => {
					history.goBack();
				}}
			/>

			{/* <ClientProspectDetailsForm
        setShowExistingInteractionModal={(val) =>
          setShowExistingInteractionModal(val)
        }
        form={form}
        formData={interactionFormData}
        onValuesChange={handleInteractionFormChange}
        csObject={csObject[0]}
        rules={rules.length > 0 ? rules[0] : undefined}
      /> */}
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
				<ClientProspectDetailsForm2
					setShowExistingInteractionModal={(val) => setShowExistingInteractionModal(val)}
					existingInteractionData={existingInteractionData}
					form={form}
					formData={interactionFormData}
					// data={editingData}
					onValuesChange={(data) => handleInteractionFormChange(data)}
					rules={rules.length > 0 ? rules[0] : undefined}
					ExistingData={location?.state?.data}
					csObject={csObject[0]}
					mode={mode}
				/>
				<InteractionDetailsForm
					existingInteractionData={existingInteractionData}
					onChange={handleChange}
					form={form}
					formData={interactionFormData}
					onValuesChange={(data) => handleInteractionFormChange(data)}
					csObject={csObject[0]}
					singleOrMultiple={location?.state?.singleOrMultiple}
					ExistingData={location?.state?.data}
					rules={rules.length > 0 ? rules[0] : undefined}
				/>
				{location.state?.mode === 'edit' ? (
					<EditOccurenceForm
						onValuesChange={(data) => handleInteractionFormChange(data)}
						//        setRecurrenceModalOpen={(val) => setRecurrenceModalOpen(val)}
						form={form}
						formData={interactionFormData}
						csObject={csObject[1]}
						// ExistingData={location?.state?.dataObject}
						ExistingData={location?.state?.data}
						rules={rules.length > 0 ? rules[1] : undefined}
						singleOrMultiple={location?.state?.singleOrMultiple}
						setInvitee={setInvitee}
						relationDetail={relationDetail}
						setRelationDetail={setRelationDetail}
					/>
				) : (
					<OccurenceForm2
						onValuesChange={(data) => handleInteractionFormChange(data)}
						//        setRecurrenceModalOpen={(val) => setRecurrenceModalOpen(val)}
						form={form}
						formData={interactionFormData}
						rules={rules.length > 0 ? rules[1] : undefined}
						csObject={csObject[1]}
						setInvitee={setInvitee}
					/>
				)}

				{/* <InteractionAttachmentsForm
        attachments={_attachments}
        _setAttachments={_setAttachments}
        onValuesChange={handleInteractionFormChange}
        interactionId={location?.state?.dataObject?.id}
      /> */}
				{/* <AttachmentFormCard
					form={form}
					formData={interactionFormData}
					onValuesChange={handleInteractionFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					removeAttachment={removeAttachment}
					csObject={csObject[0]}
					controlstruct={csObject[0]}
					id={interactionFormData.interactionId}
				/> */}
				<AttachmentUploadModal
					selectedAccount={{
						// scheme: location.state?.refID,
						scheme: location.state?.activityID,
						// refType: 'ACTIVITYADD'
						refType: 'ACTIVITYADD'
					}}
					// selectedAccount={{  refType: location.state?.refType,scheme: location.state?.refID, }}
					isUpload={false}
					type='ACTIVITYADD'
					onValuesChange={handleInteractionFormChange}
					data={attachmentsModalDataArray}
				/>
				{/* <AttachmentUploadModal
        // selectedAccount={{
        //   scheme: location.state?.refID,
        //   refType: "PROSPECTADD",
        // }}
        // selectedAccount={{  refType: location.state?.refType,scheme: location.state?.refID, }}
        //     selectedAccount={selectedAccount}
        //     isUpload={false}
        //     type="PROSPECTADD"
        //     onValuesChange={handleInteractionFormChange}
        // data={attachmentsModalDataArray}
        selectedAccount={selectedAccount}
        isUpload={false}
        onValuesChange={(data) => handleInteractionFormChange(data)}
        data={attachmentsModalDataArray}
        type="INTERACTIONADD"
        // dataDetails={oppFormData}
      /> */}

				{/* <UploadByFormat
        uploadFormat='attachments'
        form={form}
        formData={interactionFormData}
        onValuesChange={handleInteractionFormChange}
        rules={rules.length > 0 ? rules[0] : undefined}
        removeAttachment={removeAttachment}
        csObject={
          csObject[
          cs &&
          cs
            .map((item, index) =>
              item.sectionName === "Main" ? index : false
            )
            .filter((indexItem) => indexItem !== false)[0]
          ]
        }
        action={location?.state?.action}
        customerCode={location.state?.refID}
        progName='CLIENTREQADD'
      /> */}
				{cs &&
					cs.filter((item) => item.sectionName === 'Miscellaneous') &&
					cs.filter((item) => item.sectionName === 'Miscellaneous').length > 0 &&
					cs.filter((item) => item.sectionName === 'Miscellaneous')[0] && (
						<MiscellaneousFormCard
							form={form}
							formData={interactionFormData}
							onValuesChange={(data) => handleInteractionFormChange(data)}
							rules={rules && rules.length > 0 ? rules[2] : undefined}
							csObject={
								csObject[
									cs &&
										cs
											.map((item, index) => (item.sectionName === 'Miscellaneous' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
								]
							}
							mode={mode}
						/>
					)}
				<BackToTop />
			</Space>

			<ExistingInteractionModal
				visible={showExistingInteractionModal}
				onClose={() => setShowExistingInteractionModal(false)}
				interactions={existingInteraction}
				onFinish={loadExistingInteractionData}
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		cs: state.interactionCreate.controlStructure,
		user: state && state.auth && state.auth.user,
		existingInteraction: state.interactionCreate.existingInteraction
	};
};
const mapDispatchToProps = {
	executeGetInteractionCreateCs,
	executeGetExistingInteraction
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractionCreateScreen);

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './CompOpportunityCreateScreen.scss';
import moment from 'moment';
import { Form, Button, Alert, Space } from 'antd';
import { connect } from 'react-redux';
import { createValidators, generateCsObject } from '../../utils/utils';
import MiscellaneousFormCard from '../../components/Forms/MiscellaneousFormCard/MiscellaneousFormCard';
import { executeGetOppCreateCs } from '../../redux/actions/compOppCreateAction';
import {
	getAttachmentDetailApi,
	getOpportunityViewApi,
	getMiscellaneousDetailApi
} from '../../api/opportunityViewApi';
import { postCompOpportunityApi } from '../../api/opportunityCreateApi';
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import CustomProspectTypeFormCard from '../../components/Forms/CustomProspectTypeFormCard/CustomProspectTypeFormCard';
import OpportunityDetailsFormCard from '../../components/Forms/OpportunityDetailsFormCard/OpportunityDetailsFormCard';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Modal from 'antd/lib/modal/Modal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import axios from 'axios';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import BackToTop from '../../components/BackToTop/BackToTop';
const CompOpportunityCreateScreen = (props) => {
	const [selectedAccount, setSelectedAccount] = useState({});
	const { user, cs } = props;
	const [form] = Form.useForm();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const history = useHistory();
	const location = useLocation();
	const [requiredFiled, setRequiredFiled] = useState(false);
	let screen;
	let data;
	let mode;
	let opportunityIds;
	let rowIndex;

	if (location && location.state) {
		screen = location.state.screen;
		data = location.state.data;
		mode = location.state.mode;
		opportunityIds = location.state.opportunityIds;
		rowIndex = location.state.rowIndex;
	}
	useEffect(() => {
		executeGetOppCreateCs();
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
	const handleFormSubmit = () => {
		form
			.validateFields()
			.then((res) => {
				postCompOpportunityApi(oppFormData)
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
			})
			.catch((error) => {
				setRequiredFiled(true);
			});
	};

	const [oppFormData, setOppFormData] = useState({});
	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);

	const handleOppFormData = () => {
		if (mode === 'create' || screen === 'task-list') {
			setOppFormData({
				opportunityId: data && data.refID ? data.refID : null,
				prospectType: data && data.refType ? data.refType : 'PROSPECTADD',
				relationshipManager:
					data && data && data.relationshipManager ? data.relationshipManager : undefined,
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
											return (
												// item.defaultvalue &&
												// moment.utc(item.defaultvalue, "DD-MM-YYYY")
												null
											);
										}
										return undefined;
									})
									.filter((item) => item !== undefined)[0]) ||
						  undefined,
				//  user && user.curDate
				// ? moment.utc(user.curDate)
				// : undefined,

				expectedDate: data && data.dueDate ? moment.utc(data.dueDate, 'DD-MM-YYYY') : undefined,

				// expectedDate:
				//     user&& user.curDate
				//     ? moment(user.curDate)
				//     : undefined,

				targetAmount:
					data && data.isOpen === 'OPEN' && data.targetAmount ? data.targetAmount : undefined,
				opportunityName: data?.opportunityName ? data?.opportunityName : undefined,
				opportunityType:
					data && data && data.opportunityTypeData_Value
						? data.opportunityTypeData_Value
						: undefined,
				productOrService: data && data && data.productOrService ? data.productOrService : undefined,
				closureAmount:
					data && data && data.isOpen === 'CLOSED' && data.amount ? data.amount : undefined,
				// closeDate:
				//   data && data.closeDate ? moment.utc(data.closeDate) : undefined,
				closeDate:
					data && data.CloseDate
						? moment.utc(data.CloseDate)
						: (cs &&
								cs.length > 0 &&
								cs[1].controlStructureField
									.map((item) => {
										if (item.keyField === 'CloseDate') {
											return (
												// item.defaultvalue &&
												// moment.utc(item.defaultvalue, "DD-MM-YYYY")
												null
											);
										}
										return undefined;
									})
									.filter((item) => item !== undefined)[0]) ||
						  undefined,

				// user && user.curDate
				// ? moment(user.curDate)
				// : undefined,
				closeReason: data && data.closeReason ? data.closeReason : undefined,
				preferredCurrency:
					data && data.preferredCurrency
						? data.preferredCurrency
						: csObject[1]?.PreferredCurrency?.defaultvalue,
				remark: data && data.remark ? data.remark : undefined,
				attachments: data && data.attachments ? data.attachments : [],
				fileList: [],
				miscellaneous: []
			});
		} else if (mode != 'edit') {
			setOppFormData({
				opportunityId: data && data.opportunityId ? data.opportunityId : null,
				prospectType: data && data.refType ? data.refType : 'PROSPECTADD',
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
											return (
												// item.defaultvalue &&
												// moment.utc(item.defaultvalue, "DD-MM-YYYY")
												null
											);
										}
										return undefined;
									})
									.filter((item) => item !== undefined)[0]) ||
						  undefined,
				//  user && user.curDate
				// ? moment.utc(user.curDate)
				// : undefined,

				expectedDate: data && data.dueDate ? moment.utc(data.dueDate, 'DD-MM-YYYY') : undefined,

				// expectedDate:
				//     user&& user.curDate
				//     ? moment(user.curDate)
				//     : undefined,

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
				// closeDate:
				//   data && data.closeDate ? moment.utc(data.closeDate) : undefined,
				closeDate:
					data && data.CloseDate
						? moment.utc(data.CloseDate)
						: (cs &&
								cs.length > 0 &&
								cs[1].controlStructureField
									.map((item) => {
										if (item.keyField === 'CloseDate') {
											return (
												// item.defaultvalue &&
												// moment.utc(item.defaultvalue, "DD-MM-YYYY")
												null
											);
										}
										return undefined;
									})
									.filter((item) => item !== undefined)[0]) ||
						  undefined,

				// user && user.curDate
				// ? moment(user.curDate)
				// : undefined,
				closeReason: data && data.closeReason ? data.closeReason : undefined,
				preferredCurrency:
					data && data.preferredCurrency
						? data.preferredCurrency
						: csObject[1]?.PreferredCurrency?.defaultvalue,
				remark: data && data.remark ? data.remark : undefined,
				attachments: data && data.attachments ? data.attachments : [],
				fileList: [],
				miscellaneous: []
			});
		}
	};

	useEffect(() => {
		handleOppFormData();
	}, [cs]);
	const [editingData, setEditingData] = useState();

	useEffect(() => {
		if (screen === 'list' && (mode === 'edit' || mode === 'create-new') && data) {
			axios
				.all([
					getOpportunityViewApi(data),
					getAttachmentDetailApi(data),
					getMiscellaneousDetailApi(data)
				])
				.then(
					axios.spread((...responses) => {
						responses[0].data &&
							responses[1].data &&
							setAttachmentsModalDataArray(responses[1].data);
						responses[0].data &&
							responses[1].data &&
							responses[2].data &&
							oppFormData.miscellaneous === undefined &&
							setMiscellaneousDataInOppFormData(responses[2].data);
						editingData === undefined && console.log('rrrrrrrrr', responses[0].data);
						setEditingData({
							...responses[0].data,
							...(mode === 'create-new' && { opportunityId: null }),
							attachments: responses[1].data,
							miscellaneous: responses[2].data.miscellaneous.map((misc) => {
								return {
									type: misc.fieldName,
									miscellaneous: misc.fieldValue
								};
							}),
							fileList: []
						});
					})
				);
		}
	}, [screen, mode, location?.state, data]);

	/* Data prepopulated for editing */
	useEffect(() => {
		if (screen && data) {
			if (screen === 'view') {
				let miscellaneousArray = [];
				data &&
					data?.miscellaneous?.miscellaneous?.map((misc) => {
						let element = {
							type: misc.fieldName,
							miscellaneous: misc.fieldValue
						};
						miscellaneousArray = [...miscellaneousArray, element];
					});
				setOppFormData({
					opportunityId: data.opportunityId ? data.opportunityId : undefined,
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
					startDate: data.creationDate
						? moment.utc(data.creationDate)
						: // : (cs &&
						  //     cs.length > 0 &&
						  //     cs[1].controlStructureField
						  //       .map((item) => {
						  //         if (item.keyField === "CreationDate") {
						  //           return (
						  //             item.defaultvalue &&
						  //             moment(item.defaultvalue, "DD-MM-YYYY")
						  //           );
						  //         }
						  //         return undefined;
						  //       })
						  //       .filter((item) => item !== undefined)[0]) ||
						  undefined,
					// startDate:
					// user && user.curDate
					// ? moment(user.curDate)
					// : undefined,

					expectedDate: data.dueDate ? moment.utc(data.dueDate) : undefined,
					// expectedDate:
					// user && user.curDate
					// ? moment(user.curDate)
					// : undefined,
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
					// closeDate: data.closeDate ? moment.utc(data.closeDate) : undefined,
					closeDate:
						data && data.CloseDate
							? moment.utc(data.CloseDate)
							: (cs &&
									cs.length > 0 &&
									cs[1].controlStructureField
										.map((item) => {
											if (item.keyField === 'CloseDate') {
												return (
													// item.defaultvalue &&
													// moment.utc(item.defaultvalue, "DD-MM-YYYY")
													null
												);
											}
											return undefined;
										})
										.filter((item) => item !== undefined)[0]) ||
							  undefined,

					// user && user.curDate
					// ? moment(user.curDate)
					// : undefined,
					closeReason: data.closeReasonData_Value ? data.closeReasonData_Value : undefined,
					preferredCurrency: data.preferredCurrency ? data.preferredCurrency : undefined,
					remark: data.remark ? data.remark : undefined,
					attachments: data && data.attachments ? data.attachments : [],
					fileList: [],
					miscellaneous: miscellaneousArray
				});
				setAttachmentsModalDataArray(data && data.attachments ? data.attachments : []);
			} else if (screen === 'list') {
				if ((mode === 'edit' || mode === 'create-new') && editingData) {
					// axios
					// 	.all([
					// 		getOpportunityViewApi(data),
					// 		getAttachmentDetailApi(data),
					// 		getMiscellaneousDetailApi(data)
					// 	])
					// 	.then(
					// 		axios.spread((...responses) => {
					// 			responses[0].data &&
					// 				responses[1].data &&
					// 				setAttachmentsModalDataArray(responses[1].data);
					// 			responses[0].data &&
					// 				responses[1].data &&
					// 				responses[2].data &&
					// 				oppFormData.miscellaneous === undefined &&
					// 				setMiscellaneousDataInOppFormData(responses);
					// 			editingData === undefined &&
					// 				setEditingData({
					// 					...responses[0].data,
					// 					attachments: responses[1].data,
					// 					fileList: []
					// 				});
					// 		})
					// 	);

					setOppFormData({
						opportunityId: editingData.opportunityId ? editingData.opportunityId : undefined,
						prospectType: editingData.refType ? editingData.refType : 'PROSPECTADD',
						relationshipManager: editingData.relationshipManagerData_Value
							? editingData.relationshipManagerData_Value
							: undefined,
						branch: editingData.branch ? editingData.branch : undefined,
						refID: editingData.refID ? editingData.refID : undefined,
						status: editingData.isOpen === 'OPEN' ? 'OPEN' : 'CLOSE',
						stage:
							editingData.isOpen && editingData.isOpen === 'OPEN'
								? editingData.stageData_Value
								: undefined,
						closeStage: editingData.isOpen === 'CLOSED' ? editingData.stageData_Value : undefined,
						probability: editingData.probability ? editingData.probability : undefined,
						startDate: editingData.creationDate
							? moment.utc(editingData.creationDate)
							: // : (cs &&
							  //     cs.length > 0 &&
							  //     cs[1].controlStructureField
							  //       .map((item) => {
							  //         if (item.keyField === "CreationDate") {
							  //           return item.defaultvalue && moment(item.defaultvalue);
							  //         }
							  //         return undefined;
							  //       })
							  //       .filter((item) => item !== undefined)[0]) ||
							  undefined,

						expectedDate:
							editingData.dueDate && editingData.dueDate
								? moment.utc(editingData.dueDate)
								: undefined,
						targetAmount:
							editingData && editingData.isOpen === 'OPEN' && editingData.targetAmount
								? editingData.targetAmount
								: undefined,
						opportunityName: editingData.opportunityName ? editingData.opportunityName : undefined,
						opportunityType: editingData.opportunityTypeData_Value
							? editingData.opportunityTypeData_Value
							: undefined,
						productOrService: editingData.productOrServiceData_Value
							? editingData.productOrServiceData_Value
							: undefined,
						closureAmount:
							editingData.isOpen === 'CLOSED' && editingData.amount
								? editingData.amount
								: undefined,
						// closeDate:
						//   editingData.closeDate & editingData.closeDate
						//     ? moment.utc(editingData.closeDate)
						//     : undefined,
						closeDate:
							data && data.CloseDate
								? moment.utc(data.CloseDate)
								: (cs &&
										cs.length > 0 &&
										cs[1].controlStructureField
											.map((item) => {
												if (item.keyField === 'CloseDate') {
													return (
														// item.defaultvalue &&
														// moment.utc(item.defaultvalue, "DD-MM-YYYY")
														null
													);
												}
												return undefined;
											})
											.filter((item) => item !== undefined)[0]) ||
								  undefined,
						closeReason: editingData.closeReasonData_Value
							? editingData.closeReasonData_Value
							: undefined,
						preferredCurrency: editingData.preferredCurrency
							? editingData.preferredCurrency
							: undefined,
						remark: editingData.remark ? editingData.remark : undefined,
						attachments:
							editingData.attachments &&
							Array.isArray(editingData.attachments) &&
							editingData.attachments.length > 0
								? editingData.attachments
								: [],
						fileList: [],
						miscellaneous: editingData?.miscellaneous && editingData?.miscellaneous
					});
				} else if (mode === 'create') {
					axios.all([getOpportunityViewApi(data), getAttachmentDetailApi(data)]).then(
						axios.spread((...responses) => {
							responses[0].data &&
								responses[1].data &&
								editingData === undefined &&
								setEditingData({
									...responses[0].data,
									attachments: responses[1].data,
									fileList: []
								});
						})
					);
					editingData &&
						setOppFormData({
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
			} else if (
				(screen === 'prospect-view' ||
					screen === 'prospect-list' ||
					screen === 'customer-view' ||
					screen === 'customer-list') &&
				mode === 'create'
			) {
				data &&
					setOppFormData({
						prospectType:
							location?.state?.refType === 'CLIENTADD'
								? 'CLIENTADD'
								: data && data.prospectDetail && data.prospectDetail.refType
								? data.prospectDetail.refType
								: data?.prospectId
								? 'PROSPECTADD'
								: undefined,
						// status:
						//   data &&
						//     data.prospectDetail &&
						//     data.prospectDetail.isOpen === "OPEN"
						//     ? "OPEN"
						//     : "CLOSE",
						status: 'OPEN',
						// stage:
						//   editingData.isOpen === "CLOSED"
						//     ? editingData.stageData_Value
						//     : undefined,
						refID:
							data?.prospectDetail?.prospectId ||
							data?.prospectId ||
							data?.customerCode ||
							data?.clientId
								? data?.prospectDetail?.prospectId ||
								  data?.prospectId ||
								  data?.customerCode ||
								  data?.clientId
								: undefined,
						relationshipManager:
							data?.prospectDetail?.relationshipManagerDataValue ||
							data?.relationshipManager ||
							data?.custRelMgr
								? data?.prospectDetail?.relationshipManagerDataValue ||
								  data?.relationshipManager ||
								  data?.custRelMgr
								: undefined,
						branch:
							data && data.prospectDetail && data.prospectDetail.branchDataValue
								? data.prospectDetail.branchDataValue
								: data?.branch
								? data?.branch
								: undefined,
						preferredCurrency:
							data && data.prospectDetail && data.prospectDetail.preferredCurrencyDataValue
								? data.prospectDetail.preferredCurrencyDataValue
								: undefined,
						attachments: data && data.attachments ? data.attachments : []
					});
			} else if (screen === 'oppo-list' && mode === 'create') {
				setOppFormData({
					prospectType: data ? data?.refType : undefined,
					refID: data ? data?.refID : undefined,
					relationshipManager: data ? data?.relationshipManagerName : undefined,
					branch: data ? data?.branchName : undefined,
					// 	refName: undefined,
					opportunityName: data ? data?.clientProspectName : undefined,
					// 	subject: undefined,
					// 	activityPurpose: undefined, //purpose
					// 	priority: undefined, //Priority
					// 	description: undefined, //Description
					// 	status: undefined,
					screenName: screen
					// 	refID: {
					// 		key: data?.refID || data?.refId,
					// 		value: data?.refID || data?.refId,
					// 		label: data?.clientProspectName
					// 	},
					// 	inviteeadd: invitee || undefined,
					// 	activityNature: 'I'
				});
			}
		}
	}, [form, editingData, cs]);

	const setMiscellaneousDataInOppFormData = (responses) => {
		if (responses && responses.length > 0) {
			if (responses[2].data && responses[2].data.miscellaneous.length > 0) {
				let miscellaneousArray = [];
				responses[2].data.miscellaneous.map((misc) => {
					let element = {
						type: misc.fieldName,
						miscellaneous: misc.fieldValue
					};
					miscellaneousArray = [...miscellaneousArray, element];
				});
				setOppFormData({ ...oppFormData, miscellaneous: miscellaneousArray });
			} else {
				setOppFormData({ ...oppFormData, miscellaneous: undefined });
			}
		} else {
			setOppFormData({ ...oppFormData, miscellaneous: undefined });
		}
	};
	oppFormData && form.setFieldsValue(oppFormData);
	const setAttachments = (attachments) => {
		setOppFormData({
			...oppFormData,
			attachments: attachments
			//  fileList: attachments,
		});
	};
	// const removeAttachment = (fileName) => {
	//   if (Array.isArray(oppFormData.attachments)) {
	//     setOppFormData({
	//       ...oppFormData,
	//       attachments: oppFormData.attachments.filter(
	//         (item) => item.fileName !== fileName
	//       ),
	//       fileList: oppFormData.fileList.filter((item) => item.name !== fileName),
	//     });
	//   }
	// };

	const handleOppFormChange = (values) => {
		if (!values.attachments) {
			setOppFormData({
				...oppFormData,
				...values
			});
		}
		if (values.attachments && values.attachments.length > 0) {
			let attachments = [];
			let attachmentsModalData = [];
			values.attachments.map((file) => {
				attachments = [
					...attachments,
					{
						// FileDescription: "Attachments",
						// FileName: file.FileName,
						// FileSize: file.FileSize,
						// MimeType: file.Mimetype,
						// FileString: file.FileString,
						// AttachmentFor: "Attachments",
						// attachedBy: user && user.userName,
						// SessionId: file.SessionId,

						FileDescription: 'Attachments',
						FileName: file.fileName,
						FileSize: file.fileSize,
						MimeType: file.mimetype,
						FileString: file.fileString,
						AttachmentFor: 'Attachments',
						attachedBy: user && user.userName,
						SessionId: file.SessionId
					}
				];
				attachmentsModalData = [
					...attachmentsModalData,
					{
						// fileDescription: "Attachments",
						fileDescription: file.fileDescription,
						fileName: file.fileName,
						fileSize: file.fileSize,
						fileType: file.fileType,
						mimeType: file.mimetype,
						fileString: file.fileString,
						attachmentFor: file.fileName,
						attachedBy: user && user.userName,
						refId: file.refId,
						refType: 'OPPORTUNITYADD',
						sessionId: file.SessionId
					}
				];
			});

			let finalAttachmentsModalData = [...attachmentsModalDataArray],
				finalAttachments = [...oppFormData.attachments];

			if (values?.operation && values?.operation === 'delete') {
				finalAttachmentsModalData = [];
				finalAttachments = [];
			}

			attachmentsModalData.forEach((file) => {
				finalAttachmentsModalData = [...finalAttachmentsModalData, file];
			});

			attachments.forEach((file) => {
				finalAttachments = [...finalAttachments, file];
			});

			setAttachmentsModalDataArray(finalAttachmentsModalData);
			setAttachments(finalAttachments);
		}
		if (
			values?.operation &&
			values?.operation === 'delete' &&
			values?.attachments &&
			values?.attachments?.length === 0
		) {
			setAttachmentsModalDataArray([]);
			setAttachments([]);
		}
		// MAY BE USEFUL IN FUTURE SO KEPING THIS FOR WHILE
		// if (values.attachments && values.attachments.fileList) {
		//   if (values.attachments.file.status === "removed") {
		//     setOppFormData({
		//       ...oppFormData,
		//       attachments: oppFormData.attachments.filter(
		//         (item) => item.fileName !== values.attachments.file.name
		//       ),
		//     });
		//   } else if (
		//     Array.isArray(values.attachments.fileList) &&
		//     values.attachments.fileList.length > 0
		//   ) {
		//     let attachments = [];
		//     values.attachments.fileList.forEach((file) => {
		//       if (file.size / 1024 / 1024 <= 1) {
		//         getBase64(file.originFileObj, (imageUrl) => {
		//           // if (Array.isArray(attachments)) {

		// attachments = [
		//   ...attachments,
		//   ...getExistingAttachments(),
		//   {
		//     refType: null,
		//     refId: null,
		//     fileDescription: "Attachments",
		//     fileName: file.originFileObj.name,
		//     fileSize:
		//       (file.originFileObj.size / 1024).toFixed(2).toString() +
		//       "KB",
		//     mimeType: file.originFileObj.type,
		//     fileString: imageUrl && imageUrl.split(",")[1],
		//     attachmentFor: "Attachments",
		//     attachedBy: user && user.userName,
		//     sessionId: "",
		//   },
		// ];
		//           setAttachments(attachments, values.attachments.fileList);
		//         });
		//       }
		//     });
		//   // }
		// // }
	};
	// const handleActionModalOkOrCancel = () => {
	//   setShowSuccessModal(false);
	// };
	const onAlertClose = () => {
		setRequiredFiled(false);
	};
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
				screenText={mode && mode === 'edit' ? 'Edit Opportunity' : 'Create Opportunity'}
				breadCrumb=''
				cancelBtnText='Cancel'
				submitBtnText='Save'
				onSubmit={handleFormSubmit}
				onCancel={() => {
					if (screen === 'view') {
						const toObject = {
							pathname: `/dashboard/MyOpportunity/OpportunityView`,
							state: {
								leadId: oppFormData.leadId,
								opportunityIds: opportunityIds,
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
				{/* <div className='parent-form-container'> */}
				{requiredFiled ? (
					<Alert
						message='Error'
						description='Mandatory field/s are blank!'
						type='error'
						closable
						onClose={setTimeout(() => {
							onAlertClose();
						}, 5000)}
					/>
				) : (
					''
				)}
				<CustomProspectTypeFormCard
					form={form}
					editData={data}
					formData={oppFormData}
					onValuesChange={handleOppFormChange}
					rules={rules.length > 0 ? rules[1] : undefined}
					csObject={csObject[1]}
					mode={mode}
					screen={screen}
					// loading={() => setLoading}
				/>
				<OpportunityDetailsFormCard
					form={form}
					formData={oppFormData}
					onValuesChange={handleOppFormChange}
					rules={rules.length > 0 ? rules[1] : undefined}
					csObject={csObject[1]}
					setFormData={setOppFormData}
					mode={mode}
				/>

				<AttachmentUploadModal
					selectedAccount={selectedAccount}
					isUpload={false}
					onValuesChange={handleOppFormChange}
					data={attachmentsModalDataArray}
					dataDetails={oppFormData}
					type='OPPORTUNITYADD'
				/>
				<MiscellaneousFormCard
					form={form}
					formData={oppFormData}
					onValuesChange={handleOppFormChange}
					rules={rules.length > 0 ? rules[2] : undefined}
					csObject={csObject[2]}
				/>
				{/* </div> */}
				{cs && <BackToTop />}
			</Space>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		user: state && state.auth && state.auth.user,
		cs: state.compOppCreate.controlStructure
	};
};

const mapDispatchToProps = { executeGetOppCreateCs };

export default connect(mapStateToProps, mapDispatchToProps)(CompOpportunityCreateScreen);

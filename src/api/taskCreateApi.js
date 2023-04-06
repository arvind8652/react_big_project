import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';
import moment from 'moment';

export const getTaskCreateCs = () => {
	return Api.get(apiRequestUrls.getTaskCreateCs);
};

export const postTaskApi = (payload) => {
	return Api.post(apiRequestUrls.postTask, payload);
};

export const postCompTaskApi = (formData) => {
	const postObject = {
		// data: {
		//   Task: {
		//     OpportunityId: formData.opportunityId || null,
		//     RefType: formData.prospectType || null,
		//     RefID: formData.refID || null,
		//     RelationshipManager: formData.relationshipManager || null,
		//     OpportunityName: formData.opportunityName || null,
		//     IsOpen: formData.status === "OPEN" ? true : false,
		//     OpportunityType: formData.opportunityType || null,
		//     ProductOrService: formData.productOrService || null,
		//     DueDate: moment(formData.expectedDate).toISOString() || null,
		//     CreationDate: moment(formData.startDate).toISOString() || null,
		//     TargetAmount: formData.targetAmount || null,
		//     PreferredCurrency: formData.preferredCurrency || null,
		//     Stage: formData.status === true ? formData.stage : formData.stage,
		//     Probability: formData.probability,
		//     Amount: formData.closureAmount || null,
		//     Age: null,
		//     UpdatedTime: null,
		//     UpdatedBy: null,
		//     Remark: formData.remark || null,
		//     RecType: null,
		//     Version: null,
		//     InputtedBy: null,
		//     InputDateTime: null,
		//     AuthorizedBy: null,
		//     AuthorizedDate: null,
		//     AuthorizedRemarks: null,
		//     Status: null,
		//     CloseDate: moment(formData.closeDate).toISOString() || null,
		//     CloseReason: formData.closeReason || null,
		//     AttachMisc: {
		//       SessionID: null,
		//       progName: "OPPORTUNITYADD",
		//     },
		//     RefTypeProspect: null,
		//     RefTypeNew: null,
		//     TargetAmountMin: null,
		//     TargetAmountMax: null,
		//     Month: null,
		//     CustProspectName: null,
		//     OpporCount: null,
		//     Branch: formData.branch || null,
		//     StartDate: null,
		//   },
		//   Misc: {
		//     Miscellaneous: formData.miscellaneous,
		//     progName: "OPPORTUNITYADD",
		//     SessionID: null,
		//     RefId: null,
		//   },
		//   Attachment: [...formData.attachments],
		// },
	};
	return Api.post(apiRequestUrls.postTask, postObject);
};

import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';
import moment from 'moment';

export const getOpportunityCreateCs = () => {
	return Api.get(apiRequestUrls.getOpportunityCreateCs);
};

export const postOpportunityApi = (payload) => {
	return Api.post(apiRequestUrls.postOpportunity, payload);
};

export const getOpportunityProbabilityApi = (stage) => {
	return Api.post(apiRequestUrls.getOpportunityCreationProbability + stage);
};

export const postCompOpportunityApi = (formData) => {
	let miscellaneous = [];
	let miscellaneous1 = [];
	if (Array.isArray(formData.miscellaneous)) {
		formData.miscellaneous.map((item) =>
			miscellaneous?.push({
				Type: item.type,
				Miscellaneous: item.miscellaneous
			})
		);
	}

	if (Array.isArray(miscellaneous) && miscellaneous.length > 0) {
		const addSrlNo = (item, index) => {
			if (item?.SrlNo) {
				delete item?.SrlNo;
			}
			let dataObject = {};
			for (const prop in item) {
				// dataObject[`${prop}`]=item[prop]
				dataObject[`${prop}`] = item[prop];
			}
			dataObject['SrlNo'] = index;
			return dataObject;
		};

		miscellaneous.map((item, index) => {
			miscellaneous1.push(addSrlNo(item, index + 1));
		});
	}
	const postObject = {
		data: {
			Opportunity: {
				OpportunityId: formData.opportunityId || null,
				RefType: formData.prospectType || null,
				RefID: formData.refID || null,
				RelationshipManager: formData.relationshipManager || null,
				OpportunityName: formData.opportunityName || null,
				IsOpen: formData.status === 'OPEN' ? true : false,
				OpportunityType: formData.opportunityType || null,
				ProductOrService: formData.productOrService || null,
				DueDate: moment(formData.expectedDate).toISOString() || null,
				CreationDate: moment(formData.startDate).toISOString() || null,
				TargetAmount: formData.targetAmount || null,
				PreferredCurrency: formData.preferredCurrency || null,
				Stage: formData.status === true ? formData.stage : formData.stage,
				Probability: formData.probability,
				Amount: formData.closureAmount || null,
				Age: null,
				UpdatedTime: null,
				UpdatedBy: null,
				Remark: formData.remark || null,
				RecType: null,
				Version: null,
				InputtedBy: null,
				InputDateTime: null,
				AuthorizedBy: null,
				AuthorizedDate: null,
				AuthorizedRemarks: null,
				Status: null,
				CloseDate: moment(formData.closeDate).toISOString() || null,
				CloseReason: formData.closeReason || null,
				AttachMisc: {
					SessionID: null,
					progName: 'OPPORTUNITYADD'
				},
				RefTypeProspect: null,
				RefTypeNew: null,
				TargetAmountMin: null,
				TargetAmountMax: null,
				Month: null,
				CustProspectName: null,
				OpporCount: null,
				Branch: formData.branch || null,
				StartDate: null
			},
			Misc: {
				Miscellaneous: miscellaneous1,
				progName: 'OPPORTUNITYADD',
				SessionID: null,
				RefId: null
			},
			Attachment: [...formData.attachments]
		}
	};

	return Api.post(apiRequestUrls.postOpportunity, postObject);
};

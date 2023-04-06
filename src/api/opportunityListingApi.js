import moment from 'moment';
import { apiRequestUrls } from '../config/apiConfig';
import { CONSTANTS } from '../constants/constants';
import { Api } from '../services/apiService';

export const getOpportunityListingCsApi = () => {
	return Api.get(apiRequestUrls.getOpportunityListingCs);
};

export const getAllOpportunityDataApi = (filters) => {
	const postObject = {
		data: {
			Opportunity: {
				TargetAmountMin: null,
				TargetAmountMax: null
			},
			Filterparam: (filters && filters.filterParam) || null,
			Sorting: (filters && filters.sorting) || null,
			Stage: (filters && filters.stage) || ['IP']
		}
	};
	return Api.post(apiRequestUrls.getAllOpportunity, postObject);
};

export const getOpportunityAdvancedFilterApi = () =>
	Api.post(apiRequestUrls.getOpportunityAdvFilter);

export const deleteSelectedOpportunityApi = (OpportunityIdArray) => {
	const postObject = {
		data: {
			OpportunityID: OpportunityIdArray
		}
	};
	return Api.post(apiRequestUrls.deleteSelectedOpportunity, postObject);
};

export const changeOpportunityStatusApi = (OpportunityIdArray, OpportunityStatus) => {
	const postObject = {
		data: {
			Opportunity: {
				OpportunityId: OpportunityIdArray
			},
			Status: OpportunityStatus
		}
	};
	return Api.post(apiRequestUrls.changeOpportunitySTatus, postObject);
};

export const addFavouriteOpportunityApi = (refId, progName) => {
	const postObject = {
		data: {
			RefType: progName,
			RefID: refId,
			ProgName: progName
		}
	};
	return Api.post(apiRequestUrls.assignFavoriteOpportunity, postObject);
};
export const updateOpportunityStageApi = (stageData) => {
	const postObject =
		stageData.stage === 'LOSS'
			? {
					data: {
						OpportunityID: Array?.isArray(stageData.records)
							? stageData.records
							: [stageData.records],
						Remark: stageData.remark || null,
						CloseReason: stageData.reason || null,
						startDate: moment().toISOString(),
						closeDate: stageData.closureDate || null
					}
			  }
			: {
					data: {
						Opportunity: {
							OpportunityId: stageData.records,
							IsOpen: stageData.status === 'OPEN' ? true : false,
							Stage: stageData.stage || null,
							Probability: Number.isInteger(stageData.probability) ? stageData.probability : null,
							PreferredCurrency: stageData.preferredCurrency || null,
							Amount: stageData.closureAmount || null,
							Remark: stageData.remark || null,
							CloseReason: stageData.reason || null,
							CloseDate: stageData.closureDate || null
						}
					}
			  };
	return Api.post(
		stageData && stageData.stage && stageData.stage === 'LOSS'
			? apiRequestUrls.postOpportunityClosedMissed
			: apiRequestUrls.updateOpportunityStageDetail,
		postObject
	);
};

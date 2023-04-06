import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getAccountCreateCs = () => Api.get(apiRequestUrls.getAccountCreateCs);

export const postAccountCs = (data) => Api.post(apiRequestUrls.postAccountCs, { data: data });

export const getQA = (accountType, accountNature, accountClassification) => {
	const postObject = {
		data: {
			AccountType: accountType,
			AccountNature: accountNature,
			AccountClassification: accountClassification
		}
	};
	return Api.post(apiRequestUrls.getRiskProfileQA, postObject);
};

export const getPortFolioQaList = (GoalName, GoalType) => {
	const postObject = {
		data: {
			GoalType,
			GoalName
		}
	};
	return Api.post(apiRequestUrls.getRiskProfileQA, postObject);
};

export const getTaxStatus = (CustomerID, category) => {
	const postObject = {
		data: {
			fieldListID: 20074,
			dependentValue: { chk_condn: category }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getClassifications = (category) => {
	const postObject = {
		data: {
			fieldListID: 20105,
			dependentValue: { chk_condn: category }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getAccountBaseAccess = (type, classification) => {
	const postObject = {
		data: {
			PortfolioType: type,
			PortfolioClassification: classification
		}
	};
	return Api.post(apiRequestUrls.getAccountBasedAccess, postObject);
};

export const getAccountDetails = (refID) => {
	const postObject = {
		data: {
			refID: refID
		}
	};
	return Api.post(apiRequestUrls.getAccountDetailsForAccountEdit, postObject);
};

export const getAccountDetailsForProfile = (refID) => {
	const postObject = {
		data: {
			refID: refID
		}
	};
	return Api.post(apiRequestUrls.getAccountDetailsForProfileAccountEdit, postObject);
};

export const getAccountData = (customerID) => {
	const postObject = {
		data: {
			fieldListID: 20108,
			dependentValue: { client_id: customerID }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getAccountNameValidation = (name) => {
	const postObject = {
		data: {
			BaseSchemeRequisition: {
				Name: name
			}
		}
	};
	return Api.post(apiRequestUrls.getAccountNameValidation, postObject);
};

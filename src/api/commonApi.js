import { apiRequestUrls } from '../config/apiConfig';
import { CONSTANTS } from '../constants/constants';
import { Api } from '../services/apiService';

export const getGlobalConfigApi = () => {
	return Api.get(apiRequestUrls.getConfig);
};
export const getDependentStageDataApi = (status) => {
	const postObject = {
		data: {
			FieldListID: 20042,
			dependentValue: {
				FIELD1: status.toUpperCase()
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};
export const getDependentNameListDataApi = () => {
	const postObject = {
		data: {
			FieldListID: 13,
			progName: CONSTANTS.progNames.PROSPECTADD,
			DependentValue: { RefType: CONSTANTS.progNames.CLIENTADD }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};
export const getDependentCustomerNameListDataApi = () => {
	const postObject = {
		data: {
			FieldListID: 25,
			DependentValue: { RefType: CONSTANTS.progNames.CLIENTADD }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getDependentLocationDataApi = (value, mode) => {
	const postObject = {
		data: {
			FieldListID: mode === 'state' ? 20043 : 20044,
			progName: CONSTANTS.progNames.PROSPECTADD,
			dependentValue: { chk_condn: value }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getDependentProspectClientDataApi = (value) => {
	const postObject = {
		data: {
			FieldListID: 12,
			progName: CONSTANTS.progNames.INTERACTIONADD,
			DependentValue: { RefType: value },
			...(value && { IsCache: true })
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getDependentNameDataApi = (value, screenType) => {
	const postObject = {
		data: {
			FieldListID: 5,
			progName: 'OPPORTUNITYADD',
			DependentValue: { RefType: value },
			...(screenType == 'opportunity' && { IsCache: true })
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getDependentTaskNameDataApi = (value) => {
	const postObject = {
		data: {
			FieldListID: 8,
			progName: 'TASKADD',
			DependentValue: { RefType: value },
			...(value && { IsCache: true })
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getDependentOppListDataApi = (value, refId) => {
	const postObject = {
		data: {
			FieldListId: 20050,
			progname: CONSTANTS.progNames.TASKADD,
			DependentValue: {
				Refid: refId,
				RefType: value
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getDependentOppNameDataApi = (value, refID) => {
	const postObject = {
		data: {
			FieldListID: 10028,
			progName: CONSTANTS.progNames.INTERACTIONADD,
			DependentValue: {
				Refid: refID,
				RefType: value
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};
export const getSourceTypeDependentDataApi = (value) => {
	const postObject = {
		data: {
			FieldListID: 2,
			dependentValue: { chk_condn: value }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};
export const getSourceNameDependentDataApi = (value) => {
	const postObject = {
		data: {
			FieldListID: 10,
			dependentValue: { prog_name: value }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getProdSerDependentDataApi = (value) => {
	const postObject = {
		data: {
			FieldListID: 10032,
			progName: 'OPPORTUNITYADD',
			dependentValue: { product_type: value }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};
export const getStatusDependentDataApi = (value) => {
	const postObject = {
		data: {
			FieldListID: 20042,
			dependentValue: {
				FIELD1: value
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getReportClientNameDependentDataApi = (value = null) => {
	const postObject = {
		data: {
			FieldListID: 20071,
			progName: null,
			dependentValue: {
				FamilyName: value
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getReportAssetTypeDependentDataApi = (value = null) => {
	const postObject = {
		data: {
			FieldListID: 20077,
			progName: null,
			dependentValue: {
				AssetGroup: value
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getReportSecurityNameDependentDataApi = (assetGroup = null, assetType = null) => {
	const postObject = {
		data: {
			FieldListID: 20075,
			progName: null,
			dependentValue: {
				AssetGroup: assetGroup,
				AssetType: assetType
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getReportClientAccountDependentDataApi = (value = null) => {
	const postObject = {
		data: {
			FieldListID: 20059,
			progName: null,
			dependentValue: {
				ClientId: value
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getReportReportNameDependentDataApi = (value = null) => {
	const postObject = {
		data: {
			fieldListID: 20085,
			progName: null,
			dependentValue: {
				MenuId: value
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const downloadAttachmentApi = (id, progName, recordId) => {
	const postObject = {
		data: {
			id: [id],
			refType: progName,
			refID: recordId
		}
	};
	return Api.post(apiRequestUrls.downloadAttachment, postObject);
};

//Relationship Manager and Branch filters
export const getRMUserApi = (value, mode) => {
	let postObject;
	mode === 'BRANCH'
		? (postObject = {
				data: {
					progName: 'BRANCH',
					DependentValue: { USER: value }
				}
		  })
		: (postObject = {
				data: {
					progName: 'USER',
					DependentValue: { BRANCH: value }
				}
		  });
	return Api.post(apiRequestUrls.getRmUserData, postObject);
};

export const getState = (country, fieldListId, progName) => {
	const postObject = {
		data: {
			FieldListId: fieldListId || 20043,
			progName: progName || 'PROSPECTADD',
			DependentValue: {
				chk_condn: country || 'IN'
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getCity = (state, FieldListID, progName) => {
	const postObject = {
		data: {
			FieldListID: FieldListID || 20044,
			progName: progName || 'PROSPECTADD',
			dependentValue: {
				chk_condn: state || 'MH'
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

//----------------Mailing Instruction  Changing Customer Type ---------//
export const getMailing = (customerType) => {
	const postObject = {
		data: {
			FieldListID: 20112,
			dependentValue: {
				chk_condn: '%' + customerType + '%'
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

//----------------Source of wealth  changing Customer Type ---------//
export const getSourceOfWealth = (customerType) => {
	const postObject = {
		data: {
			FieldListID: 20123,
			// FieldListID: baseUrl?.includes('5009') ? 20127 : 20123, //this line is temporary we will remove this in future
			dependentValue: {
				chk_condn: '%' + customerType + '%'
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};
//------------------------Mailing Location Address-----------//

export const getLocationAddress = (customerType) => {
	const postObject = {
		data: {
			FieldListID: 20113,
			dependentValue: {
				chk_condn: '%' + customerType + '%'
			}
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

//-----------------------------------//

export const getCampaignType = (sourceValue) => {
	const postObject = {
		data: {
			FieldListID: 2,
			dependentValue: { chk_condn: sourceValue }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getCampaignName = (campaignValue) => {
	const postObject = {
		data: {
			FieldListID: 10,
			dependentValue: { prog_name: campaignValue === 'WOFFICE' ? 'BRANCH' : campaignValue }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getMapProspects = () => {
	const postObject = {
		data: {
			FieldListID: 10,
			dependentValue: { prog_name: 'PROSPECTADD' }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getFatca = (type) => {
	const postObject = {
		data: {
			FieldListID: 20047,
			dependentValue: { ClientCategory: type }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getServiceProviders = (type) => {
	const postObject = {
		data: {
			FieldListID: 20107,
			dependentValue: { chk_condn: type }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getClientNameForAccountCreate = () => {
	const postObject = {
		data: {
			FieldListId: 20058,
			progName: 'ACCOUNTREQADD',
			IsCache: true,
			DependentValue: {
				RefType: 'CLIENTADD'
			}
		}
	};

	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getBranch = (bankName) => {
	const postObject = {
		data: {
			FieldListID: 20053,
			dependentValue: { BankName: bankName }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getClientAccounts = (clientId) => {
	const postObject = {
		data: {
			FieldListID: 20063,
			dependentValue: { client_id: clientId }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getCreditAccounts = (schemeId) => {
	const postObject = {
		data: {
			FieldListID: 20064,
			dependentValue: { scheme: schemeId }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getSecuritiesForIssuer = (issuerId, asset_group) => {
	const postObject = {
		data: {
			fieldListID: 20062,
			dependentValue: { asset_type: '', issuer: issuerId, asset_group: asset_group }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getSecuritiesForIssuerOGT = (issuerId, asset_group) => {
	const postObject = {
		data: {
			fieldListID: 20092,
			dependentValue: { asset_type: '', issuer: issuerId, asset_group: asset_group }
		}
	};
	return Api.post(apiRequestUrls.getDependentDataOGT, postObject);
};

export const getClientKYCPrimSecId = (customerType) => {
	const postObject = {
		data: {
			fieldListID: 20104,
			progName: 'CLIENTREQADD',
			dependentValue: { chk_condn: customerType }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};
export const getProspectPrimId = (prospectType) => {
	const postObject = {
		data: {
			fieldListID: 20122,
			progName: 'PROSPECTADD',
			dependentValue: { chk_condn: prospectType }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};
export const getDependentData = (fieldListId, customerType) => {
	const postObject = {
		data: {
			fieldListID: fieldListId,
			progName: 'CLIENTREQADD',
			dependentValue: { chk_condn: customerType }
		}
	};
	return Api.post(apiRequestUrls.getDependentData, postObject);
};

export const getMiscellaneousDetails = (refType, refID) => {
	return Api.get(apiRequestUrls.getMiscellaneousDetails(refType, refID));
};

export const getSecurityListDetails = (postObject) =>
	Api.post(apiRequestUrls.getSecurityListDetails, postObject);

export const getClientInfo = (postObject) => Api.post(apiRequestUrls.getClientInfo, postObject);

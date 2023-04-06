import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getCustomerCreateCs = () => {
	return Api.get(apiRequestUrls.getCustomerCreateCs);
};

export const createNewFamilyName = (familyName) => {
	const postObject = {
		data: {
			Name: familyName
		}
	};
	return Api.post(apiRequestUrls.createNewFamilyName, postObject);
};

export const isHeadOfTheFamily = (familyName) => {
	const postObject = {
		data: {
			Family: familyName
		}
	};
	return Api.post(apiRequestUrls.isHeadOfTheFamily, postObject);
};

export const getCustomerDetails = (refID, refType = 'CLIENTREQADD') => {
	const postObject = {
		data: {
			refType: refType,
			refID
		}
	};
	if (refType === 'CLIENTREQADD') {
		return Api.post(apiRequestUrls.getCustomerOnboardingView, postObject);
	} else {
		return Api.post(apiRequestUrls.getCustomerDetailsForCustomer, postObject);
	}
};

// export const getCustomerDetails = (refID) => {
//   const postObject = {
//     data: {
//       // refType: "CLIENTREQADD",
//       refType:"CLIENTADD",

//       refID,
//     },
//   };
//   return Api.post(apiRequestUrls.getCustomerOnboardingView, postObject);
// };

export const getDocumentDetails = (documentRequestObject) => {
	return Api.post(apiRequestUrls.getDocumentDetails, documentRequestObject);
};

export const getQuestionAnswerList = (
	formData,
	screen
	// customerType,
	// customerCategory,
	// residentialStatus
) => {
	let postObject;
	if (screen === 'PROSPECT') {
		postObject = {
			data: {
				CustomerType: formData?.prospectType,
				CustomerCategory:
					formData?.prospectType === 'I'
						? formData?.individualCategory
						: formData?.corporateCategory,
				Applicable: 'P'
			}
		};
	}
	if (screen === 'CUSTOMER') {
		postObject = {
			data: {
				CustomerType: formData?.customerType,
				CustomerCategory: formData?.category,
				ResidentialStatus: formData?.residentialStatus
			}
		};
	}

	return Api.post(apiRequestUrls.getQuestionAnswerList, postObject);
};

export const getAttachmentsDetails = (progName, customerCode) =>
	Api.get(apiRequestUrls.getAttachmentDetails(progName, customerCode));

export const getRelationshipDetails = (progName, customerCode) => {
	const postObject = {
		data: {
			refType: 'CLIENTREQADD',
			refID: customerCode
		}
	};

	return Api.post(apiRequestUrls.getRelationshipDetails, postObject);
};

export const getMiscellaneousDetailsForCustomer = (progName = 'CLIENTREQADD', customerCode) => {
	return Api.get(apiRequestUrls.getMiscellaneousDetails(progName, customerCode));
};

export const getAttachmentDetailsForCustomer = (progName = 'CLIENTADD', customerCode) => {
	return Api.get(apiRequestUrls.getAttachmentDetails(progName, customerCode));
};

export const calculateScore = (answers, riskProfileData) => {
	const postObject = {
		data: {
			riskProfileModel: {
				lstQuestionsAnswers: answers,
				recommendedCategoryCode: null,
				lstCategories: [],
				nonRecommendedCategory: null,
				score: null,
				riskID: riskProfileData.riskID,
				riskProfileFor: riskProfileData.riskProfileFor
			}
		}
	};
	return Api.post(apiRequestUrls.calculateScore, postObject);
};

export const postCustomerApi = (formData) => {
	let miscellaneous = [];
	let miscellaneous1 = [];
	let bankDetails = [];
	let socialDetails = [];
	let attachments = [];
	let relationDetail = [];
	let isBlanketWaiverVal = null;
	let titleVal = null;
	let splitValueforBranch = formData?.sourceType === 'BRANCH' && formData?.sourceValue.split('-');

	if (formData?.isBlanketWaiver === true || formData?.isBlanketWaiver === 'Y') {
		isBlanketWaiverVal = 'Y';
	}
	if (formData?.isBlanketWaiver === false || formData?.isBlanketWaiver === 'N') {
		isBlanketWaiverVal = 'N';
	}

	if (Array.isArray(formData.relationDetail) && formData.relationDetail.length > 0) {
		const addSrlNo = (item, index) => {
			let relationCustomerName = item.relationName;
			if (item?.SrlNo) {
				delete item?.SrlNo;
				delete item?.relationName;
			}
			let dataObject = {};
			for (const prop in item) {
				// dataObject[`${prop}`]=item[prop]
				dataObject[`${prop}`] = item[prop];
			}
			if (item?.isCustomer && item?.relationNameID) {
				dataObject['relationName'] = item?.relationNameID;
			} else {
				dataObject['relationName'] = relationCustomerName;
			}
			if (item?.relationNameID) {
				// delete item?.relationNameID
				delete dataObject?.relationNameID;
			}
			dataObject['SrlNo'] = index;
			return dataObject;
		};

		formData.relationDetail.map((_, index) => {
			relationDetail.push(addSrlNo(_, index + 1));
		});
	}

	if (formData.attachments && formData.attachments.length > 0) {
		if (Array.isArray(formData.attachments)) {
			attachments = formData.attachments.map((_) => ({
				attachmentFor: _.attachmentFor,
				fileDescription: _.fileDescription,
				fileName: _.fileName,
				fileSize: _.fileSize,
				fileString: _.fileString,
				fileType: _.fileType,
				mimeType: _.mimeType,
				refId: _.refId,
				refType: _.refType,
				sessionType: _.sessionType
			}));
		}
	}
	if (formData.profileImage) {
		// attachments.push(formData.profileImage.file);
		attachments.push(formData.profileImage);
	}

	// if (Array.isArray(formData.miscellaneous)) {
	//   miscellaneous = formData.miscellaneous.map((_) => ({
	//     Type: _.type,
	//     Miscellaneous: _.miscellaneous,
	//     IsMiscellaneousSection:"Y",
	//   }));
	// }

	if (Array.isArray(formData.miscellaneous)) {
		formData.miscellaneous.map((_) =>
			miscellaneous.push({
				Type: _.type,
				Miscellaneous: _.miscellaneous,
				IsMiscellaneousSection: 'Y'
			})
		);
	}

	if (Array.isArray(formData?.relatedParty)) {
		formData?.relatedParty.map((_) =>
			miscellaneous.push({
				Type: 'relatedParty',
				Miscellaneous: _.dataValue,
				IsMiscellaneousSection: 'N'
			})
		);
	}

	if (Array.isArray(formData?.communicationPre)) {
		formData?.communicationPre.map((_) =>
			miscellaneous.push({
				Type: 'communicationPre',
				// Miscellaneous: _.data_value,
				Miscellaneous: _.dataValue,
				IsMiscellaneousSection: 'N'
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

		miscellaneous.map((_, index) => {
			miscellaneous1.push(addSrlNo(_, index + 1));
		});
	}

	if (Array.isArray(formData.bankDetails)) {
		bankDetails = formData.bankDetails.map((_) => ({
			ClientId: _.clientId,
			CustBankId: _.custBankId,
			SrlNo: _.srlNo,
			BankName: _.bankName,
			Branch: _.branch,
			AccountType: _.accountType,
			AccountNo: _.accountNumber,
			Currency: _.currency,
			AccountStatus: _.status,
			Remarks: _.remarks
		}));
	}

	if (formData?.socialList) {
		const objFormat = {
			Id: null,
			// RefType: "CLIENTADD",
			// RefType: formData?.refType? formData?.refType:'CLIENTADD',
			RefType: 'CLIENTREQADD',
			RefId: null,
			SocialMediaType: '',
			SocialMediaValue: '',
			SrlNo: 1,
			RecType: null,
			Version: null,
			AuthorizedRemarks: null,
			Status: null
		};

		const social_media_types = [
			// { key: "WhatsApp", value: formData?.socialList?.mobileNo },
			{
				key: 'LinkedIn',
				value: formData?.socialList?.LinkedIn ? formData?.socialList?.LinkedIn : formData?.LinkedIn
			},
			{
				key: 'Facebook',
				value: formData?.socialList?.Facebook ? formData?.socialList?.Facebook : formData?.Facebook
			},
			// { key: "Viber", value: formData?.socialList?.mobileNo },
			{
				key: 'Twitter',
				value: formData?.socialList?.Twitter ? formData?.socialList?.Twitter : formData?.Twitter
			}
		];

		if (formData?.whatsApp) {
			// if (formData?.socials?.includes('WhatsApp')) {
			social_media_types.push({
				key: 'WhatsApp',
				value: formData?.socialList?.mobileNo ? formData?.socialList?.mobileNo : formData?.mobileNo
			});
		}
		if (formData?.viber) {
			// if (formData?.socials?.includes('Viber')) {
			social_media_types.push({
				key: 'Viber',
				value: formData?.socialList?.mobileNo ? formData?.socialList?.mobileNo : formData?.mobileNo
			});
		}

		socialDetails = social_media_types.map((item, idx) => ({
			...objFormat,
			SocialMediaType: item?.key,
			SocialMediaValue: item.value,
			SrlNo: idx + 1
		}));
	}

	if (formData?.title) {
		let titleVal1 = formData?.title?.split('|');
		titleVal = titleVal1[0];
	}
	const postObject = {
		data: {
			ClientRequisition: {
				ClientId: formData?.clientId ? formData.clientId : '',
				otherIdNo: formData?.otherIdNo,
				// Title: formData?.title,
				Title: titleVal,
				FirstName: formData?.firstName,
				SecondName: formData?.secondName,
				ThirdName: formData?.thirdName,
				Suffix: formData?.suffix,
				surName: formData?.surName,
				familyName: formData?.surName,
				// DateOfBirth: formData?.dob,
				DateOfBirth:
					typeof formData?.dateOfBirth === 'object'
						? formData?.dateOfBirth?.format('YYYY-MM-DD')
						: formData?.dateOfBirth || null,
				Gender: formData?.gender,
				LegalStatus: formData?.category,
				Nationality: formData?.nationality,
				ResidentStatus: formData?.residentialStatus,
				MaritalStatus: formData?.maritalStatus,
				TelephoneHome: formData?.socialList?.telephoneHome
					? formData?.socialList?.telephoneHome
					: formData?.telephoneHome,
				MobileNo: formData?.socialList?.mobileNo
					? formData?.socialList?.mobileNo
					: formData?.mobileNo,
				EMail: formData?.socialList?.eMail ? formData?.socialList?.eMail : formData?.eMail,
				WhatsApp: formData?.socialList?.WhatsApp
					? formData?.socialList?.WhatsApp
					: formData?.WhatsApp,
				PermAdd1: formData?.permAdd1,
				PermCity: formData?.permCity,
				PermCountry: formData?.permCountry,
				PermAddPin: formData?.permAddPin,
				MailAdd1: formData?.mailAdd1,
				MailCity: formData?.mailCity,
				MailCountry: formData?.mailCountry,
				MailAddPin: formData?.mailAddPin,
				CompAdd1: formData?.compAdd1,
				CompAdd3: formData?.compAdd3, // for State
				CompAdd2: formData?.compAdd2, // for preferredBranch
				CompCity: formData?.compCity,
				CompCountry: formData?.compCountry,
				CompAddPin: formData?.compAddPin,
				IdExpDate: formData?.idExpDate || null,
				riskCategoryAmlaName: formData?.riskCategoryAmla,
				Idissuedate: formData?.idissuedate || null,
				CustRelMgr: formData?.custRelMgr,
				Remarks: formData?.remarks,
				// Salutation: formData?.title,
				Salutation: titleVal,
				Occupation: formData?.occupation,
				ProspectId: formData?.prospectId,
				RiskAppetite: formData?.riskAppetite,
				IdNo: formData?.idNo,
				IdType: formData?.idType,
				RelType: formData?.relType,
				Currency: formData?.currency,
				ConvertedOn: formData?.convertedOn,
				SourceNetworth: formData?.sourceOfFund, //formData?.sourceNetworth,
				Networth: formData?.networth || null,
				Income: formData?.income,
				ActiveYn: formData?.activeYn,
				ClientType: formData?.clientType,
				FatcaClassification: formData?.fatcaClassification,
				Branch: formData?.branch,
				CustomerType: formData?.customerType,
				HeadOfFamily: formData.headOfFamily ? 'Y' : 'N',
				Rm2: formData?.rm2 || null,
				Rm3: formData?.rm3 || null,
				BankAccbranch: formData?.bankAccbranch,
				PermanentState: formData?.permanentState,
				Mailstate: formData?.mailState,
				Reference: formData?.reference,
				source: formData?.source,
				SourceType: formData?.sourceType,
				SourceValue:
					formData?.sourceType === 'BRANCH' ? splitValueforBranch[0] : formData?.sourceValue,
				// formData?.sourceType === 'BRANCH' ? splitValueforBranch[1] : null,
				SourcedBy: formData?.sourcedBy,
				SourceOfFundsOth:
					formData?.sourceType === 'BRANCH' ? splitValueforBranch[1] : formData?.sourceOfFundsOth,
				Longitude: formData?.longitude,
				Latitude: formData?.latitude,
				DialCode: formData?.socialList?.dialCode
					? formData?.socialList?.dialCode
					: formData?.dialCode,
				AlternateDialCode: formData?.socialList?.alternateDialCode
					? formData?.socialList?.alternateDialCode
					: formData?.alternateDialCode,
				TaxStatus: formData?.taxStatus || null,
				PotentiallyVulnerable: formData?.potentiallyVulnerable,
				BannedList: formData?.bannedList,
				ReferrerName: formData?.referrerName,
				// SourcedBy: formData?.sourcedBy,
				Natureofbusiness: formData?.natureOfBusiness,
				// RiskCategoryAmla: formData?.pep,
				riskCategoryAmla: formData?.riskCategoryAmla,
				Event: formData?.event,
				// InvestmentValue: formData?.investmentValue,
				InvestmentValue: parseInt(formData?.investmentValue),
				Amla: formData?.Amla,
				IsExistingCustomer: formData?.isExistingCustomer,
				SocialList: socialDetails,
				// new fields
				Frequency: formData?.frequency,
				Location: formData?.location,
				MailingPreference: formData?.mailingPreference,
				City: formData?.city,
				Country: formData?.country,
				RelatedPartyYn: 'Y',
				RiskCategory: formData?.riskCategory,
				SubType: formData?.subType,
				Suffix: formData?.suffix,
				// SourceOfFundsOth: formData?.sourceOfFundsOth,

				EmployerName: formData?.employerName,
				EmployeeId: formData?.employeeId,
				// RelatedParty: formData?.relatedParty,
				// Communicationpre:formData?.communicationpre,
				PrimaryIssuanceDate: formData?.primaryIssuanceDate || null,
				SecId: formData?.secId,
				SecIdExpdt: formData?.secIdExpdt || null,
				SecIdNo: formData?.secIdNo,
				SecondaryIssuanceDate: formData?.secondaryIssuanceDate || null,
				RiskScore: formData?.riskScore || null,
				Tin: formData?.tin?.toString(),
				DeliveryInstr: formData?.deliveryInstr,
				AuthorizedPerson: formData?.authorizedPerson,
				DeliverToRm: formData?.deliverToRm ? 'Y' : 'N',
				OtherInstruction: formData?.otherInstruction,
				Qib: formData?.qib,
				IsBlanketWaiver: isBlanketWaiverVal,
				// SophisticatedYn: formData?.riskProfileModel?.sophisticatedYn,
				// SophisticatedYn: formData?.riskProfileModel?.sophisticatedYn,
				SophisticatedYn: formData?.sophisticatedYn
					? formData?.sophisticatedYn
					: formData?.riskProfileModel?.sophisticatedYn,
				// ClientRequisitionN:formData?.clientRequisitionN
				PhyschlgdMinor: formData?.physchlgdMinor ?? null,
				Race: formData?.race ?? null // Bank Email ID
			},
			Misc: {
				Miscellaneous: miscellaneous1,
				// RelatedParty:formData?.relatedParty,
				// Communicationpre:formData?.communicationpre,
				// Miscellaneous: formData.miscellaneous,

				progName: 'CLIENTREQADD',
				SessionID: null,
				RefId: null
			},
			Attachment: attachments,
			// RiskProfileModel: formData.riskProfileModel,
			// RiskProfileModel: formData?.riskProfileModel ? formData?.riskProfileModel : null,
			RiskProfileModel: formData?.riskProfileModel
				? typeof formData?.riskProfileModel === 'object' &&
				  Object.keys(formData?.riskProfileModel).length > 0
					? formData?.riskProfileModel
					: null
				: null,
			// RelationDetail: formData.relationDetail
			//   ? [...formData.relationDetail]
			//   : [],
			RelationDetail: relationDetail,
			DocumentInfo: formData.DocumentInfo ? { lstDocumentInfo: formData.DocumentInfo } : {},
			BankDetails: bankDetails
		}

		// formData?.action==="edit" && data?.ClientRequisition?.ClientRequisitionN=formData?.clientRequisitionN;
	};
	if (formData?.action === 'edit') {
		postObject.data.ClientRequisition.ClientRequisitionN = formData?.clientRequisitionN;
	}
	return Api.post(apiRequestUrls.postCustomer, postObject);
};

export const getCifValidation = (id = null, cif, action, refType, clientRequisitionN) => {
	let postObject;
	if (action === 'create' || action === 'convert') {
		postObject = {
			clientRequisition: {
				Id: id,
				ClientId: '',
				otherIdNo: cif
			}
		};
	}
	if (action === 'edit') {
		postObject = {
			clientRequisition: {
				Id: id,
				ClientId: clientRequisitionN,
				otherIdNo: cif
			}
		};
	}
	// if(action==="edit"&& refType==="CLIENTADD"){
	//   postObject = {
	//    clientRequisition: {
	//      Id: id,
	//      ClientRequisitionN:clientRequisitionN,
	//      otherIdNo:cif
	//    },
	//  };
	// }

	return Api.post(apiRequestUrls.getCifValidation, { data: postObject });
};

import moment from 'moment';
import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getProspectCreateCsApi = () => {
	return Api.get(apiRequestUrls.getProspectCreateCs);
};

export const postProspectApi = (formData, overwrite, prospectId = null) => {
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

		miscellaneous.forEach((item, index) => {
			miscellaneous1.push(addSrlNo(item, index + 1));
		});
	}

	const postObject = {
		data: {
			prospect: {
				Id: null,
				ProspectId: formData.prospectId ? formData.prospectId : null,
				CifNumber: formData.cifnumber ? formData.cifnumber : null,
				RelationshipManager: formData.relationshipManager || null,
				Branch: formData.branchName || null,
				Type: formData.prospectType,
				Salutation: formData.prospectType === 'I' ? formData.title : null,
				FirstName:
					formData.prospectType === 'I'
						? formData.individualFirstName
						: formData.corporateCompanyName,
				MiddleName:
					formData.prospectType === 'I'
						? formData.individualMiddleName
						: formData.corporateContactPerson,
				LastName:
					formData.prospectType === 'I'
						? formData.individualLastName
						: formData.corporateContactPersonDetails,
				DateofBirthCorp:
					formData.prospectType === 'I'
						? moment(formData.individualDob).toISOString()
						: moment(formData.corporateDoi).toISOString(),
				Category:
					formData.prospectType === 'I' ? formData.individualCategory : formData.corporateCategory,
				Nationality:
					formData.prospectType === 'I'
						? formData.individualNationality
						: formData.corporateNationality,
				Gender: formData.prospectType === 'I' ? formData.individualGender : null,
				Mobile: formData.contact || null,
				Email: formData.emailId || null,
				Address: formData.address || null,
				Country: formData.country || null,
				State: formData.state || null,
				City: formData.city || null,
				ZipCode: formData.zipCode || null,
				PrimaryId: formData.primaryId || null,
				PrimaryIdnumber: formData.primaryIdnumber || null,
				ExpiryDate: formData?.expiryDate ? moment(formData.expiryDate).format('YYYY-MM-DD') : null,
				RiskCategory: formData.riskCategory || null,
				RiskScore: formData.riskScore || null,
				Source: formData.source || null,
				SourceType: formData.sourceType || null,
				SourcedBy: formData?.sourcedBy || null,
				SourceValue: formData.sourceName || null,
				suffix: formData?.individualSuffix || null,
				QualificationStatus: formData.qualificationStatus || null,
				Interestlevel: formData.interestLevel || null,
				PreferredCurrency: formData.preferredCurrency || null,
				Remark: formData.remarks || null,
				ReasonCreateRecord: null,
				ConversionDate: null,
				ReasonUpdateStatus: null,
				RecType: null,
				Version: null,
				AuthorizedRemarks: null,
				Status: 'O',
				Region: 'NCR',
				RefId: null,
				IsActive: formData.status ? (formData.status === 'Active' ? true : false) : true,
				DialCode: formData.countryCode ? formData.countryCode : null,
				AlternateDialCode: formData.altCountryCode ? formData.altCountryCode : null,
				MapLocation: null,
				AttachMisc: {
					progName: 'PROSPECTADD'
				},
				SocialList: [
					{
						Id: null,
						RefType: 'PROSPECTADD',
						RefId: null,
						SocialMediaType: 'WhatsApp',
						SocialMediaValue: formData.whatsApp ? formData.whatsApp.toString() : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: '',
						RefId: null,
						SocialMediaType: 'Viber',
						SocialMediaValue: formData.viber ? formData.viber.toString() : null,
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: '',
						RefId: null,
						SocialMediaType: 'Facebook',
						SocialMediaValue: formData.facebook ? formData.facebook : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: 'PROSPECTADD',
						RefId: null,
						SocialMediaType: 'Twitter',
						SocialMediaValue: formData.twitter ? formData.twitter : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: 'PROSPECTADD',
						RefId: null,
						SocialMediaType: 'LinkedIn',
						SocialMediaValue: formData.linkedIn ? formData.linkedIn : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					}
				],
				ProspectStatus: null,
				AlternateNumber: formData.alternateContact ? formData.alternateContact : null,
				ConversationDate: null,
				ReferenceName: null
			},
			Misc: {
				// Miscellaneous: formData.miscellaneous,
				Miscellaneous: miscellaneous1,
				progName: 'PROSPECTADD',
				SessionID: null,
				RefId: null
			},
			RelationDetail:
				formData?.relationDetail?.length > 0
					? formData?.relationDetail?.map((item, index) => {
							return {
								SrlNo: index + 1,
								...item,
								relationName: item.isCustomer ? item.relationNameID : item.relationName
							};
					  })
					: [],
			Attachment:
				formData.profileImageAttachment && formData.profileImageAttachment !== null
					? [formData.profileImageAttachment, ...formData.attachments]
					: formData.attachments,
			DocumentInfo: {
				lstDocumentInfo: formData?.DocumentInfo
			},
			RiskProfileModel: formData?.riskProfileModel || null,
			isOverwrite: overwrite ? true : formData.isOverwrite ? true : false
		}
	};
	return Api.post(apiRequestUrls.postProspect, postObject);
};

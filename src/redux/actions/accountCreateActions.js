import {
	SET_ACCOUNT_CREATE_CS,
	SET_ACCOUNT_DETAILS,
	SET_ACCOUNT_DETAILS_PROFILE
} from './actionTypes';
import {
	getAccountCreateCs,
	postAccountCs,
	getAccountDetails,
	getAccountDetailsForProfile
} from '../../api/accountCreateApi';
import { store } from '../configureStore';

// export const executeGetCustomerCreateCs = () => {
//     getCustomerCreateCs()
//         .then((res) => {
//             res.data && store.dispatch(setCustomerCreateCs(res.data.csList));
//         })
//         .catch((err) => {
//         });
// };

const setAccountCreateCs = (payload) => ({
	type: SET_ACCOUNT_CREATE_CS,
	payload
});

const setAccountDetails = (payload) => ({
	type: SET_ACCOUNT_DETAILS,
	payload
});

const setAccountDetailsProfile = (payload) => ({
	type: SET_ACCOUNT_DETAILS_PROFILE,
	payload
});

const addSrlNo = (item, index) => {
	if (item?.SrlNo) {
		delete item?.SrlNo;
	}
	let dataObject = {};
	for (const prop in item) {
		dataObject[`${prop}`] = item[prop];
	}
	dataObject['SrlNo'] = index;
	return dataObject;
};

export const executeGetAccountCreateCs = async () => {
	try {
		const response = await getAccountCreateCs();
		if (response.data) {
			store.dispatch(setAccountCreateCs(response.data));
		}
	} catch (error) {
		console.log('GET ACCOUNT CREATE CS ERROR', error);
	}
};

export const executeGetAccountDetails = async (refID) => {
	try {
		const response = await getAccountDetails(refID);
		if (response.data) {
			store.dispatch(setAccountDetails(response.data));
		}
	} catch (error) {}
};

export const executeGetProfileAccountDetails = async (refID) => {
	try {
		const response = await getAccountDetailsForProfile(refID);
		if (response.data) {
			store.dispatch(setAccountDetailsProfile(response.data));
		}
	} catch (error) {}
};

export const executePostAccount = (formData) => {
	// const jointHolder = Array.isArray(formData?.holdingAccount) ? formData?.holdingAccount?.map(e => ({ jointId: e, WsjointDetailsId: '' })) : [];

	let isBlanketWaiverVal = null;
	let miscellaneous = [];
	let miscellaneous1 = [];
	let holdingAccount1 = [];

	if (formData?.isBlanketWaiver === true) {
		isBlanketWaiverVal = 'Y';
	}
	if (formData?.isBlanketWaiver === false) {
		isBlanketWaiverVal = 'N';
	}

	const bankDetails = Array.isArray(formData?.bankDetails)
		? formData.bankDetails.map((_) => ({
				ClientId: formData?.name || ' ',
				CustBankId: _.custBankId,
				SrlNo: _.srlNo,
				BankName: _.bankName,
				Branch: _.branch,
				AccountType: _.accountType,
				AccountNo: _.accountNo,
				Currency: _.currency,
				AccountStatus: _.accountStatus,
				Remarks: _.remarks,
				BankAccNo: _?.bankAccNo,
				// Default: _?.default
				DefaultYN: _?.defaultYN === 'Y' || _?.defaultYN === true ? 'Y' : 'N'
		  }))
		: [];

	if (Array.isArray(formData.miscellaneous)) {
		formData.miscellaneous.map((item) =>
			miscellaneous?.push({
				Type: item.type,
				Miscellaneous: item.miscellaneous
			})
		);
	}

	if (Array.isArray(formData?.holdingAccount) && formData?.holdingAccount?.length > 0) {
		formData?.holdingAccount.map((item, index) => {
			holdingAccount1.push(addSrlNo(item, index + 1));
		});
	}

	if (Array.isArray(miscellaneous) && miscellaneous.length > 0) {
		// const addSrlNo = (item, index) => {
		// 	if (item?.SrlNo) {
		// 		delete item?.SrlNo;
		// 	}
		// 	let dataObject = {};
		// 	for (const prop in item) {
		// 		// dataObject[`${prop}`]=item[prop]
		// 		dataObject[`${prop}`] = item[prop];
		// 	}
		// 	dataObject['SrlNo'] = index;
		// 	return dataObject;
		// };

		miscellaneous.map((item, index) => {
			miscellaneous1.push(addSrlNo(item, index + 1));
		});
	}
	// could be used in future
	// let subAssetArray = [];
	// formData.securityAccountDetails.map(ele => {
	//   let subAssetObj={};
	//   ele.subAssetClass.map(asset => {
	//     subAssetObj.DataValue = asset;
	//     subAssetObj.DisplayValue = "";
	//     subAssetArray.push(subAssetObj);
	//   })
	// })
	const securityAccountDetails = formData?.securityAccountDetails?.map((e) => {
		return {
			Type: e.type,
			ServiceProvider: e.serviceProvider,
			AccountNumber: e.accountNumber,
			SubAssetClass: {
				DataValue: e.subAssetClass
			},
			AccStatus: e.accountStatus,
			Remark: e.remarks,
			SrlNo: e.srlNo
		};
	});

	const postData = {
		BaseSchemeRequisition: {
			ClientID: formData?.name || '',
			Scheme: formData?.scheme || '',
			Name: formData?.accountName || '',
			IncomeGrowth: formData?.type || '',
			SchemeType: formData?.nature || '',
			FundClassification: formData?.classification || '',
			// ModeOfOperation: formData?.modeOfOperation || '',
			HoldingPattern: formData?.holdingPattern || '',
			InvestmentManager: formData?.relationshipManager || '',
			InvestmentManagerN: formData?.secondaryRelationshipManager || '',
			InvestmentManager3: formData?.serviceRelationshipManager || '',
			Branch: formData?.branch,
			Stkexindex: formData?.benchmark || '',
			ProductCode: formData?.productCode || '',
			PrimaryExternalRm: formData?.primaryExternalRM || '',
			SecondaryExternalRm: formData?.secondaryExternalRM || '',
			InvestmentAccess: formData?.investmentAccess || '',
			Currency: formData?.reportingCurrency || '',
			Remark: formData?.otherDetailsRemarks || '',
			Event: 'M',
			MailingPreference: formData?.MailingPreference || '',
			DeliveryInstructions: formData?.DeliveryInstructions || '',
			DeliverToRm: formData?.DeliverToRm || '',
			Frequency: formData?.Frequency || '',
			Location: formData.LocationAndAddress || '',
			AuthorisedPerson: formData.AuthorisedPerson || '',
			// OtherInstructions: formData.OtherInstruction || '',
			OtherInstructions: formData.otherInstructions || '',
			TaxStatus: formData.TaxStatus || '',
			ReferralBranch: formData.ReferralBranch || '',
			SourceOfFund: formData.SourceOfFund || '',
			MarketAccess: formData.marketAccess || '',
			IsBlanketWaiver: isBlanketWaiverVal,
			SophisticatedYn: formData?.riskProfileModel?.sophisticatedYn,
			LinkedAccount: formData?.LinkAccount || '',
			BlockYN: formData?.blockYN
		},
		// JointHolder: formData?.holdingAccount ? formData?.holdingAccount : [],
		JointHolder: holdingAccount1,
		Misc: {
			Miscellaneous: miscellaneous1,
			progName: 'ACCOUNTREQADD',
			SessionID: null,
			RefId: null
		},
		Attachment: formData.attachments ? formData?.attachments : [],
		DocumentInfo: {
			lstDocumentInfo: formData.DocumentInfo ? formData.DocumentInfo : []
		},
		// RiskProfileModel: formData?.riskProfileModel ? formData?.riskProfileModel : null,
		RiskProfileModel:
			formData?.riskProfileModel !== null &&
			formData?.riskProfileModel !== undefined &&
			typeof formData?.riskProfileModel === 'object'
				? Object?.keys(formData?.riskProfileModel).length > 0
					? formData?.riskProfileModel
					: null
				: null,

		SecurityAccountDetails: securityAccountDetails || [],
		BankDetails: bankDetails
	};
	return postAccountCs(postData);
};

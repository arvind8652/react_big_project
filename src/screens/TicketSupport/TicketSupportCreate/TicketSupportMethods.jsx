import { executeDependentDataApi } from '../../../redux/actions/ticketSupportCreateActions';

export const cleaningData = (data) => {
	let cleanData = [];
	data?.lookUpValues?.forEach((element) => {
		cleanData.push({ key: element[data?.returnColumn], value: element[data?.displayColumn] });
	});
	return cleanData;
};

export const getDependentData = async (fieldListID, dependentValue) => {
	let dependentValueArrayData = dependentValue.map((data) => ({
		[Object.keys(data)[0]]: Object.values(data)[0].toString()
	}));
	let dependentValueObjData = Object.assign({}, ...dependentValueArrayData);

	try {
		const response = await executeDependentDataApi(fieldListID, dependentValueObjData);
		return cleaningData(response?.data);
	} catch (error) {
		console.log(error);
	}
};

const createNewInstanceObject = (objData) => {
	let newObj = new Object();
	newObj = { ...objData };
	return newObj;
};

export const getOptionVal = (fieldData) => {
	let optionsVal = [];
	if (fieldData?.dropDownValue) {
		fieldData?.dropDownValue?.forEach((element) => {
			optionsVal.push({
				key: element.dataValue,
				value: element.displayValue
			});
		});
	} else if (fieldData?.lookupValue?.lookUpValues) {
		let optionsValWithAutoCompleteData = {};
		let returnVal = fieldData?.lookupValue?.returnColumn;
		let displayVal = fieldData?.lookupValue?.displayColumn;

		fieldData?.lookupValue?.lookUpValues?.forEach((element) => {
			Object?.entries(element)?.forEach(([key, value]) => {
				if (key !== returnVal && key !== displayVal) {
					optionsValWithAutoCompleteData[key] = value;
				}
			});
			optionsValWithAutoCompleteData['key'] = element[returnVal];
			optionsValWithAutoCompleteData['value'] = element[displayVal];
			optionsVal.push(createNewInstanceObject(optionsValWithAutoCompleteData));
		});
	}
	return optionsVal;
};

const getDependentFilterVal = (formData, depenedentObj) => {
	let dependentValue = [];
	Object?.keys(formData)?.filter((data) => {
		if (depenedentObj?.dependentColumn === data) {
			dependentValue.push({ [data]: formData[data] });
		}
	});
	return dependentValue;
};

export const handleFocusChange = async (fields, formData) => {
	let dependentValue = getDependentFilterVal(formData, fields);
	if (dependentValue?.length > 0) {
		return await getDependentData(fields?.fieldlstId, dependentValue);
	}
	return;
};

export const filterPostData = (postData) => {
	let postObj = {
		ServiceTicket: {
			Serviceticketid: null,
			Refid: postData?.RefID ?? null,
			Reftype: postData?.RefType ?? null,
			Valuedate: postData?.TicketDate ?? null,
			Raisedby: null,
			SubjectCode: postData?.Subject ?? null,
			ServiceType: postData?.SERVICETYPE ?? null,
			Priority: postData?.Priority ?? null,
			Description: postData?.Comment ?? null,
			Status: null,
			OverallStatus: postData?.TicketStatus ?? null,
			Isresolved: postData?.IsResolved ?? null,
			Feedback: postData?.FEEDBACK ?? null,
			Closedby: null,
			Closeddate: postData?.ClosureDate ?? null,
			InputtedBy: null,
			InputDateTime: null,
			AuthorizedBy: null,
			AuthorizedDate: null,
			AuthorizedRemarks: null
		},
		ServiceTicketDetails: [
			{
				Serviceticketid: null,
				Assignto: postData?.User ?? null,
				AssignUserGroup: postData?.USERGROUP ?? null,
				Comments: postData?.AdditionalInfo ?? null,
				RecType: null,
				Version: null,
				Status: null,
				InputtedBy: null,
				InputDateTime: null,
				AuthorizedBy: null,
				AuthorizedDate: null,
				AuthorizedRemarks: null
			}
		],
		Attachments: postData?.attachments
	};
	// return postData;
	return postObj;
};

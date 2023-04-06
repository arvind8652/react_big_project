export const tabs = [
	{
		key: 'All',
		tab: 'All',
		title: 'All',
		status: 'A'
	},
	{
		key: 'Pending',
		tab: 'Pending',
		title: 'Pending',
		status: 'P'
	},
	{
		key: 'Submitted',
		tab: 'Submitted',
		title: 'Submitted',
		status: 'U'
	},
	{
		key: 'Deferred',
		tab: 'Deferred',
		title: 'Deferred',
		status: 'D'
	},
	{
		key: 'Expired',
		tab: 'Expired',
		title: 'Expired',
		status: 'E'
	}
];

export const clientFilters = [
	{
		id: 'WMSJ001',
		clientName: 'Jasmin',
		dataValue: 'Jasmin',
		displayValue: 'Jasmin'
	},
	{
		id: 'WMSJ001',
		clientName: 'Jasmin',
		dataValue: 'Jasmin',
		displayValue: 'Jasmin'
	},
	{
		id: 'WMSJ001',
		clientName: 'Jasmin',
		dataValue: 'Jasmin',
		displayValue: 'Jasmin'
	}
];

export const DocUploadObj = {
	RefID: 'CO2021100316',
	ProgName: 'CLIENTREQADD',
	lstDocumentInfo: [
		{
			DocumentType: 'A',
			DocNameDataValue: 'FDFD',
			NoDocRequired: 2,
			ExpiryYN: 'N',
			DocStatus: '',
			submissionDate: '',
			ExpiryDate: '',
			actionDate: null,
			FileName: '', // file name
			FileType: 'png',
			FileDescription: 'LightBill111.png', // file name
			ClientID: '',
			FileString: '',
			srlNo: 1,
			Isdeferred: 'N',
			Documentsetupid: 'QWE',
			DocumentId: 1308,
			IsOverWrite: true
		}
	]
};

export const docViewUploadObj = (data) => {
	return {
		...data,
		docNameDataValue: data?.docNameDataValue ? data.docNameDataValue : null,
		expiryYN: data?.expiryYN ? data.expiryYN : null,
		docmandatory: data?.docmandatory ? data.docmandatory : null,
		docId: data?.docId ? data.docId : null,
		uploadedDocStatus: data?.uploadedDocStatus ? data.uploadedDocStatus : null,
		fileName: data?.fileName ? data.fileName : null,
		fileType: data?.fileType ? data.fileType : null,
		filestring: data?.filestring ? data.filestring : null,
		actionDate: data?.actionDate ? data.actionDate : null,
		submissionDate: data?.submissionDate ? data.submissionDate : null,
		expiryDate: data?.expiryDate ? data.expiryDate : null
	};
};

export const genrateRequestObj = (data) => {
	return {
		RefID: data.refId,
		ProgName: data.refType,
		lstDocumentInfo: [
			{
				DocumentType: data.documentType,
				DocNameDataValue: data.docNameDataValue,
				NoDocRequired: 2,
				ExpiryYN: data.expiryYN,
				DocStatus: data.uploadedDocStatus,
				SubmissionDate: data.submissionDate,
				ExpiryDate: data.expiryDate,
				ActionDate: data.actionDate,
				FileName: data.fileName,
				FileType: data.fileType,
				FileDescription: data.fileName,
				ClientID: '',
				FileString: data.filestring,
				srlNo: 1,
				Isdeferred: data.Isdeferred,
				Documentsetupid: data.documentsetupId,
				DocumentId: data.documentId,
				IsOverWrite: data.IsOverWrite
			}
		]
	};
};

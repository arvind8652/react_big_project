import moment from 'moment';
import { downloadAttachment, downloadDocument, getDateFormat } from '../../utils/utils';

export const DOCUMENT_COL = [
	{
		title: 'Type',
		dataIndex: 'documentTypeName',
		key: 'documentTypeName'
	},

	{
		title: 'Document Name',
		dataIndex: 'docNameDisplayValue',
		key: 'docNameDisplayValue',
		render: (text, record) => <a onClick={() => downloadDocument(record.documentId)}>{text}</a>
	},
	{
		title: 'Status',
		dataIndex: 'docStatus',
		key: 'docStatus'
	},
	{
		title: 'Submission Date',
		dataIndex: 'submissionDate',
		key: 'submissionDate',
		render: (text) => <span>{moment(text).format(getDateFormat())}</span>
	},
	{
		title: 'Expiry Date',
		key: 'expiryDate',
		dataIndex: 'expiryDate',
		render: (text) => <span>{moment(text).format(getDateFormat())}</span>
	},
	{
		title: 'Review Date',
		key: 'actionDate',
		dataIndex: 'actionDate',
		render: (text) => <span>{moment(text).format(getDateFormat())}</span>
	}
];

export const DOCUMENT_DATA = [
	{
		key: '1',
		type: 'Address Proof',
		name: 'Investment order',
		status: 'Uploaded',
		submissonDate: '28 Nov 2021',
		expiryDate: '28 Nov 2021',
		reviewDate: '28 Nov 2021'
	},
	{
		key: '2',
		type: 'Address Proof',
		name: 'Investment order',
		status: 'Uploaded',
		submissonDate: '28 Nov 2021',
		expiryDate: ' ',
		reviewDate: '28 Nov 2021'
	},
	{
		key: '3',
		type: 'Address Proof',
		name: 'Investment order',
		status: 'Uploaded',
		submissonDate: '28 Nov 2021',
		expiryDate: '28 Nov 2021',
		reviewDate: '28 Nov 2021'
	}
];

import moment from 'moment';
import { downloadAttachment, downloadDocument, getDateFormat } from '../../utils/utils';

export const ATTACHMENT_COL = [
	{
		title: 'Document Name',
		dataIndex: 'fileName',
		key: 'fileName',
		render: (text, record) => (
			<a onClick={() => downloadAttachment(record.id, 'ACCOUNTREQADD', 'AC2021100146')}>{text}</a>
		)
	},
	{
		title: 'Size',
		dataIndex: 'fileSize',
		key: 'fileSize'
	},
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
		render: (text) => <span>{moment(text).format(getDateFormat())}</span>
	},
	{
		title: 'Uploaded By',
		key: 'attachedBy',
		dataIndex: 'attachedBy'
	}
];

export const ATTACHMENT_DATA = [
	{
		key: '1',
		name: 'Investment order',
		size: '5.2 MB',
		date: '28 Nov 2021',
		uploadedby: 'Jon Deo'
	},
	{
		key: '2',
		name: 'Document 2',
		size: '5.2 MB',
		date: '28 Nov 2021',
		uploadedby: 'Jon Deo'
	}
];

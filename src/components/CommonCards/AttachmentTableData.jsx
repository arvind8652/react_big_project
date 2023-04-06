import moment from 'moment';
import { downloadAttachment, getDateFormat } from '../../utils/utils';
export const attachmentColumns = [
	{
		title: 'Document Name',
		dataIndex: 'fileName',
		key: 'fileName',
		render: (text) => <a>{text}</a>
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
		render: (date) => {
			return (
				<span
				// style={{ color: "#696A91" }} className="opportunityDetailText"
				>
					{moment(date).format(getDateFormat())}
				</span>
			);
		}
	},
	{
		title: 'Uploaded By',
		dataIndex: 'attachedBy',
		key: 'attachedBy'
	}
];

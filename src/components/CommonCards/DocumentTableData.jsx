import moment from 'moment';
import { downloadAttachment, getDateFormat } from '../../utils/utils';
export const docColumns = [
	{
		title: 'Type',
		dataIndex: 'documentTypeName',
		key: 'documentTypeName'
	},
	{
		title: 'Document Name',
		dataIndex: 'docNameDisplayValue',
		key: 'docNameDisplayValue',
		render: (text) => <a>{text}</a>
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
		render: (submissionDate) => {
			return (
				<span
				//style={{ color: "#696A91" }} className="opportunityDetailText"
				>
					{moment(submissionDate).format(getDateFormat())}
				</span>
			);
		}
	},
	{
		title: 'Expiry Date',
		dataIndex: 'expiryDate',
		key: 'expiryDate',
		render: (expiryDate) => {
			return (
				<span
				//style={{ color: "#696A91" }} className="opportunityDetailText"
				>
					{moment(expiryDate).format(getDateFormat())}
				</span>
			);
		}
	},
	{
		title: 'Action Date',
		dataIndex: 'actionDate',
		key: 'actionDate',
		render: (actionDate) => {
			return (
				<span
				//style={{ color: "#696A91" }} className="opportunityDetailText"
				>
					{moment(actionDate).format(getDateFormat())}
				</span>
			);
		}
	}
];

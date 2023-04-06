import ModalView from './modalView/modalView';
import TableListing from './tableListing/tableListing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import { exportJSON } from '../../utils/utils';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const RecentModal = (props) => {
	const tableData =
		props.title === 'Recent Campaigns'
			? props.data.map((item) => {
					return {
						...item,
						startdate: moment(item.startdate).format(getDateFormat())
					};
			  })
			: props.data;
	const columns = props.columns;
	const downloadRecords = () => {
		let downloadData;
		if (props.title === 'Recent Prospects' || props.title === 'Recent Leads') {
			downloadData =
				tableData &&
				tableData.length > 0 &&
				tableData.map((item, index) => ({
					'Sr.No': index + 1,
					Name: item.firstName + ' ' + item.middleName + ' ' + item.lastName,
					'Mobile No.': item.mobile,
					'Email ID': item.email,
					Source: item.sourceName ? item.sourceName : '',
					'Source Type': item.sourceType,
					Type: item.type,
					'Relationship Manager': item.relationshipManagerName
						? item.relationshipManagerName
						: item.relationshipManager,
					'Qualification Status': item.qualificationStatus
				}));
		}

		if (props.title === 'Recent Campaigns') {
			downloadData =
				tableData &&
				tableData.length > 0 &&
				tableData.map((item, index) => ({
					'Sr.No': index + 1,
					Name: item.name,
					Type: item.type,
					Date: moment(item.startdate).format(getDateFormat()),
					Cost: `${item.estimatedExpenseCurrency} ${item.estimatedExpense}`,
					'Actual Enquiries': item.actualEnquiry,
					'Expected Enquiries': item.expectedEnquiry,
					Effectiveness:
						item.expectedEnquiry > 0
							? item.actualEnquiry / item.expectedEnquiry
							: item.expectedEnquiry,
					Status: item.activeYN
				}));
		}

		exportJSON(downloadData, props.title);
	};
	const downloadAuth = authorizeModule(props.authorizeCode, CONSTANTS.authorizeCode.download);
	return (
		<ModalView
			show={props.showModal}
			setShow={(val) => props.setShowModal(val)}
			table={<TableListing columns={columns} data={tableData} />}
			title={props.title}
			buttons={{
				position: 'end',
				button: [
					{
						name: downloadAuth ? 'Download Report' : '',
						icon: downloadAuth && (
							<FontAwesomeIcon
								icon={faDownload}
								color='#354081'
								size='1x'
								style={{ marginRight: '3px' }}
							/>
						),
						onClick: () => {
							downloadAuth && downloadRecords();
						},
						type: 'text',
						style: { color: '#354081' }
					}
				]
			}}
		/>
	);
};

export default RecentModal;

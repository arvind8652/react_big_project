import { Table } from 'antd';
import moment from 'moment';
import { CONSTANTS } from '../../constants/constants';
import { downloadAttachment, getDateFormat } from '../../utils/utils';

const InteractionAttachmentListTable = ({ opportunityId, dataSource }) => {
	console.log('DataSoirce', dataSource);

	const columns = [
		{
			title: 'Document Name',
			dataIndex: 'FileName',
			key: 'FileName',
			render: (fileName) => (
				<span
					className='opportunityDetailText'
					style={{ color: '#5D6DD1', textDecoration: 'underline' }}
				>
					{fileName}
				</span>
			)
		},
		{
			title: 'Size',
			dataIndex: 'FileSize',
			key: 'FileSize',
			render: (size) => (
				<span style={{ color: '#696A91' }} className='opportunityDetailText'>
					{size}
				</span>
			)
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: (date) => {
				return (
					<span style={{ color: '#696A91' }} className='opportunityDetailText'>
						{moment(date).format(getDateFormat())}
					</span>
				);
			}
		},
		{
			title: 'Uploaded By',
			dataIndex: 'attachedBy',
			key: 'attachedBy',
			render: (attachedBy) => (
				<span style={{ color: '#696A91' }} className='opportunityDetailText'>
					{attachedBy}
				</span>
			)
		}
	];
	return (
		<>
			<Table
				className='opportunityAttachmentTable'
				// onRow={(record, rowIndex) => {
				// //   return {
				// //     onClick: () => {
				// //       downloadAttachment(
				// //         record,
				// //         record.id,
				// //         CONSTANTS.progNames.OPPORTUNITYADD,
				// //         opportunityId
				// //       );
				// //     },
				// //   };
				// }}
				dataSource={dataSource}
				columns={columns}
				scroll={{ y: 150 }}
				pagination={false}
			/>
		</>
	);
};

export default InteractionAttachmentListTable;

import { Card, Table, Layout, Space, Typography } from 'antd';
import { getDateFormat } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCommentsAlt,
	faPhoneAlt,
	// faPlus,
	faVideo
} from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import './TextSubText.scss';
import './CardView.scss';
const { Content } = Layout;
const { Text } = Typography;

const TaskCardView = (props) => {
	const formatData = (data) => {
		return data.map((item, index) => ({
			key: index,
			subject: { subject: item.subject && item.subject, status: item.status },
			type: item.type,
			date: moment(item.dueDate).format(getDateFormat()),
			purpose: item.purpose
		}));
	};
	const dataSource = formatData(props.data);

	const columns = [
		{
			title: 'Subject',
			dataIndex: ['subject'],
			key: 'subject',
			render: (text) => {
				return (
					<Space direction='vertical' size={1}>
						{text.subject}
						<Text
							className='header-badge'
							style={{
								backgroundColor: '#D9DFFF',
								color: '#354081',
								padding: '2px 10px',
								borderRadius: '20px'
							}}
						>
							{text.status}
						</Text>
					</Space>
				);
			}
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			render: (text) => {
				return (
					<>
						{text === 'Call' ? (
							<FontAwesomeIcon icon={faPhoneAlt} style={{ marginRight: '8px', color: '#696A91' }} />
						) : text === 'Meeting' ? (
							<FontAwesomeIcon icon={faVideo} style={{ marginRight: '8px', color: '#696A91' }} />
						) : (
							<FontAwesomeIcon
								icon={faCommentsAlt}
								style={{ marginRight: '8px', color: '#696A91' }}
							/>
						)}
						{text}
					</>
				);
			}
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date'
		},
		{
			title: 'Purpose',
			dataIndex: 'purpose',
			key: 'purpose'
		}
	];

	// const [attachModalVisible, setAttachModalVisible] = useState(false);

	return (
		<>
			<Card
				bordered={false}
				title='Tasks'
				// extra={
				//   <Button
				//     type="text"
				//     style={{ color: "#354081", fontSize: "16px" }}
				//     onClick={() => setAttachModalVisible(true)}
				//   >
				//     Add <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
				//   </Button>
				// }
				className='tasks-table'
				style={{ width: '100%' }}
			>
				<Content>
					{dataSource.length === 0 ? (
						<Text>No Records Found</Text>
					) : (
						<Table
							dataSource={dataSource}
							columns={columns}
							scroll={{ y: 150 }}
							pagination={false}
						/>
					)}
				</Content>
			</Card>
		</>
	);
};

export default TaskCardView;

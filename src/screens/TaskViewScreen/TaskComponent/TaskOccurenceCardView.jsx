import { useState } from 'react';
import { Button, Layout, Typography, Table, Space, Divider, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDateFormat } from '../../../utils/utils';
import { getTaskHistoryApi } from '../../../api/taskViewApi';
import {
	faCommentsAlt,
	faEnvelope,
	faPhone,
	faVideo,
	faCalendarAlt
} from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import { useEffect } from 'react';
import EditModal from '../TaskModal/EditModal';
import GenericCard from '../../../components/GenericCard/GenericCard';
const { Content } = Layout;
const { Text } = Typography;

const TaskOccurenceCardView = (props) => {
	const formatData = (data) => {
		return data.map((item, index) => {
			return {
				...item,
				key: index,
				datetime: { date: item.activityDate, startTime: item.startTime },
				modalStatus: {
					followUpID: item.followUpID,
					interactionStatus: item.interactionStatus
				}
			};
		});
	};

	const [dataSource, setDataSource] = useState(formatData(props.data));
	const [followUpIdStatus, setFollowUpIdStatus] = useState({
		followUpID: ''
	});
	const [closeOccurenceModal, setCloseOccurenceModal] = useState({
		open: false,
		followUpID: ''
	});

	const styleSet = {
		cardStyle: { width: '100%', marginTop: '15px', marginBottom: '15px' }
	};

	// useEffect(() => {

	//   fetchOccurenceHistory();
	// }, []);
	const columns = [
		{
			dataIndex: 'interactionTypeName',
			key: 'Name',
			render: (name) => {
				return (
					<>
						{name === 'Call' ? (
							<FontAwesomeIcon icon={faPhone} style={{ fontSize: '14px' }} />
						) : name === 'Meeting' ? (
							<FontAwesomeIcon icon={faVideo} style={{ fontSize: '14px' }} />
						) : name === 'Chat' ? (
							<FontAwesomeIcon icon={faCommentsAlt} style={{ fontSize: '14px' }} />
						) : (
							name === 'Email' && <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '14px' }} />
						)}
						<Text style={{ marginLeft: '8px' }}>{name}</Text>
					</>
				);
			}
		},
		{
			dataIndex: 'invitee',
			key: 'Invited',
			render: (invited) => {
				var imgs = invited.slice(0, 2).map((item, index) => {
					return item.profileImage !== null ? (
						<img
							key={index}
							src={item.profileImage}
							alt={item.inviteeName}
							title={item.inviteeName}
							style={{
								borderRadius: '50%',
								height: '30px',
								width: '30px',
								marginRight: '5px'
							}}
						/>
					) : (
						<span
							style={{
								width: '30px',
								height: '30px',
								borderRadius: '50%',
								backgroundColor: '#F0F2FB',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								marginRight: '5px'
							}}
						>
							<Text style={{ fontSize: '12px' }}>{item.profileInitial}</Text>
						</span>
					);
				});
				return (
					<>
						<Space size={2}>
							{imgs}
							{invited.length > 2 ? (
								<span
									style={{
										width: '30px',
										height: '30px',
										borderRadius: '50%',
										backgroundColor: '#F0F2FB'
									}}
								>
									<Text style={{ fontSize: '12px' }}>+{invited.length - imgs.length}</Text>
								</span>
							) : (
								''
							)}
						</Space>
					</>
				);
			}
		},
		{
			dataIndex: ['activityDate', 'startTime'],
			key: 'Date',
			render: (date, time) => {
				return (
					<Text>
						<FontAwesomeIcon icon={faCalendarAlt} />
						&nbsp; {moment(time['activityDate']).format(getDateFormat())}, {time['startTime']}
					</Text>
				);
			}
		},
		{
			// dataIndex: "modalStatus",
			key: 'Interaction Status',
			render: (status) => {
				return (
					<>
						{status.interactionStatus === 'Upcoming' || status.interactionStatus === 'Overdue' ? (
							<Button
								type='text'
								style={{
									color: '#354081',
									border: '1px solid #354081 ',
									borderRadius: '7px'
								}}
								onClick={() => {
									setCloseOccurenceModal({
										...closeOccurenceModal,
										open: true,
										followUpID: status.followUpID
									});
									setFollowUpIdStatus({
										...followUpIdStatus,
										followUpID: status.followUpID
									});
								}}
							>
								Edit{' '}
							</Button>
						) : (
							<Text>{status.interactionStatus}</Text>
						)}
					</>
				);
			}
		}
	];

	function fetchOccurenceHistory() {
		getTaskHistoryApi(props.detail.taskScheduler.refID).then((res) => {
			console.log({ res });
			setDataSource(res.data);
		});
	}

	if (dataSource.length === 0) {
		return null;
	}
	const Occurrence = 'Occurrence';
	return (
		<>
			<GenericCard
				header={Occurrence}
				menuFlag={false}
				className='occurences'
				style={styleSet.cardStyle}
			>
				<Divider />
				{/* <Card
        bordered={false}
        title="Occurences"
        className="occurences"
        bodyStyle={{ padding: "0 8px" }}
        // style={}
      > */}
				<Content style={{ textAlign: 'center' }}>
					<Table columns={columns} showHeader={false} dataSource={dataSource} pagination={false} />
				</Content>
				<EditModal
					modal={closeOccurenceModal}
					followUpID={followUpIdStatus}
					controlStructureAddRules={props.controlStructureAddRules}
					controlStructureView={props.controlStructureView}
					controlStructureAdd={props.controlStructureAdd}
					updateOccurenceHistory={fetchOccurenceHistory}
					setModal={(val) => setCloseOccurenceModal(val)}
				/>
				{/* </Card> */}
			</GenericCard>
		</>
	);
};

export default TaskOccurenceCardView;

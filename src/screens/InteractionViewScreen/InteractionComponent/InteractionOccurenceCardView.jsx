import { useState } from 'react';
import { Layout, Typography, Table, Space, Row, Col, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDateFormat } from '../../../utils/utils';
import {
	getInteractionHistoryApi,
	updateCloseOccurrenceApi
} from '../../../api/interactionViewApi';

import {
	faCommentsAlt,
	faEnvelope,
	faPhone,
	faVideo,
	faCalendarAlt,
	faStickyNote
} from '@fortawesome/pro-light-svg-icons';
import { faCalendarCheck } from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import AddOccurenceModal from '../InteractionModal/AddOccurenceModal';
import CloseOccurenceModal from '../InteractionModal/CloseOccurenceModal';
import MeetingNotesModal from '../InteractionModal/MeetingNotesModal';
import GenericCard from '../../../components/GenericCard/GenericCard';
import Modal from 'antd/lib/modal/Modal';
import SuccessModal from '../../../components/SuccessModal/SuccessModal';
import FailModal from '../../../components/Modal/FailModal/FailModal';

const { Content } = Layout;
const { Text, Link } = Typography;

const InteractionOccurenceCardView = (props) => {
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
	const history = useHistory();
	const [dataSource, setDataSource] = useState(formatData(props.data));
	const [occurenceModalVisible, setOccurenceModalVisible] = useState(false);
	const [showCloseInteractionModal, setShowCloseInteractionModal] = useState(false);
	const [selectedInteraction, setSelectedInteraction] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [closeOccurenceModal, setCloseOccurenceModal] = useState({
		open: false,
		followUpID: ''
	});
	// const handleCloseInteractionClick = (id, dataObject) => {
	//   setSelectedInteraction(dataObject);
	//   setShowCloseInteractionModal(true);
	// }

	const [meetingNotesModal, setMeetingNotesModal] = useState({
		open: false,
		notes: ''
	});
	const closeInteraction = (formData) => {
		updateCloseOccurrenceApi(formData)
			.then((res) => {
				if (res.data.success) {
					setShowSuccessModal(true);
				} else {
					setErrorArray([
						{
							message: res.data.message
						}
					]);
					setShowFailModal(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleFailModalOkOrCancel = () => {
		setShowFailModal(false);
	};
	const onOkSuccessModal = () => {
		// executeGetAllInteractionData(setLocalInteractionData, setLoading);
		// setSelectedRowKeys([]);
		// setSelectedRows([]);
		setShowSuccessModal(false);
		const toObject = {
			pathname: '/dashboard/MyInteractions'
		};
		history.push(toObject);
	};

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
										backgroundColor: '#F0F2FB',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
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
			dataIndex: 'datetime',
			key: 'Date',
			render: (date) => {
				return (
					<Text>
						<FontAwesomeIcon icon={faCalendarAlt} />
						&nbsp;{moment(date.date).format(getDateFormat())}, {date?.startTime}
					</Text>
				);
			}
		},
		{
			dataIndex: 'occurence',
			key: 'Occurence',
			render: (occurence) => <Text>{occurence}</Text>
		},
		{
			dataIndex: 'modalStatus',
			key: 'Interaction Status',
			render: (status) => {
				return (
					<Row>
						<Col span={20}>{status.interactionStatus}</Col>
						<Col span={4}>
							{status.interactionStatus === 'Upcoming' || status.interactionStatus === 'Overdue' ? (
								<Link
									onClick={() => {
										setCloseOccurenceModal({
											...closeOccurenceModal,
											open: true,
											followUpID: status.followUpID
										});
									}}
								>
									<FontAwesomeIcon
										icon={faCalendarCheck}
										style={{ fontSize: '18px', color: '#5D6DD1' }}
									/>
								</Link>
							) : (
								<Link
									onClick={() => {
										setMeetingNotesModal({
											...meetingNotesModal,
											open: true,
											meetingNotes: status.meetingNotes
										});
									}}
								>
									<FontAwesomeIcon
										icon={faStickyNote}
										style={{ fontSize: '18px', color: '#5D6DD1' }}
									/>
								</Link>
							)}
						</Col>
					</Row>
				);
			}
		}
	];

	function fetchOccurenceHistory() {
		getInteractionHistoryApi(props.detail.taskScheduler.refID).then((res) => {
			setDataSource(res.data);
		});
	}

	if (dataSource.length === 0) {
		return null;
	}
	const Occurrence = 'Occurrence';

	return (
		<GenericCard
			// cardTitle={"Occurences"}
			header={Occurrence}
			menuFlag={1}
			className='occurences'
			// buttonTitle={<span>Add</span>}
			buttonTitle={'Add'}
			onClick={() => setOccurenceModalVisible(true)}
		>
			{/* // <Card <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
    //   bordered={false}
    //   title="Occurences"
    //   className="occurences"
    //   bodyStyle={{ padding: "0 8px" }}
    //   extra={
    //     <Button
    //       type="text"
    //       style={{ color: "#354081" }}
    //       onClick={() => setOccurenceModalVisible(true)}
    //     >
    //       
    //     </Button>
    //   }
    //   style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
    // > */}
			<Content style={{ textAlign: 'center' }}>
				<Table columns={columns} showHeader={false} dataSource={dataSource} pagination={false} />
			</Content>
			<AddOccurenceModal
				modal={occurenceModalVisible}
				interactionDetails={props.detail}
				controlStructureAddRules={props.controlStructureAddRules}
				controlStructureAdd={props.controlStructureAdd}
				setModal={setOccurenceModalVisible}
			/>
			{/* {
        showCloseInteractionModal ? */}
			<CloseOccurenceModal
				modal={closeOccurenceModal}
				showCloseInteractionModal={showCloseInteractionModal}
				controlStructureView={props.controlStructureView}
				updateOccurenceHistory={fetchOccurenceHistory}
				closeInteractionApi={closeInteraction}
				setModal={(val) => setCloseOccurenceModal(val)}
				setShowCloseInteractionModal={setShowCloseInteractionModal}
				selectedInteraction={selectedInteraction}
			/>
			{/* : ''
      }  */}
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={[<Button onClick={onOkSuccessModal}>OK</Button>]}
				centered
			>
				<SuccessModal message='Action Completed Successfully' />
			</Modal>
			<FailModal
				visible={showFailModal}
				onOk={handleFailModalOkOrCancel}
				onCancel={handleFailModalOkOrCancel}
				errorArray={errorArray}
			/>
			<MeetingNotesModal modal={meetingNotesModal} setModal={(val) => setMeetingNotesModal(val)} />
			{/* </Card> */}
		</GenericCard>
	);
};

export default InteractionOccurenceCardView;

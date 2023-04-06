import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	excecuteGetTaskViewCs,
	excecuteGetTaskAddCs,
	excecuteGetTaskView,
	executeSaveTaskEditDetail
} from '../../redux/actions/taskViewActions';
import { deleteTaskApi } from '../../api/taskViewApi';
import 'antd/dist/antd.css';
import { getDateFormat } from '../../utils/utils';
import TaskHeaderIconTextSubText from './TaskComponent/TaskHeaderIconTextSubText';
import TaskHeaderTextSubText from './TaskComponent/TaskHeaderTextSubText';
import TaskTextSubText from './TaskComponent/TaskTextSubText';
import TaskMiscellaneousCardView from './TaskComponent/TaskMiscellaneousCardView';
import TaskAttachmentCardView from './TaskComponent/TaskAttachmentCardView';
import {
	Button,
	Layout,
	PageHeader,
	Card,
	Row,
	Col,
	Space,
	Typography,
	Radio,
	Tooltip
} from 'antd';
import './TaskViewScreen.scss';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faUserFriends,
	faHexagon
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import moment from 'moment';

import TaskOccurenceCardView from './TaskComponent/TaskOccurenceCardView';
import BackToTop from '../../components/BackToTop/BackToTop';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';

const { Content } = Layout;
const { Text, Link, Title } = Typography;

function TaskViewScreen(props) {
	const {
		excecuteGetTaskAddCs,
		excecuteGetTaskView,
		taskViewData,
		taskHistoryDetail,
		taskAttachments,
		taskMiscellaneousDetail,
		controlStructureView,
		controlStructureAdd,
		leftPanel
	} = props;

	const location = useLocation();
	const [taskIdDetail, setTaskIdDetail] = useState({
		taskId: '',
		id: ''
	});
	const { TaskIDs, rowNumber } = location.state;

	const [errorMsg, setErrorMsg] = useState('');
	const history = useHistory();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [currentRowCount, setcurrentRowCount] = useState(rowNumber);
	const [deleteTaskMessage, setDeleteTaskMessage] = useState('');
	const [showEditModal, setShowEditModal] = useState(false);
	const [value, setValue] = useState(1);
	const [actvityidd, setActvityIdd] = useState();
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'TASKBOARD') authorizeCode = subMenu.authorizeCode;
			});
		});
	const onRadioChange = (e) => {
		setValue(e.target.value);
	};
	const radioStyle = {
		display: 'block',
		height: '30px',
		lineHeight: '30px',
		fontSize: 'large'
	};

	useEffect(() => {
		setTaskIdDetail({
			taskId: TaskIDs[currentRowCount].taskId,
			id: TaskIDs[currentRowCount].id
		});
		excecuteGetTaskView(
			TaskIDs[currentRowCount].taskId,
			TaskIDs[currentRowCount].id,
			setErrorMsg,
			TaskIDs[currentRowCount].activityID
		);
	}, [currentRowCount]);

	useEffect(() => {
		excecuteGetTaskAddCs();
	}, []);

	// useEffect(() => {
	// 	excecuteGetTaskView(taskIdDetail.taskId, taskIdDetail.id, setErrorMsg, taskIdDetail.activityID);
	// }, [taskIdDetail]);

	const RenderDisplayShowModal = () => {
		const ConfirmScreen = () => (
			<>
				<div className='modal-header'>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Edit Task</div>
				</div>
				<div className='modal-body'>
					Select your choice for Edit
					{/* {selectedRowKeys.length > 1 ? ` ${selectedRowKeys.length} ` : selectedRowKeys.length === 1 && " "}
          selected record{selectedRowKeys.length > 1 ? "s" : " "}? */}
					<div className='modal-radio' style={{ paddingTop: '30px' }}>
						<Radio.Group onChange={onRadioChange} style={{ fontSize: '14' }} value={value}>
							<Radio value={1} style={radioStyle}>
								Selected Occurence
							</Radio>
							<Radio value={2} style={radioStyle}>
								All Occurences
							</Radio>
						</Radio.Group>
					</div>
				</div>

				<div className='modal-footer'>
					<Button
						className='text-only-btn'
						key='back'
						type='text'
						onClick={() => setShowEditModal(false)}
					>
						Cancel
					</Button>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={() => handleEditClick()}
					>
						Edit
					</Button>
				</div>
			</>
		);
		return (
			<CustomModal handleCancel={() => setShowEditModal(false)} visible={showEditModal}>
				<ConfirmScreen />
			</CustomModal>
		);
	};

	const handleEditClick = (val) => {
		// const taskEditDetail = {};
		// executeSaveTaskEditDetail(taskEditDetail);
		// history.push("/dashboard/MyTask/TaskCreate");
		const taskData = taskViewData.taskScheduler;
		const toObject = {
			pathname: '/dashboard/TaskBoard/TaskCreate',
			state: {
				screen: 'list',
				data: taskData,
				mode: 'edit',
				activityID: taskData?.activityID,
				followUpID: taskData?.followUpID,
				singleOrMultiple: val ? val : value
			}
		};

		history.push(toObject);
	};

	function handlePreviousClick() {
		if (currentRowCount !== 0) {
			setcurrentRowCount(currentRowCount - 1);
		}
	}

	function handleNextClick() {
		if (TaskIDs.length === currentRowCount) {
			setcurrentRowCount(0);
		} else {
			setcurrentRowCount(currentRowCount + 1);
		}
	}

	const handleConfirmDeleteModalOk = () => {
		deleteTaskApi(taskIdDetail.id).then((res) => {
			setShowSuccessFailureDeleteModal(true);
			setDeleteTaskMessage(res.data[0].message);
			setShowDeleteModal(false);
		});
	};

	const handleSuccessFailureDeleteModalOk = () => {
		setShowSuccessFailureDeleteModal(false);
		history.push('/dashboard/TaskBoard');
	};

	const handleConfirmDeleteModalCancel = () => {
		setShowDeleteModal(false);
	};

	const RenderSuccessFailureDeleteModal = () => {
		return (
			<CustomModal
				visible={showSuccessFailureDeleteModal}
				handleOk={handleSuccessFailureDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Task</div>
				</div>
				<div className='modal-body'>{deleteTaskMessage}</div>
				<div className='modal-footer'>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleSuccessFailureDeleteModalOk}
					>
						OK
					</Button>
				</div>
			</CustomModal>
		);
	};

	const RenderConfirmDeleteModal = () => {
		return (
			<CustomModal
				visible={showDeleteModal}
				handleCancel={handleConfirmDeleteModalCancel}
				handleOk={handleConfirmDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Prospect Opportunity</div>
				</div>
				<div className='modal-body'>Are you sure you want to delete this particular prospect ?</div>

				<div className='modal-footer'>
					<Button
						className='text-only-btn'
						key='back'
						type='text'
						onClick={handleConfirmDeleteModalCancel}
					>
						Cancel
					</Button>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleConfirmDeleteModalOk}
					>
						Delete
					</Button>
				</div>
			</CustomModal>
		);
	};

	if (!taskViewData) {
		return null;
	}
	return (
		<>
			<RenderConfirmDeleteModal />
			<RenderSuccessFailureDeleteModal />
			<RenderDisplayShowModal />
			<PageHeader
				className='taskViewPageHeader'
				onBack={() => history.push('/dashboard/TaskBoard')}
				backIcon={<FontAwesomeIcon icon={faArrowLeft} size='sm' className='taskViewTopBarIcons' />}
				extra={[
					<Link key={1} style={{ color: '#fff', fontSize: '18px' }}>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) && (
							<Tooltip title='Delete'>
								<FontAwesomeIcon
									icon={faTrashAlt}
									size='sm'
									onClick={() => setShowDeleteModal(true)}
									className='taskViewTopBarIcons'
								/>
							</Tooltip>
						)}
					</Link>,
					<Link key={2} style={{ color: '#fff', fontSize: '18px' }}>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify) && (
							<Tooltip title='Edit'>
								<FontAwesomeIcon
									icon={faEdit}
									size='sm'
									// onClick={() => handleEditClick(taskViewData)}
									onClick={() => {
										taskViewData?.taskScheduler?.occurrence > 1
											? setShowEditModal(true)
											: handleEditClick(2);
									}}
									className='taskViewTopBarIcons'
								/>
							</Tooltip>
						)}
					</Link>,
					<Link key={3} style={{ color: '#fff', fontSize: '18px' }}>
						<Tooltip title='Previous'>
							<FontAwesomeIcon
								icon={faChevronLeft}
								onClick={handlePreviousClick}
								size='sm'
								className='taskViewTopBarIcons'
							/>
						</Tooltip>
					</Link>,
					<Link key={4} style={{ color: '#fff', fontSize: '18px' }}>
						<Tooltip title='Next'>
							<FontAwesomeIcon
								icon={faChevronRight}
								size='sm'
								onClick={handleNextClick}
								className='taskViewTopBarIcons'
							/>
						</Tooltip>
					</Link>
				]}
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					borderBottomRightRadius: '12px',
					borderBottomLeftRadius: '12px'
				}}
			>
				<Content>{TaskViewPageHeaderDetail(taskViewData)}</Content>
			</PageHeader>
			<div className='taskViewBodyContent'>
				<TaskDetails detail={taskViewData} />
				{taskHistoryDetail && (
					<>
						<TaskOccurenceCardView
							data={taskHistoryDetail}
							detail={taskViewData}
							controlStructureView={controlStructureView}
							controlStructureAdd={controlStructureAdd}
						/>
						<div style={{ marginTop: '15px' }}></div>
					</>
				)}
				{/* <TaskAttachmentCardView data={taskAttachments} taskId={taskIdDetail.taskId} /> */}
				<AttachmentUploadModal
					type={'TASKADD'}
					selectedAccount={{
						// scheme: taskIdDetail?.taskId,
						scheme: taskViewData?.taskScheduler?.activityID,
						refType: 'TASKADD'
					}}
					data={taskAttachments}
					action={'view'}
				/>
				{taskMiscellaneousDetail && (
					<TaskMiscellaneousCardView detail={taskMiscellaneousDetail.miscellaneous} />
				)}
				<BackToTop />
			</div>
		</>
	);
}

const TaskDetailsCardView = (props) => {
	const taskData = props.data.taskScheduler;

	return taskData ? (
		<Space direction='horizontal' class='prospect-details' style={{ width: '100%' }} size={5}>
			<Row gutter={5}>
				<Col span={12}>
					<TaskTextSubText text={taskData.subject} subtext='Subject' />
				</Col>
				<Col span={8} offset={4}>
					<TaskTextSubText text={taskData.subject} subtext='Assign to' />
				</Col>

				<Col span={8}>
					<TaskTextSubText text={taskData.opportunity} subtext='Linked Opportunity' />
				</Col>
				<Col span={8}>
					<TaskTextSubText text={taskData.activityPurposeName} subtext='Purpose' />
				</Col>
				<Col span={8}>
					<TaskTextSubText text={taskData.priority} subtext='Priority' />
				</Col>
				<Col span={12}>
					<TaskTextSubText text={taskData.description} subtext='Description' />
				</Col>
				<Col span={8} offset={4}>
					<TaskTextSubText text={taskData.lastUpdate} subtext='Last Update' />
				</Col>
				<Col span={8}>
					<TaskTextSubText text={taskData.relationshipManagerName} subtext='Relationship Manager' />
				</Col>
				<Col span={8}>
					<TaskTextSubText text={taskData.branchName} subtext='Office' />
				</Col>
				<Col span={8}>
					<TaskTextSubText text={taskData.created} subtext='Created' />
				</Col>
			</Row>
		</Space>
	) : (
		<div></div>
	);
};

const setActivityIcon = (type) => {
	switch (type) {
		case 'Chat':
			return faCommentAlt;
		case 'Call':
			return faPhoneAlt;
		case 'Meeting':
			return faUserFriends;
		case 'Email':
			return faEnvelope;
		case 'Other':
			return faHexagon;
		default:
			return '';
	}
};

const TaskDetails = (props) => {
	const tabListNoTitle = [
		{
			key: 'TaskDetails',
			tab: 'TaskDetails'
		}
	];

	const TaskDetail = props.detail;

	const contentListNoTitle = {
		TaskDetails: <TaskDetailsCardView data={TaskDetail} />
	};

	const [noTitleKey, setnoTitleKey] = useState('TaskDetails');

	return (
		<Card
			className='taskViewCardDetail'
			bordered={false}
			style={{ width: '100%' }}
			tabList={tabListNoTitle}
			activeTabKey={noTitleKey}
		>
			{contentListNoTitle[noTitleKey]}
		</Card>
	);
};

const TaskViewPageHeaderDetail = (props) => {
	if (!props.taskScheduler) {
		return null;
	}
	return (
		<>
			{/* <RenderDisplayShowModal /> */}
			<Row align='bottom' className='page-header'>
				<Col span={10}>
					<Row align='bottom'>
						<Col span={9} align='middle'>
							{props.taskScheduler.profileImage ? (
								<img
									src={`data:image/jpeg;base64,${props.taskScheduler.profileImage}`}
									className='header-img'
									alt='user-img'
								/>
							) : (
								<div className='taskInitialsCircleImg'>{props.taskScheduler.profileInitial}</div>
							)}
						</Col>
						<Col span={15} style={{ padding: '0 10px' }}>
							<Space direction='vertical'>
								<Title level={3} className='taskName' style={{ color: '#FFF', margin: 0 }}>
									{props.taskScheduler.clientProspectName}
								</Title>
								<Text type='secondary' style={{ color: '#D9DFFF', margin: 0 }}>
									<FontAwesomeIcon
										className='taskViewHeaderDetailIcon'
										icon={faMapMarkerAlt}
										style={{ color: 'white', marginRight: '5px' }}
									/>
									{props.taskScheduler.address}
								</Text>
								<Text className='taskTag'>{props.taskScheduler.tagName}</Text>
								<Text type='secondary' style={{ color: '#D9DFFF', margin: 0 }}>
									<FontAwesomeIcon
										className='taskViewHeaderDetailIcon'
										icon={faPhoneAlt}
										style={{ color: 'white', marginRight: '5px' }}
									/>

									{props.taskScheduler.mobile}
								</Text>
								<Text type='secondary' style={{ color: '#D9DFFF', margin: 0 }}>
									<FontAwesomeIcon
										className='taskViewHeaderDetailIcon'
										icon={faEnvelope}
										style={{ color: 'white', marginRight: '5px' }}
									/>
									{props.taskScheduler.email}
								</Text>
							</Space>
						</Col>
					</Row>
				</Col>
				<Col span={14}>
					<Space direction='vertical' style={{ width: '100%' }}>
						<Row style={{ margin: '10px 0' }} className='column1' gutter={{ xs: 24 }}>
							<Col span={8}>
								<TaskHeaderIconTextSubText
									icon={
										<FontAwesomeIcon
											icon={setActivityIcon(props.taskScheduler.interactionTypeName)}
											size='lg'
										/>
									}
									text={props.taskScheduler.interactionTypeName}
									subtext='Type'
								/>
							</Col>
							<Col span={8}>
								<TaskHeaderTextSubText
									text={moment(props.taskScheduler.activityDate).format(getDateFormat())}
									subtext='Date'
								/>
							</Col>
							<Col span={8}>
								<TaskHeaderTextSubText
									text={props.taskScheduler.activityStatusName}
									subtext='Status'
								/>
							</Col>
						</Row>
						<Row style={{ margin: '10px 0' }} align='bottom' className='column1'>
							<Col span={16}>
								<TaskHeaderTextSubText text={props.taskScheduler.subject} subtext='Subject' />
							</Col>
							<Col span={8}>
								<TaskHeaderTextSubText
									text={props.taskScheduler.activityPurposeName}
									subtext='Purpose'
								/>
							</Col>
						</Row>
					</Space>
				</Col>
			</Row>
		</>
	);
};

const mapStateToProps = (state) => {
	const { taskView } = state;
	const taskViewData = taskView.taskViewData;
	const taskHistoryDetail = taskView.taskHistoryDetail;
	const taskAttachments = taskView.taskAttachments;
	const taskMiscellaneousDetail = taskView.taskMiscellaneousDetail;
	const controlStructureView = taskView.taskViewControlStructure;
	const fullControlStructureView = taskView.taskViewControlStructureFull;
	const controlStructureAdd = taskView.taskAddControlStructure;
	const fullControlStructureAdd = taskView.taskAddControlStructureFull;

	return {
		taskView,
		taskViewData,
		taskHistoryDetail,
		taskAttachments,
		taskMiscellaneousDetail,
		controlStructureView,
		fullControlStructureView,
		controlStructureAdd,
		fullControlStructureAdd,
		leftPanel: state.dashboard.leftPanel
	};
};

const mapDispatchToProps = {
	excecuteGetTaskViewCs,
	excecuteGetTaskAddCs,
	excecuteGetTaskView
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskViewScreen);

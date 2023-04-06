import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	excecuteGetInteractionViewCs,
	excecuteGetInteractionAddCs,
	excecuteGetInteractionView,
	executeSaveInteractionEditDetail
} from '../../redux/actions/interactionViewActions';
import { createValidators } from '../../utils/utils';

import { deleteInteractionApi, deleteInteractionApiwithId } from '../../api/interactionViewApi';
import './InteractionViewScreen.scss';
import 'antd/dist/antd.css';
import { getDateFormat } from '../../utils/utils';
import BackToTop from '../../components/BackToTop/BackToTop';

import HeaderIconTextSubText from '../ProspectViewScreen/ProspectComponent/HeaderIconTextSubText';
import HeaderTextSubText from '../ProspectViewScreen/ProspectComponent/HeaderTextSubText';
import TextSubText from '../ProspectViewScreen/ProspectComponent/TextSubText';
import MiscellaneousCardView from './InteractionComponent/InteractionMiscellaneousCardView';
import AttachmentsCardView from './InteractionComponent/InteractionAttachmentCardView';
import InteractionVerticalTimelineCardView from './InteractionComponent/InteractionVerticalTimelineCardView';
import InteractionOccurenceCardView from './InteractionComponent/InteractionOccurenceCardView';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

import {
	Button,
	Layout,
	PageHeader,
	Card,
	Row,
	Col,
	Table,
	Space,
	Typography,
	Radio,
	Popover,
	Tooltip
} from 'antd';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faCommentDots,
	faHexagon,
	faVideo
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faUserFriends,
	faCommentAlt
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import moment from 'moment';
import { faEllipsisVAlt } from '@fortawesome/pro-light-svg-icons';
import { assets } from '../../constants/assetPaths';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';

const { Content } = Layout;
const { Text, Link, Title } = Typography;

function InteractionViewScreen(props) {
	const {
		excecuteGetInteractionViewCs,
		excecuteGetInteractionAddCs,
		excecuteGetInteractionView,
		executeSaveInteractionEditDetail,
		interactionViewData,
		verticalTimelineDetail,
		interactionHistoryDetail,
		interactionAttachments,
		interactionMiscellaneousDetail,
		controlStructureView,
		fullControlStructureView,
		controlStructureAdd,
		fullControlStructureAdd,
		leftPanel
	} = props;
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'ACTIVITYADD') authorizeCode = subMenu.authorizeCode;
			});
		});
	const location = useLocation();
	const [loading, setLoading] = useState();
	const [interactionIdDetail, setInteractionIdDetail] = useState({
		interactionId: '',
		id: ''
	});
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [deleteFailedArray, setDeleteFailedArray] = useState();
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [interactionViewRefId, setInteractionViewRefId] = useState();
	const { InteractionIDs, rowNumber } = location.state;
	const [errorMsg, setErrorMsg] = useState('');
	const history = useHistory();
	const [position, setPosition] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [currentRowCount, setcurrentRowCount] = useState(rowNumber);
	const [deleteInteractionMessage, setDeleteInteractionMessage] = useState('');
	const [interactionViewRules, setInteractionViewRules] = useState();
	const [interactionAddRules, setInteractionAddRules] = useState();
	const [showEditModal, setShowEditModal] = useState(false);
	const [actvityidd, setActvityIdd] = useState();
	const [value, setValue] = useState(1);
	const onRadioChange = (e) => {
		setValue(e.target.value);
	};
	useEffect(() => {
		setInteractionIdDetail({
			interactionId: InteractionIDs[currentRowCount].interactionId,
			id: InteractionIDs[currentRowCount].id
		});
		excecuteGetInteractionView(
			InteractionIDs[currentRowCount].interactionId,
			InteractionIDs[currentRowCount].id,
			setErrorMsg,
			InteractionIDs[currentRowCount].activityID
		);
	}, [currentRowCount]);

	useEffect(() => {
		excecuteGetInteractionViewCs();
	}, []);

	useEffect(() => {
		excecuteGetInteractionAddCs();
	}, []);

	// useEffect(() => {
	// 	if (interactionViewData.taskScheduler.activityID) {
	// 		setActvityIdd(interactionViewData.taskScheduler.activityID);
	// 	}
	// }, [interactionViewData.taskScheduler.activityID]);

	useEffect(() => {
		setInteractionViewRefId(InteractionIDs[currentRowCount]);
	}, [currentRowCount]);

	useEffect(() => {
		fullControlStructureView &&
			fullControlStructureView[1] &&
			fullControlStructureView[1].controlStructureField &&
			setInteractionViewRules(createValidators(fullControlStructureView[1].controlStructureField));
	}, [fullControlStructureView]);

	useEffect(() => {
		fullControlStructureAdd &&
			fullControlStructureAdd[1] &&
			fullControlStructureAdd[1].controlStructureField &&
			setInteractionAddRules(createValidators(fullControlStructureAdd[1].controlStructureField));
	}, [fullControlStructureAdd]);

	// useEffect(() => {}, [interactionAddRules]);

	function handleCreateInteractionClick() {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	}

	const handleCreateTaskClick = (id, toObject) => {
		toObject = {
			pathname: `/dashboard/TaskBoard/TaskCreate`,
			state: {
				screen: 'list',
				data: id
				// mode: "edit"
			}
		};
		history.push(toObject);
	};

	function handleCreateOpportunityClick() {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate'
		};

		history.push(toObject);
	}

	const handleUpdateProspectClick = (prospectId) => {
		const toObject = {
			pathname: '/dashboard/MyProspect/ProspectCreate',
			state: { screen: 'list', data: prospectId, mode: 'edit' }
		};
		history.push(toObject);
	};

	const RenderMoreOptions = (dataObject) => {
		const options = ['Create New Interaction', 'Create Task', 'Create Opportunity'];
		const content = () => (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					paddingLeft: '20px'
				}}
			>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								setSelectedRowKeys([...selectedRowKeys, dataObject.id]);
								setSelectedRows([...selectedRows, dataObject]);
								option.toLowerCase() === 'create new interaction' && handleCreateInteractionClick();
								option.toLowerCase() === 'create opportunity' && handleCreateOpportunityClick();
								option.toLowerCase() === 'create task' &&
									handleCreateTaskClick(dataObject.id, dataObject);
								option.toLowerCase() === 'update prospect/client' && handleUpdateProspectClick();
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<Popover
				placement='bottomLeft'
				content={content}
				overlayClassName='prospect-listing-actions-popover'
			>
				<FontAwesomeIcon icon={faEllipsisVAlt} size='sm' className='prospectViewTopBarIcons' />
			</Popover>
		);
	};

	// function handleEditClick() {
	//   const interactionEditDetail = {};
	//   executeSaveInteractionEditDetail(interactionEditDetail);
	//   history.push("/dashboard/MyInteraction/InteractionCreate",
	//     { screen: "list", data: interactionViewData, mode: "edit" })
	// }
	function handleEditClick(val) {
		const interactionData = interactionViewData.taskScheduler;
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: {
				// dataObject: {
				//   // ...interactionViewData.taskScheduler,
				//   data: interactionViewData.taskScheduler,
				//   attachments: interactionAttachments,
				// miscellaneous: interactionMiscellaneousDetail,
				// },
				data: interactionData,
				mode: 'edit',
				screen: 'list',
				activityID: interactionData?.activityID,
				followUpID: interactionData?.followUpID,
				singleOrMultiple: val ? val : value
			}
		};
		history.push(toObject);
	}
	// const handleEditInteractionClick = (activityID, dataObject) => {
	//   const toObject = {
	//     pathname: "/dashboard/MyInteractions/InteractionCreate",
	//     state: { screen: "list", data: activityID, mode: "edit", dataObject },
	//   };
	//   history.push(toObject);
	// };

	function handlePreviousClick() {
		if (currentRowCount !== 0) {
			setcurrentRowCount(currentRowCount - 1);
		}
	}

	function handleNextClick() {
		if (InteractionIDs.length === currentRowCount) {
			setcurrentRowCount(0);
		} else {
			setcurrentRowCount(currentRowCount + 1);
		}
	}

	const handleConfirmDeleteModalOk = () => {
		if (value === 1) {
			deleteInteractionApiwithId(interactionIdDetail.id).then((res) => {
				setShowSuccessFailureDeleteModal(true);
				setDeleteInteractionMessage(res.data[0].message);
				setShowDeleteModal(false);
			});
		} else {
			deleteInteractionApi([interactionIdDetail.interactionId]).then((res) => {
				setShowSuccessFailureDeleteModal(true);
				setDeleteInteractionMessage(res.data[0].message);
				setShowDeleteModal(false);
			});
		}
	};

	const handleSuccessFailureDeleteModalOk = () => {
		setShowSuccessFailureDeleteModal(false);
		history.push('/dashboard/MyInteractions');
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
					<div className='header-title'>Delete Interaction</div>
				</div>
				<div className='modal-body'>{deleteInteractionMessage}</div>
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

	const radioStyle = {
		display: 'block',
		height: '30px',
		lineHeight: '30px',
		fontSize: 'large'
	};

	const closeModal = (operationName) => {
		setDeleteFailedArray();
		operationName === 'delete' && setShowDeleteModal(false);

		setSelectedRowKeys([]);
		setSelectedRows([]);
		// executeGetAllInteractionData(setLocalInteractionData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'delete' && setShowDeleteModal(false);

		setSelectedRowKeys([]);
		setSelectedRows([]);
	};

	const ActionSuccessModalScreen = ({ operationName }) => (
		<>
			<div className='modal-body'>
				<div className='action-success-screen'>
					<img src={assets.common.successTick} alt='success' className='success-logo' />
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div className='title'>
							{selectedRowKeys.length}/{selectedRowKeys.length} Successful Action
						</div>
						<div className='subtitle'>You action has been completed successfully</div>
					</div>
				</div>
				<div className='modal-footer'>
					<Button
						className='text-only-btn'
						type='text'
						onClick={() => {
							closeModal(operationName);
						}}
					>
						Ok
					</Button>
				</div>
			</div>
		</>
	);

	const ActionFailModalScreen = ({ errorArray, operationName }) => {
		const FailScreen = () => (
			<>
				<div className='modal-body'>
					<div
						className='action-fail-screen'
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<img src={assets.common.triangleExclamation} alt='fail' className='fail-logo' />
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className='title'>
								{selectedRowKeys.length - errorArray.length}/{selectedRowKeys.length} Successful
								Action
							</div>
							<div className='subtitle'>
								{errorArray.length} action{errorArray.length > 1 && 's'} could not be
								completed.&nbsp;
								<div
									className='view-failed-actions-screen'
									onClick={() => {
										setShowFailedActions(true);
									}}
								>
									View
								</div>
							</div>
						</div>
					</div>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							type='text'
							onClick={() => {
								closeModal(operationName);
							}}
						>
							Ok
						</Button>
					</div>
				</div>
			</>
		);
		const ListFailedActionsScreen = () => {
			const renderRecordDetailsCol = (errObject) => (
				<div className='record-details'>
					<div>
						<strong>{errObject.name}</strong>
					</div>
					<div>{errObject.mobile}</div>
				</div>
			);
			const renderFailReasonCol = (message) => <div className='failure-reason'>{message}</div>;
			const failTableColumns = [
				{
					float: 'right',
					title: '',
					dataIndex: 'name',
					key: 'avatar',
					// width: 300,
					render: (name, dataObject) => renderRecordDetailsCol(dataObject)
				},
				{
					float: 'right',
					title: '',
					dataIndex: 'message',
					key: 'name',
					// width: 300,
					render: (message) => renderFailReasonCol(message)
				}
			];
			return (
				<>
					<div className='modal-header'>
						<img
							src={assets.common.triangleExclamation}
							alt='fail'
							className='header-icon fail-logo'
						/>
						<div className='failed-actions-title'>Failed Actions</div>
					</div>
					<div
						className='modal-body'
						style={{
							height: 250,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							overflow: 'scroll'
						}}
					>
						<Table
							className='failed-actions-list-container'
							rowClassName='failed-action-row'
							columns={failTableColumns}
							dataSource={errorArray}
							rowKey='mobile'
							showHeader={false}
							bordered={false}
							pagination={false}
						/>
					</div>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							type='text'
							onClick={() => {
								closeModal(operationName);
							}}
						>
							Ok
						</Button>
					</div>
				</>
			);
		};
		return <>{!showFailedActions ? <FailScreen /> : <ListFailedActionsScreen />}</>;
	};

	const RenderConfirmDeleteModal = () => {
		const ConfirmScreen = () => (
			<>
				<div className='modal-header'>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Interactions</div>
				</div>
				<div className='modal-body'>
					Are you sure you want to delete &nbsp;
					{selectedRowKeys.length > 1
						? ` ${selectedRowKeys.length} `
						: selectedRowKeys.length === 1 && ' '}
					selected record{selectedRowKeys.length > 1 ? 's' : ' '}?
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
						onClick={() => {
							cancelOperation('delete');
						}}
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
			</>
		);
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('delete');
				}}
				handleOk={handleConfirmDeleteModalOk}
				visible={showDeleteModal}
			>
				{typeof deleteFailedArray === 'undefined' ? (
					<ConfirmScreen />
				) : deleteFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='delete' />
				) : (
					<ActionFailModalScreen errorArray={deleteFailedArray} operationName='delete' />
				)}
			</CustomModal>
		);
	};

	if (!interactionViewData) {
		return null;
	}
	const RenderDisplayShowModal = () => {
		const ConfirmScreen = () => (
			<>
				<div className='modal-header'>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Edit Interaction</div>
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

	return (
		<>
			<RenderConfirmDeleteModal />
			<RenderSuccessFailureDeleteModal />
			<RenderDisplayShowModal />
			<PageHeader
				className='interactionViewPageHeader'
				onBack={() => history.push('/dashboard/MyInteractions')}
				backIcon={
					<FontAwesomeIcon icon={faArrowLeft} size='sm' className='interactionViewTopBarIcons' />
				}
				extra={[
					<Link key={1} style={{ color: '#fff', fontSize: '18px' }}>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) && (
							<Tooltip title='Delete'>
								<FontAwesomeIcon
									icon={faTrashAlt}
									size='sm'
									onClick={() => setShowDeleteModal(true)}
									className='interactionViewTopBarIcons'
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
									onClick={() => {
										interactionViewData?.taskScheduler?.occurrence > 1
											? setShowEditModal(true)
											: handleEditClick(2);
									}}
									className='interactionViewTopBarIcons'
								/>
							</Tooltip>
						)}
					</Link>,
					// <Link key={3} style={{ color: '#fff', fontSize: '18px' }}>
					// 	<RenderMoreOptions dataObject={interactionViewData.taskScheduler} />
					// </Link>,
					// <Link key={3} style={{ color: "#fff", fontSize: "18px" }}>
					//   <FontAwesomeIcon
					//     icon={faEllipsisVAlt}
					//     onClick={() => { renderMoreOptions(interactionViewData.taskScheduler) }}
					//     size="sm"
					//     className="interactionViewTopBarIcons"
					//   />
					// </Link>,
					<Link key={4} style={{ color: '#fff', fontSize: '18px' }}>
						<FontAwesomeIcon
							icon={faChevronLeft}
							onClick={handlePreviousClick}
							size='sm'
							className='interactionViewTopBarIcons'
						/>
					</Link>,
					<Link key={5} style={{ color: '#fff', fontSize: '18px' }}>
						<FontAwesomeIcon
							icon={faChevronRight}
							size='sm'
							onClick={handleNextClick}
							className='interactionViewTopBarIcons'
						/>
					</Link>
				]}
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					borderBottomRightRadius: '12px',
					borderBottomLeftRadius: '12px'
				}}
			>
				<Content>{InteractionViewPageHeaderDetail(interactionViewData)}</Content>
			</PageHeader>
			<div className='interactionViewBodyContent'>
				<InteractionDetailAndTimelineTabDetails
					detail={interactionViewData}
					timeline={verticalTimelineDetail}
				/>
				{interactionHistoryDetail && (
					<>
						<InteractionOccurenceCardView
							data={interactionHistoryDetail}
							detail={interactionViewData}
							controlStructureView={controlStructureView}
							controlStructureAdd={controlStructureAdd}
							// controlStructureViewRules={interactionViewRules}
							// controlStructureAddRules={interactionAddRules}
							// setLoading={setLoading}
						/>
						<div style={{ marginTop: '15px' }}></div>
					</>
				)}
				{/* <AttachmentsCardView
					data={interactionAttachments}
					interactionId={interactionViewData.taskScheduler.activityID}
				/> */}
				<AttachmentUploadModal
					type={'ACTIVITYADD'}
					selectedAccount={{
						scheme: interactionViewData?.taskScheduler?.activityID,
						refType: 'ACTIVITYADD'
					}}
					data={interactionAttachments}
					action={'view'}
				/>
				{interactionMiscellaneousDetail && (
					<MiscellaneousCardView detail={interactionMiscellaneousDetail.miscellaneous} />
				)}
				<BackToTop />
			</div>
		</>
	);
}

const InteractionDetailsCardView = (props) => {
	const interactiveDetails = props.data.taskScheduler;
	return (
		<Space direction='vertical' class='prospect-details' style={{ width: '100%' }} size={5}>
			<Row gutter={5}>
				<Col span={24}>
					<TextSubText text={interactiveDetails.subject} subtext='Subject' />
				</Col>
				<Col span={8}>
					<TextSubText text={interactiveDetails.opportunityName} subtext='Linked Opportunity' />
				</Col>
				<Col span={8}>
					<TextSubText text={interactiveDetails.activityPurposeName} subtext='Purpose' />
				</Col>
				<Col span={8}>
					<TextSubText text={interactiveDetails.priority} subtext='Priority' />
				</Col>
				<Col span={12}>
					<TextSubText
						// text={interactiveDetails.description}
						text={interactiveDetails.notes}
						subtext='Description'
					/>
				</Col>
				<Col span={8} offset={4}>
					<TextSubText text={interactiveDetails.lastUpdate} subtext='Last Update' />
				</Col>
				<Col span={8}>
					<TextSubText
						text={interactiveDetails.relationshipManagerName}
						subtext='Relationship Manager'
					/>
				</Col>
				<Col span={8}>
					<TextSubText text={interactiveDetails.branchName} subtext='Office' />
				</Col>
				<Col span={8}>
					<TextSubText text={interactiveDetails.created} subtext='Created' />
				</Col>
			</Row>
		</Space>
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
const InteractionDetailAndTimelineTabDetails = (props) => {
	const tabListNoTitle = [
		{
			key: 'InteractionDetails',
			tab: 'Interaction Details'
		},
		{
			key: 'Timeline',
			tab: 'Timeline'
		}
	];

	const interactionDetail = props.detail;
	const timeline = props.timeline;

	const contentListNoTitle = {
		InteractionDetails: <InteractionDetailsCardView data={interactionDetail} />,
		Timeline: <InteractionVerticalTimelineCardView data={timeline} />
	};

	const [noTitleKey, setnoTitleKey] = useState('InteractionDetails');
	const onTabChange = (key, type) => {
		setnoTitleKey(key);
	};

	return (
		<Card
			className='interactionViewCardDetail'
			bordered={false}
			style={{ width: '100%' }}
			tabList={tabListNoTitle}
			activeTabKey={noTitleKey}
			onTabChange={(key) => {
				onTabChange(key, 'noTitleKey');
			}}
		>
			{contentListNoTitle[noTitleKey]}
		</Card>
	);
};

const InteractionViewPageHeaderDetail = (props) => {
	// const interactionType = {
	// 	CH: faCommentDots,
	// 	C: faPhoneAlt,
	// 	V: faVideo,
	// 	E: faEnvelope,
	// 	O: faHexagon
	// };

	if (!props.taskScheduler) {
		return null;
	}
	return (
		<>
			<Row align='bottom' className='page-header'>
				<Col span={10}>
					<Row align='bottom'>
						<Col style={{ marginRight: '10px' }} align='middle'>
							{props.taskScheduler.profileImage ? (
								<img
									src={`data:image/jpeg;base64,${props.taskScheduler.profileImage}`}
									className='header-img'
									alt='user-img'
								/>
							) : (
								<div className='interactionInitialsCircleImg'>
									{props.taskScheduler.profileInitial}
								</div>
							)}
						</Col>
						<Col span={12} style={{ padding: '0 10px' }}>
							<Space direction='vertical'>
								<Title level={3} style={{ color: '#FFF', margin: 0 }}>
									{props.taskScheduler.clientProspectName}
								</Title>
								<Text type='secondary' style={{ color: '#D9DFFF', margin: 0 }}>
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										style={{ color: 'white', marginRight: '5px' }}
									/>
									{props.taskScheduler.address}
								</Text>
								<Text
									className='header-badge'
									style={{
										backgroundColor: '#D9DFFF',
										color: '#354081',
										padding: '4px 16px',
										borderRadius: '20px'
									}}
								>
									{props.taskScheduler.tagName}
								</Text>
								<Text type='secondary' style={{ color: '#D9DFFF', margin: 0 }}>
									<FontAwesomeIcon
										icon={faPhoneAlt}
										style={{ color: 'white', marginRight: '5px' }}
									/>
									{props.taskScheduler.mobile}
								</Text>
								<Text type='secondary' style={{ color: '#D9DFFF', margin: 0 }}>
									<FontAwesomeIcon
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
						<Row style={{ margin: '10px 0' }}>
							<Col span={8}>
								<HeaderIconTextSubText
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
								<HeaderTextSubText
									text={moment(props.taskScheduler.activityDate).format(getDateFormat())}
									subtext='Date'
								/>
							</Col>
							<Col span={8}>
								<HeaderTextSubText text={props.taskScheduler.activityStatusName} subtext='Status' />
							</Col>
						</Row>
						<Row style={{ margin: '10px 0' }} align='bottom'>
							<Col span={16}>
								<HeaderTextSubText text={props.taskScheduler.subject} subtext='Subject' />
							</Col>
							<Col span={8}>
								<HeaderTextSubText
									text={props.taskScheduler.activityPurposeName}
									subtext='Purpose'
								/>
							</Col>
							{/* <Col span={8}>
								<HeaderIconTextSubText
									icon={<FontAwesomeIcon icon={faVideo} size='lg' />}
									text={
										props.taskScheduler.nextOccurrenceDate
											? moment(props.taskScheduler.nextOccurrenceDate).format(getDateFormat())
											: ''
									}
									subtext='Next Occurence'
								/>
							</Col> */}
						</Row>
					</Space>
				</Col>
			</Row>
		</>
	);
};

const mapStateToProps = (state) => {
	const { interactionView } = state;
	const interactionViewData = interactionView.interactionViewData;
	const verticalTimelineDetail = interactionView.verticalTimelineDetail;
	const interactionHistoryDetail = interactionView.interactionHistoryDetail;
	const interactionAttachments = interactionView.interactionAttachments;
	const interactionMiscellaneousDetail = interactionView.interactionMiscellaneousDetail;
	const controlStructureView = interactionView.interactionViewControlStructure;
	const fullControlStructureView = interactionView.interactionViewControlStructureFull;
	const controlStructureAdd = interactionView.interactionAddControlStructure;
	const fullControlStructureAdd = interactionView.interactionAddControlStructureFull;
	return {
		interactionView,
		interactionViewData,
		verticalTimelineDetail,
		interactionHistoryDetail,
		interactionAttachments,
		interactionMiscellaneousDetail,
		controlStructureView,
		fullControlStructureView,
		controlStructureAdd,
		fullControlStructureAdd,
		leftPanel: state.dashboard.leftPanel
	};
};

const mapDispatchToProps = {
	excecuteGetInteractionViewCs,
	excecuteGetInteractionAddCs,
	excecuteGetInteractionView,
	executeSaveInteractionEditDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractionViewScreen);

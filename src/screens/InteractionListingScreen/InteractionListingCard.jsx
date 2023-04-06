import {
	faEllipsisHAlt,
	faPhoneAlt,
	faCommentAlt,
	faUserFriends,
	faEnvelope,
	faTrashAlt
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Checkbox, Col, Popover, Row, Button, Radio } from 'antd';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
// import SuccessModal from '../SuccessModal/SuccessModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { executeGetAllInteractionData } from '../../redux/actions/interactionListingActions';
import { ScFontAwesomeIcon, ScTag } from '../../components/StyledComponents/genericElements';
import './interactionListingCard.scss';
import CloseInteraction from '../../screens/InteractionViewScreen/InteractionModal/CloseIteractionModal';
import { updateCloseOccurrenceApi } from '../../api/interactionViewApi';

const FavIcon = styled.div`
	font-size: 2.5vw;
`;
const StyledInteractionName = styled.span`
	width: 75% !important;
	font-family: Open Sans;
	font-weight: 600;
	// font-size: 1.45vw;
	font-size: 1.3vw;
	line-height: 33px;
	color: #222747;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const StyledAmountDiv = styled.div`
	width: 75%;
	font-family: Open Sans;
	font-weight: 600;
	// font-size: 1.2vw;
	font-size: 0.9vw;
	color: #222747;
`;
const StyledCard = styled(Card)`
	width: 100% !important;
	border-radius: 8px !important;
	.ant-card-head {
		min-height: 18px;
		height: 32px;
		border: none;
		padding: 0 16px 0 10px;
		.ant-card-head-title {
			padding: 0;
		}
	}
	.ant-card-body {
		margin: 0 16px 10px 32px;
		padding: 0;
	}

	@media screen and (min-width: 1400px) {
		.ant-card-body {
			margin: 24px 16px 10px 46px;
			padding: 0;
		}
	}
`;
const StyledCardOptionsWrapper = styled.div`
	display: float;
	align-items: center;
	// justify-content: space-between;
`;
const StyledCardHeaderWrapper = styled(Row)`
	.card-title {
		width: 75%;
		white-space: nowrap;
		overflow: hidden !important;
		text-overflow: ellipsis;
	}
`;
const InteractionListingCard = ({
	data,
	setLocalInteractionData,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	executeGetAllInteractionData,
	InteractionStageData,
	setInteractionStageData,
	setShowUpdateStageModal,
	loading,
	authorizeCode,
	setLoading,
	type
}) => {
	const [selectedInteraction, setSelectedInteraction] = useState('');
	const [showCloseInteractionModal, setShowCloseInteractionModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [dataForEdit, setDataForEdit] = useState();
	const [activityForEdit, setActivityForEdit] = useState();
	const history = useHistory();
	const { path } = useRouteMatch();
	const [value, setValue] = useState(1);
	const onRadioChange = (e) => {
		setValue(e.target.value);
	};
	const radioStyle = {
		display: 'block',
		height: '30px',
		lineHeight: '30px',
		fontSize: 'large'
	};
	const styleset = {
		styleOne: {
			display: 'flex',
			flexDirection: 'column',
			fontFamily: 'Open Sans',
			fontWeight: 600,
			// fontSize: '1.9rem',
			fontSize: '18px',
			// lineHeight: '27px',
			color: '#696a91',
			marginLeft: '5%'
		},
		styleTwo: {
			width: '92px',
			textAlign: 'center',
			background: '#f0f2fb',
			borderRadius: '16px',
			fontFamily: 'Open Sans',
			fontSize: '16px',
			lineHeight: '24px',
			color: '#696a91',
			fontWeight: 'bold'
			// marginLeft: '-25px'
		},
		styleThree: {
			fontFamily: 'Open Sans',
			fontSize: '1rem',
			lineHeight: '25px',
			color: '#696a91',
			// font-weight: 600,
			whiteSpace: 'nowrap',
			overflow: 'hidden'
		}
	};

	/// Edit Modal Start
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
						onClick={() => handleEditInteractionClick(activityForEdit, dataForEdit)}
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
	//// Edit Modal End

	// View Record's
	const viewRecord = (rowIndex) => {
		// const InteractionIds = data.map((item) => item.id);
		// const toObject = {
		// 	pathname: `${path}/InteractionView`,
		// 	state: { InteractionIds: InteractionIds, rowIndex: rowIndex }
		// };
		// history.push(toObject);
	};

	/// Interaction Create
	function handleCreateInteractionClick(dataobject) {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: { screen: 'interaction-list', data: dataobject.record, mode: 'create' }
		};

		history.push(toObject);
	}

	/// Create Opportunity
	function handleCreateOpportunityClick(dataobject) {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate',
			state: { screen: 'oppo-list', data: dataobject.record, mode: 'create' }
		};
		history.push(toObject);
	}

	// const handleUpdateProspectClick = (prospectId) => {
	// 	const toObject = {
	// 		pathname: '/dashboard/MyProspect/ProspectCreate',
	// 		state: { screen: 'listing', data: prospectId }
	// 	};
	// 	history.push(toObject);
	// };

	/// Edit Interaction
	const handleEditInteractionClick = (record, activityID, val) => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: {
				screen: 'list',
				data: record.record,
				activityID: record.record.activityID,
				mode: 'edit',
				singleOrMultiple: val ? val : value
			}
		};
		history.push(toObject);
	};

	/// Create Task
	const handleCreateTaskClick = (id) => {
		const toObject = {
			pathname: `/dashboard/TaskBoard/TaskCreate`,
			state: { screen: 'task-list', data: id.record, mode: 'create' }
		};
		history.push(toObject);
	};

	/// Close Modal
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

	const handleCloseInteractionClick = (id, record) => {
		setSelectedInteraction(id.record);
		setShowCloseInteractionModal(true);
	};

	const RenderMoreOptions = (id, record) => {
		const options =
			record.followUpActivityStatus === 'Deferred' || record.followUpActivityStatus === 'Completed'
				? [
						// "Take Note",
						'Create New Interaction',
						'Create Task',
						'Create Opportunity'
						// 'Update Prospect/Client'
				  ]
				: [
						'Edit',
						'Close',
						// "Take Note",
						'Create New Interaction',
						'Create Task',
						'Create Opportunity'
						// 'Update Prospect/Client'
				  ].filter((type) => {
						switch (type) {
							case 'Edit':
								return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify);
							case 'Close':
								return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete);
							default:
								return true;
						}
				  });
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
								setDataForEdit(id.record);
								setActivityForEdit(id.record);
								setSelectedRowKeys([...selectedRowKeys, id.record.id]);
								setSelectedRows([...selectedRows, record.record]);
								// option.toLowerCase() === 'edit' && handleEditInteractionClick();
								option.toLowerCase() === 'edit' &&
									id.record.occurrence > 1 &&
									setShowEditModal(true);
								option.toLowerCase() === 'edit' &&
									id.record.occurrence === 1 &&
									handleEditInteractionClick(id, record, 2);
								option.toLowerCase() === 'close' && handleCloseInteractionClick(id, record);
								option.toLowerCase() === 'create task' && handleCreateTaskClick(id, record);
								option.toLowerCase() === 'create new interaction' &&
									handleCreateInteractionClick(id, record);
								option.toLowerCase() === 'create opportunity' &&
									handleCreateOpportunityClick(id, record);
								// option.toLowerCase() === 'update prospect/client' && handleUpdateProspectClick();
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<div
				className='col-more'
				// onClick={(e) => {
				//   e.stopPropagation();
				// }}
			>
				<Popover
					placement='bottomLeft'
					content={content}
					overlayClassName='interaction-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};
	const RenderClientProspectProfile = ({ record }) => (
		<Row
			id='profile-duedate-row'
			align='stretch'
			justify='space-between'
			className='client-prospect-profile'
		>
			<Col span={window.innerWidth < 1400 ? 7 : 6}>
				<AvatarLogo
					imgsrc={record.profileImage}
					profileName={record.profileInitial}
					avatarSize={window.innerWidth < 1400 ? 40 : 56}
				/>
			</Col>
			<Col span={window.innerWidth < 1400 ? 17 : 18}>
				<div
					// className='name'
					style={styleset.styleOne}
				>
					{record.clientProspectName}
				</div>
				<div
					className='profile-tag'
					style={{
						fonSize: '20px',
						display: 'flex',
						flexDirection: 'column',
						fontFamily: 'Open Sans',
						fontWeight: 400,
						// lineHeight: '27px',
						color: '#696a91',
						marginLeft: '5%'
					}}
				>
					{record.tagName.charAt(0).toUpperCase() + record.tagName.substring(1).toLowerCase()}
				</div>
			</Col>
		</Row>
	);
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
			// case 'Other':
			// 	return faHexagon;
			default:
				return '';
		}
	};
	const RenderRecords = ({ record, index, interactionTypeName }) => {
		return (
			<div className='record-card'>
				<div className='col-text'>{record.activityPurposeName}</div>
				<Row align='middle' justify='space-between'>
					<StyledCardHeaderWrapper align='middle' className='col-text'>
						<ScFontAwesomeIcon
							icon={setActivityIcon(record.interactionTypeName)}
							style={{ marginRight: 2 }}
							fontSize={window.innerWidth < 1400 ? '8px' : '12px'}
						/>
						{record.interactionTypeName}
					</StyledCardHeaderWrapper>
					<div style={styleset.styleTwo}>{record.followUpActivityStatus}</div>
				</Row>

				{/* Change for radio */}

				<Row align='middle' justify='space-between' className='profile-duedate-section'>
					<Col span={window.innerWidth < 1400 ? 17 : 18}>
						<RenderClientProspectProfile record={record} />
					</Col>
					<Col span={window.innerWidth < 1400 ? 7 : 6}>
						<div className='due-date'>
							<span
								// className='date'
								style={styleset.styleThree}
							>
								{moment(record.activityDate).format('DD MMM YYYY')}
							</span>
							<div className='text'>Date</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	};

	const RenderFavourite = ({ record }) => (
		<FavIcon
		// onClick={(e) => {
		//     e.stopPropagation();
		//     addFavouriteInteractionApi(
		//         record.InteractionId,
		//         CONSTANTS.progNames.INTERACTIONADD
		//     ).then((res) => {
		//         if (res.data) {
		//             executeGetAllInteractionData(setLocalInteractionData, setLoading);
		//         }
		//     });
		// }}
		>
			{record.isFavourite ? (
				<span className='favourite-icon active'>&#9733;</span>
			) : (
				// <FontAwesomeIcon icon={faStar} size="2x" className="favourite-icon" />
				<span className='favourite-icon inactive'>&#9734;</span>
			)}
		</FavIcon>
	);

	const RenderCardHeader = ({ record }) => (
		<StyledCardHeaderWrapper align='middle'>
			<Col span={2}>
				<Checkbox
					value={record.id}
					checked={selectedRowKeys.includes(record.id)}
					onClick={(e) => {
						e.stopPropagation();
						if (e.target.checked) {
							setSelectedRowKeys([...selectedRowKeys, record.id]);
							setSelectedRows([...selectedRows, record]);
						} else {
							setSelectedRowKeys([
								...selectedRowKeys.filter((key) => {
									return key !== record.id;
								})
							]);
							setSelectedRows([
								...selectedRows.filter((row) => {
									return row.id !== record.id;
								})
							]);
						}
					}}
					InteractionName={record.subject}
					record={record}
				/>
			</Col>
			<Col
				span={17}
				// className='card-title'
				className='col-text col-interaction-name'
			>
				<div>{record.subject}</div>
			</Col>
			<Col span={5}>
				<StyledCardOptionsWrapper>
					{/* <RenderFavourite record={record} /> */}
					<RenderMoreOptions record={record} />
				</StyledCardOptionsWrapper>
			</Col>
		</StyledCardHeaderWrapper>
	);
	const handleFailModalOkOrCancel = () => {
		setShowFailModal(false);
	};
	const onOkSuccessModal = () => {
		executeGetAllInteractionData(setLocalInteractionData, setLoading);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		setShowSuccessModal(false);
		const toObject = {
			pathname: '/dashboard/MyInteractions'
		};
		history.push(toObject);
	};
	return data ? (
		<Row align='middle' justify='space-between'>
			{showCloseInteractionModal ? (
				<CloseInteraction
					showCloseInteractionModal={showCloseInteractionModal}
					setShowCloseInteractionModal={setShowCloseInteractionModal}
					closeInteractionApi={closeInteraction}
					selectedInteraction={selectedInteraction}
					setSelectedRowKeys={setSelectedRowKeys}
					setSelectedRows={setSelectedRows}
				/>
			) : (
				''
			)}
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
			<RenderDisplayShowModal />
			{/* <Checkbox.Group> */}
			{data.map((record, index) => (
				<Col span={8} style={{ padding: '10px 10px 10px 0' }}>
					<StyledCard
						key={record.id}
						loading={loading}
						title={!loading && <RenderCardHeader record={record} />}
						className='opp-listing-card-container'
						style={
							selectedRowKeys.includes(record.id)
								? {
										background: 'rgb(233, 237, 255)',
										boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
								  }
								: {}
						}
						onClick={() => {
							viewRecord(index);
						}}
					>
						<RenderRecords record={record} index={index} />
					</StyledCard>
				</Col>
			))}
			{/* </Checkbox.Group> */}
		</Row>
	) : null;
};
const mapDispatchToProps = {
	executeGetAllInteractionData
};

export default connect(null, mapDispatchToProps)(InteractionListingCard);

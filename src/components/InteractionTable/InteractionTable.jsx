import React, { useState } from 'react';
import { Table, Popover, Button, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsisHAlt,
	faPhoneAlt,
	faTrashAlt,
	faUserFriends,
	faEnvelope,
	faHexagon
} from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import './InteractionTable.scss';
import { useHistory } from 'react-router-dom';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../Avatar/AvatarLogo';
import Modal from 'antd/lib/modal/Modal';
import SuccessModal from '../SuccessModal/SuccessModal';
import FailModal from '../Modal/FailModal/FailModal';
import { updateCloseOccurrenceApi } from '../../api/interactionViewApi';
import { executeGetAllInteractionData } from '../../redux/actions/interactionListingActions';
import { connect } from 'react-redux';
import CustomModal from '../Modal/CustomModal/CustomModal';
import CloseInteraction from '../../screens/InteractionViewScreen/InteractionModal/CloseIteractionModal';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { ScButtonPrimary, ScButtonText } from '../StyledComponents/genericElements';

const InteractionTable = ({
	loading,
	onCellDefault,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	tableData,
	setLocalInteractionData,
	setLoading,
	executeGetAllInteractionData,
	authorizeCode
}) => {
	// render table columns
	const history = useHistory();
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);
	const [showCloseInteractionModal, setShowCloseInteractionModal] = useState(false);
	const [showTitleStageModal, setShowTitleStageModal] = useState(false);
	const [selectedInteraction, setSelectedInteraction] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [showEditModal, setShowEditModal] = useState(false);
	const [dataForEdit, setDataForEdit] = useState();
	const [activityForEdit, setActivityForEdit] = useState();
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
					<ScButtonText
						key='back'
						type='text'
						onClick={() => {
							setShowEditModal(false);
						}}
					>
						Cancel
					</ScButtonText>
					<ScButtonPrimary
						key='submit'
						type='primary'
						onClick={() => handleEditInteractionClick(activityForEdit, dataForEdit)}
					>
						Edit
					</ScButtonPrimary>
					{/* <Button
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
					</Button> */}
				</div>
			</>
		);
		return (
			<CustomModal handleCancel={() => setShowEditModal(false)} visible={showEditModal}>
				<ConfirmScreen />
			</CustomModal>
		);
	};

	/// Activity Icon for Listing Type
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

	const renderSubjectColumn = (subject, dataObject) => {
		return (
			<div className='col-text col-interaction-name'>
				<div>{dataObject.subject}</div>
				<div className='status-tag'>{dataObject.followUpActivityStatus}</div>
			</div>
		);
	};
	const renderDueDateColumn = (activityDate, dataObject) => {
		return (
			<div className='col-text'>
				<div>{moment(dataObject.endDate).format('DD MMM YYYY')}</div>
			</div>
		);
	};
	const renderPurposeColumn = (activityPurposeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.activityPurposeName}</div>
			</div>
		);
	};

	const renderInteractionTypeColumn = (interactionTypeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>
					<FontAwesomeIcon icon={setActivityIcon(interactionTypeName)} />
					&nbsp;{dataObject.interactionTypeName}
				</div>
			</div>
		);
	};
	const renderClientProspectProfile = (clientProspectName, dataObject) => {
		return (
			<div className='col-profile'>
				<div>
					{dataObject.profileImage === null || dataObject.profileImage === 'U' ? (
						<AvatarLogo
							imgsrc={dataObject.profileImage}
							profileName={dataObject.profileInitial}
							avatarSize={AvatarSize.small}
						/>
					) : (
						// <Avatar size={64}>
						//   {dataObject.profileInitial}
						// </Avatar>
						<AvatarLogo
							imgsrc={dataObject.profileImage}
							profileName={dataObject.profileInitial}
							avatarSize={AvatarSize.small}
						/>
						// <Avatar
						//   size={64}
						//   className="avatar"
						//   style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
						//   icon={
						//     <img src={`data:image/jpeg;base64,${dataObject.profileImage}`} alt="img" />
						//   }
						// />
					)}
				</div>
				<div className='profile-details' style={{ paddingLeft: '8px' }}>
					<div>{dataObject.clientProspectName}</div>
					<div className='profile-tag'>
						{dataObject.tagName.charAt(0).toUpperCase() +
							dataObject.tagName.substring(1).toLowerCase()}
					</div>
				</div>
			</div>
		);
	};

	function handleCreateInteractionClick(id, dataObject, activityID) {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: { screen: 'interaction-list', data: dataObject, mode: 'create' }
		};
		history.push(toObject);
	}

	const handleCreateTaskClick = (id, dataObject, activityID) => {
		const toObject = {
			pathname: `/dashboard/TaskBoard/TaskCreate`,
			state: { screen: 'task-list', data: dataObject, mode: 'create' }
		};
		history.push(toObject);
	};

	function handleCreateOpportunityClick(activityID, dataObject) {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate',
			state: { screen: 'oppo-list', data: dataObject, mode: 'create' }
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

	const handleEditInteractionClick = (activityID, dataObject, val) => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			// state: { screen: "list", data: activityID, mode: "edit", dataObject, },
			state: {
				screen: 'list',
				data: dataObject,
				activityID: activityID,
				mode: 'edit',
				singleOrMultiple: val ? val : value
			}
		};
		history.push(toObject);
	};
	const handleCloseInteractionClick = (id, dataObject) => {
		setSelectedInteraction(dataObject);
		setShowCloseInteractionModal(true);
	};
	const renderMoreOptions = (id, dataObject) => {
		const options =
			dataObject.followUpActivityStatus === 'Deferred' ||
			dataObject.followUpActivityStatus === 'Completed'
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
								setDataForEdit(dataObject);
								setActivityForEdit(id);
								setSelectedRowKeys([...selectedRowKeys, id]);
								setSelectedRows([...selectedRows, dataObject]);
								// option.toLowerCase() === "edit" && handleEditInteractionClick(id, dataObject);
								option.toLowerCase() === 'edit' &&
									dataObject.occurrence > 1 &&
									setShowEditModal(true);
								option.toLowerCase() === 'edit' &&
									dataObject.occurrence === 1 &&
									handleEditInteractionClick(id, dataObject, 2);
								option.toLowerCase() === 'close' && handleCloseInteractionClick(id, dataObject);
								option.toLowerCase() === 'create task' && handleCreateTaskClick(id, dataObject);
								//   option.toLowerCase() === "take note" && setShowTitleStageModal(true);
								option.toLowerCase() === 'create new interaction' &&
									handleCreateInteractionClick(id, dataObject);
								option.toLowerCase() === 'create opportunity' &&
									handleCreateOpportunityClick(id, dataObject);
								option.toLowerCase() === 'update prospect/client' &&
									handleUpdateProspectClick(id, dataObject);
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<div className='col-more'>
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
	const columns = [
		{
			//      width: 324,
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			onCell: onCellDefault,
			render: (subject, dataObject) => renderSubjectColumn(subject, dataObject)
		},
		{
			// width: 200,
			title: 'Type',
			dataIndex: 'interactionTypeName',
			key: 'interactionTypeName',
			onCell: onCellDefault,
			render: (interactionTypeName, dataObject) =>
				renderInteractionTypeColumn(interactionTypeName, dataObject)
		},
		{
			// width: 200,
			title: 'Due Date',
			dataIndex: 'activityDate',
			key: 'activityDate',
			onCell: onCellDefault,
			render: (activityDate, dataObject) => renderDueDateColumn(activityDate, dataObject)
		},
		{
			title: 'Purpose',
			key: 'activityPurposeName',
			dataIndex: 'activityPurposeName',
			onCell: onCellDefault,
			render: (activityPurposeName, dataObject) =>
				renderPurposeColumn(activityPurposeName, dataObject)
		},
		{
			float: 'left',
			title: 'Client / Prospect Name',
			dataIndex: 'clientProspectName',
			key: 'clientProspectName',
			// width: 304,
			onCell: onCellDefault,
			render: (clientProspectName, dataObject) =>
				renderClientProspectProfile(clientProspectName, dataObject)
		},
		{
			title: '',
			dataIndex: 'id',
			key: 'id',
			render: (id, dataObject) => renderMoreOptions(id, dataObject)
		}
	];
	const rowSelection = {
		onChange: (rowKeys, rows) => {
			setSelectedRowKeys(rowKeys);
			setSelectedRows(rows);
		},
		onSelectAll: (enabled) => {
			if (enabled) {
				setShowSelectAllofAllPrompt(true);
			} else {
				setShowSelectAllofAllPrompt(false);
				setSelectedRowKeys([]);
				setSelectedRows([]);
			}
		},
		getCheckboxProps: (record) => ({
			disabled: record.id === 'Disabled User',
			// Column configuration not to be checked
			name: record.id
		}),
		selectedRowKeys: selectedRowKeys
	};
	const selectAllRecords = () => {
		setSelectedRowKeys(tableData.map((item) => item.activityID));
		setSelectedRows(tableData);
	};
	const clearSelection = () => {
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	/**
	 * API call for Close Interaction
	 */
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
		executeGetAllInteractionData(setLocalInteractionData, setLoading);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		setShowSuccessModal(false);
		const toObject = {
			pathname: '/dashboard/MyInteractions'
		};
		history.push(toObject);
	};

	return (
		<div className='interaction-table-container'>
			{showCloseInteractionModal ? (
				<CloseInteraction
					showCloseInteractionModal={showCloseInteractionModal}
					setShowCloseInteractionModal={setShowCloseInteractionModal}
					closeInteractionApi={closeInteraction}
					selectedInteraction={selectedInteraction}
					setSelectedRowKeys={setSelectedRowKeys}
					setSelectedRows={setSelectedRows}
					screen='Interaction'
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
			{selectedRowKeys.length > 0 && (
				<span className='selected-record-count'>
					{showSelectAllofAllPrompt ? (
						<>
							<div>All {selectedRowKeys.length} Records on this page are selected.&nbsp;</div>
							{selectedRowKeys.length !== tableData.length ? (
								<Button
									type='link'
									className='link'
									onClick={() => {
										selectAllRecords();
									}}
									style={{ padding: 0 }}
								>
									Select all {tableData.length} Records
								</Button>
							) : (
								<Button
									type='link'
									className='link'
									onClick={() => {
										clearSelection();
									}}
									style={{ padding: 0 }}
								>
									Clear Selection
								</Button>
							)}
						</>
					) : (
						<div>
							{selectedRowKeys.length} Record
							{selectedRowKeys.length > 1 ? 's' : ' '}
							&nbsp;on this page {selectedRowKeys.length > 1 ? 'are' : 'is'} selected.&nbsp;
						</div>
					)}
				</span>
			)}
			<RenderDisplayShowModal />
			<Table
				loading={loading}
				rowClassName='interaction-list-table-row'
				rowKey='id'
				rowSelection={rowSelection}
				columns={columns}
				dataSource={tableData}
				pagination={{
					position: ['topRight'],
					pageSize: 25,
					showSizeChanger: false
				}}
			/>
		</div>
	);
};
const mapDispatchToProps = {
	executeGetAllInteractionData
};
export default connect(null, mapDispatchToProps)(InteractionTable);

import React, { useState } from 'react';
import { Avatar, Table, Popover, Button, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsisHAlt,
	faPhoneAlt,
	faTrashAlt,
	faUserFriends,
	faEnvelope,
	faHexagon
} from '@fortawesome/pro-light-svg-icons';
import Modal from 'antd/lib/modal/Modal';
import SuccessModal from '../SuccessModal/SuccessModal';
import FailModal from '../Modal/FailModal/FailModal';
import moment from 'moment';
// import './TaskTable.scss';
import { useHistory, useLocation } from 'react-router-dom';
import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import CloseInteraction from '../../screens/InteractionViewScreen/InteractionModal/CloseIteractionModal';
import { executeGetAllTaskData } from '../../redux/actions/taskListingActions';
import { updateCloseOccurrenceApi } from '../../api/interactionViewApi';
import { connect } from 'react-redux';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../Modal/CustomModal/CustomModal';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { ScButtonPrimary, ScButtonText } from '../StyledComponents/genericElements';

const TicketSupportTable = ({
	loading,
	onCellDefault,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	tableData,
	executeGetAllTaskData,
	setLocalTaskData,
	setLoading,
	authorizeCode
}) => {
	// render table columns
	const history = useHistory();
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);
	const [showCloseInteractionModal, setShowCloseInteractionModal] = useState(false);
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
						onClick={() => handleEditTaskClick(activityForEdit, dataForEdit)}
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
						onClick={() => handleEditTaskClick(activityForEdit, dataForEdit)}
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
	const renderSubjectColumn = (subject, dataObject) => {
		return (
			<div className='col-text col-task-name'>
				<div>{dataObject.subject}</div>
				<div className='status-tag'>{dataObject.followUpActivityStatus}</div>
			</div>
		);
	};
	const renderDueDateColumn = (activityDate, dataObject) => {
		return (
			<div className='col-text'>
				<div>{moment(dataObject.activityDate).format('DD MMM YYYY')}</div>
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
	const renderTaskTypeColumn = (interactionTypeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>
					<FontAwesomeIcon icon={setActivityIcon(interactionTypeName)} /> &nbsp;{' '}
					{dataObject.interactionTypeName}
				</div>
			</div>
		);
	};
	const renderClientProspectProfile = (clientProspectName, dataObject) => {
		return (
			<div className='col-profile'>
				<div>
					<AvatarLogo
						imgsrc={dataObject.profileImage}
						profileName={dataObject.profileInitial}
						avatarSize={AvatarSize.small}
					/>
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

	const handleCloseTaskClick = (id, dataObject) => {
		setSelectedInteraction(dataObject);
		setShowCloseInteractionModal(true);
	};

	const handleCreateInteractionClick = (activityID, dataObject) => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: { screen: 'task-list', data: dataObject, mode: 'create' }
		};

		history.push(toObject);
	};

	const handleCreateTaskClick = (activityID, dataObject) => {
		const toObject = {
			pathname: '/dashboard/TaskBoard/TaskCreate',
			state: { screen: 'task-list', data: dataObject, mode: 'create' }
		};

		history.push(toObject);
	};

	const handleCreateOpportunityClick = (activityID, dataObject) => {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate',
			state: { screen: 'task-list', data: dataObject, mode: 'create' }
		};

		history.push(toObject);
	};

	// const handleUpdateProspectClick = (prospectId) => {
	//   const toObject = {
	//     pathname: "/dashboard/MyProspect/ProspectCreate",
	//     state: { screen: "listing", data: prospectId },
	//   };
	//   history.push(toObject);
	// };

	const handleEditTaskClick = (activityID, dataObject, val) => {
		const toObject = {
			pathname: '/dashboard/TaskBoard/TaskCreate',
			state: {
				screen: 'list',
				data: dataObject,
				mode: 'edit',
				activityID: activityID,
				singleOrMultiple: val ? val : value
			}
		};
		history.push(toObject);
	};

	const renderMoreOptions = (activityID, dataObject) => {
		const options =
			dataObject.followUpActivityStatus === 'Deferred' ||
			dataObject.followUpActivityStatus === 'Completed'
				? [
						// "Take Note",
						'Create New Interaction',
						'Create Task',
						'Create Opportunity'
						// "Update Prospect/Client",
				  ]
				: [
						'Edit',
						'Close',
						// "Take Note",
						'Create New Interaction',
						'Create Task',
						'Create Opportunity'
						// "Update Prospect/Client",
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
								setActivityForEdit(activityID);
								setSelectedRowKeys([...selectedRowKeys, activityID]);
								setSelectedRows([...selectedRows, dataObject]);
								// option.toLowerCase() === "edit" && handleEditTaskClick(activityID, dataObject);
								option.toLowerCase() === 'edit' &&
									dataObject.occurrence > 1 &&
									setShowEditModal(true);
								option.toLowerCase() === 'edit' &&
									dataObject.occurrence === 1 &&
									handleEditTaskClick(activityID, dataObject, 2);
								option.toLowerCase() === 'close' && handleCloseTaskClick(activityID, dataObject);
								option.toLowerCase() === 'create new interaction' &&
									handleCreateInteractionClick(activityID, dataObject);
								option.toLowerCase() === 'create opportunity' &&
									handleCreateOpportunityClick(activityID, dataObject);
								option.toLowerCase() === 'create task' &&
									handleCreateTaskClick(activityID, dataObject);
								// option.toLowerCase() === "update prospect/client" &&
								//   handleUpdateProspectClick();
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
					overlayClassName='task-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};
	const columns = [
		{
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
				renderTaskTypeColumn(interactionTypeName, dataObject)
		},
		{
			// width: 200,
			title: 'Date',
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
			width: 364,
			onCell: onCellDefault,
			render: (clientProspectName, dataObject) =>
				renderClientProspectProfile(clientProspectName, dataObject)
		},
		{
			title: '',
			dataIndex: 'activityID',
			key: 'activityID',
			render: (activityID, dataObject) => renderMoreOptions(activityID, dataObject)
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
			disabled: record.activityID === 'Disabled User',
			// Column configuration not to be checked
			name: record.activityID
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

	const onOkSuccessModal = () => {
		executeGetAllTaskData(setLocalTaskData, setLoading);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		setShowSuccessModal(false);
		const toObject = {
			pathname: '/dashboard/TaskBoard'
		};
		history.push(toObject);
	};
	const handleFailModalOkOrCancel = () => {
		setShowFailModal(false);
	};

	return (
		<div className='task-table-container'>
			{showCloseInteractionModal ? (
				<CloseInteraction
					showCloseInteractionModal={showCloseInteractionModal}
					setShowCloseInteractionModal={setShowCloseInteractionModal}
					closeInteractionApi={closeInteraction}
					selectedInteraction={selectedInteraction}
					setSelectedRowKeys={setSelectedRowKeys}
					setSelectedRows={setSelectedRows}
					screen='Task'
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
				rowClassName='task-list-table-row'
				rowKey='followUpID'
				rowSelection={rowSelection}
				// onRow={onRow}
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
	executeGetAllTaskData
};
export default connect(null, mapDispatchToProps)(TicketSupportTable);

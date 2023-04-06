import React, { useState } from 'react';
import { Table, Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisHAlt, faPhoneAlt } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
//import "./InteractionTable.scss";
import { useHistory } from 'react-router-dom';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../Avatar/AvatarLogo';
import Modal from 'antd/lib/modal/Modal';
import SuccessModal from '../SuccessModal/SuccessModal';
import FailModal from '../Modal/FailModal/FailModal';
import { updateCloseOccurrenceApi } from '../../api/interactionViewApi';
import { executeGetAllInteractionData } from '../../redux/actions/interactionListingActions';
import { connect } from 'react-redux';
import CloseInteraction from '../../screens/InteractionViewScreen/InteractionModal/CloseIteractionModal';

export const BANKDETAILS_DATA_M = [
	{
		key: '0',
		subject: 'Hi',
		followUpActivityStatus: 'Active',
		activityDate: '12 Jan 2021',
		activityPurposeName: 'Close',
		activityName: 'won',
		interactionTypeName: '$2000',
		interactionName: '00',
		clientProspectName: 'AAA',
		tagName: 'Wealth'
	},
	{
		key: '1',
		subject: 'Hi',
		followUpActivityStatus: 'Active',
		activityDate: '12 Jan 2021',
		activityPurposeName: 'Close',
		activityName: 'won',
		interactionTypeName: '$2000',
		interactionName: '00',
		clientProspectName: 'AAA',
		tagName: 'Wealth'
	}
];
const OpportunityTableModal = ({
	loading,
	onCellDefault,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	tableData = BANKDETAILS_DATA_M,
	setLocalInteractionData,
	setLoading,
	executeGetAllInteractionData,
	dataObject
}) => {
	// render table columns
	const history = useHistory();
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);
	const [showCloseInteractionModal, setShowCloseInteractionModal] = useState(false);
	const [selectedInteraction, setSelectedInteraction] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
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
				<div>{moment(dataObject.activityDate).format('DD MMM YYYY')}</div>
			</div>
		);
	};
	const renderPurposeColumn = (activityPurposeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.activityPurposeName}</div>
				<div>{dataObject.activityName}</div>
			</div>
		);
	};
	const renderInteractionTypeColumn = (interactionTypeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>
					{dataObject.interactionTypeName}
					<br />
					{dataObject.interactionName}
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
						<AvatarLogo
							imgsrc={dataObject.profileImage}
							profileName={dataObject.profileInitial}
							avatarSize={AvatarSize.small}
						/>
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
	function handleCreateInteractionClick() {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	}

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

	const handleEditInteractionClick = (activityID, dataObject) => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: { screen: 'list', data: activityID, mode: 'edit', dataObject }
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
			dataObject.followUpActivityStatus === 'Cmpleted'
				? [
						'Take Note',
						'Create New Interaction',
						'Create Task',
						'Create Opportunity',
						'Update Prospect/Client'
				  ]
				: [
						'Edit',
						'Close',
						'Take Note',
						'Create New Interaction',
						'Create Task',
						'Create Opportunity',
						'Update Prospect/Client'
				  ];
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
								setSelectedRowKeys([...selectedRowKeys, id]);
								setSelectedRows([...selectedRows, dataObject]);
								option.toLowerCase() === 'edit' && handleEditInteractionClick(id, dataObject);
								option.toLowerCase() === 'close' && handleCloseInteractionClick(id, dataObject);
								option.toLowerCase() === 'create new interaction' && handleCreateInteractionClick();
								option.toLowerCase() === 'create opportunity' && handleCreateOpportunityClick();
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
			title: 'Opportunity',
			dataIndex: 'subject',
			key: 'subject',
			onCell: onCellDefault,
			render: (subject, dataObject) => renderSubjectColumn(subject, dataObject)
		},
		{
			// width: 200,
			title: 'Target',
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
			title: 'Stage',
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

	return (
		<div className='interaction-table-container'>
			{showCloseInteractionModal ? (
				<CloseInteraction
					showCloseInteractionModal={showCloseInteractionModal}
					setShowCloseInteractionModal={setShowCloseInteractionModal}
					//closeInteractionApi={closeInteraction}
					selectedInteraction={selectedInteraction}
					setSelectedRowKeys={setSelectedRowKeys}
					setSelectedRows={setSelectedRows}
				/>
			) : (
				''
			)}

			<Table
				loading={loading}
				rowClassName='interaction-list-table-row'
				rowKey='id'
				//rowSelection={rowSelection}
				columns={columns}
				dataSource={tableData}
				// pagination={{
				//     position: ["topRight"],
				//     pageSize: 25,
				//     showSizeChanger: false,
				// }}
			/>
		</div>
	);
};
export default OpportunityTableModal;

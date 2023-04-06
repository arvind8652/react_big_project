import React from 'react';
import { Avatar, Table, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisHAlt, faPhoneAlt } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import './InteractionTable.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { CONSTANTS } from '../../constants/constants';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../Avatar/AvatarLogo';

const TaskInteractionTable = ({ loading, tableData, miniMode = false }) => {
	// render table columns
	const history = useHistory();
	const renderSubjectColumn = (subject, dataObject) => {
		return (
			<div className='col-text col-interaction-name'>
				<div>{dataObject.activityDetail.subject}</div>
				<div className='status-tag'>{dataObject.activityDetail.activityStatus}</div>
			</div>
		);
	};
	const renderDueDateColumn = (activityDate, dataObject) => {
		return (
			<div className='col-text'>
				<div>{moment(dataObject.activityDetail.activityDate).format('DD MMM YYYY')}</div>
			</div>
		);
	};
	const renderPurposeColumn = (activityPurposeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.activityDetail.activityPurpose}</div>
			</div>
		);
	};
	const renderInteractionTypeColumn = (interactionTypeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>
					<FontAwesomeIcon icon={faPhoneAlt} /> &nbsp; {dataObject.activityDetail.interactionType}
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
					<div>{dataObject.name}</div>
					<div className='profile-tag'>
						{dataObject.activityDetail.refType &&
							dataObject.activityDetail.refType.charAt(0).toUpperCase() +
								dataObject.activityDetail.refType.substring(1).toLowerCase()}
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
			state: { screen: 'listing', data: prospectId }
		};
		history.push(toObject);
	};

	const handleEditInteractionClick = (activityID) => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	};
	const columns = [
		{
			width: 364,
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			render: (subject, dataObject) => renderSubjectColumn(subject, dataObject)
		},
		{
			// width: 200,
			title: 'Type',
			dataIndex: 'interactionTypeName',
			key: 'interactionTypeName',
			render: (interactionTypeName, dataObject) =>
				renderInteractionTypeColumn(interactionTypeName, dataObject)
		},
		{
			// width: 200,
			title: 'Due Date',
			dataIndex: 'activityDate',
			key: 'activityDate',
			render: (activityDate, dataObject) => renderDueDateColumn(activityDate, dataObject)
		},
		{
			title: 'Purpose',
			key: 'activityPurposeName',
			dataIndex: 'activityPurposeName',
			render: (activityPurposeName, dataObject) =>
				renderPurposeColumn(activityPurposeName, dataObject)
		},
		{
			float: 'left',
			title: 'Client / Prospect Name',
			dataIndex: 'clientProspectName',
			key: 'clientProspectName',
			// width: 364,
			render: (clientProspectName, dataObject) =>
				renderClientProspectProfile(clientProspectName, dataObject)
		}
	];

	return (
		<div className='interaction-table-container'>
			<Table
				loading={loading}
				rowClassName='interaction-list-table-row'
				rowKey='activityID'
				scroll={{
					y: miniMode ? '30vw' : false
				}}
				// rowSelection={rowSelection}
				// onRow={onRow}
				columns={columns}
				dataSource={tableData}
				pagination={false}
			/>
		</div>
	);
};

export default TaskInteractionTable;

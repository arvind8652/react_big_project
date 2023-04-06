import moment from 'moment';
import React from 'react';
import { Table } from 'antd';
import { AvatarSize } from '../../../constants/AvatarSize';
import AvatarLogo from '../../../components/Avatar/AvatarLogo';

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
const ModalTableView = ({ loading, onCellDefault, tableData = BANKDETAILS_DATA_M }) => {
	// render table columns

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
			key: 'id'
		}
	];

	return (
		<div className='interaction-table-container'>
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
export default ModalTableView;

import React, { useState } from 'react';
import { Table, Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { faSnowflake, faClipboardCheck } from '@fortawesome/pro-light-svg-icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
// import { addFavouriteProspectApi } from "../../api/prospectListingApi";
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

import './ProspectTable.scss';
import { ScRate } from '../StyledComponents/genericElements';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../Avatar/AvatarLogo';
const ProspectTable = ({
	loading,
	onCellDefault,
	onCellFavourite,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	tableData,
	setShowMovedownModal,
	miniMode,
	setConvertProspectModalOpen,
	setcurrentRowCount,
	setProspectViewRefId,
	authorizeCode
}) => {
	const history = useHistory();
	const { path } = useRouteMatch();
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);

	const renderContactColumn = (contact, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.mobile}</div>
				<div>{dataObject.email}</div>
			</div>
		);
	};
	const renderAvatarColumn = (profileImage, dataObject) => {
		return (
			<div>
				{dataObject.profileImage === null || dataObject.profileImage === 'U' ? (
					<AvatarLogo
						imgsrc={profileImage}
						profileName={dataObject.profileInitial}
						avatarSize={AvatarSize.medium}
					/>
				) : (
					<AvatarLogo
						imgsrc={profileImage}
						profileName={dataObject.profileInitial}
						avatarSize={AvatarSize.medium}
					/>
				)}
			</div>
		);
	};
	const renderProfileColumn = (profile, dataObject) => {
		if (!dataObject) return null;
		return (
			<div className='col-profile'>
				<div className='name'>{dataObject.name}</div>
				<div className='profile-tags'>
					<div className='category'>{dataObject.categoryName}</div>
					<div className='interest-level'>
						{dataObject.interestlevel && dataObject.interestlevel === 'H' ? (
							<FontAwesomeIcon icon={faHotjar} style={{ color: '#EF7C5B' }} />
						) : (
							<FontAwesomeIcon icon={faSnowflake} style={{ color: '#0085FF' }} />
						)}
					</div>
					<div className='qualification-status'>
						{dataObject.qualificationStatus && dataObject.qualificationStatus === 'Q' ? (
							<FontAwesomeIcon icon={faClipboardCheck} />
						) : (
							<div />
						)}
					</div>
				</div>
			</div>
		);
	};
	const renderSourceColumn = (source, dataObject) => {
		return <div className='col-text'>{source}</div>;
	};
	const renderTypeColumn = (type, dataObject) => {
		return <div className='col-text'>{type}</div>;
	};
	const renderRelationshipManagerColumn = (relationshipManagerName, dataObject) => {
		return <div className='col-text'>{relationshipManagerName}</div>;
	};
	const renderFavourite = (prospectId, dataObject) => {
		return (
			<div
				className='col-more'
				// onClick={(e) => {
				//   e.stopPropagation();
				//   addFavouriteProspectApi(
				//     dataObject.prospectId,
				//     CONSTANTS.progNames.PROSPECTADD
				//   ).then((res) => {
				//     if (res.data) {
				//       // executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
				//     }
				//   });
				// }}
			>
				<div
				// onClick={(e) => {
				//   toggleFavourite(e);
				// }}
				>
					<ScRate count={1} value={dataObject.isFavourite} />
					{/* {dataObject.isFavourite ? (
            <span className="favourite-icon active">&#9733;</span>
          ) : (
            <span className="favourite-icon inactive">&#9734;</span>
          )} */}
				</div>
			</div>
		);
	};

	const renderMoreOptions = (prospectId, dataObject) => {
		const options = [
			'Edit',
			'Convert',
			// "Move Down",
			// "Take Note",
			'Create Task',
			'Create Interaction',
			'Create Opportunity'
		].filter((type) => {
			switch (type) {
				case 'Edit':
					return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify);
				case 'Convert':
					return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.convert);
				default:
					return true;
			}
		});
		const onMoreMenuSelect = (task) => {
			let toObject;
			switch (task) {
				case 'Edit':
					toObject = {
						pathname: miniMode ? `MyProspect/ProspectCreate` : `${path}/ProspectCreate`,
						state: { screen: 'list', data: prospectId, action: 'edit' }
					};
					history.push(toObject);
					break;
				case 'Convert':
					setConvertProspectModalOpen(true);
					setProspectViewRefId(prospectId);
					setcurrentRowCount(dataObject?.rowNumber);
					break;
				// case "Move Down":
				//   setShowMovedownModal(true);
				//   break;
				case 'Create Task':
					toObject = {
						// pathname: miniMode ? `TaskBoard/TaskCreate` : `${path}/TaskCreate`,
						pathname: 'TaskBoard/TaskCreate',
						state: { screen: 'task-list', data: dataObject, mode: 'create' }
					};
					history.push(toObject);
					break;
				case 'Create Interaction':
					toObject = {
						pathname: `MyInteractions/InteractionCreate`,
						state: {
							screen: 'prospect-list',
							data: dataObject,
							mode: 'create'
						}
					};
					history.push(toObject);
					break;
				case 'Create Opportunity':
					toObject = {
						pathname: miniMode
							? `MyOpportunity/OpportunityCreate`
							: `MyOpportunity/OpportunityCreate`,
						state: {
							screen: 'prospect-list',
							data: dataObject,
							mode: 'create'
						}
					};
					history.push(toObject);
					break;
				default:
					break;
			}
		};
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
							onClick={(e) => {
								setSelectedRowKeys([prospectId]);
								setSelectedRows([dataObject]);
								onMoreMenuSelect(e.target.innerHTML);
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
					overlayClassName='prospect-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};
	const columns = [
		{
			float: 'right',
			title: ' ',
			dataIndex: 'profileImage',
			key: 'avatar',
			width: 64,
			onCell: onCellDefault,
			render: (profileImage, dataObject) => renderAvatarColumn(profileImage, dataObject)
		},
		{
			float: 'left',
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			onCell: onCellDefault,
			render: (name, dataObject) => renderProfileColumn(name, dataObject)
		},
		{
			title: 'Contact',
			dataIndex: 'contact',
			key: 'contact',
			onCell: onCellDefault,
			render: (contact, dataObject) => renderContactColumn(contact, dataObject)
		},
		{
			title: 'Source',
			dataIndex: 'sourceName',
			key: 'source',
			onCell: onCellDefault,
			render: (source, dataObject) => renderSourceColumn(source, dataObject)
		},
		{
			title: 'Type',
			key: 'type',
			dataIndex: 'typeName',
			onCell: onCellDefault,
			render: (type, dataObject) => renderTypeColumn(type, dataObject)
		},
		{
			// float: "left",
			title: 'Relationship Manager',
			dataIndex: 'relationshipManagerName',
			key: 'relationshipManagerName',
			width: 364,
			onCell: onCellDefault,
			render: (relationshipManagerName, dataObject) =>
				renderRelationshipManagerColumn(relationshipManagerName, dataObject)
		},
		{
			float: 'left',
			title: '',
			dataIndex: 'prospectId',
			key: 'prospectId',
			onCell: onCellFavourite,
			render: (prospectId, dataObject) => renderFavourite(prospectId, dataObject)
		},
		{
			float: 'left',
			title: '',
			dataIndex: 'prospectId',
			key: 'prospectId',

			render: (prospectId, dataObject) => {
				if (selectedRows.length < 2) return renderMoreOptions(prospectId, dataObject);
			}
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
			disabled: record.name === 'Disabled User',

			name: record.name
		}),
		selectedRowKeys: selectedRowKeys
	};
	const selectAllRecords = () => {
		setSelectedRowKeys(tableData.map((item) => item.prospectId));
		setSelectedRows(tableData);
	};
	const clearSelection = () => {
		setSelectedRowKeys([]);
		setSelectedRows([]);
		setShowSelectAllofAllPrompt(false);
	};

	return (
		<div className='prospect-table-container'>
			{selectedRowKeys.length > 0 && (
				<span className='selected-record-count'>
					{showSelectAllofAllPrompt ? (
						<>
							<div>All {selectedRowKeys.length} Prospects on this page are selected.&nbsp;</div>
							{selectedRowKeys.length !== tableData.length ? (
								<Button
									type='link'
									className='link'
									onClick={() => {
										selectAllRecords();
									}}
									style={{ padding: 0 }}
								>
									Select all {tableData.length} Prospects
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
							{selectedRowKeys.length} Prospect
							{selectedRowKeys.length > 1 ? 's' : ''}
							&nbsp;on this page {selectedRowKeys.length > 1 ? 'are' : 'is'} selected.&nbsp;
						</div>
					)}
				</span>
			)}
			<Table
				id='prospect-table'
				loading={loading}
				rowClassName='prospect-list-table-row'
				rowKey='prospectId'
				rowSelection={rowSelection}
				columns={columns}
				dataSource={tableData}
				pagination={{
					position: ['topRight'],
					pageSize: 25,
					showSizeChanger: false,
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
				}}
			/>
		</div>
	);
};

export default ProspectTable;

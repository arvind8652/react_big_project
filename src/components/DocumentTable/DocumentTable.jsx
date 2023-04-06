import { useHistory } from 'react-router-dom';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../Avatar/AvatarLogo';
import GenericTable from '../GenericTable/GenericTable';
import GenericBadge from '../GenericBadge/GenericBadge';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import { useState } from 'react';
import { Tooltip } from 'antd';
const defaultTableOpt = {
	checkbox: true,
	expandableRow: false,
	favorite: false,
	pagination: true
};

const DocumentTable = ({
	onRow,
	allLeadData,
	tableOptions = defaultTableOpt,
	onRowSeletect,
	onRowSelection,
	loading
}) => {
	const history = useHistory();
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const renderAvatarColumn = (profileImage, dataObject) => {
		return (
			<div>
				<AvatarLogo
					imgsrc={dataObject.fileString}
					profileName={dataObject.profileInitial}
					avatarSize={AvatarSize.small}
				/>
			</div>
		);
	};
	const renderProfileColumn = (profile, dataObject) => {
		if (!dataObject) return null;
		return (
			<div className='col-profile'>
				<div className='client-name'>{dataObject.clientName}</div>
				<div className='familyDetail'>
					{dataObject.clientId}
					{dataObject.familyName && ` | ${dataObject.familyName}`}
				</div>

				<div className='col-text'>
					<div className='category'>{}</div>
					<div className='interest-level'>
						<GenericBadge badgeBody={dataObject.clientCategory} />
					</div>
				</div>
			</div>
		);
	};
	const renderContactColumn = (contact, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.documentTypeName}</div>
				<div>{dataObject.documentName}</div>
			</div>
		);
	};
	const renderSourceColumn = (source, dataObject) => {
		return (
			<div className='col-text'>
				<div>
					{dataObject.documentStatus === 'P'
						? 'Pending'
						: // : dataObject.documentStatus === "U"
						dataObject.documentStatus === 'U' && dataObject.isExpired === false
						? 'Submitted'
						: dataObject.documentStatus === 'D'
						? 'Deferred'
						: // : dataObject.documentStatus === "E"
						dataObject.isExpired === true
						? 'Expired'
						: ''}
				</div>
				{/* {dataObject.documentStatus === "U" ? ( */}
				{dataObject.documentStatus === 'U' && dataObject.isExpired === false ? (
					<div>{moment(dataObject.submissionDate).format(getDateFormat())}</div>
				) : null}
				{dataObject.documentStatus === 'D' ? (
					<div>{moment(dataObject.actionDate).format(getDateFormat())}</div>
				) : null}
				{/* {dataObject.documentStatus === "E" ? ( */}
				{dataObject.isExpired === true ? (
					<div>{moment(dataObject.expiryDate).format(getDateFormat())}</div>
				) : null}
			</div>
		);
	};
	const renderTypeColumn = (type, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.purpose}</div>
				<div>{dataObject.securityName}</div>
			</div>
		);
	};
	const renderRelationshipManagerColumn = (manager, dataObject) => {
		return (
			<div className='col-text'>
				<div className='client-name'>{dataObject.securityName}</div>
				<div>{dataObject.orderCartId && `${dataObject.orderCartId} | ${dataObject.orderType}`}</div>
			</div>
		);
	};

	const renderAccountColumn = (leadId, dataObject) => {
		return (
			<div className='col-text'>
				<Tooltip title={dataObject.accountName}>
					<div
						style={{
							textAlign: 'center',
							width: '200px',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis'
						}}
					>
						{dataObject.accountName}
					</div>
				</Tooltip>
				<div style={{ borderRadius: '16px', backgroundColor: '#F0F2FB', textAlign: 'center' }}>
					{dataObject.accountNature}
				</div>
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
			render: (profileImage, dataObject) => renderAvatarColumn(profileImage, dataObject)
		},
		{
			float: 'left',
			title: 'Customer',
			dataIndex: 'clientName',
			key: 'clientName',
			render: (clientName, dataObject) => renderProfileColumn(clientName, dataObject)
		},
		{
			title: 'Document',
			dataIndex: 'contact',
			key: 'contact',
			// width: 300,
			render: (contact, dataObject) => renderContactColumn(contact, dataObject)
		},
		{
			title: 'Status',
			dataIndex: 'source',
			key: 'source',
			render: (source, dataObject) => renderSourceColumn(source, dataObject)
		},
		{
			title: 'Purpose',
			key: 'type',
			dataIndex: 'type',
			render: (type, dataObject) => renderTypeColumn(type, dataObject)
		},
		{
			title: 'Order Details',
			key: 'relationship',
			dataIndex: 'relationshipManagerName',
			render: (manager, dataObject) => renderRelationshipManagerColumn(manager, dataObject)
		},
		{
			float: 'right',
			title: 'Account',
			dataIndex: 'leadId',
			key: 'leadId',
			render: (leadId, dataObject) => renderAccountColumn(leadId, dataObject)
		}
	];

	return (
		<GenericTable
			tableColumns={columns}
			loading={loading}
			rowKey='documentId'
			tableData={allLeadData}
			tableRows={allLeadData}
			tableOptions={defaultTableOpt}
			onRowClick={onRowSeletect}
			onRowSelection={onRowSelection}
			selectedRows={selectedRows}
			setSelectedRows={setSelectedRows}
			selectedRowKeys={selectedRowKeys}
			setSelectedRowKeys={setSelectedRowKeys}
		/>
	);
};

export default DocumentTable;

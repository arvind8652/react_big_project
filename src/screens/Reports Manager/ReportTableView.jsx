import React, { useState, useEffect } from 'react';
import GenericTable from '../../components/GenericTable/GenericTable';
import { Card, Avatar, Tooltip } from 'antd';
import { theme } from '../../theme';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faArrowAltToBottom } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import { faChevronDoubleUp } from '@fortawesome/pro-duotone-svg-icons';
import { faPowerOff } from '@fortawesome/pro-regular-svg-icons';
import { faArchive, faRedoAlt } from '@fortawesome/pro-solid-svg-icons';

const defaultTableOpt = {
	checkbox: true,
	expandableRow: false,
	favorite: false,
	pagination: true
};

const DummyRow = [
	{
		key: '1',
		reportName: 'Detailed Revenue',
		requestedBy: 'Fee',
		generationDate: '31 Mar 2021',
		format: '.XML',
		status: 'Archived'
	},
	{
		key: '2',
		reportName: 'Detailed',
		requestedBy: 'Fee',
		generationDate: '31 Mar 2021',
		format: 'PDF',
		status: 'Queued'
	},
	{
		key: '3',
		reportName: 'Detailed Revenue',
		requestedBy: 'Fee',
		generationDate: '31 Mar 2021',
		format: 'PDF',
		status: 'Completed'
	},
	{
		key: '4',
		reportName: 'Detailed Revenue',
		requestedBy: 'Fee',
		generationDate: '31 Mar 2021',
		format: 'PDF',
		status: 'Completed'
	}
];

const ReportTableView = ({
	reportData,
	loading,
	downloadFile = () => {},
	onRowSelection,
	listData,
	regenerateReportHandler = () => {}
}) => {
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		let newRecord = [];
		reportData?.forEach((element) => {
			newRecord.push({
				key: element.queueId,
				reportName: element.reportName,
				requestedBy: element.userName,
				generationDate: element.inputDateTime,
				format: element.fileType,
				status: element.status,
				id: element.id
			});
			// newRecord.push({ key: element.queueId, reportName: element.reportName, requestedBy: element.userName, generationDate: element.inputDateTime, format: element.fileType, status: element.status });
			// newRecord.push({ key: element.id, reportName: element.reportName, requestedBy: element.userName, generationDate: element.inputDateTime, format: element.fileType, status: element.status });
		});
		setTableData(newRecord);
	}, [reportData]);

	const renderReportNameColumn = (reportName, dataObject) => {
		return <div style={theme.profileName}>{dataObject.reportName}</div>;
	};

	const renderRequestedByColumn = (requestedBy, dataObject) => {
		return <div style={theme.subHeaderName}>{dataObject.requestedBy}</div>;
	};

	const renderGenerationDateColumn = (generationDate, dataObject) => {
		return (
			<div style={theme.subHeaderName}>
				{moment(dataObject.generationDate).format('DD MMMM YYYY')}
			</div>
		);
	};

	const renderFormatColumn = (format, dataObject) => {
		return <div style={theme.subHeaderName}>{dataObject.format}</div>;
	};

	const renderStatusColumn = (status, dataObject) => {
		return <div style={theme.subHeaderName}>{dataObject.status}</div>;
	};

	// const renderClientNameColumn = (clientName, dataObject) => {
	//   return (
	//     <><Avatar.Group
	//       maxCount={2}
	//       size="large"
	//       maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
	//     >
	//       <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
	//       <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
	//       <Tooltip title="Ant User" placement="top">
	//         <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
	//       </Tooltip>
	//       <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
	//     </Avatar.Group></>
	//   )
	// }
	const TableDownload = () => (
		<div>
			<FontAwesomeIcon icon={faArrowAltToBottom} />
		</div>
	);
	const { icons, setIcon } = useState('faArchive');
	const TableArchive = () => (
		<div>
			<FontAwesomeIcon
				icon={faArchive}
				onClick={() => {
					setIcon({ faArrowAltToBottom });
				}}
			/>
		</div>
	);

	const renderActionColumn = (id, dataObject) => {
		if (dataObject.status === 'ARCHIVE' || dataObject.status === 'ARCHIVED') {
			return (
				<>
					<FontAwesomeIcon
						icon={faRedoAlt}
						onClick={() => {
							regenerateReportHandler(dataObject.key);
						}}
					/>
				</>
			);
		} else if (dataObject.status === 'COMPLETED') {
			// return <><FontAwesomeIcon icon={faArrowAltToBottom} /></>
			return (
				<>
					<FontAwesomeIcon
						icon={faArrowAltToBottom}
						onClick={() => {
							downloadFile(dataObject.id, dataObject.format);
						}}
					/>
				</>
			);
		} else {
			return (
				<>
					<FontAwesomeIcon className={'disabled'} icon={faArrowAltToBottom} />
				</>
			);
		}
	};

	const Columns = [
		{
			title: 'Report Name',
			dataIndex: 'reportName',
			key: 'reportName',
			render: (reportName, dataObject) => renderReportNameColumn(reportName, dataObject)
		},
		{
			title: 'Requested By',
			dataIndex: 'requestedBy',
			key: 'requestedBy',
			render: (requestedBy, dataObject) => renderRequestedByColumn(requestedBy, dataObject)
		},
		{
			title: 'Generation Date',
			dataIndex: 'generationDate',
			key: 'generationDate',
			render: (generationDate, dataObject) => renderGenerationDateColumn(generationDate, dataObject)
		},
		{
			title: 'Format',
			key: 'format',
			dataIndex: 'format',
			render: (format, dataObject) => renderFormatColumn(format, dataObject)
		},
		{
			title: 'Status',
			key: 'status',
			dataIndex: 'status',
			render: (status, dataObject) => renderStatusColumn(status, dataObject)
		},
		// {
		//   title: "Client / Prospect Name",
		//   key: "clientName",
		//   dataIndex: "clientName",
		//   render: (clientName, dataObject) => renderClientNameColumn(clientName, dataObject)
		// },
		{
			title: '',
			key: 'id',
			dataIndex: 'id',
			render: (id, dataObject) => renderActionColumn(id, dataObject)
		}
	];

	return (
		<>
			{/* <Card style={theme.cardStyle}> */}
			<GenericTable
				tableRows={tableData ? tableData : DummyRow}
				tableColumns={Columns}
				tableOptions={defaultTableOpt}
				onRowSelection={onRowSelection}
				loading={loading}
			/>
		</>
	);
};

// function mapStateToProps(state) {
//   return {
//     reportData: state ?.clientStatement ?.tableReportData ?.reportManagers,
//   };
// };

// export default connect(mapStateToProps)(ReportTableView);
export default ReportTableView;

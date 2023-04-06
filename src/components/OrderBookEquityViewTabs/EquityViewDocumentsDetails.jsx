import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Table,
	Tag,
	Card,
	Space,
	Row,
	Col,
	Avatar,
	Divider,
	Tooltip,
	Menu,
	Tabs,
	Modal,
	Button,
	Dropdown
} from 'antd';
import { UserOutlined, AntDesignOutlined, DownOutlined } from '@ant-design/icons';
import ConsolidatedPortfolio from '../../components/MutualFundsTab/ConsolidatedPortfolio';
import GenericTable from '../../components/GenericTable/GenericTable';
import UserDetails from '../../components/UserDetail/UserDetail';
import GenericCard from '../GenericCard/GenericCard';
//import { fontSet } from "../../theme";
import { palette, fontSet, theme } from '../../theme';
import { downloadAttachment, downloadDocument } from '../../utils/utils';

const EquityViewDocumentsDetails = ({ tradeBookViewDocumentDetails }) => {
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		const modifyDataSource = (e) => ({
			key: e?.DocumentId,
			type: e?.DocumentType,
			documentName: e?.DocNameDisplayValue,
			mandatory: e?.Mandatory,
			deffered: e?.isDeferred,
			updatedBy: e?.UploadedBy
		});

		const newDataSource = tradeBookViewDocumentDetails?.map(modifyDataSource);
		setDataSource(newDataSource);
	}, [tradeBookViewDocumentDetails]);

	const styleSet = {
		cardStyle: {
			text: fontSet.heading.large
		},
		card: {
			borderRadius: '12px'
		},
		table: {
			color: palette.text.scard
		}
	};

	const menuData = (
		<Menu>
			<Menu.Item key='1'>Sell</Menu.Item>
			<Menu.Item key='2'>Trade</Menu.Item>
			<Menu.Item key='3'>Switch</Menu.Item>
		</Menu>
	);
	// const dataSource = [
	//   {
	//     key: "1",
	//     type: "Other",
	//     documentName: "Passport",
	//     mandatory: "Yes",
	//     deffered: "No",
	//     updatedBy: "Reynold Mathew",
	//   },
	//   {
	//     key: "2",
	//     type: "Other",
	//     documentName: "Signed Discliamer",
	//     mandatory: "No",
	//     deffered: "Yes",
	//     updatedBy: "Reynold Mathew",
	//   },
	// ];

	const tablecolumns = [
		//     style={
		//         styleSet.table,
		// }
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type'
			//align: 'center',
			//color: palette.text.scard,
		},
		{
			title: 'Document Name',
			dataIndex: 'documentName',
			key: 'documentName',
			render: (text, rowData) => {
				return <a onClick={() => downloadDocument(rowData?.Documentsetupid)}>{text}</a>;
			}
			//align: 'center',
		},
		{
			title: 'Mandatory',
			dataIndex: 'mandatory',
			key: 'mandatory'
			//align: 'center',
		},
		{
			title: 'Deffered',
			dataIndex: 'deffered',
			key: 'deffered'
			//align: 'center',
		},
		{
			title: 'Updated By',
			dataIndex: 'updatedBy',
			key: 'updatedBy'
			//align: 'center',
		}
	];

	return (
		<>
			<GenericCard header={'Documents Details'} menuFlag={1} buttonTitle={null}>
				<Row>
					<Col span={24}>
						<GenericTable
							const
							menuOptions={menuData}
							tableOptions={{ checkbox: false, pagination: false }}
							tableRows={dataSource}
							tableColumns={tablecolumns}
							onRow={(record, recordIndex) => ({
								onClick: (event) => {
									console.log('onRow onClick');
								}
							})}
						/>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		// tradeBookViewDocumentDetails: state?.tradeBookView?.tradeBookViewDocumentDetails
		tradeBookViewDocumentDetails: state?.tradeBookView?.tradeBookViewDetails?.uploadedDocInfo
	};
};
export default connect(mapStateToProps)(EquityViewDocumentsDetails);

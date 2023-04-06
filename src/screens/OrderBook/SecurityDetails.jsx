import React, { useState, useEffect } from 'react';

import { Modal, Row, Typography, Button, Space, Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import '../../screens/CustomerListingScreen/Modal/AccountsModal.scss';
import { getOrderBookListApi } from '../../api/orderBookListApi';
import {
	renderAvatarColumn,
	renderOrderDetailsColumn,
	renderProfileColumn,
	renderStatusColumn,
	renderTradeDetailsColumn
} from './TableComponent';
const { Title, Text } = Typography;

const SecurityDetails = (props) => {
	const { data } = props;
	const renderAccountTagName = (accountName, dataObject) => {
		if (!dataObject) return null;

		return (
			<Space>
				<Space direction='vertical' size={0}>
					<Text style={{ fontWeight: '600' }}>{accountName}</Text>
					<Text className='medium-text-secondary'>Account Nature</Text>
					{dataObject.accountNature && (
						<Text
							style={{
								backgroundColor: '#F0F2FB',
								color: '#354081',
								padding: '2px 10px',
								borderRadius: '20px',
								fontSize: '14px',
								marginRight: '2px'
							}}
						>
							{dataObject.accountNature}
						</Text>
					)}
				</Space>
			</Space>
		);
	};

	const renderGoalImageInitials = (goals) => {
		if (!goals) return null;
		return (
			<Space size={4}>
				{goals.length !== 0 &&
					goals.slice(0, 2).map((item, index) => {
						return (
							item.dataValue && (
								<div
									title={item.dataValue}
									key={index}
									style={{
										background: '#F0F2FB',
										padding: '10px',
										borderRadius: '50%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									{item.dataValue}
								</div>
							)
						);
					})}
				{goals.length > 2 ? (
					<span
						style={{
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							backgroundColor: '#F0F2FB',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Text style={{ fontSize: '12px' }}>+{goals.length - 2}</Text>
					</span>
				) : (
					''
				)}
			</Space>
		);
	};
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		if (data && props.data.dealId) {
			getTableData(data);
		}
	}, [data]);

	const getTableData = async (data) => {
		try {
			console.log(props.data);
			let payload = {
				data: {
					StartDate: '2019-12-12',
					EndDate: '2021-12-12',
					AssetGroup: props.data.assetGroup,
					CustomerId: props.data.CustomerId,
					Filterparam: 'CreDateFToN',
					Security: props.data.security,
					DealId: props.data.dealId
				}
			};
			const response = await getOrderBookListApi(payload);
			if (response.data) setTableData(response.data.orderBookList);
		} catch (error) {
			console.log('error');
		}
	};

	const accountColumns = [
		{
			float: 'right',
			title: ' ',
			dataIndex: 'profileImage',
			key: 'avatar',
			width: 64,
			// onCell: onCellDefault,
			render: (profileImage, dataObject) => renderAvatarColumn(profileImage, dataObject)
		},
		{
			float: 'left',
			title: 'Security',
			dataIndex: 'security',
			key: 'security',

			// onCell: onCellDefault,
			render: (security, dataObject) => renderProfileColumn(security, dataObject)
		},
		{
			title: 'Order',
			dataIndex: 'order',
			render: (type, dataObject) => renderOrderDetailsColumn(type, dataObject)
		},
		{
			title: 'Trade',
			dataIndex: 'trade',
			render: (trade, dataObject) => renderTradeDetailsColumn(trade, dataObject)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (status, dataObject) => renderStatusColumn(status, dataObject)
		},
		{
			title: 'Document Status',
			dataIndex: 'docStatus',
			render: (docStatus, dataObject) => renderAccountTagName(docStatus, dataObject)
		},
		{
			title: 'Account Name',
			dataIndex: 'accountName',
			render: (accountName, dataObject) => renderAccountTagName(accountName, dataObject)
		}
	];

	if (!props.data) {
		return null;
	}

	return (
		<Modal
			centered
			visible={props.show}
			onCancel={() => props.setShow(false)}
			closeIcon={<></>}
			footer={null}
			className='modal-container'
			width='auto'
		>
			<Row justify='space-between' className='modal-title-container'>
				<Title className='modal-title'>Trade Details</Title>
				<Button type='text' className='modal-close-btn'>
					<FontAwesomeIcon icon={faTimes} size='2x' color='#354081' />
				</Button>
			</Row>
			<Table
				className='modal-table-container'
				columns={accountColumns}
				pagination={false}
				dataSource={tableData}
			/>
		</Modal>
	);
};

export default SecurityDetails;

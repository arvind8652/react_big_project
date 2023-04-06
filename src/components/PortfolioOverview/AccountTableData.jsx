import UserDetailView from '../UserDetail/UserDetailView';
import SimpleUserDetail from '../UserDetail/SimpleUserDetail';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Menu, Modal, Button, Avatar, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import ConsolidatedPortfolio from '../../components/MutualFundsTab/ConsolidatedPortfolio';
import GenericTable from '../../components/GenericTable/GenericTable';
import UserDetails from '../../components/UserDetail/UserDetail';
import { fontSet, avatar, theme } from '../../theme';
import AvatarDetails from '../UserDetail/AvatarDetails';
import RupeeOrNonRupee from '../RupeeOrNonRupee/RupeeOrNonRupee';

export const BANKDETAILS_DATA_M = [
	{
		key: '0',
		accountName: 'John Kim',
		accountNature: 'Direct',
		// accountName: "Decoz",
		recordId: 'ID000041',
		familyName: 'Wealth',
		customerCategory: 'General',
		investment: '$1,50,000',
		categoryName: 'Moderate'
	},
	{
		key: '1',
		accountName: 'John Kim',
		accountNature: 'Direct',
		// customerCategory: 'Comman',
		// accountName: "Decoz",
		recordId: 'ID000041',
		familyName: 'Wealth',
		customerCategory: 'General',
		investment: '$1,50,000',
		categoryName: 'Moderate'
	}
];

const AccountTableData = ({ profileTableData = BANKDETAILS_DATA_M, jointHolder = [] }) => {
	const history = useHistory();
	const path = useRouteMatch();
	// console.log("AccountTable",profileTableData)
	//const dataObject = profileTableData;
	const styleSet = {
		cardStyle: {
			text: fontSet.heading.large
		},
		card: {
			borderRadius: '12px'
		}
	};

	const menuData = (
		<Menu>
			<Menu.Item key='1'>Sell</Menu.Item>
			<Menu.Item key='2'>Trade</Menu.Item>
			<Menu.Item key='3'>Switch</Menu.Item>
		</Menu>
	);

	// const onCellDefault = (row, rowIndex) => {
	//     const accountIds = profileTableData.map((item) => item.scheme);

	//     const index = [
	//         ...profileTableData.map((item, index) => {
	//             if (item.scheme === row.scheme) {
	//                 return index;
	//             } else return null;
	//         }),
	//     ].filter((item) => item !== null);

	//     const toObject = {
	//         pathname: "/dashboard/MyAccount/accountView",
	//         state: {
	//             accountIds: accountIds,
	//             rowIndex: index[0],
	//             allAccountData: profileTableData,
	//         },
	//     };
	//     return {
	//         onClick: (event) => {
	//             history.push(toObject);
	//         }, // click row
	//         onDoubleClick: (event) => { }, // double click row
	//         onContextMenu: (event) => { }, // right button click row
	//         onMouseEnter: (event) => { }, // mouse enter row
	//         onMouseLeave: (event) => { }, // mouse leave row
	//     };
	// };
	const renderInvestmentValues = (accountName, profileTableData) => {
		return (
			<>
				<Col>
					<Row style={theme.subProfileName}>{profileTableData.accountName}</Row>
					<Row style={theme.subHeaderName}>
						{profileTableData.accountNature}
						{/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
					</Row>
					<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
						<div className='opportunityTag'>{profileTableData.customerCategory}</div>
						{/* <div className="opportunityTag">{UserDetailView.secondaryTag}</div> */}
					</Row>
				</Col>
			</>
		);
	};
	const renderInvestmentTableValues = (investmentValue, profileTableData) => {
		return (
			<>
				<Col>
					<Row style={theme.subHeaderName}>
						<RupeeOrNonRupee amount={profileTableData.investmentValue} />
						{/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
					</Row>
				</Col>
			</>
		);
	};
	const renderRiskProfileValues = (category, profileTableData) => {
		return (
			<>
				<Col>
					<Row style={theme.subHeaderName}>
						{/* {profileTableData.categoryName} */}
						{profileTableData.category}
						{/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
					</Row>
				</Col>
			</>
		);
	};
	const renderPrimaryHolder = (primaryHolder, profileTableData) => {
		return (
			<>
				<Row>
					<Col span={3}>
						{profileTableData.profileImage != null ? (
							<Avatar
								// style={{ color: "#fff", backgroundColor: "#ccc" }}
								size={55}
								src={`data:image/jpeg;base64, ${profileTableData.profileImage}`}
							></Avatar>
						) : (
							<Avatar style={{ color: '#fff', backgroundColor: '#ccc' }} size={55}>
								{' '}
								{profileTableData.profileInitial}
							</Avatar>
						)}
					</Col>
					<Col style={(styleSet.containerStyle, { marginLeft: '35px' })}>
						<Row style={theme.profileName}>{profileTableData.accountName}</Row>
						<Row style={theme.profileTag}>
							{profileTableData.recordId} | {profileTableData.familyName}
							{/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
						</Row>
						<Row
							style={{
								alignItems: 'center',
								margin: '5px 0px',
								color: 'E5EBFF'
							}}
						>
							<div className='opportunityTag'>{profileTableData.customerCategory}</div>
							{/* <div className="opportunityTag">{item.secondaryTag}</div> */}
						</Row>
					</Col>
				</Row>
			</>
		);
	};

	const renderlinkedGoals = (linkedGoals, profileTableData) => {
		// console.log("Link Goals", profileTableData);
		return (
			<>
				{profileTableData && profileTableData.length > 2 ? (
					<Avatar.Group maxCount={2} maxStyle={{ color: '#fff', backgroundColor: '#ccc' }}>
						<Avatar src={profileTableData[0].profileImage} style={{ backgroundColor: '#ccc' }}>
							{profileTableData[0].dataValue}
						</Avatar>
						<Avatar src={profileTableData[1].profileImage} style={{ backgroundColor: '#ccc' }}>
							{profileTableData[1].dataValue}
						</Avatar>
						{profileTableData.goalCapture.slice(2).map((ele) => {
							// console.log("element",ele)
							return (
								<Tooltip title={ele.dataValue} placement='top'>
									<Avatar src={ele.profileImage} style={{ backgroundColor: '#ccc' }}>
										{ele.dataValue}
									</Avatar>
								</Tooltip>
							);
						})}
					</Avatar.Group>
				) : (
					<Avatar.Group maxCount={2} maxStyle={{ color: '#fff', backgroundColor: '#ccc' }}>
						{profileTableData.goalCapture.map((ele) => {
							return (
								<Tooltip title={ele.dataValue} placement='top'>
									<Avatar src={ele.profileImage} style={{ backgroundColor: '#ccc' }}>
										{ele.dataValue}
									</Avatar>
								</Tooltip>
							);
						})}
					</Avatar.Group>
				)}
			</>
		);
	};

	const renderAccountHolding = (accountHolding, profileTableData) => {
		return (
			<>
				{profileTableData && profileTableData.length > 2 ? (
					<Avatar.Group maxCount={2} maxStyle={{ color: '#fff', backgroundColor: '#ccc' }}>
						<Avatar src={profileTableData[0].profileImage} style={{ backgroundColor: '#ccc' }}>
							{profileTableData[0].profileInitials}
						</Avatar>
						<Avatar src={profileTableData[1].profileImage} style={{ backgroundColor: '#ccc' }}>
							{profileTableData[1].profileInitials}
						</Avatar>
						{profileTableData.lstJointDetails.slice(2).map((ele) => {
							return (
								<Tooltip title={ele.profileInitials} placement='top'>
									<Avatar src={ele.profileImage} style={{ backgroundColor: '#ccc' }}>
										{ele.profileInitials}
									</Avatar>
								</Tooltip>
							);
						})}
					</Avatar.Group>
				) : (
					<Avatar.Group maxCount={2} maxStyle={{ color: '#fff', backgroundColor: '#ccc' }}>
						{profileTableData.lstJointDetails.map((ele) => {
							return (
								<Tooltip title={ele.profileInitials} placement='top'>
									<Avatar src={ele.profileImage} style={{ backgroundColor: '#ccc' }}>
										{ele.profileInitials}
									</Avatar>
								</Tooltip>
							);
						})}
					</Avatar.Group>
				)}
			</>
		);
	};

	const tablecolumns = [
		{
			title: 'Account Name',
			dataIndex: 'accountName',
			key: 'accountName',
			// onCell: onCellDefault,
			//render: (text) => <a>{text}</a>,
			render: (accountName, profileTableData) =>
				renderInvestmentValues(accountName, profileTableData)
		},
		{
			title: 'Investment Values',
			dataIndex: 'investmentValue',
			key: 'investmentValue',
			// onCell: onCellDefault,
			render: (investmentValue, profileTableData) =>
				renderInvestmentTableValues(investmentValue, profileTableData)
			// render: (investmentValue) => {
			//     return (
			//         <span
			//         //style={{ color: "#696A91" }} className="opportunityDetailText"
			//         >
			//             {investmentValue}
			//         </span>
			//     );
			// },
		},
		{
			title: 'Risk Profile',
			dataIndex: 'category',
			key: 'category',
			// onCell: onCellDefault,
			render: (category, profileTableData) => renderRiskProfileValues(category, profileTableData)
			// render: (category) => {
			//     return (
			//         <span
			//         //style={{ color: "#696A91" }} className="opportunityDetailText"
			//         >
			//             {category}
			//         </span>
			//     );
			// },
		},
		// {
		//     title: "Linked Goals",
		//     key: "linkedGoals",
		//     dataIndex: "linkedGoals",
		//     // onCell: onCellDefault,
		//     render: (linkedGoals, profileTableData) =>
		//         renderlinkedGoals(linkedGoals, profileTableData),
		// },
		{
			title: 'Account Holding',
			key: 'accountHolding',
			dataIndex: 'accountHolding',
			// onCell: onCellDefault,
			// render: (accountHolding, profileTableData) =>
			// 	renderAccountHolding(accountHolding, profileTableData)
			render: (accountHolding, profileTableData) => {
				return <span>{profileTableData?.holdingPatternName}</span>;
			}
		},
		{
			title: 'Primary Holder',
			key: 'primaryHolder',
			dataIndex: 'primaryHolder',
			// onCell: onCellDefault,
			render: (primaryHolder, profileTableData) =>
				renderPrimaryHolder(primaryHolder, profileTableData)
		}
	];

	return (
		<>
			<card style={styleSet.card}>
				<Row style={styleSet.cardStyle}>
					<Col span={24}>
						<GenericTable
							// onCellDefault={onCellDefault}
							const
							menuOptions={menuData}
							tableOptions={{ checkbox: false, pagination: false }}
							tableRows={profileTableData}
							tableColumns={tablecolumns}
							onRow={(record, recordIndex) => ({
								onClick: (event) => {
									console.log('onRow onClick');
								}
							})}
						/>
					</Col>
				</Row>
			</card>
		</>
	);
};
export default AccountTableData;

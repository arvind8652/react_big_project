//import UserDetails from "../UserDetail/UserDetail";
//import { Avatar, Row, Col, Divider, Tooltip } from "antd";
import UserDetailView from '../UserDetail/UserDetailView';
import SimpleUserDetail from '../UserDetail/SimpleUserDetail';
//import { Avatar, Divider, Tooltip } from 'antd';
//import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Menu, Modal, Button, Avatar, Tooltip, Popover } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import ConsolidatedPortfolio from '../../components/MutualFundsTab/ConsolidatedPortfolio';
import GenericTable from '../../components/GenericTable/GenericTable';
import UserDetails from '../../components/UserDetail/UserDetail';
//import PortfolioHoldingSubTable from "./PortfolioHoldingSubTable";
//import UserStarDetails from "./UserStarDetails"
//import OverViewTab from "./OverviewTab";
import { fontSet, avatar, theme } from '../../theme';
import AvatarDetails from '../UserDetail/AvatarDetails';
import RupeeOrNonRupee from '../RupeeOrNonRupee/RupeeOrNonRupee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';

const ProfileAccountTableData = ({ profileTableData, jointHolder = [] }) => {
	const history = useHistory();
	const path = useRouteMatch();
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
	//     const accountIds = profileTableData.map(
	//         (item) => item.scheme
	//     );

	//     const index = [
	//         ...profileTableData.map((item, index) => {
	//             if (item.scheme === row.scheme) {
	//                 return index;
	//             } else return null;
	//         }),
	//     ].filter((item) => item !== null);

	//     const toObject = {
	//         // history.push("/dashboard/MyCustomer/Onboarding")}
	//         pathname: `${path}/accountView`,
	//         state: {
	//             accountIds: accountIds,
	//             rowIndex: index[0],
	//         },
	//     };
	//     return {
	//         onClick: (event) => {

	//             history.push("/dashboard/MyAccount/accountView");
	//         }, // click row
	//         onDoubleClick: (event) => { }, // double click row
	//         onContextMenu: (event) => { }, // right button click row
	//         onMouseEnter: (event) => { }, // mouse enter row
	//         onMouseLeave: (event) => { }, // mouse leave row
	//     };
	// };
	const onCellDefault = (row, rowIndex) => {
		const accountIds = profileTableData?.map((item) => item?.scheme);

		const index = [
			...profileTableData?.map((item, index) => {
				if (item?.scheme === row?.scheme) {
					return index;
				} else return null;
			})
		].filter((item) => item !== null);

		const toObject = {
			pathname: '/dashboard/MyAccount/accountView',
			state: {
				accountIds: accountIds,
				rowIndex: index[0],
				allAccountData: profileTableData,
				progName: 'ACCOUNTADD',
				action: 'profileView'
			}
		};
		return {
			onClick: (event) => {
				history.push(toObject);
			}, // click row
			onDoubleClick: (event) => {}, // double click row
			onContextMenu: (event) => {}, // right button click row
			onMouseEnter: (event) => {}, // mouse enter row
			onMouseLeave: (event) => {} // mouse leave row
		};
	};

	const handleRecordModify = (scheme, action) => {
		const toObject = {
			pathname: '/dashboard/MyAccount/AccountEdit',
			// state: { action: 'profileEdit', refID: scheme }
			state: { action: action, refID: scheme, refType: 'ACCOUNTADD' }
		};
		history.push(toObject);
	};

	const renderInvestmentValues = (accountName, profileTableData) => {
		return (
			<>
				<Col>
					<Row style={theme?.subProfileName}>{profileTableData?.accountName}</Row>
					<Row style={theme?.subHeaderName}>
						{profileTableData?.scheme}
						{/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
					</Row>
					<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
						<div className='opportunityTag'>{profileTableData?.accountNature}</div>
						{/* <div className="opportunityTag">{UserDetailView.secondaryTag}</div> */}
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
						{profileTableData?.profileImage != null ? (
							<Avatar
								style={{ color: '#f56a00', backgroundColor: '#E5EBFF' }}
								size={55}
								src={profileTableData?.profileImage}
							></Avatar>
						) : (
							<Avatar style={{ color: '#f56a00', backgroundColor: '#E5EBFF' }} size={55}>
								{' '}
								{profileTableData?.profileInitial}
							</Avatar>
						)}
					</Col>
					<Col style={(styleSet?.containerStyle, { marginLeft: '45px' })}>
						<Row style={theme?.profileName}>{profileTableData?.accountName}</Row>
						<Row style={theme?.profileTag}>
							{profileTableData?.recordId} | {profileTableData?.familyName}
							{/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
						</Row>
						<Row
							style={{
								alignItems: 'center',
								margin: '5px 0px',
								color: 'E5EBFF'
							}}
						>
							<div className='opportunityTag'>{profileTableData?.customerCategory}</div>
							{/* <div className="opportunityTag">{item.secondaryTag}</div> */}
						</Row>
					</Col>
				</Row>
			</>
		);
	};

	const renderlinkedGoals = (linkedGoals, profileTableData) => {
		return (
			<>
				{profileTableData && profileTableData?.length > 2 ? (
					<Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						<Avatar src={profileTableData[0]?.profileImage} style={{ backgroundColor: '#f56a00' }}>
							{profileTableData[0]?.dataValue}
						</Avatar>
						<Avatar src={profileTableData[1]?.profileImage} style={{ backgroundColor: '#f56a00' }}>
							{profileTableData[1]?.dataValue}
						</Avatar>
						{profileTableData?.goalCapture?.length > 0
							? profileTableData?.goalCapture?.slice(2)?.map((ele) => {
									return (
										<Tooltip title={ele?.dataValue} placement='top'>
											<Avatar src={ele?.profileImage} style={{ backgroundColor: '#f56a00' }}>
												{ele?.dataValue}
											</Avatar>
										</Tooltip>
									);
							  })
							: 'Not Defined'}
					</Avatar.Group>
				) : (
					<Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						{profileTableData?.goalCapture?.length > 0
							? profileTableData?.goalCapture?.map((ele) => {
									return (
										<Tooltip title={ele?.dataValue} placement='top'>
											<Avatar src={ele?.profileImage} style={{ backgroundColor: '#f56a00' }}>
												{ele?.dataValue}
											</Avatar>
										</Tooltip>
									);
							  })
							: 'Not Defined'}
					</Avatar.Group>
				)}
			</>
		);
	};

	const renderAccountHolding = (accountHolding, profileTableData) => {
		return (
			<>
				{profileTableData && profileTableData?.length > 2 ? (
					<Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						<Avatar src={profileTableData[0]?.profileImage} style={{ backgroundColor: '#f56a00' }}>
							{profileTableData[0]?.profileInitials}
						</Avatar>
						<Avatar src={profileTableData[1]?.profileImage} style={{ backgroundColor: '#f56a00' }}>
							{profileTableData[1]?.profileInitials}
						</Avatar>
						{profileTableData?.lstJointDetails?.slice(2)?.map((ele) => {
							return (
								<Tooltip title={ele?.profileInitials} placement='top'>
									<Avatar src={ele?.profileImage} style={{ backgroundColor: '#f56a00' }}>
										{ele?.profileInitials}
									</Avatar>
								</Tooltip>
							);
						})}
					</Avatar.Group>
				) : (
					<Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
						{profileTableData?.lstJointDetails?.map((ele) => {
							return (
								<Tooltip title={ele?.profileInitials} placement='top'>
									<Avatar src={ele?.profileImage} style={{ backgroundColor: '#f56a00' }}>
										{ele?.profileInitials}
									</Avatar>
								</Tooltip>
							);
						})}
					</Avatar.Group>
				)}
			</>
		);
	};

	const renderMoreOptions = (scheme, profileTableData) => {
		const options = ['Edit', 'Copy'];
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
								// option.toLowerCase() === 'edit' && handleRecordModify(scheme);
								option.toLowerCase() === 'edit' && handleRecordModify(scheme, 'profileEdit');
								option.toLowerCase() === 'copy' && handleRecordModify(scheme, 'profileCopy');
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
					overlayClassName='customerOnboarding-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};

	const tablecolumns = [
		{
			title: 'Account Name',
			dataIndex: 'accountName',
			key: 'accountName',
			onCell: onCellDefault,
			//render: (text) => <a>{text}</a>,
			render: (accountName, profileTableData) =>
				renderInvestmentValues(accountName, profileTableData)
		},
		{
			title: 'Investment Values',
			dataIndex: 'investmentValue',
			key: 'investmentValue',
			onCell: onCellDefault,
			// render: (investmentValue, profileTableData) => renderInvestmentValues(investmentValues, profileTableData),
			render: (investmentValue, profileTableData) => {
				return (
					<span
					//style={{ color: "#696A91" }} className="opportunityDetailText"
					>
						{profileTableData?.currencySymbol} <RupeeOrNonRupee amount={investmentValue} />
						{/* {investmentValue} */}
					</span>
				);
			}
		},
		{
			title: 'Risk Profile',
			dataIndex: 'category',
			key: 'category',
			onCell: onCellDefault,
			render: (category) => {
				return (
					<span
					//style={{ color: "#696A91" }} className="opportunityDetailText"
					>
						{category}
					</span>
				);
			}
		},
		{
			title: 'Linked Goals',
			key: 'linkedGoals',
			dataIndex: 'linkedGoals',
			onCell: onCellDefault,
			render: (linkedGoals, profileTableData) => renderlinkedGoals(linkedGoals, profileTableData)
		},
		{
			title: 'Account Holding',
			key: 'accountHolding',
			dataIndex: 'accountHolding',
			// dataIndex: 'holdingPatternName',
			onCell: onCellDefault,
			render: (accountHolding, profileTableData) => {
				return <span>{profileTableData?.holdingPatternName}</span>;
			}
			// render: (accountHolding, profileTableData) =>
			// 	renderAccountHolding(accountHolding, profileTableData)
		},
		{
			title: 'Primary Holder',
			key: 'primaryHolder',
			dataIndex: 'primaryHolder',
			onCell: onCellDefault,
			render: (primaryHolder, profileTableData) =>
				renderPrimaryHolder(primaryHolder, profileTableData)
		},
		{
			float: 'left',
			title: '',
			dataIndex: 'scheme',
			render: (scheme, profileTableData) => renderMoreOptions(scheme, profileTableData)
		}
	];

	return (
		<>
			<card style={styleSet.card}>
				<Row style={styleSet.cardStyle}>
					<Col span={24}>
						<GenericTable
							onCellDefault={onCellDefault}
							const
							menuOptions={menuData}
							tableOptions={{ checkbox: false, pagination: false }}
							tableRows={profileTableData}
							tableColumns={tablecolumns}
							onRow={(record, recordIndex) => ({
								onClick: (event) => {
									// console.log("onRow onClick");
								}
							})}
						/>
					</Col>
				</Row>
			</card>
		</>
	);
};
export default ProfileAccountTableData;

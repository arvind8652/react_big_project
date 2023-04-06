import { React, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Space, Badge, Table, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { palette, theme } from '../../theme';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import GenericCard from '../../components/GenericCard/GenericCard';
import GenericBadge from '../../components/GenericBadge/GenericBadge';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { exportJSON } from '../../utils/utils';
import { useHistory } from 'react-router-dom';
import { ScButtonText, ScRate } from '../../components/StyledComponents/genericElements';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import { addFavouriteOpportunityApi } from '../../api/opportunityListingApi';
import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { executeGetTopCustomersData } from '../../redux/actions/crmHomeActions';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
const menuItems = ['Modify', 'Delete'];

const dealsList = [
	{
		id: 0,
		aumAmount: '$450,000',
		role: 'AUM',
		amount: '$ 25,000',
		title: 'Peter Dudchenko',
		date: '$450,000',
		status: 'Closed'
	},
	{
		id: 1,
		aumAmount: '$450,000',
		role: 'Prospect',
		amount: '$ 25,000',
		title: 'Peter Dudchenko',
		date: '$450,000',
		status: 'Closed'
	},
	{
		id: 2,
		aumAmount: '$450,000',
		role: 'Prospect',
		amount: '$ 25,000',
		title: 'Peter Dudchenko',
		date: '$450,000',
		status: 'Closed'
	}
];

const defaultMenuList = [
	{
		id: 0,
		menuName: 'AUM'
	},
	{
		id: 1,
		menuName: 'Revenue'
	},
	{
		id: 2,
		menuName: 'Relationship'
	}
];

const styleSet = {
	rowStyle: {
		padding: '24px 0px',
		borderBottom: '1px solid #CBD6FF'
	},
	badge: {
		backgroundColor: palette.badge.background,
		// padding: "8px",
		color: palette.secondary.light,
		margin: '5px'
	},
	userInfo: {
		padding: '8px',
		color: '#222747'
	},
	count: {
		fontSize: '1rem',
		marginTop: '3px'
	}
};

const TopCustomersRemade = ({
	executeGetTopCustomersData,
	img = '',
	avatarSize,
	allTopCustomersData,
	topCustomerCSObj,
	selectedType = 'AUM'
}) => {
	const title = 'Top Clients';
	const [prevDate, setPrevDate] = useState(sessionStorage.getItem('prevDate'));
	useEffect(() => {
		executeGetTopCustomersData(prevDate);
	}, []);
	// const [type, setType] = useState("AUM");
	const [topCustomerList, setTopCustomerList] = useState(dealsList);
	const [businessTypeWiseData, setBusinessTypeWiseData] = useState();
	const menuList = topCustomerCSObj?.dropDownValue.map((item, index) => {
		return {
			id: index,
			menuName: item.dataValue
		};
	});
	const groupBy = (items, key) => {
		return items.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [...(result[item[key]] || []), item]
			}),
			{}
		);
	};

	useEffect(() => {
		setBusinessTypeWiseData(allTopCustomersData && groupBy(allTopCustomersData, 'businessType'));
	}, [allTopCustomersData]);

	useEffect(() => {
		let apiData = {};

		switch (selectedType) {
			case 'AUM':
				apiData = businessTypeWiseData?.AUM?.map((item, index) => {
					return {
						id: index,
						//   aumAmount: "$ 25,000",
						//   amount: "$ 25,000",
						title: item.customerName,
						//   status: "Closed",
						category: item.category,
						profileImage: item.profileImage,
						profileInitial: item.profileInitial,
						aumRank: `# ${item.aumRank}`,
						revenueRank: `# ${item.revenueRank}`,
						currencySymbol: item.currencySymbol,
						aumTotal: item.aumTotal,
						revenueTotal: item.revenueTotal,
						family: item.familyName,
						customerId: item.customerId,
						customerTypeName: item.customerTypeName,
						email: item.email,
						mobileNo: item.mobileNo,
						isFavourite: item.isFavourite,
						refType: item.refType
					};
				});
				break;
			case 'REVENUE':
				apiData = businessTypeWiseData?.Revenue?.map((item, index) => {
					return {
						id: index,
						//   aumAmount: "$ 25,000",
						//   amount: "$ 25,000",
						title: item.customerName,
						//   status: "Closed",
						profileImage: item.profileImage,
						profileInitial: item.profileInitial,
						aumRank: `# ${item.aumRank}`,
						revenueRank: `# ${item.revenueRank}`,
						currencySymbol: item.currencySymbol,
						aumTotal: item.aumTotal,
						revenueTotal: item.revenueTotal,
						family: item.familyName,
						customerId: item.customerId,
						isFavourite: item.isFavourite
					};
				});
				break;

			default:
				break;
		}

		setTopCustomerList(apiData);
	}, [selectedType, businessTypeWiseData]);

	const renderTopCustomerList = () => {
		return topCustomerList?.slice(0, 3).map((item) => (
			<div key={item.id} style={styleSet.rowStyle}>
				<Space direction='vertical'>
					<Row>
						<Col lg={24} xl={6}>
							<AvatarLogo
								imgsrc={item.profileImage}
								// profileName={"PD"}
								profileName={item.profileInitial}
								avatarSize={avatarSize || AvatarSize.extrasmall}
							/>
						</Col>
						<Col lg={24} xl={18}>
							<div style={theme.secondaryHeader}>{item.title}</div>
							<Row>
								<Col lg={24} xl={20}>
									{item.customerId} | {item.family}
								</Col>
								{/* <Col lg={24} xl={4} /> */}
							</Row>
							<Row>
								<GenericBadge badgeBody={item.category} />
							</Row>
							{/* <br /> */}
							<Row>
								<Col lg={24} xl={24}>
									<div style={theme.dFlex}>
										<Badge size='default' style={styleSet.badge} count={item.aumRank} />
										{/* <div className='group' style={{ color: '#48528d', marginTop: 5 }}> */}
										<div className='group' style={{ color: '#696a91' }}>
											{/* <div style={theme.mediumText}>
                      </div> */}
											{/* <div style={theme.smallText}> */}
											<div style={{ fontSize: 17 }}>
												{item.currencySymbol} <RupeeOrNonRupee amount={item.aumTotal} /> &nbsp;
												{/* <span style={theme.smallText}>AUM</span> */}
											</div>
										</div>
									</div>
								</Col>
								{/* <Col lg={24} xl={12}>
                  <div style={theme.dFlex}>
                    <Badge style={styleSet.badge} count={item.revenueRank} />
                    <div className="group" style={{ color: "#48528d" }}>
                      <div style={theme.mediumText}>
                        {item.currencySymbol} <RupeeOrNonRupee amount={item.revenueTotal} />
                      </div>
                      <div style={theme.mediumText}>Revenue</div>
                    </div>
                  </div>
                </Col> */}
							</Row>
						</Col>
					</Row>
				</Space>
			</div>
		));
	};

	const [visible, setVisible] = useState(false);

	const viewClick = (event) => {
		setVisible(true);
	};

	const history = useHistory();

	const renderMoreOptions = (opportunityId, dataObject) => {
		const options = [
			// "Create opportunity",
			// "Record Interaction",
			'Portfolio Overview'
		];

		const onMoreMenuSelect = (task) => {
			switch (task) {
				case 'Create opportunity':
					history.push(`/dashboard/MyOpportunity/OpportunityCreate`);
					break;
				case 'Create Interaction':
					history.push(`/dashboard/MyInteractions/InteractionCreate`);
					break;
				case 'Portfolio Overview':
					history.push(`/dashboard/PortfolioOverview`);
					break;
				default:
					break;
			}
		};
		const content = () => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{options.map((option, index) => {
					return (
						<div key={index} className={`row-action-option`}>
							<span
								onClick={(e) => {
									e.stopPropagation();
									onMoreMenuSelect(e.target.innerHTML);
								}}
							>
								{option}
							</span>
						</div>
					);
				})}
			</div>
		);
		return (
			<div className='col-more'>
				<Popover
					placement='bottomLeft'
					content={content}
					overlayClassName='opportunity-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};

	const onCellFavourite = (record, rowIndex) => {
		return {
			onClick: (event) => {
				addFavouriteOpportunityApi(record.customerId, record.refType)
					.then((res) => {
						executeGetTopCustomersData(prevDate);
					})
					.catch((err) => {
						console.log('EEROR: ', err);
					});
			}
		};
	};

	const tablecolumns = [
		{
			title: 'Client Info',
			dataIndex: 'customerInfo',
			key: 'customerInfo',
			align: 'left'
		},
		{
			title: 'Contact',
			dataIndex: 'mobileNo',
			key: 'mobileNo',
			align: 'left'
		},
		{
			// title: 'AUM Total',
			title: 'AUM',
			dataIndex: 'aumTotal',
			key: 'aumTotal',
			align: 'left'
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			align: 'left'
		},

		// {
		//   title: "Revenue Total",
		//   dataIndex: "revenueTotal",
		//   key: "revenueTotal",
		//   align: "left",
		// },
		{
			title: '',
			dataIndex: 'isFavourite',
			key: 'isFavourite',
			onCell: onCellFavourite,
			render: (isFavourite) => <ScRate allowHalf={false} count={1} value={isFavourite} />
		},
		{
			title: '',
			dataIndex: 'menu',
			key: 'menu',
			render: () => renderMoreOptions()
		}
	];

	const dataSource = topCustomerList?.map((item, index) => {
		return {
			key: index,
			customerInfo: (
				<>
					<div style={theme.dFlex}>
						<div>
							<AvatarLogo
								imgsrc={item.profileImage}
								profileName={item.profileInitial}
								avatarSize={avatarSize || AvatarSize.aboveMedium}
							/>
						</div>
						<div style={styleSet.userInfo}>
							<div style={theme.primaryHeader}>{item.title}</div>
							{item.customerId} | {item.family}
							<div>
								<GenericBadge badgeBody={item.category} />
							</div>
						</div>
					</div>
				</>
			),
			mobileNo: (
				<>
					{' '}
					<div style={theme.dFlex}>
						{/* <div className='group' style={{ color: '#48528d' }}> */}
						<div className='group' style={{ color: '#696a91' }}>
							<div style={styleSet.count}>
								{item.mobileNo}
								{/* &nbsp;
								<span style={styleSet.count}>AUM</span> */}
							</div>
							<div>{item.email}</div>
						</div>
					</div>
				</>
			),
			aumTotal: (
				<>
					{' '}
					<div style={theme.dFlex}>
						<Badge size='default' style={styleSet.badge} count={item.aumRank} />
						{/* <div className='group' style={{ color: '#48528d' }}> */}
						<div className='group' style={{ color: '#696a91' }}>
							<div style={styleSet.count}>
								{item.currencySymbol} <RupeeOrNonRupee amount={item.aumTotal} />
								{/* &nbsp;
								<span style={styleSet.count}>AUM</span> */}
							</div>
						</div>
					</div>
				</>
			),
			type: (
				<>
					{' '}
					<div style={theme.dFlex}>
						{/* <div className='group' style={{ color: '#48528d' }}> */}
						<div className='group' style={{ color: '#696a91' }}>
							<div style={styleSet.count}>
								{item.customerTypeName}
								{/* &nbsp;
								<span style={styleSet.count}>AUM</span> */}
							</div>
						</div>
					</div>
				</>
			),
			// revenueTotal: (
			// 	<>
			// 		<div style={theme.dFlex}>
			// 			<Badge style={styleSet.badge} count={item.revenueRank} />
			// 			<div className='group' style={{ color: '#48528d' }}>
			// 				<div style={theme.mediumText}>
			// 					{item.currencySymbol} <RupeeOrNonRupee amount={item.revenueTotal} />
			// 				</div>
			// 				<div style={theme.mediumText}>Revenue</div>
			// 			</div>
			// 		</div>
			// 	</>
			// ),
			customerId: item.customerId,
			isFavourite: item.isFavourite,
			refType: item.refType
		};
	});

	const downloadRecords = () => {
		const downloadData =
			topCustomerList &&
			topCustomerList.length > 0 &&
			topCustomerList.map((item, index) => ({
				'Sr.No': index + 1,
				'Customer Name': item.title,
				'Customer ID': item.customerId,
				'Aum Total': item.aumTotal,
				'Revenue Total': item.revenueTotal
			}));

		exportJSON(downloadData, title);
	};

	return (
		<>
			<GenericCard
				header={title}
				menuList={menuList}
				menuFlag={2}
				dropdownKey={'topCustomer'}
				viewAll={true}
				viewClick={viewClick}
			>
				{renderTopCustomerList()}
			</GenericCard>
			<CustomModal
				visible={visible}
				// width={'max-content'}
				width={'70vw'}
				closable={true}
				handleCancel={() => setVisible(false)}
				handleOk={() => setVisible(true)}
				title={title}
			>
				<Table columns={tablecolumns} dataSource={dataSource} />
				<ScButtonText
					type='text'
					margin='18px 0 0 auto'
					padding='4px 15px'
					position='absolute'
					bottom='20px'
					right='0px'
					left='auto'
					color='#354081'
					onClick={() => {
						downloadRecords();
					}}
				>
					<FontAwesomeIcon icon={faDownload} />
					&nbsp;&nbsp;Download report
				</ScButtonText>
			</CustomModal>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		allHighValueDealsData: state.crmHome.highValueDeals,
		allTopCustomersData: state.crmHome.topCustomers,
		selectedType: state.common.dropdownKeys?.topCustomer,
		topCustomerCSObj: state.crmHome.controlStructure?.csList[0]?.controlStructureField[3]
	};
};

const mapDispatchToProps = {
	executeGetTopCustomersData
};
export default connect(mapStateToProps, mapDispatchToProps)(TopCustomersRemade);

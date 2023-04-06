import { faCheckSquare, faEllipsisHAlt, faFire } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Popover, Row, Checkbox, Space, Typography, Spin } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { executeGetAllCustomersData } from '../../redux/actions/customerListingActions';

import { addFavouriteCustomerApi, getAccountDetailsApi } from '../../api/customerListingApi';
import { ScAvatarProfileInitialText, ScRate, ScTable } from '../StyledComponents/genericElements';
import SocialAppLink from '../SocialAppLink/SocialAppLink';
import moment from 'moment';
import styled from 'styled-components';
import { CONSTANTS } from '../../constants/constants';
import { connect } from 'react-redux';
import { useState } from 'react';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import RupeeOrNonRupee from '../RupeeOrNonRupee/RupeeOrNonRupee';
import { executeSetChildMenuFlag } from '../../redux/actions/dashboardActions';
import { executeSelectedCustomerInfo } from '../../redux/actions/commonActions';
import { authorizeModule } from '../../utils/utils';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import './CustomerCard.scss';
import GenericGridViewPagination from '../GenericGridViewPagination/GenericGridViewPagination';
const { Text } = Typography;

const FavIcon = styled.div`
	font-size: 1.5vw;
	margin-top: -25%;
`;
const pageSize = 25;
const CustomerCard = ({
	data,
	setLocalCustomerData,
	executeGetAllCustomersData,
	loading,
	setLoading,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	setShowDowngradeModal,
	setShowUpgradeModal,
	authorizeCode,
	setShowEndorseModal
}) => {
	const history = useHistory();
	const [pageCountDetail, setpageCountDetail] = useState({ start: 0, end: pageSize });
	const { path } = useRouteMatch();
	const styleset = {
		styleTwo: {
			fontFamily: 'Open Sans',
			fontSize: '1vw',
			color: '#696a91',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			marginLeft: '6px'
		},

		styleThree: {
			fontFamily: 'Open Sans',
			fontSize: '1vw',
			color: '#696a91',
			marginLeft: '8px'
		},
		styleFour: {
			fontFamily: 'Open Sans',
			fontSize: '1vw',
			color: '#696a91',
			textOverflow: 'ellipsis',
			marginRight: '8px',
			marginLeft: '15px',
			marginTop: '50px',
			whiteSpace: 'nowrap'
		}
	};
	const viewRecord = (rowIndex) => {
		const customerIds = data.map((item) => item.customerCode);
		const toObject = {
			pathname: `${path}/CustomerView`,
			state: { customerIds: customerIds, rowIndex: rowIndex }
		};
		history.push(toObject);
	};
	function handleEditClick(customerCode) {
		const toObject = {
			pathname: '/dashboard/MyCustomers/CustomerEdit',
			state: { refID: customerCode, action: 'edit', refType: 'CLIENTADD' }
		};
		history.push(toObject);
	}

	function handleCreateTaskClick() {
		const toObject = {
			pathname: '/dashboard/TaskBoard/TaskCreate'
		};

		history.push(toObject);
	}
	function handlePortfolioHoldingsClick(selectedRows) {
		executeSetChildMenuFlag(true);
		const customerInfo = {
			customerCode: selectedRows.customerCode,
			customerName: selectedRows.customerName,
			familyName: selectedRows.familyName,
			profileImage: selectedRows.profileImage,
			type: 'customer'
		};
		executeSelectedCustomerInfo(customerInfo);
		const toObject = {
			pathname: '/dashboard/PortfolioOverview',
			state: { CustomerID: selectedRows.customerCode }
		};

		history.push(toObject);
		// onPortfolioHoldingsSelect(selectedRows)
	}

	function handleRecordInteractionClick() {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	}
	const RenderMoreOptions = ({ record }) => {
		const options = [
			'Portfolio Overview',
			'Create Task',
			'Create Interaction',
			'Create Opportunity'
		];

		if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify)) {
			options.push('Edit');
		}
		if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.downgrade)) {
			options.push('Downgrade');
		}
		if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.upgrade)) {
			options.push('Upgrade');
		}
		if (authorizeModule(authorizeCode, CONSTANTS.authorizeCode.assign)) {
			options.push('Assign');
		}
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
								setSelectedRowKeys([record.customerCode]);
								setSelectedRows([record]);
								option.toLowerCase() === 'upgrade' && setShowUpgradeModal(true);
								option.toLowerCase() === 'downgrade' && setShowDowngradeModal(true);

								option.toLowerCase() === 'edit' && handleEditClick(record.customerCode);

								option.toLowerCase() === 'portfolio overview' &&
									handlePortfolioHoldingsClick(record);

								option.toLowerCase() === 'assign' && setShowEndorseModal(true);
								option.toLowerCase() === 'create task' &&
									history.push('TaskBoard/TaskCreate', {
										screen: 'task-list',
										refType: 'CLIENTADD',
										data: record,
										mode: 'create'
									});
								option.toLowerCase() === 'create interaction' &&
									history.push('MyInteractions/InteractionCreate', {
										screen: 'customer-list',
										refType: 'CLIENTADD',
										data: record,
										mode: 'create'
									});
								option.toLowerCase() === 'create opportunity' &&
									history.push('MyOpportunity/OpportunityCreate', {
										screen: 'customer-list',
										refType: 'CLIENTADD',
										data: record,
										mode: 'create'
									});
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<Popover
				placement='bottomLeft'
				content={content}
				overlayClassName='prospect-listing-actions-popover'
			>
				<FontAwesomeIcon
					icon={faEllipsisHAlt}
					style={{ fontSize: '1.5vw' }}
					className='row-actions-menu-icon'
				/>
			</Popover>
		);
	};
	const RenderFavourite = ({ record }) => (
		<FavIcon
			style={{ margin: '-0.5em 0.2em', fontSize: '1.5vw' }}
			onClick={(event) => {
				event.stopPropagation();
				addFavouriteCustomerApi(record.customerCode, CONSTANTS.progNames.CLIENTADD)
					.then((res) => {})
					.catch((err) => {
						console.log('EEROR: ', err);
					})
					.finally(() => {
						executeGetAllCustomersData(setLocalCustomerData, setLoading);
					});
			}}
		>
			<ScRate allowHalf={false} count={1} value={record.isFavourite} />
		</FavIcon>
	);

	const RenderRow = ({ record, index }) => {
		const [ishover, setIshover] = useState(false);
		// console.log("record.......", record)

		return (
			// <Card
			// 	onMouseEnter={(e) => setIshover(true)}
			// 	onMouseLeave={(e) => setIshover(false)}
			// 	bordered={true}
			// 	style={{ height: '45vh' }}
			// >
			<div className='vertical-flex-card styled-border' style={{ height: '45vh' }}>
				<div className='prospect-card-flex-between'>
					<div>
						<Checkbox
							value={record.customerCode}
							checked={selectedRowKeys.includes(record.customerCode)}
							onClick={(e) => {
								e.stopPropagation();
								if (e.target.checked) {
									setSelectedRowKeys([...selectedRowKeys, record.customerCode]);
									setSelectedRows([...selectedRows, record]);
								} else {
									setSelectedRowKeys([
										...selectedRowKeys.filter((key) => {
											return key !== record.customerCode;
										})
									]);
									setSelectedRows([
										...selectedRows.filter((row) => {
											return row.customerCode !== record.customerCode;
										})
									]);
								}
							}}
							customerName={record.customerName}
							record={record}
						/>
					</div>
					<div style={{ display: 'flex' }}>
						<RenderFavourite record={record} />
						<RenderMoreOptions record={record} />
					</div>
				</div>
				<div className='prospect-card-content'>
					<div>
						<AvatarLogo
							imgsrc={record.profileImage}
							profileName={record.profileInitial}
							avatarSize={{ xs: 45, sm: 50, md: 65, lg: 65, xl: 65, xxl: 95 }}
						/>
					</div>
					<div>
						<span className='styleOne clamp' title={record.customerName}>
							{record.customerName}
						</span>
						<div style={styleset.styleTwo}>
							{record.customerCode && record.familyName && (
								<Text style={{ color: '#696a91' }}>{`${record?.otherIdNo ?? ''} | ${
									record.familyName
								}`}</Text>
							)}
						</div>
						<span className='clampaddress' style={styleset.styleThree}>
							{record.address}
						</span>
						<div style={styleset.styleTwo}>{record.emailID}</div>
						<div style={styleset.styleTwo}>{record.mobileNo}</div>
						<div style={styleset.styleTwo}>
							{record.currencySymbol}
							<RupeeOrNonRupee amount={record.aum} />
						</div>
						<Text style={{ color: '#696a91', fontSize: '1vw', marginLeft: '5px' }}>AUM</Text>
					</div>
				</div>

				<div className='prospect-card-flex-between prospect-card-footer'>
					<div>
						<span
							style={{
								padding: '5px',
								borderRadius: '12px',
								color: 'rgb(53, 64, 129)',
								backgroundColor: 'rgb(240, 242, 251)'
							}}
						>
							{record.customerCategory}
						</span>
					</div>
					<div>
						<Button
							type='link'
							shape='circle'
							icon={
								<a
									href={`https://twitter.com/${record?.socialList?.socialMediaValue}`}
									target='_blank'
								>
									<FontAwesomeIcon
										icon={faTwitter}
										style={{
											color: '#48A1EC'
										}}
									/>
								</a>
							}
						></Button>
						<Button
							type='link'
							shape='circle'
							icon={
								<a
									href={`https://linkedin.com/${record?.socialList?.socialMediaValue}`}
									target='_blank'
								>
									<FontAwesomeIcon icon={faFacebook} style={{ color: '#274D95' }} />
								</a>
							}
						></Button>
						<Button
							type='link'
							shape='circle'
							icon={
								<a
									href={`https://facebook.com/${record?.socialList?.socialMediaValue}`}
									target='_blank'
								>
									<FontAwesomeIcon icon={faLinkedin} style={{ color: '#3568AD' }} />
								</a>
							}
						></Button>
					</div>
				</div>
			</div>
			// </Card>
		);
	};
	return data ? (
		<Spin spinning={loading}>
			<div style={{ margin: '16px 0', textAlign: 'right' }}>
				<GenericGridViewPagination
					pageSize={pageSize}
					total={data?.length}
					setpageCountDetail={setpageCountDetail}
				/>
			</div>
			<Row align='middle'>
				{data?.slice(pageCountDetail?.start, pageCountDetail?.end)?.map((record, index) => (
					<Col key={record?.rowNumber} span={8} style={{ padding: '10px 10px 10px 0' }}>
						<RenderRow record={record} index={record?.rowNumber} />
					</Col>
				))}
			</Row>
		</Spin>
	) : null;
};

const mapDispatchToProps = {
	executeGetAllCustomersData
};

export default connect(null, mapDispatchToProps)(CustomerCard);

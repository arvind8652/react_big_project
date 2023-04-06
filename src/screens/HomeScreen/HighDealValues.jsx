import { React, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Select, Row, Col, Space, Typography, Table, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { theme } from '../../theme';
import GenericCard from '../../components/GenericCard/GenericCard';
import GenericBadge from '../../components/GenericBadge/GenericBadge';
import SmallUserDetail from './SmallUserDetail';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { executeGetHighValueDealsData } from '../../redux/actions/crmHomeActions';
import { exportJSON } from '../../utils/utils';
import { ScButtonText, ScRate } from '../../components/StyledComponents/genericElements';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { addFavouriteOpportunityApi } from '../../api/opportunityListingApi';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
const { Option } = Select;
const { Text } = Typography;
const menuItems = ['Modify', 'Delete'];

const dealsList = [
	{
		id: 0,
		name: 'Chris Ramos',
		role: 'Prospect',
		amount: '$ 25,000',
		title: 'AIF fund investment',
		date: '31 Mar 2021',
		stage: 'Negotiation & Review',
		status: 'Closed',
		currency: '$'
	},
	{
		id: 1,
		name: 'Chris Ramos',
		role: 'Prospect',
		amount: '$ 25,000',
		title: 'AIF fund investment',
		date: '31 Mar 2021',
		stage: 'Negotiation & Review',
		status: 'Closed',
		currency: '$'
	},
	{
		id: 2,
		name: 'Chris Ramos',
		role: 'Prospect',
		amount: '$ 25,000',
		title: 'AIF fund investment',
		date: '31 Mar 2021',
		stage: 'Negotiation & Review',
		status: 'Closed',
		currency: '$'
	}
];

const styleSet = {
	rowStyle: {
		padding: '24px 0px',
		borderBottom: '1px solid #CBD6FF'
	},
	status: {
		display: 'flex',
		float: 'right'
	}
};

const HighDealValues = ({ allHighValueDealsData, executeGetHighValueDealsData }) => {
	const title = 'High Value Deals';
	const [componentData, setComponentData] = useState(dealsList);

	useEffect(() => {
		executeGetHighValueDealsData();
	}, []);

	useEffect(() => {
		const apiData = allHighValueDealsData?.opportunity.map((item, index) => {
			return {
				id: index,
				name: item.clientProspectName,
				role: item.tagName,
				amount: item.targetAmount,
				title: item.opportunityName,
				date: item.dueDate,
				status: item.status,
				stage: item.stage,
				currency: item.currencySymbol,
				isFavourite: item.isFavourite,
				opportunityId: item.opportunityId,
				refType: item.refType
			};
		});
		setComponentData(apiData);
	}, [allHighValueDealsData]);

	const [visible, setVisible] = useState(false);

	const viewClick = (event) => {
		setVisible(true);
	};

	const onCellFavourite = (record, rowIndex) => {
		return {
			onClick: (event) => {
				addFavouriteOpportunityApi(record.opportunityId, record.refType)
					.then((res) => {
						executeGetHighValueDealsData();
					})
					.catch((err) => {
						console.log('EEROR: ', err);
					});
			}
		};
	};

	const history = useHistory();

	const renderMoreOptions = (opportunityId, dataObject) => {
		const options = ['Create opportunity', 'Create Interaction'];

		const onMoreMenuSelect = (task) => {
			switch (task) {
				case 'Create opportunity':
					history.push(`/dashboard/MyOpportunity/OpportunityCreate`);
					break;
				case 'Create Interaction':
					history.push(`/dashboard/MyInteractions/InteractionCreate`);
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

	const tablecolumns = [
		{
			title: 'Opportunity',
			dataIndex: 'opportunity',
			key: 'opportunity',
			align: 'left'
		},
		{
			title: 'Target',
			dataIndex: 'target',
			key: 'target',
			align: 'left'
		},
		{
			title: 'Due Date',
			dataIndex: 'dueDate',
			key: 'dueDate',
			align: 'left'
		},
		{
			title: 'Stage',
			dataIndex: 'stage',
			key: 'stage',
			align: 'left'
		},
		{
			title: 'Client / Prospect Name',
			dataIndex: 'clientProspectName',
			key: 'clientProspectName',
			align: 'left'
		},
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

	const dataSource = componentData?.map((item, index) => {
		return {
			key: index,
			opportunity: (
				<>
					<div style={theme.primaryHeader}>{item.title}</div>
					<GenericBadge badgeBody={item.status} />
				</>
			),
			target: (
				<>
					{item.currency} <RupeeOrNonRupee amount={item.amount} />
				</>
			),
			dueDate: moment(item.date).format('DD MMM YYYY'),
			stage: item.stage,
			clientProspectName: (
				<>
					<SmallUserDetail />
				</>
			),
			isFavourite: item.isFavourite,
			opportunityId: item.opportunityId,
			refType: item.refType
		};
	});

	const downloadRecords = () => {
		const downloadData =
			componentData &&
			componentData.length > 0 &&
			componentData.map((opp, index) => ({
				'Sr.No': index + 1,
				Opportunity: opp.title,
				Currency: opp.currencySymbol,
				Target: opp.amount,
				'Due Date': moment(opp.date).format('DD-MMM-YYYY'),
				Stage: opp.stage,
				'Client/Prospect Name': opp.name,
				Type: opp.role
			}));

		exportJSON(downloadData, title);
	};

	return (
		<>
			<GenericCard header={title} viewAll={true} viewAllList={dealsList} viewClick={viewClick}>
				{componentData?.slice(0, 3).map((item) => (
					<div key={item.id} style={styleSet.rowStyle}>
						<Space direction='vertical'>
							<Row>
								<Col lg={24} xl={24}>
									<div style={theme.primaryHeader}>{item.title}</div>
									<div style={theme.secondaryHeader}>
										{item.currency} <RupeeOrNonRupee amount={item.amount} />
									</div>
								</Col>
							</Row>
							<Row>
								<Col lg={24} xl={12}>
									{item.stage}
								</Col>
								<Col lg={24} xl={12}>
									<div style={styleSet.status}>
										<GenericBadge badgeBody={item.status} />
									</div>
								</Col>
							</Row>
							<Row>
								<Col lg={24} xl={16}>
									<SmallUserDetail name={item.name} role={item.role} />
								</Col>
								<Col lg={24} xl={8}>
									<div style={theme.secondaryHeader}>
										{/* {item.date} */}
										{moment(item.date).format('DD MMM YYYY')}
									</div>
									<div>Due Date</div>
								</Col>
							</Row>
						</Space>
					</div>
				))}
			</GenericCard>
			<CustomModal
				visible={visible}
				width={'80vw'}
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
		allHighValueDealsData: state.crmHome.highValueDeals
	};
};
const mapDispatchToProps = {
	executeGetHighValueDealsData
};
export default connect(mapStateToProps, mapDispatchToProps)(HighDealValues);

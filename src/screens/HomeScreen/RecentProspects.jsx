import { React, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Avatar, Row, Col, Space, Badge, Table, Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { palette, theme } from '../../theme';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import GenericCard from '../../components/GenericCard/GenericCard';
import GenericBadge from '../../components/GenericBadge/GenericBadge';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
	faLinkedinIn,
	faTwitter,
	faFacebookF,
	faLinkedin,
	faFacebookSquare
} from '@fortawesome/free-brands-svg-icons';

import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { exportJSON, authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
// import { authorizeModule } from '../../utils/utils';
import { ScButtonText, ScRate } from '../../components/StyledComponents/genericElements';
import { faDownload, faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { addFavouriteOpportunityApi } from '../../api/opportunityListingApi';
import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { executeGetRecentProspectsData } from '../../redux/actions/crmHomeActions';
const RecentProspects = ({ allRecenProspectsData, executeGetRecentProspectsData }) => {
	const title = 'Recent Prospects';
	let authorizeCode = '';
	const { path } = useRouteMatch();

	useEffect(() => {
		executeGetRecentProspectsData();
	}, []);

	const defaultPropspects = [
		{
			id: 0,
			profile: '',
			prospectName: '',
			profileInitial: '',
			email: '',
			mobile: '',
			address: '',
			type: '',
			qualificationStatus: '',
			interestLevel: '',
			relationshipManager: '',
			branch: '',
			version: '',
			refID: '',
			action: '',
			status: '',
			facebook: '',
			linkedIn: '',
			twitter: '',
			skype: ''
		},
		{
			id: 1,
			profile: '',
			profileInitial: '',
			prospectName: '',
			email: '',
			mobile: '',
			address: '',
			type: '',
			qualificationStatus: '',
			interestLevel: '',
			relationshipManager: '',
			branch: '',
			version: '',
			refID: '',
			action: '',
			status: '',
			facebook: '',
			linkedIn: '',
			twitter: '',
			skype: ''
		}
	];

	const apiProspectsData = allRecenProspectsData?.map((item, index) => {
		return {
			id: index,
			profile: item.profile,
			profileInitial: item.profileInitial,
			prospectName: item.prospectName,
			email: item.email,
			mobile: item.mobile,
			// countryCode: item.countryCode,
			address: item.address,
			type: item.type,
			qualificationStatus: item.qualificationStatus,
			interestLevel: item.interestLevel,
			relationshipManager: item.relationshipManager,
			branch: item.branch,
			version: item.version,
			refID: item.refID,
			action: item.action,
			status: item.status,
			facebook: item.facebook ? item.facebook : null,
			linkedIn: item.linkedIn ? item.linkedIn : null,
			twitter: item.twitter ? item.twitter : null,
			isFavourite: item.isFavourite,
			sourceName: item.sourceName,
			typeName: item.typeName,
			prospectId: item.prospectId,
			refType: item.refType
		};
	});

	const [propspectList, setPropspectList] = useState(apiProspectsData || defaultPropspects);

	useEffect(() => {
		setPropspectList(apiProspectsData);
	}, [allRecenProspectsData]);

	const styleSet = {
		addressBlock: {
			wordWrap: 'break-word'
		},
		rowStyle: {
			padding: '32px 0px',
			color: palette.secondary.light,
			borderBottom: '1px solid #CBD6FF'
		},
		name: {
			color: '#222747'
		},
		fbook: {
			height: '15px',
			width: '15px',
			color: '#FFFFFF',
			margin: '3px',
			position: 'relative',
			top: '-4px',
			backgroundColor: '3b5998'
		},
		lbook: {
			height: '21px',
			width: '10px',
			color: '#FFFFFF',
			margin: '3px',
			position: 'relative',
			top: '-5px'
		},
		tbook: {
			height: '18px',
			width: '18px',
			color: '#00acee',
			// margin: '3px'
			padding: '0px'
		},
		socialIcon: {
			height: '14px',
			width: '12px',
			color: '#00acee',
			margin: '3px'
		},
		userInfo: {
			padding: '8px',
			marginTop: '20px',
			color: '#222747'
		},
		details: {
			fontWeight: '300px'
		}
	};

	const RenderProspectList = () => {
		return propspectList?.slice(0, 3).map((item) => (
			<Row key={item.id} gutter={8} style={{ ...styleSet.rowStyle, ...theme.secondaryBody }}>
				<Col lg={24} xl={6}>
					<AvatarLogo
						imgsrc={''}
						profileName={item.profileInitial}
						avatarSize={AvatarSize.extrasmall}
						style={{ backgroundColor: item.color }}
					/>
				</Col>
				<Col lg={24} xl={18}>
					<Space direction='vertical'>
						<Row>
							<Col span={24}>
								<div style={{ ...theme.secondaryHeader, ...styleSet.name }}>
									{item.prospectName}{' '}
								</div>
								<div style={{ ...styleSet.addressBlock }}>
									<FontAwesomeIcon icon={faMapMarkerAlt} />
									{item.address}
								</div>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<div>{item.email}</div>
								<div>
									{/* {item.countryCode} */}
									{item.mobile}{' '}
								</div>
							</Col>
						</Row>
						<Row>
							<Col span={16}>
								<GenericBadge badgeBody={'Wealth'} />
							</Col>
							<Col span={8} style={theme.justifySBetween}>
								<Button
									type='link'
									shape='circle'
									icon={
										item.linkedIn && (
											<a href={`https://linkedin.com/${item.linkedIn}`} target='_blank'>
												<FontAwesomeIcon icon={faLinkedin} />
											</a>
										)
									}
									style={{
										backgroundColor: 'transparent',
										color: '#0A66C2',
										padding: '2px 2px',
										// borderRadius: '20px',
										fontSize: '14px',
										marginRight: '-3px'
									}}
								></Button>

								<Button
									type='link'
									shape='circle'
									icon={
										item.twitter && (
											<a href={`https://twitter.com/${item.twitter}`} target='_blank'>
												<FontAwesomeIcon icon={faTwitter} />
											</a>
										)
									}
									style={{
										backgroundColor: 'transparent',
										color: '#00acee',
										padding: '2px 2px',
										borderRadius: '20px',
										fontSize: '14px',
										marginRight: '2px'
									}}
								></Button>
								{item.linkedIn && (
									<a href={`https://facebook.com/${item.facebook}`}>
										<Avatar
											style={{ backgroundColor: '#3b5998', height: '18px', width: '18px' }}
											icon={
												<FontAwesomeIcon
													// className='prospectViewSocialMediaIcon'
													icon={faFacebookF}
													style={styleSet.fbook}
												/>
											}
										/>
									</a>
								)}
							</Col>
						</Row>
					</Space>
				</Col>
			</Row>
		));
	};

	const [visible, setVisible] = useState(false);

	const viewClick = (event) => {
		setVisible(true);
	};

	const history = useHistory();

	const renderMoreOptions = (opportunityId, dataObject) => {
		const options = [
			// "Modify",
			// "Take note",
			// 'Create Task',
			'Create Opportunity',
			'Create Interaction'
			// "Assign",
			// "convert",
			// "downgrade",
		];

		const onMoreMenuSelect = (task) => {
			switch (task) {
				case 'Create Opportunity':
					history.push(`/dashboard/MyOpportunity/OpportunityCreate`);
					break;
				case 'Create Interaction':
					history.push(`/dashboard/MyInteractions/InteractionCreate`);
					break;
				// case 'Create Task':
				// 	history.push(`/dashboard/TaskBoard/TaskCreate`);
				// 	break;
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
									// setSelectedRowKeys([...selectedRowKeys, record.opportunityId]);
									// setSelectedRows([...selectedRows, record]);
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
	const onCellDefault = (row, rowIndex) => {
		const prospectIds = propspectList.map((item) => item.prospectId);
		// console.log(prospectIds);
		const index = [
			...propspectList.map((item, index) => {
				if (item.prospectId === row.prospectId) {
					return index;
				} else return null;
			})
		].filter((item) => item !== null);
		const toObject = {
			// pathname: `${path}/ProspectView`,
			pathname: `/dashboard/MyProspect/ProspectView`,
			state: { prospectIds: prospectIds, rowIndex: index[0] }
		};
		return {
			onClick: (event) => {
				{
					history.push(toObject);
				}
			}, // click row
			onDoubleClick: (event) => {}, // double click row
			onContextMenu: (event) => {}, // right button click row
			onMouseEnter: (event) => {}, // mouse enter row
			onMouseLeave: (event) => {} // mouse leave row
		};
	};

	const onCellFavourite = (record, rowIndex) => {
		return {
			onClick: (event) => {
				addFavouriteOpportunityApi(record.prospectId, record.refType)
					.then((res) => {
						executeGetRecentProspectsData();
					})
					.catch((err) => {
						console.log('EEROR: ', err);
					});
			}
		};
	};

	const tablecolumns = [
		{
			title: 'Prospect Name',
			dataIndex: 'prospectName',
			key: 'prospectName',
			align: 'left',
			onCell: onCellDefault
		},
		{
			title: 'Contact',
			dataIndex: 'mobile',
			key: 'mobile',
			align: 'left',
			onCell: onCellDefault
		},
		{
			title: 'Source',
			dataIndex: 'sourceName',
			key: 'sourceName',
			align: 'left',
			onCell: onCellDefault
		},
		{
			title: 'Type',
			dataIndex: 'typeName',
			key: 'typeName',
			align: 'left',
			onCell: onCellDefault
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
	const dataSource = propspectList?.map((item, index) => {
		return {
			key: index,
			prospectName: (
				<>
					<div style={theme.dFlex}>
						<div>
							<AvatarLogo
								// imgsrc={item.profileImage}
								profileName={item.profileInitial}
								avatarSize={AvatarSize.semiMedium}
							/>
						</div>
						<div style={styleSet.userInfo}>
							<div style={theme.primaryHeader}>{item.prospectName}</div>
						</div>
					</div>
				</>
			),
			sourceName: (
				<>
					<div style={theme.dFlex}>
						<div style={{ color: '#696a91' }}>
							<div style={styleSet.details}>{item.sourceName}</div>
						</div>
					</div>
				</>
			),
			typeName: (
				<>
					<div style={theme.dFlex}>
						<div style={{ color: '#696a91' }}>
							<div style={styleSet.details}>{item.typeName}</div>
						</div>
					</div>
				</>
			),
			mobile: (
				<>
					<div style={theme.dFlex}>
						<div style={{ color: '#696a91' }}>
							<div style={styleSet.details}>{item.mobile}</div>
							<div style={styleSet.details}>{item.email}</div>
						</div>
					</div>
				</>
			),
			prospectId: item.prospectId,
			// isFavourite: item.isFavourite,
			refType: item.refType
		};
	});

	const downloadRecords = () => {
		const downloadData =
			propspectList &&
			propspectList.length > 0 &&
			propspectList.map((item, index) => ({
				'Sr.No': index + 1,
				'Prospect Name': item.prospectName,
				Address: item.address,
				'E-mail': item.email,
				Contact: item.mobile
			}));

		exportJSON(downloadData, title);
	};

	return (
		<>
			<GenericCard header={title} viewAll={true} viewClick={viewClick}>
				{RenderProspectList()}
			</GenericCard>

			<CustomModal
				visible={visible}
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
		allRecenProspectsData: state.crmHome.recentProspects
	};
};

const mapDispatchToProps = {
	executeGetRecentProspectsData
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentProspects);

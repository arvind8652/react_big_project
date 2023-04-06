import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Popover, Row, Checkbox, List, Rate, Spin } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { executeGetAllProspectData } from '../../redux/actions/prospectListingActions';
import { addFavouriteProspectApi } from '../../api/prospectListingApi';

import { connect } from 'react-redux';
import { faClipboardCheck } from '@fortawesome/pro-solid-svg-icons';
import {
	faLinkedin,
	faTwitter,
	faFacebookSquare,
	faFacebookF
} from '@fortawesome/free-brands-svg-icons';
import AvatarLogo from '../Avatar/AvatarLogo';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { ScRate } from '../StyledComponents/genericElements';

import './ProspectCard.scss';

const ProspectCard = ({
	data,
	setLocalProspectData,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	executeGetAllProspectData,
	loading,
	setLoading,
	setShowMovedownModal,
	setConvertProspectModalOpen,
	setcurrentRowCount,
	setProspectViewRefId,
	authorizeCode
}) => {
	const history = useHistory();
	const { path } = useRouteMatch();

	// const viewRecord = (rowIndex) => {
	//   const prospectIds = data.map((item) => item.prospectId);
	//   const toObject = {
	//     pathname: `${path}/ProspectView`,
	//     state: { prospectIds: prospectIds, rowIndex: rowIndex },
	//   };
	//   history.push(toObject);
	// };
	const styleset = {
		styleOne: {
			fontFamily: 'Open Sans',
			fontWeight: 600,
			fontSize: '1.125rem',
			color: '#222747',
			marginBottom: 0
		},
		styleTwo: {
			fontFamily: 'Open Sans',
			fontSize: '1rem',
			color: '#696a91'
		}
	};
	const RenderMoreOptions = ({ record }) => {
		const options = [
			'Edit',
			'Convert',
			// 'Movedown',
			// 'Take Note',
			'Create Task',
			'Create Interaction',
			'Create Opportunity'
		].filter((type) => {
			switch (type) {
				case 'Edit':
					return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify);
				case 'Convert':
					return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.convert);
				default:
					return true;
			}
		});

		const onMoreMenuSelect = (task) => {
			let toObject;
			switch (task) {
				case 'Edit':
					toObject = {
						pathname: `${path}/ProspectCreate`,
						state: { screen: 'list', data: record?.prospectId, action: 'edit' }
					};
					history.push(toObject);
					break;
				case 'Convert':
					setConvertProspectModalOpen(true);
					setProspectViewRefId(record?.prospectId);
					setcurrentRowCount(record?.rowNumber);
					break;
				// case 'Movedown':
				// 	setShowMovedownModal(true);
				// 	break;
				// case "Create Opportunity":
				//   history.push(`${path}/OpportunityCreate`);
				//   break;
				case 'Create Interaction':
					toObject = {
						pathname: `MyInteractions/InteractionCreate`,
						state: {
							screen: 'prospect-list',
							data: record,
							mode: 'create'
						}
					};
					history.push(toObject);
					break;
				case 'Create Task':
					toObject = {
						pathname: `/dashboard/TaskBoard/TaskCreate`,
						state: {
							screen: 'task-list',
							data: record,
							mode: 'create'
						}
					};
					history.push(toObject);
					break;
				case 'Create Opportunity':
					toObject = {
						pathname: `MyOpportunity/OpportunityCreate`,
						state: {
							screen: 'prospect-list',
							data: record,
							mode: 'create'
						}
					};
					history.push(toObject);
					break;
				default:
					break;
			}
		};

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
							onClick={(e) => {
								e.stopPropagation();
								onMoreMenuSelect(e.target.innerHTML);
								setSelectedRowKeys([...selectedRowKeys, record.opportunityId]);
								setSelectedRows([...selectedRows, record]);
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
					className='row-actions-menu-icon'
					style={{ fontSize: '1.5vw' }}
				/>
			</Popover>
		);
	};

	const RenderFavourite = ({ prospectId, isFavourite }) => (
		<ScRate
			count={1}
			value={isFavourite}
			onChange={() => {
				addFavouriteProspectApi(prospectId, CONSTANTS.progNames.PROSPECTADD)
					.then(() => {
						executeGetAllProspectData(setLocalProspectData, setLoading);
					})
					.catch((err) => {
						console.log('EEROR: ', err);
					});
			}}
			style={{ margin: '-0.5em 0.2em', fontSize: '1.5vw' }}
		/>
	);

	return (
		<Spin tip='Loading...' spinning={loading} size='large'>
			<List
				grid={{ gutter: 16, column: 3 }}
				dataSource={data}
				renderItem={(record) => (
					<List.Item>
						<div className='vertical-flex-card styled-border'>
							<div className='prospect-card-flex-between'>
								<div>
									<Checkbox
										value={record.prospectId}
										checked={selectedRowKeys.includes(record.prospectId)}
										onClick={(e) => {
											e.stopPropagation();
											if (e.target.checked) {
												setSelectedRowKeys([...selectedRowKeys, record.prospectId]);
												// selectedRows([...selectedRows, record]);
											} else {
												setSelectedRowKeys([
													...selectedRowKeys.filter((key) => {
														return key !== record.prospectId;
													})
												]);
												setSelectedRows([
													...selectedRows.filter((row) => {
														return row.prospectId !== record.prospectId;
													})
												]);
											}
										}}
									/>
								</div>
								<div>
									<RenderFavourite
										prospectId={record.prospectId}
										isFavourite={record.isFavourite}
									/>
									<RenderMoreOptions record={record} />
								</div>
							</div>
							<div className='prospect-card-content'>
								<div>
									<AvatarLogo
										imgsrc={record.profileImage}
										profileName={record.profileInitial}
										avatarSize={{ xs: 40, sm: 40, md: 65, lg: 65, xl: 65, xxl: 95 }}
									/>
								</div>
								<div>
									<h5 className='ant-card-meta-title' style={styleset.styleOne}>
										{record.name}
									</h5>
									<small style={styleset.styleTwo}>
										<i
											class='fas fa-map-marker-alt'
											style={{ marginRight: 5, color: '#696A91', marginBottom: 10 }}
										/>
										{record.address}
									</small>
									<div style={styleset.styleTwo}>{record.email}</div>
									<div style={styleset.styleTwo}>{record.mobile}</div>
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
										{record.categoryName}
									</span>
									<FontAwesomeIcon icon={faHotjar} style={{ color: '#EF7C5B' }} />
									<FontAwesomeIcon icon={faClipboardCheck} style={{ color: '#696A91' }} />
								</div>
								<div>
									<FontAwesomeIcon
										icon={faTwitter}
										style={{
											color: '#48A1EC'
										}}
									/>
									<FontAwesomeIcon
										icon={faFacebookF}
										style={{
											backgroundColor: '#274D95',
											color: '#FFFFFF',
											borderRadius: '10px',
											width: '20px',
											height: '20px',
											fontSize: '10px'
										}}
									/>
									<FontAwesomeIcon icon={faLinkedin} style={{ color: '#3568AD' }} />
								</div>
							</div>
						</div>
					</List.Item>
				)}
				style={{ marginTop: '20px' }}
			/>
		</Spin>
	);
};

const mapDispatchToProps = {
	executeGetAllProspectData
};

export default connect(null, mapDispatchToProps)(ProspectCard);

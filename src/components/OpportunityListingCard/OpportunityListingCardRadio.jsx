import { faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Checkbox, Col, Popover, Radio, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { addFavouriteOpportunityApi } from '../../api/opportunityListingApi';
import { CONSTANTS } from '../../constants/constants';
import { executeGetAllOpportunityData } from '../../redux/actions/opportunityListingActions';
import { currencyFormatter } from '../../utils/utils';
import AvatarLogo from '../Avatar/AvatarLogo';
import { ScFontAwesomeIcon, ScTag } from '../StyledComponents/genericElements';
import './opportunityListingCard.scss';

const FavIcon = styled.div`
	font-size: 2.5vw;
`;
const StyledOpportunityName = styled.span`
	width: 75% !important;
	font-family: Open Sans;
	font-weight: 600;
	font-size: 1.35vw;
	line-height: 33px;
	color: #222747;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const StyledAmountDiv = styled.div`
	width: 75%;
	font-family: Open Sans;
	font-weight: 600;
	font-size: 1.2vw;
	color: #222747;
`;
const StyledCard = styled(Card)`
	width: 100% !important;
	border-radius: 8px !important;
	.ant-card-head {
		min-height: 18px;
		height: 32px;
		border: none;
		padding: 0 16px 0 10px;
		.ant-card-head-title {
			padding: 0;
		}
	}
	.ant-card-body {
		margin: 0 16px 10px 32px;
		padding: 0;
	}

	@media screen and (min-width: 1400px) {
		.ant-card-body {
			margin: 24px 16px 10px 46px;
			padding: 0;
		}
	}
`;
const StyledCardOptionsWrapper = styled.div`
	display: float;
	align-items: center;
	justify-content: space-between;
`;
const StyledCardHeaderWrapper = styled(Row)`
	.card-title {
		width: 75%;
		white-space: nowrap;
		overflow: hidden !important;
		text-overflow: ellipsis;
	}
`;
const OpportunityListingCard = ({
	data,
	setLocalOpportunityData,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	executeGetAllOpportunityData,
	opportunityStageData,
	setOpportunityStageData,
	setShowUpdateStageModal,
	loading,
	setLoading
}) => {
	const history = useHistory();
	const { path } = useRouteMatch();
	const viewRecord = (rowIndex) => {
		const opportunityIds = data.map((item) => item.opportunityId);
		const toObject = {
			pathname: `${path}/OpportunityView`,
			state: { opportunityIds: opportunityIds, rowIndex: rowIndex }
		};
		history.push(toObject);
	};
	const RenderMoreOptions = ({ record }) => {
		const options = [
			'Modify',
			'Closed Won',
			'Closed Missed',
			'Take Note',
			'Create Task',
			'Create Interaction',
			'Create New Opportunity'
		];
		const onMoreMenuSelect = (task) => {
			switch (task) {
				case 'Closed Won':
					setOpportunityStageData({
						...opportunityStageData,
						recordId: record.opportunityId,
						status: 'CLOSE',
						stage: 'WON'
					});
					setShowUpdateStageModal(true);
					break;
				case 'Closed Missed':
					setOpportunityStageData({
						...opportunityStageData,
						recordId: record.opportunityId,
						status: 'CLOSE',
						stage: 'LOSS'
					});
					setShowUpdateStageModal(true);
					break;
				case 'Create New Opportunity':
					history.push(`${path}/OpportunityCreate`);
					break;
				default:
					break;
			}
		};
		const content = () => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
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
			<div
				className='col-more'
				// onClick={(e) => {
				//   e.stopPropagation();
				// }}
			>
				<Popover
					placement='bottomLeft'
					content={content}
					overlayClassName='opportunity-listing-actions-popover'
				>
					<ScFontAwesomeIcon
						icon={faEllipsisHAlt}
						fontSize={window.innerWidth < 1400 ? '24px' : '32px'}
					/>
				</Popover>
			</div>
		);
	};
	const RenderFavourite = ({ record }) => (
		<FavIcon
			onClick={(e) => {
				e.stopPropagation();
				addFavouriteOpportunityApi(record.opportunityId, CONSTANTS.progNames.OPPORTUNITYADD).then(
					(res) => {
						if (res.data) {
							executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
						}
					}
				);
			}}
		>
			{record.isFavourite ? (
				<span className='favourite-icon active'>&#9733;</span>
			) : (
				// <FontAwesomeIcon icon={faStar} size="2x" className="favourite-icon" />
				<span className='favourite-icon inactive'>&#9734;</span>
			)}
		</FavIcon>
	);
	const RenderClientProspectProfile = ({ record }) => (
		<Row
			id='profile-duedate-row'
			align='middle'
			justify='space-between'
			className='client-prospect-profile'
		>
			<Col span={window.innerWidth < 1400 ? 7 : 6}>
				<AvatarLogo
					imgsrc={record.profileImage}
					profileName={record.profileInitial}
					avatarSize={window.innerWidth < 1400 ? 46 : 64}
				/>
			</Col>
			<Col span={window.innerWidth < 1400 ? 17 : 18}>
				<div className='name'>{record.clientProspectName}</div>
				<div className='profile-tag'>
					{record.tagName.charAt(0).toUpperCase() + record.tagName.substring(1).toLowerCase()}
				</div>
			</Col>
		</Row>
	);
	const RenderRecords = ({ record, index }) => {
		return (
			<div className='record-card'>
				<StyledCardHeaderWrapper align='middle' justify='space-between'></StyledCardHeaderWrapper>
				<StyledAmountDiv>{currencyFormatter(record.amount, 'en-US')}</StyledAmountDiv>
				<Row align='middle' justify='space-between' className='stage-status'>
					<span>{record.stage}</span>
					<ScTag>{record.isOpen ? 'Open' : 'Closed'}</ScTag>
				</Row>
				<Row align='middle' justify='space-between' className='profile-duedate-section'>
					<Col span={window.innerWidth < 1400 ? 17 : 18}>
						<RenderClientProspectProfile record={record} />
					</Col>
					<Col span={window.innerWidth < 1400 ? 7 : 6}>
						<div className='due-date'>
							<span className='date'>{moment(record.dueDate).format('DD MMM YYYY')}</span>
							<div className='text'>Due Date</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	};
	const RenderCardHeader = ({ record }) => (
		<StyledCardHeaderWrapper align='middle'>
			<Col span={2}>
				{/* <Checkbox
          value={record.opportunityId}
          checked={selectedRowKeys.includes(record.opportunityId)}
          onClick={(e) => {
            e.stopPropagation();
            if (e.target.checked) {
              setSelectedRowKeys([...selectedRowKeys, record.opportunityId]);
              setSelectedRows([...selectedRows, record]);
            } else {

              setSelectedRowKeys([
                ...selectedRowKeys.filter((key) => {
                  return key !== record.opportunityId;
                }),
              ]);
              setSelectedRows([
                ...selectedRows.filter((row) => {
                  return row.opportunityId !== record.opportunityId;
                }),
              ]);
            }
          }}
        /> */}
				<Radio value={record.opportunityId} />
			</Col>
			<Col span={17} className='card-title'>
				<StyledOpportunityName>{record.opportunityName}</StyledOpportunityName>
			</Col>
			<Col span={5}>
				<StyledCardOptionsWrapper>
					<RenderFavourite record={record} />
					<RenderMoreOptions record={record} />
				</StyledCardOptionsWrapper>
			</Col>
		</StyledCardHeaderWrapper>
	);
	return data ? (
		<Row align='middle' justify='space-between'>
			{/* <Checkbox.Group> */}
			{data.map((record, index) => (
				<Col span={8} style={{ padding: '10px 10px 10px 0' }}>
					<StyledCard
						key={record.opportunityId}
						loading={loading}
						title={!loading && <RenderCardHeader record={record} />}
						className='opp-listing-card-container'
						style={
							selectedRowKeys.includes(record.opportunityId)
								? {
										background: 'rgb(233, 237, 255)',
										boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
								  }
								: {}
						}
						onClick={() => {
							viewRecord(index);
						}}
					>
						<RenderRecords record={record} index={index} />
					</StyledCard>
				</Col>
			))}
			{/* </Checkbox.Group> */}
		</Row>
	) : null;
};
const mapDispatchToProps = {
	executeGetAllOpportunityData
};

export default connect(null, mapDispatchToProps)(OpportunityListingCard);

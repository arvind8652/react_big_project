import { React, useEffect, useState } from 'react';
import { Button, Card, Popover, Row, Col, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisHAlt, faStar as faStarOutlined } from '@fortawesome/pro-light-svg-icons';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import axios from 'axios';
import './EngagementOverviewScreen.scss';
import { getOpenIntegrationApi } from '../../api/EngagementOverviewApi';
import RecentModal from './recentModal';
import { useHistory } from 'react-router-dom';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { theme } from '../../theme';

const OpenInteractionView = ({ authorizeCode }) => {
	const [loading, setLoading] = useState();
	const [openInteraction, setOpenInteraction] = useState();
	const [interactionModalShow, setInteractionModalShow] = useState(false);
	const history = useHistory();
	useEffect(() => {
		axios
			.all([getOpenIntegrationApi()])
			.then(
				axios.spread((...responses) => {
					setOpenInteraction(responses[0].data);
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	const RenderMiniRecentTableSection = ({ data }) => {
		const RenderClientProspectProfile = ({ record }) => (
			<div className='profile'>
				<AvatarLogo
					imgsrc={record.profileImage}
					profileName={record.profileInitial}
					avatarSize={AvatarSize.extrasmall}
				/>
			</div>
		);
		const RenderRow = ({ record, index }) => {
			return (
				<div className={`record ${index === 0 ? 'first' : index === 2 ? 'last' : ''}`}>
					<Col>
						<div className='header'>
							<span style={theme.secondaryHeader}> {record.activityDetail.subject}</span>
							<div className='more'>
								<RenderMoreOptions record={record} />
							</div>
						</div>
						<span style={{ fontWeight: 'bold' }}>{record.activityDetail.activityPurpose}</span>
						<Row justify='space-between'>
							<span> {record.activityDetail.interactionType}</span>
							<div
								style={{
									width: '92px',
									textAlign: 'center',
									background: '#f0f2fb',
									// fontSize: '22px',
									lineHeight: '24px',
									color: '#696a91',
									borderRadius: '16px'
								}}
							>
								{record.activityDetail.activityStatus}
							</div>
						</Row>
						<Row justify='space-between'>
							<Row>
								<RenderClientProspectProfile record={record} />
								<Col style={{ marginLeft: '10px', marginTop: '10px' }}>
									<div>
										<span style={{ fontWeight: 'bold' }}>{record.name}</span>
									</div>
									<div>
										<span> {record.activityDetail.refType}</span>
									</div>
								</Col>
							</Row>
							<Col style={{ marginTop: '10px' }}>
								<div>
									<span style={{ fontWeight: 'bold' }}>
										{moment(record.activityDetail.activityDate).format('DD MMM YYYY')}
									</span>
								</div>
								<div>
									<span>{'Date'}</span>
								</div>
							</Col>
						</Row>
					</Col>
				</div>
			);
		};
		return (
			<div className='mini-table'>
				{data.map((record, index) => {
					return index < 3 ? <RenderRow record={record} index={index} /> : null;
				})}
			</div>
		);
	};
	function handleCreateInteractionClick() {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	}

	function handleCreateOpportunityClick() {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate'
		};

		history.push(toObject);
	}

	// const handleUpdateProspectClick = (prospectId) => {
	// 	const toObject = {
	// 		pathname: '/dashboard/MyProspect/ProspectCreate',
	// 		state: { screen: 'listing', data: prospectId }
	// 	};
	// 	history.push(toObject);
	// };

	const handleEditInteractionClick = (activityID) => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	};
	const RenderMoreOptions = ({ record }) => {
		const options = [
			'Edit',
			'Close',
			// 'Take Note',
			'Create New Interaction',
			'Create Task',
			'Create Opportunity'
			// 'Update Prospect/Client'
		].filter((type) => {
			switch (type) {
				case 'Edit':
					return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify);
				case 'Close':
					return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete);
				default:
					return true;
			}
		});

		const content = () => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								option.toLowerCase() == 'edit' && handleEditInteractionClick();
								option.toLowerCase() === 'create new interaction' && handleCreateInteractionClick();
								option.toLowerCase() === 'create opportunity' && handleCreateOpportunityClick();
								// option.toLowerCase() === 'update prospect/client' && handleUpdateProspectClick();
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
					overlayClassName='opportunity-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};

	function prospectColumns(data) {
		return [
			{
				title: 'Subject',
				dataIndex: 'activityDetail',
				align: 'center',
				render: (data) => (
					<div className={'record'}>
						<Col>
							<div className='header'>
								<span> {data.subject}</span>
							</div>
						</Col>
					</div>
				)
			},
			{
				title: 'Type',
				dataIndex: 'activityDetail',
				align: 'center',
				render: (data) => (
					<Row justify='center'>
						<Space direction='vertical' size={1}>
							{data.interactionType}
						</Space>
					</Row>
				)
			},
			{
				title: 'Date',
				dataIndex: 'activityDetail',
				align: 'center',
				render: (data) => {
					return <Row justify='center'>{data.activityDate}</Row>;
				}
			},
			{
				title: 'Purpose',
				dataIndex: 'activityDetail',
				align: 'center',
				render: (data) => {
					return <Row justify='center'>{data.activityPurpose}</Row>;
				}
			},
			{
				title: 'Client/Prospect Name',
				dataIndex: data,
				render: (data) => {
					const { value, setter } = data;
					return (
						<Row justify='center'>
							<Button type='text' shape='circle' onClick={() => setter(!value)}>
								{value ? (
									<FontAwesomeIcon icon={faStar} color='#354081' />
								) : (
									<FontAwesomeIcon icon={faStarOutlined} color='#354081' />
								)}
							</Button>
						</Row>
					);
				}
			}
		];
	}
	return (
		<Card loading={loading} className='prospects-card styled-border' title='Open Interactions'>
			{openInteraction && <RenderMiniRecentTableSection data={openInteraction} />}
			<div className='view-all-btn '>
				<Button onClick={() => setInteractionModalShow(true)} className='view-all-btn-clr'>
					View All
				</Button>
				<RecentModal
					data={openInteraction}
					showModal={interactionModalShow}
					setShowModal={(val) => setInteractionModalShow(val)}
					columns={prospectColumns(openInteraction)}
					title='Open Interactions'
					authorizeCode={authorizeCode}
				/>
			</div>
		</Card>
	);
};

export default OpenInteractionView;

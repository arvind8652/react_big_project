import { React, useEffect, useState } from 'react';
import { Button, Card, Popover, Row, Col, Space, Dropdown, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsisHAlt,
	faSnowflake,
	faStar as faStarOutlined
} from '@fortawesome/pro-light-svg-icons';
import { faFire, faStar } from '@fortawesome/pro-solid-svg-icons';
import { faClipboardCheck } from '@fortawesome/pro-regular-svg-icons';
import axios from 'axios';
import './EngagementOverviewScreen.scss';
import { getOpenTaskApi } from '../../api/EngagementOverviewApi';
import RecentModal from './recentModal';
import MenuOverlay from './overlayMenu/index';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import { theme } from '../../theme';

const { Text } = Typography;
const menuItems = ['Modify', 'Delete'];

const OpenTaskView = ({ authorizeCode }) => {
	const [loading, setLoading] = useState();
	const [openTask, setOpenTask] = useState();
	const [taskModalShow, setTaskModalShow] = useState(false);
	const history = useHistory();
	useEffect(() => {
		axios
			.all([getOpenTaskApi()])
			.then(
				axios.spread((...responses) => {
					setOpenTask(responses[0].data);
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
				<div
					// className="prospectInitialsCircleImg"
					style={{ width: '56px', height: '56px', fontSize: '1vw' }}
				>
					<AvatarLogo
						imgsrc={record.profileImage}
						profileName={record.profileInitial}
						avatarSize={AvatarSize.extrasmall}
					/>
				</div>
			</div>
		);

		const RenderRow = ({ record, index }) => {
			console.log(record.activityDetail);
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
									fontSize: 'px',
									lineHeight: '24px',
									color: '#696a91'
								}}
								className='border-apply'
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
									<span> {'Date'}</span>
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

		const handleUpdateProspectClick = (prospectId) => {
			const toObject = {
				pathname: '/dashboard/MyProspect/ProspectCreate',
				state: { screen: 'listing', data: prospectId }
			};
			history.push(toObject);
		};

		const handleEditInteractionClick = (activityID) => {
			const toObject = {
				pathname: '/dashboard/MyInteractions/InteractionCreate'
			};

			history.push(toObject);
		};

		const content = () => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								option.toLowerCase() === 'edit' && handleEditInteractionClick();
								option.toLowerCase() === 'create new interaction' && handleCreateInteractionClick();
								option.toLowerCase() === 'create opportunity' && handleCreateOpportunityClick();
								option.toLowerCase() === 'update prospect/client' && handleUpdateProspectClick();
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
				title: 'Name',
				// dataIndex: data.firstName,
				render: (data) => (
					<Row justify='center'>
						<Space>
							<AvatarLogo
								imgsrc={data.profileImage}
								profileName={data.profileInitial}
								avatarSize={AvatarSize.large}
							/>

							<Space direction='vertical' size={2}>
								<Text
									style={{
										fontWeight: '600'
									}}
								>
									{data.firstName}
								</Text>
								<Space>
									<Text
										style={{
											backgroundColor: '#F0F2FB',
											color: '#354081',
											padding: '2px 10px',
											borderRadius: '20px',
											fontSize: '12px',
											marginRight: '2px'
										}}
									>
										{data.category}
									</Text>
									{data.interestlevel === 'Hot' ? (
										<FontAwesomeIcon
											icon={faFire}
											size='1x'
											color='orange'
											className='socialList'
										/>
									) : (
										<FontAwesomeIcon icon={faSnowflake} className='socialList' color='#56B8BE' />
									)}
									{data.qualificationStatus === 'Qualified' ? (
										<FontAwesomeIcon
											icon={faClipboardCheck}
											className='socialList'
											color='#696A91'
										/>
									) : (
										<FontAwesomeIcon icon={faClipboardCheck} className='socialList' color='red' />
									)}
								</Space>
							</Space>
						</Space>
					</Row>
				)
			},
			{
				title: 'Contact',
				// dataIndex: data.mobile,
				render: (data) => (
					<Row justify='center'>
						<Space direction='vertical' size={2}>
							{data.mobile}
							{data.email}
						</Space>
					</Row>
				)
			},
			{
				title: 'Source',
				// dataIndex: data.source,
				render: (data) => {
					return <Row justify='center'>{data.source}</Row>;
				}
			},
			{
				title: 'Type',
				// dataIndex: data.sourceType,
				render: (data) => {
					return <Row justify='center'>{data.sourceType}</Row>;
				}
			},
			{
				title: 'Relationship Manager',
				// dataIndex: data.relationshipManager,
				render: (data) => {
					return <Row justify='center'>{data.relationshipManager}</Row>;
				}
			},
			{
				title: '',
				// dataIndex: data,
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
			},
			{
				title: '',
				render: () => (
					<Row justify='center'>
						<Dropdown
							className='menu-dropdown'
							overlay={<MenuOverlay menu={menuItems} />}
							placement='bottomRight'
						>
							<Button type='text'>
								<FontAwesomeIcon icon={faEllipsisHAlt} size='lg' color='#354081' />
							</Button>
						</Dropdown>
					</Row>
				)
			}
		];
	}
	return (
		<Card loading={loading} className='prospects-card styled-border' title='Open Tasks'>
			{openTask && <RenderMiniRecentTableSection data={openTask} />}
			<div className='view-all-btn'>
				<Button onClick={() => setTaskModalShow(true)} className='view-all-btn-clr'>
					View All
				</Button>
				<RecentModal
					data={openTask}
					showModal={taskModalShow}
					setShowModal={(val) => setTaskModalShow(val)}
					columns={prospectColumns(openTask)}
					title='Open Tasks'
					authorizeCode={authorizeCode}
				/>
			</div>
		</Card>
	);
};

export default OpenTaskView;

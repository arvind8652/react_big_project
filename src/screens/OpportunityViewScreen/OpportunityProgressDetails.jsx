import { useEffect, useState, useRef } from 'react';
import { getDateFormat } from '../../utils/utils';
import './OpportunityViewScreen.scss';
import 'antd/dist/antd.css';
import { Card, Row, Col, Typography } from 'antd';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { faChevronRight, faCircle as NormalFaCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faCircle } from '@fortawesome/pro-duotone-svg-icons';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/pro-light-svg-icons';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';

const { Text, Link } = Typography;

const OpportunityProgressDetails = (props) => {
	const opportunityTimelineDetails = props.data;
	const [activeIndex, setActiveIndex] = useState(0);
	const ref = useRef(null);

	const activeClosedStageStyle = {
		color: '#222747',
		fontWeight: '600'
	};
	const pendingStageStyle = {
		color: '#696A91',
		fontWeight: '600'
	};

	useEffect(() => {
		props.data &&
			props.data.forEach((item, index) => {
				item.status === 'Active' && setActiveIndex(index);
			});
	}, [props.data]);

	useEffect(() => {}, [activeIndex]);

	function handleScrollClick(scrollDirection) {
		if (scrollDirection === 'left') {
			ref.current.scrollLeft -= 200;
		} else {
			ref.current.scrollLeft += 200;
		}
	}

	if (!opportunityTimelineDetails) {
		return null;
	}

	return (
		<Card bordered={false} className='opportunityViewCardDetail'>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<FontAwesomeIcon
					size='2x'
					color='#5D6DD1'
					icon={faChevronCircleLeft}
					onClick={() => handleScrollClick('left')}
				/>
				<Row className='row-scroll' style={{ margin: '0px 10px' }} ref={ref}>
					{opportunityTimelineDetails.map((item, index) => {
						return (
							<Col
								className='stage-column'
								key={index}
								style={{
									borderBottom:
										activeIndex === index ? '2px solid #5D6DD1' : '0px solid rgba(0, 0, 0, 0.25)'
								}}
							>
								<Row
									justify='start'
									style={{
										alignItems: 'center'
									}}
								>
									<Col
										style={{
											alignSelf: 'flex-start',
											padding: '12px 0 0'
										}}
									>
										{item.status === 'Closed' ? (
											<FontAwesomeIcon
												icon={faCheckCircle}
												color='#5D6DD1'
												className='stage-icon'
											/>
										) : item.status === 'Active' ? (
											<FontAwesomeIcon icon={faCircle} color='#5D6DD1' className='stage-icon' />
										) : (
											<FontAwesomeIcon
												icon={NormalFaCircle}
												twoToneColor='#5D6DD1'
												className='stage-icon'
											/>
										)}
									</Col>
									<Link
										className='stage-link'
										onClick={() => {
											setActiveIndex(index);
										}}
									>
										<Col className='stage-flex'>
											<Text
												strong
												className='horizontalTimelineDescriptionText'
												style={
													item.status === 'Active' || item.status === 'Closed'
														? activeClosedStageStyle
														: pendingStageStyle
												}
											>
												<span>{item.stage}</span>
											</Text>
											{index === 0 || opportunityTimelineDetails.length === index + 1 ? (
												<span style={{ color: '#696a91' }} className='horizontalTimelineDetailText'>
													{item.craetiondate && moment(item.craetiondate).format(getDateFormat())}
												</span>
											) : (
												<span className='horizontalTimelineDetailText'>
													{Math.floor(item.age)} days
												</span>
											)}
										</Col>
									</Link>
									{index !== opportunityTimelineDetails.length - 1 && (
										<FontAwesomeIcon
											icon={faChevronRight}
											className='stage-icon'
											style={{ color: '#696A91', marginRight: '5px' }}
										/>
									)}
								</Row>
							</Col>
						);
					})}
				</Row>
				<FontAwesomeIcon
					size='2x'
					color='#5D6DD1'
					icon={faChevronCircleRight}
					onClick={() => handleScrollClick('right')}
				/>
			</div>
			<Row style={{ padding: '15px 0px 0px' }}>
				<Col span={4} className='stage-details-flex'>
					<Text
						style={{
							color: 'black'
						}}
						strong
						className='horizontalTimelineDescriptionText'
					>
						Review
					</Text>
					{opportunityTimelineDetails[activeIndex].craetiondate && (
						<Text className='horizontalTimelineDetailText'>
							{'Since ' +
								moment(opportunityTimelineDetails[activeIndex].craetiondate.slice(0, 10)).format(
									getDateFormat()
								)}
						</Text>
					)}
				</Col>
				<Col span={4} className='stage-details-flex'>
					<Text
						style={{
							color: 'black'
						}}
						strong
						className='horizontalTimelineDetailText'
					>
						{opportunityTimelineDetails[activeIndex].age
							? `${Math.floor(opportunityTimelineDetails[activeIndex].age)} days`
							: '-'}
					</Text>
					<Text className='horizontalTimelineDescriptionText'>Age</Text>
				</Col>
				<Col span={4} className='stage-details-flex'>
					<Text
						style={{
							color: 'black'
						}}
						strong
						className='horizontalTimelineDetailText'
					>
						{opportunityTimelineDetails[activeIndex].amount ? (
							<>
								{/* {"$"} <RupeeOrNonRupee amount={opportunityTimelineDetails[activeIndex].amount} /> */}
								{opportunityTimelineDetails[activeIndex].preferredCurrency}{' '}
								<RupeeOrNonRupee amount={opportunityTimelineDetails[activeIndex].amount} />
							</>
						) : (
							'-'
						)}
					</Text>
					<Text className='horizontalTimelineDescriptionText'>Target Amount</Text>
				</Col>
				<Col span={4} className='stage-details-flex'>
					<Text
						style={{
							color: 'black'
						}}
						className='horizontalTimelineDetailText'
						strong
					>
						{opportunityTimelineDetails[activeIndex].dueDate &&
							moment(opportunityTimelineDetails[activeIndex].dueDate).format(getDateFormat())}
					</Text>
					<Text className='horizontalTimelineDescriptionText'>Due Date</Text>
				</Col>
				<Col span={4} offset={4} className='stage-details-flex'>
					<Text
						style={{
							color: 'black'
						}}
						strong
						className='horizontalTimelineDetailText'
					>
						{/* Self */}
						{opportunityTimelineDetails[activeIndex].relationshipManager}
					</Text>
					<Text className='horizontalTimelineDescriptionText'>Updated By</Text>
				</Col>
			</Row>
		</Card>
	);
};

export default OpportunityProgressDetails;

import { React, useEffect, useState, useRef } from 'react';
import { getDateFormat } from '../../utils/utils';
//import "./OpportunityViewScreen.scss";
import 'antd/dist/antd.css';
import { Card, Row, Col, Typography } from 'antd';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { faChevronRight, faCircle as NormalFaCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faCircle } from '@fortawesome/pro-duotone-svg-icons';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/pro-light-svg-icons';
import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';

const { Text, Link } = Typography;

const data = [
	{
		review: 'Since 02 Jul 2021',
		userAge: '28',
		dueDate: '10 June 2020',
		targetAmount: '$50000',
		updatedBy: 'Self',

		status: 'Closed',
		stage: null,
		craetiondate: null,
		value: 'Customer Creation',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	},
	{
		status: 'Closed',
		stage: null,
		craetiondate: null,
		value: 'Customer Creation',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	},
	{
		status: 'Closed',
		stage: null,
		craetiondate: null,
		value: 'Customer Creation',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	},
	{
		status: 'Active',
		stage: null,
		craetiondate: null,
		value: 'Customer Creation',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	}
];

export const HorizontalTimeLine = (props) => {
	const styleSet = {
		validationBlock: {
			color: palette.secondary.light
		},
		gCard: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'start'
		},
		sCard: {
			//color:"black",

			color: 'black'
		},
		icon: {
			size: '2x',
			color: '#5D6DD1'
		},
		contactBlock: {
			color: palette.secondary.light,
			height: 0.5
			//border-width:0,
			//color:gray,
			//background-color:gray,
		},
		container: {
			flex: 1,
			width: '100%',
			marginTop: '10px',
			marginBottom: '15px'
		},
		subCardHeader: {
			fontSize: fontSet.body.xlarge,
			color: palette.text.dark
		}
	};
	const { horizontalTimeline } = props;
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
	if (!horizontalTimeline) {
		return (
			<Col className='opporunityDescriptionText' type='flex' align='middle' span={24}>
				No Records Found
			</Col>
		);
	}

	return (
		<>
			<Card style={{ width: '100%' }}>
				<div style={styleSet.gCard}>
					{/* {horizontalTimeline.length > 3 && (
						<FontAwesomeIcon
							style={styleSet.icon}
							size='2x'
							icon={faChevronCircleLeft}
							// onClick={() => handleScrollClick("left")}
						/>
					)} */}
					<Row className='row-scroll' style={{ margin: '0px 10px', display: 'flex' }} ref={ref}>
						{horizontalTimeline &&
							horizontalTimeline.map((item, index) => {
								return (
									<Col sm={8} key={index}>
										<Row>
											<Col
												style={{
													alignSelf: 'flex-start',
													padding: '12px 0 0',
													marginLeft: '30px',
													marginRight: '30px',
													width: '100%',
													display: 'flex'
												}}
											>
												<div>
													{activeIndex === index ? (
														<div style={{ alignSelf: 'center' }}>
															<FontAwesomeIcon
																icon={faCircle}
																color='#5D6DD1'
																className='stage-icon'
															/>
														</div>
													) : (
														<div style={{ alignSelf: 'center' }}>
															{item.status === 'C' ? (
																<FontAwesomeIcon
																	size='2x'
																	icon={faCheckCircle}
																	color='#5D6DD1'
																	className='stage-icon'
																/>
															) : (
																<FontAwesomeIcon
																	icon={NormalFaCircle}
																	twoToneColor='#5D6DD1'
																	className='stage-icon'
																/>
															)}
														</div>
													)}
												</div>
												<div>
													<Link
														className='stage-link'
														onClick={() => {
															setActiveIndex(index);
														}}
													>
														<Col
															className='stage-flex'
															style={{
																borderBottom:
																	activeIndex === index
																		? '2px solid #5D6DD1'
																		: '0px solid rgba(0, 0, 0, 0.25)'
															}}
														>
															<Text
																strong
																className='horizontalTimelineDescriptionText'
																style={
																	item.status === 'Active' || item.status === 'Closed'
																		? activeClosedStageStyle
																		: pendingStageStyle
																}
															>
																<span>{item.stageName}</span>
															</Text>
														</Col>
													</Link>
												</div>
												<div>
													{index !== horizontalTimeline.length - 1 && (
														<FontAwesomeIcon
															icon={faChevronRight}
															className='stage-icon'
															style={{
																color: '#696A91',
																marginLeft: '29px',
																marginRight: '29px'
															}}
														/>
													)}
												</div>
											</Col>
										</Row>
									</Col>
								);
							})}
					</Row>
					{/* {horizontalTimeline.length > 3 && (
						<div style={{ position: 'absolute', right: 10 }}>
							<FontAwesomeIcon
								style={styleSet.icon}
								size='2x'
								icon={faChevronCircleRight}
								// onClick={() => handleScrollClick("right")}
							/>
						</div>
					)} */}
				</div>
				<hr />
				{horizontalTimeline.length > 0 ? (
					<div>
						<Row>
							<Col span={6}>
								<TypoGraphy label={'Status'}>
									{horizontalTimeline[activeIndex] &&
									horizontalTimeline[activeIndex].status &&
									horizontalTimeline[activeIndex].status == 'C'
										? 'Complete'
										: horizontalTimeline[activeIndex].status == 'P'
										? 'Pending'
										: horizontalTimeline[activeIndex].status}
								</TypoGraphy>
							</Col>
							<Col span={6}>
								<TypoGraphy label={'Last update'}>
									{horizontalTimeline[activeIndex] &&
									horizontalTimeline[activeIndex].lastUpdated &&
									horizontalTimeline[activeIndex].lastUpdated !== null
										? moment(horizontalTimeline[activeIndex].lastUpdated).format(getDateFormat())
										: '-'}
								</TypoGraphy>
							</Col>

							<Col span={6}>
								<TypoGraphy label={'Entity'}>
									{' '}
									{/* for user group*/}
									{horizontalTimeline[activeIndex] &&
									horizontalTimeline[activeIndex].roleName &&
									horizontalTimeline[activeIndex].roleName == null
										? '-'
										: horizontalTimeline[activeIndex].roleName}
								</TypoGraphy>
							</Col>

							<Col span={6}>
								<TypoGraphy label={'Performed by'}>
									{' '}
									{/* for user name*/}
									{horizontalTimeline[activeIndex] && horizontalTimeline[activeIndex].userName
										? horizontalTimeline[activeIndex].userName
										: '-'}
								</TypoGraphy>
							</Col>
						</Row>
					</div>
				) : null}
			</Card>
		</>
	);
};

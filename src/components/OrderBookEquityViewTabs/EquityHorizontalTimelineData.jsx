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
const basicData = [{}];
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
		value: 'Order Placement',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	},
	{
		status: 'Closed',
		stage: null,
		craetiondate: null,
		value: 'Accept Disclaimer',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	},
	{
		status: 'Closed',
		stage: null,
		craetiondate: null,
		value: 'Order Authorization',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	},
	{
		status: 'Closed',
		stage: null,
		craetiondate: null,
		value: 'Order Processing',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	},
	{
		status: 'Active',
		stage: null,
		craetiondate: null,
		value: 'Order Confirmation',
		valueMessage: 'Hi',
		//inputDateTime: "2021-07-02T11:57:02.833",
		age: null
	}
];

const EquityHorizontalTimelineData = ({ equityHorizontalTimelineData = data }) => {
	const styleSet = {
		gCard: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between'
		},
		icon: {
			size: '2x',
			color: '#5D6DD1'
		},
		sCard: {
			//color:"black",

			color: palette.text.card
		}
	};
	const opportunityTimelineDetails = equityHorizontalTimelineData;
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
	if (!opportunityTimelineDetails) {
		return (
			<Col className='opporunityDescriptionText' type='flex' align='middle' span={24}>
				No Records Found
			</Col>
		);
	}

	return (
		<>
			<div style={styleSet.gCard}>
				{/* <FontAwesomeIcon
                    style={styleSet.icon}
                    size="2x"
                    icon={faChevronCircleLeft}
                    onClick={() => ""("left")}
                /> */}
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
									// style={{
									//     alignSelf: "flex-start",
									//     padding: "12px 0 0",
									//     marginLeft: "30px",
									//     marginRight: "30px",
									//     width: "100%"
									// }}
									>
										{item.status === 'Closed' ? (
											<FontAwesomeIcon
												size='2x'
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
									<span
										className='detailText'
										style={{
											alignSelf: 'flex-start',
											marginLeft: '15px',
											marginRight: '15px',
											width: '25%'
										}}
									>
										{item.value}
									</span>
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
												<span className='horizontalTimelineDetailText'>{Math.floor(item.age)}</span>
											)}
										</Col>
									</Link>
									{index !== opportunityTimelineDetails.length - 1 && (
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
								</Row>
							</Col>
						);
					})}
				</Row>

				{/* <FontAwesomeIcon
                    style={styleSet.icon}
                    size="2x"
                    icon={faChevronCircleRight}
                    onClick={() => ("right")}
                /> */}
			</div>
		</>
	);
};

export default EquityHorizontalTimelineData;

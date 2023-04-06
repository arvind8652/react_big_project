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
import HorizontalTimelineData from './HorizontalTimelineData';

const { Text, Link } = Typography;
const defaultValue = {
	review: 'Since 02 Jul 2021',
	age: '28',
	dueDate: '10 June 2020',
	targetAmount: '$50000',
	updatedBy: 'Self'
};

const HorizontalTimeline = ({ horizontalTimeline = defaultValue }) => {
	const styleSet = {
		validationBlock: {
			color: palette.secondary.light
		},
		gCard: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between'
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

	return (
		<>
			<GenericCard style={{ width: '100%' }}>
				<div style={styleSet.gCard}>
					<HorizontalTimelineData horizontalTimelineData={horizontalTimeline} />
				</div>

				<Row style={{ padding: '15px 0px 0px' }}>
					<Col span={4} className='stage-details-flex'>
						<Text style={styleSet.sCard} className='horizontalTimelineDescriptionText' strong>
							Review
						</Text>
						{horizontalTimeline.review}
						{/* {opportunityTimelineDetails[activeIndex].craetiondate && (
                        <Text className="horizontalTimelineDetailText">
                            {"Since " +
                                moment(
                                    opportunityTimelineDetails[activeIndex].craetiondate.slice(
                                        0,
                                        10
                                    )
                                ).format(getDateFormat())}
                        </Text>
                    )} */}
					</Col>

					<Col span={4} className='stage-details-flex'>
						<Text style={styleSet.sCard} className='horizontalTimelineDetailText' strong>
							{horizontalTimeline.age}
							{/* {opportunityTimelineDetails[activeIndex].age
                            ? `${Math.floor(
                                opportunityTimelineDetails[activeIndex].age
                            )} days`
                            : "-"} */}
						</Text>
						<Text className='horizontalTimelineDescriptionText'>Age</Text>
					</Col>
					<Col span={4} className='stage-details-flex'>
						<Text style={styleSet.sCard} className='horizontalTimelineDetailText' strong>
							{horizontalTimeline.targetAmount}
							{/* {opportunityTimelineDetails[activeIndex].amount
                            ? `$ ${opportunityTimelineDetails[activeIndex].amount}`
                            : "-"} */}
						</Text>
						<Text className='horizontalTimelineDescriptionText'>Target Amount</Text>
					</Col>
					<Col span={4} className='stage-details-flex'>
						<Text style={styleSet.sCard} className='horizontalTimelineDetailText' strong>
							{horizontalTimeline.dueDate}
							{/* {opportunityTimelineDetails[activeIndex].dueDate &&
                            moment(opportunityTimelineDetails[activeIndex].dueDate).format(
                                getDateFormat()
                            )} */}
						</Text>
						<Text className='horizontalTimelineDescriptionText'>Due Date</Text>
					</Col>
					<Col span={4} offset={4} className='stage-details-flex'>
						<Text style={styleSet.sCard} className='horizontalTimelineDetailText' strong>
							{horizontalTimeline.updatedBy}
						</Text>
						<Text className='horizontalTimelineDescriptionText'>Updated By</Text>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};

export default HorizontalTimeline;

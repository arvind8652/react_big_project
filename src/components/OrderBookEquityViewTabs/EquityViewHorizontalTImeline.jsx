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
//import HorizontalTimelineData from "../HorizontalTimeline/HorizontalTimelineData";
import EquityHorizontalTimelineData from './EquityHorizontalTimelineData';

const { Text, Link } = Typography;
const defaultValue = {
	stage: 'Order Placed',
	mandateDate: '12 Jan 2020',
	mandatePlacedBy: 'Johnathan Doe'
};

const EquityViewHorizontalTimeline = ({ EquityViewHorizontalTimeline = defaultValue }) => {
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

			color: palette.text.card
		},
		icon: {
			size: '2x',
			color: palette.primary.main
		},
		contactBlock: {
			color: palette.secondary.light
			//height: 0.5,
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
				<Row style={styleSet.gCard}>
					<EquityHorizontalTimelineData />
				</Row>

				<Row style={{ padding: '15px 0px 0px', marginTop: '15px' }}>
					<Col span={5} className='stage-details-flex'>
						<Text style={styleSet.sCard} className='horizontalTimelineDetailText' strong>
							{EquityViewHorizontalTimeline.stage}
						</Text>
						<Text className='horizontalTimelineDescriptionText' style={styleSet.contactBlock}>
							Stage
						</Text>
					</Col>
					<Col span={5} className='stage-details-flex'>
						<Text style={styleSet.sCard} className='horizontalTimelineDetailText' strong>
							{EquityViewHorizontalTimeline.mandateDate}
							{/* {opportunityTimelineDetails[activeIndex].amount
                            ? `$ ${opportunityTimelineDetails[activeIndex].amount}`
                            : "-"} */}
						</Text>
						<Text className='horizontalTimelineDescriptionText' style={styleSet.contactBlock}>
							Mandate Date
						</Text>
					</Col>
					<Col span={4} className='stage-details-flex'>
						<Text style={styleSet.sCard} className='horizontalTimelineDetailText' strong>
							{EquityViewHorizontalTimeline.mandatePlacedBy}
						</Text>
						<Text className='horizontalTimelineDescriptionText' style={styleSet.contactBlock}>
							Mandate Placed By
						</Text>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};

export default EquityViewHorizontalTimeline;

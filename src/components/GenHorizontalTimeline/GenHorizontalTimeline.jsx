import React, { useState } from 'react';
import { Steps, Row, Col } from 'antd';
import './GenHorizontalTimeline.scss';
import moment from 'moment';
import TypoGraphy from '../../components/TypoGraphy/TypoGraphy';
import { styleSet } from '../../screens/PrimaryMarket/Style';
const { Step } = Steps;

const GenHorizontalTimeline = ({ timelineData }) => {
	const [current, setCurrent] = useState(0);
	const [moreDetails, setMoreDetails] = useState(timelineData && timelineData[0]);
	const onChange = (current) => {
		setMoreDetails(timelineData[current]);
		setCurrent({ current });
	};

	const styleSet = {
		container: {
			padding: '10px'
		}
	};

	return (
		<div className='steps-container'>
			<Steps
				type='navigation'
				size='small'
				current={current}
				onChange={onChange}
				className='site-navigation-steps'
			>
				{timelineData?.map((step) => (
					<Step
						className='step-style'
						title={step.stageName}
						// subTitle="00:00:05"
						status='complete'
						// {
						// step.status === "C" ? "complete" : step.status === "P" && "wait"
						// }
						description={moment(step.lastUpdated).format('DD MMM YYYY')}
					/>
				))}
			</Steps>
			{timelineData && (
				<Row style={styleSet.container}>
					<Col span={6}>
						<TypoGraphy label={'Stage'}>{moreDetails?.stageName}</TypoGraphy>
					</Col>
					<Col span={6}>
						<TypoGraphy label={'Mandate Date'}>
							{moment(moreDetails?.lastUpdated).format('DD MMM YYYY')}
						</TypoGraphy>
					</Col>
					<Col span={6}>
						<TypoGraphy label={'Mandate Placed By'}>{moreDetails?.userName}</TypoGraphy>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default GenHorizontalTimeline;

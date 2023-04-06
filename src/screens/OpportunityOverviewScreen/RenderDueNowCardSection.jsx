import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import moment from 'moment';
import { getDueNowApi } from '../../api/opportunityOverviewApi';
import OpporOverviewDetailsModal from './OpporOverviewDetailsModal';
import RenderOpportunityAmountStats from './RenderOpportunityAmountStats';
import GenericTinyColumnChart from '../../components/Graphs/GenericTinyColumnChart/GenericTinyColumnChart';

const RenderDueNowCardSection = (props) => {
	const [dueNowData, setDueNowData] = useState();
	const [showDetailModal, setShowDetailModal] = useState(false);
	const getData = () => {
		getDueNowApi().then((res) => {
			setDueNowData(res.data);
		});
	};

	useEffect(() => {
		getData();
	}, []);

	let dueNowPlottingData;
	const toggleDetailsModal = () => {
		setShowDetailModal(!showDetailModal);
	};
	if (dueNowData) {
		dueNowPlottingData =
			dueNowData.graphData &&
			dueNowData.graphData !== null &&
			Array.isArray(dueNowData.graphData) &&
			dueNowData.graphData.map((item) => item.opporCount);
	}
	if (!dueNowData || dueNowData === null) return <>No Data Found</>;
	return (
		<>
			<OpporOverviewDetailsModal
				visible={showDetailModal}
				onClose={toggleDetailsModal}
				title='Due Now'
				getData={getData}
				data={dueNowData}
				mode='chart'
			/>
			{dueNowData ? (
				<Row align='middle' justify='space-around' className='card-section'>
					<Row
						align='middle'
						onClick={() => {
							toggleDetailsModal();
						}}
					>
						<Col className='logo eaecf8'>
							<FontAwesomeIcon icon={faClock} size='2x' color='#354081' />
						</Col>
						<Col>
							<RenderOpportunityAmountStats
								opporCount={dueNowData.totaloppor}
								amount={dueNowData.targetAmount}
								text='Due Now'
								authData={props.authData}
							/>
						</Col>
					</Row>
					<Col>
						<GenericTinyColumnChart
							graphData={dueNowData.graphData}
							plottingData={dueNowPlottingData}
						/>
					</Col>
				</Row>
			) : (
				'No Data Found'
			)}
		</>
	);
};

export default RenderDueNowCardSection;

import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/pro-regular-svg-icons';
import OpporOverviewDetailsModal from './OpporOverviewDetailsModal';
import RenderOpportunityAmountStats from './RenderOpportunityAmountStats';
import GenericTinyColumnChart from '../../components/Graphs/GenericTinyColumnChart/GenericTinyColumnChart';
import { getMissedDuedateApi } from '../../api/opportunityOverviewApi';

const RenderMissedDuedateCardSection = (props) => {
	const [missedDueDateData, setMissedDueDateData] = useState();
	const [showDetailModal, setShowDetailModal] = useState(false);
	const getData = () => {
		getMissedDuedateApi().then((res) => {
			setMissedDueDateData(res.data);
		});
	};

	useEffect(() => {
		getData();
	}, []);

	const toggleDetailsModal = () => {
		setShowDetailModal(!showDetailModal);
	};
	const missedDueDatePlottingData =
		missedDueDateData &&
		missedDueDateData.graphData &&
		missedDueDateData.graphData.map((item) => item.opporCount);

	if (!missedDueDateData || missedDueDateData === null) return <>No Data Found</>;
	return (
		<>
			<OpporOverviewDetailsModal
				visible={showDetailModal}
				onClose={toggleDetailsModal}
				title='Missed Due Date'
				getData={getData}
				data={missedDueDateData}
				mode='chart'
			/>
			{missedDueDateData ? (
				<Row className='card-section'>
					<Row
						align='middle'
						onClick={() => {
							toggleDetailsModal();
						}}
					>
						<Col className='logo ffdbdb'>
							<FontAwesomeIcon icon={faCalendarTimes} size='2x' color='#BE5C56' />
						</Col>
						<Col>
							<RenderOpportunityAmountStats
								opporCount={missedDueDateData.totaloppor}
								amount={missedDueDateData.targetAmount}
								text='Missed Due Date'
								authData={props.authData}
							/>
						</Col>
					</Row>{' '}
					<Col>
						<GenericTinyColumnChart
							graphData={missedDueDateData.graphData}
							plottingData={missedDueDatePlottingData}
						/>
					</Col>
				</Row>
			) : (
				'No Data Found'
			)}
		</>
	);
};

export default RenderMissedDuedateCardSection;

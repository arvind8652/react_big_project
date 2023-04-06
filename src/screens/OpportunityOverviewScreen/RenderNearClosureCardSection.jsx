import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-light-svg-icons';
import OpporOverviewDetailsModal from './OpporOverviewDetailsModal';
import RenderOpportunityAmountStats from './RenderOpportunityAmountStats';
import GenericTinyColumnChart from '../../components/Graphs/GenericTinyColumnChart/GenericTinyColumnChart';
import { getNearClosureApi } from '../../api/opportunityOverviewApi';

const RenderNearClosureCardSection = (props) => {
	const [nearClosureData, setNearClosureData] = useState();
	const [showDetailModal, setShowDetailModal] = useState(false);
	const getData = () => {
		getNearClosureApi().then((res) => {
			setNearClosureData(res.data);
		});
	};

	useEffect(() => {
		getData();
	}, []);

	const toggleDetailsModal = () => {
		setShowDetailModal(!showDetailModal);
	};
	const nearClosurePlottingData =
		nearClosureData &&
		nearClosureData.graphData &&
		nearClosureData.graphData.map((item) => item.opporCount);

	if (!nearClosureData || nearClosureData === null) return <>No Data Found</>;
	return (
		<>
			<OpporOverviewDetailsModal
				visible={showDetailModal}
				onClose={toggleDetailsModal}
				title='Near Closure'
				getData={getData}
				data={nearClosureData}
				mode='chart'
			/>
			{nearClosureData ? (
				<Row className='card-section'>
					<Row
						align='middle'
						onClick={() => {
							toggleDetailsModal();
						}}
					>
						<Col className='logo e4fdff'>
							<FontAwesomeIcon icon={faSpinner} size='2x' color='#56B8BE' />
						</Col>
						<Col>
							<RenderOpportunityAmountStats
								opporCount={nearClosureData.totaloppor}
								amount={nearClosureData.targetAmount}
								text='Near Closure'
								authData={props.authData}
							/>
						</Col>
					</Row>
					<Col>
						<GenericTinyColumnChart
							graphData={nearClosureData.graphData}
							plottingData={nearClosurePlottingData}
						/>
					</Col>
				</Row>
			) : (
				'No Data Found'
			)}
		</>
	);
};

export default RenderNearClosureCardSection;

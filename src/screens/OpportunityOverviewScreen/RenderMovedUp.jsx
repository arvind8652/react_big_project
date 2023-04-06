import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import OpporOverviewDetailsModal from './OpporOverviewDetailsModal';
import RenderOpportunityAmountStats from './RenderOpportunityAmountStats';
import { getMovedUpApi } from '../../api/opportunityOverviewApi';
import { useState, useEffect } from 'react';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const RenderMovedUp = () => {
	const [movedUpData, setMovedUpData] = useState();
	const [showDetailModal, setShowDetailModal] = useState(false);
	const toggleDetailsModal = () => {
		setShowDetailModal(!showDetailModal);
	};
	const getMovedUpData = () => {
		getMovedUpApi().then((res) => {
			setMovedUpData(res.data);
		});
	};

	useEffect(() => {
		getMovedUpData();
	}, []);

	return movedUpData && movedUpData !== null ? (
		<>
			<OpporOverviewDetailsModal
				visible={showDetailModal}
				onClose={toggleDetailsModal}
				title='Moved Up'
				getData={getMovedUpData}
				data={movedUpData}
				mode='chart'
			/>
			<Row align='middle' justify='center' className='moved-up' onClick={toggleDetailsModal}>
				<Col span={6}>
					<div className='moved-up-icon'>
						<FontAwesomeIcon icon={faAngleDoubleUp} size='2x' color='#56B8BE' />
					</div>
				</Col>
				<Col span={16}>
					{movedUpData && movedUpData !== null && (
						<RenderOpportunityAmountStats
							opporCount={movedUpData.totaloppor}
							amount={movedUpData.targetAmount}
							text='Moved Up'
						/>
					)}
				</Col>
			</Row>
		</>
	) : (
		'No Data Found'
	);
};

export default RenderMovedUp;

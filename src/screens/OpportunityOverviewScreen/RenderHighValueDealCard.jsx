import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { ScButtonText, ScRow } from '../../components/StyledComponents/genericElements';
import { getHighValueDealApi } from '../../api/opportunityOverviewApi';
import OpporOverviewDetailsModal from './OpporOverviewDetailsModal';
import RenderMiniOpportunityTableSection from './RenderMiniOpportunityTableSection';
import PlottingAttributeSelector from '../../components/PlottingAttributeSelector/PlottingAttributeSelector';
import { theme } from '../../theme';

const RenderHighValueDealCard = ({ authorizeCode }) => {
	const [highValueDealsData, setHighValueDealsData] = useState();
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [plottingField, setPlottingField] = useState('all');
	const getData = () => {
		getHighValueDealApi().then((res) => {
			setHighValueDealsData(res.data);
			setLoading(false);
		});
	};
	useEffect(() => {
		getData();
	}, []);
	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const CardTitle = () => {
		return (
			<ScRow align='middle' justify='space-between' width='100%'>
				<Col span={12} style={theme.secondaryHeader}>
					High Value Deals
				</Col>
				<Col span={11}>
					<Row align='middle' justify='end'>
						<PlottingAttributeSelector
							plottingField={plottingField}
							setPlottingField={setPlottingField}
							valueBtnText='All'
							countBtnText='Open'
							valueBtnMapping='all'
							countBtnMapping='open'
						/>
					</Row>
					{/* </ScRow> */}
				</Col>
			</ScRow>
		);
	};

	return (
		<div>
			{highValueDealsData && (
				<OpporOverviewDetailsModal
					title='High Value Deals'
					visible={showModal}
					onClose={toggleModal}
					getData={getData}
					data={
						plottingField === 'open'
							? highValueDealsData.opportunity.filter((item) => item.openOrClosed === 'OPEN')
							: highValueDealsData.opportunity
					}
					mode='table'
					authorizeCode={authorizeCode}
				/>
			)}
			<Card className='rc-m-d-card styled-border' loading={loading} title={<CardTitle />}>
				{highValueDealsData && (
					<RenderMiniOpportunityTableSection
						data={
							plottingField === 'open'
								? highValueDealsData.opportunity.filter((item) => item.openOrClosed === 'OPEN')
								: highValueDealsData.opportunity
						}
						getData={getData}
						setLoading={setLoading}
					/>
				)}
				<ScButtonText
					type='text'
					onClick={toggleModal}
					left='auto'
					right='5px'
					bottom='5px'
					margin='0 0 0 auto'
					padding='4px 15px'
					position='absolute'
					className='view-all-btn-clr'
				>
					View All
				</ScButtonText>
			</Card>
		</div>
	);
};

export default RenderHighValueDealCard;

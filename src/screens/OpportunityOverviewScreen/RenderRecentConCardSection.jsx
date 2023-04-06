import { useState, useEffect } from 'react';
import { getRecentConApi } from '../../api/opportunityOverviewApi';
import { ScButtonText } from '../../components/StyledComponents/genericElements';
import OpporOverviewDetailsModal from './OpporOverviewDetailsModal';
import RenderMiniOpportunityTableSection from './RenderMiniOpportunityTableSection';

const RenderRecentConCardSection = ({ loading, setLoading, authorizeCode }) => {
	const [recentConData, setRecentConData] = useState();
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const getData = () => {
		getRecentConApi().then((res) => {
			setRecentConData(res.data);
			setLoading(false);
		});
	};
	useEffect(() => {
		// setLoading(true);
		getData();
	}, []);
	return (
		<>
			{recentConData && (
				<OpporOverviewDetailsModal
					title='Recent Conversion'
					visible={showModal}
					onClose={toggleModal}
					getData={getData}
					data={recentConData.opportunity}
					mode='table'
					authorizeCode={authorizeCode}
				/>
			)}
			{recentConData && (
				<RenderMiniOpportunityTableSection data={recentConData.opportunity} getData={getData} />
			)}

			<ScButtonText
				type='text'
				onClick={toggleModal}
				left='auto'
				right='5px'
				bottom='5px'
				margin='0 0 0 auto'
				marginTop='20px'
				marginBottom='60px'
				padding='4px 15px'
				position='absolute'
				className='view-all-btn-clr'
			>
				View All
			</ScButtonText>
		</>
	);
};

export default RenderRecentConCardSection;

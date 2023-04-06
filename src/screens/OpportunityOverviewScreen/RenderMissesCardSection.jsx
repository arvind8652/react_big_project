import { useState, useEffect } from 'react';
import { getRecentMissedApi } from '../../api/opportunityOverviewApi';
import { ScButtonText } from '../../components/StyledComponents/genericElements';
import OpporOverviewDetailsModal from './OpporOverviewDetailsModal';
import RenderMiniOpportunityTableSection from './RenderMiniOpportunityTableSection';

const RenderMissesCardSection = ({ loading, setLoading, authorizeCode }) => {
	const [recentMissesData, setRecentMissesData] = useState();
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const getData = () => {
		getRecentMissedApi().then((res) => {
			setRecentMissesData(res.data);
			setLoading(false);
		});
	};
	useEffect(() => {
		// setLoading(true);
		getData();
	}, []);
	return (
		<>
			{recentMissesData && (
				<OpporOverviewDetailsModal
					title='Misses'
					visible={showModal}
					onClose={toggleModal}
					getData={getData}
					data={recentMissesData.opportunity}
					mode='table'
					authorizeCode={authorizeCode}
				/>
			)}
			{recentMissesData && (
				<RenderMiniOpportunityTableSection
					data={recentMissesData.opportunity}
					getData={getData}
					setLoading={setLoading}
				/>
			)}
			{/* {recentMissesData &&
      recentMissesData?.opportunity &&
        Array.isArray( recentMissesData?.opportunity) &&
        recentMissesData?.opportunity > 0 && ( */}
			<ScButtonText
				type='text'
				onClick={toggleModal}
				left='auto'
				right='0px'
				// bottom='5px'
				margin='0 0 0 auto'
				padding='4px 15px'
				position='absolute'
				fontSize='12px'
				className='view-all-btn-clr'
			>
				View More
			</ScButtonText>

			{/* )} */}
		</>
	);
};

export default RenderMissesCardSection;

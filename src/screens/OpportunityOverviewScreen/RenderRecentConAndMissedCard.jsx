import { useState } from 'react';
import { Card } from 'antd';
import RenderRecentConCardSection from './RenderRecentConCardSection';
import RenderMissesCardSection from './RenderMissesCardSection';
import RenderHeaderTabs from './RenderHeaderTabs';

const RenderRecentConAndMissedCard = (props) => {
	const [activeTab, setActiveTab] = useState('0');
	const [loading, setLoading] = useState(true);
	const tabs = [
		{
			title: 'Recent Conversion',
			component: (
				<RenderRecentConCardSection
					loading={loading}
					setLoading={setLoading}
					authorizeCode={props.authorizeCode}
				/>
			)
		},
		{
			title: 'Misses',
			component: (
				<RenderMissesCardSection
					loading={loading}
					setLoading={setLoading}
					authorizeCode={props.authorizeCode}
				/>
			)
		}
	];
	return (
		<Card
			className='rc-m-d-card styled-border condition'
			title={<RenderHeaderTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />}
		>
			{tabs[activeTab].component}
		</Card>
	);
};

export default RenderRecentConAndMissedCard;

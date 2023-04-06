import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { getRepositoryDataApi } from '../../api/prospectOverviewApi';
import { RingProgress } from '@ant-design/charts';
const LeadRepoCard = () => {
	const [loading, setLoading] = useState(true);
	const [leadRepoData, setLeadRepoData] = useState();
	const percentageValue =
		leadRepoData &&
		leadRepoData.leadCount / (leadRepoData.leadCount + leadRepoData.convertLeadProspect);

	var config = {
		height: 100,
		width: 100,
		autoFit: false,
		percent: percentageValue,
		color: ['#5B8FF9', '#E8EDF3']
	};
	useEffect(() => {
		getRepositoryDataApi().then((res) => {
			setLeadRepoData(res.data);
			setLoading(false);
		});
	}, []);
	return (
		<Card title='Lead Repository' className='lead-repo-graph-card' loading={loading}>
			<div className='lead-section'>
				<div className='graph-section'>
					<RingProgress {...config} />
				</div>
				<div className='count-title'>
					<div className='upgraded-lead-count'>
						{leadRepoData && leadRepoData.convertLeadProspect}
					</div>
					<div className='title'> Upgraded</div>
				</div>
				<div className='count-title'>
					<div className='open-lead-count'>{leadRepoData && leadRepoData.leadCount}</div>
					<div className='title'> Open</div>
				</div>
			</div>
			<div className='subtitle'>
				{/* You missed {leadRepoData && leadRepoData.averageLeadConversion}{" "}
        opportunities to get one */}
				You upgraded {Math.floor(leadRepoData?.convertLeadProspect / leadRepoData?.month)} leads per
				month
				{/* The above line has been added as per requested in the ticket #366  */}
			</div>
		</Card>
	);
};
export default LeadRepoCard;

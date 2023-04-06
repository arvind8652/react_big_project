import ActiveInteractionView from './ActiveInteractionView';
import MyActivitiesView from './MyActivitiesView';
import MyTasksView from './MyTasksView';
import DistributionView from './DistributionView';
import ActivityBreakupView from './ActivityBreakupView';
import OpenInteractionView from './OpenInteractionView';
import OpenTasksView from './OpenTasksView';
import ActivityTrendView from './ActivityTrendView';
import { connect } from 'react-redux';
import BackToTop from '../../components/BackToTop/BackToTop';

const EngagementOverviewScreen = ({ leftPanel }) => {
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'ACTIVIOVERVIEW') authorizeCode = subMenu.authorizeCode;
			});
		});

	return (
		<div className='engagement-overview-container'>
			<div className='prospect-repo-graphs'>
				<MyActivitiesView />
				<MyTasksView />
			</div>
			<div className='graphs-tables-container'>
				<div className='dist-sp-ob-aa-ct-graphs'>
					<div className='dist-sp-graphs'>
						<div className='dist-graph'>
							<ActiveInteractionView />
						</div>
						<div className='dist-graph'>{<DistributionView />}</div>
					</div>
					<div className='ob-graph'>{/* <RenderCampaignSourceCard /> */}</div>
					<div className='aa-graph'>{/* <RenderCampaignEffectivenessCard /> */}</div>
					<div className='recent-campaign-graph'>{/* <RenderRecentCampaignCard /> */}</div>
					<div className='ct-graph'>{<ActivityBreakupView />}</div>
					<div className='ct-graph' style={{ marginTop: '20px' }}>
						{<ActivityTrendView />}
					</div>
				</div>
				<div className='recent-prospects-tables'>
					<div className='rp-m-table'>{<OpenInteractionView authorizeCode={authorizeCode} />}</div>
					<div className='deals-table'>{<OpenTasksView authorizeCode={authorizeCode} />}</div>
				</div>
			</div>
			<BackToTop />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		leftPanel: state.dashboard.leftPanel
	};
};

export default connect(mapStateToProps)(EngagementOverviewScreen);

import React from 'react';
import { Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import './opportunityOverviewScreen.scss';
import BackToTop from '../../components/BackToTop/BackToTop';
import RenderDistributionCard from './RenderDistributionCard';
import RenderConStrikeRateCard from './RenderConStrikeRateCard';
import RenderExpectedConCard from './RenderExpectedConCard';
import RenderDueNowCardSection from './RenderDueNowCardSection';
import RenderNearClosureCardSection from './RenderNearClosureCardSection';
import RenderMissedDuedateCardSection from './RenderMissedDuedateCardSection';
import RenderSalesPipelineCard from './RenderSalesPipelineCard';
import RenderOpporBreakupCard from './RenderOpporBreakupCard';
import RenderAgingAnalysisCard from './RenderAgingAnalysisCard';
import RenderConversionTrendCard from './RenderConversionTrendCard';
import RenderRecentConAndMissedCard from './RenderRecentConAndMissedCard';
import RenderHighValueDealCard from './RenderHighValueDealCard';

const OpportunityOverviewScreen = (props) => {
	let authorizeCode = '';
	props.leftPanel &&
		props.leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'OPPORTOVERVIEW') authorizeCode = subMenu.authorizeCode;
			});
		});
	return (
		<div className='opportunity-overview-container'>
			<div className='csr-ec-graphs'>
				<RenderConStrikeRateCard authData={props.authData} />
				<RenderExpectedConCard authData={props.authData} />
			</div>
			<Card className='dn-nc-mdd-graphs styled-border'>
				<Row align='middle' justify='space-between'>
					<Col>
						<RenderDueNowCardSection authData={props.authData} />
					</Col>
					<Col>
						<RenderNearClosureCardSection authData={props.authData} />
					</Col>
					<Col>
						<RenderMissedDuedateCardSection authData={props.authData} />
					</Col>
				</Row>
			</Card>
			<div className='graphs-tables-container'>
				<div className='dist-sp-ob-aa-ct-graphs'>
					<div className='dist-sp-graphs'>
						<div className='dist-graph'>
							<RenderDistributionCard authData={props.authData} />
						</div>
						<div className='sp-graph'>
							<RenderSalesPipelineCard authData={props.authData} />
						</div>
					</div>
					<div className='ob-graph'>
						<RenderOpporBreakupCard authData={props.authData} />
					</div>
					<div className='aa-graph'>
						<RenderAgingAnalysisCard authData={props.authData} />
					</div>
					<div className='ct-graph'>
						<RenderConversionTrendCard authData={props.authData} />
					</div>
				</div>
				<div className='conversions-deals-tables'>
					<div className='rc-m-d-table'>
						<RenderRecentConAndMissedCard authData={props.authData} authorizeCode={authorizeCode} />
					</div>
					<div className='rc-m-d-table'>
						<RenderHighValueDealCard authData={props.authData} authorizeCode={authorizeCode} />
					</div>
				</div>
			</div>
			<BackToTop />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2,
		leftPanel: state.dashboard.leftPanel
	};
};
export default connect(mapStateToProps)(OpportunityOverviewScreen);

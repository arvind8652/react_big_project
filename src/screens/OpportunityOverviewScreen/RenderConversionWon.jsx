import { TinyArea } from '@ant-design/charts';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
import { theme } from '../../theme';

const RenderConversionWon = ({ conStrikeRateData, conRateGraphConfig }) => (
	<div className='conversion-won'>
		<div className='won-amount' style={theme.primaryHeader}>
			{/* {"PHP"} <RupeeOrNonRupee amount={conStrikeRateData.wonAmount} /> */}
			{conStrikeRateData?.currencySymbol} <RupeeOrNonRupee amount={conStrikeRateData.wonAmount} />
		</div>
		<div className='title' style={theme.secondaryHeader}>
			Conversion Won
		</div>
		<div className='graph-section'>
			{conRateGraphConfig && <TinyArea {...conRateGraphConfig} />}
		</div>
		<div className='subtitle' style={theme.secondaryHeader}>
			You missed&nbsp;
			{conStrikeRateData &&
				conStrikeRateData.subheadingWon &&
				conStrikeRateData.subheadingWon.toFixed(2)}{' '}
			to get 1 business
		</div>
	</div>
);

export default RenderConversionWon;

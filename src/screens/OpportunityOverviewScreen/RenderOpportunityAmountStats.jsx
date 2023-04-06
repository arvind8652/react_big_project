import NumberFormat from '../../constants/NumberFormat';

const RenderOpportunityAmountStats = ({ opporCount, amount, text, currencySymbol, authData }) => {
	return (
		<div className='oppor-amount-stats-container'>
			<div className='stats'>
				<div className='opportunity-count'>{opporCount}</div>
				&nbsp;<span>/</span>&nbsp;
				<div className='target-amount'>
					{/* {"₱"}{amount && NumberFormat(props.authData,amount)} */}
					{currencySymbol}
					{amount && NumberFormat(authData, amount)}
				</div>
			</div>
			<div className='text'>{text}</div>
		</div>
	);
};

export default RenderOpportunityAmountStats;

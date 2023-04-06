import React from 'react';
import InvestmentPolicy from './InvestmentPolicy';

const InvetstmentPolicyPrint = React.forwardRef((props, ref) => {
	return (
		<div ref={ref}>
			<InvestmentPolicy {...props} />
		</div>
	);
});

export default InvetstmentPolicyPrint;

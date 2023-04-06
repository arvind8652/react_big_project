import React from 'react';
import WealthManagementOnboardingForm from './WealthManagementOnboardingForm';

const ComponentToPrint = React.forwardRef((props, ref) => {
	return (
		<>
			<div ref={ref}>
				<WealthManagementOnboardingForm {...props} />
			</div>
		</>
	);
});

export default ComponentToPrint;

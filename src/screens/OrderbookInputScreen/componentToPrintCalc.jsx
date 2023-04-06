import React from "react";
import SMCalculatorScreen from "../SMCalculatorPDF/SMCalculatorScreen";

const ComponentToPrintCalc = React.forwardRef((props, ref) => {
	return (
		<div ref={ref}>
			<SMCalculatorScreen {...props} />
		</div>
	);
});

export default ComponentToPrintCalc;

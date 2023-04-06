import React from 'react';
// import CasfPdf from './CsafPdf';
import NewCsafPdf from './NewCsafPdf';
const CsafPdfToPrint = React.forwardRef((props, ref) => {
	return (
		<>
			<div ref={ref}>
				{/* <CasfPdf {...props} /> */}
				<NewCsafPdf {...props} />
			</div>
		</>
	);
});

export default CsafPdfToPrint;

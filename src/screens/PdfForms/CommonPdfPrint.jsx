import React from 'react';
import Cis from './Leasing/CisCorporate/CisCorporate';
import AmfForm from './Securities/Amf/AmfForm';
import CIAFPersonal from './Securities/CIAFPersonal/CIAFPersonal';

export const Cis = React.forwardRef((props, ref) => {
	return (
		<div ref={ref}>
			<Cis {...props} />
		</div>
	);
});

export const Amf = React.forwardRef((props, ref) => {
	return (
		<div ref={ref}>
			<AmfForm {...props} />
		</div>
	);
});

export const CIAF = React.forwardRef((props, ref) => {
	return (
		<div ref={ref}>
			<CIAFPersonal {...props} />
		</div>
	);
});

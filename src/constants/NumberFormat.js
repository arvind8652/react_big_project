const NumberFormat = (authData, newAmt) => {
	return new Intl.NumberFormat(authData === 'INDIAN' ? 'en-IN' : 'en-US', {
		minimumFractionDigits: 0
	}).format(newAmt);
};
export default NumberFormat;

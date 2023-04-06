import { Row, Col } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import GenericCardInput from '../../components/GenericInput/GenericCardInput';

import { executeGetSecuritiesForIssuer, setPrimaryOrder } from '../../redux/actions/primaryMarketActions';

export const SecurityDetails = ({ selectValues = () => {} }) => {
	const [ securityOptions, setSecurityOptions ] = useState([]);

	const dispatch = useDispatch();

	let formDetails = {
		issuer: {
			label: 'Issuer',
			type: 'Select',
			...selectValues('Issuer')
		},
		security: {
			label: 'Security Name',
			type: 'Select',
			options: securityOptions,
			showSearch: true,
			key: 'security',
			value: 'name'
		}
	};

	const [ formValues, setFormValues ] = useState({
		issuer: null,
		security: undefined
	});

	const onChange = (key, selectedOption) => {
		switch (key) {
			case 'issuer':
				// setSecurityOptions([]);
				// setFormValues(selectedOption);
				executeGetSecuritiesForIssuer(selectedOption).then((securityOptions) => {
					setSecurityOptions(securityOptions);
				});
				break;
			case 'security':
				let selectedSec = securityOptions.find((eachSec) => eachSec.security === selectedOption);
				dispatch(
					setSecondaryOrder({ premium: selectedSec.premium, fcyArrangerFee: selectedSec.pm_oth_chrg_perc })
				);
				break;
			default:
				return;
		}
	};

	return (
		<Row>
			{Object.keys(formDetails).map((key) => (
				<GenericCardInput
					item={formDetails[key]}
					key={key}
					onChange={(option) => onChange(key, option)}
					value={formValues[key]}
				/>
			))}
			<Col offset={2} style={{ marginTop: '3em' }}>
				<h1>Explore</h1>
			</Col>
		</Row>
	);
};

import { Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GenericCardInput from '../../components/GenericInput/GenericCardInput';
import {
	setSecondaryOrder,
	executeGetDefaultBankAccountAndCustodian
} from '../../redux/actions/pNBActions';
import moment from 'moment';

export const PaymentDetails = ({
	selectValues = () => {},
	bankAccOptions = [],
	returnValidators = () => {},
	handleFormValues = () => {},
	formValues,
	controlStructure,
	form
}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		controlStructure?.length !== undefined &&
			controlStructure?.map((field) => {
				if (field?.keyField === 'PaymentMode') {
					let paymentMode = field?.dropDownValue.find(
						(pay) => pay?.dataValue === field?.defaultvalue
					);
					if (paymentMode) {
						formValues.paymentMode = paymentMode?.dataValue;
						form.setFieldsValue({ paymentMode: paymentMode?.displayValue });
					}
				}
			});
	}, [controlStructure]);

	let formDetails = {
		paymentMode: {
			label: 'Payment Mode',
			type: 'Select',
			disabled: true,
			...selectValues('PaymentMode'),
			rules: returnValidators('PaymentMode')
		},
		paymentDate: {
			label: 'Payment Date',
			type: 'Date',
			disabled: true
			// rules: returnValidators("ChequeDate")
		},
		bankAcc: {
			label: 'Bank A/c',
			type: 'Select',
			options: bankAccOptions,
			key: 'dataValue',
			value: 'displayValue',
			rules: returnValidators('BankAccount')
		},
		chequeNumber: {
			label: 'Cheque Number / Reference Number',
			type: 'Input',
			rules: returnValidators('ChequeNumber')
		},
		bankName: {
			label: 'Bank Name',
			type: 'Select',
			keyField: 'BankName',
			disabled: false,
			...selectValues('BankName'),
			rules: returnValidators('BankName')
		}
	};

	// let [formValues, setFormValues] = useState({
	// 	paymentMode: "",
	// 	paymentDate: null,
	// 	bankAcc: "",
	// 	chequeNumber: "",
	// 	bankName: "",
	// });

	// const onChange = (key, value) => {
	// 	setFormValues({ ...formValues, [key]: value });
	// };

	useEffect(() => {
		let updateObj = {
			instrType: formValues.paymentMode,
			chqDate: formValues.paymentDate
				? moment(formValues.paymentDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
				: null,
			account: formValues.bankAcc,
			chqNumber: formValues.chequeNumber,
			bank: formValues.bankName
		};

		dispatch(setSecondaryOrder({ ...updateObj }));
	}, [formValues, dispatch]);

	return (
		<Row>
			{Object.keys(formDetails).map((key) => (
				<GenericCardInput
					item={formDetails[key]}
					key={key}
					value={formValues[key]}
					onChange={(value) => handleFormValues({ [key]: value })}
					itemName={key}
				/>
			))}
		</Row>
	);
};

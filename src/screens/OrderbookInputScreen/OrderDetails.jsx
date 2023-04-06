import { Row, Radio, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GenericCardInput from '../../components/GenericInput/GenericCardInput';
import { setSecondaryOrder, setSMCalculator } from '../../redux/actions/pNBActions';
import moment from 'moment';
import { store } from '../../redux/configureStore';

const { Title } = Typography;

export const OrderDetails = ({
	selectValues = () => {},
	returnValidators = () => {},
	bankAccOptions = [],
	formValues,
	setFormValues,
	yieldPrice,
	setYieldPrice,
	form,
	setNotFavourable,
	notFavourable,
	handleFormValues,
	controlStructure
}) => {
	const dispatch = useDispatch();
	const calculateStructure = useSelector((state) => state.pNBData?.calculateSMOrder);

	useEffect(() => {
		controlStructure?.length !== undefined &&
			controlStructure?.map((field) => {
				if (field?.keyField === 'Broker') {
					let obj = field?.lookupValue?.lookUpValues?.find(
						(o) => o?.Broker === field?.defaultvalue
					);
					if (obj) {
						formValues.broker = obj?.Broker;
						form.setFieldsValue({ broker: obj?.name });
					} else {
						formValues.broker = 'PNB';
						form.setFieldsValue({ broker: 'PHILIPPINE NATIONAL BANK' });
					}
				}
			});
	}, [controlStructure]);

	let formDetails = {
		yield: {
			label: 'YTM',
			type: 'InputNumber',
			rules: returnValidators('YTM'),
			disabled: yieldPrice === 'P' || yieldPrice === ''
		},
		orderDate: {
			label: 'Order Date',
			type: 'Date',
			disabled: true,
			rules: returnValidators('OrderDate')
		},
		price: {
			label: 'Price',
			type: 'InputNumber',
			disabled: yieldPrice === 'Y' || yieldPrice === '',
			rules: returnValidators('Price')
		},
		faceValue: {
			label: 'Face Value',
			type: 'InputNumber',
			disabled: false,
			rules: returnValidators('FaceValue'),
			decimals: 0
		},
		accruedInterest: {
			label: 'Accrued Interest',
			type: 'InputNumber',
			disabled: true,
			rules: returnValidators('AccuredInterest')
		},
		broker: {
			label: 'Broker',
			type: 'Select',
			keyField: 'Broker',
			disabled: true,
			...selectValues('Broker'),
			rules: returnValidators('Broker')
		},
		brokerage: {
			label: 'Broker Fees',
			type: 'InputNumber',
			disabled: false,
			rules: returnValidators('BrokerageFees')
		},
		transferFee: {
			label: 'Transfer Fee',
			type: 'InputNumber',
			disabled: true,
			rules: returnValidators('TransferFee')
		},
		custodyFees: {
			label: 'Custody Fees',
			type: 'InputNumber',
			disabled: true,
			rules: returnValidators('CustodyFees')
		},
		// otherCharges: {
		// 	label: "Other Charges",
		// 	type: "InputNumber",
		// 	disabled: false,
		// 	value: 0,
		// 	rules: returnValidators("OtherCharges"),
		// },
		settlementValue: {
			label: 'Settlement Value',
			type: 'InputNumber',
			disabled: true,
			rules: returnValidators('SettelmentValue')
		},
		orderInstruction: {
			label: 'Order Instruction',
			type: 'Select',
			disabled: false,
			...selectValues('OrderInstruction'),
			rules: returnValidators('OrderInstruction')
		},
		otherInstruction: {
			label: 'Other Instruction',
			type: 'Select',
			disabled: false,
			...selectValues('OtherInstruction'),
			rules: returnValidators('OtherInstruction')
		},
		defaultCreditAccount: {
			label: 'Default Credit Account',
			type: 'Select',
			options: bankAccOptions,
			key: 'dataValue',
			value: 'displayValue',
			rules: returnValidators('DefaultCreditAccount')
		}
	};

	const validateBrokerage = (value) => {
		if (calculateStructure?.dealRequisition?.fcyBrkCommn < value) {
			setNotFavourable(true);
			setFormValues({
				...formValues,
				brokerage: calculateStructure.dealRequisition.fcyBrkCommn
			});
		} else {
			setNotFavourable(false);
			setFormValues({ ...formValues, brokerage: value });
		}
	};

	useEffect(() => {
		let faceValue, custodyFees, transferFee, brokerage;
		if (!formValues.facevalue || formValues.facevalue === null) {
			faceValue = 0;
		} else {
			faceValue = formValues.facevalue;
		}
		if (!formValues.custodyFees || formValues.custodyFees === null) {
			custodyFees = 0;
		} else {
			custodyFees = formValues.custodyFees;
		}
		if (!formValues.transferFee || formValues.transferFee === null) {
			transferFee = 0;
		} else {
			transferFee = formValues.transferFee;
		}
		if (!formValues.brokerage || formValues.brokerage === null) {
			brokerage = 0;
		} else {
			brokerage = formValues.brokerage;
		}
		// let finalSettlement =
		// 	parseFloat(faceValue) + parseFloat(brokerage) + parseFloat(transferFee) + parseFloat(custodyFees);
		formValues.faceValue &&
			formValues.yield &&
			setFormValues({
				...formValues
				// settlementValue: parseFloat(finalSettlement),
			});
	}, [formValues.faceValue, formValues.price, formValues.yield]);

	useEffect(() => {
		let updateObj = {
			purYield: formValues.yield,
			valueDate: moment(sessionStorage.getItem('curDate')).format('YYYY-MM-DD'),
			rate: formValues.price === '' ? 0 : formValues.price,
			fcyGrossVal: parseFloat(formValues.faceValue),
			fcyGrossInt: formValues.accruedInterest,
			broker: formValues.broker,
			fcyBrkCommn: formValues.brokerage,
			orgFcyBrkCommn: calculateStructure?.dealRequisition?.fcyBrkCommn,
			fcyTransChrg: formValues.transferFee,
			fcyCustchrg: formValues.custodyFees,
			fcyNettVal: formValues.settlementValue,
			orderInstruction: formValues.orderInstruction,
			otherInstruction: formValues.otherInstruction,
			bankAccForINM: formValues.defaultCreditAccount
		};

		dispatch(setSecondaryOrder({ ...updateObj }));
	}, [formValues, dispatch]);
	const onChangeFace = (key, value) => {
		if (
			key === 'price' ||
			key === 'yield' ||
			key === 'broker' ||
			key === 'defaultCreditAccount' ||
			key === 'faceValue'
		) {
			store.dispatch(setSMCalculator({ recompYN: 'Y' }));
		}
		if (key === 'brokerage') {
			validateBrokerage(value);
			store.dispatch(setSMCalculator({ recompYN: 'N' }));
		} else {
			setFormValues({ ...formValues, [key]: value });
		}
	};
	const onSelectYieldPrice = (value) => {
		setYieldPrice(value);
	};
	useEffect(() => {
		form.setFieldsValue({ ...formValues });
	}, [formValues, form]);

	return (
		<div>
			<Row>
				<Radio.Group
					defaultValue={yieldPrice}
					onChange={(evt) => onSelectYieldPrice(evt.target.value)}
				>
					<Radio.Button value='Y'>Yield</Radio.Button>
					<Radio.Button value='P'>Price</Radio.Button>
				</Radio.Group>
			</Row>

			<Row>
				{Object.keys(formDetails).map((key) => (
					<GenericCardInput
						item={formDetails[key]}
						key={key}
						value={formValues[key]}
						onChange={(value) => onChangeFace(key, value)}
						itemName={key}
					/>
				))}
			</Row>
			<Row>
				{calculateStructure && calculateStructure?.isSuccess != true && (
					<Title style={{ color: '#C15555', marginLeft: '1em', marginTop: '1em' }} level={5}>
						{calculateStructure?.message}
					</Title>
				)}
			</Row>
			<Row>
				{notFavourable && (
					<Title style={{ color: '#C15555', marginLeft: '1em', marginTop: '1em' }} level={5}>
						Brokerage Value cannot be greater than computed value, Please enter the correct value.
					</Title>
				)}
			</Row>
		</div>
	);
};

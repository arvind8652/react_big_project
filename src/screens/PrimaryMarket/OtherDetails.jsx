import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Input, Form } from "antd";
import GenericCardInput from "../../components/GenericInput/GenericCardInput";

import { setPrimaryOrder } from "../../redux/actions/primaryMarketActions";

const { TextArea } = Input;

export const OtherDetails = ({
	selectValues = () => {},
	srcOfFund = "",
	setMailingAddressOption = () => {},
	returnValidators = () => {},
	handleFormValues = () => {},
	formValues = {
		bookingBranch: "",
		sourceOfFund: "",
		freshFunds: "",
		source: "O",
		otherSource: "",
		designation: "",
		emailId: "",
		mailingAddress: "",
		nocdCode: "",
		remarks: "",
	},
}) => {
	const dispatch = useDispatch();
	const [isSrcOther, setSrcIsOther] = useState(false);
	const controlStructure = useSelector((state) => state.primaryMarketReducer.controlStructure);

	const formDetails = {
		bookingBranch: {
			label: "Booking Branch",
			type: "Select",
			...selectValues("BookingBranch"),
			rules: returnValidators("BookingBranch"),
		},
		sourceOfFund: {
			label: "Source of Fund",
			type: "Input",
			disabled: true,
			rules: returnValidators("SourceofFund"),
		},
		freshFunds: {
			label: "Fresh Funds",
			type: "Select",
			...selectValues("FreshFunds"),
			rules: returnValidators("FreshFunds"),
		},
		source: {
			label: "Source",
			type: "Select",
			...selectValues("Source"),
			rules: returnValidators("Source"),
		},
		otherSource: {
			label: "Other Source",
			type: "Input",
			disabled: !isSrcOther,
			rules: !isSrcOther
				? returnValidators("OtherSourceName")
				: [{ required: true }, ...returnValidators("OtherSourceName")],
		},
		designation: {
			label: "Designation",
			type: "Input",
			disabled: !isSrcOther,
			rules: returnValidators("Designation"),
		},
		emailId: {
			label: "Email Id",
			type: "Input",
			disabled: !isSrcOther,
			dataType: "email",
			rules: returnValidators("EmailId"),
		},
		mailingAddress: {
			label: "Mailing Address",
			type: "Select",
			...selectValues("MailingAddress"),
			disabled: false,
			rules: returnValidators("MailingAddress"),
		},
		nocdCode: {
			label: "NOCD Code",
			type: "Input",
			disabled: false,
			dataType: "text",
			rules: [],
		},
	};

	const onChange = (key, value) => {
		switch (key) {
			case "source":
				if (value === "O") {
					setSrcIsOther(true);
					handleFormValues({
						emailId: "",
						designation: "",
						source: value,
					});
				} else {
					setSrcIsOther(false);
					if (controlStructure !== undefined) {
						let selectedObj = controlStructure
							? controlStructure
									.find((each) => each.keyField === "Source")
									.lookupValue.lookUpValues.find((each) => each.ID === value)
							: {};
						if (Object.keys(selectedObj).length > 0) {
							handleFormValues({
								emailId: selectedObj.emailID,
								designation: selectedObj.designationName,
								source: value,
								otherSource: "",
							});
						}
					}
				}
				break;
			case "mailingAddress":
				handleFormValues({ mailingAddress: value });
				setMailingAddressOption(value);
				break;
			default:
				handleFormValues({ [key]: value });
				return;
		}
	};

	useEffect(() => {
		dispatch(
			setPrimaryOrder({
				branch: formValues.bookingBranch,
				freshSchemeYn: formValues.freshFunds,
				sourceUserId: formValues.source,
				OthSourceName: formValues.otherSource,
				OthDesignation: formValues.designation,
				emailId: formValues.emailId,
				AddressOthYn: formValues.mailingAddress,
				remarks: formValues.remarks,
				nocdCode: formValues.nocdCode,
			})
		);
	}, [formValues, dispatch]);

	return (
		<>
			<Row>
				{Object.keys(formDetails).map((key) => (
					<GenericCardInput
						item={formDetails[key]}
						key={key}
						onChange={(value) => onChange(key, value)}
						value={formValues[key]}
						itemName={key}
					/>
				))}
			</Row>
			<Row>
				<Col span={16}>
					<Form.Item
						label={"Remark"}
						colon={false}
						labelCol={{ span: "24" }}
						className="cardColumn"
						labelAlign="left"
						rules={returnValidators("Remark")}
						validateTrigger={["onBlur", "onSubmit", "onChange"]}
						name={"remarks"}
					>
						<TextArea
							rows={4}
							onChange={(e) => {
								handleFormValues({ remarks: e.target.value });
							}}
						/>
					</Form.Item>
				</Col>
			</Row>
		</>
	);
};

import { Row } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import GenericCardInput from "../../components/GenericInput/GenericCardInput";
import { setPrimaryOrder } from "../../redux/actions/primaryMarketActions";

export const OrderDetails = ({
  selectValues = () => {},
  bankAccOptions = [],
  whichInvestment = "",
  returnValidators = () => {},
  handleFormValues = () => {},
  getDecimalPrecision = () => {},
  controlStructure,
  form,
  formValues = {
    price: "",
    applicationQuantity: 0,
    applicationAmount: 0,
    broker: "",
    brokerage: 0,
    interestRate: 0,
    otherCharges: 0,
    settlementValue: 0.0,
    defaultCreditAccount: "",
    custodian: "",
    dpAccNo: "",
  },
  faceValue,
  mode = "add",
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    controlStructure?.length !== undefined &&
    controlStructure?.map(field =>{
      if(field?.keyField === "Broker"){
        let obj = field?.lookupValue?.lookUpValues?.find(o => o?.Broker === field?.defaultvalue);
        if (obj) {
          formValues.broker = obj?.Broker
          form.setFieldsValue({ broker: obj?.name })
        } else {
          formValues.broker = 'PNB'
          form.setFieldsValue({ broker: "PHILIPPINE NATIONAL BANK" })
        }
      }
    })
  }, [controlStructure])

  let formDetails = {
    orderDate: {
      label: "Order Date",
      type: "Date",
      disabled: true,
      rules: returnValidators("OrderDate"),
    },
    price: {
      label: "Price",
      type: "InputNumber",
      disabled: true,
      rules: returnValidators("Price"),
      decimals: getDecimalPrecision("Price"),
    },
    applicationAmount: {
      label: whichInvestment === "EQ" ? "Application Amount" : "Face Value",
      type: "InputNumber",
      disabled: whichInvestment === "EQ" ? true : false,
      dataType: "number",
      rules: returnValidators("ApplicationAmount"),
      decimals: getDecimalPrecision("ApplicationAmount"),
    },
    applicationQuantity: {
      label: "Application Quantity",
      type: "InputNumber",
      disabled: false,
      dataType: "number",
      hiddenField: whichInvestment === "EQ" ? false : true,
      rules:
        whichInvestment === "EQ" ? returnValidators("ApplicationQuantity") : [],
      decimals: getDecimalPrecision("ApplicationQuantity"),
    },
    interestRate: {
      label: "Interest Rate",
      type: "Input",
      dataType: "number",
      disabled: false,
      hideField: whichInvestment === "EQ" ? true : false,
      rules: returnValidators("InterestRate"),
      decimals: getDecimalPrecision("InterestRate"),
    },
    broker: {
      label: "Broker",
      type: "Select",
      keyField: "Broker",
      disabled: true,
      ...selectValues("Broker"),
      rules: returnValidators("Broker"),
    },
    brokerage: {
      label: "Brokerage",
      type: "Input",
      disabled: true,
      rules: returnValidators("Brokerage"),
    },
    otherCharges: {
      label: "Other Charges",
      type: "Input",
      disabled: true,
      value: 0,
      dataType: "number",
      rules: returnValidators("OtherCharges"),
    },
    settlementValue: {
      label: "Settlement Value",
      type: "Input",
      disabled: true,
      dataType: "number",
      rules: returnValidators("SettlementValue"),
    },
    defaultCreditAccount: {
      label: "Default Credit Account",
      type: "Select",
      disabled: false,
      options: bankAccOptions,
      key: "dataValue",
      value: "displayValue",
      rules: returnValidators("BankAccForINM"),
    },
    custodian: {
      label: "Custodian",
      type: "Select",
      disabled: false,
      ...selectValues("Custodian"),
      key: "custodian",
      value: "name",
      rules: returnValidators("Custodian"),
    },
    dpAccNo: {
      label: "DP Account number",
      type: "Input",
      disabled: false,
      rules: [],
    },
  };

  // CHANGES IF ANY FIELD IS UPDATED
  useEffect(() => {
    if (formValues.applicationAmount && faceValue) {
      if (whichInvestment === "EQ") {
        handleFormValues({
          settlementValue: formValues.applicationAmount,
        });
      } else {
        handleFormValues({
          settlementValue:
            (formValues.applicationAmount / faceValue) *
            parseInt(formValues.price),
        });
      }
    }
  }, [formValues.applicationAmount, faceValue, formValues.price]);

  useEffect(() => {
    dispatch(
      setPrimaryOrder({
        valueDate: sessionStorage.getItem("curDate"),
        appAmount: formValues.price,
        eligUnits: formValues.applicationQuantity,
        fcyTotPaid: formValues.applicationAmount,
        appYield: formValues.interestRate,
        agent: formValues.broker,
        fcynettval: formValues.settlementValue,
        bankAccForINM: formValues.defaultCreditAccount,
        custodian: formValues.custodian,
        dpAccountNo: formValues.dpAccNo,
      })
    );
  }, [formValues, dispatch]);

  // useEffect(() => {
  //   handleFormValues({
  //     applicationAmount: formValues.price * formValues.applicationQuantity,
  //   });
  // }, [formValues.applicationQuantity]);

  // useEffect(() => {
  //   handleFormValues({
  //     applicationQuantity: formValues.applicationAmount / formValues.price,
  //   });
  // }, [formValues.applicationAmount]);

  const onChange = (key, value) => {
    switch (key) {
      case "applicationQuantity":
        handleFormValues({
          applicationQuantity: value,
          applicationAmount: formValues.price * value,
        });
        break;
      case "applicationAmount":
        handleFormValues({
          applicationAmount: value,
          applicationQuantity: value / formValues.price,
        });
        break;
      default:
        handleFormValues({
          [key]: value,
        });
        return;
    }
  };

  return (
    <Row>
      {Object.keys(formDetails).map((key) => {
        return (
          !formDetails[key].hideField && (
            <GenericCardInput
              item={formDetails[key]}
              key={key}
              value={formValues[key]}
              onChange={(value) => onChange(key, value)}
              itemName={key}
            />
          )
        );
      })}
    </Row>
  );
};

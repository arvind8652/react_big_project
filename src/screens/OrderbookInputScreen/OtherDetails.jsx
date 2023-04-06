import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Input, Form } from "antd";
import GenericCardInput from "../../components/GenericInput/GenericCardInput";

import { setSecondaryOrder } from "../../redux/actions/pNBActions";

const { TextArea } = Input;

export const OtherDetails = ({
  selectValues = () => {},
  srcOfFund = "",
  setMailingAddressOption = () => {},
  withholdingTaxPer = "",
  returnValidators = () => {},
  formValues,
  setFormValues,
  controlStructureOtherDetails,
}) => {
  const dispatch = useDispatch();
  const [isSrcOther, setSrcIsOther] = useState(false);
  const [remarks, setRemarks] = useState("");
  // const controlStructureOtherDetails = useSelector(
  //   (state) => state.pNBReducer?.controlStructure
  // );

  // const bookingBranch = useSelector((state) => state.auth.user.branch);

  // const WithholdingTaxPercentage = useSelector(

  //   (state) => state.pNBReducer?.calculateSMOrder?.dealRequisition?.withholdingTaxPer

  // );

  const formDetails = {
    bookingBranch: {
      label: "Booking Branch",
      type: "Select",
      keyField: "BookingBranch",
      ...selectValues("BookingBranch"),
      rules: returnValidators("BookingBranch"),
    },
    sourceOfFund: {
      label: "Source of Fund",
      type: "Input",
      disabled: true,
      value: srcOfFund,
      rules: returnValidators("SourceofFund"),
    },
    withholdingTaxPer: {
      label: "Withholding Tax %",
      type: "Input",
      disabled: true,
      keyField: "WithholdingTaxPer",
      ...selectValues("WithholdingTaxPer"),
      rules: returnValidators("WithholdingTaxPer"),
    },
  };

  // const [formValues, setFormValues] = useState({
  //   bookingBranch: bookingBranch ?? "",
  //   sourceOfFund: srcOfFund ? srcOfFund : "",
  //   withholdingTaxPer: WithholdingTaxPercentage ? WithholdingTaxPercentage : "0",
  //   remarks: "",
  // });

  const onChange = (key, value) => {
    switch (key) {
      case "source":
        if (value === "O") {
          setSrcIsOther(false);
          setFormValues({
            ...formValues,
            emailId: "",
            designation: "",
            source: value,
          });
        } else {
          setSrcIsOther(true);
          if (controlStructureOtherDetails !== undefined) {
            let selectedObj = controlStructureOtherDetails
              ? controlStructureOtherDetails
                  .find((each) => each.keyField === "Source")
                  .lookupValue.lookUpValues.find((each) => each.ID === value)
              : {};
            if (Object.keys(selectedObj).length > 0) {
              setFormValues({
                ...formValues,
                emailId: selectedObj.emailID,
                designation: selectedObj.designation,
                source: value,
              });
            }
          }
        }
        break;
      default:
        setFormValues({ ...formValues, [key]: value });
        return;
    }
  };

  useEffect(() => {
    //console.log("Other details form values", formValues)
    dispatch(
      setSecondaryOrder({
        branch: formValues.bookingBranch,
        withholdingTaxPer: formValues.withholdingTaxPer,
        remarks: remarks,
      })
    );
  }, [formValues, dispatch, remarks]);

  return (
    <>
      <Row>
        {Object.keys(formDetails).map((key) => (
          <GenericCardInput
            item={formDetails[key]}
            key={key}
            onChange={(value) => onChange(key, value)}
            value={formValues[key]}
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
                setRemarks(e.target.value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

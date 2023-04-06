import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import threeILogo from "../../assets/img/logos/logo.gif";
import { CONSTANTS } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/pro-solid-svg-icons";
import { getOtpRequestFormCsApi } from "../../api/authApi";
import { createValidators } from "../../utils/utils";
import Logo from "../Logo/Logo";

// const otpRequestFormRules = {
//   otp: [
//     {
//       required: true,
//       message: "User ID required",
//     },
//   ],
// };

const OtpRequestForm = (props) => {
  const { onSubmit, errorMsg, setErrorMsg } = props;
  const [seconds, setSeconds] = useState(120); // value to come from Users/GetConfig
  const [isShowTimer, setShowTimer] = useState(true);
  const [otpRequestFormCs, setOtpRequestFormCs] = useState();
  function handleResendOTP() {
    //API call to resent OTP will go here
    setShowTimer(true);
    setSeconds(120);
  }

  useEffect(() => {
    getOtpRequestFormCsApi().then((res) => {
      setOtpRequestFormCs(res.data);
    });
  }, []);
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setShowTimer(false);
      setSeconds(0);
    }
  }, [seconds]);
  const initialValues = {
    otp: "",
  };
  const otpRequestFormRules =
    otpRequestFormCs &&
    createValidators(otpRequestFormCs.csList[0].controlStructureField);
  return (
    <Form
      name="reset_password_form"
      initialValues={initialValues}
      onChange={() => {
        setErrorMsg("");
      }}
      onFinish={onSubmit}
      className="otpRequestForm"
    >
      {/* <img src={threeILogo} alt="logo" className="formLogo" /> */}
      <Logo logo={threeILogo} altLogo={""} logoSize={"medium"} logoClassName={"newFormLogo"} />
      <div className="heading">{CONSTANTS.otpRequestForm.formHeading}</div>

      <div
        className="smallText"
        style={{
          marginBottom: 24,
          fontSize: "16px",
          lineHeight: "22px",
        }}
      >
        {CONSTANTS.otpRequestForm.forSubHeading}
      </div>
      <div className="field">
        <label htmlFor="otp" className="fieldLabel">
          {CONSTANTS.otpRequestForm.otpInputLabel}
        </label>
        <Form.Item
          name="otp"
          rules={otpRequestFormRules ? otpRequestFormRules.otp : []}
        >
          <Input id="otp" className="fieldInput" type="text" />
        </Form.Item>
      </div>
      {errorMsg && (
        <div className="errorMsg">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            style={{ color: "#931f2a", marginRight: 8 }}
          />
          {errorMsg}
        </div>
      )}
      <Button type="primary" htmlType="submit" className="submitBtn">
        {CONSTANTS.otpRequestForm.verifyBtnText}
      </Button>
      <div className="smallText">
        {CONSTANTS.otpRequestForm.smallText}
        {isShowTimer ? (
          <span>in {seconds} seconds</span>
        ) : (
            <span>
              now.
              <span className="otpRequestResentOTP" onClick={handleResendOTP}>
                Resend OTP
            </span>
            </span>
          )}
      </div>
    </Form>
  );
};

export default OtpRequestForm;

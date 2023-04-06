import React, { useEffect, useState } from "react";
import { Form, Input, Button, Popover } from "antd";
import threeILogo from "../../assets/img/logos/3i.svg";
import { CONSTANTS } from "../../constants/constants";
import "./resetPasswordScreen.scss";
import { getPasswordPolicyInfoApi, resetPasswordApi } from "../../api/authApi";
import { createValidators } from "../../utils/utils";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/pro-solid-svg-icons";
import { assets } from "../../constants/assetPaths";
import Logo from "../../components/Logo/Logo";
import MessageScreen from "../../components/MessageScreenComponent/MessageScreen";

const ResetPasswordForm = ({
  loading,
  onSubmit,
  formRules,
  form,
  error,
  setError,
}) => {
  const [seconds, setSeconds] = useState(120);
  const [isShowTimer, setShowTimer] = useState(true);
  const [passwordPolicyInfo, setPasswordPolicyInfo] = useState("");
  useEffect(() => {
    getPasswordPolicyInfoApi().then((response) => {
      setPasswordPolicyInfo(response.data);
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

  function handleResendOTP() {
    //API call to resent OTP will go here
    setShowTimer(true);
    setSeconds(120);
  }

  const policyContent = (passwordPolicy) => {
    return (
      <div className="passwordPolicyPopupInner">
        <div className="heading" style={{ margin: "0 0 16px 0" }}>
          {CONSTANTS.forgotPasswordForm.passwordPolicyHeading}
        </div>
        <div className="body">
          {passwordPolicy.map((infoPoint) => (
            <div>{infoPoint.messageDescription}</div>
          ))}
        </div>
      </div>
    );
  };

  const initialValues = {
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleOnChange = () => {
    setError("");
  };

  return (
    <Form
      name="reset_password_form"
      initialValues={initialValues}
      form={form}
      onChange={handleOnChange}
      onFinish={onSubmit}
      className="resetPasswordForm"
    >
      {/* <img src={threeILogo} alt="logo" className="formLogo" /> */}
      <Logo logo={threeILogo} altLogo={""} logoSize={"medium"} className={"formLogo"} />
      <div className="heading">{CONSTANTS.forgotPasswordForm.form.heading}</div>

      <div
        className="smallText"
        style={{
          marginBottom: 24,
          maxWidth: "33.33333vw",
          fontSize: "16px",
          lineHeight: "22px",
        }}
      >
        {CONSTANTS.forgotPasswordForm.forSubHeading}
        {isShowTimer ? (
          <span>in {seconds} seconds</span>
        ) : (
          <span>
            now.
            <span className="resetPasswordResentOTP" onClick={handleResendOTP}>
              Resend OTP
            </span>
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="otp" className="fieldLabel">
          {CONSTANTS.forgotPasswordForm.resetOTPInputLabel}
        </label>
        <Form.Item name="otp" rules={formRules.otp}>
          <Input id="otp" className="fieldInput" type="text" />
        </Form.Item>
      </div>
      <div className="field">
        <label htmlFor="newPassword" className="fieldLabel">
          {CONSTANTS.forgotPasswordForm.newPasswordInputLabel}
        </label>
        <Form.Item name="newPassword" rules={formRules.newpaswd}>
          <Input.Password id="newPassword" className="fieldInput" />
        </Form.Item>
        {passwordPolicyInfo && passwordPolicyInfo !== "" && (
          <Popover
            content={policyContent(passwordPolicyInfo)}
            placement="bottomLeft"
            className="passwordPolicyInfoIcon"
            overlayClassName="passwordPolicyPopup"
          >
            <FontAwesomeIcon
              icon={faExclamationCircle}
              style={{ color: "#007984", marginRight: 8 }}
            />
          </Popover>
        )}
      </div>
      <div className="field">
        <label htmlFor="confirmPassword" className="fieldLabel">
          {CONSTANTS.forgotPasswordForm.confirmPasswordInputLabel}
        </label>
        <Form.Item
          name="confirmPassword"
          className="field"
          rules={formRules.confirmpaswd}
        >
          <Input.Password id="confirmPassword" className="fieldInput" />
        </Form.Item>
      </div>
      {error && <div>{error}</div>}
      <Button
        type="primary"
        htmlType="submit"
        className="submitBtn"
        disabled={loading}
      >
        Confirm
      </Button>
    </Form>
  );
};

const PasswordResetSuccessScreen = () => {
  const buttonsArray = [
    { buttonId: "1", buttonTitle: CONSTANTS.forgotPasswordForm.resetGoToSignInButtonLabel, navigationLink: "/login", type: "primary" },
  ];
  return (
    <div className="resetSuccessScreen">
      <Logo logo={threeILogo} altLogo={""} logoSize={"medium"} className={"logo"} />
      {/* <div className="completionMessage"> altLogo={"three-i"} 
        <img src={assets.common.successTick} alt="tick" className="tick" />
        <div className="text">
          {CONSTANTS.forgotPasswordForm.resetSuccessMessage}
        </div>
        <div className="smallText">
          {CONSTANTS.forgotPasswordForm.resetSuccessSignInInfo}
        </div>
        <Button className="backToSignInBtn">
          <NavLink to="/login">
            {CONSTANTS.forgotPasswordForm.resetGoToSignInButtonLabel}
          </NavLink>headerText, descriptionText, navigationLink, buttonText,
        </Button>
      </div> */}
      <MessageScreen
        imgSrc={assets.common.successTick}
        headerText={CONSTANTS.forgotPasswordForm.resetSuccessMessage}
        descriptionText={CONSTANTS.forgotPasswordForm.resetSuccessSignInInfo}
        buttonsArray={buttonsArray}
      />

    </div>
  );
};

const ResetPasswordScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { forgotPasswordFormControlStructure } = props;
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const forgotPasswordFormRules =
    forgotPasswordFormControlStructure !== "" &&
    createValidators(forgotPasswordFormControlStructure, form);
  const onSubmit = (values) => {
    setLoading(true);
    // api call
    resetPasswordApi({
      userId: localStorage.getItem("uid"),
      ...values,
    })
      .then((response) => {
        if (response.data.success) {
          setSuccess(true);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <React.Fragment>
      {success ? (
        <PasswordResetSuccessScreen />
      ) : (
        <ResetPasswordForm
          loading={loading}
          onSubmit={onSubmit}
          formRules={forgotPasswordFormRules}
          form={form}
          error={error}
          setError={setError}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    forgotPasswordFormControlStructure:
      state.controlStructure.forgotPasswordForm,
  };
};

export default connect(mapStateToProps)(ResetPasswordScreen);

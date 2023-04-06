import React, { useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useHistory } from "react-router-dom";
import { CONSTANTS } from "../../constants/constants";
import threeILogo from "../../assets/img/logos/logo.gif";
import "./forgotPasswordScreen.scss";
import { executeGetControlStructure } from "../../redux/actions/controlStructureActions";
import { connect } from "react-redux";
import { createValidators } from "../../utils/utils";
import { forgotPasswordApi } from "../../api/authApi";
import Logo from "../../components/Logo/Logo";

const initialValues = {
  userId: "",
  email: "",
};

const ForgotPasswordScreen = (props) => {
  const {
    forgotPasswordFormControlStructure,
    executeGetControlStructure,
  } = props;

  // fetching control structure
  useEffect(() => {
    executeGetControlStructure(CONSTANTS.progNames.FORGOTPASSWORD);
  }, []);

  const history = useHistory();
  const [form] = Form.useForm();
  const forgotPasswordFormRules =
    forgotPasswordFormControlStructure !== "" &&
    createValidators(forgotPasswordFormControlStructure, form);

  const onSubmit = (values) => {
    localStorage.setItem("uid", values.userId);
    // api call
    forgotPasswordApi(values)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    history.push("/resetPassword");
  };
  return (
    <React.Fragment>
      <Form
        form={form}
        name="forgot_password_form"
        initialValues={initialValues}
        onFinish={onSubmit}
        className="forgotPasswordForm"
      >
        {/* <img src={threeILogo} alt="logo" className="formLogo" /> */}
        <Logo logo={threeILogo} altLogo={""} logoSize={"medium"} logoClassName={"newFormLogo"} />
        <div className="heading">{CONSTANTS.forgotPasswordForm.heading}</div>
        <div className="field">
          <label htmlFor="userId" className="fieldLabel">
            {CONSTANTS.forgotPasswordForm.userIdInputLabel}
          </label>
          <Form.Item name="userId" rules={forgotPasswordFormRules.userid}>
            <Input className="fieldInput" type="text" />
          </Form.Item>
        </div>
        <div className="field">
          <label htmlFor="email" className="fieldLabel">
            {CONSTANTS.forgotPasswordForm.emailInputLabel}
          </label>
          <Form.Item name="email" rules={forgotPasswordFormRules.emailid}>
            <Input type="email" className="fieldInput" />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" className="submitBtn">
          {CONSTANTS.forgotPasswordForm.submitBtn}
        </Button>
        <div className="smallText">
          {CONSTANTS.forgotPasswordForm.smallText}
        </div>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    forgotPasswordFormControlStructure:
      state.controlStructure.forgotPasswordForm,
  };
};
const mapDispatchToProps = {
  executeGetControlStructure,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);

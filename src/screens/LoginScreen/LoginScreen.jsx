import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import OtpRequestForm from "../../components/OtpRequestForm/OtpRequestForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import {
  executeLogin,
  executeLogout,
  executeOtpVerification,
} from "../../redux/actions/authActions";

import "./loginScreen.scss";

function LoginScreen(props) {
  const { auth, executeLogin, executeOtpVerification, executeLogout } = props;
  const history = useHistory();
  const { url } = useRouteMatch();
  const [loginCredsEntered, setLoginCredsEntered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (
      window.location.pathname.includes("twoFactorAuthentication") &&
      auth === ""
    ) {
      executeLogout(history, "clear");
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (auth && (!auth.user.token || !sessionStorage.getItem("token"))) {
      // executeLogout(history, "clear");
      // history.push("/login");
    }
    if (auth && auth.user && auth.user.success) {
      setLoginCredsEntered(true);
      // auth.user.authenticateType === "OTP"
      // ? history.push(`${url}/twoFactorAuthentication`)
      // : history.push("/dashboard");
      auth.user.token && history.push("/dashboard");
    }
  }, [auth]);

  const handleUserLogin = (authData) => {
    if (authData.remember) {
      window.localStorage.setItem("remember", true);
      window.localStorage.setItem("uid", authData.userId);
    } else {
      window.localStorage.getItem("remember") &&
        window.localStorage.removeItem("remember");
      window.localStorage.getItem("uid") &&
        window.localStorage.removeItem("uid");
    }
    executeLogin(authData, setErrorMsg);
  };

  const handleVerifyOtp = (values) => {
    if (auth && auth.user !== "") {
      executeOtpVerification(
        { ...values, userId: auth.user.userID },
        setErrorMsg
      );
    }
  };
  return (
    <React.Fragment>
      {window.location.pathname.includes("twoFactorAuthentication") &&
      loginCredsEntered ? (
        <OtpRequestForm
          onSubmit={handleVerifyOtp}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      ) : (
        <LoginForm
          onSubmit={handleUserLogin}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return { auth: (state && state.auth) || {} };
};
const mapDispatchToProps = {
  executeLogin,
  executeOtpVerification,
  executeLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

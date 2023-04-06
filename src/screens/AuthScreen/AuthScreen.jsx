import React from "react";
import LoginScreen from "../LoginScreen/LoginScreen";
import "./authScreen.scss";
import manSittingOnCouch from "../../assets/img/authScreen/manSittingOnCouch.svg";
import ForgotPasswordScreen from "../ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "../ResetPasswordScreen/ResetPasswordScreen";
import SessionExpiryScreen from "../SessionExpiryScreen/SessionExpiryScreen";
import NoInternetConnectionScreen from "../NoInternetConnectionScreen/NoInternetConnectionScreen";
// import FooterComponent from "../../components/FooterComponent/FooterComponent";

function AuthScreen(props) {
	const { screen } = props;
	return (
		<React.Fragment>
			<div className="leftPane">
				<img src={manSittingOnCouch} alt="logo" width={"100%"} />
			</div>
			<div className="authScreenSection">
				{screen === "login" && <LoginScreen />}
				{screen === "forgotPassword" && <ForgotPasswordScreen />}
				{screen === "resetPassword" && <ResetPasswordScreen />}
				{screen === "sessionExpiry" && <SessionExpiryScreen />}
				{screen === "noInternet" && <NoInternetConnectionScreen />}
			</div>
			{/* <FooterComponent /> */}
		</React.Fragment>
	);
}
// const mapStateTo= () => {};

// const mapDispatchToProps = () => {};
// export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
export default AuthScreen;

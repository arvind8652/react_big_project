import {
	USER_LOGIN_SUCCESS,
	USER_OTP_VERIFY_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGOUT_SUCCESS,
	SET_LOGIN_FORM_CS,
	SET_FORGOT_PASSWORD_FORM_CS
} from './actionTypes';
import { loginApi, logoutApi, verifyOtpApi } from '../../api/authApi';
import { clearLocalStorage } from '../../utils/utils';
import dynamicConfig from '../../config/dynamicConfig';

const userLoginSuccess = (payload) => {
	return { type: USER_LOGIN_SUCCESS, payload: payload };
};

const userLoginFailure = (payload) => {
	return { type: USER_LOGIN_FAILURE, payload: payload };
};

const userOtpVerifySuccess = (payload) => {
	return { type: USER_OTP_VERIFY_SUCCESS, payload: payload };
};

const userLogoutSuccess = () => {
	// store.dispatch({ type: USER_LOGOUT_SUCCESS });
	return { type: USER_LOGOUT_SUCCESS };
};

// Export funtions
export const executeLogin = (authData, setErrorMsg) => {
	return (dispatch) => {
		setErrorMsg('');
		authData.remember && sessionStorage.setItem('uid', authData.userId);
		loginApi(authData)
			.then((res) => {
				sessionStorage.setItem('userID', res.data.userID);
				sessionStorage.setItem('prevDate', res.data.prevDate);
				sessionStorage.setItem('curDate', res.data.curDate);
				sessionStorage.setItem('rmYN', res.data.rmYN);
				if (res.data.success) {
					res.data.token && sessionStorage.setItem('token', res.data.token);
					if (res.data.authenticateType === 'OTP') {
						window.history.pushState({}, null, '/login/twoFactorAuthentication');
					}
					dispatch(userLoginSuccess({ ...res.data, isSSO: false }));
				} else {
					setErrorMsg(res.data.message);
					dispatch(userLoginFailure(res.data.message));
				}
			})
			.catch((error) => {
				setErrorMsg('Unexpected error occured, please try again later. ');
				dispatch(userLoginFailure(error));
			});
	};
};

export const executeOtpVerification = (data, setErrorMsg) => {
	return (dispatch) => {
		setErrorMsg('');
		verifyOtpApi(data)
			.then((res) => {
				if (res.data.success) {
					res.data.token && sessionStorage.setItem('token', res.data.token);
					dispatch(userOtpVerifySuccess(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
				setErrorMsg('Unexpected Error Occured. Please try again later');
			});
	};
};

// export const executeLogout = (history, mode) => {
//   return (dispatch) => {
//     if (mode === "clear") {
//       clearLocalStorage();
//       dispatch(userLogoutSuccess());
//       history.push("/login");
//     } else {
//       logoutApi()
//         .then((response) => {
//           if (response.data.success) {
//             clearLocalStorage();
//             dispatch(userLogoutSuccess());
//             history.push("/login");
//           } else {
//           }
//         })
//         .catch((error) => {
//         });
//     }
//   };
// };

export const executeLogout = (history, mode) => {
	return (dispatch) => {
		if (mode === 'clear') {
			clearLocalStorage();
			dispatch(userLogoutSuccess());
			// window.open(dynamicConfig.mfundUrl, '_self');
			window.open(`${dynamicConfig.mfundUrl}/UserManagement/Login/Login.aspx`, '_self');
		} else {
			logoutApi()
				.then((response) => {
					if (response.data.success) {
						clearLocalStorage();
						dispatch(userLogoutSuccess());
						// history.push('/login');
						// window.open(dynamicConfig.mfundUrl, '_self');
						window.open(`${dynamicConfig.mfundUrl}/UserManagement/Login/Login.aspx`, '_self');
					} else {
						console.error('logout error ', response.data.message);
						history.push('/login');
					}
				})
				.catch((error) => {
					console.error('logout error ', error);
					history.push('/login');
				});
		}
	};
};

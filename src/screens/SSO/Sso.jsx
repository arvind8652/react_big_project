import { Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postSingleSignOn } from '../../api/SSO';
import { USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS } from '../../redux/actions/actionTypes';
import './SSO.scss';

const userLoginSuccess = (payload) => {
	return { type: USER_LOGIN_SUCCESS, payload: payload };
};

const userLoginFailure = (payload) => {
	return { type: USER_LOGIN_FAILURE, payload: payload };
};

const SingleSignOn = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		let data = {};
		new URLSearchParams(window.location.search).forEach((value, key) => (data[key] = value));

		postSingleSignOn(data.id, data.Key).then((res) => {
			sessionStorage.setItem('userID', res.data.userID);
			sessionStorage.setItem('prevDate', res.data.prevDate);
			sessionStorage.setItem('curDate', res.data.curDate);
			sessionStorage.setItem('rmYN', res.data.rmYN);
			if (res.data.success) {
				res.data.token && sessionStorage.setItem('token', res.data.token);
				if (res.data.authenticateType === 'OTP') {
					window.history.pushState({}, null, '/login/twoFactorAuthentication');
				}
				dispatch(userLoginSuccess({ ...res.data, isSSO: true, authCode: data.Key }));
			} else {
				dispatch(userLoginFailure(res.data.message));
			}
		});
	}, [dispatch]);

	useEffect(() => {
		if (auth && auth.user && auth.user.success) {
			auth.user.token && history.push('/dashboard');
		}
	}, [auth, history]);

	return (
		<div className='parent'>
			<Spin size='large' className='child' />
		</div>
	);
};

export default SingleSignOn;

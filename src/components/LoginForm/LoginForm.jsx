import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { executeGetControlStructure } from '../../redux/actions/controlStructureActions';
import threeILogo from '../../assets/img/logos/logo.gif';
import { CONSTANTS } from '../../constants/constants';
import { createValidators } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';
import Logo from '../Logo/Logo';
import { LogoSize } from '../../theme';
// import cookie from "react-cookie";

const LoginForm = (props) => {
	const { loginFormControlStructure, executeGetControlStructure, onSubmit, errorMsg, setErrorMsg } =
		props;
	const [form] = Form.useForm();
	const [loginFormData, setLoginFormData] = useState({
		userId: '',
		password: '',
		remember: false
	});
	useEffect(() => {
		executeGetControlStructure(CONSTANTS.progNames.LOGIN_N);
		if (window.localStorage.getItem('remember') === 'true') {
			setLoginFormData({
				...loginFormData,
				userId: window.localStorage.getItem('uid')
			});
		}
	}, []);
	form.setFieldsValue(loginFormData);
	const loginFormRules =
		loginFormControlStructure !== '' && createValidators(loginFormControlStructure, form);

	return (
		<Form
			name='login_form'
			form={form}
			initialValues={loginFormData}
			onValuesChange={(val) => {
				setLoginFormData({ ...loginFormData, ...val });
			}}
			onChange={() => {
				setErrorMsg('');
			}}
			onFinish={onSubmit}
			className='loginForm'
		>
			<Logo
				logo={threeILogo}
				altLogo={''}
				logoSize={LogoSize.medium}
				logoClassName={'newFormLogo'}
			/>
			<div className='heading'>{CONSTANTS.loginForm.formHeading}</div>

			<div className='field'>
				<label htmlFor='userId' className='fieldLabel'>
					{CONSTANTS.loginForm.userIdInputLabel}
				</label>
				<Form.Item name='userId' rules={loginFormRules.userid}>
					<Input
						className='fieldInput'
						type='text'
						value={loginFormData.userId}
						style={
							errorMsg && errorMsg !== ''
								? {
										border: '1px solid #931F2A',
										boxSizing: 'border-box',
										borderradius: 4
								  }
								: {}
						}
					/>
				</Form.Item>
			</div>

			<div className='field'>
				<label htmlFor='password' className='fieldLabel'>
					{CONSTANTS.loginForm.passwordInputLabel}
				</label>
				<NavLink to='/forgotPassword' className='forgotPassword'>
					{CONSTANTS.loginForm.forgotPassword}
				</NavLink>
				<Form.Item name='password' rules={loginFormRules.password}>
					<Input.Password
						className='fieldInput'
						value={loginFormData.password}
						style={
							errorMsg && errorMsg !== ''
								? {
										border: '1px solid #931F2A',
										boxSizing: 'border-box',
										borderradius: 4
								  }
								: {}
						}
					/>
				</Form.Item>
			</div>
			{errorMsg && (
				<div className='errorMsg'>
					<FontAwesomeIcon
						icon={faExclamationCircle}
						style={{ color: '#931f2a', marginRight: 8 }}
					/>
					{errorMsg}
				</div>
			)}
			<Form.Item name='remember' valuePropName='checked'>
				<Checkbox checked={loginFormData.remember}>{CONSTANTS.loginForm.rememberMe}</Checkbox>
			</Form.Item>
			<Button type='primary' htmlType='submit' className='submitBtn'>
				{CONSTANTS.loginForm.signInBtnText}
			</Button>
			<div className='smallText'>{CONSTANTS.loginForm.smallText}</div>
		</Form>
	);
};

const mapStateToProps = (state) => {
	return {
		loginFormControlStructure: state.controlStructure.loginForm
	};
};
const mapDispatchToProps = {
	executeGetControlStructure
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

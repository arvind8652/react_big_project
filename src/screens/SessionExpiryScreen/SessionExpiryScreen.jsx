import React, { useEffect } from 'react';
import { CONSTANTS } from '../../constants/constants';
import threeILogo from '../../assets/img/logos/logo.gif';
import sessionLogo from '../../assets/img/authScreen/sessionExpiry.svg';
import './SessionExpiryScreen.scss';
import Logo from '../../components/Logo/Logo';
import MessageScreen from '../../components/MessageScreenComponent/MessageScreen';
import { useHistory, useLocation } from 'react-router-dom';
import dynamicConfig from '../../config/dynamicConfig';

function SessionExpiryScreen() {
	const buttonsArray = [
		// { buttonId: "1", buttonTitle: CONSTANTS.sessionExpiry.signInButton, navigationLink: "/login", type: "primary" },
		{
			buttonId: '1',
			buttonTitle: CONSTANTS.sessionExpiry.signInButton,
			navigationLink: `${dynamicConfig.mfundUrl}/UserManagement/Login/Login.aspx`,
			type: 'primary'
		}
	];
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		return () => {
			if (history.action === 'POP') {
				history.push('/login');
			}
		};
	}, [location]);

	useEffect(() => {
		// history.push("/login");
	}, []);
	return (
		<div className='resetSuccessScreen'>
			<Logo logo={threeILogo} altLogo={''} logoSize={'medium'} logoClassName={'logo'} />

			<MessageScreen
				imgSrc={sessionLogo}
				headerText={CONSTANTS.sessionExpiry.sessionExpired}
				descriptionText={CONSTANTS.sessionExpiry.expiryMessage}
				buttonsArray={buttonsArray}
				screen={'sessionExpiry'}
			/>
		</div>
	);
}

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (dispatch) => {
// };

export default SessionExpiryScreen;

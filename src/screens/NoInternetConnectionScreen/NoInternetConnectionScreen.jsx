import React from 'react';
import { Button } from 'antd';
import { CONSTANTS } from '../../constants/constants';
import { NavLink } from 'react-router-dom';
import threeILogo from '../../assets/img/logos/3i.svg';
import noInternetConnection from '../../assets/img/authScreen/noInternetConnection.svg';
import './NoInternetConnectionScreen.scss';
import { Offline } from 'react-detect-offline';
import Logo from '../../components/Logo/Logo';
import MessageScreen from '../../components/MessageScreenComponent/MessageScreen';

const NoInternetConnectionScreen = () => {
	const buttonsArray = [
		{
			buttonId: 1,
			buttonTitle: 'Go Back ',
			navigationLink: '',
			type: 'primary'
		},
		{
			buttonId: 2,
			buttonTitle: ' Try again',
			navigationLink: '',
			type: 'text'
		}
	];

	return (
		<div className='no-internet-connection-screen'>
			<Offline>
				{/* <Logo altLogo={"three-i"} logoClassName={"logo"} clickEvent={false} /> */}
				<Logo logo={threeILogo} altLogo={''} logoSize={'medium'} className={'logo'} />
				<div className='no-internet-message'>
					{/* <img
            src={noInternetConnection}
            alt="noInternet"
            className="no-internet"
          />
          <div className="text">
            {CONSTANTS.noInternetConnection.noInternet}
          </div>
          <div className="small-text">
            {CONSTANTS.noInternetConnection.noInternetMessage}
          </div>
          <div className="button-group">
            <Button className="go-back-btn">Go Back </Button>
            <Button type="text" className="try-again-btn">
              Try again
            </Button>
          </div>headerText, descriptionText, navigationLink, buttonText, */}
					<MessageScreen
						imgSrc={noInternetConnection}
						headerText={CONSTANTS.noInternetConnection.noInternet}
						descriptionText={CONSTANTS.noInternetConnection.noInternetMessage}
						noInternet={true}
						buttonsArray={buttonsArray}
					/>
				</div>
			</Offline>
		</div>
	);
};

export default NoInternetConnectionScreen;

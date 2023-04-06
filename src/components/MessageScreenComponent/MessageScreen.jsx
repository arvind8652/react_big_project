import React, { useEffect } from 'react';
import { Button, Row } from 'antd';
import { NavLink } from 'react-router-dom';
import { theme } from '../../theme';
import './MessageScreen.scss';
import { executeLogout } from '../../redux/actions/authActions';

const MessageScreen = ({ imgSrc, headerText, descriptionText, buttonsArray, screen = '' }) => {
	const handleSignOut = () => {
		executeLogout(history, 'logout');
	};
	const backToBackOfficeLogin = (url) => {
		window.open(url, '_self');
		handleSignOut();
	};
	return (
		<div className='completionMessage'>
			<img src={imgSrc} alt={headerText} className='tick' />
			<div className='text'>{headerText}</div>
			<div className={'smallText'}>{descriptionText}</div>
			<div className={buttonsArray.length > 1 ? 'button-group' : 'single-button'}>
				{/* {buttonsArray.map((option) => (
					<Button
						key={option.buttonId}
						size={'large'}
						className={option.type == 'primary' ? 'go-back-btn' : 'try-again-btn'}
					>
						<NavLink to={option.navigationLink}>{option.buttonTitle}</NavLink>
					</Button>
				))} */}
				{screen === 'sessionExpiry'
					? buttonsArray.map((option) => (
							<Button
								key={option.buttonId}
								size={'large'}
								className={option.type == 'primary' ? 'go-back-btn' : 'try-again-btn'}
								onClick={() => backToBackOfficeLogin(option.navigationLink)}
							>
								{option.buttonTitle}
							</Button>
					  ))
					: buttonsArray.map((option) => (
							<Button
								key={option.buttonId}
								size={'large'}
								className={option.type == 'primary' ? 'go-back-btn' : 'try-again-btn'}
							>
								<NavLink to={option.navigationLink}>{option.buttonTitle}</NavLink>
							</Button>
					  ))}
			</div>
		</div>
	);
};

export default MessageScreen;

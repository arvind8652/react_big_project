import React, { useEffect } from 'react';
import { Button, Row } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/pro-regular-svg-icons';
import './TopBarHeader.scss';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const TopBarHeader = ({ headerName, buttonTitle, navigationLink, authorizeCode }) => {
	const history = useHistory();

	return (
		<div className='dashboard-topbar-container'>
			<FontAwesomeIcon
				icon={faChevronLeft}
				className='chevron-left'
				onClick={() => {
					// history.push('/dashboard');
					history.goBack();
				}}
			/>
			<div>{headerName}</div>
			{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.add) && (
				<Button className='topbar-btn'>
					<NavLink to={navigationLink}>
						<FontAwesomeIcon icon={faPlus} className='.add-btn-icon' />
						{` ${buttonTitle}`}
					</NavLink>
				</Button>
			)}
		</div>
	);
};

export default TopBarHeader;

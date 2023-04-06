import React from 'react';
import { Button } from 'antd';
import '../AccountListingScreen.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { authorizeModule } from '../../../utils/utils';
import { CONSTANTS } from '../../../constants/constants';

const RenderTopBar = ({ authorizeCode, loading = false }) => {
	return (
		<div className='dashboard-topbar-container'>
			<div>Accounts</div>
			{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.add) && (
				<Button
					className='topbar-btn'
					style={{ opacity: loading ? '0.5' : '1' }}
					disabled={loading}
				>
					<NavLink to='/dashboard/AccountCreate'>
						<FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
						Add
					</NavLink>
				</Button>
			)}
		</div>
	);
};

export default RenderTopBar;

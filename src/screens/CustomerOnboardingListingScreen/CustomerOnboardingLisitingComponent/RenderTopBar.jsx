import React from 'react';
import { Button } from 'antd';
import '../CustomerOnboardingListingScreen.scss';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { authorizeModule } from '../../../utils/utils';
import { CONSTANTS } from '../../../constants/constants';

const RenderTopBar = ({ authorizeCode, loading = false }) => {
	const history = useHistory();
	return (
		<div className='dashboard-topbar-container'>
			{/* <FontAwesomeIcon icon={faChevronLeft} className='chevron-left' /> */}
			<div>Client Onboarding</div>
			{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.add) && (
				<Button
					style={{ opacity: loading ? '0.5' : '1' }}
					disabled={loading}
					onClick={() => {
						// history.push("/dashboard/MyCustomers/CustomerCreate", { action: 'create' });
						const toObject = {
							pathname: '/dashboard/MyCustomers/CustomerCreate',
							state: { action: 'create', refType: 'CLIENTREQADD' }
						};
						history.push(toObject);
					}}
					className='topbar-btn'
				>
					<FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
					Add
				</Button>
			)}
		</div>
	);
};

export default RenderTopBar;

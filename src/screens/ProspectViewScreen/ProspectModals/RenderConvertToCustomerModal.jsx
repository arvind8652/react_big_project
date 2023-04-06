import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/pro-solid-svg-icons';
import { Button, Modal, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import './Modal.scss';

const { Title } = Typography;
const RenderConvertToCustomerModal = ({
	convertProspectModalOpen,
	setConvertProspectModalOpen,
	prospectViewData,
	prospectViewRefId,
	currentRowCount,
	setMapToExistingCustomer
}) => {
	const history = useHistory();
	const onConvertToClient = () => {
		const toObject = {
			pathname: '/dashboard/MyCustomers/CustomerCreate',
			state: {
				data: prospectViewRefId,
				// mode: 'edit',
				screen: 'list',
				action: 'convert'
			}
		};
		history.push(toObject);
	};
	const onMapToExistingCustomer = () => {
		setMapToExistingCustomer(true);
		setConvertProspectModalOpen(false);
	};
	return (
		<Modal
			centered
			visible={convertProspectModalOpen}
			onCancel={() => setConvertProspectModalOpen(false)}
			onOk={() => setConvertProspectModalOpen(false)}
			footer={null}
			className='convert-to-customer-modal'
			title={
				<div className='modal-header'>
					<FontAwesomeIcon icon={faSyncAlt} size='lg' className='header-icon' />
					<Title level={3} style={{ color: '#354081' }}>
						Convert Prospect
					</Title>
				</div>
			}
		>
			<div className='convert-modal-body'>
				<Button className='submit-btn' key='submit1' type='primary' onClick={onConvertToClient}>
					Convert to Client
				</Button>
				<Button
					className='submit-btn'
					key='submit2'
					type='primary'
					onClick={onMapToExistingCustomer}
				>
					Map to Existing customer
				</Button>
			</div>
		</Modal>
	);
};
export default RenderConvertToCustomerModal;

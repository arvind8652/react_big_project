import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';

const RenderConfirmDeleteModalFO = ({
	showConfirmDeleteModal,
	setShowConfirmDeleteModal = () => {},
	fid,
	rectype,
	deleteAPI = () => {},
	deleteCardName,
	setVisible = () => {}
}) => {
	return (
		<CustomModal visible={showConfirmDeleteModal}>
			<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
				<div className='header-icon'>
					<DeleteFilled style={{ fontSize: '40px' }} />
				</div>
				<div className='header-title'>Delete Goal </div>
			</div>
			<div className='modal-body'>Are you sure you want to delete this {deleteCardName} Goal?</div>
			<div className='modal-footer'>
				<Button
					className='styled-text'
					key='back'
					type='text'
					onClick={() => setShowConfirmDeleteModal(false)}
				>
					Cancel
				</Button>
				<Button
					className='styled-text'
					key='submit'
					type='primary'
					onClick={() => {
						deleteAPI(fid, rectype);
						setShowConfirmDeleteModal(false);
						setVisible(true);
					}}
				>
					Delete
				</Button>
			</div>
		</CustomModal>
	);
};

export default RenderConfirmDeleteModalFO;

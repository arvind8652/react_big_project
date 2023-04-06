import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Card,
	Checkbox,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Typography
} from 'antd';
import { useState } from 'react';
import RelationDetailTable from '../../RelationDetailTable/RelationDetailTableNew';
import { ScButtonText, ScRow } from '../../StyledComponents/genericElements';
import RelationDetailFormModal from '../RelationDetailFormModal/RelationDetailFormModal';
import './relationDetailsFormCard.scss';

const relationDataDefaultVal = {
	isExistingCustomer: true,
	relationName: null,
	relationDob: null,
	relationDialingCode: null,
	relationMobile: null,
	relationEmailId: null,
	relationAddress: null
};

const RelationDetailsFormCard = ({
	form,
	formData,
	formModal,
	onValuesChange,
	rules,
	cs,
	csObject,
	relationFormFrom
}) => {
	const [relationDetailEditingFormData, setRelationDetailEditingFormData] =
		// useState({
		//   isExistingCustomer: true,
		//   relationName: null,
		//   relationDob: null,
		//   relationDialingCode: null,
		//   relationMobile: null,
		//   relationEmailId: null,
		//   relationAddress: null,
		// });
		// useState(relationDataDefaultVal);
		useState();

	const [relationData, setRelationData] = useState({
		isExistingCustomer: true,
		relationName: '',
		relationDob: '',
		relationDialingCode: '',
		relationMobile: '',
		relationEmailId: '',
		relationAddress: ''
	});

	const [showModal, setShowModal] = useState(false);
	const [addButton, setAddButton] = useState(false);
	const toggleShowModal = () => {
		setShowModal(!showModal);
	};

	const addButtonClicked = () => {
		setAddButton(!addButton);
		setRelationDetailEditingFormData();
	};

	const RelationDetailsCardTitle = () => {
		return (
			<ScRow align='middle' justify='space-between'>
				<Col className='ant-card-head-wrapper'>
					<div className='ant-card-head-title'>Relationship Details</div>
				</Col>
				<Col>
					<Form.Item className='addfield'>
						<ScButtonText
							type='text'
							icon={<FontAwesomeIcon icon={faPlus} />}
							onClick={() => {
								toggleShowModal();
								addButtonClicked();
							}}
						>
							&nbsp;Add
						</ScButtonText>
					</Form.Item>
				</Col>
			</ScRow>
		);
	};

	return (
		<>
			<RelationDetailFormModal
				relationEditForm={relationDetailEditingFormData}
				visible={showModal}
				form={form}
				formData={formData}
				formModal={formModal}
				editFormData={relationData}
				addButton={addButton}
				handleOk={(val) => {
					relationDetailEditingFormData && setRelationDetailEditingFormData();
					onValuesChange(val);
					toggleShowModal();
				}}
				onCancel={toggleShowModal}
				cs={cs}
				csObject={csObject}
				rules={rules}
				relationFormFrom={relationFormFrom}
			/>
			{/* <Card title={<RelationDetailsCardTitle />} className='relation-details-form-card'> */}
			<Card
				title='Relationship Details'
				extra={
					<Typography.Title level={5}>
						<Typography.Link
							onClick={() => {
								toggleShowModal();
								addButtonClicked();
							}}
						>
							+ Add
						</Typography.Link>
					</Typography.Title>
				}
				className='relation-details-form-card'
			>
				{formData == undefined
					? ''
					: formData &&
					  formData.relationDetail &&
					  Array.isArray(formData.relationDetail) &&
					  formData.relationDetail.length > 0 && (
							<>
								<RelationDetailTable
									cs={cs}
									csObject={csObject}
									onValuesChange={onValuesChange}
									toggleShowModal={toggleShowModal}
									setRelationDetailEditingFormData={setRelationDetailEditingFormData}
									dataSourceNew={formData.relationDetail}
									relationFormFrom={relationFormFrom}
								/>
							</>
					  )}
			</Card>
		</>
	);
};

export default RelationDetailsFormCard;

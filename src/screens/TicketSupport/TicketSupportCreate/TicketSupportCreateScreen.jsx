import DashboardScreenTopbar from '../../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import BackToTop from '../../../components/BackToTop/BackToTop';
import { Alert, Button, Form, Space, Spin } from 'antd';
import TicketSupportComponents from './TicketSupportComponents';
import { useEffect, useState } from 'react';
import AttachmentUploadModal from '../../../components/AttachmentPannel/AttachmentUploadModal';
import MiscellaneousFormCard from '../../../components/Forms/MiscellaneousFormCard/MiscellaneousFormCard';
import { useSelector } from 'react-redux';
import { createValidators, generateCsObject } from '../../../utils/utils';
import {
	executeControlStructure,
	executePostTicketSupportData
} from '../../../redux/actions/ticketSupportCreateActions';
import { filterPostData } from './TicketSupportMethods';
import FailModal from '../../../components/Modal/FailModal/FailModal';
import { CONSTANTS } from '../../../constants/constants';

const TicketSupportCreateScreen = (props) => {
	const user = useSelector((state) => state?.auth?.user);
	const controlStructure = useSelector((state) => state?.ticketSupportReducer?.controlStructure);
	const { useForm } = Form;
	const [form] = useForm();
	const [csAvailable, setCsAvailable] = useState(false);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState([]);
	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [requiredFiled, setRequiredFiled] = useState(false);

	const [saveButtonFlag, setSaveButtonFlag] = useState(false);

	const handleFormChange = (values) => {
		// console.log('dfd----', values);
		// console.log('dfd-3---', Object.keys(values)[0]);
		// if (Object.keys(values)[0] === 'USERGROUP') {
		// 	console.log('dfd--1--', values);
		// 	setFormData({ ...formData, ['user_group']: Object.values(values)[0] });
		// } else {
		// 	console.log('dfd--2--', values);
		// 	setFormData({ ...formData, ...values });
		// }
		setFormData({ ...formData, ...values });
	};

	let rules = [];
	let csObject = [];
	csAvailable &&
		controlStructure !== '' &&
		controlStructure.length > 0 &&
		controlStructure.forEach((s, index) => {
			rules[index] = createValidators(s.controlStructureField, form);
			csObject[index] = generateCsObject(s.controlStructureField);
		});

	useEffect(() => {
		executeControlStructure().then((resp) => {
			setCsAvailable(true);
			setLoading(false);
		});
	}, []);

	const handleFailModalOkOrCancel = () => {
		setShowFailModal(false);
		setLoading(false);
	};

	const handleAttachment = (values) => {
		if (!values.attachments) {
			setAttachmentsModalDataArray({
				...attachmentsModalDataArray,
				...values
			});
		}
		if (values.attachments && values.attachments.length > 0) {
			let attachmentsModalData = [];
			values.attachments.map((file) => {
				attachmentsModalData = [
					...attachmentsModalData,
					{
						fileDescription: 'Attachments',
						fileName: file.fileName,
						fileSize: file.fileSize,
						mimeType: file.mimeType,
						fileString: file.fileString,
						attachmentFor: 'Attachments',
						attachedBy: user && user.userName,
						sessionId: file.sessionId
					}
				];
			});
			let finalAttachmentsModalData = [...attachmentsModalDataArray];
			if (values?.operation && values?.operation === 'delete') {
				finalAttachmentsModalData = [];
			}
			attachmentsModalData.forEach((file) => {
				finalAttachmentsModalData = [...finalAttachmentsModalData, file];
			});
			setAttachmentsModalDataArray(finalAttachmentsModalData);
		}
		if (
			values?.operation &&
			values?.operation === 'delete' &&
			values?.attachments &&
			values?.attachments?.length === 0
		) {
			setAttachmentsModalDataArray([]);
		}
	};
	useEffect(() => {
		setFormData({ ...formData, attachments: attachmentsModalDataArray });
	}, [attachmentsModalDataArray]);

	const onFinish = () => {
		setSaveButtonFlag(true);
		// executePostTicketSupportData(formData)
		executePostTicketSupportData(filterPostData(formData))
			.then((res) => {
				if (res.data.success) {
					// /setShowSuccessModal(true);
					setLoading(false);
				} else {
					setErrorArray([
						{
							message: res.data.message
						}
					]);
					setShowFailModal(true);
					setLoading(false);
				}
			})
			.catch((err) => {
				console.log('error', err);
				setLoading(false);
			});
	};

	const onFinishFailed = (val, error) => {
		setRequiredFiled(true);
		console.log('onFinishFailed error----', error);
	};
	const onAlertClose = () => {
		setRequiredFiled(false);
	};

	return (
		<>
			<Space
				direction='vertical'
				size={16}
				style={{ marginLeft: '0px !important' }}
				className='parent-form-container'
			>
				<FailModal
					visible={showFailModal}
					onOk={handleFailModalOkOrCancel}
					onCancel={handleFailModalOkOrCancel}
					errorArray={errorArray}
				/>

				<Spin spinning={loading}>
					<Form
						layout='vertical'
						form={form}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						onValuesChange={handleFormChange}
					>
						<DashboardScreenTopbar
							screenText='Create Ticket'
							breadCrumb=''
							cancelBtnText='Cancel'
							submitBtnText='Save'
							// onSubmit={handleFormSubmit}
							RenderSubmit={
								<Form.Item>
									<Button
										type='primary'
										htmlType='submit'
										className='btn submit'
										disabled={saveButtonFlag ?? false}
									>
										Save
									</Button>
								</Form.Item>
							}
							onCancel={() => {
								history.goBack();
							}}
						/>
						{requiredFiled ? (
							<Alert
								message='Error'
								description={CONSTANTS.requiredFieldGenericMessage}
								type='error'
								closable
								onClose={setTimeout(() => {
									onAlertClose();
								}, 5000)}
							/>
						) : (
							''
						)}
						<TicketSupportComponents
							cs={controlStructure}
							formData={formData}
							setFormData={setFormData}
							form={form}
							handleFormChange={handleFormChange}
							rules={rules}
							csObject={csObject}
						/>
						<div style={{ marginTop: '16px' }}>
							<AttachmentUploadModal
								//selectedAccount={{ scheme: location.state?.refID }}
								selectedAccount=''
								isUpload={false}
								type='SERVICETKT'
								onValuesChange={handleAttachment}
								data={attachmentsModalDataArray}
								action='add'
								//action={location?.state?.action}
							/>
						</div>
						{/*<MiscellaneousFormCard />*/}
					</Form>
				</Spin>
			</Space>
			<BackToTop />
		</>
	);
};
export default TicketSupportCreateScreen;

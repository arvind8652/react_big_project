import {
	Card,
	Table,
	Layout,
	Button,
	Typography,
	Col,
	Row,
	Modal,
	Space,
	List,
	Upload,
	Divider,
	Form
} from 'antd';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faPaperclip, faTrashAlt, faUpload } from '@fortawesome/pro-solid-svg-icons';
import '../../screens/ProspectViewScreen/ProspectComponent/CardView.scss';

import CustomModal from '../Modal/CustomModal/CustomModal';
import { downloadAttachment, getDateFormat } from '../../utils/utils';
import { uploadAttachmentApi } from '../../api/customerViewApi';
import CardWithTableView from '../CommonCards/CardWithTableView';
import { getAttchementData } from '../../redux/actions/accountViewAction';
import { executeGetAttachmentDetail } from '../../redux/actions/customerViewActions';
import { CONSTANTS } from '../../constants/constants';
import { beforeUpload } from '../../utils/utils';
const { Text, Link, Title } = Typography;

const AttachmentUploadModal = (props) => {
	const {
		chooseApi = '1',
		data = [],
		isUpload = true,
		type = 'ACCOUNTREQADD',
		buttonTitle = 'Add',
		allCustomerOnboardingData = [],
		authData = '',
		action = '',
		onValuesChange = () => {}
	} = props;
	const [dataSource, setDataSource] = useState(data);

	const [buttonTitleVal, setButtonTitleVal] = useState(buttonTitle);
	const [showAttachAddLink, setShowAttachAddLink] = useState(true);

	useEffect(() => {
		setDataSource(data);
	}, [data]);

	const deleteAttachmentHandler = (dataObject, index) => {
		let updatedData = data.filter((item) => JSON.stringify(item) !== JSON.stringify(dataObject));
		onValuesChange({
			attachments: updatedData,
			operation: 'delete'
		});
	};

	useEffect(() => {
		if (action === 'view') {
			setButtonTitleVal(
				allCustomerOnboardingData?.workFlowFormType === 'Modificaiton' &&
					allCustomerOnboardingData?.workFlowUserGroup === authData
					? buttonTitle
					: ''
			);

			setShowAttachAddLink(
				allCustomerOnboardingData?.workFlowFormType === 'Modificaiton' &&
					allCustomerOnboardingData?.workFlowUserGroup === authData
					? showAttachAddLink
					: false
			);
		}
	}, [action]);

	const downloadAttached = (record) => {
		if (record.id) {
			// downloadAttachment(record, record.id, type, record.refId);
			downloadAttachment(record, record.id, type, props?.selectedAccount?.scheme);
		} else {
			let file = {
				// fileName: record.FileName,
				// mimeType: record.Mimetype,
				// fileString: record.FileString,
				fileName: record.fileName,
				mimeType: record.mimetype,
				fileString: record.fileString
			};
			downloadAttachment(file);
		}
	};
	const ATTACHMENT_COL = [
		{
			title: 'Document Name',
			dataIndex: 'fileName',
			key: 'fileName',
			render: (text, record) => {
				return <a onClick={() => downloadAttached(record)}>{text}</a>;
			}
		},
		{
			title: 'Size',
			dataIndex: 'fileSize',
			key: 'fileSize'
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: (date) => {
				return <>{moment(date).format(getDateFormat())}</>;
			}
		},
		{
			title: 'Uploaded By',
			dataIndex: 'attachedBy',
			key: 'attachedBy'
		}
	];
	let deleteColumn = {
		title: '',
		width: 50,
		dataIndex: '',
		key: 'id',
		render: (id, record, index) => (
			<span>
				<FontAwesomeIcon
					icon={faTrashAlt}
					onClick={() => {
						deleteAttachmentHandler(record, index);
					}}
				/>
			</span>
		)
	};
	// below if condition is temporary added
	if (action !== 'view') {
		ATTACHMENT_COL.push(deleteColumn);
	}
	const [addAttachmentModalVisible, setAddAttachmentModalVisible] = useState(false);

	function updateAttachmentsList() {
		if (chooseApi === '1') {
			if (type === 'CLIENTREQADD') {
				executeGetAttachmentDetail(props?.selectedAccount?.scheme);
			} else {
				getAttchementData(props?.selectedAccount?.scheme);
			}
		}
	}

	if (!props) {
		return null;
	}

	return (
		<>
			<CardWithTableView
				type={type}
				header='Attachments'
				columns={ATTACHMENT_COL}
				data={dataSource}
				// data={data}
				menuFlag={1}
				// use in future
				buttonTitle={action !== 'view' && buttonTitleVal}
				onButtonClick={() => {
					action !== 'view' && showAttachAddLink && setAddAttachmentModalVisible(true);
				}}
			/>
			<RenderAddAttachmentModal
				modal={addAttachmentModalVisible}
				accountObj={props.selectedAccount}
				isUpload={isUpload}
				data={dataSource}
				// data={data}
				updateAttachments={updateAttachmentsList}
				setModal={(val) => setAddAttachmentModalVisible(val)}
				onValuesChange={props.onValuesChange}
			/>
		</>
	);
};

const RenderAddAttachmentModal = (props) => {
	const [errorList, setErrorList] = useState([]);
	const [disableSubmitBtn, setDisableSubmitBtn] = useState({
		disabled: true,
		color: 'grey'
	});

	const [attachments, setAttachments] = useState([]);
	const [showSuccessFailureAttachmentModal, setShowSuccessFailureAttachmentModal] = useState(false);
	const [uploadAttachmentSuccessFailureyMessage, setUploadAttachmentSuccessFailureyMessage] =
		useState('');

	useEffect(() => {
		setDisableSubmitBtn({ disabled: true, color: 'grey' });
	}, []);
	useEffect(() => {
		if (errorList.length > 0) {
			setDisableSubmitBtn({ disabled: false, color: '#354081' });
			errorList.map((data) => {
				if (data === 'File type not supported' || data === 'File size must be smaller than 5MB!') {
					// if (
					//   data === "File type not supported" ||
					//   data === "File size must be smaller than 5MB!" ||
					//   data === "Please try to upload the file again"
					// )
					//  {
					setDisableSubmitBtn({ disabled: true, color: 'grey' });
				} else {
					setAttachments([]);
				}
			});
		}
	}, [errorList]);

	function bytesToSize(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return 'n/a';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		if (i === 0) return bytes + ' ' + sizes[i];
		return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
	}
	const fileRequest = ({ file, onSuccess }) => {
		let base = new FileReader();
		base.readAsDataURL(file);
		base.onload = (e) => {
			let attachment = {
				refType: props?.accountObj?.refType,
				refId: props?.accountObj?.scheme,
				fileDescription: file.name,
				fileName: file.name,
				fileSize: bytesToSize(file.size),
				fileType: file.type,
				mimetype: file.type,
				// fileString: e.target.result,
				fileString: e.target.result && e.target.result.split(',')[1],
				sessionId: ''
			};
			if (
				attachments.every(({ FileName }) => FileName != attachment.FileName) &&
				props.data.every(({ fileName }) => fileName != attachment.FileName)
			) {
				setAttachments([...attachments, attachment]);
			}
		};
		setTimeout(() => {
			onSuccess('ok');
		}, 1000);
	};

	const handleSuccessFailureUploadAttachmentModalOk = () => {
		props.setModal(false);
		setShowSuccessFailureAttachmentModal(false);
		props.updateAttachments();
	};

	const RenderUploadAttachmentSuccessFailureModal = () => {
		return (
			<CustomModal
				visible={showSuccessFailureAttachmentModal}
				handleOk={handleSuccessFailureUploadAttachmentModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Upload Status</div>
				</div>
				<div className='modal-body'>{uploadAttachmentSuccessFailureyMessage}</div>
				<div className='modal-footer'>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleSuccessFailureUploadAttachmentModalOk}
					>
						OK
					</Button>
				</div>
			</CustomModal>
		);
	};

	function handleUploadAttachments() {
		uploadAttachmentApi(attachments).then((res) => {
			setShowSuccessFailureAttachmentModal(true);
			setUploadAttachmentSuccessFailureyMessage(
				res.data === true ? 'Uploaded Successfully' : 'Upload Failed'
			);
			res.data && setAttachments([]);
		});
		setDisableSubmitBtn({ disabled: true, color: 'grey' });
		setErrorList([]);
	}

	const handleAttachmentsList = () => {
		props.setModal(false);
		props.onValuesChange({ attachments: attachments });
		setAttachments([]);
		setDisableSubmitBtn({ disabled: true, color: 'grey' });
		setErrorList([]);
	};

	const beforUploadHandler = (fileType) => {
		let result = true;
		if (CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes.split(',').includes(fileType)) {
			// setAllowUploadBtn(false)
			result = false;
		}
		return result;
	};

	return (
		<>
			<RenderUploadAttachmentSuccessFailureModal />
			<Modal
				centered
				visible={props.modal}
				onCancel={() => props.setModal(false)}
				footer={null}
				className='update-stage-modal'
				width={900}
			>
				<div>
					<Title level={2} style={{ color: '#354081' }}>
						<FontAwesomeIcon icon={faPaperclip} size='lg' style={{ marginRight: '15px' }} />
						Attach Files
					</Title>
					<Divider />
					<Row>
						<Col span={16} style={{ padding: '10px', marginBottom: '10px' }}>
							<Form.Item noStyle>
								<Upload.Dragger
									customRequest={fileRequest}
									// showPreview={true}
									accept={CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes}
									beforeUpload={(file) => {
										beforeUpload(
											file,
											setErrorList,
											CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes
										);
									}}
									multiple={false}
									style={{
										borderRadius: '15px',
										padding: '12px 0',
										background: '#f6f7fb'
									}}
								>
									<p
										className='ant-upload-drag-icon'
										style={{
											color: '#939DD4'
										}}
									>
										<FontAwesomeIcon
											icon={faUpload}
											style={{
												color: '#939DD4'
											}}
										/>
									</p>
									<p className='ant-upload-link'>
										Drag and Drop a File
										<br />
										or
									</p>
									<p
										className='ant-upload-link'
										style={{
											textDecoration: 'underline',
											fontWeight: '600'
										}}
									>
										Upload Files
									</p>
								</Upload.Dragger>
							</Form.Item>
						</Col>
						<Col span={8} style={{ padding: '5px' }}>
							<div className='attached-files'>
								{attachments.length ? (
									<List
										dataSource={attachments}
										renderItem={(item, index) => (
											<List.Item>
												{/* <Text>{item.FileName}</Text> */}
												<Text>{item.fileName}</Text>
												<Link
													onClick={() => {
														var x = attachments;
														x.splice(index, 1);
														setAttachments([...x]);
													}}
												>
													<FontAwesomeIcon icon={faTrashAlt} size='sm' />
												</Link>
											</List.Item>
										)}
									/>
								) : (
									'No File Found'
								)}
							</div>
						</Col>
						<Col style={{ marginLeft: 'auto' }}>
							<Space>
								<Button
									type='text'
									size='middle'
									onClick={() => {
										props.setModal(false);
										setAttachments([]);
										setDisableSubmitBtn({ disabled: true, color: 'grey' });
										setErrorList([]);
									}}
								>
									Cancel
								</Button>
								<Button
									style={{
										borderRadius: '10px',
										background: '#354081',
										color: 'white'
									}}
									size='middle'
									onClick={props.isUpload ? handleUploadAttachments : handleAttachmentsList}
									// disabled={attachments.length === 0 ? true : false}
									disabled={disableSubmitBtn.disabled}
								>
									Upload
								</Button>
							</Space>
						</Col>
					</Row>
					{errorList.length > 0 && (
						<Row>
							<Col>
								{errorList.map((error) => (
									<>
										<Row>{error}</Row>
									</>
								))}
							</Col>
						</Row>
					)}
				</div>
			</Modal>
		</>
	);
};

export default AttachmentUploadModal;

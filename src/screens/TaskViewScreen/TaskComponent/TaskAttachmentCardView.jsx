import { Card, Table, Layout, Button, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadTaskAttachmentApi, getTaskAttachmentDetailApi } from '../../../api/taskViewApi';
import { downloadAttachment, getDateFormat } from '../../../utils/utils';
import moment from 'moment';
import { useState } from 'react';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import CustomModal from '../../../components/Modal/CustomModal/CustomModal';
import { faPaperclip, faTrashAlt, faUpload } from '@fortawesome/pro-solid-svg-icons';
import { Col, Row, Modal, Space, List, Upload, Divider, Form } from 'antd';
import { CONSTANTS } from '../../../constants/constants';
import '../TaskViewScreen.scss';
const { Text, Link, Title } = Typography;

const { Content } = Layout;

const TaskAttachmentsCardView = (props) => {
	const [dataSource, setDataSource] = useState(props.data);

	const columns = [
		{
			title: 'Document Name',
			dataIndex: 'fileName',
			key: 'fileName',
			render: (fileName) => <a>{fileName}</a>
		},
		{
			title: 'Size',
			dataIndex: 'size',
			key: 'size'
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

	const [addTaskAttachmentModalVisible, setAddTaskAttachmentModalVisible] = useState(false);

	function updateTaskAttachmentsList() {
		getTaskAttachmentDetailApi(props.taskId).then((res) => {
			setDataSource(res.data);
		});
	}

	if (!props) {
		return null;
	}

	return (
		<>
			<Card
				bordered={false}
				title='Attachments'
				// extra={
				//   <Button type="text" style={{ color: "#354081" }} onClick={() => setAddTaskAttachmentModalVisible(true)}>
				//     Add <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
				//   </Button>
				// }
				style={{ width: '100%', marginTop: '15px', marginBottom: '15px' }}
				className='taskViewCardDetail'
			>
				<Content>
					{dataSource.length === 0 ? (
						<Text>No Records Found</Text>
					) : (
						<Table
							className='tables'
							onRow={(record, rowIndex) => {
								return {
									onClick: () => {
										downloadAttachment(record.id, CONSTANTS.progNames.TASKADD, props.taskId);
									}
								};
							}}
							dataSource={dataSource}
							columns={columns}
							scroll={{ y: 150 }}
							pagination={false}
						/>
					)}
				</Content>
			</Card>
			<RenderAddAttachmentModal
				modal={addTaskAttachmentModalVisible}
				taskId={props.taskId}
				updateTaskAttachments={updateTaskAttachmentsList}
				setModal={(val) => setAddTaskAttachmentModalVisible(val)}
			/>
		</>
	);
};

const RenderAddAttachmentModal = (props) => {
	const [attachments, setAttachments] = useState([]);
	const [showSuccessFailureAttachmentModal, setShowSuccessFailureAttachmentModal] = useState(false);
	const [uploadAttachmentSuccessFailureyMessage, setUploadAttachmentSuccessFailureyMessage] =
		useState('');
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
				RefType: 'TASKADD',
				RefId: props.taskId,
				FileDescription: file.name,
				FileName: file.name,
				FileSize: bytesToSize(file.size),
				Mimetype: file.type,
				FileString: e.target.result,
				SessionId: ''
			};
			setAttachments([...attachments, attachment]);
		};
		setTimeout(() => {
			onSuccess('ok');
		}, 1000);
	};

	const handleSuccessFailureUploadAttachmentModalOk = () => {
		props.setModal(false);
		setShowSuccessFailureAttachmentModal(false);
		props.updateTaskAttachments();
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
		uploadTaskAttachmentApi(attachments).then((res) => {
			setShowSuccessFailureAttachmentModal(true);
			setUploadAttachmentSuccessFailureyMessage(
				res.data === true ? 'Upload Successfull' : 'Upload Failed'
			);
			res.data && setAttachments([]);
		});
	}

	return (
		<>
			<RenderUploadAttachmentSuccessFailureModal />
			<Modal
				centered
				visible={props.modal}
				onCancel={() => props.setModal(false)}
				footer={null}
				className='taskUpdate-stage-modal'
				width={900}
			>
				<div>
					<Title level={3} style={{ color: '#354081' }}>
						<FontAwesomeIcon icon={faPaperclip} size='large' style={{ marginRight: '15px' }} />
						Attach Files
					</Title>
					<Divider />
					<Row>
						<Col span={16} style={{ padding: '10px', marginBottom: '10px' }}>
							<Form.Item noStyle>
								<Upload.Dragger
									customRequest={fileRequest}
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
							<div className='taskAttached-files'>
								{attachments.length ? (
									<List
										dataSource={attachments}
										renderItem={(item, index) => (
											<List.Item>
												<Text>{item.FileName}</Text>
												<Link
													onClick={() => {
														var x = attachments;
														x.splice(index, 1);
														setAttachments([...x]);
													}}
												>
													<FontAwesomeIcon icon={faTrashAlt} size='middle' />
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
								<Button type='text' size='middle' onClick={() => props.setModal(false)}>
									Cancel
								</Button>
								<Button
									style={{
										borderRadius: '10px',
										background: '#354081',
										color: 'white'
									}}
									size='middle'
									onClick={handleUploadAttachments}
									disabled={attachments.length === 0 ? true : false}
								>
									Upload
								</Button>
							</Space>
						</Col>
					</Row>
				</div>
			</Modal>
		</>
	);
};

export default TaskAttachmentsCardView;

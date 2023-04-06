import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
	getOpportunityViewApi,
	deleteOpportunityApi,
	uploadAttachmentApi,
	getProbablityByStageApi,
	updateOpportunityStageDetailApi,
	getOpportunityDependentDataApi,
	downloadAttachmentApi,
	getAttachmentDetailApi
} from '../../api/opportunityViewApi';
import { getDateFormat } from '../../utils/utils';
import { Button, Card, Col, Divider, Row, Space, Upload, Form, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPlus, faTrashAlt, faUpload } from '@fortawesome/pro-light-svg-icons';
import { Content } from 'antd/lib/layout/layout';
import AttachmentListTable from '../../components/AttachmentListTable/AttachmentListTable';
import Modal from 'antd/lib/modal/Modal';
import Title from 'antd/lib/skeleton/Title';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
// import Form, { List } from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';
import InteractionAttachmentListTable from './interactionAttachmentListTable';

const InteractionAttachmentsForm = (props) => {
	const [dataSource, setDataSource] = useState(props.attachments);

	useEffect(() => {
		setDataSource(props.attachments);
	}, [props.attachments]);

	const [addAttachmentModalVisible, setAddAttachmentModalVisible] = useState(false);

	function updateAttachmentsList() {
		getAttachmentDetailApi(props.opportunityId).then((res) => {
			setDataSource(res.data);
		});
	}
	if (!props.attachments) {
		return null;
	}

	return (
		<>
			<Card
				className='opportunityViewCardDetail'
				bordered={false}
				title='Attachments'
				extra={
					<Button
						type='text'
						style={{ color: '#354081', fontSize: '16px' }}
						onClick={() => setAddAttachmentModalVisible(true)}
					>
						Add <FontAwesomeIcon icon={faPlus} style={{ marginLeft: '5px' }} />
					</Button>
				}
				style={{ width: '100%', marginTop: '15px', marginBottom: '15px' }}
			>
				<Content>
					<InteractionAttachmentListTable
						opportunityId={props.opportunityId}
						dataSource={dataSource}
					/>
				</Content>
			</Card>
			<RenderAddAttachmentModal
				modal={addAttachmentModalVisible}
				setDataSource={setDataSource}
				_setAttachments={props._setAttachments}
				opportunityId={props.opportunityId}
				updateAttachments={updateAttachmentsList}
				setModal={(val) => setAddAttachmentModalVisible(val)}
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
				RefType: 'OPPORTUNITYADD',
				RefId: props.opportunityId,
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
		props.setDataSource(attachments);
		props.setModal(false);
		props._setAttachments(attachments);
	}

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
					<Title level={3} style={{ color: '#354081' }}>
						<FontAwesomeIcon icon={faPaperclip} size='large' style={{ marginRight: '15px' }} />
						Attach Files
					</Title>
					<Divider />
					<Row>
						<Col span={16} style={{ padding: '10px', marginBottom: '10px' }}>
							<Form.Item>
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
							<div className='attached-files'>
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
									disabled={attachments.length === 0 ? true : false}
									size='middle'
									onClick={handleUploadAttachments}
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

export default InteractionAttachmentsForm;

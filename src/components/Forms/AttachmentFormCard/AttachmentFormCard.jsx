import { useEffect, useState } from 'react';
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { faUpload } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Form, message, Row, Upload, Typography } from 'antd';
import styled from 'styled-components';
import { CONSTANTS } from '../../../constants/constants';
import { downloadAttachment, dummyRequest, beforeUpload } from '../../../utils/utils';
import {
	ScButtonPrimary,
	ScButtonText,
	ScCard,
	ScModal,
	ScRow
} from '../../StyledComponents/genericElements';
import './attachmentFormCard.scss';
import AttachmentListTable from '../../AttachmentListTable/AttachmentListTable';

const UploadListItem = styled(Row)`
	width: 98%;
	background: #f6f7fb;
	margin: 0 0 10px 0;
	padding: 10px 5px 10px 10px;
	border-radius: 8px;
	font-family: Open Sans;
	line-height: 25px;
	color: #696a91;
`;

const ScUploadDragger = styled(Upload.Dragger)`
	min-width: 75px;
	background: #f6f7fb !important;
	border: 1px solid #cbd6ff;
	box-sizing: border-box;
	border-radius: 4px !important;
	.ant-upload-hint {
		text-decoration: underline;
		font-weight: 600;
		color: #354081;
	}
`;
// transform: matrix(1, 0, 0, -1, 0, 0);
const AttachmentFormModal = ({
	form,
	formData,
	onValuesChange,
	removeAttachment,
	showModal,
	toggleShowModal
}) => {
	const [filenames, setFilenames] = useState([]);
	const [errorList, setErrorList] = useState([]);
	useEffect(() => {
		console.log('UPLOAD ERROR LIST: ', errorList);
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
				RefType: 'CLIENTADD',
				RefId: null,
				FileDescription: file.name,
				FileName: file.name,
				FileSize: bytesToSize(file.size),
				Mimetype: file.type,
				FileString: e.target.result,
				AttachmentFor: file.name,
				SessionId: ''
			};
			setFilenames([...filenames, attachment]);
		};
		setTimeout(() => {
			onSuccess('ok');
		}, 1000);
	};

	return (
		<ScModal
			title='Attach Files'
			visible={showModal}
			footer={[
				<ScButtonText
					type='text'
					key='back'
					onClick={() => {
						onValuesChange({ attachments: [] });
						toggleShowModal();
					}}
				>
					Cancel
				</ScButtonText>,
				<ScButtonPrimary
					htmlType='submit'
					key='submit'
					type='primary'
					onClick={() => {
						toggleShowModal();
					}}
				>
					Submit
				</ScButtonPrimary>
			]}
			width='75vw'
			closable={false}
			centered
		>
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Row align='top' justify='space-between' style={{ width: '100%' }}>
					<Col span={16}>
						<Form.Item
							name='attachments'
							validateTrigger={['onChange', 'onBlur']}
							// rules={[{ required: true, message: "Required" }]}
							style={{ display: 'flex' }}
							noStyle
						>
							<ScUploadDragger
								name='files'
								accept={CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes}
								beforeUpload={(file) => {
									beforeUpload(
										file,
										setErrorList,
										CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes
									);
								}}
								customRequest={fileRequest}
								showUploadList={false}
								fileList={formData.fileList}
								multiple
							>
								<p className='ant-upload-drag-icon'>
									<FontAwesomeIcon icon={faUpload} size='4x' color='#696A91' />
								</p>

								<p className='ant-upload-text'>Drag and Drop files</p>
								<p className='ant-upload-text'>or</p>
								<p className='ant-upload-hint'>Browse Files</p>
							</ScUploadDragger>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Row align='top' style={{ maxHeight: 160 }}>
							<Col span={24} style={{ maxHeight: 160, height: 160, overflowY: 'scroll' }}>
								{formData.attachments &&
								Array.isArray(formData.attachments) &&
								formData.attachments.length > 0 ? (
									formData.attachments.map((atch, idx) => (
										<UploadListItem align='middle' justify='space-between' key={idx}>
											<Col
												span={20}
												onClick={() => {
													downloadAttachment(
														atch.id,
														CONSTANTS.progNames.PROSPECTADD,
														formData.prospectId
													);
												}}
											>
												{atch.fileName}
											</Col>
											<Col span={3}>
												<FontAwesomeIcon
													icon={faTrashAlt}
													onClick={() => {
														removeAttachment(atch.fileName);
													}}
												/>
											</Col>
										</UploadListItem>
									))
								) : (
									<UploadListItem align='middle' justify='space-between'>
										No files added
									</UploadListItem>
								)}
							</Col>
						</Row>
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
			</Form>
		</ScModal>
	);
};
const AttachmentFormCard = ({
	form,
	formData,
	onValuesChange,
	rules,
	removeAttachment,
	csObject,
	id
}) => {
	const [showModal, setShowModal] = useState(false);
	const toggleShowModal = () => {
		setShowModal(!showModal);
	};

	const Add = () => (
		// <ScButtonText
		//   type="text"
		//   color="#354081"
		//   onClick={() => {
		//     toggleShowModal();
		//   }}
		// >
		//   + Add
		// </ScButtonText>
		<Typography.Title level={5}>
			<Typography.Link onClick={() => toggleShowModal()}>+ Add</Typography.Link>
		</Typography.Title>
	);
	return (
		<Card title='Attachments' extra={<Add />} className='attachment-form-card'>
			<AttachmentFormModal
				form={form}
				formData={formData}
				onValuesChange={onValuesChange}
				removeAttachment={removeAttachment}
				showModal={showModal}
				toggleShowModal={toggleShowModal}
			/>
			{formData.attachments &&
				Array.isArray(formData.attachments) &&
				formData.attachments.length > 0 && (
					<AttachmentListTable id={id} dataSource={formData.attachments} />
				)}
		</Card>
	);
};

export default AttachmentFormCard;

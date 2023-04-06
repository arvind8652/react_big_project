import { useEffect, useState } from 'react';
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { faUpload } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Form, message, Row, Upload, Input, Button, notification, Space } from 'antd';
import styled from 'styled-components';
import { CONSTANTS } from '../../constants/constants';
import { downloadAttachment, dummyRequest, beforeUpload } from '../../utils/utils';
import {
	ScButtonPrimary,
	ScButtonText,
	ScCard,
	ScModal,
	ScRow
} from '../StyledComponents/genericElements';
import './CommentBoxCard.scss';

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

const CommentBoxCard = ({
	form,
	formData,
	onValuesChange,
	rules,
	removeAttachment,
	csObject,
	id
}) => {
	const [showModal, setShowModal] = useState(false);
	const [commentText, setCommentText] = useState(null);
	const toggleShowModal = () => {
		setShowModal(!showModal);
	};
	const { TextArea } = Input;

	const onSubmit = () => {
		setCommentText('');
		openNotificationWithIcon('success');
	};

	const openNotificationWithIcon = (type) => {
		notification[type]({
			message: 'Notification',
			description: 'Commented Successfully'
		});
	};

	return (
		<Card title='Comments' className='attachment-form-card'>
			{/* <AttachmentFormModal
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
        )} */}
			<Row gutter={16}>
				<Col className='gutter-row' span={16}>
					<Form.Item name='comments' rules={rules ? rules.remark : []}>
						<TextArea
							rows={4}
							className='text-area-field'
							//   disabled={
							//     mode === "edit" && csObject && csObject.Remark.isKeyColumn
							//   }
							placeholder={CONSTANTS.placeholders.comments}
							onChange={(e) => setCommentText(e.target.value)}
							value={commentText}
						/>
						<Button
							type='primary'
							onClick={() => {
								onSubmit();
								setCommentText('');
							}}
							className='btn submit'
							disabled={!commentText}
						>
							UPDATE
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Card>
	);
};

export default CommentBoxCard;

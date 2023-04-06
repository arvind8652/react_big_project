import {
	Card,
	Table,
	Layout,
	//  Button,
	Typography
} from 'antd';
import { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {uploadAttachmentApi,getAttachmentDetailApi,} from "../../../api/prospectViewApi";
import { getDateFormat, downloadAttachment } from '../../../utils/utils';
import moment from 'moment';
// import { useState } from "react";
// import { faPlus } from "@fortawesome/pro-light-svg-icons";
// import CustomModal from "../../../components/Modal/CustomModal/CustomModal";
// import {
//   faPaperclip,
//   faTrashAlt,
//   faUpload,
// } from "@fortawesome/pro-solid-svg-icons";
// import { Col, Row, Modal, Space, List, Upload, Divider, Form } from "antd";
import { CONSTANTS } from '../../../constants/constants';
// import { beforeUpload } from "../../../utils/utils";
import './CardView.scss';
const {
	Text
	// Link, Title
} = Typography;

const { Content } = Layout;

const AttachmentsCardView = (props) => {
	const [dataSource, setDataSource] = useState(props.data);
	useEffect(() => {
		setDataSource(props.data);
	}, [props.data]);

	const columns = [
		{
			title: 'Document Name',
			dataIndex: 'fileName',
			key: 'fileName',
			render: (fileName) => <a href>{fileName}</a>
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

	// const [addAttachmentModalVisible, setAddAttachmentModalVisible] =
	//   useState(false);

	// function updateAttachmentsList() {
	//   getAttachmentDetailApi(props.refID).then((res) => {
	//     setDataSource(res.data);
	//   });
	// }

	if (!props) {
		return null;
	}

	return (
		<>
			<Card
				bordered={false}
				className='prospectCardDetail'
				title='Attachments'
				// extra={
				//   <Button
				//     type="text"
				//     style={{ color: "#354081", fontSize: "16px" }}
				//     onClick={() => setAddAttachmentModalVisible(true)}
				//   >
				//     Add <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
				//   </Button>
				// }
				style={{ width: '100%' }}
			>
				<Content>
					{dataSource.length === 0 ? (
						<Text>No Records Found</Text>
					) : (
						<Table
							onRow={(record, rowIndex) => {
								return {
									onClick: () => {
										downloadAttachment(record.id, CONSTANTS.progNames.PROSPECTADD, props.refID);
									}
								};
							}}
							dataSource={dataSource}
							columns={columns}
							scroll={{ y: 150 }}
							pagination={false}
							className='prospectViewTable'
						/>
					)}
				</Content>
			</Card>
			{/* <RenderAddAttachmentModal
        modal={addAttachmentModalVisible}
        refID={props.refID}
        updateAttachments={updateAttachmentsList}
        setModal={(val) => setAddAttachmentModalVisible(val)}
      /> */}
		</>
	);
};

// const RenderAddAttachmentModal = (props) => {
//   const [errorList, setErrorList] = useState([]);
//   const [disableSubmitBtn, setDisableSubmitBtn] = useState({
//     disabled: true,
//     color: "grey",
//   });
//   const [attachments, setAttachments] = useState([]);
//   const [reset, setReset] = useState(1);
//   const [
//     showSuccessFailureAttachmentModal,
//     setShowSuccessFailureAttachmentModal,
//   ] = useState(false);
//   const [
//     uploadAttachmentSuccessFailureyMessage,
//     setUploadAttachmentSuccessFailureyMessage,
//   ] = useState("");
//   useEffect(() => {
//     setDisableSubmitBtn({ disabled: true, color: "grey" });
//   }, []);
//   useEffect(() => {
//     if (errorList.length > 0) {
//       setDisableSubmitBtn({ disabled: false, color: "#354081" });
//       errorList.forEach((data) => {
//         if (
//           data === "File type not supported" ||
//           data === "File size must be smaller than 1MB!"
//         ) {
//           setDisableSubmitBtn({ disabled: true, color: "grey" });
//           setReset(reset + 1);
//         }
//       });
//     }
//   }, [errorList]);
//   function bytesToSize(bytes) {
//     var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
//     if (bytes === 0) return "n/a";
//     var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
//     if (i === 0) return bytes + " " + sizes[i];
//     return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
//   }
//   const fileRequest = ({ file, onSuccess }) => {
//     let base = new FileReader();
//     base.readAsDataURL(file);
//     base.onload = (e) => {
//       let attachment = {
//         RefType: "PROSPECTADD",
//         RefId: props.refID,
//         FileDescription: file.name,
//         FileName: file.name,
//         FileSize: bytesToSize(file.size),
//         Mimetype: file.type,
//         FileString: e.target.result,
//         SessionId: "",
//       };
//       setAttachments([...attachments, attachment]);
//     };
//     setTimeout(() => {
//       onSuccess("ok");
//     }, 1000);
//   };

//   const handleSuccessFailureUploadAttachmentModalOk = () => {
//     props.setModal(false);
//     setShowSuccessFailureAttachmentModal(false);
//     props.updateAttachments();
//   };

//   const RenderUploadAttachmentSuccessFailureModal = () => {
//     return (
//       <CustomModal
//         visible={showSuccessFailureAttachmentModal}
//         handleOk={handleSuccessFailureUploadAttachmentModalOk}
//       >
//         <div
//           className="modal-header"
//           style={{ display: "flex", alignItems: "center" }}
//         >
//           <div className="header-icon">
//             <FontAwesomeIcon icon={faTrashAlt} />
//           </div>
//           <div className="header-title">Upload Status</div>
//         </div>
//         <div className="modal-body">
//           {uploadAttachmentSuccessFailureyMessage}
//         </div>
//         <div className="modal-footer">
//           <Button
//             className="submit-btn"
//             key="submit"
//             type="primary"
//             onClick={handleSuccessFailureUploadAttachmentModalOk}
//           >
//             OK
//           </Button>
//         </div>
//       </CustomModal>
//     );
//   };

//   function handleUploadAttachments() {
//     uploadAttachmentApi(attachments).then((res) => {
//       setShowSuccessFailureAttachmentModal(true);
//       setUploadAttachmentSuccessFailureyMessage(
//         res.data === true ? "Uploaded Successfully" : "Upload Failed"
//       );
//       res.data && setAttachments([]);
//     });
//     setDisableSubmitBtn({ disabled: true, color: "grey" });
//     setErrorList([]);
//   }

//   return (
//     <>
//       <RenderUploadAttachmentSuccessFailureModal />
//       <Modal
//         centered
//         visible={props.modal}
//         onCancel={() => props.setModal(false)}
//         footer={null}
//         className="update-stage-modal"
//         width={900}
//       >
//         <div>
//           <Title level={3} style={{ color: "#354081" }}>
//             <FontAwesomeIcon
//               icon={faPaperclip}
//               size="large"
//               style={{ marginRight: "15px" }}
//             />
//             Attach Files
//           </Title>
//           <Divider />
//           <Row>
//             <Col span={16} style={{ padding: "10px", marginBottom: "10px" }}>
//               <Form.Item noStyle>
//                 <Upload.Dragger
//                   customRequest={fileRequest}
//                   accept={
//                     CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes
//                   }
//                   beforeUpload={(file) => {
//                     beforeUpload(
//                       file,
//                       setErrorList,
//                       CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes
//                     );
//                   }}
//                   multiple={false}
//                   style={{
//                     borderRadius: "15px",
//                     padding: "12px 0",
//                     background: "#f6f7fb",
//                   }}
//                 >
//                   <p
//                     className="ant-upload-drag-icon"
//                     style={{
//                       color: "#939DD4",
//                     }}
//                   >
//                     <FontAwesomeIcon
//                       icon={faUpload}
//                       style={{
//                         color: "#939DD4",
//                       }}
//                     />
//                   </p>
//                   <p className="ant-upload-link">
//                     Drag and Drop a File
//                     <br />
//                     or
//                   </p>
//                   <p
//                     className="ant-upload-link"
//                     style={{
//                       textDecoration: "underline",
//                       fontWeight: "600",
//                     }}
//                   >
//                     Upload Files
//                   </p>
//                 </Upload.Dragger>
//               </Form.Item>
//             </Col>
//             <Col span={8} style={{ padding: "5px" }}>
//               <div className="attached-files">
//                 {attachments.length ? (
//                   <List
//                     dataSource={attachments}
//                     renderItem={(item, index) => (
//                       <List.Item>
//                         <Text>{item.FileName}</Text>
//                         <Link
//                           onClick={() => {
//                             var x = attachments;
//                             x.splice(index, 1);
//                             setAttachments([...x]);
//                           }}
//                         >
//                           <FontAwesomeIcon icon={faTrashAlt} size="middle" />
//                         </Link>
//                       </List.Item>
//                     )}
//                   />
//                 ) : (
//                   "No File Found"
//                 )}
//               </div>
//             </Col>
//             <Col style={{ marginLeft: "auto" }}>
//               <Space>
//                 <Button
//                   type="text"
//                   size="middle"
//                   onClick={() => {
//                     props.setModal(false);
//                     setDisableSubmitBtn({ disabled: true, color: "grey" });
//                     setErrorList([]);
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   style={{
//                     borderRadius: "10px",
//                     background: "#354081",
//                     color: "white",
//                   }}
//                   size="middle"
//                   onClick={handleUploadAttachments}
//                   // disabled={attachments.length === 0 ? true : false}
//                   disabled={disableSubmitBtn.disabled}
//                 >
//                   Upload
//                 </Button>
//               </Space>
//             </Col>
//           </Row>
//           {errorList.length > 0 && (
//             <Row>
//               <Col>
//                 {errorList.map((error) => (
//                   <>
//                     <Row>{error}</Row>
//                   </>
//                 ))}
//               </Col>
//             </Row>
//           )}
//         </div>
//       </Modal>
//     </>
//   );
// };

export default AttachmentsCardView;

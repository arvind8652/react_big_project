import React, { useState, useEffect } from "react";
import { faTrashAlt } from "@fortawesome/pro-light-svg-icons";
import { faUpload } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Col, Form, Row, Upload, List } from "antd";
import styled from "styled-components";
import { CONSTANTS } from "../../constants/constants";
import {
  ScButtonPrimary,
  ScButtonText,
  ScModal,
} from "../StyledComponents/genericElements";
import { beforeUpload } from "../../utils/utils";

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

const DocAttachmentDetails = ({
  form,
  formData,
  setModal2Visible = () => {},
  setModal1Visible = () => {},
  isModal2Visible = false,
  selectedUploadIndex = 0,
  setRowData,
  reqObject,
}) => {
  const [errorList, setErrorList] = useState([]);
  const [filenames, setFilenames] = React.useState([]);

  const hideModal2 = () => {
    setModal2Visible((prev) => !prev);
    setModal1Visible((prev) => !prev);
  };

  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) return bytes + " " + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  }

  const fileRequest = ({ file, onSuccess }) => {
    let base = new FileReader();
    base.readAsDataURL(file);
    base.onload = (e) => {
      let attachment = {
        fileDescription: file.name,
        fileName: file.name,
        fileSize: bytesToSize(file.size),
        mimetype: file.type,
        FileType: file.type,
        fileString: e.target.result && e.target.result.split(",")[1],
        attachmentFor: file.name,
        clientID: "",
      };
      // setFilenames([...filenames, attachment]);
      setFilenames([{ ...attachment }]);
    };
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  useEffect(() => {
    if (filenames.length > 0) {
      setRowData((prev) => {
        const newPrev = [...prev];
        newPrev[selectedUploadIndex] = {
          ...newPrev[selectedUploadIndex],
          ...filenames[0],
        };
        return newPrev;
      });

      reqObject.current[selectedUploadIndex] = {
        ...reqObject.current[selectedUploadIndex],
        ...filenames[0],
      };
    }
  }, [filenames]);

  return (
    <ScModal
      title="Attach Files"
      visible={isModal2Visible}
      footer={[
        <ScButtonText
          type="text"
          key="back"
          onClick={() => {
            hideModal2();
          }}
        >
          Cancel
        </ScButtonText>,
        <ScButtonPrimary
          htmlType="submit"
          key="submit"
          type="primary"
          onClick={() => {
            hideModal2();
            setFilenames([]);
          }}
        >
          Submit
        </ScButtonPrimary>,
      ]}
      width="75vw"
      closable={false}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        // onValuesChange={onValuesChange}
      >
        <Row align="top" justify="space-between" style={{ width: "100%" }}>
          <Col span={16}>
            <Form.Item
              name="attachments"
              validateTrigger={["onChange", "onBlur"]}
              // rules={[{ required: true, message: "Required" }]}
              style={{ display: "flex" }}
              noStyle
            >
              <ScUploadDragger
                name="files"
                customRequest={fileRequest}
                accept={CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes}
                beforeUpload={(file) => {
                  beforeUpload(
                    file,
                    setErrorList,
                    CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes
                  );
                }}
                // customRequest={dummyRequest}
                showUploadList={false}
                fileList={[]}
                multiple={false}
              >
                <p className="ant-upload-drag-icon">
                  <FontAwesomeIcon icon={faUpload} size="4x" color="#696A91" />
                </p>

                <p className="ant-upload-text">Drag and Drop files</p>
                <p className="ant-upload-text">or</p>
                <p className="ant-upload-hint">Browse Files</p>
              </ScUploadDragger>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Row align="top" style={{ maxHeight: 160 }}>
              <Col
                span={24}
                style={{ maxHeight: 160, height: 160, overflowY: "scroll" }}
              >
                {filenames.length ? (
                  <List
                    dataSource={filenames}
                    renderItem={(item, index) => (
                      <List.Item>
                        <Typography.Text>{item.fileName}</Typography.Text>
                        <Typography.Link
                          onClick={() => {
                            var x = filenames;
                            x.splice(index, 1);
                            setFilenames([...x]);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            size="1x"
                            color="#696A91"
                          />
                        </Typography.Link>
                      </List.Item>
                    )}
                  />
                ) : (
                  <UploadListItem align="middle" justify="space-between">
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

export default DocAttachmentDetails;

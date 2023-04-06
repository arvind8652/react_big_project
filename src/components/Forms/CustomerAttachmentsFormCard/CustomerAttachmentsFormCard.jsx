import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Form,
  Upload,
  List,
} from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/pro-light-svg-icons";

import "./AttachmentFormCard.scss"
import { beforeUpload } from "../../../utils/utils";
import { CONSTANTS } from "../../../constants/constants";

import {
  getAttachmentsDetails
} from '../../../api/customerCreateApi';

export default function Attachments({
  onValuesChange,
  action,
  customerCode,
  progName,
}) {

  const getDetails = async () => {
    try {
      const response = await getAttachmentsDetails(progName, customerCode);

      setFilenames(response.data)
    } catch (error) {
    }
  };

  useEffect(() => {
    if (action === 'edit') {
      getDetails();
    }
  }, []);

  const [filenames, setFilenames] = useState([]);
  const [errorList, setErrorList] = useState([]);

  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) return bytes + " " + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  };

  const fileRequest = ({ file, onSuccess }) => {
    let base = new FileReader();
    base.readAsDataURL(file);
    base.onload = (e) => {
      let attachment = {
        refType: "CLIENTADD",
        refId: null,
        fileDescription: file.name,
        fileName: file.name,
        fileSize: bytesToSize(file.size),
        mimetype: file.type,
        fileType: file.type,
        fileString: e.target.result,
        attachmentFor: file.name,
        sessionId: "",
      };
      setFilenames([...filenames, attachment]);
    };
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  useEffect(() => {
    const attachment = { attachments: [...filenames] };
    onValuesChange(attachment)
  }, [filenames]);

  return (
    <Card title="Attachments" className="attachment-card">
      <Row>
        <Col span={16}>
          <Form.Item noStyle>
            <Upload.Dragger
              accept={CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes}
              beforeUpload={(file) =>
                beforeUpload(file, setErrorList, CONSTANTS.attachmentFileTypes.otherAttachmentsFileTypes)}
              name="file"
              customRequest={fileRequest}
              multiple={true}
              // onChange={(e) => {
              //   setFilenames([...filenames, e.file.name]);
              // }}
              fileList={[]}
            >
              <FontAwesomeIcon icon={faUpload} color="#696A91" size="4x" />
              <p>
                <br />
                Drag and drop files <br />
                or
              </p>
              <b>
                <u>Browse file</u>
              </b>
            </Upload.Dragger>
          </Form.Item>
        </Col>
        <Col span={8}>
          <div className="filelist">
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
                        style={{ marginRight: '10px' }}
                      />
                    </Typography.Link>
                  </List.Item>
                )}
              />
            ) : (
              <div className="nofile">
                <span>No Files Found</span>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>{CONSTANTS.attachmentFileTypes.validationMessagesUploadOtherFiles}</Col>
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
    </Card>
  );
}

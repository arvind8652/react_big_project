import React from "react";
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

export default function AttachmentsFormCard(props) {
  const [filenames, setFilenames] = React.useState([]);
  return (
    <Card title="Attachments" className="attachment-card">
      <Row>
        <Col span={16}>
          <Form.Item noStyle>
            <Upload.Dragger
              name="file"
              multiple={true}
              onChange={(e) => {
                setFilenames([...filenames, e.file.name]);
              }}
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
                    <Typography.Text>{item}</Typography.Text>
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
                <div className="nofile">
                  <span>No Files Found</span>
                </div>
              )}
          </div>
        </Col>
      </Row>
    </Card>
  );
}

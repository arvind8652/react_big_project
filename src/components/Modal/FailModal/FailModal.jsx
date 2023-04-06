import { Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { assets } from "../../../constants/assetPaths";
import {
  ScButtonText,
  ScModalHeader,
} from "../../StyledComponents/genericElements";
import "./failModal.scss";

const StyledTriangleExclamation = styled.img`
  width: ${(props) => props.width || "8vw"};
  height: ${(props) => props.height || "8vw"};
  content: url(${assets.common.triangleExclamation});
`;
const StyledActionModal = styled(Modal)`
  width: 25vw;
  .ant-modal-content {
    .ant-modal-close {
      .ant-modal-close-x {
        width: 24px;
        height: 24px;
        line-height: 24px;
      }
    }
    .ant-modal-body {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 2vw;
    }
  }
`;
const StyledActionModalHeader = styled.div`
  font-family: Poppins;
  font-weight: 600;
  font-size: 1.5vw;
  color: #354081;
`;
const StyledRow = styled(Row)`
  width: 100%;
`;

const FailModal = ({
  selectedRowKeys,
  errorArray,
  visible,
  onOk,
  onCancel,
}) => {
  const [showErrorList, setShowErrorList] = useState(false);

  useEffect(() => {
    setShowErrorList(false);
  }, []);
  const toggleShowErrorList = () => {
    setShowErrorList(!showErrorList);
  };
  const ErrorListScreen = () => {
    const renderRecordDetailsCol = (errObject) => (
      <div className="record-details">
        <div>
          <strong>{errObject.name}</strong>
        </div>
        <div>{errObject.mobile}</div>
      </div>
    );
    const renderFailReasonCol = (message) => (
      <div className="failure-reason">{message}</div>
    );
    const failTableColumns = [
      {
        float: "right",
        title: "",
        dataIndex: "name",
        key: "avatar",
        // width: 300,
        render: (name, dataObject) => renderRecordDetailsCol(dataObject),
      },
      {
        float: "right",
        title: "",
        dataIndex: "message",
        key: "name",
        // width: 300,
        render: (message) => renderFailReasonCol(message),
      },
    ];
    const ErrorTableContainer = styled.div`
      height: 250px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 4px;
        scrollbar-width: thin;
      }
      &::-webkit-scrollbar-track {
        width: 4px;
        background-color: #f1f1f1;
      }
      &::-webkit-scrollbar-thumb {
        width: 4px;
        background: rgba(0, 0, 0, 0.15);
      }
      &::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.25);
      }
    `;
    return (
      <>
        <ErrorTableContainer className="modal-body">
          {errorArray && (
            <Table
              className="failed-actions-list-container"
              rowClassName="failed-action-row"
              columns={failTableColumns}
              dataSource={errorArray}
              rowKey="mobile"
              showHeader={false}
              bordered={false}
              pagination={false}
            />
          )}
        </ErrorTableContainer>
      </>
    );
  };
  const FailMessageScreen = () => (
    <StyledRow align="middle" justify="space-between">
      <Col
        span={7}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledTriangleExclamation />
      </Col>
      <Col span={15} className="context">
        <StyledRow>
          <StyledActionModalHeader>
            {selectedRowKeys &&
            errorArray &&
            Array.isArray(errorArray) &&
            errorArray.length > 0 ? (
              <>
                {selectedRowKeys.length - errorArray.length}/
                {selectedRowKeys.length}
                Successful Action
                {errorArray && errorArray.length > 1 ? "s" : ""}
              </>
            ) : (
              <>Action Failed</>
            )}
          </StyledActionModalHeader>
        </StyledRow>
        <StyledRow align="middle">
          {errorArray && errorArray.length} Action
          {errorArray && errorArray.length > 1 ? "s" : ""} could not be
          completed&nbsp;
          {errorArray && (
            <ScButtonText
              type="text"
              onClick={() => {
                toggleShowErrorList();
              }}
            >
              View
            </ScButtonText>
          )}
        </StyledRow>
      </Col>
      {/* <img src={assets.common.triangleExclamation} alt="error_icon" /> */}
    </StyledRow>
  );
  return (
    // <Modal
    //   title="Basic Modal"
    //   visible={visible}
    //   onOk={handleOk}
    //   onCancel={handleCancel}
    // >
    //   <p>Some contents...</p>
    //   <p>Some contents...</p>
    //   <p>Some contents...</p>
    // </Modal>
    <StyledActionModal
      className="fail-modal-container"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={
        showErrorList ? (
          <Row align="middle">
            <Col span={3}>
              <StyledTriangleExclamation width="2vw" height="2vw" />
            </Col>
            <Col span={20}>
              <ScModalHeader>Failed Actions</ScModalHeader>
            </Col>
          </Row>
        ) : null
      }
      closable
      centered
    >
      {showErrorList ? <ErrorListScreen /> : <FailMessageScreen />}
    </StyledActionModal>
  );
};

export default FailModal;

import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { assets } from "../../../constants/assetPaths";

export const ActionFailModalScreen = ({
  errorArray,
  closeModal,
  selectedRowKeys,
  selectedRows,
}) => {
  const [showFailedActions, setShowFailedActions] = useState(false);

  const FailScreen = () => (
    <>
      <div className="modal-body">
        <div
          className="action-fail-screen"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={assets.common.triangleExclamation}
            alt="fail"
            className="fail-logo"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="title">
              {selectedRowKeys.length - errorArray.length}/
              {selectedRowKeys.length} Successful Action
            </div>
            <div className="subtitle">
              {errorArray.length} action{errorArray.length > 1 && "s"} could not
              be completed.&nbsp;
              <div
                className="view-failed-actions-screen"
                onClick={() => {
                  setShowFailedActions(true);
                }}
              >
                View
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            type="text"
            onClick={() => {
              closeModal(false);
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </>
  );
  const ListFailedActionsScreen = () => {
    const renderRecordDetailsCol = (errObject) => {
      return (
        <div className="record-details">
          <div>
            {selectedRows.map(
              (row) =>
                row.dealId == errObject.refID && (
                  <strong key={row.dealId}>{row.dealId}</strong>
                )
            )}
          </div>
        </div>
      );
    };

    const renderFailReasonCol = (message) => (
      <div style={{ color: "#bc0573" }}>{message}</div>
    );

    const failTableColumns = [
      {
        float: "right",
        title: "Order ID",
        dataIndex: "name",
        key: "avatar",
        // width: 300,
        render: (name, dataObject) => renderRecordDetailsCol(dataObject),
      },
      {
        float: "right",
        title: "Failed Reason",
        dataIndex: "message",
        key: "name",
        // width: 300,
        render: (message) => renderFailReasonCol(message),
      },
    ];

    return (
      <>
        <div className="modal-header">
          <img
            src={assets.common.triangleExclamation}
            alt="fail"
            className="header-icon fail-logo"
          />
          <div className="failed-actions-title">Failed Actions</div>
        </div>
        <div>
          <Table
            className="failed-actions-list-container"
            rowClassName="failed-action-row"
            columns={failTableColumns}
            dataSource={errorArray}
            rowKey="mobile"
            showHeader={true}
            bordered={false}
            pagination={false}
          />
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            type="text"
            onClick={() => {
              closeModal(false);
            }}
          >
            Ok
          </Button>
        </div>
      </>
    );
  };
  return (
    <>{!showFailedActions ? <FailScreen /> : <ListFailedActionsScreen />}</>
  );
};

import React, { useEffect, useState } from "react";
import { Button, Table, Form, Input, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faTrashAlt,
  faUserPlus,
  faChevronSquareUp,
} from "@fortawesome/pro-light-svg-icons";
import { connect } from "react-redux";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";
import {
  upgradeSelectedLeadsApi,
  upgradeCategorySelectedLeadApi,
  deleteSelectedLeadsApi,
  assignSelectedLeadsApi,
} from "../../api/leadListingApi";
import "../LeadListingScreen/LeadListingScreen.scss";
import "../../styles/common.scss";
import { assets } from "../../constants/assetPaths";

const RenderConfirmUpgradeModal = ({
  showUpgradeModal,
  setShowUpgradeModal,
  selectedRowKeys,
  setSelectedRowKeys,
  selectedRows,
  setSelectedRows,
}) => {
  const emptyArray = "emptyArray";
  const [leadUpgradeFailedArray, setLeadUpgradeFailedArray] =
    useState(emptyArray);
  const [upgradeFailedArray, setUpgradeFailedArray] = useState();
  const [showFailedActions, setShowFailedActions] = useState(false);

  const handleConfirmUpgradeModalOk = () => {
    upgradeSelectedLeadsApi(selectedRowKeys).then((res) => {
      console.log("RESS", res);
      setUpgradeFailedArray(res.data.filter((statusObj) => !statusObj.success));
    });
  };

  const closeModal = (operationName) => {
    setUpgradeFailedArray();
    // setDeleteFailedArray();
    // setAssignFailedArray();
    setShowFailedActions(false);
    // setSelectedRowKeys();
    // setSelectedRows();
    operationName === "upgrade" && setShowUpgradeModal(false);
    // operationName === "delete" && setShowDeleteModal(false);
    // operationName === "assign" && setShowAssignModal(false);
    // if (operationName === "leadUpgrade") {
    //   setShowLeadUpgradeModal(false);
    //   setLeadUpgradeFailedArray(emptyArray);
    // }
    // executeGetAllLeadsData(filters, setAllLeadData, allLeadData);
    setSelectedRowKeys([]);
    // setSelectedRows([]);
  };

  const cancelOperation = (operationName) => {
    operationName === "upgrade" && setShowUpgradeModal(false);
    // operationName === "leadUpgrade" && setShowLeadUpgradeModal(false);
    // operationName === "delete" && setShowDeleteModal(false);
    // operationName === "assign" && setShowAssignModal(false);
    setSelectedRowKeys([]);
    // setSelectedRows([]);
  };

  const ConfirmScreen = () => (
    <div>
      <div className="modal-header">
        <div className="header-icon">
          <FontAwesomeIcon icon={faArrowCircleUp} />
        </div>
        <div className="header-title">Move Up</div>
      </div>
      <div className="modal-body">
        Are you sure you want to convert
        {selectedRowKeys.length > 1
          ? ` ${selectedRowKeys.length} `
          : selectedRowKeys.length === 1 && " "}
        Lead{selectedRowKeys.length > 1 && "s"} to Prospect?
      </div>
      <div className="modal-footer">
        <Button
          className="text-only-btn"
          key="back"
          type="text"
          onClick={() => {
            cancelOperation("upgrade");
          }}
        >
          Cancel
        </Button>
        <Button
          className="submit-btn"
          key="submit"
          type="primary"
          onClick={handleConfirmUpgradeModalOk}
        >
          Submit
        </Button>
      </div>
    </div>
  );

  const ActionSuccessModalScreen = ({ operationName }) => (
    <>
      <div className="modal-body">
        <div className="action-success-screen">
          <img
            src={assets.common.successTick}
            alt="success"
            className="success-logo"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="title">
              {selectedRowKeys.length}/{selectedRowKeys.length}
              Successful Action
            </div>
            <div className="subtitle">
              Your action has been completed successfully
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            type="text"
            onClick={() => {
              closeModal(operationName);
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </>
  );

  const ActionFailModalScreen = ({ errorArray, operationName }) => {
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
                {errorArray.length} action{errorArray.length > 1 && "s"} could
                not be completed.&nbsp;
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
                closeModal(operationName);
              }}
            >
              Ok
            </Button>
          </div>
        </div>
      </>
    );
    const ListFailedActionsScreen = () => {
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
          <div
            className="modal-body"
            style={{
              height: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              overflow: "scroll",
            }}
          >
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
          </div>
          <div className="modal-footer">
            <Button
              className="text-only-btn"
              type="text"
              onClick={() => {
                closeModal(operationName);
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

  return (
    <CustomModal
      handleCancel={() => {
        closeModal("upgrade");
      }}
      handleOk={handleConfirmUpgradeModalOk}
      visible={showUpgradeModal}
    >
      {typeof upgradeFailedArray === "undefined" ? (
        <ConfirmScreen />
      ) : upgradeFailedArray.length === 0 ? (
        <ActionSuccessModalScreen operationName="upgrade" />
      ) : (
        <ActionFailModalScreen
          errorArray={upgradeFailedArray}
          operationName="upgrade"
        />
      )}
    </CustomModal>
  );
};

export default RenderConfirmUpgradeModal;

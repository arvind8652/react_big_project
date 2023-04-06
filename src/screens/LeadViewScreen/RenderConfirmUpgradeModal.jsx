import { useState } from "react";
import { upgradeLeadApi } from "../../api/leadViewApi";
import { assets } from "../../constants/assetPaths";
import "./LeadViewScreen.scss";
import { useHistory } from "react-router-dom";
import { Button, Table } from "antd";
import { faArrowCircleUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";

const RenderConfirmUpgradeModal = ({
  upgradeFailedArray,
  setUpgradeFailedArray,
  showUpgradeLeadModal,
  setShowUpgradeLeadModal,
  leadId,
}) => {
  const [showFailedActions, setShowFailedActions] = useState(false);
  //const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const history = useHistory();

  const handleConfirmUpgradeModalCancel = () => {
    setShowUpgradeLeadModal(false);
  };

  const handleConfirmUpgradeModalOk = () => {
    upgradeLeadApi(leadId).then((res) => {
      setUpgradeFailedArray(res.data.filter((statusObj) => !statusObj.success));
    });
    // setShowUpgradeLeadModal(false);

    // downgradeProspectApi(prospectViewRefId).then((res) => {
    //   setShowSuccessFailureDowngradeModal(true);
    //   setDowngradeProspectMessage(res.data[0].message);
    //   setShowDowngradeProspectModal(false);
    // });
  };

  const closeModal = (operationName) => {
    setUpgradeFailedArray();
    operationName === "upgrade" && setShowUpgradeLeadModal(false);
    setShowFailedActions(false);
    history.push("/dashboard/myLead");
  };

  // Need to optimize the below two functions
  const ActionSuccessModalScreen = ({ operationName }) => (
    <>
      <div className="modal-body">
        <div className="action-success-screen">
          <img src={assets.common.successTick} alt="success" className="success-logo" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="title">
              {/* {selectedRowKeys.length}/{selectedRowKeys.length} Successful
              Action */}
            </div>
            <div className="subtitle">Your action has been completed successfully</div>
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
            <img src={assets.common.triangleExclamation} alt="fail" className="fail-logo" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="title"></div>
              <div className="subtitle">
                {errorArray.length} action{errorArray.length > 1 && "s"} could not be completed.&nbsp;
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
      const renderFailReasonCol = (message) => <div className="failure-reason">{message}</div>;
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
            <img src={assets.common.triangleExclamation} alt="fail" className="header-icon fail-logo" />
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
    return <>{!showFailedActions ? <FailScreen /> : <ListFailedActionsScreen />}</>;
  };

  const ConfirmUpgradeModal = () => (
    <>
      <div className="modal-header" style={{ display: "flex", alignItems: "center" }}>
        <div className="header-icon">
          <FontAwesomeIcon icon={faArrowCircleUp} size="sm" />
        </div>
        <div className="header-title">Move Up </div>
      </div>
      <div className="modal-body">Are you sure you want to convert lead to prospect?</div>
      <div className="modal-footer">
        <Button className="text-only-btn" key="back" type="text" onClick={handleConfirmUpgradeModalCancel}>
          Cancel
        </Button>
        <Button className="submit-btn" key="submit" type="primary" onClick={handleConfirmUpgradeModalOk}>
          Submit
        </Button>
      </div>
    </>
  );
  return (
    <CustomModal
      visible={showUpgradeLeadModal}
      handleCancel={handleConfirmUpgradeModalCancel}
      handleOk={handleConfirmUpgradeModalOk}
    >
      {typeof upgradeFailedArray === "undefined" ? (
        <ConfirmUpgradeModal />
      ) : upgradeFailedArray.length === 0 ? (
        <ActionSuccessModalScreen operationName="upgrade" />
      ) : (
        <ActionFailModalScreen errorArray={upgradeFailedArray} operationName="upgrade" />
      )}
    </CustomModal>
  );
};

export default RenderConfirmUpgradeModal;

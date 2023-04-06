import { faArrowCircleDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table } from "antd";
import { useState, useEffect } from "react";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";
import { assets } from "../../constants/assetPaths";
import { movedownSelectedProspectApi } from "../../api/prospectListingApi";
import { executeGetAllProspectData } from "../../redux/actions/prospectListingActions";
import { connect } from "react-redux";

const RenderConfirmDowngradeModal = (props) => {
  const {
    executeGetAllProspectData,
    allProspectData,
    miniComponentData,
    miniMode,
    showMovedownModal,
    setShowMovedownModal,
    selectedRowKeys,
    setSelectedRowKeys,
    setSelectedRows,
    setRefresh,
  } = props;

  const [movedownFailedArray, setMovedownFailedArray] = useState();
  const [showFailedActions, setShowFailedActions] = useState(false);
  const [loading, setLoading] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [filterFormData, setFilterFormData] = useState({
    searchName: undefined,
    type: undefined,
    category: undefined,
    source: undefined,
    branch: undefined,
    relationshipManager: undefined,
    interestLevel: undefined,
  });
  const [formData, setFormData] = useState({
    searchName: filterFormData.searchName || undefined,
    type: filterFormData.type || undefined,
    category: filterFormData.category || undefined,
    source: filterFormData.source || undefined,
    branch: filterFormData.branch || undefined,
    relationshipManager: filterFormData.relationshipManager || undefined,
    interestLevel: filterFormData.interestLevel || undefined,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardViewMode, setCardViewMode] = useState(false);
  const [localProspectData, setLocalProspectData] = useState(
    (miniMode && miniComponentData.tableData) || allProspectData
  );

  useEffect(() => {
    setFilterFormData({
      searchName: undefined,
      type: undefined,
      category: undefined,
      source: undefined,
      branch: undefined,
      relationshipManager: undefined,
      interestLevel: undefined,
    });
    setCardViewMode(Boolean.valueOf(sessionStorage.getItem("cardViewMode")));
    !miniMode && executeGetAllProspectData(setLocalProspectData, setLoading);
  }, []);
  const filterRecords = (filterData) => {
    let filteredProspectData = allProspectData;

    if (filterData.searchName) {
      filteredProspectData = filteredProspectData.filter(
        (record) =>
          record.name && record.name !== null && record.name.toLowerCase().includes(filterData.searchName.toLowerCase())
      );
    }
    if (filterData.category && filterData.category.length > 0) {
      filteredProspectData = filteredProspectData.filter((record) => {
        return record.category && record.category !== null && filterData.category.includes(record.category);
      });
    }
    if (filterData.type && filterData.type.length > 0) {
      filteredProspectData = filteredProspectData.filter((record) => {
        return record.type && record.type !== null && filterData.type.includes(record.type);
      });
    }
    if (filterData.branch && filterData.branch.length > 0) {
      filteredProspectData = filteredProspectData.filter((record) => {
        return record.branch && record.branch !== null && filterData.branch.includes(record.branch);
      });
    }
    if (filterData.source && filterData.source.length > 0) {
      filteredProspectData = filteredProspectData.filter((record) => {
        return record.source && record.source !== null && filterData.source.includes(record.source);
      });
    }
    if (filterData.relationshipManager && filterData.relationshipManager.length > 0) {
      filteredProspectData = filteredProspectData.filter((record) => {
        return (
          record.relationshipManagerName &&
          record.relationshipManagerName !== null &&
          filterData.relationshipManager.includes(record.relationshipManagerName)
        );
      });
    }
    if (filterData.interestLevel && filterData.interestLevel.length > 0) {
      filteredProspectData = filteredProspectData.filter((record) => {
        return (
          record.interestlevel &&
          record.interestlevel !== null &&
          filterData.interestLevel.includes(record.interestlevel)
        );
      });
    }

    setLocalProspectData(filteredProspectData);
  };

  useEffect(() => {
    filterRecords(filterFormData);
  }, [filterFormData]);

  useEffect(() => {
    const formDataKeys = Object.keys(formData);
    setFilterCount(formDataKeys.filter((item) => formData[item] !== undefined && formData[item].length > 0).length);
  }, [formData]);

  const ConfirmScreen = () => (
    <>
      <div className="modal-header">
        <div className="header-icon">
          <FontAwesomeIcon icon={faArrowCircleDown} />
        </div>
        <div className="header-title">Move Down</div>
      </div>
      <div className="modal-body">
        Are you sure you want to convert
        {selectedRowKeys.length > 1 ? ` ${selectedRowKeys.length} ` : selectedRowKeys.length === 1 && " "}
        Prospec{selectedRowKeys.length > 1 ? "ts" : "t"} to Lead ?
        <div className="modal-body-subtitle">All Open Opportunities for this Prospect shall be marked as Missed</div>
      </div>
      <div className="modal-footer">
        <Button
          className="text-only-btn"
          key="back"
          type="text"
          style={{ fontSize: "28px" }}
          onClick={() => {
            cancelOperation("movedown");
          }}
        >
          Cancel
        </Button>
        <Button className="submit-btn" key="submit" type="primary" onClick={handleMovedownOk}>
          Submit
        </Button>
      </div>
    </>
  );
  const cancelOperation = (operationName) => {
    operationName === "delete" && setShowDeleteModal(false);
    operationName === "movedown" && setShowMovedownModal(false);
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };
  const closeModal = (operationName) => {
    setMovedownFailedArray();
    operationName === "delete" && setShowDeleteModal(false);
    operationName === "movedown" && setShowMovedownModal(false);
    setSelectedRowKeys([]);
    setSelectedRows([]);
    executeGetAllProspectData(setLocalProspectData, setLoading);
    setRefresh(true);
  };
  const handleMovedownOk = () => {
    movedownSelectedProspectApi(selectedRowKeys).then((res) => {
      setMovedownFailedArray(res.data.filter((status) => !status.success));
    });
  };
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
            <div className="action-fail-modal" style={{ display: "flex", flexDirection: "column" }}>
              <div className="title">
                {selectedRowKeys.length - errorArray.length}/{selectedRowKeys.length} Successful Action
              </div>
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

  const ActionSuccessModalScreen = ({ operationName }) => (
    <>
      <div className="modal-body">
        <div className="action-success-screen">
          <img src={assets.common.successTick} alt="success" className="success-logo" />
          <div className="action-success-modal" style={{ display: "flex", flexDirection: "column" }}>
            <div className="title">
              {selectedRowKeys.length}/{selectedRowKeys.length} Successful Action
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

  return (
    <CustomModal
      handleCancel={() => {
        closeModal("movedown");
      }}
      handleOk={handleMovedownOk}
      visible={showMovedownModal}
    >
      {typeof movedownFailedArray === "undefined" ? (
        <ConfirmScreen />
      ) : movedownFailedArray.length === 0 ? (
        <ActionSuccessModalScreen operationName="movedown" />
      ) : (
        <ActionFailModalScreen errorArray={movedownFailedArray} operationName="movedown" />
      )}
    </CustomModal>
  );
};
const mapStateToProps = (state) => {
  return {
    prospectListingCs: state.prospectListing.controlStructure,
    allProspectData:
      state.prospectListing &&
      state.prospectListing.allProspect &&
      state.prospectListing.allProspect.prospectListResponseModel,
    rowsCount: state.prospectListing && state.prospectListing.allProspect && state.prospectListing.allProspect.rowCount,
  };
};

const mapDispatchToProps = {
  executeGetAllProspectData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderConfirmDowngradeModal);

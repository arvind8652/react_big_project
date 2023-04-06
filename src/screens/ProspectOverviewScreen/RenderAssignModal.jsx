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
  executeGetLeadListingCs,
  executeGetAllLeadsData,
} from "../../redux/actions/leadListingActions";
import { assignSelectedLeadsApi } from "../../api/leadListingApi";
import "../LeadListingScreen/LeadListingScreen.scss";
import "../../styles/common.scss";
import { assets } from "../../constants/assetPaths";
import { exportJSON, generateCsObject } from "../../utils/utils";

const RenderAssignModal = (props) => {
  const {
    executeGetLeadListingCs,
    executeGetAllLeadsData,
    leadListingCs,
    showAssignModal,
    setShowAssignModal,
    selectedRowKeys,
    setSelectedRowKeys,
    selectedRows,
    setSelectedRows,
  } = props;
  const [form] = Form.useForm();
  const [assignFailedArray, setAssignFailedArray] = useState();
  const [showFailedActions, setShowFailedActions] = useState(false);

  const filterCs =
    leadListingCs && generateCsObject(leadListingCs[0].controlStructureField);

  const controlStructure =
    leadListingCs &&
    Array.isArray(leadListingCs) &&
    leadListingCs.length > 0 &&
    generateCsObject(leadListingCs[0].controlStructureField);

  useEffect(() => {
    executeGetLeadListingCs();
    // executeGetAllLeadsData(filters, setAllLeadData, allLeadData);
  }, []);

  const handleAssignModalOk = (values) => {
    assignSelectedLeadsApi(selectedRowKeys, values.relationshipManager).then(
      (res) => {
        setAssignFailedArray(res.data.filter((status) => !status.success));
      }
    );
  };

  const cancelOperation = (operationName) => {
    operationName === "assign" && setShowAssignModal(false);
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const closeModal = (operationName) => {
    setAssignFailedArray();
    setShowFailedActions(false);
    // setSelectedRowKeys();
    // setSelectedRows();
    operationName === "assign" && setShowAssignModal(false);
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const AssignScreen = () => (
    <>
      <div className="modal-header">
        <div className="header-icon">
          <FontAwesomeIcon icon={faUserPlus} />
        </div>
        <div className="header-title">Assign Relationship Manager</div>
      </div>
      <div className="modal-body" style={{ height: "16vw" }}>
        <div style={{ marginBottom: 32 }}>
          Are you sure you want to Bulk assign or reassign the selected Leads?
        </div>
        <Form
          name="assign-leads-form"
          className="assign-leads-form"
          onFinish={handleAssignModalOk}
        >
          <label className="field-label" htmlFor="assignBranchName">
            Office
          </label>
          <Form.Item name="assignBranchName">
            <Select
              size="large"
              mode="single"
              placeholder="Select Office"
              // onChange={value => handleAssignBranchChange("assignBranchName", value)}
              value={[]}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
            >
              {controlStructure?.Branch?.lookupValue.lookUpValues.map(
                (option) => (
                  <Select.Option
                    key={option.Unit_Hierarchy}
                    value={option.Unit_Hierarchy}
                  >
                    {option.NAME}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <label className="field-label" htmlFor="relationshipManager">
            Relationship Manager
          </label>
          <Form.Item name="assignRelationManager">
            <Select
              className="filter-dropdown"
              size="large"
              mode="single"
              placeholder="Select Relation Name"
              value={[]}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
            >
              {filterCs.RelationshipManager.lookupValue.lookUpValues.map(
                (option) => (
                  <Select.Option key={option.ID} value={option.ID}>
                    {option.Name}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <div className="form-footer">
            <Button
              className="text-only-btn"
              key="back"
              type="text"
              onClick={() => {
                cancelOperation("assign");
              }}
            >
              Cancel
            </Button>
            <Button
              className="submit-btn"
              key="submit"
              type="primary"
              htmlType="submit"
            >
              Assign
            </Button>
          </div>
        </Form>
      </div>
    </>
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
              {selectedRowKeys.length}/{selectedRowKeys.length} Successful
              Action
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
        cancelOperation("assign");
      }}
      handleOk={handleAssignModalOk}
      visible={showAssignModal}
    >
      {typeof assignFailedArray === "undefined" ? (
        <AssignScreen />
      ) : assignFailedArray.length === 0 ? (
        <ActionSuccessModalScreen operationName="assign" />
      ) : (
        <ActionFailModalScreen
          errorArray={assignFailedArray}
          operationName="assign"
        />
      )}
    </CustomModal>
  );
};

const mapStateToProps = (state) => {
  return {
    leadListingCs: state.leadListing.controlStructure,
  };
};
const mapDispatchToProps = {
  executeGetLeadListingCs,
  executeGetAllLeadsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderAssignModal);

//   export default RenderAssignModal;

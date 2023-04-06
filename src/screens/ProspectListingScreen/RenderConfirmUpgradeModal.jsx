import { faChevronSquareUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table, Form, Select, Input } from "antd";
import { useState, useEffect } from "react";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";
import { assets } from "../../constants/assetPaths";
import { upgradeSelectedProspectApi, movedownSelectedProspectApi } from "../../api/prospectListingApi";
import "./ProspectListingScreen.scss";

const RenderConfirmUpgradeModal = (props) => {
  const {
    showUpgradeModal,
    selectedRowKeys,
    cancelOperation,
    closeModal,
    controlStructure,
    selectedRows,
    upgradeFailedArray,
    setUpgradeFailedArray,
    headerName,
    submitText,
  } = props;
  const [form] = Form.useForm();
  const [showFailedActions, setShowFailedActions] = useState(false);
  const [categoryDropdownValues, setCategoryDropdownValues] = useState([]);

  useEffect(() => {
    if (selectedRows && selectedRows.length > 0) {
      let categoryDropdownValues =
        controlStructure?.Category?.dropDownValue.filter((item) => {
          return parseInt(item.dataValue) > parseInt(selectedRows[0].category);
        });
      setCategoryDropdownValues(categoryDropdownValues);
    }
  }, [selectedRows]);

  const ConfirmScreen = () => {
    const [upgradeReason, setUpgradeReason] = useState("");
    const [upgradeRelationManager, setUpgradeRelationManager] = useState("");
    const [upgradeBranchName, setUpgradeBranchName] = useState("");
    const [upgradeCategory, setUpgradeCategory] = useState("");
    const [otherUpgradeReason, setOtherUpgradeReason] = useState("");
    const handleUpgradeReasonChange = (key, value) => {
      setUpgradeReason({ [key]: value });
    };
    const handleUpgradeBranchChange = (key, value) => {
      setUpgradeBranchName({ [key]: value });
    };
    const handleUpgradeRMChange = (key, value) => {
      setUpgradeRelationManager({ [key]: value });
    };
    const handleUpgradeCategoryChange = (key, value) => {
      setUpgradeCategory({ [key]: value });
    };
    const onUpgrade = () => {
      let upgradeData = {
        category: upgradeCategory.upgradeCategory,
        branch: upgradeBranchName.upgradeBranchName,
        relationshipManager: upgradeRelationManager.upgradeRelationManager,
        reason: upgradeReason.upgradeReason,
      };
      if (upgradeReason.upgradeReason === "O") {
        upgradeData.otherReason = otherUpgradeReason;
      }
      handleUpgradeOk(upgradeData);
      handleDowngradeOk(upgradeData);
      setUpgradeCategory('');
    };

    return (
      <>
        <div className="modal-header">
          <div className="header-icon">
            <FontAwesomeIcon icon={faChevronSquareUp} />
          </div>
          <div className="header-title">{headerName}</div>
        </div>
        <div className="modal-body">
          Are you sure you want to {submitText.toLowerCase()}
          {selectedRowKeys.length > 1
            ? ` ${selectedRowKeys.length} `
            : selectedRowKeys.length === 1 && " "}
          selected Prospec{selectedRowKeys.length > 1 ? "ts" : "t"}?
          <div className="modal-body-subtitle">
            {/* All Open Opportunities for this Prospect shall be marked as Missed */}
            <Form
              name="assign-leads-form"
              className="assign-leads-form"
              form={form}
            >
              <div
                id="upgradeCategory"
                className="field-section"
                style={{ marginTop: "1rem" }}
              >
                <label className="field-label" htmlFor="upgradeCategory">
                  Category
                </label>
                <Form.Item name="upgradeCategory">
                  <Select
                    size="large"
                    mode="single"
                    placeholder="Select Category"
                    onChange={(value) =>
                      handleUpgradeCategoryChange("upgradeCategory", value)
                    }
                    filterOption={(input, opt) => {
                      return (
                        opt.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    showSearch
                  >
                    {categoryDropdownValues.map((option) => (
                      <Select.Option
                        key={option.dataValue}
                        value={option.dataValue}
                      >
                        {option.displayValue}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <label className="field-label" htmlFor="upgradeBranchName">
                  Branch Name
                </label>
                <Form.Item name="upgradeBranchName">
                  <Select
                    size="large"
                    mode="single"
                    placeholder="Select Branch Name"
                    onChange={(value) =>
                      handleUpgradeBranchChange("upgradeBranchName", value)
                    }
                    filterOption={(input, opt) => {
                      return (
                        opt.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
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
                <label className="field-label" htmlFor="upgradeRelationManager">
                  Relationship Manager
                </label>
                <Form.Item name="upgradeRelationManager">
                  <Select
                    size="large"
                    mode="single"
                    placeholder="Select Relation Name"
                    onChange={(value) =>
                      handleUpgradeRMChange("upgradeRelationManager", value)
                    }
                    filterOption={(input, opt) => {
                      return (
                        opt.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    showSearch
                  >
                    {controlStructure?.RelationshipManager.lookupValue.lookUpValues.map(
                      (option) => (
                        <Select.Option key={option.ID} value={option.ID}>
                          {option.Name}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <label className="field-label" htmlFor="upgradeReason">
                  Reason
                </label>
                <Form.Item name="upgradeReason">
                  <Select
                    size="large"
                    mode="single"
                    placeholder="Select Reason"
                    onChange={(value) =>
                      handleUpgradeReasonChange("upgradeReason", value)
                    }
                    filterOption={(input, opt) => {
                      return (
                        opt.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    showSearch
                  >
                    {controlStructure?.ClientReason?.lookupValue?.lookUpValues.map(
                      (option, index) => (
                        <Select.Option key={index} value={option.data_value}>
                          {option.display_value}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                {upgradeReason.upgradeReason === "O" ? (
                  <Form.Item name="otherUpgradeReason">
                    <Input
                      maxLength={20}
                      onChange={(evt) =>
                        setOtherUpgradeReason(evt.target.value)
                      }
                      size="large"
                      value={otherUpgradeReason}
                      placeholder={"Enter Reason"}
                    />
                  </Form.Item>
                ) : (
                  ""
                )}
              </div>
            </Form>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            key="back"
            type="text"
            style={{ fontSize: "28px" }}
            onClick={() => {
              cancelOperation(submitText);
            }}
          >
            Cancel
          </Button>
          <Button
            className="downgrade-submit-btn"
            key="submit"
            type="primary"
            onClick={onUpgrade}
          >
            {submitText}
          </Button>
        </div>
      </>
    );
  };

  const handleUpgradeOk = (upgradeData) => {
    let requestBody = {
      ProspectCategory: {
        ProspectID: selectedRowKeys,
        Category: upgradeData.category,
      },
    };
    // selectedRows.map(ele => {
    //   let payload = {};
    //   payload.ClientId = ele.customerCode;
    //   payload.LegalStatus = ele.customerCategory;
    //   payload.IsNew = false;
    //   payload.Event = "D";
    //   payload.bankaccbranch = downGradeFormData.branch;
    //   payload.CustRelMgr = downGradeFormData.relationshipManager;
    //   payload.Reason = downGradeFormData.reason;
    //   if (downGradeFormData.reason == 'O') {
    //     payload.Remark = downGradeFormData.otherReason;
    //   }
    //   requestBody.push(payload);
    // });
    upgradeSelectedProspectApi(requestBody).then((res) => {
      setUpgradeFailedArray(res.data.filter((status) => !status.success));
    });
  };
  const handleDowngradeOk = (upgradeData) => {
    let requestBody = {
      ProspectCategory: {
        ProspectID: selectedRowKeys,
        Category: upgradeData.category,
      },
    };
    movedownSelectedProspectApi(requestBody).then((res) => {
      setUpgradeFailedArray(res.data.filter((status) => !status.success));
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
            <img
              src={assets.common.triangleExclamation}
              alt="fail"
              className="fail-logo"
            />
            <div
              className="action-fail-modal"
              style={{ display: "flex", flexDirection: "column" }}
            >
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

  const ActionSuccessModalScreen = ({ operationName }) => (
    <>
      <div className="modal-body">
        <div className="action-success-screen">
          <img
            src={assets.common.successTick}
            alt="success"
            className="success-logo"
          />
          <div
            className="action-success-modal"
            style={{ display: "flex", flexDirection: "column" }}
          >
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

  return (
    <CustomModal
      handleCancel={() => {
        closeModal(submitText);
      }}
      handleOk={submitText.toLowerCase() === 'upgrade' ? handleUpgradeOk : handleDowngradeOk}
      visible={showUpgradeModal}
    >
      {upgradeFailedArray === "emptyArray" ? (
        <ConfirmScreen />
      ) : upgradeFailedArray.length === 0 ? (
        <ActionSuccessModalScreen operationName={submitText}/>
      ) : (
        <ActionFailModalScreen
          errorArray={upgradeFailedArray}
          operationName={submitText}
        />
      )}
    </CustomModal>
  );
};

export default RenderConfirmUpgradeModal;

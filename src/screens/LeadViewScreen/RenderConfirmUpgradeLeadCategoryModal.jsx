import React, { useState } from "react";
import { upgradeCategorySelectedLeadApi } from "../../api/leadListingApi";
import { assets } from "../../constants/assetPaths";
import "./LeadViewScreen.scss";
import { useHistory } from "react-router-dom";
import { Button, Table, Form, Select, Input } from "antd";
import { faChevronSquareUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";

const RenderConfirmUpgradeCategoryModal = ({
  setUpgradeCategoryFailedArray,
  upgradeCategoryFailedArray,
  showUpgradeLeadCategoryModal,
  setShowUpgradeLeadCategoryModal,
  leadId,
  controlStructure,
  categoryDropdownValues,
  emptyArray,
}) => {
  const [showFailedActions, setShowFailedActions] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm();

  const handleConfirmUpgradeModalCancel = () => {
    setShowUpgradeLeadCategoryModal(false);
  };

  const handleConfirmUpgradeModalOk = (upgradeData) => {
    let requestBody = {
      LeadCategory: {
        LeadID: [leadId],
        Category: upgradeData.category,
      },
    };
    upgradeCategorySelectedLeadApi(requestBody).then((res) => {
      setUpgradeCategoryFailedArray(res.data.filter((status) => !status.success));
    });
  };

  const closeModal = (operationName) => {
    setUpgradeCategoryFailedArray(emptyArray);
    operationName === "upgrade" && setShowUpgradeLeadCategoryModal(false);
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
            <div className="title">1/1 Successful Action</div>
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
          render: (name, dataObject) => renderRecordDetailsCol(dataObject),
        },
        {
          float: "right",
          title: "",
          dataIndex: "message",
          key: "name",
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

  const ConfirmUpgradeModal = () => {
    const [leadUpgradeReason, setLeadUpgradeReason] = useState("");
    const [leadUpgradeRelationManager, setLeadUpgradeRelationManager] = useState("");
    const [leadUpgradeBranchName, setLeadUpgradeBranchName] = useState("");
    const [leadUpgradeCategory, setLeadUpgradeCategory] = useState("");
    const [otherLeadUpgradeReason, setOtherLeadUpgradeReason] = useState("");
    const handleLeadUpgradeReasonChange = (key, value) => {
      setLeadUpgradeReason({ [key]: value });
    };
    const handleLeadUpgradeBranchChange = (key, value) => {
      setLeadUpgradeBranchName({ [key]: value });
    };
    const handleLeadUpgradeRMChange = (key, value) => {
      setLeadUpgradeRelationManager({ [key]: value });
    };
    const handleLeadUpgradeCategoryChange = (key, value) => {
      setLeadUpgradeCategory({ [key]: value });
    };
    const onLeadUpgrade = () => {
      let leadUpgradeData = {
        category: leadUpgradeCategory.leadUpgradeCategory,
        branch: leadUpgradeBranchName.leadUpgradeBranchName,
        relationshipManager: leadUpgradeRelationManager.leadUpgradeRelationManager,
        reason: leadUpgradeReason.leadUpgradeReason,
      };
      if (leadUpgradeReason.leadUpgradeReason === "O") {
        leadUpgradeData.otherReason = otherLeadUpgradeReason;
      }
      handleConfirmUpgradeModalOk(leadUpgradeData);
    };
    return (
      <div>
        <div className="modal-header">
          <div className="header-icon">
            <FontAwesomeIcon icon={faChevronSquareUp} />
          </div>
          <div className="header-title">Upgrade</div>
        </div>
        <div className="modal-body">
          Are you sure you want to upgrade selected Lead?
          <Form name="assign-leads-form" className="assign-leads-form" form={form}>
            <div id="leadUpgradeCategory" className="field-section" style={{ marginTop: "1rem" }}>
              <label className="field-label" htmlFor="leadUpgradeCategory">
                Category
              </label>
              <Form.Item name="leadUpgradeCategory">
                <Select
                  size="large"
                  mode="single"
                  placeholder="Select Category"
                  onChange={(value) => handleLeadUpgradeCategoryChange("leadUpgradeCategory", value)}
                  filterOption={(input, opt) => {
                    return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  }}
                  showSearch
                >
                  {categoryDropdownValues.map((option) => (
                    <Select.Option key={option.dataValue} value={option.dataValue}>
                      {option.displayValue}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <label className="field-label" htmlFor="leadUpgradeBranchName">
                Branch Name
              </label>
              <Form.Item name="leadUpgradeBranchName">
                <Select
                  size="large"
                  mode="single"
                  placeholder="Select Branch Name"
                  onChange={(value) => handleLeadUpgradeBranchChange("leadUpgradeBranchName", value)}
                  filterOption={(input, opt) => {
                    return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  }}
                  showSearch
                >
                  {controlStructure?.Branch?.lookupValue.lookUpValues.map((option) => (
                    <Select.Option key={option.Unit_Hierarchy} value={option.Unit_Hierarchy}>
                      {option.NAME}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <label className="field-label" htmlFor="leadUpgradeRelationManager">
                Relationship Manager
              </label>
              <Form.Item name="leadUpgradeRelationManager">
                <Select
                  size="large"
                  mode="single"
                  placeholder="Select Relation Name"
                  onChange={(value) => handleLeadUpgradeRMChange("leadUpgradeRelationManager", value)}
                  filterOption={(input, opt) => {
                    return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  }}
                  showSearch
                >
                  {controlStructure?.RelationshipManager.lookupValue.lookUpValues.map((option) => (
                    <Select.Option key={option.ID} value={option.ID}>
                      {option.Name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <label className="field-label" htmlFor="leadUpgradeReason">
                Reason
              </label>
              <Form.Item name="leadUpgradeReason">
                <Select
                  size="large"
                  mode="single"
                  placeholder="Select Reason"
                  onChange={(value) => handleLeadUpgradeReasonChange("leadUpgradeReason", value)}
                  filterOption={(input, opt) => {
                    return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  }}
                  showSearch
                >
                  {controlStructure?.ClientReason?.lookupValue?.lookUpValues.map((option, index) => (
                    <Select.Option key={index} value={option.data_value}>
                      {option.display_value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {leadUpgradeReason.leadUpgradeReason === "O" ? (
                <Form.Item name="otherLeadUpgradeReason">
                  <Input
                    maxLength={20}
                    onChange={(evt) => setOtherLeadUpgradeReason(evt.target.value)}
                    size="large"
                    value={otherLeadUpgradeReason}
                    placeholder={"Enter Reason"}
                  />
                </Form.Item>
              ) : (
                ""
              )}
            </div>
          </Form>
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            key="back"
            type="text"
            onClick={() => {
              handleConfirmUpgradeModalCancel("upgrade");
            }}
          >
            Cancel
          </Button>
          <Button className="submit-btn" key="submit" type="primary" onClick={onLeadUpgrade}>
            Upgrade
          </Button>
        </div>
      </div>
    );
  };
  return (
    <CustomModal
      visible={showUpgradeLeadCategoryModal}
      handleCancel={handleConfirmUpgradeModalCancel}
      handleOk={handleConfirmUpgradeModalOk}
    >
      {upgradeCategoryFailedArray === "emptyArray" ? (
        <ConfirmUpgradeModal />
      ) : upgradeCategoryFailedArray.length === 0 ? (
        <ActionSuccessModalScreen operationName="upgrade" />
      ) : (
        <ActionFailModalScreen errorArray={upgradeCategoryFailedArray} operationName="upgrade" />
      )}
    </CustomModal>
  );
};

export default RenderConfirmUpgradeCategoryModal;

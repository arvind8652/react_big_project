import React, { useEffect, useState } from "react";
import { Button, Table, Form, Input, Select, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faTrashAlt, faUserPlus, faChevronSquareUp, faChevronSquareDown } from "@fortawesome/pro-light-svg-icons";
import { faFilter, faArrowAltToBottom } from "@fortawesome/pro-solid-svg-icons";
import { connect } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  executeGetLeadListingCs,
  executeGetAllLeadsData,
  executeGetLeadAdvancedFilter,
} from "../../redux/actions/leadListingActions";
import { exportJSON, generateCsObject } from "../../utils/utils";
import {
  upgradeSelectedLeadsApi,
  upgradeCategorySelectedLeadApi,
  deleteSelectedLeadsApi,
  assignSelectedLeadsApi,
} from "../../api/leadListingApi";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";
import { assets } from "../../constants/assetPaths";
import "./LeadListingScreen.scss";
import "../../styles/common.scss";
import ListingTable from "../../components/ListingTable/ListingTable";
import TopBarHeader from "../../components/TopBarHeader/TopBarHeader";
import ErrorCard from "../../components/ErrorComponentCard/ErrorCard";
import GenericAdvancedFilterDrawer from "../../components/GenericAdvancedFilter/GenericAdvancedFilter";

// Error code
const errorData = {
  code: "",
};

const LeadListingScreen = (props) => {
  const { executeGetLeadListingCs, executeGetAllLeadsData, leadListingCs, LeadAdvFilter, leadData } = props;
  const [form] = Form.useForm();
  const emptyArray = "emptyArray";
  const { path } = useRouteMatch();
  const defaultAdvState = { Dropdown: {}, Autocomplete: {} };
  const [loading, setLoading] = useState(true);
  const [allLeadData, setAllLeadData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showLeadUpgradeModal, setShowLeadUpgradeModal] = useState(false);
  const [showLeadDowngradeModal, setShowLeadDowngradeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [upgradeFailedArray, setUpgradeFailedArray] = useState();
  const [leadUpgradeFailedArray, setLeadUpgradeFailedArray] = useState(emptyArray);
  const [deleteFailedArray, setDeleteFailedArray] = useState();
  const [assignFailedArray, setAssignFailedArray] = useState();
  const [showFailedActions, setShowFailedActions] = useState(false);
  const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);
  const [categoryDropdownValues, setCategoryDropdownValues] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const [filters, setFilters] = useState({
    branchName: null,
    category: null,
    filterParam: null,
    firstName: null,
    interestLevelName: null,
    relationshipManager: null,
    sorting: null,
    sourceName: null,
    typeName: null,
  });

  const history = useHistory();
  const filterCs = leadListingCs && generateCsObject(leadListingCs[0].controlStructureField);
  const controlStructure =
    leadListingCs &&
    Array.isArray(leadListingCs) &&
    leadListingCs.length > 0 &&
    generateCsObject(leadListingCs[0].controlStructureField);
  useEffect(() => {
    executeGetLeadListingCs();
    executeGetAllLeadsData(filters, setAllLeadData, allLeadData);
    executeGetLeadAdvancedFilter();
  }, []);

  useEffect(() => {
    setLoading(true);
    executeGetAllLeadsData(filters, setAllLeadData, allLeadData, "", setLoading);
  }, [filters]);

  useEffect(() => {
    if (selectedRows && selectedRows.length > 0) {
      let categoryDropdownValues = controlStructure?.Category?.dropDownValue.filter((item) => {
        return parseInt(item.dataValue) > parseInt(selectedRows[0].category);
      });
      setCategoryDropdownValues(categoryDropdownValues);
    }
  }, [selectedRows]);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const onRow = (row, rowIndex) => {
    const toObject = {
      pathname: `${path}/leadView`,
      state: { leadId: row.leadId, rowNumber: row.rowNumber, filters: filters },
    };
    return {
      onClick: (event) => {
        history.push(toObject);
      }, // click row
    };
  };
  const onFilterSelect = (value) => {
    setFilters({
      ...filters,
      filterParam: value,
    });
  };
  const onSortSelect = (value) => {
    setFilters({
      ...filters,
      sorting: value,
    });
  };

  const handleConfirmUpgradeModalOk = () => {
    upgradeSelectedLeadsApi(selectedRowKeys).then((res) => {
      setUpgradeFailedArray(res.data.filter((statusObj) => !statusObj.success));
    });
  };
  const closeModal = (operationName) => {
    setUpgradeFailedArray();
    setDeleteFailedArray();
    setAssignFailedArray();
    setShowFailedActions(false);
    // setSelectedRowKeys();
    // setSelectedRows();
    operationName === "upgrade" && setShowUpgradeModal(false);
    operationName === "delete" && setShowDeleteModal(false);
    operationName === "assign" && setShowAssignModal(false);
    if (operationName === "leadUpgrade") {
      setShowLeadUpgradeModal(false);
      setLeadUpgradeFailedArray(emptyArray);
    }
    if (operationName === "leadDowngrade") {
      setShowLeadDowngradeModal(false);
      setLeadUpgradeFailedArray(emptyArray);
    }
    executeGetAllLeadsData(filters, setAllLeadData, allLeadData);
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };
  const cancelOperation = (operationName) => {
    operationName === "upgrade" && setShowUpgradeModal(false);
    operationName === "leadUpgrade" && setShowLeadUpgradeModal(false);
    operationName === "delete" && setShowDeleteModal(false);
    operationName === "assign" && setShowAssignModal(false);
    operationName === "leadDowngrade" && setShowLeadDowngradeModal(false);
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };
  const handleConfirmDeleteModalOk = () => {
    deleteSelectedLeadsApi(selectedRowKeys).then((res) => {
      setDeleteFailedArray(res.data.filter((status) => !status.success));
    });
  };
  const handleAssignModalOk = (values) => {
    assignSelectedLeadsApi(selectedRowKeys, values.relationshipManager).then((res) => {
      setAssignFailedArray(res.data.filter((status) => !status.success));
    });
  };
  const handleLeadUpgradeOk = (upgradeData) => {
    let requestBody = {
      LeadCategory: {
        LeadID: selectedRowKeys,
        Category: upgradeData.category,
      },
    };
    upgradeCategorySelectedLeadApi(requestBody).then((res) => {
      setLeadUpgradeFailedArray(res.data.filter((status) => !status.success));
    });
  };
  const RenderConfirmLeadUpgradeModal = () => {
    const ConfirmScreen = () => {
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
        handleLeadUpgradeOk(leadUpgradeData);
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
            Are you sure you want to upgrade
            {selectedRowKeys.length > 1 ? ` ${selectedRowKeys.length} ` : selectedRowKeys.length === 1 && " "}
            selected Lead{selectedRowKeys.length > 1 && "s"}?
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
                cancelOperation("leadUpgrade");
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
        handleCancel={() => {
          closeModal("leadUpgrade");
        }}
        handleOk={handleLeadUpgradeOk}
        visible={showLeadUpgradeModal}
      >
        {leadUpgradeFailedArray === "emptyArray" ? (
          <ConfirmScreen />
        ) : leadUpgradeFailedArray.length === 0 ? (
          <ActionSuccessModalScreen operationName="leadUpgrade" />
        ) : (
          <ActionFailModalScreen errorArray={leadUpgradeFailedArray} operationName="leadUpgrade" />
        )}
      </CustomModal>
    );
  };
  const RenderConfirmLeadDowngradeModal = () => {
    const ConfirmScreen = () => {
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
        handleLeadUpgradeOk(leadUpgradeData);
      };
      return (
        <div>
          <div className="modal-header">
            <div className="header-icon">
              <FontAwesomeIcon icon={faChevronSquareDown} />
            </div>
            <div className="header-title">Downgrade</div>
          </div>
          <div className="modal-body">
            Are you sure you want to downgrade
            {selectedRowKeys.length > 1 ? ` ${selectedRowKeys.length} ` : selectedRowKeys.length === 1 && " "}
            selected Lead{selectedRowKeys.length > 1 && "s"}?
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
                cancelOperation("leadUpgrade");
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
        handleCancel={() => {
          closeModal("leadUpgrade");
        }}
        handleOk={handleLeadUpgradeOk}
        visible={showLeadDowngradeModal}
      >
        {leadUpgradeFailedArray === "emptyArray" ? (
          <ConfirmScreen />
        ) : leadUpgradeFailedArray.length === 0 ? (
          <ActionSuccessModalScreen operationName="leadUpgrade" />
        ) : (
          <ActionFailModalScreen errorArray={leadUpgradeFailedArray} operationName="leadUpgrade" />
        )}
      </CustomModal>
    );
  };
  const RenderConfirmUpgradeModal = () => {
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
          {selectedRowKeys.length > 1 ? ` ${selectedRowKeys.length} ` : selectedRowKeys.length === 1 && " "}
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
          <Button className="submit-btn" key="submit" type="primary" onClick={handleConfirmUpgradeModalOk}>
            Submit
          </Button>
        </div>
      </div>
    );
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
          <ActionFailModalScreen errorArray={upgradeFailedArray} operationName="upgrade" />
        )}
      </CustomModal>
    );
  };
  const RenderConfirmDeleteModal = () => {
    const ConfirmScreen = () => (
      <>
        <div className="modal-header">
          <div className="header-icon">
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="header-title">Delete Lead</div>
        </div>
        <div className="modal-body">
          Are you sure you want to delete
          {selectedRowKeys.length > 1 ? ` ${selectedRowKeys.length} ` : selectedRowKeys.length === 1 && " "}
          selected Lead{selectedRowKeys.length > 1 && "s"}?
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            key="back"
            type="text"
            onClick={() => {
              cancelOperation("delete");
            }}
          >
            Cancel
          </Button>
          <Button className="submit-btn" key="submit" type="primary" onClick={handleConfirmDeleteModalOk}>
            Delete
          </Button>
        </div>
      </>
    );
    return (
      <CustomModal
        handleCancel={() => {
          closeModal("delete");
        }}
        handleOk={handleConfirmDeleteModalOk}
        visible={showDeleteModal}
      >
        {typeof deleteFailedArray === "undefined" ? (
          <ConfirmScreen />
        ) : deleteFailedArray.length === 0 ? (
          <ActionSuccessModalScreen operationName="delete" />
        ) : (
          <ActionFailModalScreen errorArray={deleteFailedArray} operationName="delete" />
        )}
      </CustomModal>
    );
  };
  const RenderAssignModal = () => {
    const AssignScreen = () => (
      <>
        <div className="modal-header">
          <div className="header-icon">
            <FontAwesomeIcon icon={faUserPlus} />
          </div>
          <div className="header-title">Assign Relationship Manager</div>
        </div>
        <div className="modal-body" style={{ height: "16vw" }}>
          <div style={{ marginBottom: 32 }}>Are you sure you want to Bulk assign or reassign the selected Leads?</div>
          <Form name="assign-leads-form" className="assign-leads-form" onFinish={handleAssignModalOk}>
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
                  return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
                showSearch
              >
                {filterCs.RelationshipManager.lookupValue.lookUpValues.map((option) => (
                  <Select.Option key={option.ID} value={option.ID}>
                    {option.Name}
                  </Select.Option>
                ))}
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
              <Button className="submit-btn" key="submit" type="primary" htmlType="submit">
                Assign
              </Button>
            </div>
          </Form>
        </div>
      </>
    );
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
          <ActionFailModalScreen errorArray={assignFailedArray} operationName="assign" />
        )}
      </CustomModal>
    );
  };
  const ActionSuccessModalScreen = ({ operationName }) => (
    <>
      <div className="modal-body">
        <div className="action-success-screen">
          <img src={assets.common.successTick} alt="success" className="success-logo" />
          <div style={{ display: "flex", flexDirection: "column" }}>
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
  const selectAllLeads = () => {
    setSelectedRowKeys(allLeadData.map((item) => item.leadId));
    setSelectedRows(allLeadData);
  };
  const clearSelection = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };
  const downloadRecords = () => {
    const leadDownloadData =
      selectedRows && selectedRows.length > 0
        ? selectedRows.map((lead, index) => ({
            "Sr.No": index + 1,
            Name: lead.name,
            Category: lead.category,
            "Interest Level": lead.interestLevel,
            "Contact Number": lead.mobile,
            Email: lead.email,
            Source: lead.source,
            Type: lead.type,
            "Relationship Manager": lead.relationshipManagerName,
            Branch: lead.branch,
          }))
        : allLeadData.map((lead, index) => ({
            "Sr.No": index + 1,
            Name: lead.name,
            Category: lead.categoryName,
            "Interest Level": lead.interestLevelName,
            "Contact Number": lead.mobile,
            Email: lead.email,
            Source: lead.sourceName,
            Type: lead.typeName,
            "Relationship Manager": lead.relationshipManagerName,
            Branch: lead.branchName,
          }));
    exportJSON(leadDownloadData, "leads");
  };

  if (!allLeadData) return <h1>loading...</h1>;
  return (
    <div className="lead-listing-container">
      <RenderConfirmUpgradeModal />
      <RenderConfirmDeleteModal />
      <RenderConfirmLeadUpgradeModal />
      <RenderConfirmLeadDowngradeModal />
      <RenderAssignModal />
      {/* <RenderTopBar url={url} history={history} /> */}
      <TopBarHeader headerName={"My Leads"} buttonTitle={"Add"} navigationLink={"MyLead/leadCreate"} />
      <div className="filters-panel">
        <div className="left">
          <Tooltip title="Move Up">
            <FontAwesomeIcon
              icon={faArrowCircleUp}
              className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={() => selectedRowKeys.length > 0 && setShowUpgradeModal(true)}
            />
          </Tooltip>
          <Tooltip title="Assign">
            <FontAwesomeIcon
              icon={faUserPlus}
              className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={() => selectedRowKeys.length > 0 && setShowAssignModal(true)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <FontAwesomeIcon
              icon={faTrashAlt}
              className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={() => selectedRowKeys.length > 0 && setShowDeleteModal(true)}
            />
          </Tooltip>
          <Tooltip title="Upgrade">
            <FontAwesomeIcon
              icon={faChevronSquareUp}
              className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={() => selectedRowKeys.length > 0 && setShowLeadUpgradeModal(true)}
            />
          </Tooltip>
          <Tooltip title="Downgrade">
            <FontAwesomeIcon
              icon={faChevronSquareDown}
              className={selectedRowKeys.length === 0 || selectedRowKeys.length > 1 ?  "disabled-icon" : "icon"}
              onClick={() => selectedRowKeys.length > 0 && setShowLeadDowngradeModal(true)}
            />
          </Tooltip>
        </div>
        <RenderDropdown mode="filter" onSelect={onFilterSelect} filterCs={filterCs} />
        <RenderDropdown mode="sort" onSelect={onSortSelect} />
        <div className="right">
          <div className="icon-filter-wrapper">
            <Tooltip title="Filter">
              <FontAwesomeIcon
                icon={faFilter}
                className={loading ? "disabled-icon" : "icon"}
                onClick={() => {
                  toggleDrawer();
                }}
              />
            </Tooltip>
            {isFilterApplied && <span class="filter-badge"></span>}
          </div>
          <Tooltip title="Download">
            <FontAwesomeIcon
              icon={faArrowAltToBottom}
              className={loading ? "disabled-icon" : "icon"}
              onClick={() => {
                downloadRecords();
              }}
            />
          </Tooltip>
          {/* <FontAwesomeIcon icon={faThLarge} className={loading ? "disabled-icon" : "icon"} style={{ opacity: 0.5 }} /> */}
        </div>
        <GenericAdvancedFilterDrawer
          showDrawer={showDrawer}
          toggleDrawer={toggleDrawer}
          closable={true}
          defaultAdvState={defaultAdvState}
          setIsFilterApplied={setIsFilterApplied}
          setTableData={(data) => {
            setAllLeadData(data);
            // if (data) {
            //   setFilterBy("Show All");
            //   setSortBy("Recently Modified (modified in last 7 days)");
            // }
          }}
          cacheData={leadData}
          advFilterData={LeadAdvFilter}
        />
      </div>
      {selectedRowKeys.length > 0 && (
        <span className="selected-record-count">
          {showSelectAllofAllPrompt ? (
            <>
              <div>All {selectedRowKeys.length} Leads on this page are selected.&nbsp;</div>
              {selectedRowKeys.length !== allLeadData.length ? (
                <Button
                  type="link"
                  className="link"
                  onClick={() => {
                    selectAllLeads();
                  }}
                  style={{ padding: 0 }}
                >
                  Select all {allLeadData.length} Leads
                </Button>
              ) : (
                <Button
                  type="link"
                  className="link"
                  onClick={() => {
                    clearSelection();
                  }}
                  style={{ padding: 0 }}
                >
                  Clear Selection
                </Button>
              )}
            </>
          ) : (
            <div>
              {selectedRowKeys.length} Lead{selectedRowKeys.length > 1 && "s"}
              &nbsp;on this page {selectedRowKeys.length > 1 ? "are" : "is"} selected.&nbsp;
            </div>
          )}
        </span>
      )}

      {errorData.code ? (
        <ErrorCard error={errorData} />
      ) : (
        <ListingTable
          onRow={onRow}
          setSelectedRowKeys={setSelectedRowKeys}
          selectedRowKeys={selectedRowKeys}
          setSelectedRows={setSelectedRows}
          setShowSelectAllofAllPrompt={setShowSelectAllofAllPrompt}
          allLeadData={allLeadData}
          setShowUpgradeModal={setShowUpgradeModal}
          setShowAssignModal={setShowAssignModal}
          executeGetAllLeadsData={executeGetAllLeadsData}
          filters={filters}
          setAllLeadData={setAllLeadData}
          loading={loading}
        />
      )}

      {/* <Table
        id="lead-table"
        onRow={onRow}
        rowKey="leadId"
        rowClassName="leadlist-table-row"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={allLeadData}
        pagination={{
          position: ["topRight"],
          pageSize: 25,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total <= 100 ? total : "100+"} items`,
        }}
        onChange={(e) => {
          if (allLeadData.length - e.current * e.pageSize <= e.pageSize) {
            executeGetAllLeadsData(
              filters,
              setAllLeadData,
              allLeadData,
              e.current * e.pageSize
            );
          }
        }}
      /> */}
    </div>
  );
};
const RenderDropdown = ({ mode, onSelect, filterCs }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (mode === "filter") {
      filterCs &&
        filterCs.LEADFILTERPARAM &&
        filterCs.LEADFILTERPARAM.dropDownValue &&
        setOptions(
          filterCs.LEADFILTERPARAM.dropDownValue.map((item) => ({
            label: item.displayValue,
            value: item.dataValue,
          }))
        );
    } else if (mode === "sort") {
      setOptions([
        { label: "Recently Modified", value: "Recently Modified" },
        { label: "Recently Created", value: "Recently Created" },
      ]);
    }
  }, [mode, filterCs]);
  return (
    <div style={{ position: "relative" }}>
      <div className="dropdown-prefix">{mode.charAt(0).toUpperCase() + mode.substring(1)}:</div>
      <Select
        className={"filter-sort-dropdown " + mode}
        size="large"
        defaultValue={mode === "filter" ? "Show All" : "Recently Modified"}
        onSelect={onSelect}
        showArrow
      >
        {options &&
          options.map((option, index) => (
            <Select.Option key={index} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leadListingCs: state.leadListing.controlStructure,
    LeadAdvFilter:
      state.leadListing && state.leadListing.getLeadAdvFilter && state.leadListing.getLeadAdvFilter.advancedFiltersList,
    leadData: state.leadListing && state.leadListing.allLeads && state.leadListing.allLeads.leadListResponseModel,
  };
};
const mapDispatchToProps = {
  executeGetLeadListingCs,
  executeGetAllLeadsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadListingScreen);

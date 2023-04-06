import React, { useEffect, useState } from "react";

// external imports
import { Row, Col, Table, Button, Tabs } from "antd";

// internal imports
//import ConsolidatedPortfolio from "../../components/MutualFundsTab/ConsolidatedPortfolio";
//import PortfolioHoldingTable from "../../components/PortfolioHoldingTable/PortfolioHoldingTable";
//import PortfolioHoldingSubTable from "../../components/PortfolioHoldingTable/PortfolioHoldingSubTable";
//import StockHoldingTable from "../../components/PortfolioHoldingTable/StockHoldingTable";
//import StockHoldingSubTable from "../../components/PortfolioHoldingTable/StockHoldingSubTable";
//import OverViewTab from "../port;
import TopBarHeader from "../../components/TopBarHeader/TopBarHeader";
import { exportJSON, generateCsObject } from "../../utils/utils";
import SubFiltersPanel from "./SubFilterPanel";
import {
  executeAssetClasswiseData,
  executeGetAssettypeWise,
  executeGetHoldingAmount,
  executeGetInvestmentAllocation,
  executeGetPortfolioHoldingsCs,
  executeGetTopHolding,
} from "../../redux/actions/portfolioHoldingsAction";

const PortfolioHoldingsFilter = (props) => {
  const { executeGetLeadListingCs, executeGetAllLeadsData, leadListingCs } = props;
  const [activeTab, setActiveTab] = useState("0");

  const [loading, setLoading] = useState(false);
  const [allLeadData, setAllLeadData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [upgradeFailedArray, setUpgradeFailedArray] = useState();
  const [deleteFailedArray, setDeleteFailedArray] = useState();
  const [assignFailedArray, setAssignFailedArray] = useState();
  const [showFailedActions, setShowFailedActions] = useState(false);
  const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);

  const [filters, setFilters] = useState({
    branch: null,
    category: null,
    filterParam: null,
    firstName: null,
    interestLevel: null,
    relationshipManager: null,
    sorting: null,
    source: null,
    type: null,
  });
  const styleSet = {
    cardStyle: {
      margin: "12px 0px",
    },
  };
  const filterCs = leadListingCs && generateCsObject(leadListingCs[0].controlStructureField);
  const handleTabChange = (key) => {
    setActiveTab(key);
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
  const onAdvFilterSubmit = (values) => {
    setFilters({ ...filters, ...values });
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
            Category: lead.category,
            "Interest Level": lead.interestLevel,
            "Contact Number": lead.mobile,
            Email: lead.email,
            Source: lead.source,
            Type: lead.type,
            "Relationship Manager": lead.relationshipManagerName,
            Branch: lead.branch,
          }));
    exportJSON(leadDownloadData, "leads");
  };

  return (
    <>
      <div className="lead-listing-container">
        <Row>
          <SubFiltersPanel
            selectedRows={selectedRows}
            selectedRowKeys={selectedRowKeys}
            controlStructure={filterCs}
            onFilterSelect={onFilterSelect}
            onSortSelect={onSortSelect}
            onAdvFilterSubmit={onAdvFilterSubmit}
            setShowUpgradeModal={setShowUpgradeModal}
            setShowDeleteModal={setShowDeleteModal}
            setShowAssignModal={setShowAssignModal}
            loading={loading}
            filterCs={filterCs}
            downloadRecords={downloadRecords}
            filtersData={filters}
          />
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
        </Row>
      </div>
    </>
  );
};
export default PortfolioHoldingsFilter;

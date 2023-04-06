// in-built imports
import React, { useEffect, useState } from "react";

import { Space, Drawer, Form, Select } from "antd";

import ConsolidatedPortfolio from "../../components/MutualFundsTab/ConsolidatedPortfolio";
import StockHoldingTable from "../../components/PortfolioHoldingTable/StockHoldingTable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faArrowAltToBottom } from "@fortawesome/pro-solid-svg-icons";
import { connect } from "react-redux";
import { exportJSON } from "../../utils/utils";
import StockHoldingAdvFilter from "../../components/PortfolioHoldingTable/StockHoldingAdvFilter";
import { CONSTANTS } from "../../constants/constants";
const PortfolioHoldingTableTab = (props) => {
  const { controlStructure, apiData, modalTitle, apiRequestData } = props;
  const [tableList, setTableList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState("Show All");

  const [sortBy, setSortBy] = useState(
    CONSTANTS.filterSortOptions.marketValueHightToLow
  );
  const [filterFormData, setFilterFormData] = useState({
    currency: undefined,
    country: undefined,
    fundType: undefined,
    fundManager: undefined,
    fundName: undefined,
  });

  useEffect(() => {
    setTableList(apiData);
  }, [apiData]);

  const advFilterList = controlStructure.csList[1].controlStructureField;

  const RenderFiltersPanel = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const toggleDrawer = () => {
      setShowDrawer(!showDrawer);
    };

    const onAdvancedFilterSubmit = (filterData) => {
      setFilterFormData(filterData);
      setFilterBy("Show All");
      setSortBy(CONSTANTS.filterSortOptions.marketValueHightToLow);
    };

    const downloadRecords = () => {
      const securityDetailsList =
        tableList &&
        tableList.length > 0 &&
        tableList.map((item, index) => ({
          //  key: index,
          "Sr.No": index + 1,
          Fund: item.issuerName,
          Units: item.units,
          "Book Value": item.book_cost,
          Income: item.gain_loss,
          "Market Values (Security Currency)": item.fcy_amount,
          "Market Values (Client Currency)": item.amount,
          // Accounts: item.source,
        }));
      exportJSON(securityDetailsList, "securityDetailsList");
    };

    return (
      <div className="filters-panel">
        <div className="left"></div>

        <RenderDropdown mode="filter" onSelect={onFilterSelect} />
        <RenderDropdown mode="sort" onSelect={onSortSelect} />
        <div className="right">
          <FontAwesomeIcon
            icon={faFilter}
            className={loading ? "disabled-icon" : "icon"}
            onClick={() => {
              toggleDrawer();
            }}
          />
          <FontAwesomeIcon
            icon={faArrowAltToBottom}
            className={loading ? "disabled-icon" : "icon"}
            onClick={() => {
              downloadRecords();
            }}
          />
        </div>

        <RenderAdvancedFilterDrawer
          showDrawer={showDrawer}
          toggleDrawer={toggleDrawer}
          onAdvFilterSubmit={onAdvancedFilterSubmit}
          // filterCs={controlStructure}
        />
      </div>
    );
  };

  const RenderAdvancedFilterDrawer = ({
    showDrawer,
    toggleDrawer,
    filterCs,
    onAdvFilterSubmit,
  }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
      currency: filterFormData.currency?.length
        ? filterFormData.currency
        : undefined,
      country: filterFormData.country?.length
        ? filterFormData.country
        : undefined,
      fundType: filterFormData.fundType?.length
        ? filterFormData.fundType
        : undefined,
      fundManager: filterFormData.fundManager?.length
        ? filterFormData.fundManager
        : undefined,
      fundName: filterFormData.fundName ? filterFormData.fundName : undefined,
    });
    const onValuesChange = (values) => {
      console.log("values", values);
    };

    return (
      <Drawer
        width={"26vw"}
        className="oppor-list-advanced-filter-drawer-container"
        visible={showDrawer}
        onClose={toggleDrawer}
        closable
      >
        <div className="header">
          <StockHoldingAdvFilter
            form={form}
            filterCs={filterCs}
            formData={formData}
            controlStructure={controlStructure}
            toggleDrawer={toggleDrawer}
            onFinish={onAdvFilterSubmit}
            advancedFilter={advFilterList}
            onValuesChange={onValuesChange}
            setFilterFormData={setFilterFormData}
            onCancel={onCancel}
          />
        </div>
      </Drawer>
    );
  };

  const onCancel = () => {
    setTableList(apiData);
  };

  const onFilterSelect = (value) => {
    // filter operation
    // setValueFiltered(true);
    let filteredDocList;
    switch (value) {
      case "RCNTRD":
        filteredDocList = tableList.filter((item) => item.isRecentlyTraded);
        break;
      case "SHOWALL":
        filteredDocList = apiData;
        break;
      default:
        break;
    }

    if (filteredDocList) {
      setFilterBy(value);
      setTableList(filteredDocList);
    } else {
      setTableList(apiData);
    }
    setLoading(false);
  };
  const onSortSelect = (value) => {
    // sort operation
    // setValueFiltered(false);

    let sortedList;
    switch (value) {
      case "BookValHToL":
        sortedList = [...tableList].sort(function (a, b) {
          return b.book_cost - a.book_cost;
        });
        break;
      case "BookValLToH":
        sortedList = [...tableList].sort(function (a, b) {
          return a.book_cost - b.book_cost;
        });
        break;
      case "IncomeHToL":
        sortedList = [...tableList].sort(function (a, b) {
          return b.gain_loss - a.gain_loss;
        });
        break;
      case "IncomeLToH":
        sortedList = [...tableList].sort(function (a, b) {
          return a.gain_loss - b.gain_loss;
        });
        break;
      case "MarketValHToL":
        sortedList = [...tableList].sort(function (a, b) {
          return b.amount - a.amount;
        });
        break;
      case "MarketValLToH":
        sortedList = [...tableList].sort(function (a, b) {
          return a.amount - b.amount;
        });
        break;
      case "SecurityAToZ":
        sortedList = [...tableList].sort(function (a, b) {
          let nameA = a.security.toUpperCase();
          let nameB = b.security.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
      case "SecurityZToA":
        sortedList = [...tableList].sort(function (a, b) {
          let nameA = a.security.toUpperCase();
          let nameB = b.security.toUpperCase();
          if (nameB < nameA) {
            return -1;
          }
          if (nameB > nameA) {
            return 1;
          }
          return 0;
        });
        break;
      case "UnitsHToL":
        sortedList = [...tableList].sort(function (a, b) {
          return b.units - a.units;
        });
        break;
      case "UnitsLToH":
        sortedList = [...tableList].sort(function (a, b) {
          return a.units - b.units;
        });
        break;
      default:
        break;
    }

    if (sortedList) {
      setSortBy(value);
      setTableList(sortedList);
    } else {
      setTableList(sortedList);
    }
    setLoading(false);
  };

  const RenderDropdown = ({ mode, onSelect }) => {
    let options = [];
    if (mode === "filter") {
      options =
        controlStructure && controlStructure.csList.length > 0
          ? controlStructure.csList[0].controlStructureField[0].dropDownValue
          : [];
    } else if (mode === "sort") {
      options =
        controlStructure && controlStructure.csList.length > 0
          ? controlStructure.csList[0].controlStructureField[1].dropDownValue
          : [];
    }

    return (
      <div style={{ position: "relative" }}>
        <div className="dropdown-prefix">
          {mode.charAt(0).toUpperCase() + mode.substring(1)}:
        </div>
        <Select
          className={"filter-sort-dropdown " + mode}
          style={{ padding: "3px 0px" }}
          size="large"
          // defaultValue={mode === "filter" ? "Show All" : "Recently Modified"}
          onSelect={onSelect}
          value={mode === "filter" ? filterBy : sortBy}
          showArrow
        >
          {options &&
            options.map((option, index) => (
              <Select.Option key={index} value={option.dataValue}>
                {option.displayValue}
              </Select.Option>
            ))}
        </Select>
      </div>
    );
  };

  const updateTableData = (filterData) => {
    let advFilteredData = apiData;
    if (filterData.currency && filterData.currency.length > 0) {
      advFilteredData = advFilteredData.filter(
        (record) => {
          return (record.currency &&
          record.currency !== null &&
          filterData.currency.includes(record.currency))
        }
      );
    }
    if (filterData.country && filterData.country.length > 0) {
      advFilteredData =  advFilteredData.filter(
        (record) => {
          return (record.country &&
          record.country !== null &&
          filterData.country.includes(record.country))
        }
      );
    }
    if (filterData.fundType && filterData.fundType.length > 0) {
      advFilteredData = advFilteredData.filter(
        (record) =>
          record.fundType &&
          record.fundType !== null &&
          filterData.fundType.includes(record.fundType)
      );
    }
    if (filterData.fundManager && filterData.fundManager.length > 0) {
      advFilteredData = advFilteredData.filter(
        (record) =>
          record.issuer &&
          record.issuer !== null &&
          filterData.fundManager.includes(record.issuer)
      );
    }
    if (filterData.fundName && filterData.fundName.length > 0) {
      advFilteredData = advFilteredData.filter(
        (record) =>
          record.security &&
          record.security !== null &&
          filterData.fundName.includes(record.security)
      );
    }
    setTableList(advFilteredData);
  };

  useEffect(() => {
    updateTableData(filterFormData);
  }, [filterFormData]);

  return (
    <>
      {apiData && (
        <Space direction="vertical">
          <ConsolidatedPortfolio />
          <RenderFiltersPanel />
          <StockHoldingTable
            tableData={tableList}
            modalTitle={modalTitle}
            requestData={apiRequestData}
          />
        </Space>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    controlStructure: state.portfolioHoldings.controlStructure,
  };
};

export default connect(mapStateToProps)(PortfolioHoldingTableTab);

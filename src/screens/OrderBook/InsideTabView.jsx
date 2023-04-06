// antd
import { Col, Row, Select } from "antd";

// icon
import {
  InteractionOutlined,
  ShoppingCartOutlined,
  TagOutlined,
} from "@ant-design/icons";
import {
  faArrowAltToBottom,
  faFilter,
  faFileExcel,
  faFileCheck,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// react
import React, { useEffect, useRef, useState } from "react";

// redux
import { connect, useSelector } from "react-redux";

// styles
import "./OrderBook.scss";

// components
import TableUI from "./TableUI";
import RenderAdvancedFilterDrawer from "./RenderAdvancedFilterDrawer";
import { exportJSON } from "../../utils/utils";

//authorize module
import { authorizeModule } from "../../utils/utils";
import { CONSTANTS } from "../../constants/constants";

const InsideTabView = ({
  orderBookList,
  filterOptions,
  sortOptions,
  clientId,
  OrderStages = [],
  showCurrencySymbol,
  activeTab,
  setBoolean,
  leftPanel,
  showLoader = false,
  authorizeCode,
}) => {
  const defaultAdvState = { Dropdown: {}, Range: {} };
  const [advFilter, setAdvFilters] = useState(defaultAdvState);

  //reject and approve modal
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // white box
  const [buyValue, setBuyValue] = useState(0);
  const [buyValueCount, setBuyValueCount] = useState(0);
  const [sellValue, setSellValue] = useState(0);
  const [sellValueCount, setSellValueCount] = useState(0);

  // drop down
  const [dropDownValue, setDropDownValue] = useState(null);

  // REMOVED FOR THIS PHASE, SO JUST COMMENTED
  // const [options, setOptions] = useState([]);

  // purple box
  const [orderData, setOrderData] = useState([]);

  // for table
  const [tableData, setTableData] = useState([]);

  // filter
  const [showDrawer, hideShowDrawer] = useState(false);
  const [sortDisplayValue, setSortDisplayValue] = useState(
    "Sort: Last updated (Near to far)"
  );
  const [filterDisplayValue, setFilterDisplayValue] =
    useState("Filter: Show All");
  const [newFilterOptions, setNewFilterOptions] = useState([]);

  // refs
  const isSelected = useRef({ sort: false, filter: false });

  //to check whether Advance Filter is applied or not
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const userRole = useSelector((state) => state.auth.user.userRole);

  const toggleDrawer = () => {
    hideShowDrawer(!showDrawer);
  };

  //to get the selectedrowkeys
  const [selRowKeys, setSelRowKeys] = useState([]);
  const [selRow, setSelRow] = useState([]);
  const handleCallBack = (data, e) => {
    setSelRowKeys(data);
    setSelRow(e);
  };

  useEffect(() => {
    setTableData(orderBookList?.orderBookList || []);
    populateFilterDropDown();
  }, [orderBookList]);

  const populateFilterDropDown = () => {
    // let newOptions = orderBookList?.orderBookList?.map((e) => ({
    // 	dataValue: e?.customerId,
    // 	displayValue: e?.customerName,
    // }));

    // let newOptions = newOptions?.filter(
    // 	(elem, index) => newOptions?.findIndex((obj) => obj.dataValue === elem.dataValue) === index
    // );
    // setNewFilterOptions(filterOptions?.concat(newOptions));
    setNewFilterOptions(filterOptions);
  };

  const calculateMonthQuarterYearCount = (
    type,
    isDropDownValueNeeded = false
  ) => {
    OrderStages.map((ele) => {
      ele.value = tableData?.filter(
        (e) => e.statusName === ele.displayValue
      )?.length;
    });

    return OrderStages;
  };

  const calculateTotalValue = (type, isDropDownValueNeeded = false) => {
    let newSchemeDetail;

    if (isDropDownValueNeeded) {
      newSchemeDetail = tableData
        ?.filter((e) => e?.scheme === dropDownValue && e[type] !== null)
        ?.reduce(
          (accumulator, currentValue) => accumulator + currentValue[type],
          0
        );
    } else {
      newSchemeDetail = tableData
        ?.filter((e) => e[type] !== null)
        ?.reduce(
          (accumulator, currentValue) => accumulator + currentValue[type],
          0
        );
    }

    return newSchemeDetail;
  };

  const calculateTotalValueCount = (type, isDropDownValueNeeded = false) => {
    let newSchemeDetail;

    if (isDropDownValueNeeded) {
      newSchemeDetail = tableData?.filter(
        (e) => e?.scheme === dropDownValue && e[type] !== null && e[type] > 0
      )?.length;
    } else {
      newSchemeDetail = tableData?.filter(
        (e) => e[type] !== null && e[type] > 0
      )?.length;
    }
    return newSchemeDetail;
  };

  useEffect(() => {
    if (dropDownValue) {
      const buyValueKey = "buyValue";
      // updating white box based on selection
      setBuyValue(calculateTotalValue(buyValueKey, true));
      setBuyValueCount(calculateTotalValueCount(buyValueKey, true));

      const sellValueKey = "sellValue";
      setSellValue(calculateTotalValue(sellValueKey, true));
      setSellValueCount(calculateTotalValueCount(sellValueKey, true));

      // updating purple box based on selection
      setOrderData(calculateMonthQuarterYearCount("M", true));

      // updating table based on selection
      const newTableData = orderBookList?.orderBookList?.filter(
        (e) => e.scheme === dropDownValue
      );
      setTableData(newTableData);
    }
  }, [dropDownValue]);

  const populateDropDown = () => {
    let newOptions = orderBookList?.orderBookList?.map((e) => ({
      displayValue: e?.schemeName,
      dataValue: e?.scheme,
    }));

    newOptions = newOptions?.filter(
      (elem, index) =>
        newOptions?.findIndex((obj) => obj.dataValue === elem.dataValue) ===
        index
    );
    setDropDownValue(null);
    // setOptions(newOptions);
  };

  useEffect(() => {
    const buyValueKey = "buyValue";
    setBuyValue(calculateTotalValue(buyValueKey));
    setBuyValueCount(calculateTotalValueCount(buyValueKey));

    const sellValueKey = "sellValue";
    setSellValue(calculateTotalValue(sellValueKey));
    setSellValueCount(calculateTotalValueCount(sellValueKey));

    // calculating month quarter and year
    setOrderData(calculateMonthQuarterYearCount("M"));

    populateDropDown();
  }, [tableData]);

  const styles = {
    rightSpace: {
      marginRight: "1rem",
    },
    leftSpace: {
      marginLeft: "-6rem",
    },
    alignOrderSummary: {
      marginRight: "9rem",
    },
  };

  const isFilterValueSelected = () => isSelected.current.filter;

  const sortByDate = (key, type, versionType) => {
    let newTableData = orderBookList?.orderBookList
      ? [...orderBookList?.orderBookList]
      : [];
    if (isFilterValueSelected()) {
      newTableData = [...tableData];
    }
    if (versionType === "asc") {
      newTableData = newTableData?.sort((a, b) => a["version"] - b["version"]);
    } else if (versionType === "desc") {
      newTableData = newTableData?.sort((a, b) => b["version"] - a["version"]);
    }
    if (type === "asc") {
      newTableData = newTableData?.sort(
        (a, b) => new Date(a[key]) - new Date(b[key])
      );
    } else if (type === "desc") {
      newTableData = newTableData?.sort(
        (a, b) => new Date(b[key]) - new Date(a[key])
      );
    }
    setTableData(newTableData);
  };

  const sort = (key, type) => {
    let newTableData = orderBookList?.orderBookList
      ? [...orderBookList?.orderBookList]
      : [];
    if (isFilterValueSelected()) {
      newTableData = [...tableData];
    }
    if (type === "asc") {
      newTableData = newTableData?.sort((a, b) => a[key] - b[key]);
    } else if (type === "desc") {
      newTableData = newTableData?.sort((a, b) => b[key] - a[key]);
    }
    setTableData(newTableData);
  };

  const sortByTranType = (type) => {
    let newTableData = orderBookList?.orderBookList?.filter(
      (e) => e?.purSal === type
    );
    setTableData(newTableData);
  };

  const findIsBreached = () => {
    let newTableData = orderBookList?.orderBookList?.filter(
      (e) => e?.isBreached === true
    );
    setTableData(newTableData);
  };

  const filterByStatus = (value = "") => {
    let newTableData = orderBookList?.orderBookList
      ? [...orderBookList?.orderBookList]
      : [];
    newTableData = newTableData?.filter(
      (e) => e?.status.toLowerCase() === value
    );

    setTableData(newTableData);
  };
  const filterMarketType = (value = "") => {
    let newTableData = orderBookList?.orderBookList
      ? [...orderBookList?.orderBookList]
      : [];
    newTableData = newTableData?.filter((e) => e?.marketType === value);

    setTableData(newTableData);
  };
  const filterByCustomer = (value = "") => {
    let newTableData = orderBookList?.orderBookList
      ? [...orderBookList?.orderBookList]
      : [];
    newTableData = newTableData?.filter((e) => e?.customerId === value);

    setTableData(newTableData);
  };

  const filterForActive = (value) => {
    let newTableData = orderBookList?.orderBookList
      ? [...orderBookList?.orderBookList]
      : [];
    newTableData = newTableData?.filter((e) => e?.status !== "Cancelled");

    setTableData(newTableData);
  };

  const handleFilterChange = (value) => {
    isSelected.current.filter = true;
    let selectedOption = newFilterOptions?.find((e) => e?.dataValue === value);
    setFilterDisplayValue("Filter: " + selectedOption?.displayValue);
    if (value === "SHOWALL") {
      setTableData(orderBookList?.orderBookList);
    } else if (value === "BREACHEDORD") {
      findIsBreached();
    } else if (value === "SELL") {
      sortByTranType("S");
    } else if (value === "BUY") {
      sortByTranType("P");
    } else if (value === "CANCELLED" || value === "PENDINGAUTH") {
      filterByStatus(selectedOption?.displayValue.toLowerCase());
    } else if (value === "PRIMARY" || value === "SECONDARY") {
      filterMarketType(selectedOption?.displayValue);
    } else if (value === "ACTIVE") {
      filterForActive(selectedOption?.displayValue);
    } else {
      filterByCustomer(value);
    }
  };

  const handleSortChange = (value) => {
    isSelected.current.sort = true;
    setSortDisplayValue(
      "Sort: " + sortOptions?.find((e) => e?.dataValue === value)?.displayValue
    );
    if (value === "CreDateNToF") {
      sortByDate("inputDateTime", "desc", "asc");
    } else if (value === "CreDateNToF") {
      sortByDate("inputDateTime", "asc", "asc");
    } else if (value === "ModiDateFToN") {
      sortByDate("inputDateTime", "desc", "desc");
    } else if (value === "ModiDateNToF") {
      sortByDate("inputDateTime", "asc", "desc");
    } else if (value === "OrderValueLToS") {
      sort("amount", "desc");
    } else if (value === "OrderValueSToL") {
      sort("amount", "asc");
    }
  };

  const RenderDropdown = ({ mode, onSelect }) => {
    let options =
      mode === "filter"
        ? newFilterOptions?.map((e) => ({
            label: e?.displayValue,
            value: e?.dataValue,
          }))
        : sortOptions?.map((e) => ({
            label: e?.displayValue,
            value: e?.dataValue,
          }));

    return (
      <div style={{ position: "relative" }}>
        {/* <div className='dropdown-prefix'>{mode.charAt(0).toUpperCase() + mode.substring(1)}:</div> */}
        <Select
          className={"filter-sort-dropdown " + mode}
          size="large"
          onSelect={onSelect}
          placeholder={
            mode === "filter" ? filterDisplayValue : sortDisplayValue
          }
          showArrow
          onChange={(value) =>
            mode === "filter"
              ? handleFilterChange(value)
              : handleSortChange(value)
          }
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

  const downloadRecords = () => {
    const csvData = tableData?.map((e, idx) => {
      return {
        // "Sr.No": idx + 1,
        // "Fund Name": e?.customerName,
        // Type: e?.tranType,
        // Consideration: e?.amount,
        // Participants: e?.custodian,
        // Amount: e?.portfolio,
        "Sr. No.": idx + 1,
        Market: e?.marketTypeName,
        "Deal ID": e?.dealId,
        "Client ID": e?.customerId,
        Client: e?.customerName,
        "Account Name": e?.schemeName,
        "Account Nature": e?.accountNature,
        "Asset Group": e?.assetGroupName,
        "Asset Type": e?.assetTypeName,
        Security: e?.security,
        "Security Name": e?.securityName,
        "Tran Type": e?.tranTypeName,
        Currency: e?.currency,
        Price: e?.rate,
        Units: e?.units,
        "Total Value": e?.amount,
        "Order Date": e?.valueDate,
        Compliance: e?.complianceName,
        Status: e?.statusName,
      };
    });
    exportJSON(csvData, "Order Book Listing");
  };

  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <Row>
        {/* <Col flex="52%" className="leftTopCard tradeCard"> */}
        <Col flex="1" className="leftTopCard tradeCard">
          <p className="cardTitle" style={{ color: "#2a52be" }}>
            Order Book
          </p>
          <Row justify="center">
            <Col md={{ span: 7 }} style={styles.rightSpace}>
              <Row>
                <Col flex="auto">
                  {/* <Col flex="1"> */}
                  <ShoppingCartOutlined className="cardIcons" />
                </Col>
                <Col
                  // flex="auto"
                  flex="1"
                  className="tradeColumn"
                  style={styles.leftSpace}
                >
                  <p>
                    {showCurrencySymbol}
                    {numberWithCommas(Math.floor(buyValue))}
                  </p>
                  <p>Buy Orders ({Math.floor(buyValueCount)})</p>
                </Col>
              </Row>
            </Col>
            <Col md={{ span: 7 }} style={styles.rightSpace}>
              <Row>
                <Col flex="auto">
                  <TagOutlined className="cardIcons" />
                </Col>
                <Col flex="1" className="tradeColumn" style={styles.leftSpace}>
                  <p>
                    {showCurrencySymbol}
                    {numberWithCommas(Math.floor(sellValue))}
                  </p>
                  <p>Sell Orders ({Math.floor(sellValueCount)})</p>
                </Col>
              </Row>
            </Col>
            <Col md={{ span: 7 }} style={styles.rightSpace}>
              <Row>
                <Col flex="auto">
                  <InteractionOutlined className="cardIcons" />
                </Col>
                <Col flex="1" className="tradeColumn" style={styles.leftSpace}>
                  <p>
                    {showCurrencySymbol}
                    {numberWithCommas(
                      Math.floor(buyValue) + Math.floor(sellValue)
                    )}
                  </p>
                  <p>Net Trade ({buyValueCount + sellValueCount})</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {/* <Col flex="auto" className="rightTopCard tradeCard"> */}
        <Col flex="1" className="rightTopCard tradeCard">
          {/* {
            // for cutsomer 360 username is visible not for trade listing
            orderBookList?.userName && (
              <p className="cardTitle">{orderBookList?.userName} portfolio</p>
            )
          } */}
          <p className="cardTitle">Order Summary</p>
          {/* <Row>
						<Col span={12}></Col>
						<Col span={12}></Col>
					</Row> */}
          <Row>
            {OrderStages.length &&
              OrderStages.map((ele, idx) => {
                return (
                  <Col span={8} className="tradeColumn" key={idx}>
                    <p>{ele?.value ?? 0}</p>
                    <p>{ele?.displayValue ?? "-"}</p>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
      <div className="filters-panel">
        <div className="left">
          {authorizeModule(
            authorizeCode,
            CONSTANTS.authorizeCode.approveReject
          ) && (
            // selRow.workFlowFormType === "ApproveReject" &&
            //   selRow.workFlowUserGroup === userRole &&
            <FontAwesomeIcon
              icon={faFileCheck}
              className={selRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={() => selRowKeys.length > 0 && setShowApproveModal(true)}
            />
          )}
          {authorizeModule(
            authorizeCode,
            CONSTANTS.authorizeCode.approveReject
          ) && (
            // selRow.workFlowFormType === "ApproveReject" &&
            //   selRow.workFlowUserGroup === userRole &&
            <FontAwesomeIcon
              icon={faFileExcel}
              className={selRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={() => selRowKeys.length > 0 && setShowRejectModal(true)}
            />
          )}
        </div>
        <RenderDropdown mode="filter" />
        <RenderDropdown mode="sort" />
        <div className="right">
          <div className="icon-filter-wrapper">
            <FontAwesomeIcon
              icon={faFilter}
              className="icon"
              onClick={() => {
                toggleDrawer();
              }}
            />
            {/* {isFilterApplied && <span className="filter-badge"></span>} */}
            {isFilterApplied && <span className="filter-badge"></span>}
          </div>
          {tableData?.length > 0 && (
            <FontAwesomeIcon
              icon={faArrowAltToBottom}
              className="icon"
              onClick={downloadRecords}
            />
          )}
        </div>
        <RenderAdvancedFilterDrawer
          showDrawer={showDrawer}
          toggleDrawer={toggleDrawer}
          closable={true}
          setTableData={setTableData}
          tableData={tableData}
          advFilter={advFilter}
          setAdvFilters={setAdvFilters}
          clientId={clientId}
          setIsFilterApplied={setIsFilterApplied}
        />
      </div>

      {/* {tableData.length > 0 ? ( */}
      <TableUI
        tableData={tableData}
        activeTab={activeTab}
        userRole={userRole}
        setBoolean={setBoolean}
        setShowApproveModal={setShowApproveModal}
        setShowRejectModal={setShowRejectModal}
        showRejectModal={showRejectModal}
        showApproveModal={showApproveModal}
        handleCallBack={handleCallBack}
        selRow={selRow}
        showLoader={showLoader}
      />
      {/* ) : (
        <h1> loading... </h1>
      )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    orderBookList: state.orderBook.orderBookList,
    advancedFilter: state.orderBook.advancedFilter,
    leftPanel: state.dashboard.leftPanel,
  };
};

export default connect(mapStateToProps)(InsideTabView);

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faArrowAltToBottom,
  faArchive,
  faFilter
} from "@fortawesome/pro-light-svg-icons";
import moment from 'moment';

import { executeGetFilterReportManager } from '../../redux/actions/reportsActions/reportsActions';
import { executeGetAdvancedFilter } from "../../redux/actions/reportsActions/reportsActions";

import { connect } from "react-redux";
import RenderAdvancedFilterDrawer from './RenderAdvancedFilterDrawer.jsx';
import "./ReportManager.scss"

const ReportTableFilter = (props) => {
  const { filterReportControlStructure,
    selectedRowKeys,
    setShowDeleteModal,
    setShowArchiveModal,
    localTableData,
    setLocalTableData = () => { },
    listData,
    setAdvancedFilterVal,
    advancedFilterCS,
    advancedFilterVal,
    advFilter,
    setAdvFilters = () => { },
    checkTableRowStatus
  } = props


  const [filterBy, setFilterBy] = useState("Show All");
  const [sortBy, setSortBy] = useState("");
  const [filterCsObject, setFilterCsObject] = useState([]);

  const [isAdvancedFilterVisible, setIsAdvancedFilterVisible] = useState(false);

  const [filterByControlStructure, setFilterByControlStructure] = useState([]);
  const [sortByControlStructure, setSortByControlStructure] = useState([]);

  useEffect(() => {
    executeGetFilterReportManager();
    executeGetAdvancedFilter();
  }, [])


  useEffect(() => {
    let newFilterByCs = [];
    let newSortByCs = [];
    filterByControlStructure && filterReportControlStructure ?.forEach(element => {
      if (element.keyField === 'RPTMANAGERLIST') { //for filter record
        element ?.dropDownValue ?.forEach(ele => {
          newFilterByCs.push({ dataValue: ele.dataValue, displayValue: ele.displayValue });
        })
      }
      else {
        element ?.dropDownValue ?.forEach(ele => {
          newSortByCs.push({ dataValue: ele.dataValue, displayValue: ele.displayValue });

        })
      }
    });
    setFilterByControlStructure(newFilterByCs);
    setSortByControlStructure(newSortByCs);
  }, [filterReportControlStructure]);

  // useEffect(()=>{
  //   setAdvFilters(advancedFilterCS)
  // },[advancedFilterCS]);


  const onSelection = (days, item) => {
    let startDate = moment().subtract(days, 'days')
    let endDate = moment();
    return (moment(item.inputDateTime).isBetween(startDate, endDate, 'days', []))
  }

  const toggleDrawer = () => setIsAdvancedFilterVisible(!isAdvancedFilterVisible);

  const onFilterSelect = (data) => {
    let filterTableData;
    switch (data) {
      case "SHOWALL":
        filterTableData = listData;
        break;
      case "GEN7DAYS":
        filterTableData = listData.filter((item) => { return onSelection(7, item); })
        break;
      case "GEN15DAYS":
        filterTableData = listData.filter((item) => { return onSelection(15, item); })
        break;
      case "GEN30DAYS":
        filterTableData = listData.filter((item) => { return onSelection(30, item); })
        break;
      default:
        break;
    }
    if (filterTableData) {
      setFilterBy(data);
      setLocalTableData(filterTableData)
    }
    else {
      setLocalTableData(listData)
    }

  }

  const isString = (data) => typeof data === "string";


  const onSortSelect = (data) => {
    // onFilterSelect(filterBy)
    let sortTableData;
    switch (data) {
      case 'GENDATENTOF':
        sortTableData = [...localTableData].sort((a, b) => {
          const aTimestamp = moment(a.inputDateTime);
          const bTimestamp = moment(b.inputDateTime);
          return bTimestamp.diff(aTimestamp);
        });
        break;
      case 'GENDATEFTON':

        sortTableData = [...localTableData].sort((a, b) => {
          const aTimestamp = moment(a.inputDateTime);
          const bTimestamp = moment(b.inputDateTime);
          return aTimestamp.diff(bTimestamp);
        });
        break;

      case 'RPTNAMEATOZ':
        sortTableData = [...localTableData].sort((a, b) => {
          if (isString(a ?.reportName) && isString(b ?.reportName)) {
            return a ?.reportName ?.localeCompare(b ?.reportName);
          }
          return a ?.reportName - b ?.reportName;
        })
        break;

      case 'RPTNAMEZTOA':
        sortTableData = [...localTableData].sort((a, b) => {
          if (isString(a ?.reportName) && isString(b ?.reportName)) {
            return b ?.reportName ?.localeCompare(a ?.reportName);
          }
          return b ?.reportName - a ?.reportName;
        })
        break;

      case 'STATUSATOZ':
        sortTableData = [...localTableData].sort((a, b) => {
          if (isString(a ?.status) && isString(b ?.status)) {
            return a ?.status ?.localeCompare(b ?.status);
          }
          return a ?.status - b ?.status;
        })
        break;
      case 'STATUSZTOA':
        sortTableData = [...localTableData].sort((a, b) => {
          if (isString(a ?.status) && isString(b ?.status)) {
            return b ?.status ?.localeCompare(a ?.status);
          }
          return b ?.status - a ?.status;
        })
        break;
      default:
        break;
    }
    if (sortTableData) {
      setSortBy(data)
      setLocalTableData(sortTableData)
    }
    else {
      setLocalTableData(listData)
    }
  }

  const RenderDropdown = ({ mode, onSelect }) => {
    let options = [];
    if (mode === "filter") {
      options = filterByControlStructure; //Mapped value from backend
    } else if (mode === "sort") {
      options = sortByControlStructure; //Mapped value from backend
    }




    return (
      <div style={{ position: "relative" }}>
        <div className="dropdown-prefix">
          {mode.charAt(0).toUpperCase() + mode.substring(1)}:{" "}
          {mode === "sort" && sortBy.length === 0 ? "Select Sort by" : ""}
        </div>
        <Select
          className={"filter-sort-dropdown " + mode}
          size="large"
          placeholder={mode === "filter" ? "Select filter" : "Select Sort by"}
          onSelect={onSelect}
          value={mode === "filter" ? filterBy : sortBy}
          showArrow
        // onChange={mode === "filter" ? onChangeFilterHandler : onChangeSortHandler}
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
  const RenderFiltersPanel = () => {
    // const onAdvancedFilterSubmit = (filterData) => {
    //   //   setFilterFormData(filterData);
    //   setFilterBy("Show All");
    //   setSortBy("");
    //   //   setAdvanceFiltreApplied(true);
    // };

    return (
      <>
        <div className="filters-panel">
          {/* <div className="report-table-filter-panel"> */}
          <div className="left">
            <FontAwesomeIcon className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"} icon={faArrowAltToBottom} style={{ marginRight: "15px" }} />
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{ marginRight: "15px" }}
              className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
              // onClick={() => selectedRowKeys.length > 0 && setShowDeleteModal(true)}
              onClick={() => selectedRowKeys.length > 0 && checkTableRowStatus('deleteBtn')}
            // onClick={archiveRecord(selectedRowKeys)}
            // onClick={() => archiveRecord()}
            // onClick={() => setShowDeleteModal(true)}
            />
            <FontAwesomeIcon className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"} icon={faArchive}
              // onClick={() => selectedRowKeys.length > 0 && setShowArchiveModal(true)} 
              onClick={() => selectedRowKeys.length > 0 && checkTableRowStatus('archiveBtn')}
            />
          </div>
          {/* <Button onClick={() => setShowArchiveModal(true)}>Archive</Button> */}

          <div className="right">
            {/* <Button>delete</Button> */}
            {/* <RenderDropdown mode="filter" onSelect={onFilterSelect} /> <RenderDropdown mode="filter" onSelect={onFilterSelect} /> */}
            <RenderDropdown mode="filter" onSelect={onFilterSelect} />
            <RenderDropdown mode="sort" onSelect={onSortSelect} />
            <FontAwesomeIcon
              icon={faFilter}
              // style={{ marginRight: "15px" }}
              className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
              onClick={toggleDrawer}
            />
          </div>
        </div>
        {/* <RenderAdvancedFilterDrawer
          showDrawer={isAdvancedFilterVisible}
          toggleDrawer={toggleDrawer}
          closable={true}
          setTableData={setLocalTableData}
          tableData={listData}
          advFilter={advFilter}
          setAdvFilters={setAdvFilters}
          setAdvancedFilterVal={setAdvancedFilterVal}
          advancedFilterVal={advancedFilterVal}
        // cacheTableData={cacheTableData}
        // setCacheData={setCacheData}
        /> */}

        <RenderAdvancedFilterDrawer
          showDrawer={isAdvancedFilterVisible}
          toggleDrawer={toggleDrawer}
          closable={true}
          setTableData={setLocalTableData}
          tableData={localTableData}
          advFilter={advFilter}
          setAdvFilters={setAdvFilters}
        />
      </>
    );
  };
  return (
    <>
      <RenderFiltersPanel />
    </>
  );
};

function mapStateToProps(state) {
  return {
    filterReportControlStructure: state ?.reportsData ?.reportFilterControlStructure ?.csList[0] ?.['controlStructureField'],
    advancedFilterCS: state ?.reportsData ?.advancedFilterControlStructure ?.advancedFiltersList
    
  };
};


export default connect(mapStateToProps)(ReportTableFilter)

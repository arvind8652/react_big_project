import React, { useEffect, useState } from "react";
import { Select, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faTrashAlt,
  faUserPlus,
  faChevronSquareUp,
} from "@fortawesome/pro-light-svg-icons";
import { faFilter, faArrowAltToBottom } from "@fortawesome/pro-solid-svg-icons";

import "../../screens/LeadListingScreen/LeadListingScreen.scss";
import "../../styles/common.scss";

import FilterDrawer from "../FilterDrawer/FilterDrawer";
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
  }, [filterCs]);
  return (
    <div style={{ position: "relative" }}>
      <div className="dropdown-prefix">
        {mode.charAt(0).toUpperCase() + mode.substring(1)}:
      </div>
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

const FilterPanel = (props) => {
  const {
    selectedRows,
    selectedRowKeys,
    controlStructure,
    onFilterSelect,
    onSortSelect,
    onAdvFilterSubmit,
    setShowUpgradeModal,
    setShowLeadUpgradeModal,
    setShowDeleteModal,
    setShowAssignModal,
    loading,
    filterCs,
    downloadRecords,
    filtersData,
  } = props;
  useEffect(() => {
    setShowDrawer(false);
  }, [onAdvFilterSubmit]);
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  return (
    <div className="filters-panel">
      <div className="left">
        <Tooltip title="Move Up" color="white">
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
            onClick={() =>
              selectedRowKeys.length > 0 && setShowUpgradeModal(true)
            }
          />
        </Tooltip>
        <Tooltip title="Assign">
          <FontAwesomeIcon
            icon={faUserPlus}
            className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
            onClick={() =>
              selectedRowKeys.length > 0 && setShowAssignModal(true)
            }
          />
        </Tooltip>
        <Tooltip title="Delete">
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
            onClick={() =>
              selectedRowKeys.length > 0 && setShowDeleteModal(true)
            }
          />
        </Tooltip>
        <Tooltip title="Upgrade">
          <FontAwesomeIcon
            icon={faChevronSquareUp}
            className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
            onClick={() =>
              selectedRowKeys.length > 0 && setShowLeadUpgradeModal(true)
            }
          />
        </Tooltip>
      </div>
      <RenderDropdown
        mode="filter"
        onSelect={onFilterSelect}
        filterCs={filterCs}
      />
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
        {/* <FontAwesomeIcon
            icon={faThLarge}
            className={loading ? "disabled-icon" : "icon"}
            style={{ opacity: 0.5 }}
          /> */}
      </div>
      {showDrawer && (
        <FilterDrawer
          showDrawer={showDrawer}
          toggleDrawer={toggleDrawer}
          filterCs={controlStructure}
          onAdvFilterSubmit={onAdvFilterSubmit}
          filtersData={filtersData}
          setIsFilterApplied={setIsFilterApplied}
        />
      )}
    </div>
  );
};

export default FilterPanel;

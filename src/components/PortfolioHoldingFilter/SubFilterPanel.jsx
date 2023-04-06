import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowCircleUp,
    faTrashAlt,
    faUserPlus,
} from "@fortawesome/pro-light-svg-icons";
import { faFilter, faArrowAltToBottom } from "@fortawesome/pro-solid-svg-icons";

import "../../screens/LeadListingScreen/LeadListingScreen.scss";
import "../../styles/common.scss";

import SubFilterDrawer from "./SubFilterDrawer";
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

const SubFilterPanel = ({
    selectedRows,
    selectedRowKeys,
    controlStructure,
    onFilterSelect,
    onSortSelect,
    onAdvFilterSubmit,
    setShowUpgradeModal,
    setShowDeleteModal,
    setShowAssignModal,
    loading,
    filterCs,
    downloadRecords,
    filtersData,
}) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    // useEffect(() => {
    //   const formDataKeys = Object.keys(filtersData);
    //   setFilterCount(
    //     formDataKeys.filter(
    //       (item) =>
    //         filtersData[item] !== undefined && filtersData[item].length > 0
    //     ).length
    //   );
    // }, [filtersData]);

    return (
        <div className="filters-panel">
            <div className="left">
                {/* <FontAwesomeIcon
          icon={faArrowCircleUp}
          className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
          onClick={() =>
            selectedRowKeys.length > 0 && setShowUpgradeModal(true)
          }
        />
        <FontAwesomeIcon
          icon={faUserPlus}
          className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
          onClick={() => selectedRowKeys.length > 0 && setShowAssignModal(true)}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className={selectedRowKeys.length === 0 ? "disabled-icon" : "icon"}
          onClick={() => selectedRowKeys.length > 0 && setShowDeleteModal(true)}
        /> */}
            </div>
            <RenderDropdown
                mode="filter"
                onSelect={onFilterSelect}
                filterCs={filterCs}
            />
            <RenderDropdown mode="sort" onSelect={onSortSelect} />
            <div className="right">
                <div className="icon-filter-wrapper">
                    <FontAwesomeIcon
                        icon={faFilter}
                        className={loading ? "disabled-icon" : "icon"}
                        onClick={() => {
                            toggleDrawer();
                        }}
                    />
                    {isFilterApplied && <span class="filter-badge"></span>}
                </div>
                <FontAwesomeIcon
                    icon={faArrowAltToBottom}
                    className={loading ? "disabled-icon" : "icon"}
                    onClick={() => {
                        downloadRecords();
                    }}
                />
                {/* <FontAwesomeIcon
            icon={faThLarge}
            className={loading ? "disabled-icon" : "icon"}
            style={{ opacity: 0.5 }}
          /> */}
            </div>
            {showDrawer && (
                <SubFilterDrawer
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

export default SubFilterPanel;

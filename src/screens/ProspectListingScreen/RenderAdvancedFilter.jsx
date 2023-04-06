import { Select, Input } from "antd";
import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import GenericDrawer from "../../components/GenericDrawer/GenericDrawer";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const AdvFilterBody = ({ setAdvFilters, advFilters, setIsFilterApplied }) => {
  const [filterCount, setFilterCount] = useState(0);
  const reactSelect = useSelector((state) => state.prospectListing.getProspectAdvFilter.advancedFiltersList);
  const styles = {
    title: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "24px",
      color: "#354081",
    },
    subtitle: {
      fontFamily: "Open Sans",
      fontSize: "1rem",
      lineHeight: "25px",
      color: "#696a91",
    },
  };

  const setFiltersObj = (dataType, key, whatChanged) => {
    let prevFilters = advFilters;
    prevFilters[dataType][key] = whatChanged;
    setAdvFilters({ ...prevFilters });
  };

  const renderFilter = (field) => {
    switch (field.dataType) {
      case "Dropdown":
        return (
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder={`Select ${field.label}`}
            onChange={(whatChanged) => {
              setFiltersObj(field.dataType, field.keyField, whatChanged);
            }}
            value={advFilters[field.dataType][field.keyField]}
          >
            {field.dataValues.map((eachOption) => {
              return (
                <Option value={eachOption.key} label={eachOption.value} key={eachOption.key}>
                  {eachOption.value}
                </Option>
              );
            })}
          </Select>
        );
      case "Autocomplete":
        return (
          <Input
            className="field"
            type="text"
            value={advFilters[field.dataType][field.keyField]}
            onChange={(event) => {
              setFiltersObj(field.dataType, field.keyField, event.target.value);
            }}
            placeholder="Search by client/ prospect name"
            suffix={<FontAwesomeIcon icon={faUserPlus} style={{ margin: "0 0 0 auto" }} />}
          />
        );
      default:
        return <p>Wrong Filter</p>;
    }
  };

  useEffect(() => {
    const formDataKeys = Object.keys(advFilters.Dropdown);
    const formDataKeys2 = Object.keys(advFilters.Autocomplete);
    setFilterCount(
      formDataKeys.filter((item) => advFilters.Dropdown[item] !== undefined && advFilters.Dropdown[item].length > 0)
        .length +
        formDataKeys2.filter(
          (item) => advFilters.Autocomplete[item] !== undefined && advFilters.Autocomplete[item].length > 0
        ).length
    );
  }, [advFilters]);

  useEffect(() => {
    filterCount > 0 ? setIsFilterApplied(true) : setIsFilterApplied(false);
  }, [filterCount]);

  return (
    <>
      <div style={styles.title}>Filter</div>
      <div style={styles.subtitle}>
        {" "}
        {filterCount === 0 ? "No" : filterCount} tag
        {filterCount > 1 && "s "}{" "}
      </div>
      {reactSelect?.map((eachFilter) => {
        return (
          <div style={{ marginBottom: "10px" }} key={eachFilter.keyField}>
            <p style={{ marginBottom: "0px" }}>{eachFilter.label}</p>
            {renderFilter(eachFilter)}
          </div>
        );
      })}
    </>
  );
};

const RenderAdvancedFilterDrawer = ({
  showDrawer = false, //to display drawer
  toggleDrawer = () => {}, // to change the state of showdrawer
  setTableData = () => {}, //setting the values on the table
  closable = true, // to close the drawer on X symbol
  advFilters = [], // state of adv filter
  setAdvFilters = () => {}, // setting the value of state
  setIsFilterApplied, // if filter is applied
  cacheData, //data of the table
}) => {
  const onClosingTheDrawer = () => {
    let DropdownObj = {};
    let AutocompleteObj = {};

    Object.keys(advFilters["Dropdown"]).forEach((key) => {
      DropdownObj[key] = [];
    });
    Object.keys(advFilters["Autocomplete"]).forEach((key) => {
      AutocompleteObj[key] = [];
    });

    setAdvFilters({
      Dropdown: { ...DropdownObj },
      Autocomplete: { ...AutocompleteObj },
    });
    setTableData(cacheData);
  };
  const onClosingTheDrawer2 = () => {
    toggleDrawer();
  };

  const onApplyPressed = () => {
    let filterData = cacheData;
    let filters = advFilters;

    Object.keys(filters).forEach((eachTypeOfFilter) => {
      Object.keys(filters[eachTypeOfFilter]).forEach((key) => {
        if (filters[eachTypeOfFilter][key].length === 0) {
          delete filters[eachTypeOfFilter][key];
          setAdvFilters({ ...filters });
        }
      });

      Object.keys(filters[eachTypeOfFilter]).forEach((key) => {
        filterData = filterData.filter((each) => {
          // USED FOR SEARCHING BY STRING
          if (typeof filters[eachTypeOfFilter][key] === "string") {
            return each[key].toLowerCase().includes(filters[eachTypeOfFilter][key]);
          }
          // USED FOR FILTERING IN DROPDOWN
          return filters[eachTypeOfFilter][key].includes(each[key]);
        });
      });
    });

    setTableData([...filterData]);
    toggleDrawer();
  };

  const buttonFooter = [
    {
      buttonProps: {
        type: "text",
      },
      title: "Reset",
      onButtonClick: () => onClosingTheDrawer(),
    },
    {
      buttonProps: {
        type: "primary",
        className: "submit-btn",
      },
      title: "Apply",
      onButtonClick: () => onApplyPressed(),
    },
  ];

  return (
    <GenericDrawer
      showDrawer={showDrawer}
      onCloseDrawer={onClosingTheDrawer2}
      closable={closable}
      renderBody={
        <AdvFilterBody setAdvFilters={setAdvFilters} advFilters={advFilters} setIsFilterApplied={setIsFilterApplied} />
      }
      buttonFooter={buttonFooter}
    />
  );
};

export default RenderAdvancedFilterDrawer;

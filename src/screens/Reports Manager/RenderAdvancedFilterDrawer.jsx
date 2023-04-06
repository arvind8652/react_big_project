import { Select, Slider } from "antd";
import { useSelector } from "react-redux";
import GenericDrawer from "../../components/GenericDrawer/GenericDrawer";

const { Option } = Select;

const AdvFilterBody = ({ setAdvFilters, advFilter }) => {
  const reactSelect = useSelector(
    (state) => state ?.reportsData ?.advancedFilterControlStructure ?.advancedFiltersList
  );

  const setFiltersObj = (dataType, key, whatChanged) => {
    setAdvFilters({
      ...advFilter,
      ...(advFilter[dataType][key] = whatChanged)
    });
  };

  const renderFilter = (field) => {
    // switch (field.dataType) {
    //   case "Dropdown":
    return (
      <Select
        // mode="multiple"
        mode={field.dataType === "Multiselect" ? "multiple" : "Dropdown"}
        style={{ width: "100%" }}
        placeholder={`Select ${field.label}`}
        onChange={(whatChanged) => {
          setFiltersObj(field.dataType, field.keyField, whatChanged);
        }}
        value={advFilter[field.dataType][field.keyField]}
      >
        {field.dataValues.map((eachOption) => {
          return (
            <Option
              value={eachOption.key}
              label={eachOption.value}
              key={eachOption.value}
            >
              {eachOption.value}
            </Option>
          );
        })}
      </Select>
    );
    //   default:
    //     return <p>Wrong Filter</p>;
    // }
  };

  return (
    <>
      <h2>Filter</h2>
      {reactSelect ?.map((eachFilter) => (
        <div style={{ marginBottom: "10px" }} key={eachFilter.keyField}>
          <p style={{ marginBottom: "0px" }}>{eachFilter.label}</p>
          {renderFilter(eachFilter)}
        </div>
      ))}
    </>
  );
};

const RenderAdvancedFilterDrawer = ({
  showDrawer = false,
  toggleDrawer = () => { },
  setTableData = () => { },
  closable = true,
  advFilter = [],
  setAdvFilters = () => { }
}) => {
  const cacheData = useSelector((state) => state ?.reportsData ?.tableReportData ?.reportManagers);
  const onClosingTheDrawer = () => {
    let DropdownObj = {};
    let MultiselectObj = {};

    Object.keys(advFilter["Dropdown"]).forEach((key) => {
      DropdownObj[key] = [];
    });

    Object.keys(advFilter["Multiselect"]).forEach((key) => {
      MultiselectObj[key] = [];
    });

    setAdvFilters({
      Dropdown: { ...DropdownObj },
      Multiselect: { ...MultiselectObj }
      // Range: {}
    });
    setTableData(cacheData);
    toggleDrawer();
  };
  const onApplyPressed = () => {
    let filterData = cacheData;
    Object.keys(advFilter["Dropdown"]).forEach((key) => {
      filterData = cacheData.filter((each) => {
        if (advFilter["Dropdown"][key] === undefined) {
          return true;
        } else if (advFilter["Dropdown"][key].length === 0) {
          return true;
        } else {
          return advFilter["Dropdown"][key].includes(each[key]);
        }
      });
    });

    Object.keys(advFilter["Multiselect"]).forEach((key) => {
      filterData = cacheData.filter((each) => {
        if (advFilter["Multiselect"][key] === undefined) {
          return true;
        } else if (advFilter["Multiselect"][key].length === 0) {
          return true;
        } else {
          return advFilter["Multiselect"][key].includes(each[key]);
        }
      });
    });

    setTableData(filterData);
    toggleDrawer();
  };

  const buttonFooter = [
    {
      buttonProps: {
        type: "text"
      },
      title: "Cancel",
      onButtonClick: () => onClosingTheDrawer()
    },
    {
      buttonProps: {
        type: "primary",
        className: "submit-btn"
      },
      title: "Apply",
      onButtonClick: () => onApplyPressed()
    }
  ];

  return (
    <GenericDrawer
      showDrawer={showDrawer}
      onCloseDrawer={onClosingTheDrawer}
      closable={closable}
      renderBody={
        <AdvFilterBody setAdvFilters={setAdvFilters} advFilter={advFilter} />
      }
      buttonFooter={buttonFooter}
    />
  );
};

export default RenderAdvancedFilterDrawer;

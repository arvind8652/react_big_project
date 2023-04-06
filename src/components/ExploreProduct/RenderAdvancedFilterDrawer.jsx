import { Select, Slider } from "antd";
import { useSelector } from "react-redux";
import GenericDrawer from "../GenericDrawer/GenericDrawer";

const { Option } = Select;

const AdvFilterBody = ({ setAdvFilters, advFilter }) => {
  const reactSelect = useSelector(
    (state) => state.exploreProducts.exploreProductsAdvFilter
  );

  const setFiltersObj = (dataType, key, whatChanged) => {
    setAdvFilters({
      ...advFilter,
      ...(advFilter[dataType][key] = whatChanged),
    });
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
      case "Range":
        return (
          <Slider
            range
            max={field.maxValue}
            onChange={(whatChanged) => {
              setFiltersObj(field.dataType, field.keyField, whatChanged);
            }}
            value={
              advFilter[field.dataType][field.keyField]
                ? advFilter[field.dataType][field.keyField]
                : [0, field.maxValue]
            }
          />
        );
      default:
        return <p>Wrong Filter</p>;
    }
  };

  return (
    <>
      <h2>Filter</h2>
      {reactSelect?.map((eachFilter) => (
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
  toggleDrawer = () => {},
  setTableData = () => {},
  closable = true,
  advFilter = [],
  setAdvFilters = () => {},
}) => {
  const cacheData = useSelector((state) => state.exploreProducts.advCache);
  const onClosingTheDrawer = () => {
    let DropdownObj = {};

    Object.keys(advFilter["Dropdown"]).forEach((key) => {
      DropdownObj[key] = [];
    });

    setAdvFilters({
      Dropdown: { ...DropdownObj },
      Range: {},
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

    Object.keys(advFilter["Range"]).forEach((key) => {
      filterData = cacheData.filter((each) => {
        if (
          parseInt(each[key]) === null &&
          parseInt(advFilter["Range"][key][0]) === 0
        ) {
          return true;
        } else {
          return (
            parseInt(each[key]) >= parseInt(advFilter["Range"][key][0]) &&
            parseInt(each[key]) <= parseInt(advFilter["Range"][key][1])
          );
        }
      });
    });

    setTableData(filterData);
    toggleDrawer();
  };

  const buttonFooter = [
    {
      buttonProps: {
        type: "text",
      },
      title: "Cancel",
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

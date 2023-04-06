import { Select } from "antd";
import React, { useState, useEffect } from "react";
// import { DEFAULT_SELECT_DATA } from "../../screens/Reports Manager/PortfolioReport/PortfolioConstant";
import "./GenericSelect.scss";
import { theme } from "../../theme"

const DEFAULT_SELECT_DATA = [{ key: 'a10', keyField: 'a10', value: 'a10' }]
const defaultSelected = ""
export const GenericSelect = ({
  mode = "", // multiple
  defaultValue = "Please Select",
  setClearColumnNames = "",
  // value = "",
  // isRequired = false,
  valueData = "",
  formData = [],
  options = DEFAULT_SELECT_DATA,
  keyField = "",
  depenedentObj = {},
  onChange = () => {
    console.log("onChange");
  },
  onFocusChange = () => {
  },
  clearColumn = null,
  onClearColumn = () => {
  },
  valueHandler = () => {

  },
  // placeHolderHandler = () => { }

}) => {
  const { Option } = Select;
  const k = keyField;

  // const [selected, setSelected] = useState()
  // useEffect(() => {
  //   setSelected("")
  // }, [])

  function handleChange(keyField, value) {
    if (clearColumn) {
      setClearColumnNames(clearColumn);
      // alert(clearColumn);
      // onClearColumn(clearColumn);
    }
    onChange(keyField, value);



    // setSelected(value);
  }

  const handleFocusChange = () => {
    if (Object.keys(depenedentObj).length > 0) {
      onFocusChange(depenedentObj);
    }
  }

  // useEffect(() => {
  //   alert('123');
  // }, [])

  // useEffect(() => {
  //   alert('456');
  // }, [valueHandler])

  const handleValue = () => {
    valueHandler(keyField)
  }
  // const valueHandler = () => {
  //   let a;
  //   formData.filter(data => {
  //     if (Object.keys(data)[0] === keyField) {
  //       a = Object.values(data)[0]
  //     }
  //   })
  //   // if (a === "") {
  //   //   a = "Please select";
  //   // }
  //   return a;
  //   // setSelected(a);
  // }

  return (
    // <div className="generic-select-filters-panel">
    <div style={{ marginTop: "30px", borderBottom: "30px" }}>
      <Select
        // showSearch
        // className={"filter-sort-dropdown"}
        // className={"filter-sort-dropdown"}
        style={{ width: 200 }}
        mode={mode}
        allowClear={true}
        placeholder="Please select"
        // placeholder={placeHolderHandler(keyField)}
        // placeholder={valueHandler(keyField)}
        // defaultValue={defaultValue}
        // defaultValue="Please select"
        // autoClearSearchValue={true}
        // defaultValue={null}
        onChange={(value) => handleChange(keyField, value)}
        onFocus={handleFocusChange}
        // isRequired={isRequired}
        // value={selected}
        // onClick={setSelected(value)}
        value={valueHandler(keyField)}
      // value={handleValue}
      // value={false}
      // value={o}
      // value={valueData}
      >
        {options.map((ele) => (
          <Option key={ele.key} value={ele.key}>
            {ele.value}
          </Option>
        ))}
      </Select>
    </div>
  );
};

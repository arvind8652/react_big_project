import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { GenericSelect } from "../../components/GenericSelect/GenericSelect";
import { NewGenericInput } from "../../components/GenericInput/NewGenericInput";
import { getClientName, getDepenedentData } from "./ReportDependentControl";
import { GenericDate } from "../../components/GenericDate/GenericDate";
import { theme } from "../../theme";
import moment from 'moment';


const ReportStatement = ({
  csObjectData,
  childFlag = true,
  controlStructure,
  handleFormSubmit,
  onChangeHandler,
  keyFieldsHandler,
  formData,
  setFormData,
  setClearColumnNames,
  setIsRequiredField,
  oneTimeSetIsRequiredField,
}) => {
  // child state will come with Props -> with the help of that we will show or hide the components
  const style = { padding: "8px 0" };

  const [csObject, setCsObject] = useState(csObjectData);
  const [familyName, setFamilyName] = useState({ FamilyName: null });
  const [clientNameDependentData, setClientNameDependentData] = useState();
  const [depenendentData, setDepenendentData] = useState();
  const [optionVal, setOptionVal] = useState();
  const [newFormData, setNewFormData] = useState(formData);

  useEffect(() => {
    // executeGetClientStatementCS();
    setCsObject(csObjectData);
  }, [csObjectData]);


  const onChange = async (keyField, value) => {
    onChangeHandler(keyField, value);
  };



  const onFocusChange = async (depenedentObj) => {
    let dependentValue = [];
    let fieldListID;
    formData.filter((data) => {
      if (depenedentObj?.dependentColumn.includes(Object.keys(data)[0])) {
        dependentValue.push({ [Object.keys(data)[0]]: Object.values(data)[0] });
      }
      fieldListID = depenedentObj?.fieldlstId;
    })
    setDepenendentData(await getDepenedentData(fieldListID, dependentValue));
  }


  const valueHandler = (keyField) => {
    let returnValue = [];
    formData.filter(data => {
      if (Object.keys(data)[0] === keyField) {

        returnValue = Object.values(data)[0]
      }
    })
    return returnValue;

  }

  const selectFieldLabelHandler = (list) => {


    if (list?.controlType !== "Hidden") {
      return (<div style={{ marginTop: "25px" }}>{list.fieldLabel} {list.isRequired ? <span style={{ color: 'red' }}> *</span> : ""}</div>);

    }

  }

  const selectComponentHandler = (list) => {
    let optionsVal = [];
    if (list?.dropDownValue) {
      list?.dropDownValue?.forEach((element) => {
        optionsVal.push({
          key: element.dataValue,
          value: element.displayValue,
        });
      });
    } else if (list?.lookupValue?.lookUpValues) {
      let returnVal = list?.lookupValue?.returnColumn;
      let displayVal = list?.lookupValue?.displayColumn;

      list?.lookupValue?.lookUpValues?.forEach((element) => {
        optionsVal.push({
          key: element[returnVal],
          value: element[displayVal],
        });
      });
    }

    switch (list.controlType) {
      case (list.controlType === "DatePicker" ? "DatePicker" : "DateRangePicker"):
        return (
          <div style={{ marginTop: "25px" }}>
            <GenericDate
              type={list.controlType === "DatePicker" ? "DisabledFutureDate" : "DateRange"}
              keyField={list.keyField}
              onChange={onChange}
              valueHandler={valueHandler}
            />
          </div>
        );

      case "Hidden":

        break;
      case "InputField":
        return (<NewGenericInput type="text" keyField={list.keyField} onChange={onChange} disabled={false} />)
      default:
        return (
          <GenericSelect
            style={{ marginLeft: "10px" }}
            mode={list.controlType === "MultiSelect" ? "multiple" : "DropdownList"}
            options={list?.controlType === "DependentControl" ? depenendentData : optionsVal}
            keyField={list.keyField}
            onChange={onChange}
            onFocusChange={onFocusChange}
            depenedentObj={list?.controlType === "DependentControl" ? list : {}}
            clearColumn={list?.clearColumn}
            formData={formData}
            setClearColumnNames={setClearColumnNames}
            valueHandler={valueHandler}
          />
        );
    }
  };

  return (
    <>
      {!!childFlag && (
        <>
          <Row>
            {csObject &&
              csObject?.map((list) => {
                return (
                  <>

                    <Col span={6} style={theme.subHeaderName}>
                      <div style={{ marginTop: "40px", marginLeft: "25px" }}>
                        {
                          selectFieldLabelHandler(list)
                        }

                      </div>
                    </Col>
                    <Col span={6} style={{ marginTop: "15px" }}>
                      {selectComponentHandler(list)}
                    </Col>

                  </>
                );
              })}
          </Row>
        </>
      )}
    </>
  );
};

export default ReportStatement

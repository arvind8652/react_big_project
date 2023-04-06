import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { GenericSelect } from "../../../components/GenericSelect/GenericSelect";
import { executeGetClientStatementCS } from "../../../redux/actions/reportsActions/reportsActions";
import { getClientName } from "../ReportDependentControl";

const ClientStatement = ({
  childFlag = true,
  controlStructure,
  handleFormSubmit,
  onChangeHandler,
  keyFieldsHandler,
}) => {
  // child state will come with Props -> with the help of that we will show or hide the components
  const style = { padding: "8px 0" };

  const [csObject, setCsObject] = useState([]);
  const [familyName, setFamilyName] = useState({ FamilyName: null });
  const [clientNameDependentData, setClientNameDependentData] = useState();

  useEffect(() => {
    executeGetClientStatementCS();
  }, []);

  useEffect(async () => {
    setClientNameDependentData(await getClientName());
  }, []);

  useEffect(() => {
    let newCs = [];
    let formRecord = [];
    controlStructure &&
      controlStructure?.csList[0]?.["controlStructureField"]?.forEach(
        (element) => {
          newCs.push(element);
          formRecord.push({ [element.keyField]: "" });
        }
      );
    setCsObject(newCs);
    keyFieldsHandler(formRecord);
  }, [controlStructure]);

  useEffect(async () => {
    setClientNameDependentData(await getClientName(familyName.FamilyName));
  }, [familyName]);

  const onChange = async (keyField, value) => {
    if (keyField === "FamilyName") {
      setFamilyName({ FamilyName: value.toString() });
    } else if (keyField === "RefID") {
      setClientNameDependentData(await getClientName(familyName.FamilyName));
    }
    onChangeHandler(keyField, value);
  };

  const selectComponentHandler = (list) => {
    // let optionsVal = [{ key: "", value: "" }];
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
    } else if (
      list?.controlType === "DependentControl" &&
      list?.keyField === "RefID"
    ) {
      optionsVal = clientNameDependentData;
    }
    return (
      <GenericSelect
        mode={list.controlType === "MultiSelect" ? "multiple" : "DropdownList"}
        options={optionsVal}
        keyField={list.keyField}
        onChange={onChange}
      />
    );
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
                    <Col className="gutter-row" span={6}>
                      <div style={style}>{list.fieldLabel}</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
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
const mapStateToProps = (state) => {
  return {
    controlStructure: state?.reportsData?.clientStatementControlStructure,
  };
};

export default connect(mapStateToProps)(ClientStatement);

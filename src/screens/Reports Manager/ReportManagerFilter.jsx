import { Alert, Card, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { theme } from "../../theme";
import { ReportNameFilter } from "./ReportNameFilter";
import "../../components/GenericSelect/GenericSelect.scss";
import { executeGetReportManagerCS } from "../../redux/actions/reportsActions/reportsActions";
import { connect } from "react-redux";
import ReportStatement from "./ReportStatement";
import moment from 'moment';
import { Spin } from "antd";



const ReportManagerFilter = ({
  handleFormSubmit,
  onChangeHandler,
  keyFieldsHandler,
  pathName,
  setReportName,
  controlStructure,
  formData,
  setFormData,
  leftPanelData,
  setClearColumnNames,
  setIsRequiredField,
  oneTimeSetIsRequiredField,
  setShowRequiredError,
  showRequiredError,
  customerInfo,
  setGenerateButtonDisable
}) => {
  const style = { padding: "8px 0" };
  const [csObject, setCsObject] = useState([]);
  const [selectedReport, setSelectedReport] = useState("");
  const [progName, setProgName] = useState("");
  const [menuId, setMenuId] = useState();
  const [leftPanelRecord, setLeftPanelRecord] = useState()
  const [selectedSubReport, setSelectedSubReport] = useState([]);
  const [loading, setLoading] = useState();


  const location1 = useLocation();
  useEffect(() => {
    let selectedPath = location1?.pathname.split("/").pop();
    setSelectedReport(selectedPath);
    setProgName("");
    //  setReportName("");
    setSelectedSubReport([]);
    setGenerateButtonDisable(true);
    setShowRequiredError(false);

  }, []);


  useEffect(() => {
    if (selectedReport != '' && selectedReport != null) {
      if (leftPanelData) {
        leftPanelData?.subMenu.filter(data => {
          if (data?.routeURL.split("/").pop() === selectedReport) {
            setMenuId(data?.subMenuId);
            setProgName("");
            //  setReportName("");
            setReportName({ reportId: null, progName: null, particularReportName: data?.subMenuTitle });
            setSelectedSubReport([]);
            setGenerateButtonDisable(true);
            setShowRequiredError(false);


          }
        })

      }

    }
  }, [selectedReport])



  useEffect(() => {
    setLeftPanelRecord(leftPanelData);
  }, [leftPanelData])


  const onCloseErrorAlertHandler = () => {
    setShowRequiredError(false);
  }

  useEffect(() => {
    callReportStructure();

  }, [menuId])

  const callReportStructure = () => {
    if (menuId != '' && menuId != null)
      return (<ReportNameFilter
        setReportName={setReportName}
        onChangeHandler={onChangeHandler}
        keyFieldsHandler={keyFieldsHandler}
        handleFormSubmit={handleFormSubmit}
        setProgName={setProgName}
        menuId={menuId}
      />)
  }


  useEffect(() => {
    let selectedPath = pathName.split("/").pop();
    setSelectedReport(selectedPath);
  }, [pathName]);


  useEffect(() => {
    executeGetReportManagerCS(progName, setLoading);
  }, [progName])

  useEffect(() => {
    let newCs = [];
    let formRecord = [];
    let isRequiredFields = [];
    controlStructure &&
      controlStructure?.csList[0]?.["controlStructureField"]?.forEach(
        (element) => {
          newCs.push(element);
          if (element?.controlType === "Hidden") {
            formRecord.push({ [element.keyField]: customerInfo?.customerCode });
          }
          else if (element?.controlType === "DatePicker") {
            formRecord.push({ [element.keyField]: moment().format("YYYY-MM-DD") });
          }
          else if (element?.controlType === "DateRangePicker") {
            formRecord.push({ [element.keyField]: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")] });
          }
          else {
            formRecord.push({ [element.keyField]: [] });
          }
          if (element?.isRequired) {
            isRequiredFields.push(element.keyField);
          }
        }
      );
    if (newCs.length === 0) {
      setGenerateButtonDisable(true);
    } else {
      setGenerateButtonDisable(false);

    }
    setCsObject(newCs);
    setShowRequiredError(false);

    keyFieldsHandler(formRecord, isRequiredFields);
  }, [controlStructure]);

  return (
    <>
      {
        showRequiredError &&

        <Alert
          //style={{ marginBottom: "15px" }}
          message="Mandatory fields are required"
          type="error"
          closable
          onClose={onCloseErrorAlertHandler}
        />
      }
      <div>
        {/* <Card style={theme.cardStyle}> */}
        <Card>
          {<ReportNameFilter
            //style={{ marginBottom: "40px" }}
            setReportName={setReportName}
            onChangeHandler={onChangeHandler}
            keyFieldsHandler={keyFieldsHandler}
            handleFormSubmit={handleFormSubmit}
            setProgName={setProgName}
            selectedSubReport={selectedSubReport}
            setSelectedSubReport={setSelectedSubReport}

            menuId={menuId}
          />}
          {loading && <div><center><Spin></Spin></center></div>}
          {!loading && csObject.length > 0 ? <ReportStatement

            formData={formData}

            setFormData={setFormData}

            csObjectData={csObject}

            onChangeHandler={onChangeHandler} keyFieldsHandler={keyFieldsHandler} handleFormSubmit={handleFormSubmit}

            setClearColumnNames={setClearColumnNames} setIsRequiredField={setIsRequiredField} oneTimeSetIsRequiredField={oneTimeSetIsRequiredField}

          /> : <div style={{marginLeft: "100px"}}><b>No Record</b></div>}

          {/* {csObject && <ReportStatement
            formData={formData}
            setFormData={setFormData}
            csObjectData={csObject}
            onChangeHandler={onChangeHandler} keyFieldsHandler={keyFieldsHandler} handleFormSubmit={handleFormSubmit}
            setClearColumnNames={setClearColumnNames} setIsRequiredField={setIsRequiredField} oneTimeSetIsRequiredField={oneTimeSetIsRequiredField}
          />} */}

        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    controlStructure: state?.reportsData?.reportManagerControlStructure,
  };
};


export default connect(mapStateToProps)(ReportManagerFilter)


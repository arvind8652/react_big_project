import React, { useState, useEffect } from "react";
import { theme } from "../../theme";
import { Col, Row } from "antd";
import { GenericSelect } from "../../components/GenericSelect/GenericSelect";
import { CUSTOMER_STATEMENT_NAME } from "./ReportManagerConstant";
import { getReportName } from "./ReportDependentControl";

export const ReportNameFilter = ({
  handleFormSubmit,
  onChangeHandler,
  selectedSubReport,
  setSelectedSubReport,
  keyFieldsHandler,
  menuId = null,
  setReportName,
  setProgName,
}) => {
  const style = { padding: "8px 0" };
  const [reportNameDependentData, setReportNameDependentData] = useState(
    CUSTOMER_STATEMENT_NAME
  );

  const handleOnChange = (keyField = null, record) => {
    let reportNameData;
    reportNameDependentData.filter((data) => {
      if (data.key === record) {
        reportNameData = data.value;
      }
    });
    setSelectedSubReport(record);
    setReportName({
      reportId: record,
      progName: menuId,
      particularReportName: reportNameData,
    });
    setProgName(record);
  };

  useEffect(async () => {
    setReportNameDependentData(await getReportName(menuId));
  }, [menuId]);

  const valueHandler = () => {
    return selectedSubReport;
  };

  const onFocusChange = async () => {
    setReportNameDependentData(await getReportName(menuId));
  };

  const renderSelectedReport = () => {
    // console.log("selectedReport", selectedSubReport);
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={4} style={{ marginTop: "40px", marginLeft: "25px" }}>
          <div style={theme.subHeaderName}>
            <b>Report Name</b>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={{ marginLeft: "44px" }}>
            {/* style={style} */}
            <GenericSelect
              options={reportNameDependentData}
              onChange={handleOnChange}
              onFocusChange={onFocusChange}
              valueHandler={valueHandler}
            />
          </div>
        </Col>
      </Row>
      {renderSelectedReport()}
    </>
  );
};

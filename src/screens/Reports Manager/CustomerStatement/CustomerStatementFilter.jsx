import React, { useState, useEffect } from "react";
import { theme } from "../../../theme";
import { Col, Row } from "antd";
import { Menu, message } from "antd";
import { GenericSelect } from "../../../components/GenericSelect/GenericSelect";
import { CUSTOMER_STATEMENT_NAME } from "./CustomerStatementConst";
import ClientStatement from "./ClientStatement";
import { getReportName } from "../ReportDependentControl";

export const CustomerStatementFilter = ({ handleFormSubmit, onChangeHandler, keyFieldsHandler, menuId = null, setReportName }) => {
    const style = { padding: "8px 0" };
    const [reportNameDependentData, setReportNameDependentData] = useState(CUSTOMER_STATEMENT_NAME);
    const [selectedReport, setSelectedReport] = useState(CUSTOMER_STATEMENT_NAME[0].key);

    const handleOnChange = (keyField = null, record) => {
        let reportNameData;
        reportNameDependentData.
            filter((data) => {
                if (data.key === record) {
                    reportNameData = data.value
                }
            }
            )
        setSelectedReport(record);
        setReportName({ reportId: record, progName: menuId, particularReportName: reportNameData });
    };

    useEffect(async () => {
        setReportNameDependentData(await getReportName(menuId));
    }, []);

    useEffect(() => {
        setReportName({ reportId: CUSTOMER_STATEMENT_NAME[0].key, progName: menuId, particularReportName: CUSTOMER_STATEMENT_NAME[0].value });
    }, [])

    useEffect(() => {
        setSelectedReport(reportNameDependentData[0].key)
    }, [reportNameDependentData])

    const renderSelectedReport = () => {
        switch (selectedReport) {
            case "RPT_CUSTST":
                return <ClientStatement onChangeHandler={onChangeHandler} keyFieldsHandler={keyFieldsHandler} handleFormSubmit={handleFormSubmit} />;
            default:
                return <div style={{ textAlign: "center", fontSize: "20px" }}><p>Selected Report has no Data</p></div>
        }
    };
    return (
        <>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <div style={style}>Report Name</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>
                        <GenericSelect
                            options={reportNameDependentData}
                            onChange={handleOnChange}
                            defaultValue={selectedReport}
                        />
                    </div>
                </Col>
            </Row>
            {renderSelectedReport()}
        </>
    );
};

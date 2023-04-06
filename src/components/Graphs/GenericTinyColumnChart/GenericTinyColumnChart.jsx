import { TinyColumn } from "@ant-design/charts";
import { Col, Row } from "antd";
import styled from "styled-components";
import { currencyFormatter } from "../../../utils/utils";
const GenericTinyColumnChart = ({
  plottingData,
  graphData,
  managedData,
  lostData,
}) => {
  const RenderTooltip = (data) => {
    const TooltipWrapper = styled.div`
      min-width: 120px;
      padding: 5px;
    `;
    const TooltipAttribute = styled(Row)`
      margin: 6px 0;
    `;
    const ValueAttr = () => (
      <>
        {data.map((item) => (
          <TooltipAttribute align="top" justify="space-between">
            <Col span={10}>
              <span>
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ width: "100%" }}
                >
                  <div>{item.name}</div>
                  <div>:</div>
                </Row>
              </span>
            </Col>
            <Col span={13}>
              <strong>{item && currencyFormatter(item.value, "US")}</strong>
            </Col>
          </TooltipAttribute>
        ))}
      </>
    );
    const CountAttr = () => (
      <>
        {data.map((item) => (
          <TooltipAttribute align="top" justify="space-between">
            <Col span={17}>
              <span>
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ width: "100%" }}
                >
                  <div>
                    {graphData &&
                      graphData[item.title] &&
                      graphData[item.title].month}
                  </div>
                  <div>:</div>
                </Row>
              </span>
            </Col>
            <Col span={5}>
              <strong>{item.value}</strong>
            </Col>
          </TooltipAttribute>
        ))}
      </>
    );
    return (
      <TooltipWrapper>
        {/* <strong>{data[0] && data[0].title}</strong> */}
        <CountAttr />
      </TooltipWrapper>
    );
  };
  const config = {
    data: plottingData,
    height: 64,
    width: 64,
    // columnWidthRatio: 0.2,
    autoFit: false,
    color: lostData ? "#BE5C56" : "#5D6DD1",
    columnStyle: {
      lineWidth: 0.2,
    },
    tooltip: {
      // showTitle: false,
      // showMarkers: false,
      domStyles: {
        "g2-tooltip": {
          border: "1px solid #5d6dd1",
          boxSizing: "border-box",
          boxShadow: "0px 4px 6px rgba(203, 214, 255, 0.25)",
          borderRadius: "16px",
        },
      },
      customContent: (title, data) => {
        return data ? RenderTooltip(data) : null;
      },
    },
  };
  return (
    <div>
      <TinyColumn {...config} />
    </div>
  );
};

export default GenericTinyColumnChart;

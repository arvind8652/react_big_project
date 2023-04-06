import { TinyColumn } from "@ant-design/charts";
import { Row, Col } from "antd";
import RupeeOrNonRupee from "../../../components/RupeeOrNonRupee/RupeeOrNonRupee";
import { theme } from "../../../theme";
const defaultData = [274, 337, 81, 497, 666, 219, 269];
const Score = ({ data, chartData = defaultData }) => {
  const lostData = false;
  const config = {
    data: chartData,
    height: 64,
    width: 64,
    // columnWidthRatio: 0.2,
    autoFit: false,
    color: lostData ? "#BE5C56" : "#5D6DD1",
    columnStyle: {
      lineWidth: 0.2,
    },
    // tooltip: {
    //   // showTitle: false,
    //   // showMarkers: false,
    //   domStyles: {
    //     "g2-tooltip": {
    //       border: "1px solid #5d6dd1",
    //       boxSizing: "border-box",
    //       boxShadow: "0px 4px 6px rgba(203, 214, 255, 0.25)",
    //       borderRadius: "16px",
    //     },
    //   },
    //   customContent: (title, data) => {
    //     return data ? RenderTooltip(data) : null;
    //   },
    // },
  };
  const styleSet = {
    padding: "24px",
    amount: {
      lineHeight: "27px",
    },
    textCol: {
      position: "relative",
    },
    textBlock: {
      position: "absolute",
      bottom: "0px",
    },
  };

  return (
    <>
      {data && (
        <Row style={styleSet}>
          <Col span={16} style={styleSet.textCol}>
            <div style={styleSet.textBlock}>
              <div style={{ ...theme.subPrimaryHeader, ...styleSet.amount }}>
                $ <RupeeOrNonRupee amount={data.assetHolding} />
              </div>
              <div style={theme.secondaryBody}>
                {data.assetGroupName} <span>({data.percentageHolding}%)</span>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <TinyColumn {...config} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Score;

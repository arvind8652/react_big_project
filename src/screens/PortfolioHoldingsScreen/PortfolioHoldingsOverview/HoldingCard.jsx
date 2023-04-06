import { Col, Row } from "antd";
import { TinyArea } from "@ant-design/charts";
import UserDetail from "../../../components/UserDetail/UserDetail";
import { palette, theme } from "../../../theme";
import UserStarDetails from "../../../components/PortfolioHoldingTable/UserStarDetails";
import RupeeOrNonRupee from "../../../components/RupeeOrNonRupee/RupeeOrNonRupee";

const defaultUserDetails = {
  name: "BDO Global Equity...",
  id: "BD190048",
  tags: "Equity",
};
const defaultCardData = {
  value: "0.25%",
  allocation: "7.5%",
  marketPrice: "$5,000",
};
const HoldingCard = ({
  HoldingCardData,
  userDetails = defaultUserDetails,
  cardData = defaultCardData,
}) => {
  const chartData = HoldingCardData?.graph.map((item) => item.value);
  const data = [0, 1000, 240, 340, 839, 810, 850];
  const config = {
    autoFit: true,
    data: chartData ? chartData : data,
    smooth: false,
    areaStyle: {
      fill: `l(270) 0:#ffffff 1:${palette.text.success}`,
      fillOpacity: 0.1,

      shadowBlur: 3,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      cursor: "pointer",
    },
    line: {
      color: palette.text.success,
    },
  };
  const styleSet = {
    mapBlock: {
      height: "35px",
      width: "95px",
    },
    valueBlock: {
      color: palette.text.success,
    },
    rowMargin: {
      margin: "17px 0px",
    },
  };
  const userStarData = {
    name: HoldingCardData.assetType,
    rating: HoldingCardData.starRating,
    id: HoldingCardData.security,
    tagName: HoldingCardData.assetClass,
    profileImg: HoldingCardData.securityInitials,
  };
  return (
    <>
      <Row style={styleSet.rowMargin}>
        <Col span={22}>
          <UserStarDetails UserStarDetails={userStarData} />
        </Col>
        <Col
          span={2}
          style={{ ...theme.secondaryBody, ...styleSet.valueBlock }}
        >
          {HoldingCardData.performance}
        </Col>
      </Row>
      <Row style={styleSet.rowMargin}>
        <Col span={20} style={theme.justifyCenter}>
          <div style={styleSet.mapBlock}>
            <TinyArea {...config} />
          </div>
          <div>
            <div style={theme.subPrimaryHeader}>
              $ <RupeeOrNonRupee amount={HoldingCardData.holding} />{" "}
            </div>
            <div style={theme.secondaryBody}>Market Price</div>
          </div>
        </Col>
        <Col span={4}>
          <div style={theme.subPrimaryHeader}>
            {HoldingCardData.holdingPercentage}%
          </div>
          <div style={theme.secondaryBody}>Allocation</div>
        </Col>
      </Row>
    </>
  );
};

export default HoldingCard;

import { React, useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Menu,
  Dropdown,
  message,
  Select,
} from "antd";
import { DownOutlined, RightSquareTwoTone } from "@ant-design/icons";
import AvatarLogo from "../Avatar/AvatarLogo";
import { Liquid, TinyArea } from "@ant-design/charts";
import { AvatarSize } from "../../constants/AvatarSize";
import { palette, fontSet } from "../../theme";
import TypoGraphy from "../TypoGraphy/TypoGraphy";
import UserDetails from "../UserDetail/UserDetail";
import { theme } from "../../theme";
import { connect } from "react-redux";
import RupeeOrNonRupee from "../RupeeOrNonRupee/RupeeOrNonRupee";
import moment from 'moment'

const { Text, Link, Title } = Typography;

const defaultValue = {
  value: "Mutual Fund Portfolio Value",
  currentValue: "$211,000",
  preferredCurrency: "Euro",
  remark: "This is remark of John Doe",
  lastUpdate: "07 Dec 2020, 10:30 pm",
  userPortfolio: "Chris Ramos's Portfolio",
  capital: "$120,000",
  incomeGain: "$120,000",
  appreciation: "8.15%",
};

const ConsolidatedPortfolio = ({
  ConsolidatedPortfolio = defaultValue,
  ConsolidatedPortfolioType = "",
}) => {
  const { Option } = Select;
  const chartData = ConsolidatedPortfolio.portfolioDetail?.graphData.map(
    (item) => item.value
  );
  const dateData = ConsolidatedPortfolio.portfolioDetail?.graphData.map(
    (item) => moment(item.date).format("DD-MMM-YYYY")
  );

  const data = [864, 317, 838, 387, 817];
  const config = {
    height: 50,
    width: 280,
    autoFit: true,
    data: chartData ? chartData : data,
    tooltip: {
      customContent: (index) => {
        return <>
        <div>{chartData[index]}</div>
        <div>{dateData[index]}</div>
        </>
      }
    },
    smooth: true,
    areaStyle: {
      fill: `l(400) 0:#ffffff 1:${palette.primary.main}`,
      fillOpacity: 0.3,

      shadowBlur: 3,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      cursor: "pointer",
    },
    alignRight: true,
  };
  // {
  //     autoFit: true,
  //     data: data,
  //     smooth: false,
  //     areaStyle: {
  //         fill: `l(270) 0:#ffffff 1:${palette.primary.main}`,
  //         fillOpacity: 0.1,

  //         shadowBlur: 3,
  //         shadowOffsetX: 1,
  //         shadowOffsetY: 1,
  //         cursor: "pointer",
  //     },
  //     line: {
  //         color: palette.primary.main,
  //     },
  // };
  const styleSet = {
    defaultContainer: {
      backgroundImage: "linear-gradient(to left, #5D6DD1 , #5D6DD1 )",
      borderRadius: "12px",
    },
    relationBlock: {
      // fontSize: fontSet.body.small,
      color: palette.text.main,
      flex: 1,
    },
    container: {
      flex: 1,
      //marginBottom: "15px"
      font: "Open Sans",
      fontSize: fontSet.body.xsmall,
    },
    subcontainer: {
      flex: 1,
      color: palette.primary.main,
      //fontSize: "22px",
    },
    defaultSubCard: {
      //fontSize: fontSet.body.xlarge,
      color: palette.text.banner,
    },
    defaultDropDown: {
      color: palette.text.banner,
      fontSize: fontSet.body.large,
    },
    default: {
      flex: 1,
      //marginBottom: "15px",
      fontSize: fontSet.body.large,
      // font: "Open Sans",
      color: palette.text.banner,
    },

    card: {
      borderRadius: "12px",
    },
  };

  return (
    <>
      {/* <div className="site-card-wrapper"> */}
      {ConsolidatedPortfolio && (
        <Row gutter={[16, 16]}>
          <Col xxl={10} xl={24} lg={24}>
            <Card
              style={{ ...theme.cardStyle }}
              bodyStyle={{
                maxHeight: "163px",
                height: "163px",
              }}
            >
              <Row>
                <Col style={{ ...theme.subBody }} span={12}>
                  <TypoGraphy>
                    <div
                      style={{
                        ...theme.subPrimaryHeader,
                        ...styleSet.relationBlock,
                      }}
                    >
                      {ConsolidatedPortfolioType}Portfolio Value
                    </div>
                  </TypoGraphy>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <TypoGraphy subLabel={"Current Value"}>
                    <div
                      style={{
                        ...styleSet.subcontainer,
                        ...theme.mediumText,
                      }}
                    >
                      $ <RupeeOrNonRupee amount={ConsolidatedPortfolio.portfolioDetail.holding.amount} />
                    </div>
                    <div
                      style={{
                        ...theme.mediumText,
                          color: 'rgba(137, 142, 169, 1)',
                          fontSize: '18px'
                      }}
                    >
                      Current Value
                    </div>
                  </TypoGraphy>
                </Col>
                <Col span={12}>
                  <TinyArea {...config} />
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xxl={14} xl={24} lg={24}>
            <Card
              style={styleSet.defaultContainer}
              bodyStyle={{
                maxHeight: "163px",
                height: "163px",
              }}
            >
              <Row>
                <Col style={{ ...theme.subBody }} span={14}>
                  <TypoGraphy
                    labelWhite={`${ConsolidatedPortfolio.portfolioDetail.clientName}'s Portfolio`}
                  ></TypoGraphy>
                </Col>
              </Row>
              <Row>
                <div
                  style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
                >
                  <span style={{ width: "40%" }}>
                    <TypoGraphy labelWhite={"Capital"}>
                      <div
                        style={{
                          ...styleSet.defaultSubCard,
                          ...theme.mediumText,
                        }}
                      >
                        ${" "}
                        
                        <RupeeOrNonRupee amount={
                          ConsolidatedPortfolio.portfolioDetail.holding
                            .book_cost
                        } />
                      </div>
                    </TypoGraphy>
                  </span>

                  <span style={{ width: "40%" }}>
                    <TypoGraphy labelWhite={"Income & Gain"}>
                      <div
                        style={{
                          ...styleSet.defaultSubCard,
                          ...theme.mediumText,
                        }}
                      >
                        $
                        
                        <RupeeOrNonRupee amount={
                          ConsolidatedPortfolio.portfolioDetail.holding
                            .gain_loss
                        } />
                      </div>
                    </TypoGraphy>
                  </span>

                  <span style={{ width: "20%" }}>
                    <TypoGraphy labelWhite={"Appreciation"}> 
                      <div
                        style={{
                          ...theme.mediumText,
                          ...styleSet.defaultSubCard,
                        }}
                      >
                        {ConsolidatedPortfolio.portfolioDetail.holding.xirr}%
                      </div>
                    </TypoGraphy>
                  </span>
                </div>
                {/* <Col style={styleSet.default} span={10}>
                  <TypoGraphy labelWhite={"Capital"}>
                    <div
                      style={{
                        ...styleSet.defaultSubCard,
                        ...theme.largeText,
                      }}
                    >
                      ${" "}
                      {ConsolidatedPortfolio.portfolioDetail.holding.book_cost}
                    </div>
                  </TypoGraphy>
                </Col> */}
                {/* <Col style={styleSet.default} span={10}>
                  <TypoGraphy labelWhite={"Income & Gain"}>
                    <div
                      style={{
                        ...styleSet.defaultSubCard,
                        ...theme.largeText,
                      }}
                    >
                      ${ConsolidatedPortfolio.portfolioDetail.holding.gain_loss}
                    </div>
                  </TypoGraphy>
                </Col> */}
                {/* <Col style={styleSet.default} span={4}>
                  <TypoGraphy labelWhite={"Appreciation"}>
                    <div
                      style={{
                        ...theme.largeText,
                        ...styleSet.defaultSubCard,
                      }}
                    >
                      {ConsolidatedPortfolio.portfolioDetail.holding.xirr}%
                    </div>
                  </TypoGraphy>
                </Col> */}
              </Row>
            </Card>
          </Col>
        </Row>
      )}
      {/* </div> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    controlStructure: state.portfolioHoldings.controlStructure,
    ConsolidatedPortfolio: state.portfolioHoldings.holdingAmountData,
  };
};
const mapDispatchToProps = {
  // executeGetCustomerOnboardingListingCs,
  // executeGetAllCustomerOnboardingData,
  // executeGetAllPendingAccounts,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsolidatedPortfolio);

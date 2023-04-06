import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { TinyColumn } from "@ant-design/charts";
import { customerPortfolio } from "../constant";
import GenericCard from "../../../components/GenericCard/GenericCard";
import { fontSet, theme } from "../../../theme";

const CustomerPortfolioCard = (props) => {
  const { portFolioData } = props;
  const styleSet = {
    managedColor: {
      color: "#5564C1",
      fontWeight: "bold",
      lineHeight: "33px",
      fontset: fontSet.heading.large,
      fontFamily: theme.profileName.fontFamily,
    },
    subBody: {
      theme: theme.subBody,
      color: "#898EA9",
      lineHeight: "25px",
      fontFamily: theme.profileName.fontFamily,
    },
    lostColor: {
      color: " #BE5C56",
      fontWeight: "bold",
      fontset: fontSet.heading.large,
      fontFamily: theme.profileName.fontFamily,
    },
    rowStyle: {
      margin: "36px 0px",
    },
    avatarBody: {
      lineHeight: "12px",
      margin: "30px 10px",
    },
    rowAlign: {
      margin: "9px 0px",
    },
    cardHeaderStyle: {
      fontSize: "18px",
    },
  };
  const PerformanceRow = () => {
    const customerData = {
      id: 0,
      type: "Investment",
      rank: 5,
      totalAmount: "450,000",
      name: "Banco De Oro",
      role: "Wealth Account",
      statusManaged: "Managed",
      managed: "128",
      lost: "48",
      statuslost: "Lost",
    };

    var data = portFolioData.managedList;
    var config = {
      height: 75,
      width: 150,
      autoFit: false,
      data: data,
      tooltip: {
        customContent: function customContent(x, data) {
          var _data$, _data$$data;
          return "NO."
            .concat(x, ": ")
            .concat(
              (_data$ = data[0]) === null || _data$ === void 0
                ? void 0
                : (_data$$data = _data$.data) === null || _data$$data === void 0
                ? void 0
                : _data$$data.y.toFixed(2)
            );
        },
      },
    };

    var data2 = portFolioData.lostList;
    var dataconfig = {
      height: 75,
      width: 150,
      autoFit: false,
      data: data2,
      tooltip: {
        customContent: function customContent(x, data) {
          var _data$, _data$$data;
          return "NO."
            .concat(x, ": ")
            .concat(
              (_data$ = data[0]) === null || _data$ === void 0
                ? void 0
                : (_data$$data = _data$.data) === null ||
                  _data$$data === void 0
                ? void 0
                : _data$$data.y.toFixed(2)
            );
        },
      },
    };

    return (
      <>
        <Row
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Col span={8}>
            <Row>
              <span style={styleSet.managedColor}>
                {portFolioData.managedCount}
              </span>
            </Row>
            <Row>
              <span style={styleSet.subBody}>{"Managed"}</span>
              <br />
            </Row>
          </Col>
          <Col span={16}>
            <Row>
              <TinyColumn {...config} />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Row></Row>
            <Row>
              <br />
            </Row>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Col span={8}>
            <Row>
              <span style={styleSet.lostColor}>{portFolioData.lostCount}</span>
            </Row>
            <Row>
              <span style={styleSet.subBody}>{"Lost"}</span>
              <br />
            </Row>
          </Col>
          <Col span={16}>
            <Row>
              <TinyColumn {...dataconfig} color="#BE5C56" />
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <div>
        <GenericCard
          headStyle={styleSet.cardHeaderStyle}
          header={customerPortfolio}
        >
          <PerformanceRow />
        </GenericCard>
      </div>
    </>
  );
};
export default CustomerPortfolioCard;

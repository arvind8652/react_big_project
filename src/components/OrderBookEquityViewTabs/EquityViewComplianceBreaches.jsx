import React from "react";
import { Col, Row, Typography } from "antd";
import { Bullet } from "@ant-design/charts";
import { palette, fontSet } from "../../theme";
import GenericCard from "../GenericCard/GenericCard";
import TypoGraphy from "../TypoGraphy/TypoGraphy";

const { Text, Link, Title } = Typography;

const defaultValue = {
  sutability: "Breached",
  riskProfile: "Moderate",
  sutaibleLimit: "2-6",
  riskRating: "8",
  productSutaibility:
    "Risk rating of the Product you are investing in his higher than the recommanded range",
};
const EquityViewComplianceBreaches = ({
  equityViewComplianceBreaches = defaultValue,
}) => {
  const styleSet = {
    relationBlock: {
      color: palette.secondary.light,
    },
    contactBlock: {
      color: palette.secondary.light,
      height: 0.5,
      //border-width:0,
      //color:gray,
      //background-color:gray,
    },
    container: {
      flex: 1,
      width: "100%",
      marginTop: "10px",
      marginBottom: "15px",
      color: palette.text.head,
    },
    subCardHeader: {
      fontSize: fontSet.body.xlarge,
      color: palette.text.dark,
    },
    mapBlock: {
      height: "65px",
      width: "350px",
      //margin: "5px 0px 10px 10px"
      //marginTop: "10px",
    },
  };
  var data = [
    {
      //title: 'Hi',
      ranges: [10],
      measures: [2, 6],
      target: 8,
    },
  ];
  var config = {
    data: data,
    measureField: "measures",
    rangeField: "ranges",
    targetField: "target",
    //xField: 'title',
    color: {
      range: "#f0efff",
      measure: ["#f0efff", "#55C1B3"],
      target: "#C15555",
    },
    xAxis: { line: null },
    yAxis: {
      position: "left",
      tickMethod: function tickMethod(_ref) {
        var max = 10;
        var interval = Math.ceil(max / 5);
        return [0, interval, interval * 2, interval * 3, interval * 4, max];
      },
    },
    legend: {
      custom: true,
      position: "bottom",
      items: [
        {
          value: "A",
          name: "Suitable Product Range",
          marker: {
            symbol: "square",
            style: {
              fill: "#55C1B3",
              r: 5,
              marginTop: "25px",
            },
          },
        },
        {
          value: "B",
          name: "Product Risk Rating",
          marker: {
            symbol: "square",
            style: {
              fill: "#C15555",
              r: 5,
              marginTop: "35px",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <GenericCard header={"Compliance Breaches"}>
        <Row>
          <Col span={16}>
            <Row>
              <Col style={styleSet.container}>
                <TypoGraphy label={"Sutability"}>
                  <div style={styleSet.subCardHeader}>
                    {equityViewComplianceBreaches.sutability}
                  </div>
                </TypoGraphy>
              </Col>
              <Col style={styleSet.container}>
                <TypoGraphy label={"Risk Profile"}>
                  <div style={styleSet.subCardHeader}>
                    {equityViewComplianceBreaches.riskProfile}
                  </div>
                </TypoGraphy>
              </Col>
            </Row>
            <Row>
              <Col style={styleSet.container}>
                <TypoGraphy label={"Sutaible Limit"}>
                  <div style={styleSet.subCardHeader}>
                    {equityViewComplianceBreaches.sutaibleLimit}
                  </div>
                </TypoGraphy>
              </Col>
              <Col style={styleSet.container}>
                <TypoGraphy label={"Risk Rating"}>
                  <div style={styleSet.subCardHeader}>
                    {equityViewComplianceBreaches.riskRating}
                  </div>
                </TypoGraphy>
              </Col>
            </Row>
          </Col>
          <Col span={8} style={styleSet.mapBlock}>
            <Bullet {...config} />
          </Col>
        </Row>
        <Row>
          <Col style={styleSet.container}>
            <TypoGraphy
              label={
                "Product Suitability is accessed based on your risk profile"
              }
            >
              <div style={styleSet.subCardHeader}>
                {equityViewComplianceBreaches.productSutaibility}
              </div>
            </TypoGraphy>
          </Col>
        </Row>
      </GenericCard>
    </>
  );
};
export default EquityViewComplianceBreaches;

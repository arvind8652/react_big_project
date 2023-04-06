import React from "react";
import { palette, fontSet } from "../../../theme";
import { Col, message, Row } from "antd";
import { Bullet } from "@ant-design/charts";
import TypoGraphy from "../../../components/TypoGraphy/TypoGraphy";
import { LabelWithSubText } from "./LabelWithSubText";

const defaultValue = {
	isBreached: true,
	riskCategory: "Moderate",
	riskRaiting: 8,
	suitabilityLimitMax: 6,
	suitabilityLimitMin: 2,
	suitability: "Breached",
	lstMessage: "",
  lstScoreRange: [{minscore: 0, maxscore:30}, {minscore: 16, maxscore:40}]
};

export const ComplianceDetailsView = ({ compliaceDetails = defaultValue}) => {
  let compliaceDetailsObj = {};
  if (compliaceDetails) {
    compliaceDetailsObj = {...compliaceDetails};
  } else {
    compliaceDetailsObj = {...defaultValue};
  }
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
  const { lstScoreRange } = compliaceDetailsObj;
  var data = [
    {
      ranges: [lstScoreRange.length > 0 ? lstScoreRange[lstScoreRange.length-1].maxscore : 40],
      measures: [
        compliaceDetailsObj?.suitabilityLimitMin,
        compliaceDetailsObj?.suitabilityLimitMax-compliaceDetailsObj?.suitabilityLimitMin,
      ],
      target: compliaceDetailsObj.riskRaiting,
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
      target: "#C15555"
    },
    xAxis: { line: null },
    yAxis: {
      position: "left",
      tickMethod: function tickMethod(_ref) {
        var max = lstScoreRange.length > 0 ? lstScoreRange[lstScoreRange.length-1].maxscore : 40;
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
      <Row>
        <Col span={16}>
          <Row>
            <Col style={styleSet.container}>
              <LabelWithSubText
                label={compliaceDetailsObj?.suitability}
                subtext={"Suitability"}
              />
            </Col>
            <Col style={styleSet.container}>
              <LabelWithSubText
                label={compliaceDetailsObj?.riskCategoryName}
                subtext={"Risk Profile"}
              />
            </Col>
          </Row>
          <Row>
            <Col style={styleSet.container}>
              <LabelWithSubText
                label={`${compliaceDetailsObj?.suitabilityLimitMin}-${compliaceDetailsObj?.suitabilityLimitMax}`}
                subtext={"Suitable Limit"}
              />
            </Col>
            <Col style={styleSet.container}>
              <LabelWithSubText
                label={compliaceDetailsObj?.riskRaiting}
                subtext={"Risk Rating"}
              />
            </Col>
          </Row>
        </Col>
        <Col span={8} style={styleSet.mapBlock}>
          <Bullet {...config} />
        </Col>
			</Row>
			<Row>
				{compliaceDetailsObj > 0 && (
					<Col style={styleSet.container}>
						{
							<LabelWithSubText
								label={compliaceDetailsObj.lstMessage[0]?.message}
								subtext={compliaceDetailsObj.lstMessage[1]?.message}
							/>
						}
					</Col>
				)}
			</Row>
		</>
	);
};

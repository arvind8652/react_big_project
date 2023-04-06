import React, { useEffect } from "react";
import TypoGraphy from "../../components/TypoGraphy/TypoGraphy";
import { palette, theme } from "../../theme";
import { Row, Col } from "antd";
import GenericCard from "../../components/GenericCard/GenericCard";
import { Column } from "@ant-design/charts";
import { executeGetPortfolioDerivationData } from "../../redux/actions/accountDrilldownActions";
import { connect } from "react-redux";
const PortfolioDeviation = ({
  executeGetPortfolioDerivationData,
  allPortfolioDerivationData,
  selectedType = "ASSETGRP",
}) => {
  const menuList = allPortfolioDerivationData?.levelType?.map((item, index) => {
    return {
      id: index,
      menuName: item,
    };
  });

  const requestObject = {
    CustomerID: "ANDREWC",
    Scheme: "ANDREW",
    BusinessDate: "2020-01-15",
  };

  useEffect(() => {
    executeGetPortfolioDerivationData(requestObject);
  }, []);

  useEffect(() => {
    const reqObjType = {
      ...requestObject,
      LevelType: selectedType,
    };
    executeGetPortfolioDerivationData(reqObjType);
  }, [selectedType]);
  var colData = [
    {
      name: "Recommanded",
      type: "Equity",
      percentage: 18.9,
    },
    {
      name: "Recommanded",
      type: "Fixed Income",
      percentage: 20.3,
    },
    {
      name: "Recommanded",
      type: "Jul.",
      percentage: 24,
    },
    {
      name: "Recommanded",
      type: "Aug.",
      percentage: 35.6,
    },
    {
      name: "Actual ",
      type: "Equity",
      percentage: 12.4,
    },

    {
      name: "Actual ",
      type: "Fixed Income",
      percentage: 35.5,
    },
    {
      name: "Actual ",
      type: "Jul.",
      percentage: 37.4,
    },
    {
      name: "Actual ",
      type: "Aug.",
      percentage: 42.4,
    },
  ];

  let apiGraph = [];

  allPortfolioDerivationData?.portfolioDeviationGraphs?.forEach((item) => {
    let recommendedData = {};
    let actualAllocation = {};

    recommendedData = {
      name: "Recommended",
      type: item.displayName,
      percentage: item.recommendedAllocationPercentage,
    };
    actualAllocation = {
      name: "Actual Allocation",
      type: item.displayName,
      percentage: item.actualAllocationPercentage,
    };

    apiGraph.push(recommendedData, actualAllocation);
  });

  const styleSet = {
    container: {
      padding: "15px",
    },
    textGreen: {
      fontColor: palette.text.success,
    },
    textBlue: {
      fontColor: palette.text.btn,
    },
  };

  var config3 = {
    data: apiGraph ? apiGraph : colData,
    isGroup: true,
    xField: "type",
    yField: "percentage",
    seriesField: "name",
    minColumnWidth: 20,
    maxColumnWidth: 20,
    dodgePadding: 8,
    legend: { position: "bottom" },
    label: {
      position: "middle",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
  };

  return (
    <GenericCard
      header={"Portfolio Deviation"}
      menuFlag={2}
      menuList={menuList}
      dropdownKey={"portfolioDeviation"}
    >
      <Column {...config3} />
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={styleSet.container}>
            <div style={styleSet.textGreen}>Recommended</div>
            <div style={theme.justifySBetween}>
              {allPortfolioDerivationData &&
                allPortfolioDerivationData?.recommendedAllocationSecurities?.map(
                  (item) => (
                    <div>
                      <TypoGraphy label={item.displayName}>
                        <span style={styleSet.textGreen}>
                          {item.calculatedPercentage}%
                        </span>
                      </TypoGraphy>
                    </div>
                  )
                )}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div style={styleSet.container}>
            <div style={styleSet.textGreen}>Actual Allocation</div>
            <div style={theme.justifySBetween}>
              {allPortfolioDerivationData &&
                allPortfolioDerivationData?.actualAllocationSecurities?.map(
                  (item) => (
                    <div>
                      <TypoGraphy label={item?.displayName}>
                        <span style={styleSet.textGreen}>
                          {item?.calculatedPercentage}%
                        </span>
                      </TypoGraphy>
                    </div>
                  )
                )}
            </div>
          </div>
        </Col>
      </Row>
    </GenericCard>
  );
};

const mapStateToProps = (state) => {
  return {
    allPortfolioDerivationData: state.accountDrilldown?.portfolioDerivationData,
    selectedType: state.common.dropdownKeys?.portfolioDeviation,
  };
};

const mapDispatchToProps = {
  executeGetPortfolioDerivationData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioDeviation);

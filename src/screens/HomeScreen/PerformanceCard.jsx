import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GenericCard from "../../components/GenericCard/GenericCard";
import GenericBadge from "../../components/GenericBadge/GenericBadge";

import { Row, Col } from "antd";
import { yourPerformance } from "./constant";
import { RingProgress } from "@ant-design/charts";

import { palette, fontSet, theme } from "../../theme";

import { executeGetPerformanceData } from "../../redux/actions/crmHomeActions";
import RupeeOrNonRupee from "../../components/RupeeOrNonRupee/RupeeOrNonRupee";

const PerformanceCard = ({
  allPerformanceData,
  selectedType = "Monthly",
  executeGetPerformanceData,
  performanceCSObj,
}) => {
  const menuList = performanceCSObj?.dropDownValue?.map((item, index) => {
    return {
      id: index,
      menuName: item.dataValue,
    };
  });
  const [prevDate, setPrevDate] = useState(sessionStorage.getItem("prevDate"));

  useEffect(() => {

    executeGetPerformanceData(selectedType, prevDate);
  }, [selectedType]);

  const PerformanceRow = () => {
    const defaultData = [
      {
        id: 0,
        type: "AUM",
        rank: 5,
        aquiredAmount: 112,
        totalAmount: 400,
        expectedAmount: 210000,
        percentage: 3,
      },
      {
        id: 1,
        type: "Revenue",
        rank: 2,
        aquiredAmount: 112,
        totalAmount: 400,
        expectedAmount: 210000,
        percentage: 4,
      },
      {
        id: 2,
        type: "Convertion",
        rank: 2,
        aquiredAmount: 112,
        totalAmount: 400,
        expectedAmount: 210000,
        percentage: 2,
      },
    ];

    const apiData = allPerformanceData?.map((item, index) => {
      return {
        id: item.chartId,
        type: item.title,
        rank: item.rank,
        aquiredAmount: item.totalPerformance,
        totalAmount: item.target,
        expectedAmount: 210000,
        currencySymbol: item.currencySymbol,
        remark: item.remark,
        config: {
          height: 5,
          width: 5,
          autoFit: false,
          // percent: item.totalGuageAngle / 100,
          percent: item.totalPerformance / item.target,
          color: ["#5B8FF9", "#E8EDF3"],
        },
      };
    });

    const [performanceCardData, setPerformanceCardData] = useState(defaultData);
    const styleSet = {
      rowStyle: {
        margin: "54px 0px",
      },
      badgeStyle: {
        fontSize: fontSet.body.small,
      },
      typeHead: {
        fontSize: fontSet.heading.medium,
        fontWeight: "500",
      },
      ratioBlock: {
        fontSize: fontSet.heading.large,
        fontWeight: "500",
      },
      secondaryInfo: {
        fontSize: fontSet.heading.medium,
      },
      ringChart: {
        height: "62px",
        width: "auto",
      },
    };

    useEffect(() => {
      setPerformanceCardData(apiData);
    }, [allPerformanceData]);

    const getNumberWithOrdinal = (n) => {
      var s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
      <>
        {performanceCardData?.map((item) => (
          <Row style={styleSet.rowStyle}>
            <Col span={8}>
              <GenericBadge
                style={styleSet.badgeStyle}
                badgeBody={`${getNumberWithOrdinal(item.rank)} in Rank`}
              />
              <div style={styleSet.typeHead}> {item.type}</div>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={8}>
                  <div style={styleSet.ringChart}>
                    <RingProgress {...item.config} />
                  </div>
                </Col>
                <Col span={16}>
                  <Row>
                    <Col span={24}>
                      <span style={theme.primaryHeader}>
                        {item.type !== "Conversion" && item.currencySymbol}
                        <RupeeOrNonRupee amount={item.aquiredAmount} />
                      </span>
                      <span style={styleSet.ratioBlock}>
                        / <RupeeOrNonRupee amount={item.totalAmount} />
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={styleSet.secondaryInfo}>
                      {item.remark}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </>
    );
  };
  return (
    <>
      <div>
        <GenericCard
          header={yourPerformance}
          menuFlag={2}
          menuList={menuList}
          dropdownKey={"performanceType"}
        >
          <PerformanceRow />
        </GenericCard>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    allPerformanceData: state.crmHome.performance,
    selectedType: state.common.dropdownKeys?.performanceType,
    performanceCSObj:
      state.crmHome.controlStructure?.csList[0]?.controlStructureField[0],
  };
};

const mapDispatchToProps = {
  executeGetPerformanceData,
};
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceCard);
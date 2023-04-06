import React from "react";

import { Row, Col, Card, Space, Button } from "antd";
import GenericCard from "../../../components/GenericCard/GenericCard";
import RoseChartCard from "./RoseChartCard";
import HoldingCard from "./HoldingCard";
import Score from "./Score";
import InvestmentDistributionCard from "./InvestmentDistributionCard";
import ConsolidatedPortfolio from "../../../components/MutualFundsTab/ConsolidatedPortfolio";
import { fontSet, palette, theme } from "../../../theme";
import { Treemap } from "@ant-design/charts";

import { connect } from "react-redux";
import PieChartCard from "./PieChartCard";
const OverViewTab = (props) => {
  const { controlStructure, assetClasswiseData, topHoldingData, investmentAllocationData } = props;

  const array = [0, 1, 2, 3, 4];
  const styleSet = {
    holdingCards: {
      padding: "12px",
      borderBottom: "1px solid #CBD6FF",
    },
    cardP: {
      padding: "16px",
    },
    cardBody: {
      padding: "0px",
    },
  };

  const mappedData = assetClasswiseData?.portfolioDetail?.graphDataAssetGroup?.map((data) => {
    const container = {};

    container["name"] = data.name;
    container["value"] = data.value;

    return container;
  });

  const defaultChartData = [
    {
      name: "Stocks",
      value: 560,
    },
    {
      name: "Mutual Funds",
      value: 500,
    },
    {
      name: "Other",
      value: 150,
    },
    {
      name: "Real Estate",
      value: 140,
    },
    {
      name: "Derivatives",
      value: 115,
    },
    {
      name: "Deposits",
      value: 95,
    },
    {
      name: "Bonds",
      value: 90,
    },
  ];
  const chartData = {
    name: "root",
    children: mappedData ? mappedData : defaultChartData,
  };
  const config = {
    data: chartData,
    colorField: "name",
  };

  // const fetchChartData = (currentChartData) => {
  //   let dataContainer = {};
  //   dataContainer = currentChartData.filter(
  //     (option) => option.graphDataAssetGroup.name === option.assetclasswiseData.assetGroup
  //   );
  //   return dataContainer;
  // };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ConsolidatedPortfolio />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xxl={15} xl={24} lg={24} md={24} sm={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              {assetClasswiseData && (
                <Card style={{ ...styleSet.cardP, ...theme.cardStyle }} bodyStyle={styleSet.cardBody}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Score data={assetClasswiseData?.portfolioDetail?.assetclasswiseData?.[0]} />
                    </Col>
                    <Col span={12}>
                      <Score data={assetClasswiseData?.portfolioDetail?.assetclasswiseData?.[1]} />
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Score data={assetClasswiseData?.portfolioDetail?.assetclasswiseData?.[2]} />
                    </Col>
                    <Col span={12}>
                      <Score data={assetClasswiseData?.portfolioDetail?.assetclasswiseData?.[3]} />
                    </Col>
                  </Row>
                </Card>
              )}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <GenericCard header={"Product Allocation"}>
                <Treemap {...config} />
              </GenericCard>
            </Col>
          </Row>
          {investmentAllocationData && (
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <PieChartCard
                  chartData={investmentAllocationData.portfolioDetail.graphDataCountry}
                  title={"Country Allocation"}
                />
              </Col>
              <Col span={12}>
                {/* <RoseChartCard
                  chartData={
                    investmentAllocationData.portfolioDetail.graphDataCurrency
                  }
                  title={"Currency Allocation"}
                /> */}
                <PieChartCard
                  chartData={investmentAllocationData.portfolioDetail.graphDataCurrency}
                  title={"Currency Allocation"}
                />
              </Col>
            </Row>
          )}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <InvestmentDistributionCard />
            </Col>
          </Row>
        </Col>
        <Col xxl={9} xl={24} lg={24} md={24} sm={24}>
          {topHoldingData && (
            <GenericCard header={"Top Holdings"} viewAll={true}>
              {topHoldingData.portfolioDetail.topHoldingsData.slice(0, 4).map((data) => (
                <div style={styleSet.holdingCards}>
                  <HoldingCard HoldingCardData={data} />
                </div>
              ))}
            </GenericCard>
          )}
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    controlStructure: state.portfolioHoldings.controlStructure,
    assetClasswiseData: state.portfolioHoldings.assetClasswiseData,
    topHoldingData: state.portfolioHoldings.topHoldingData,
    holdingAmountData: state.portfolioHoldings.holdingAmountData,
    assetTypewiseData: state.portfolioHoldings.assetTypewiseData,
    investmentAllocationData: state.portfolioHoldings.investmentAllocationData,
  };
};
const mapDispatchToProps = {
  // executeGetCustomerOnboardingListingCs,
  // executeGetAllCustomerOnboardingData,
  // executeGetAllPendingAccounts,
};
export default connect(mapStateToProps, mapDispatchToProps)(OverViewTab);

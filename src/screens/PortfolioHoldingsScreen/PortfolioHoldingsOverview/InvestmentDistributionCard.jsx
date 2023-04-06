import React, { useState, useEffect } from "react";

import { Tabs, Select } from "antd";

import { Bar, Pie } from "@ant-design/charts";
import { connect } from "react-redux";
import GenericCard from "../../../components/GenericCard/GenericCard";

const barData = [
  {
    name: "Metal",
    value: 38,
  },
  {
    name: "Media",
    value: 52,
  },
  {
    name: "Pharmaceutical",
    value: 61,
  },
  {
    name: "IT",
    value: 145,
  },
  {
    name: "FMCG",
    value: 48,
  },
  {
    name: "Auto",
    value: 38,
  },
  {
    name: "Industrial",
    value: 38,
  },
  {
    name: "Banking",
    value: 38,
  },
  {
    name: "Oil and Gas",
    value: 38,
  },
];

const pieData = [
  {
    type: "Large Capital",
    value: 27,
  },
  {
    type: "Medium Capital",
    value: 25,
  },
  {
    type: "Small Capital",
    value: 18,
  },
];

const InvestmentDistributionCard = ({
  assetTypewiseData,
  selectedType,
  controlStructure,
}) => {
  const { TabPane } = Tabs;
  const { Option } = Select;
  function callback(key) {
    console.log(key);
  }

  const menuList = [
    {
      id: 0,
      menuName: "Equity",
    },
    {
      id: 1,
      menuName: "Mutual Funds",
    },
    {
      id: 2,
      menuName: "Fixed Income",
    },
  ];
  const [type, setType] = useState("Equity");

  let tabs = [];

  useEffect(() => {
    selectedType =
      selectedType === undefined ? menuList[0]?.menuName : selectedType;

    setType(selectedType);
  }, [selectedType]);

  switch (type) {
    case "Equity":
      tabs = [
        {
          tab: "Sector",
          key: "sector",
          chartData: assetTypewiseData.portfolioDetail?.eqAllocSectorWise,
        },
        {
          tab: "Market Capitalization",
          key: "marketCapitalization",
          chartData: assetTypewiseData.portfolioDetail?.eqAllocCapitalWise,
        },
      ];
      break;
    case "Mutual Funds":
      tabs = [
        {
          tab: "Category",
          key: "category",
          chartData: assetTypewiseData.portfolioDetail?.mfAllocCategoryWise,
        },
        {
          tab: "Fund Manager",
          key: "fundManager",
          chartData: assetTypewiseData.portfolioDetail?.mfAllocIssuerWise,
        },
      ];
      break;
    case "Fixed Income":
      tabs = [
        {
          tab: "Portfolio Duration",
          key: "portfolioDuration",
          chartData: assetTypewiseData.portfolioDetail?.fiAllocDurationWise,
        },
        {
          tab: "Distribution",
          key: "distribution",
          chartData: assetTypewiseData.portfolioDetail?.fiAllocAssetTypeWise,
        },
      ];
      break;

    default:
      tabs = [
        {
          tab: "Tab 1",
          key: "tab1",
        },
        {
          tab: "Tab 2",
          key: "tab 2",
        },
      ];
      break;
  }

  const barConfig = {
    data: tabs[0].chartData ? tabs[0].chartData : barData,
    xField: "value",
    yField: "name",
    legend: { position: "top-left" },
    barBackground: { style: { fill: "rgba(0,0,0,0.1)" } },
    interactions: [
      {
        type: "active-region",
        enable: false,
      },
    ],
  };

  const pieConfig = {
    appendPadding: 10,
    data: tabs[1].chartData ? tabs[1].chartData : pieData,
    angleField: "value",
    colorField: "name",
    radius: 1,
    innerRadius: 0.8,
    label: false,
    interactions: false,
    statistic: false,
  };

  return (
    <>
      <GenericCard
        header={"Investment Distribution"}
        menuFlag={2}
        menuList={menuList}
        dropdownKey={"investmentDistributionKey"}
      >
        <Tabs defaultActiveKey={tabs[0].key} onChange={callback}>
          <TabPane tab={tabs[0].tab} key={tabs[0].key}>
            <Bar {...barConfig} />
          </TabPane>
          <TabPane tab={tabs[1].tab} key={tabs[1].key}>
            <Pie {...pieConfig} />
          </TabPane>
        </Tabs>
      </GenericCard>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    assetTypewiseData: state.portfolioHoldings.assetTypewiseData,
    selectedType: state.common.dropdownKeys?.investmentDistributionKey,
    controlStructure: state.portfolioHoldings.controlStructure,
  };
};
export default connect(mapStateToProps)(InvestmentDistributionCard);

import React, { useState, useEffect } from "react";
import { Rose } from "@ant-design/charts";
import GenericCard from "../../../components/GenericCard/GenericCard";

const data = [
  {
    type: "USA",
    value: 27,
  },
  {
    type: " Philippines",
    value: 25,
  },
  {
    type: "China",
    value: 18,
  },
];
const RoseChartCard = ({ title = "Test Title", chartData }) => {
  const mappedData = chartData.map((data) => {
    const container = {};

    container["type"] = data.name;
    container["value"] = data.percentage;

    return container;
  });

  var config = {
    height: 402,
    width: 402,
    data: mappedData ? mappedData : data,
    xField: "type",
    yField: "value",
    seriesField: "type",
    radius: 0.9,
    legend: { position: "bottom" },
    // innerRadius: 0.6,
    // state: 'active'
  };
  return (
    <>
      <GenericCard header={title}>
        <Rose {...config} />
      </GenericCard>
    </>
  );
};

export default RoseChartCard;

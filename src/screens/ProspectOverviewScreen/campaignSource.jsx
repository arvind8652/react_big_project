import React from "react";
import { Bar } from "@ant-design/charts";
export default function CampaignSource({
  data,
  xfield,
  yfield,
  plottingCategory,
}) {
  const config = {
    data: data,
    xField: xfield,
    yField: yfield,
    barWidthRatio: 0.3,
    barBackground: {
      style: {
        fill: "#F0F2FB",
        fillOpacity: 1,
      },
    },
    barStyle: {
      fill: "#5564C1",
    },
    xAxis: {
      maxLimit: plottingCategory.maxLimit,
      minLimit: plottingCategory.minLimit,
      tickCount: plottingCategory.axisCount,
    },
  };

  return <Bar {...config} />;
}

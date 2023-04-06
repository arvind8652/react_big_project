import React from "react";
import { Gauge } from "@ant-design/charts";

const defaultColor = ["#57BB61", "#9BBB57", "#E8CE49", "#E89F49", "#E84949"];
const defaultRange = [0, 1 / 5, 2 / 5, 3 / 5, 4 / 5, 1];

const CustomGauge = ({
  title = "test1",
  subtitle = "test2",
  value,
  color = defaultColor,
  range = defaultRange,
}) => {
  const config = {
    percent: value,
    range: {
      ticks: range,
      color: color,
    },
    indicator: {
      pointer: { style: { stroke: "#D0D0D0" } },
      pin: { style: { stroke: "#D0D0D0" } },
    },

    statistic: {
      title: {
        formatter: function formatter() {
          return title;
        },
      },
      content: {
        offsetY: 36,
        style: {
          fontSize: "20px",
          color: "#696A91",
          fontWeight: "200",
          lineHeight: 2,
        },
        formatter: function formatter() {
          return subtitle;
        },
      },
    },
  };

  const styleSet = {
    height: "150px",
    fontSize: "20px",
  };

  return (
    <>
      <Gauge style={styleSet} {...config} />
    </>
  );
};
export default CustomGauge;

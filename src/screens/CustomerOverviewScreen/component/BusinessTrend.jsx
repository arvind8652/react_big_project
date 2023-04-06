import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/charts";
import GenericCard from "../../../components/GenericCard/GenericCard";

const defaultColChartData = [
  { name: "Aquired", month: "Jan.", value: 70, type: "Aquired" },
  { name: "Managed", month: "Jan.", value: 67, type: "Managed" },
  { name: "Lost", month: "Jan.", value: -30.5, type: "Lost" },

  { name: "Aquired", month: "Feb.", value: 82.5, type: "Aquired" },
  { name: "Managed", month: "Feb.", value: 65.5, type: "Managed" },
  { name: "Lost", month: "Feb.", value: -10, type: "Lost" },

  { name: "Aquired", month: "Mar.", value: 82.5, type: "Aquired" },
  { name: "Managed", month: "Mar.", value: 65.5, type: "Managed" },
  { name: "Lost", month: "Mar.", value: 0, type: "Lost" },

  { name: "Aquired", month: "Apr.", value: 82.5, type: "Aquired" },
  { name: "Managed", month: "Apr.", value: 65.5, type: "Managed" },
  { name: "Lost", month: "Apr.", value: -55, type: "Lost" },

  { name: "Aquired", month: "May.", value: 82.5, type: "Aquired" },
  { name: "Managed", month: "May.", value: 65.5, type: "Managed" },
  { name: "Lost", month: "May.", value: -25, type: "Lost" },
];

const menuList = [
  {
    id: 0,
    menuName: "AUM",
  },
  {
    id: 1,
    menuName: "Revenue",
  },
  {
    id: 2,
    menuName: "Relationship",
  },
  {
    id: 3,
    menuName: "Trend",
  },
];

const defaultData = [
  {
    Month: "Jun",
    scales: 1998,
    Result: "New Customer",
  },
  {
    Month: "July",
    scales: 1850,
    Result: "Customer Lost",
  },
  {
    Month: "Aug",
    scales: 900,
    Result: "New Customer",
  },
  {
    Month: "Sep",
    scales: 1818,
    Result: "Customer Lost",
  },
  {
    Month: "Oct",
    scales: 590,
    Result: "New Customer",
  },
  {
    Month: "Nov",
    scales: 590,
    Result: "Customer Lost",
  },
];

var areaConfig = {
  data: defaultData,
  xField: "Month",
  yField: "scales",
  smooth: true,
  colorField: "Result",
  color: ["#5564C1", "#56B8BE"],
  size: 10,
  shape: "circle",
  pointStyle: {
    fillOpacity: 1,
  },
  xAxis: {
    range: [0, 1],
    tickCount: 5,
  },

  geometries: [
    {
      type: "point",
      xField: "Month",
      yField: "scales",
      mapping: {
        shape: "circle",
        style: {
          fillOpacity: 1,
        },
      },
    },
  ],
  areaStyle: function areaStyle() {
    return { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" };
  },
};

const BusinessTrend = ({ selectedType }) => {
  const [type, setType] = useState("Relationship");
  useEffect(() => {
    selectedType = selectedType === undefined ? menuList[0]?.menuName : selectedType;

    setType(selectedType);
  }, [selectedType]);

  return (
    <GenericCard header="Business Trend" menuFlag={2} menuList={menuList} dropdownKey={"businessTrendType"}>
      {type === "Relationship" ? (
        <Area {...areaConfig} />
      ) : (
        <Area {...areaConfig} />
        // <Column {...config} />
      )}
    </GenericCard>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedType: state.common.dropdownKeys?.businessTrendType,
  };
};
export default BusinessTrend;

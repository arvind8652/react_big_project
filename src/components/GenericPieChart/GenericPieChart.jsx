import { Pie } from "@ant-design/charts"; 
const GenericPieChart = () => {
  var data = [
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
  var config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.8,
    label: false,
    interactions: false,
    statistic: false,
  };
  return (
    <>
      <Pie {...config} />
    </>
  );
};
export default GenericPieChart;

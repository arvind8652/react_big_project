import { Pie } from "@ant-design/charts";
import GenericCard from "../../../components/GenericCard/GenericCard";

const PieChartCard = ({ title, chartData }) => {
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

  const mappedData = chartData.map((data) => {
    const container = {};

    container["type"] = data.name;
    container["value"] = data.percentage;

    return container;
  });

  var config = {
    appendPadding: 10,
    data: mappedData ? mappedData : data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    //innerRadius: 0.8,
    label: false,
    interactions: false,
    statistic: false,
  };

  return (
    <>
      <GenericCard header={title}>
        <Pie {...config} />
      </GenericCard>
    </>
  );
};
export default PieChartCard;

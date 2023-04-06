// import { Treemap } from "@ant-design/charts";
import { Treemap } from "@ant-design/charts";
const TreeMapChart = () => {
  const data = {
    name: "root",
    children: [
      {
        name: "Stocks",
        value: 560,
      },
      {
        name: "Mutual Funds",
        value: 500,
      },
      {
        name: "Others",
        value: 100,
      },
      {
        name: "Real Estate",
        value: 200,
      },
      {
        name: "Derivatives",
        value: 200,
      },
      {
        name: "Deposits",
        value: 200,
      },
      {
        name: "Bonds",
        value: 200,
      },
    ],
  };
  const config = {
    data: data,
    colorField: "name",
  };
  return <>{/* <Treemap {...config} /> */}</>;
};
export default TreeMapChart;

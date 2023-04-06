import GenericCard from '../GenericCard/GenericCard';
// import { Treemap } from "@ant-design/charts";
import { Tabs } from 'antd';
import BarChart from '@ant-design/charts/es/bar';
import { Bar } from '@ant-design/charts';
const GenericBarChart = ({ title }) => {
	const data = [
		{
			type: 'Metal',
			sales: 38
		},
		{
			type: 'Media',
			sales: 52
		},
		{
			type: 'Pharmaceutical',
			sales: 61
		},
		{
			type: 'IT',
			sales: 145
		},
		{
			type: 'FMCG',
			sales: 48
		},
		{
			type: 'Auto',
			sales: 38
		},
		{
			type: 'Industrial',
			sales: 38
		},
		{
			type: 'Banking',
			sales: 38
		},
		{
			type: 'Oil and Gas',
			sales: 38
		}
	];
	const config = {
		data: data,
		xField: 'sales',
		yField: 'type',
		legend: { position: 'top-left' },
		barBackground: { style: { fill: 'rgba(0,0,0,0.1)' } },
		interactions: [
			{
				type: 'active-region',
				enable: false
			}
		]
	};
	// const data = {
	//   name: "root",
	//   children: [
	//     {
	//       name: "Stocks",
	//       value: 560,
	//     },
	//     {
	//       name: "Mutual Funds",
	//       value: 500,
	//     },
	//     {
	//       name: "Other",
	//       value: 150,
	//     },
	//     {
	//       name: "Real Estate",
	//       value: 140,
	//     },
	//     {
	//       name: "Derivatives",
	//       value: 115,
	//     },
	//     {
	//       name: "Deposits",
	//       value: 95,
	//     },
	//     {
	//       name: "Bonds",
	//       value: 90,
	//     },
	//   ],
	// };
	// const config = {
	//   data: data,
	//   colorField: "name",
	// };
	return (
		<>
			<GenericCard header={title}>
				{/* <Treemap {...config} /> */}
				<Bar {...config} />
			</GenericCard>
		</>
	);
};
export default GenericBarChart;

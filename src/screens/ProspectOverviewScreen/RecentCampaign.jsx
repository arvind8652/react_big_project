import React from 'react';
import { Bullet } from '@ant-design/charts';
const RecentCampaign = (data, measures, ranges, target) => {
	const Config = {
		height: 60,
		data: [data.data],
		measureField: 'bulletMeasureField',
		rangeField: 'bulletRangeField',
		targetField: 'bulletTargetField',
		// xField: 'title',
		color: {
			range: ['#ffffff', '#ffffff', '#ffffff'],
			measure: ['#5564C1', '#56B8BE', '#792B80']
		},
		label: {
			measure: {
				position: 'middle',
				style: {
					fill: '#fff'
				},
				formatter: (val) => {
					return val.bulletMeasureField ? val.bulletMeasureField + ' %' : null;
				}
			}
		},
		xAxis: {
			line: null,
			label: null
		},
		yAxis: false,
		tooltip: {
			showMarkers: false,
			showContent: false
			// shared: true,
		},
		legend: {
			custom: true,
			position: 'bottom',
			items: [
				// {
				//   value: "Leads",
				//   name: "Leads(" + [data.data][0].leadCount + ")",
				//   style: { color: "#5564C1" },
				//   marker: {
				//     symbol: "square",
				//     style: {
				//       fill: "#5564C1",
				//       r: 5,
				//     },
				//   },
				// },
				{
					value: 'Prospects',
					name: 'Prospects(' + [data.data][0].prospectCount + ')',
					marker: {
						symbol: 'square',
						style: {
							fill: '#56B8BE',
							r: 5
						}
					}
				},
				{
					value: 'Clients',
					name: 'Clients(' + [data.data][0].customerCount + ')',
					marker: {
						symbol: 'square',
						style: {
							fill: '#792B80',
							r: 5
						}
					}
				}
			]
		}
	};
	return <Bullet {...Config} />;
};
export default RecentCampaign;

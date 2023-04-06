import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { Pie } from '@ant-design/charts';
import { riskDistribution } from '../constant';
import GenericCard from '../../../components/GenericCard/GenericCard';
import PlottingAttributeSelector from '../../../components/PlottingAttributeSelector/PlottingAttributeSelector';
import { getRiskDistributionApi } from '../../../api/customerOverviewApi';

const RiskDistribution = (props) => {
	const [riskDistributionData, setRiskDistributionData] = useState([]);
	const styleSet = {
		cardHeaderStyle: {
			fontSize: '18px'
		}
	};
	// function renderStatistic(containerWidth, text, style) {
	//   var _measureTextWidth = (0, measureTextWidth)(text, style),
	//     textWidth = _measureTextWidth.width,
	//     textHeight = _measureTextWidth.height;
	//   var R = containerWidth / 2;
	//   var scale = 1;
	//   if (containerWidth < textWidth) {
	//     scale = Math.min(
	//       Math.sqrt(
	//         Math.abs(
	//           Math.pow(R, 2) /
	//             (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
	//         )
	//       ),
	//       1
	//     );
	//   }
	//   var textStyleStr = "width:".concat(containerWidth, "px;");
	//   return '<div style="'
	//     .concat(textStyleStr, ";font-size:")
	//     .concat(scale, "em;line-height:")
	//     .concat(scale < 1 ? 1 : "inherit", ';">')
	//     .concat(text, "</div>");
	// }

	const [plottingField, setPlottingField] = useState('individual');
	const [demoGraphicsData, setDemoGraphicsData] = useState({});
	const [demoData, setDemoData] = useState([]);

	useEffect(() => {}, [riskDistributionData]);
	useEffect(() => {
		getRiskDistributionApi().then((res) => {
			setRiskDistributionData(res.data);
		});
	}, []);

	const getApiData = async () => {
		let resp = await getRiskDistributionApi(plottingField === 'individual' ? 'I' : 'C');
		setDemoGraphicsData(resp.data);
	};
	useEffect(() => {
		getApiData();
	}, [plottingField]);

	useEffect(() => {
		let demoList = [];
		if (demoGraphicsData && Object.keys(demoGraphicsData).length > 0) {
			if (
				demoGraphicsData &&
				demoGraphicsData?.riskDistribution &&
				demoGraphicsData?.riskDistribution.length > 0
			) {
				demoGraphicsData?.riskDistribution.map((ele) =>
					demoList.push({
						type: ele.fieldName,
						value: ele.fieldCount,
						per: ele.fieldPer
					})
				);
			}
		}
		setDemoData(demoList);
	}, [demoGraphicsData]);

	var data = [
		{
			type: 'Risk Averse',
			value: 32
		},
		{
			type: 'Conservative',
			value: 22
		},
		{
			type: 'Moderate',
			value: 16
		},
		{
			type: 'Aggresive',
			value: 30
		}
	];
	const RenderTooltip = (data) => {
		const TooltipWrapper = styled.div`
			min-width: 82px;
			width: ${(props) => props.width};
			padding: 5px;
		`;
		const TooltipAttribute = styled(Row)`
			margin: 6px 0;
		`;
		const ValueAttr = () => {
			return (
				<>
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={18}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>
										<strong>{data.type}</strong>
									</div>
									<div>
										<strong>:</strong>
									</div>
								</Row>
							</span>
						</Col>
						<Col span={5}>
							<strong>{data && data.per + '%'}</strong>
						</Col>
						<Col span={10}>
							<strong>{data.value}</strong>
						</Col>
					</TooltipAttribute>
					{/* <Row>({data.value})</Row> */}
				</>
			);
		};

		return (
			<TooltipWrapper width='178px'>
				<strong>{data[0] && data[0].title}</strong>
				<ValueAttr />
			</TooltipWrapper>
		);
	};
	var config = {
		appendPadding: 10,
		data: demoData,
		angleField: 'value',
		colorField: 'type',
		color: ['#5564C1', '#56B8BE', '#792B80', '#C4C4C4'],
		size: 10,
		shape: 'circle',
		pointStyle: {
			fillOpacity: 1
		},
		radius: 1,
		innerRadius: 0.79,
		// meta: {
		//   value: {
		//     formatter: function formatter(v) {
		//       return "".concat(v, " \xA5");
		//     },
		//   },
		// },
		// label: {
		//   type: "inner",
		//   offset: "-50%",
		//   style: { textAlign: "center" },
		//   autoRotate: false,
		//   content: "{value}",
		// },
		label: null,
		legend: {
			layout: 'horizontal',
			position: 'bottom'
		},
		tooltip: {
			domStyles: {
				'g2-tooltip': {
					border: '1px solid #5d6dd1',
					boxSizing: 'border-box',
					boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
					borderRadius: '16px'
				}
			},
			customContent: (title, demoData) => {
				return demoData && Array.isArray(demoData) && demoData.length > 0
					? RenderTooltip(demoData[0].data)
					: null;
			}
		},
		statistic: {
			title: false,
			content: false
			// title: {
			//   offsetY: -4,
			//   customHtml: function customHtml(container, view, datum) {
			//     var _container$getBoundin = container.getBoundingClientRect(),
			//       width = _container$getBoundin.width,
			//       height = _container$getBoundin.height;
			//     var d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
			//     var text = datum ? datum.type : "";
			//     return renderStatistic(d, text, { fontSize: 28 });
			//   },
			// },
			// content: {
			//   offsetY: 4,
			//   style: { fontSize: "32px" },
			//   customHtml: function customHtml(container, view, datum, data) {
			//     var _container$getBoundin2 = container.getBoundingClientRect(),
			//       width = _container$getBoundin2.width;
			//     var text = datum
			//       ? "\xA5 ".concat(datum.value)
			//       : "\xA5 ".concat(
			//           data.reduce(function (r, d) {
			//             return r + d.value;
			//           }, 0)
			//         );
			//     return renderStatistic;
			//   },
			// },
		},
		interactions: [
			{ type: 'element-selected' },
			{ type: 'element-active' }
			// {
			//   type: "pie-statistic-active",
			//   cfg: {
			//     start: [
			//       { trigger: "element:mouseenter", action: "pie-statistic:change" },
			//       {
			//         trigger: "legend-item:mouseenter",
			//         action: "pie-statistic:change",
			//       },
			//       { trigger: "element:mouseleave", action: "pie-statistic:reset" },
			//       {
			//         trigger: "legend-item:mouseleave",
			//         action: "pie-statistic:reset",
			//       },
			//     ],
			//   },
			// },
		]
	};

	return (
		<>
			<div>
				<GenericCard headStyle={styleSet.cardHeaderStyle} header={riskDistribution}>
					{/* <h4>Individual:Institution</h4> */}
					<PlottingAttributeSelector
						plottingField={plottingField}
						setPlottingField={setPlottingField}
						valueBtnText='Individual'
						countBtnText='Corporate'
						valueBtnMapping='individual'
						countBtnMapping='institution'
					/>
					{!demoData.length ? (
						<div
							style={{
								height: '350px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<span style={{ textAlign: 'center' }}>No Graph Data </span>{' '}
						</div>
					) : (
						<Pie {...config} />
					)}
				</GenericCard>
			</div>
		</>
	);
};
export default RiskDistribution;

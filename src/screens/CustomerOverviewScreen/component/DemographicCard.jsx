import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Pie } from '@ant-design/charts';
import { demographic } from '../constant';
import GenericCard from '../../../components/GenericCard/GenericCard';
import PlottingAttributeSelector from '../../../components/PlottingAttributeSelector/PlottingAttributeSelector';
import { getDemographicsApi } from '../../../api/customerOverviewApi';

const DemographicCard = (props) => {
	const { controlStructure, selectedType } = props;

	const [plottingField, setPlottingField] = useState('individual');
	const [dropDownMenu, setdropDownMenu] = useState([]);
	const [demoGraphicsData, setDemoGraphicsData] = useState({});
	const [demoData, setDemoData] = useState([]);
	const menuListDefault = [
		{
			id: 0,
			menuName: 'Occupation'
		},
		{
			id: 1,
			menuName: 'Networth'
		},
		{
			id: 2,
			menuName: 'Income'
		},
		{
			id: 3,
			menuName: 'Age Group'
		}
	];
	useEffect(() => {
		const options = controlStructure.dropDownValue?.map((option, index) => {
			return {
				id: option.dataValue,
				menuName: option.displayValue
			};
		});
		setdropDownMenu(options);
	}, [controlStructure]);

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

	useEffect(() => {
		let demoList = [];
		if (Object.keys(demoGraphicsData).length > 0) {
			if (demoGraphicsData?.demographic?.length) {
				demoGraphicsData?.demographic.map((ele) =>
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

	//Changes Tooltip
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

		// color: ["#5564C1", "#56B8BE", "#792B80", "#C4C4C4"],
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
		//   content: `{value}`,
		//   autoHide:true,

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
		},
		// statistic: {
		//   title: {
		//     offsetY: -4,
		//     customHtml: function customHtml(container, view, datum) {
		//       var _container$getBoundin = container.getBoundingClientRect(),
		//         width = _container$getBoundin.width,
		//         height = _container$getBoundin.height;
		//       var d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
		//       var text = datum ? datum.type : "";
		//       return renderStatistic(d, text, { fontSize: 28 });
		//     },
		//   },
		//   content: {
		//     offsetY: 4,
		//     style: { fontSize: "32px" },
		//     customHtml: function customHtml(container, view, datum, data) {
		//       var _container$getBoundin2 = container.getBoundingClientRect(),
		//         width = _container$getBoundin2.width;
		//       var text = datum
		//         ? "\xA5 ".concat(datum.value)
		//         : "\xA5 ".concat(
		//             data.reduce(function (r, d) {
		//               return r + d.value;
		//             }, 0)
		//           );
		//       return renderStatistic;
		//     },
		//   },
		// },
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

	const getApiData = async () => {
		let selectedData = selectedType?.length
			? dropDownMenu.filter((ins) => selectedType === ins.menuName)
			: dropDownMenu.length
			? [dropDownMenu[0]]
			: [];

		let resp = await getDemographicsApi(
			plottingField === 'individual' ? 'I' : 'C',
			selectedData[0].id
		);
		setDemoGraphicsData(resp.data);
	};
	useEffect(() => {
		if (dropDownMenu && dropDownMenu.length > 0) {
			getApiData();
		}
	}, [selectedType, dropDownMenu, plottingField]);

	return (
		<>
			<div>
				{dropDownMenu && dropDownMenu.length > 0 && (
					<GenericCard
						headStyle={styleSet.cardHeaderStyle}
						header={demographic}
						menuFlag={2}
						menuList={dropDownMenu && dropDownMenu.length > 0 ? dropDownMenu : menuListDefault}
						dropdownKey={'demograhicsType'}
					>
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
						{/* {!demoData.length ? <span> No Graph data </span> : null} */}
					</GenericCard>
				)}
			</div>
		</>
	);
};

function mapStateToProps(state) {
	return {
		selectedType: state?.common?.dropdownKeys?.demograhicsType
	};
}

export default connect(mapStateToProps)(DemographicCard);

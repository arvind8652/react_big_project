import React, { useState, useEffect } from 'react';
import GenericCard from '../../components/GenericCard/GenericCard';
import { Column, Area } from '@ant-design/charts';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import styled from 'styled-components';

const BusinessTrendCard = ({
	selectedType,
	allAumTrendData,
	allRevenueTrendData,
	allRelationshipTrendData,
	authData
}) => {
	const defaultColChartData = [
		{ name: 'Aquired', month: 'Jan.', value: 70, type: 'Aquired' },
		{ name: 'Managed', month: 'Jan.', value: 67, type: 'Managed' },
		{ name: 'Lost', month: 'Jan.', value: -30.5, type: 'Lost' },

		{ name: 'Aquired', month: 'Feb.', value: 82.5, type: 'Aquired' },
		{ name: 'Managed', month: 'Feb.', value: 65.5, type: 'Managed' },
		{ name: 'Lost', month: 'Feb.', value: -10, type: 'Lost' },

		{ name: 'Aquired', month: 'Mar.', value: 82.5, type: 'Aquired' },
		{ name: 'Managed', month: 'Mar.', value: 65.5, type: 'Managed' },
		{ name: 'Lost', month: 'Mar.', value: 0, type: 'Lost' },

		{ name: 'Aquired', month: 'Apr.', value: 82.5, type: 'Aquired' },
		{ name: 'Managed', month: 'Apr.', value: 65.5, type: 'Managed' },
		{ name: 'Lost', month: 'Apr.', value: -55, type: 'Lost' },

		{ name: 'Aquired', month: 'May.', value: 82.5, type: 'Aquired' },
		{ name: 'Managed', month: 'May.', value: 65.5, type: 'Managed' },
		{ name: 'Lost', month: 'May.', value: -25, type: 'Lost' }
	];
	const config = {
		data: [],
		xField: 'month',
		yField: 'value',
		// isGroup: true,
		isStack: true,
		seriesField: 'type',
		groupField: 'name',
		minColumnWidth: 48,
		maxColumnWidth: 48
	};

	const menuList = [
		{
			id: 0,
			menuName: 'AUM'
		},
		// {
		//   id: 1,
		//   menuName: "Revenue",
		// },
		{
			id: 2,
			menuName: 'Relationship'
		}
	];

	const defaultData = [
		{
			Date: '2010-01',
			scales: 1998
		},
		{
			Date: '2010-02',
			scales: 1850
		},
		{
			Date: '2010-03',
			scales: 900
		},
		{
			Date: '2010-04',
			scales: 1818
		},
		{
			Date: '2010-05',
			scales: 590
		},
		{
			Date: '2010-06',
			scales: 1802
		},
		{
			Date: '2010-07',
			scales: 1945
		}
	];

	const getAreaChartData = (list) => {
		return list && list.length > 0
			? list?.map((item) => {
					return {
						Date: item?.monthyear,
						scales: item?.aumRevExp
					};
			  })
			: [];
	};

	const RenderTooltip = (title, data) => {
		let newDate = data[0] && data[0].title;
		let newAmt = data[0] && data[0].value;
		const NewData = () => {
			return new Intl.NumberFormat(authData === 'INDIAN' ? 'en-IN' : 'en-US', {
				minimumFractionDigits: 0
			}).format(newAmt);
		};
		const TooltipWrapper = styled.div`
			min-width: 100px;
			padding: 5px;
		`;
		const TooltipAttribute = styled(Row)`
			margin: 6px 0;
		`;
		const ValueAttr = () => (
			<TooltipAttribute align='top' justify='space-between'>
				<Col>
					Scales : &nbsp;
					<strong>{NewData()}</strong>
				</Col>
			</TooltipAttribute>
		);
		const MonthAttr = () => {
			return (
				<TooltipAttribute align='top' justify='space-between'>
					<Col>
						<strong>{newDate}</strong>
					</Col>
				</TooltipAttribute>
			);
		};
		return (
			<TooltipWrapper>
				<MonthAttr />
				<ValueAttr />
			</TooltipWrapper>
		);
	};

	var areaConfig = {
		data: [],
		xField: 'Date',
		yField: 'scales',
		smooth: true,
		xAxis: {
			range: [0, 1],
			tickCount: 5
		},
		areaStyle: function areaStyle() {
			return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' };
		},
		tooltip: {
			domStyles: {
				'g2-tooltip': {
					border: '1px solid #5d6dd1',
					boxSizing: 'border-box',
					boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
					borderRadius: '16px',
					cursor: 'pointer'
				}
			},
			customContent: (title, data) => {
				return data ? RenderTooltip(title, data) : null;
			}
		}
	};

	const [colChartConfig, setColChartConfig] = useState(config);
	const [areaChartConfig, setAreaChartConfig] = useState(areaConfig);
	const [type, setType] = useState('AUM');

	useEffect(() => {
		setAreaChartConfig({
			...areaChartConfig,
			data: getAreaChartData(allAumTrendData)
		});
	}, [allAumTrendData]);

	useEffect(() => {
		let typeCheck = selectedType === undefined ? menuList[0]?.menuName : selectedType;
		// selectedType =

		switch (typeCheck) {
			case 'AUM':
				setAreaChartConfig({
					...areaChartConfig,
					data: getAreaChartData(allAumTrendData)
				});
				break;
			case 'Revenue':
				setAreaChartConfig({
					...areaChartConfig,
					data: getAreaChartData(allRevenueTrendData)
				});
				break;
			case 'Relationship':
				setColChartConfig({
					...config,
					data: allRelationshipTrendData
				});
				// setColChartConfig({...config, data:})
				break;

			default:
				break;
		}
	}, [selectedType]);

	return (
		<GenericCard
			header='Business Trend'
			menuFlag={2}
			menuList={menuList}
			dropdownKey={'businessTrendType'}
		>
			{selectedType === 'Relationship' ? (
				<Column {...colChartConfig} />
			) : (
				<Area {...areaChartConfig} />
			)}
		</GenericCard>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedType: state.common.dropdownKeys?.businessTrendType,
		allAumTrendData: state.crmHome.aumTrend,
		allRevenueTrendData: state.crmHome.revenueTrend,
		allRelationshipTrendData: state.crmHome.relationshipTrend,
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2
	};
};
export default connect(mapStateToProps)(BusinessTrendCard);

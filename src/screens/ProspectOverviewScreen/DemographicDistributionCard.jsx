import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Select, Tabs } from 'antd';

import { Pie } from '@ant-design/charts';
import { getDemographicDataApi } from '../../api/prospectOverviewApi';
import styled from 'styled-components';

import PlottingCategorySelector from './PlottingCategorySelector';
import { theme } from '../../theme';
const DemographicDistributionCard = () => {
	const [loading, setLoading] = useState(true);
	const [demographicData, setDemographicData] = useState();
	const [category, setCategory] = useState('Category');
	const RenderCardHeader = () => {
		const options = [
			{ value: 'Type', label: 'Type' },
			{ value: 'Branch', label: 'Office' },
			{ value: 'Category', label: 'Category' },
			{ value: 'Gender', label: 'Gender' },
			{ value: 'Nationality', label: 'Nationality' },
			{ value: 'Age', label: 'Age' },
			{ value: 'Banking', label: 'Banking Relation' }
		];

		return (
			<>
				<h3 style={{ fontSize: '18px' }}>Demographic Distribution</h3>
				<PlottingCategorySelector
					options={options}
					plottingCategory={category}
					setPlottingCategory={setCategory}
				/>
			</>
		);
	};

	useEffect(() => {
		getDemographicDataApi(category).then((res) => {
			setDemographicData(res.data);
			setLoading(false);
		});
	}, [category]);

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
									<div>{data.sourceName}</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={5}>
							<strong>{data && data.percentage + '%'}</strong>
						</Col>
					</TooltipAttribute>
					<Row>({data.count})</Row>
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
	if (demographicData) {
		var config = {
			// width: 548,
			height: 400,
			appendPadding: 10,
			data: demographicData,
			angleField: 'percentage',
			// angleField: "count",
			colorField: 'sourceName',
			color: ['#5564C1', '#56B8BE', '#792B80', '#898EA9'],
			radius: 1,
			innerRadius: 0.7,
			label: null,
			legend: {
				// layout: "horizontal",
				// maxWidth: 400,
				// maxheight: 400,
				position: 'bottom',
				itemName: {
					style: {
						fontSize: 12
					}
				}
			},
			interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
			tooltip: {
				domStyles: {
					'g2-tooltip': {
						border: '1px solid #5d6dd1',
						boxSizing: 'border-box',
						boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
						borderRadius: '16px'
					}
				},
				customContent: (title, demographicData) => {
					return demographicData && Array.isArray(demographicData) && demographicData.length > 0
						? RenderTooltip(demographicData[0].data)
						: null;
				}
			},
			statistic: null
		};
	}

	return (
		<Card
			loading={loading}
			className='dist-card styled-border'
			style={{ height: '592px' }}
			title={<RenderCardHeader />}
		>
			<div className='graph-section'>
				<Pie {...config} />
			</div>
		</Card>
	);
};
export default DemographicDistributionCard;

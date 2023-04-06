import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Avatar } from 'antd';
import { TinyArea } from '@ant-design/charts';
import { UserOutlined } from '@ant-design/icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { palette, theme } from '../../theme';
import styled from 'styled-components';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
const UserBanner = ({ allUserInfoData, authData }) => {
	const [chartData, setChartData] = useState();
	const defaultGraphData = [
		{
			aumRevExp: 0
		},
		{
			aumRevExp: 0
		},
		{
			aumRevExp: 0
		},
		{
			aumRevExp: 0
		},
		{
			aumRevExp: 0
		},
		{
			aumRevExp: 0
		}
	];

	const defaultData = {
		name: 'Jonathan Doe',
		imgUrl: '',
		client: '245',
		prospects: '438',
		opportunities: '312',
		role: 'Relationship Manager',
		branchName: 'Metro Manali Branch',
		location: 'Brooklyn Metropolian Area',
		aum: '$245,000',
		revenue: '$250,435',
		expectedBusiness: '$250,435',
		aumChartData: defaultGraphData,
		revenueChartData: defaultGraphData,
		expectedBusinessChartData: defaultGraphData
	};

	const groupBy = (items, key) => {
		return items.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [...(result[item[key]] || []), item]
			}),
			{}
		);
	};

	const [bannerData, setBannerData] = useState(defaultData);

	useEffect(() => {
		let data = {};
		if (allUserInfoData?.currentUser?.aumRevExpData) {
			data = groupBy(allUserInfoData.currentUser?.aumRevExpData, 'businessType');
		}

		setChartData(data);
	}, [allUserInfoData]);

	useEffect(() => {
		const apiBannerData = {
			name: `${allUserInfoData?.currentUser?.userName || ' '}`,
			imgUrl: `${allUserInfoData?.currentUser?.profileImage || ' '}`,
			client: `${allUserInfoData?.currentUser?.clientCount || 0}`,
			prospects: `${allUserInfoData?.currentUser?.prospectCount || 0}`,
			opportunities: `${allUserInfoData?.currentUser?.opportunityCount || 0}`,
			role: `${allUserInfoData?.currentUser?.user_Group || ' '}`,
			branchName: `${allUserInfoData?.currentUser?.unitHierarchyName || ' '} office`,
			location: `${allUserInfoData?.currentUser?.address || ' '}`,
			aum: `${allUserInfoData?.currentUser?.userTotalAUM || 0}`,
			revenue: `${allUserInfoData?.currentUser?.userTotalRevenue || 0}`,
			expectedBusiness: `${allUserInfoData?.currentUser?.userTotalExpectedBusiness || 0}`,
			aumChartData: chartData?.AUM,
			revenueChartData: chartData?.Revenue,
			expectedBusinessChartData: chartData?.Expected,
			currency: `${allUserInfoData?.currentUser?.currencySymbol || ' '}`,
			profileImage: `${allUserInfoData?.currentUser?.profileImage}`
		};

		setBannerData(apiBannerData);
	}, [chartData]);

	const styleSet = {
		bannerBackground: {
			borderRadius: '8px',
			background: 'linear-gradient(to left, #354081 100%, #354081 0%)'
		},
		bannerText: {
			color: palette.invert.main
		},
		userName: {
			color: palette.invert.heavy
		},
		chartData: {
			padding: '36px 0 16px 0'
		},
		addressBlck: {
			margin: '10px 0px'
		}
	};

	const [qualificationGraph, setQualificationGraph] = useState(defaultGraphData);
	const qualificationPlottingData =
		qualificationGraph && qualificationGraph.map((item) => item.convertQualifyCount);

	const RenderTooltip = (title, data, chartValue) => {
		let newAmt = data[0] && data[0].value;
		const NewData = () => {
			return new Intl.NumberFormat(authData == 'INDIAN' ? 'en-IN' : 'en-US', {
				minimumFractionDigits: 0
			}).format(newAmt);
		};
		const TooltipWrapper = styled.div`
			min-width: 160px;
			padding: 5px;
		`;
		const TooltipAttribute = styled(Row)`
			margin: 6px 0;
		`;
		const ValueAttr = () => (
			<TooltipAttribute align='top' justify='space-between'>
				<Col span={9}>
					<span>
						<Row justify='space-between' align='middle' style={{ width: '100%' }}>
							<div>Qualified</div>
							<div>:</div>
						</Row>
					</span>
				</Col>
				<Col span={14}>
					{/* <strong>{data[0] && data[0].value}</strong> */}
					<strong>{NewData()}</strong>
				</Col>
			</TooltipAttribute>
		);
		const MonthAttr = () => {
			let newTitle = title && title;
			let month = chartValue[newTitle];
			// let month;
			// if (
			//   (qualificationGraph,
			//     Array.isArray(qualificationGraph) &&
			//     data[0] &&
			//     qualificationGraph.length > 0 &&
			//     qualificationGraph.filter(
			//       (item, index) => index.toString() === data[0].title
			//     )[0])
			// ) {
			//   month = qualificationGraph.filter(
			//     (item, index) => index.toString() === data[0].title
			//   )[0].month;
			// }
			return (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Month</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>{month?.monthyear}</strong>
					</Col>
				</TooltipAttribute>
			);
		};
		return (
			<TooltipWrapper>
				<ValueAttr />
				<MonthAttr />
			</TooltipWrapper>
		);
	};

	const renderChart = (
		currdata = '',
		amount = '0',
		type = 'Type',
		chartValue = defaultGraphData
	) => {
		const chartData = chartValue?.map((item) => item.aumRevExp);
		const tinyAreaConfig = {
			width: 5000,
			height: 72,
			data: chartData,
			smooth: true,
			areaStyle: { fill: '#d6e3fd' },
			tooltip: {
				chartValue,
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
					return data ? RenderTooltip(title, data, chartValue) : null;
				}
			}
		};
		return (
			<>
				<Row style={styleSet.chartData}>
					<Col>
						<span style={theme.primaryHeader}>{currdata + ' '}</span>
						<span style={theme.primaryHeader}>{amount}</span>
						<br />
						<span style={theme.secondaryBody}>{type}</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='graph-section'>
							<TinyArea {...tinyAreaConfig} />
						</div>
					</Col>
				</Row>
			</>
		);
	};

	return (
		<>
			{bannerData && (
				<Card style={{ ...styleSet.bannerBackground, ...styleSet.bannerText }}>
					<Row>
						{/* <Col span={4} xxl={4} xl={6}> */}
						<Col span={4} xxl={4} xl={4}>
							{/* <Avatar size={178} icon={<UserOutlined />} /> */}
							{/* <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 100, xl: 140, xxl: 178 }} icon={<UserOutlined />} /> */}
							<Avatar
								style={{
									width: '10vw',
									height: '10vw',
									lineHeight: '10vw',
									fontSize: '5.5vw'
								}}
								icon={<UserOutlined />}
							/>
						</Col>
						{/* <Col span={8} xxl={8} xl={12}> */}
						<Col span={8} xxl={8} xl={8}>
							<Row>
								<Col span={16}>
									<span style={{ ...theme.xLargeHeader, ...styleSet.userName }}>
										{bannerData.name}
									</span>
									<br />
									<span style={{ ...theme.secondaryBody, ...styleSet.addressBlck }}>
										{bannerData.role} <br /> {bannerData.branchName} <br />
										<FontAwesomeIcon icon={faMapMarkerAlt} /> {bannerData.location}
									</span>
								</Col>
							</Row>
							<Row style={{ marginTop: '10px' }}>
								<Col span={7}>
									<span style={theme.primaryHeader}>{bannerData.client}</span>
									<br />
									<span style={theme.secondaryBody}>Clients</span>
								</Col>

								<Col span={7}>
									<span style={theme.primaryHeader}>{bannerData.prospects}</span>
									<br />
									<span style={theme.secondaryBody}>Prospect</span>
								</Col>
								<Col span={7}>
									<span style={theme.primaryHeader}>{bannerData.opportunities}</span>
									<br />
									<span style={theme.secondaryBody}>Opportunities</span>
								</Col>
							</Row>
						</Col>
						{/* <Col xxl={12} xl={24}> */}
						<Col xxl={12} xl={12}>
							{bannerData.currency !== 'undefined' ? (
								<Row>
									<Col xxl={8} xl={8} lg={8}>
										{renderChart(
											bannerData?.currency,
											<RupeeOrNonRupee amount={bannerData.aum} />,
											'Asset Under Management',
											bannerData.aumChartData
										)}
									</Col>
									{/* <Col xxl={8} xl={8} lg={8}>
										{renderChart(
											bannerData?.currency,
											<RupeeOrNonRupee amount={bannerData.revenue} />,
											'Revenue',
											bannerData.revenueChartData
										)}
									</Col> */}
									<Col xxl={8} xl={8} lg={8}>
										{renderChart(
											bannerData?.currency,
											<RupeeOrNonRupee amount={bannerData.expectedBusiness} />,
											'Expected Business',
											bannerData.expectedBusinessChartData
										)}
									</Col>
								</Row>
							) : (
								''
							)}
						</Col>
					</Row>
				</Card>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		allUserInfoData: state.crmHome.userInfo?.userInfo,
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2
	};
};
export default connect(mapStateToProps)(UserBanner);

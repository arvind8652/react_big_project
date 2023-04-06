import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Avatar, Modal, Typography } from 'antd';
import 'antd/dist/antd.css';
import { TinyArea } from '@ant-design/charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faDonate } from '@fortawesome/free-solid-svg-icons';
import { recentTrends } from '../constant';
import DemoModal from './DemoModal';
import GenericCard from '../../../components/GenericCard/GenericCard';
import { fontSet, theme } from '../../../theme';
import { TABLECOL } from './TableDetails';
import { exportJSON } from '../../../utils/utils';
import {
	getLargeWithdrawalApi,
	getRecentContributionApi,
	getRecentTrendsApi
} from '../../../api/customerOverviewApi';

const RecentTrendsCard = ({ authorizeCode, authData }) => {
	const [recentContribution, setRecentContribution] = useState([]);
	const [amuData, setAmuData] = useState([]);
	const [recentTrendsdata, setRecentTrendsdata] = useState([]);
	const [largeWithdrawal, setLargeWithdrawal] = useState([]);
	const [revenueData, setRevenueData] = useState([]);
	const numberFormatter = new Intl.NumberFormat('en-us', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	const numberFormatter2 = new Intl.NumberFormat('en-us', {
		maximumFractionDigits: 0
	});
	useEffect(() => {
		getRecentTrendsApi().then((res) => {
			setRecentTrendsdata(res.data);
		});
		getLargeWithdrawalApi().then((res) => {
			setLargeWithdrawal(res.data);
		});
		getRecentContributionApi().then((res) => {
			setRecentContribution(res.data);
		});
	}, []);

	useEffect(() => {
		let aumGraphData = [];
		let revenueGraphData = [];
		if (Object.keys(recentTrendsdata).length > 0) {
			if (recentTrendsdata?.aumGraph) {
				recentTrendsdata?.aumGraph.map((ele) => aumGraphData.push(ele.amount));
			}
			if (recentTrendsdata?.revenueGraph) {
				recentTrendsdata?.revenueGraph.map((ele) => revenueGraphData.push(ele.amount));
			}
		}
		setAmuData(aumGraphData);
		setRevenueData(revenueGraphData);
	}, [recentTrendsdata]);

	const styleSet = {
		borderColor: {
			border: '1px solid #2B5680',
			background: 'linear-gradient(180deg, #EAECF8 38.3%, rgba(255, 255, 255, 0) 100%)'
		},
		subBody: {
			theme: theme.subBody,
			color: '#898EA9',
			fontSize: '14px'
		},
		headingFirst: {
			fontfamily: theme.profileName.fontFamily,
			color: '#2B5680',
			fontSize: '14px',
			fontWeight: ' bold'
		},
		headingSecond: {
			fontfamily: theme.profileName.fontFamily,
			color: '#5564C1',
			fontSize: '12px',
			fontWeight: ' bold'
		},
		earn: {
			fontfamily: theme.profileName.fontFamily,
			fontSize: 'px',
			color: ' #898EA9'
		},
		number: {
			fontfamily: theme.profileName.fontFamily,
			fontSize: '14px',
			color: ' #32373F'
		},
		amountBlock: {
			fontSize: fontSet.heading.large
		},
		cardHeaderStyle: {
			fontSize: '18px',
			color: fontSet.heading.card
		}
	};

	const RenderTooltip = (data) => {
		let newAmt = data[0] && data[0].value;
		const NewData = () => {
			return new Intl.NumberFormat(authData == 'INDIAN' ? 'en-IN' : 'en-US', {
				minimumFractionDigits: 0
			}).format(newAmt);
		};
		const TooltipWrapper = styled.div`
			min-width: 80px;
			padding: 2px;
			allign-item: center;
		`;
		const TooltipAttribute = styled(Row)`
			margin: 6px 0;
		`;
		const ValueAttr = () => (
			<TooltipAttribute align='top' justify='space-between'>
				<Col>
					<strong>{NewData()}</strong>
				</Col>
			</TooltipAttribute>
		);
		return (
			<TooltipWrapper>
				<ValueAttr />
			</TooltipWrapper>
		);
	};

	var data = amuData.map((i) => Number(i));
	var config = {
		height: 60,
		width: 200,
		autoFit: false,
		data: data,
		smooth: true,
		areaStyle: {
			fill: `l(270) 0:#EAECF8 1:${styleSet.background}`,
			fillOpacity: 0.7,

			shadowBlur: 3,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			cursor: 'pointer'
		},
		line: {
			color: styleSet.border
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
				return data ? RenderTooltip(data) : null;
			}
		}
	};

	// var data1 = revenueData;
	// var config2 = {
	//   height: 60,
	//   width: 200,
	//   autoFit: false,
	//   data: data1,
	//   smooth: true,
	//   areaStyle: {
	//     fill: `l(270) 0:#EAECF8 1:${styleSet.background}`,
	//     fillOpacity: 0.7,

	//     shadowBlur: 3,
	//     shadowOffsetX: 1,
	//     shadowOffsetY: 1,
	//     cursor: "pointer",
	//   },
	//   line: {
	//     color: styleSet.border,
	//   },
	// };

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [largeWithdrawalModal, setLargeWithdrawalModal] = useState(false);

	const showModal = (funName) => funName(true);
	const handleCancel = (funName) => funName(false);

	const downloadReport = (data = []) => {
		if (!data) return alert('No data');

		// if (!data.length) return alert("No data");
		const downloadData = data.map((ele, index) => ({
			'Sr.No': index + 1,
			Customer: ele?.clientCard?.clientName,
			'Family Name': ele?.clientCard?.familyName,
			AUM: ele.aum
		}));
		exportJSON(downloadData, 'RecentContribution');
	};
	return (
		<>
			<div>
				<GenericCard headStyle={styleSet.cardHeaderStyle} header={recentTrends}>
					<Row gutter={16}>
						<Col span={12}>
							<span style={styleSet.headingFirst}>
								{recentTrendsdata.currencySymbol}{' '}
								{numberFormatter.format(recentTrendsdata.aumTotal)}
							</span>
							<br />
							<span style={styleSet.subBody}>{'Asset Under Management'}</span>
						</Col>
						<Col span={12}>{''}</Col>
						{/* <Col span={8}>
              <span style={styleSet.headingSecond}>
                {recentTrendsdata.currencySymbol}
                &nbsp; <RupeeOrNonRupee amount={recentTrendsdata.revenueTotal} />
              </span>
              <br />
              <span style={styleSet.subBody}>{"Revenue"}</span>
            </Col> */}
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<TinyArea {...config} />
						</Col>
						<Col span={12}>
							<Row style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Col>
									<Avatar size={30} style={{ backgroundColor: '#E4FDFF', marginRight: '15px' }}>
										<FontAwesomeIcon
											icon={faDonate}
											//   size="2x"
											color='#56B8BE'
											fontSize='24px'
										/>
									</Avatar>
								</Col>
								<Col>
									<Row>
										<span style={styleSet.number}>
											{recentContribution.totalCount} /
											<a onClick={() => showModal(setIsModalVisible)}>
												{numberFormatter.format(recentContribution.totalAmount)}
											</a>
										</span>
									</Row>
									<Row>
										<span style={styleSet.subBody}>{'Recent Contribution'}</span>
									</Row>
								</Col>
							</Row>
							<Row style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Col>
									<Avatar size={30} style={{ backgroundColor: '#FFDBDB', marginRight: '15px' }}>
										<FontAwesomeIcon
											icon={faSignOutAlt}
											//   size="2x"
											color='#BE5C56'
											fontSize='24px'
										/>
									</Avatar>
								</Col>
								<Col>
									<Row>
										<span style={styleSet.number}>
											{largeWithdrawal.totalCount}/
											<a onClick={() => showModal(setLargeWithdrawalModal)}>
												{numberFormatter.format(largeWithdrawal.totalAmount)}
											</a>
										</span>
									</Row>
									<Row>
										{/* <span style={styleSet.subBody}>{"Large Withdrawal"}</span> */}
										<span style={styleSet.subBody}>{'Recent Withdrawal'}</span>
									</Row>
								</Col>
							</Row>
						</Col>
						{/* <Col span={8}>
              <TinyArea {...config2} />
            </Col> */}
					</Row>
					<Row gutter={16}>
						<Col span={16}>
							<span style={styleSet.earn}>
								You Manage{' '}
								<Typography.Text
									ellipsis={{ tooltip: [recentTrendsdata.aumSubheading] }}
									style={{ minWidth: '90px' }}
								>
									{recentTrendsdata.currencySymbol}{' '}
									{numberFormatter2.format(recentTrendsdata.aumSubheading)}
								</Typography.Text>
								&nbsp; average per client
							</span>
						</Col>
						<Col span={8}>{}</Col>
						{/* <Col span={8}>
              <span style={styleSet.earn}>
                You earn{" "}
                <Typography.Text
                  ellipsis={{ tooltip: [recentTrendsdata.aumSubheading] }}
                  style={{ width: "90px" }}
                >
                  {recentTrendsdata.currencySymbol}{" "}
                  {recentTrendsdata.revenueSubheading}
                </Typography.Text>
                average per customer
              </span>
            </Col> */}
					</Row>
				</GenericCard>

				<Modal
					footer={null}
					title='Recent Contribution'
					visible={isModalVisible}
					width={1600}
					onCancel={() => handleCancel(setIsModalVisible)}
				>
					<DemoModal
						columns={TABLECOL}
						tableRows={recentContribution.breakUp}
						downloadFunction={() => downloadReport(recentContribution.breakUp)}
						authorizeCode={authorizeCode}
					/>
				</Modal>
				<Modal
					footer={null}
					title='Recent Withdrawal'
					visible={largeWithdrawalModal}
					width={1600}
					onCancel={() => handleCancel(setLargeWithdrawalModal)}
				>
					<DemoModal
						columns={TABLECOL}
						tableRows={largeWithdrawal.breakUp}
						downloadFunction={() => downloadReport(largeWithdrawal.breakUp)}
						authorizeCode={authorizeCode}
					/>
				</Modal>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2
	};
};

export default connect(mapStateToProps)(RecentTrendsCard);

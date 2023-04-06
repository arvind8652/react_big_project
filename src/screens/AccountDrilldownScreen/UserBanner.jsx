import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Avatar, Badge, Menu, Dropdown, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './AccountDrillDown.scss';
import { TinyArea } from '@ant-design/charts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../components/PortfolioOverview/App.scss';
import { faWallet, faSackDollar } from '@fortawesome/pro-regular-svg-icons';
import { palette } from '../../theme';
import {
	executeGetAccountDetail,
	executeGetCapitalInvestedGraphData,
	executeGetInvestmentValueGraphData,
	executeGetTopHoldings,
	executeGetRiskProfileData,
	setAccountDrilldownList,
	setAccountDetail,
	setTopHoldings,
	setCapitalInvestedGraphData,
	setInvestmentValueGraphData,
	setRiskProfileData
} from '../../redux/actions/accountDrilldownActions';
import { connect } from 'react-redux';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
import moment from 'moment';
import { CLEAR_LEAD_EDIT_DETAIL } from '../../redux/actions/actionTypes';

const accountDetail = {
	accountName: 'Andrew',
	accountNature: 'Advisory',
	accountType: 'Debt',
	benchMark: '12MKLIBOR',
	benchmarkReturn: 0,
	customerName: 'Andrew Chua',
	goalCapture: 'SPFG,RNYD'
};
const UserBanner = (props) => {
	const {
		bannerData,
		executeGetAccountDetail,
		setAccountDrilldownList,
		setCapitalInvestedGraphData,
		setRiskProfileData,
		setAccountDetail,
		setTopHoldings,
		setInvestmentValueGraphData,
		capitalInvestedGraphData,
		executeGetCapitalInvestedGraphData,
		investmentValueGraphData,
		executeGetInvestmentValueGraphData,
		executeGetTopHoldings,
		riskProfileData,
		executeGetRiskProfileData,
		customer,
		allAccountList,
		getCurrentDate2,
		onSelectCustomerName,
		handleApiCall,
		clearData,
		authData
	} = props;
	//let abc = allAccountList?.lstAccountList[0].accountName
	// const [dropdownValue, setDropDownValue] = useState[''];
	const [abc, setAbc] = useState(null);

	useEffect(() => {
		onSelectCustomerName(bannerData?.customerName);
	}, [bannerData]);

	useEffect(() => {
		setAbc(allAccountList?.lstAccountList[0]?.accountName);
		let clinetId = allAccountList?.lstAccountList[0]?.clientId;
		let scheme = allAccountList?.lstAccountList[0]?.scheme;
		let bdate = moment(getCurrentDate2).format('YYYY-MM-DD');
		if (clinetId && scheme && bdate) {
			executeGetAccountDetail(clinetId, scheme, bdate);
			executeGetCapitalInvestedGraphData(clinetId, scheme, bdate);
			executeGetInvestmentValueGraphData(clinetId, scheme, bdate);
			executeGetTopHoldings(clinetId, scheme, bdate);
			handleApiCall(clinetId, scheme, bdate);
			// executeGetRiskProfileData(clinetId, scheme, bdate)
		}
		return () => {
			//   executeGetAccountDetail();
			//   executeGetCapitalInvestedGraphData();
			//   executeGetInvestmentValueGraphData();
			//   executeGetTopHoldings();
			//   // handleApiCall();
			//   clearData()
			//   executeGetRiskProfileData()
		};
	}, [allAccountList]);
	useEffect(() => {
		return () => {
			setAccountDrilldownList(null);
			setAccountDetail(null);
			setTopHoldings(null);
			setCapitalInvestedGraphData(null);
			setRiskProfileData(null);
			setInvestmentValueGraphData(null);
			clearData();
		};
	}, []);
	const onselect = (e, alldata) => {
		let clinetId = alldata?.alldata?.clientId;
		let scheme = alldata?.alldata?.scheme;
		let bdate = moment(getCurrentDate2).format('YYYY-MM-DD');
		executeGetAccountDetail(clinetId, scheme, bdate);
		executeGetCapitalInvestedGraphData(clinetId, scheme, bdate);
		executeGetInvestmentValueGraphData(clinetId, scheme, bdate);
		executeGetTopHoldings(clinetId, scheme, bdate);
		handleApiCall(clinetId, scheme, bdate);
		// executeGetRiskProfileData(clinetId, scheme, bdate)
		setAbc(e);
	};

	var data1 = [564, 417, 310, 405, 497, 405, 375, 563, 430];

	var data2 = [564, 417, 310, 405, 497, 405, 375, 563, 430];

	var config1 = {
		height: 60,
		width: 200,
		autoFit: false,
		data: capitalInvestedGraphData
			? capitalInvestedGraphData?.capitalInvestedGraphData?.map((e) => e.value)
			: [],
		smooth: true,
		// areaStyle: { fill: '#d6e3fd' },
		areaStyle: {
			fill: `l(270) 0:#ffffff 1:${palette.text.banner}`,
			fillOpacity: 0.1,

			shadowBlur: 3,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			cursor: 'pointer'
		},
		tooltip: {
			capitalInvestedGraphData,
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
				let rrr = capitalInvestedGraphData?.capitalInvestedGraphData;
				let newAmt = data[0] && data[0].value;
				const NewData = () => {
					return new Intl.NumberFormat(authData == 'INDIAN' ? 'en-IN' : 'en-US', {
						minimumFractionDigits: 0
					}).format(newAmt);
				};
				let newTitle = title && title;
				let month = rrr?.[newTitle]?.date;
				let newMonth = moment(month).format('YYYY-DD-MM');
				return data ? (
					<>
						<div>
							Value : <strong>{NewData()}</strong>
						</div>{' '}
						<div>
							Date:<strong>{newMonth}</strong>{' '}
						</div>
					</>
				) : (
					''
				);
			}
		},
		line: {
			color: palette.text.banner
		}
	};

	var config2 = {
		height: 60,
		width: 200,
		autoFit: false,
		data: investmentValueGraphData
			? investmentValueGraphData?.investmentValueGraphData?.map((e) => e.value)
			: [],
		smooth: true,
		// areaStyle: { fill: '#d6e3fd' },
		areaStyle: {
			fill: `l(270) 0:#ffffff 1:${palette.text.banner}`,
			fillOpacity: 0.1,

			shadowBlur: 3,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			cursor: 'pointer'
		},
		tooltip: {
			investmentValueGraphData,
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
				let rrr = investmentValueGraphData?.investmentValueGraphData;
				let newAmt = data[0] && data[0].value;
				const NewData = () => {
					return new Intl.NumberFormat(authData == 'INDIAN' ? 'en-IN' : 'en-US', {
						minimumFractionDigits: 0
					}).format(newAmt);
				};
				let newTitle = title && title;
				let month = rrr?.[newTitle]?.date;
				let newMonth = moment(month).format('YYYY-DD-MM');
				return data ? (
					<>
						<div>
							Value : <strong>{NewData()}</strong>
						</div>{' '}
						<div>
							Date: <strong>{newMonth}</strong>{' '}
						</div>
					</>
				) : (
					''
				);
			}
		},
		line: {
			color: palette.text.banner
		}
	};

	return (
		<>
			<Card
				className='card'
				style={{
					//backgroundImage: "linear-gradient(to right, #354081 , #727EC6 )",
					borderBottomRightRadius: '12px',
					borderBottomLeftRadius: '12px'
				}}
			>
				<Row className='flex'>
					{/* <Col style={{ marginTop: "20px" }}>
            {bannerData?.profileImage != null ? (
              <Avatar
                style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
                size={160}
                src={bannerData?.profileImage}
              ></Avatar>
            ) : (
                <Avatar
                  style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
                  size={160}
                >
                  {" "}
                  {bannerData?.profileInitials}
                </Avatar>
              )}
          </Col> */}

					<Col span={6}>
						<Row style={{ marginTop: '10px' }}>
							{/* <span className="name">  {allAccountList && allAccountList?.lstAccountList[1]?.accountName}</span>
              <br /> */}
							<Select
								size='large'
								className='select2'
								showArrow={true}
								value={abc}
								onSelect={(e, alldata) => {
									onselect(e, alldata);
								}}
							>
								{allAccountList &&
									allAccountList?.lstAccountList.map((option, index) => (
										<Select.Option key={index} value={index} alldata={option}>
											{option.accountName}
										</Select.Option>
									))}
							</Select>
						</Row>
						<Row>
							<span className='family-name'>Account Nature</span>
							<br />
						</Row>

						<Row style={{ marginTop: '10px' }}>
							<Badge className='badge-portfolio'>{bannerData?.accountNature}</Badge>
						</Row>

						<Row></Row>
					</Col>

					<Col span={3} style={{ marginTop: '10px' }}>
						{/* <Row>
              <span className="name">
                {bannerData?.portfolioReturn}% &nbsp;{" "}
                <span style={{ color: "green" }} className="family-name">
                  {" "}
                  <strong>+ 0.25%</strong>
                </span>
              </span>
            </Row>
            <Row>
              <span className="family-name">Portfolio Return</span>
            </Row> */}
					</Col>
					<Col span={4}>{''}</Col>
					<Col span={3} style={{ marginTop: '20px' }}>
						<span className='heading'>
							{investmentValueGraphData?.currencySymbol}{' '}
							<RupeeOrNonRupee amount={investmentValueGraphData?.investmentValue || 0} />
						</span>
						<br />
						<span className='family-name'>{'Investment Value'}</span>
					</Col>
					<Col span={4} style={{ marginTop: '10px' }}>
						<Row>
							<TinyArea {...config2} />
						</Row>
					</Col>
					{/* <Col span={4}>
            <Row>
              <Col style={{ marginTop: "30px" }}>
                <FontAwesomeIcon className="icon" icon={faWallet} />
              </Col>
              <Col style={{ marginTop: "20px" }}>
                <Row>
                  <span className="family-name">{"$ 0"}</span>
                </Row>
                <Row>
                  <span className="family-name">{"Investible Cash"}</span>
                </Row>
              </Col>
            </Row>
          </Col> */}
				</Row>

				<Row className='flex'>
					<Col span={3}>
						<Col style={{ marginTop: '20px' }}>
							<Row>
								<span className='family-name'>
									<strong>{riskProfileData?.nonRecommendedCategoryName}</strong>
								</span>
							</Row>
							<span className='family-name'>Risk Profile</span>
						</Col>
					</Col>
					<Col span={3}>
						{/* <Col style={{ marginTop: "20px" }}>
              <Row>
                <span className="family-name">
                  <strong>{bannerData?.benchmarkReturn}%</strong>
                </span>
              </Row>
              <span className="family-name">Benchmark</span>
            </Col> */}
					</Col>
					<Col span={2}>
						{/* <Col style={{ marginTop: "20px" }}>
              <Row>
                <span className="family-name">
                  <strong>
                    {" "}
                    {bannerData?.portfolioReturn -
                      bannerData?.benchmarkReturn}{" "}
                    %{" "}
                  </strong>
                </span>
              </Row>
              <span className="family-name" style={{ marginTop: "10px" }}>
                Outperformer
              </span>
            </Col> */}
					</Col>
					<Col span={4}>
						<Row>
							<Col>
								{bannerData?.profileImage != null ? (
									<Avatar
										style={{ color: '#f56a00', backgroundColor: '#E5EBFF' }}
										size={50}
										src={bannerData?.profileImage}
									></Avatar>
								) : (
									<Avatar style={{ color: '#f56a00', backgroundColor: '#E5EBFF' }} size={50}>
										{' '}
										{bannerData?.profileInitials}
									</Avatar>
								)}
							</Col>
							<Col style={{ marginLeft: '10px' }}>
								<Row>
									<span className='heading'>{bannerData?.rmName}</span>
								</Row>
								<Row>
									<span className='heading'>{'Relationship Manager'}</span>
								</Row>
							</Col>
						</Row>
					</Col>
					<Col span={3}>
						<span className='heading'>
							{capitalInvestedGraphData?.currencySymbol}{' '}
							<RupeeOrNonRupee amount={capitalInvestedGraphData?.capitalInvested || 0} />
						</span>
						<br />
						<span className='family-name'>{'Capital Invested'}</span>
					</Col>
					<Col span={4}>
						<Row>
							<TinyArea {...config1} />
						</Row>
					</Col>
					{/* <Col span={4}>
            <Row>
              <Col style={{ marginTop: "15px" }}>
                <FontAwesomeIcon className="icon" icon={faSackDollar} />
                need to change faWallet icon instead of faWallet you should have to add sack-bag-money icon 
              </Col>
              <Col>
                <Row>
                  <span className="family-name">{"$ 0"}</span>
                </Row>
                <Row>
                  <span className="family-name">{"Credit Limit"}</span>
                </Row>
              </Col>
            </Row>
          </Col> */}
				</Row>
			</Card>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		bannerData: state.accountDrilldown?.accountDetail?.accountDrilldownDetail?.mainScreenData,
		capitalInvestedGraphData: state.accountDrilldown?.capitalInvestedGraphData,
		investmentValueGraphData: state.accountDrilldown?.investmentValueGraphData,
		riskProfileData: state.accountDrilldown?.riskProfileData?.riskProfileModel,
		customer: state.common.customerInfo.customerCode,
		allAccountList: state.accountDrilldown?.accountList,
		getCurrentDate: state.auth.user.curDate,
		getCurrentDate2: state.auth.user.prevDate,
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2
	};
};

const mapDispatchToProps = {
	executeGetAccountDetail,
	setAccountDrilldownList,
	setCapitalInvestedGraphData,
	setRiskProfileData,
	setAccountDetail,
	setTopHoldings,
	setInvestmentValueGraphData,
	executeGetCapitalInvestedGraphData,
	executeGetInvestmentValueGraphData,
	executeGetTopHoldings,
	executeGetRiskProfileData
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBanner);

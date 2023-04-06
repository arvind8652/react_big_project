import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Badge } from 'antd';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { TinyArea } from '@ant-design/charts';
import { UserOutlined } from '@ant-design/icons';
import { faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import '../../components/PortfolioOverview/App.scss';
import { faWallet, faSackDollar } from '@fortawesome/pro-regular-svg-icons';
import { palette } from '../../theme';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

import { apiRequestUrls } from '../../config/apiConfig';
import {
	executeGetAssettypeWise,
	executeGetSecurityDetail
} from '../../redux/actions/portfolioHoldingsAction';
import { connect } from 'react-redux';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
import { executeSetChildMenuFlag } from '../../redux/actions/dashboardActions';
import { executeSelectedCustomerInfo } from '../../redux/actions/commonActions';

const UserBanner = ({ customerInfo, authData }) => {
	const history = useHistory();
	// const [prevDate, setPrevDate] = useState(sessionStorage.getItem("prevDate"));
	// const [userID, setUserID] = useState(sessionStorage.getItem("userID"));
	// const location = useLocation();
	// const defaultBody = {
	//   userID: userID,
	//   businessDate: moment(prevDate).format("YYYY-MM-DD"),
	//   CustomerID: customerInfo?.customerCode,
	// };

	// const [body, setBody] = useState(defaultBody);
	// useEffect(() => {
	//   executeGetAssettypeWise(body);
	//   executeGetSecurityDetail(defaultBody);
	// }, []);

	// const getUpdatedBody = () => {
	//   setBody({ ...body });
	//   return { ...body };
	// };

	// useEffect(() => {
	//   executeGetSecurityDetail(getUpdatedBody());
	// }, []);

	// const bannerData = {
	//   name: "Alexandra Romus",
	//   family: "Asan102104 | Sandralock Family",
	//   badge: "wealth",
	//   imgUrl: "",
	//   call: "+63 98468265802",
	//   location: "Address",

	// };

	const handleHomeClick = () => {
		// setChildMenuFlag(false)
		executeSetChildMenuFlag(false);
		const customerInfo = {
			customerCode: false
		};
		executeSelectedCustomerInfo(customerInfo);
		history.push('/dashboard/MyCustomers');
	};

	var capitalInvestedConfig = {
		height: 60,
		width: 200,
		autoFit: false,
		data: customerInfo?.capitalInvestedGraph?.capitalInvestedGraphData?.map((e) => e.value),
		smooth: true,
		// areaStyle: { fill: "#d6e3fd" },
		areaStyle: {
			fill: `l(270) 0:#ffffff 1:${palette.text.banner}`,
			fillOpacity: 0.1,

			shadowBlur: 3,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			cursor: 'pointer'
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
				let rrr = customerInfo?.capitalInvestedGraph?.capitalInvestedGraphData;
				let newAmt = data[0] && data[0].value;
				const NewData = () => {
					return new Intl.NumberFormat(authData == 'INDIAN' ? 'en-IN' : 'en-US', {
						minimumFractionDigits: 0
					}).format(newAmt);
				};
				let newTitle = title && title;
				let month = rrr[newTitle]?.date;
				let newMonth = moment(month).format('YYYY-DD-MM');
				return data ? (
					<>
						<div>
							Value : <strong>{NewData()}</strong>
						</div>{' '}
						<div>
							Date: <strong>{newMonth} </strong>
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

	var investmentValueConfig = {
		height: 60,
		width: 200,
		autoFit: false,
		data: customerInfo?.investmentValueGraph?.investmentValueGraphData?.map((e) => e.value),
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
				let rrr = customerInfo?.investmentValueGraph?.investmentValueGraphData;
				let newAmt = data[0] && data[0].value;
				const NewData = () => {
					return new Intl.NumberFormat(authData == 'INDIAN' ? 'en-IN' : 'en-US', {
						minimumFractionDigits: 0
					}).format(newAmt);
				};
				let newTitle = title && title;
				let month = rrr[newTitle]?.date;
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
					borderRadius: '12px'
				}}
			>
				<Row className='flex'>
					{/* <Col style={{ marginTop: "20px" }}> */}
					<FontAwesomeIcon
						icon={faArrowLeft}
						className='portfolioViewTopBarIcons'
						size='30x'
						// onClick={() => history.push('/dashboard/MyCustomers')}
						onClick={handleHomeClick}
					/>
					<Col align={'middle'}>
						{customerInfo?.profileImage != null ? (
							<Avatar
								// style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
								// size={120}
								style={{
									width: '10vw',
									height: '10vw',
									lineHeight: '10vw'
									// fontSize: '5.5vw'
								}}
								src={`data:image/jpeg;base64, ${customerInfo?.profileImage}`}
							></Avatar>
						) : (
							<Avatar
								// style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
								style={{
									width: '8vw',
									height: '8vw',
									lineHeight: '8vw',
									// fontSize: '4vw'
									fontSize: '30px',
									color: 'rgb(207, 73, 73)'
								}}
								// size={120}
							>
								{customerInfo?.profileInitial}
							</Avatar>
						)}
					</Col>
					<Col span={5}>
						<Row>
							<Col span={24}>
								<span className='name'>{customerInfo?.customerName ?? 'Customer Name'}</span>
								<br />
								<span className='family-name'>
									{customerInfo?.otherIdNo ?? ''} | {customerInfo?.familyName ?? 'Family Name'}
								</span>
							</Col>
						</Row>

						<Row style={{ marginTop: '10px' }}>
							<Badge className='badge-portfolio'>
								{customerInfo?.customerCategory ?? 'Customer Category'}
							</Badge>
						</Row>
						<Row>
							<Col>
								<span className='location'>
									<FontAwesomeIcon icon={faPhoneAlt} />
									<span style={{ marginLeft: '10px' }}>
										{customerInfo?.mobileNo ?? '+1234567890'}
									</span>
								</span>
							</Col>
						</Row>
						<Row>
							<Col>
								{/* <Col style={{ marginTop: "10px" }}> */}
								<span className='location'>
									<FontAwesomeIcon icon={faMapMarkerAlt} />
									<span style={{ marginLeft: '10px' }}>{customerInfo?.address ?? 'Address'}</span>
								</span>
							</Col>
						</Row>
					</Col>

					<Col span={2}>{''}</Col>
					<Col style={{ marginLeft: '12%' }}>
						{/* <Col style={{ marginTop: "20px" }}> */}
						<span className='heading'>
							{customerInfo?.currencySymbol}{' '}
							<RupeeOrNonRupee amount={customerInfo?.investmentValueGraph?.investmentValue} />
						</span>
						<br />
						{/* $<RupeeOrNonRupee amount={ customerInfo?.investmentValueGraph?.investmentValue}/> */}
						<span className='family-name'>{'Investment Value'}</span>
					</Col>
					{/* <Col  style={{ marginTop: "10px" }}> */}
					<Col>
						<Row>
							<TinyArea {...investmentValueConfig} />
						</Row>
					</Col>
					<Col>
						{/* <Row>
              <Col>
                <FontAwesomeIcon className="icon" icon={faWallet} />
              </Col>
              <Col>
                <Row>
                  <span className="heading">{"$ 000000"}</span>
                </Row>
                <Row>
                  <span className="sub-heading">{"Investible Cash"}</span>
                </Row>
              </Col>
            </Row> */}
					</Col>
				</Row>

				<Row className='flex'>
					<Col></Col>
					<Col span={3} style={{ marginLeft: '18%' }}></Col>
					<Col style={{ marginRight: '12px' }}>
						<Row>
							<Col>
								{customerInfo?.profileImageRM != null ? (
									<Avatar
										style={{ color: '#f56a00', backgroundColor: '#E5EBFF' }}
										size={50}
										src={apiRequestUrls.imagesUrl + customerInfo?.profileImageRM}
									></Avatar>
								) : (
									<Avatar
										// style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
										size={50}
									>
										{customerInfo?.profileInitialRM}
									</Avatar>
								)}
							</Col>
							<Col style={{ marginLeft: '10px' }}>
								<Row>
									<span className='heading'>{customerInfo?.relationshipManagerName}</span>
								</Row>
								<Row>
									<span className='family-name'>{'Relationship Manager'}</span>
								</Row>
							</Col>
						</Row>
					</Col>
					<Col style={{ marginLeft: '24px' }}>
						<span className='heading'>
							{customerInfo?.currencySymbol}{' '}
							<RupeeOrNonRupee amount={customerInfo?.capitalInvestedGraph?.capitalInvested} />
						</span>
						<br />
						{/* <RupeeOrNonRupee amount={ customerInfo?.capitalInvestedGraph?.capitalInvested}/> */}
						<span className='family-name'>{'Capital Invested'}</span>
					</Col>
					<Col>
						<Row>
							<TinyArea {...capitalInvestedConfig} />
						</Row>
					</Col>
					<Col>
						{/* <Row>
              <Col>
                <FontAwesomeIcon className="icon" icon={faSackDollar} />
              </Col>
              <Col>
                <Row>
                  <span className="heading">{"$ 00000"}</span>
                </Row>
                <Row>
                  <span className="sub-heading">{"Credit Limit"}</span>
                </Row>
              </Col>
            </Row> */}
					</Col>
				</Row>
			</Card>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		// customerInfo: state.common.customerInfo,
		customer: state.common.customerInfo.customerCode,
		customerInfo: state.portfolioOverview.customerInfo,
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2
	};
};
export default connect(mapStateToProps)(UserBanner);

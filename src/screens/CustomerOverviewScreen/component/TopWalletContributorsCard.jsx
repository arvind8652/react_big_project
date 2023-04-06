import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Divider, Typography, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { topWalletContributors } from '../constant';
import { AvatarSize } from '../../../constants/AvatarSize';
import AvatarLogo from '../../../components/Avatar/AvatarLogo';
import GenericCard from '../../../components/GenericCard/GenericCard';
import { fontSet, theme } from '../../../theme';
import DemoModal from './DemoModal';
import { ScRate } from '../../../components/StyledComponents/genericElements';
import { TABLECOL, TABLECOL_TOPV } from './TableDetails';
import { exportJSON } from '../../../utils/utils';
import { addFavouriteCustomerApi } from '../../../api/customerListingApi';
import { getTopWalletApi } from '../../../api/customerOverviewApi';
import favouritesReducer from '../../../redux/reducers/favouritesReducer';
import { connect } from 'react-redux';
import { authorizeModule } from '../../../utils/utils';
import { CONSTANTS } from '../../../constants/constants';

const TopWalletContributorsCard = ({ authorizeCode, allCustomerData }) => {
	const [topWallet, setTopWallet] = useState([]);
	const feedsStyle = {
		button: {
			borderRadius: '8px',
			//fontSize: "22px",
			width: 'max-content',
			float: 'right',
			color: '#47518B'
		}
	};
	const styleSet = {
		amountBlock: {
			fontSize: fontSet.heading.large
		},
		secondaryHeader: {
			fontSet: fontSet.secondaryHeader,
			color: '#696A91',
			marginLeft: '30px'
		},
		subBody: {
			theme: theme.subBody,
			color: '#696A91'
		},
		rowStyle: {
			margin: '36px 0px'
		},
		avatarBody: {
			lineHeight: '12px',
			margin: '30px 10px'
		},
		rowAlign: {
			margin: '9px 0px'
		},
		cardHeaderStyle: {
			fontSize: '18px',
			color: fontSet.heading.card
		}
	};
	useEffect(() => {
		getTopWalletApi().then((res) => {
			setTopWallet(res.data);
		});
	}, []);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const showModal = () => {
		// authorizeModule(authorizeCode, CONSTANTS.authorizeCode.view) && setIsModalVisible(true);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const customerId =
		Object.keys(topWallet).length &&
		topWallet?.topWallet?.reduce(function (result, item) {
			var key = Object.keys(item)[0];
			result[key] = item[key];
			return result;
		}, {});
	// const customerId = {...topWallet.topWallet};
	const onFavChange = (e) => {
		addFavouriteCustomerApi(customerId.customerId, CONSTANTS.progNames.CLIENTOVERVIEW)
			// .then((res) => {console.log("res",res); })
			.then((res) => {
				getTopWalletApi();
			})
			.catch((err) => {
				console.log('EEROR: ', err);
			});
		
	};
	const downloadReport = (data = []) => {
		if (!data) return alert('No data');

		// if (!data.length) return alert("No data");
		const downloadData = data.map((ele, index) => ({
			'Sr.No': index + 1,
			Customer: ele?.customerName,
			'Family Name': ele?.familyName,
			AUM: new Intl.NumberFormat().format(ele?.aumTotal)
			// Revunue: ele.revenueTotal,
		}));
		exportJSON(downloadData, 'Topwallet');
	};
	return (
		<>
			<div>
				<GenericCard headStyle={styleSet.cardHeaderStyle} header={topWalletContributors}>
					{Object.keys(topWallet).length ? (
						topWallet?.topWallet?.slice(0, 3).map((item) => (
							<Row key={item.aumRank}>
								<Col span={6}>
									<AvatarLogo
										imgsrc={item.profileImage}
										profileName={item.profileInitial}
										avatarSize={AvatarSize.extrasmall}
									/>
								</Col>
								<Col span={18}>
									<Typography.Text
										ellipsis={{ tooltip: [item.customerName] }}
										style={{ width: '110px' }}
									>
										{item.customerName}
									</Typography.Text>
									<ScRate
										style={{ float: 'right' }}
										allowHalf={false}
										count={1}
										value={item.isFavourite}
										onChange={onFavChange}
									/>
									<br />
									<span style={styleSet.subBody}>
										{item.customerId} | {item.familyName}
									</span>

									<Row style={{ marginTop: '15px' }}>
										<Col>
											<Row>
												<Col span={10}>
													<Avatar
														size={30}
														style={{
															backgroundColor: ' #F0F2FB',
															color: '#696A91',
															marginRight: '5px'
														}}
													>
														#{item.aumRank}
													</Avatar>
												</Col>
												<Col span={14}>
													<Typography.Text
														ellipsis={{
															tooltip: [item.currencySymbol, item.aumTotal]
														}}
														style={{ width: '150px' }}
													>
														{item.currencySymbol}
														&nbsp; {new Intl.NumberFormat().format(item.aumTotal)}
													</Typography.Text>
													<br />
													<span style={styleSet.secondaryHeader}>{'AUM'}</span>
												</Col>
											</Row>
										</Col>
										{/* maybe used in the future */}
										{/* <Col span={12}>
                      <Row>
                        <Col>
                          <Avatar
                            size={30}
                            style={{
                              backgroundColor: " #F0F2FB",
                              color: "#696A91",
                              marginRight: "2px",
                            }}
                          >
                            #{item.revenueRank}
                          </Avatar>
                        </Col>
                        <Col>
                          <Typography.Text
                            ellipsis={{
                              tooltip: [item.currencySymbol, item.revenueTotal],
                            }}
                            style={{ width: "50px" }}
                          >
                            {item.currencySymbol}
                            {item.revenueTotal}
                          </Typography.Text>

                          <br />
                          <span style={styleSet.secondaryHeader}>
                            {"Revenue"}
                          </span>
                        </Col>
                      </Row>
                    </Col> */}
									</Row>
								</Col>

								<Divider style={{ marginTop: 5, marginBottom: 5 }} />
							</Row>
						))
					) : (
						<Row>No Data</Row>
					)}

					<Row>
						<Col span={24}>
							<Button size={'medium'} style={feedsStyle.button} onClick={showModal}>
								View All
							</Button>
						</Col>
					</Row>
				</GenericCard>
				<Modal
					footer={null}
					title='Top Wallet Contributors'
					visible={isModalVisible}
					width={1400}
					onCancel={handleCancel}
				>
					<DemoModal
						columns={TABLECOL_TOPV}
						tableRows={topWallet?.topWallet}
						downloadFunction={() => downloadReport(topWallet?.topWallet)}
						authorizeCode={authorizeCode}
					/>
				</Modal>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		allCustomerData:
			state.customerListing &&
			state.customerListing.allCustomers &&
			state.customerListing.allCustomers.lstCustomerResponseModel
	};
};

export default connect(mapStateToProps)(TopWalletContributorsCard);

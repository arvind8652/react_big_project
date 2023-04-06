import React, { useState, useEffect } from 'react';
import { investmentAccount } from '../../components/PortfolioOverview/PortfolioHoldingConstant';
import { Row, Col, Button, Card, Badge, Radio, Modal, Select } from 'antd';
import { RadialBar } from '@ant-design/charts';
import { DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'antd/dist/antd.css';
import GenericCard from '../../components/GenericCard/GenericCard';
import '../../components/PortfolioOverview/App.scss';
import AccountModal from './accountModal';
import ProfileAccountTableData from '../CommonCards/ProfileAccountTableData';
import AccountTableData from './AccountTableData';
import ColorWithLabel from '../LabelTypes/ColorWithLabel';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
import { executeGetInvestmentAccountData } from '../../redux/actions/portfolioOverviewActions';
import { connect } from 'react-redux';
import moment from 'moment';

const InvestmentAccount = ({
	investmentAccountData = {},
	customer,
	getCurrentDate,
	onSelectSchemes
}) => {
	const [accountMaster, setAccountMaster] = useState({});
	// const [taskModalShow, setTaskModalShow] = useState(false);
	// const [openTask, setOpenTask] = useState();
	const Style = {
		card: {
			borderRadius: '12px'
		},
		button: {
			borderRadius: '8px',
			//fontSize: "22px",
			// width: "max-content",
			float: 'right',
			color: '#47518B'
		}
	};

	const investmentValue =
		accountMaster && accountMaster.allData && accountMaster.allData.investmentValue;
	const capitalInvested =
		accountMaster && accountMaster.allData && accountMaster.allData.capitalInvested;

	var data = [
		{
			name: 'Investment',
			star: investmentValue
		},
		{
			name: 'Capital Invested',
			star: capitalInvested
		}
		// {
		//     name: 'c',
		//     color: "#2194ff",
		//     star: 1001,
		// },
	];

	var config = {
		data: data,
		xField: 'name',
		yField: 'star',
		maxAngle: 270,
		radius: 0.8,
		innerRadius: 0.2,
		startAngle: Math.PI * 0.5,
		endAngle: Math.PI * 2.5,
		tooltip: {
			formatter: function formatter(datum) {
				return {
					name: 'star',
					value: datum.star
				};
			}
		},
		colorField: 'star',
		color: function color(_ref) {
			var star = _ref.star;
			if (star > 900000000) {
				return '#36c361';
			} else if (star > 900000100) {
				return '#2194ff';
			}
			return '#56B8BE';
		}
	};
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const [abc, setAbc] = useState(investmentAccountData?.accountMaster?.[0]?.accountName);
	// const [accountMaster, setAccountMaster] = useState({})
	const [scheme, setScheme] = useState(null);

	useEffect(() => {
		setAbc(investmentAccountData?.accountMaster?.[0]?.accountName);

		let masterData = {};
		masterData.allData = investmentAccountData?.accountMaster?.[0];
		setAccountMaster(masterData);
		onSelectSchemes(investmentAccountData?.accountMaster?.[0]?.scheme);
		// let clinetId = investmentAccountData?.accountMaster?.[0]?.clientId
		// let scheme = investmentAccountData?.accountMaster?.[0]?.scheme
		// let bdate = moment(getCurrentDate).format('YYYY-DD-MM')
		// if (clinetId && scheme && bdate) {
		//     executeGetInvestmentAccountData(clinetId, scheme, bdate);
		// }
	}, [investmentAccountData, getCurrentDate]);
	const onselect = (e, allData) => {
		setAccountMaster(allData);
		let clinetId = allData?.allData?.clientId;
		let scheme = allData?.allData?.scheme;
		let bdate = moment(getCurrentDate).format('YYYY-DD-MM');
		// executeGetInvestmentAccountData(clinetId, scheme, bdate);
		setAbc(e);
		onSelectSchemes(allData?.allData?.scheme);
	};

	return (
		<>
			{/* style={Style.card} */}
			<GenericCard header={investmentAccount}>
				{/* ---------------------------------------- */}
				<Row gutter={16} style={{ textAlign: 'center', fontFamily: 'Open Sans' }}>
					<Col
						span={5}
						style={{
							backgroundColor: '#5d6dd1',
							borderRadius: '5px',
							padding: '5px',
							color: 'white'
						}}
					>
						<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
							{investmentAccountData?.totalAccounts ?? 0}
						</span>
						<br />
						<span style={{ fontSize: '1rem' }}>Accounts</span>
					</Col>
					<Col span={1}></Col>
					<Col
						span={6}
						style={{ backgroundColor: '#f0f2fb', borderRadius: '5px 0px 0px 5px', padding: '5px' }}
					>
						<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
							{investmentAccountData?.managedAccounts ?? 0}
						</span>
						<br />
						<span style={{ fontSize: '1rem' }}>Managed</span>
					</Col>
					<Col span={6} style={{ backgroundColor: '#f0f2fb', padding: '5px' }}>
						<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
							{investmentAccountData?.executionOnlyAccounts ?? 0}
						</span>
						<br />
						<span style={{ fontSize: '1rem' }}>Execution Only</span>
					</Col>
					<Col
						span={6}
						style={{ backgroundColor: '#f0f2fb', borderRadius: '0px 5px 5px 0px', padding: '5px' }}
					>
						<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
							{investmentAccountData?.advisoryPortfolioAccounts ?? 0}
						</span>
						<br />
						<span style={{ fontSize: '1rem' }}>Advisory Portfolio</span>
					</Col>
					{/* <Col span={6} style={{ backgroundColor: '#f0f2fb', borderRadius: '0px 5px 5px 0px' }}>
						<span style={{ fontSize: '1.2rem' }}>
							{investmentAccountData?.goalLinked ?? 0}
						</span>
						<br />
						<span style={{ fontSize: '1rem' }}>Linked Goals</span>
					</Col> */}
				</Row>
				{/* ---------------------------------------- */}
				{/* <Row gutter={16}>
					<Col span={5}>
						<Card className='card-first'>
							<Col>
								<span className='card-content'>{investmentAccountData?.totalAccounts ?? 0}</span>
								<br />
								<span className='card-content1'>Accounts</span>
							</Col>
						</Card>
					</Col>
					<Col span={19}>
						<Card className='card-second'>
							<Row className='row'>
								<Col span={6}>
									<span className='second-card-content'>
										{investmentAccountData?.managedAccounts ?? 0}
									</span>
									<br />
									<span className='second-card-content1'>{'Managed'}</span>
								</Col>
								<Col span={6}>
									<span className='second-card-content'>
										{investmentAccountData?.executionOnlyAccounts ?? 0}
									</span>
									<br />
									<span className='second-card-content1'>{'Execution Only'}</span>
								</Col>
								<Col span={6}>
									<span className='second-card-content'>
										{investmentAccountData?.advisoryPortfolioAccounts ?? 0}
									</span>
									<br />
									<span className='second-card-content1'>{'Advisory Portfolio'}</span>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row> */}
				<Row gutter={16}>
					<Col span={8}>
						<RadialBar {...config} />

						<Row>
							<span>
								<ColorWithLabel
									color={'#36c361'}
									label={'Investment Value'}
									// label={"Capital Value"}
									//key={index}
								/>
							</span>
							<span style={{ marginLeft: '15px' }}>
								<ColorWithLabel
									color={'#2194ff'}
									label={'Capital Value'}
									// label={"Investment Value"}
									//key={index}
								/>
							</span>
						</Row>
						{/* <Row>
                            <span style={{ marginLeft: "20%" }}>
                                <ColorWithLabel
                                    color={"#56B8BE"}
                                    label={"Advisory"}
                                //key={index}
                                />
                            </span>
                        </Row> */}
					</Col>
					<Col span={14} style={{ paddingTop: '60px' }}>
						<Col style={{ marginBottom: '50px' }}>
							<Row>
								{/* <h4 className="retirement-portfolio">{"Retirement Portfolio"} <DownOutlined /></h4>
								 */}
								<Select
									size='large'
									className='select'
									showArrow={true}
									value={abc}
									onSelect={(e, allData) => {
										onselect(e, allData);
									}}
								>
									{investmentAccountData &&
										investmentAccountData?.accountMaster?.map((option, index) => (
											<Select.Option key={index} value={option.accountName} allData={option}>
												{option.accountName}
											</Select.Option>
										))}
								</Select>
							</Row>
							{/* <Select
                size="large"
                className="select"
                showArrow={true}
                value={abc}
                onSelect={(e, allData) => { onselect(e, allData) }}
              >
                {investmentAccountData &&
                  investmentAccountData?.accountMaster?.map((option, index) => (
                    <Select.Option key={index} value={option.accountName} allData={option}>
                      {option.accountName}
                    </Select.Option>
                  ))}
              </Select> */}
							<Row>
								<span className='account-nature'>{'Account Nature'}</span>
							</Row>
							<Row>
								<Badge style={{ fontSize: '1rem' }}>
									{accountMaster?.allData?.accountNature ?? 'NA'}
								</Badge>
							</Row>
						</Col>
						<Row className='row'>
							<Col span={8} style={{ marginBottom: '50px' }}>
								{/* <span className="invested-value">{investmentAccountData?.accountMaster?.currencySymbol}{investmentAccountData?.accountMaster?.investmentValue ?? 0}</span><br /> */}
								{/* <span className="invested-value">{accountMaster?.allData?.currencySymbol}{accountMaster?.allData?.investmentValue ?? 0}</span><br /> */}
								<span className='invested-value'>
									{accountMaster?.allData?.currencySymbol}{' '}
									<RupeeOrNonRupee amount={accountMaster?.allData?.investmentValue || 0} />
								</span>
								<br />
								<span className='invested-value-content'>Investment Value</span>
							</Col>
							<Col span={8} style={{ marginBottom: '50px' }}>
								{/* <span className="invested-value">{investmentAccountData?.accountMaster?.currencySymbol}{investmentAccountData?.accountMaster?.capitalInvested ?? 0}</span><br /> */}
								{/* <span className="invested-value">{accountMaster?.allData?.currencySymbol}{accountMaster?.allData?.capitalInvested ?? 0 }</span><br /> */}
								<span className='invested-value'>
									{accountMaster?.allData?.currencySymbol}{' '}
									<RupeeOrNonRupee amount={accountMaster?.allData?.capitalInvested || 0} />{' '}
								</span>
								<br />
								<span className='invested-value-content'>{'Capital Invested'}</span>
							</Col>
							<Col span={8} style={{ marginBottom: '50px' }}>
								{/* <span className="invested-value">{investmentAccountData?.accountMaster?.category?? 0}</span><br /> */}
								<span className='invested-value'>{accountMaster?.allData?.category ?? 0}</span>
								<br />
								<span className='invested-value-content'>{'Risk Profile'}</span>
							</Col>
						</Row>
						<Row className='row'>
							{/* <Col span={8}>
                                <span className="invested-value">{investmentAccountData?.accountMaster?.portfolioReturn ?? 0}%</span><br />
                                <span className="invested-value-content">{"Portfolio Return"}</span>
                            </Col> */}
							{/* <Col span={8}>
                                <span className="invested-value">{investmentAccountData?.accountMaster?.benchmarkReturn ?? 0}%</span><br />
                                <span className="invested-value-content">{"Benchmark return"}</span>
                            </Col>
                            <Col span={8}>
                                <span className="invested-value">{
                                    investmentAccountData === NaN ? (
                                        investmentAccountData?.accountMaster?.portfolioReturn
                                    -
                                    investmentAccountData?.accountMaster?.benchmarkReturn
                                    ?? 0
                                        
                                    ) : (
                                        0     
                                    )
                                    
                                }%</span><br />
                                <span className="invested-value-content">{"Alpha"}</span>
                            </Col> */}
						</Row>
					</Col>
				</Row>
				<Row>
					{/* <Radio.Button value="large">Large</Radio.Button> */}
					<Col span={24}>
						<Button size={'large'} style={Style.button} onClick={showModal}>
							View All
						</Button>
					</Col>
				</Row>
			</GenericCard>
			<Modal
				title='Accounts'
				visible={isModalVisible}
				width={1600}
				onCancel={handleCancel}
				footer={
					[
						//             <Button key="back" onClick={handleCancel}>
						//                 Close
						//   </Button>,
					]
				}
			>
				<Col>
					{/* <AccountTableData
                        profileTableData={investmentAccountData?.lstTop3AccountData ?? []}
                    /> */}
					<AccountTableData profileTableData={investmentAccountData?.accountMaster ?? []} />
				</Col>
			</Modal>
		</>
	);
};
function mapStateToProps(state) {
	return {
		investmentAccountData: state?.portfolioOverview?.investmentAccountData,
		customer: state.common.customerInfo.customerCode,
		getCurrentDate: state.auth.user.prevDate
	};
}
export default connect(mapStateToProps)(InvestmentAccount);

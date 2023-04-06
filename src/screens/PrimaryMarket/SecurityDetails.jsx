import { useEffect, useState } from "react";
import { Row, Typography, Col, Form, Select, Avatar } from "antd";
import { useDispatch } from "react-redux";
import GenericCardInput from "../../components/GenericInput/GenericCardInput";
import UserStarDetails from "../../components/PortfolioHoldingTable/UserStarDetails";

import {
	executeGetSecuritiesForIssuer,
	setPrimaryOrder,
	executeGetSecurityCard,
} from "../../redux/actions/primaryMarketActions";

import { executeGetSecuritiesForIssuerOGT, setSecondaryOrder, setSMCalculator } from "../../redux/actions/pNBActions";
import { SecurityCard } from "./SecurityCard";
import { palette } from "../../theme";

import { connect } from "react-redux";
import GenericTable from "../../components/GenericTable/GenericTable";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";

const { Title } = Typography;
const { Option } = Select;

const styleSet = {
	tabCard: {
		border: "none",
	},
	headerRow: {
		textAlign: "center",
	},
	rowStyle: {
		color: palette.secondary.light,
		borderBottom: "1px solid #CBD6FF",
	},
};

const OrderRow = (item) => {
	return (
		<>
			<Row style={styleSet.rowStyle}>
				<Col lg={24} xl={9}>
					<UserStarDetails UserStarDetails={item} />
				</Col>
			</Row>
		</>
	);
};
export const SecurityDetails = ({
	selectValues = () => {},
	marketType = "PRIMARY",
	whichInvestment = "",
	setSecurityList,
	returnValidators = () => {},
	setPlaceButtonFlag = () => {},
	returnFormField = () => {},
	handleFormValues = () => {},
	setMinInvestmentAmt = () => {},
	setFaceValue = () => {},
	securitySM,
	issuerSM,
	stockSecurityDetail,
	formValues = {
		security: "",
		issuer: "",
	},
	stockHoldings,
	exploreProductData=[],
	
}) => {
	const [securityOptions, setSecurityOptions] = useState([]);
	const [showCard, setShowCard] = useState(false);
	const [visible, setVisible] = useState(false);
	const [modalData, setModalData] = useState([]);
	const [securityInfo, setSecurityInfo] = useState({
		security: {},
		isWaiver: false,
		alertType: "SOFT",
		isSecuritySuitability: null,
		minInvestmentAmt: null,
		lstMessage: [],
	});

	const dispatch = useDispatch();


	// start for explore product
	
	const [visibleExplore, setVisibleExplore] = useState(false);
	const [exploreModalDataVal, setExploreModalDataVal] = useState([]);

  useEffect(()=>{
	  if(marketType === "PRIMARY" && whichInvestment==="EQ"){
		setExploreModalDataVal(exploreProductData)
	  }
  },[exploreProductData])

  const renderSecurityIdColumn = (securityId, dataObject) => {
    return dataObject?.security;
  };
  
  const renderSecurityNameColumn = (securityName, dataObject)=>{
    return dataObject?.securityName;
  }

  const renderMinimumAmountColumn = (minimumAmount, dataObject) => {
    return dataObject?.appMinimum;
  };
  
  const renderMultipleColumn = (multiple, dataObject)=>{
    return dataObject?.marketLot;
  }
  const renderRecommendedPriceColumn = (recommendedPrice, dataObject) => {
    return dataObject?.buyOfferPrice;
  };
  

  

  const tablecolumnsExploreProd = [
		{
			title: "Security ID",
			dataIndex: "securityId",
			key: "securityId",
			align: "center",
      render: (securityId, exploreModalDataVal) =>
        renderSecurityIdColumn(securityId, exploreModalDataVal),
		},
		{
			title: "Security Name",
			dataIndex: "securityName",
			key: "securityName",
			align: "center",
      render: (securityName, exploreModalDataVal) =>
        renderSecurityNameColumn(securityName, exploreModalDataVal),
    },
    {
			title: "Minimum Amount",
			dataIndex: "minimumAmount",
			key: "minimumAmount",
			align: "center",
      render: (minimumAmount, exploreModalDataVal) =>
        renderMinimumAmountColumn(minimumAmount, exploreModalDataVal),
		},
		{
			title: "Multiple",
			dataIndex: "multiple",
			key: "multiple",
			align: "center",
      render: (multiple, exploreModalDataVal) =>
        renderMultipleColumn(multiple, exploreModalDataVal),
		},
		{
			title: "Recommended Price",
			dataIndex: "recommendedPrice",
			key: "recommendedPrice",
			align: "center",
      render: (recommendedPrice, exploreModalDataVal) =>
        renderRecommendedPriceColumn(recommendedPrice, exploreModalDataVal),
		},
  ];
	// end for explore product

	let formDetails = {
		issuer: {
			label: "Issuer",
			type: "Select",
			...selectValues("Issuer"),
			rules: returnValidators("issuer"),
		},
	};

	useEffect(() => {
		if (marketType === "Secondary") {
			issuerSM &&
				executeGetSecuritiesForIssuerOGT(issuerSM, whichInvestment).then((securityOptions) => {
					setSecurityOptions(securityOptions);
				});
		}
	}, [issuerSM]);

	useEffect(() => {
		if (marketType === "Secondary") {
			if (securitySM) {
				handleFormValues({ security: securitySM });
				executeGetSecurityCard(
					securitySM,
					returnFormField("selectedAccount"),
					marketType,
					returnFormField("clientId")
				).then((secInfo) => {
					if (secInfo && secInfo.length > 0) {
						setSecurityInfo(secInfo && secInfo[0]);
						setSecurityList(secInfo && secInfo[0]);
					}
					setShowCard(true);
					dispatch(
						setSecondaryOrder({
							security: securitySM,
							assetType: secInfo[0]?.security?.assetType,
							currency: secInfo[0]?.security?.currency,
						})
					);
					dispatch(
						setSMCalculator({
							security: securitySM,
							assetType: secInfo[0]?.security?.assetType,
							currency: secInfo[0]?.security?.currency,
							interest: secInfo[0]?.security?.interestRate,
							matDate: secInfo[0]?.security?.matDate,
							faceValue: secInfo[0]?.security?.faceValue,
							recompYN: "Y",
						})
					);
				});
			}
		}
	}, [securitySM]);

	useEffect(() => {
		if (marketType === "PRIMARY") {
			executeGetSecuritiesForIssuer("", whichInvestment).then((securityOptions) => {
				setSecurityOptions(securityOptions);
			});
		} else if (marketType === "Secondary") {
			executeGetSecuritiesForIssuerOGT("",whichInvestment).then((securityOptions) => {
				setSecurityOptions(securityOptions);
			});
		}
	}, [marketType, whichInvestment]);

	const tablecolumns = [
		{
			title: "Fund",
			dataIndex: "fund",
			key: "fund",
			align: "center",
		},
		{
			title: "Units",
			dataIndex: "units",
			key: "units",
			align: "center",
		},
		{
			title: "Book Value",
			dataIndex: "bookValue",
			key: "bookValue",
			align: "center",
		},
		{
			title: "Income",
			dataIndex: "income",
			key: "income",
			align: "center",
		},
		{
			title: "Market Values (Security Currency)",
			dataIndex: "marketValues",
			key: "marketValues",
			align: "center",
		},
		// {
		//   title: "Market Values (Client Currency)",
		//   dataIndex: "newMarketValues",
		//   key: "newMarketValues",
		//   align: "center",
		// },
		{
			title: "Accounts",
			dataIndex: "accounts",
			key: "accounts",
			align: "center",
		},
	];

	const modalTableOpt = {
		checkbox: false,
		expandableRow: false,
		favorite: false,
		pagination: false,
		isMenuOptions: false,
	};

	useEffect(() => {
		const mappedData2 = stockHoldings?.map((data, index) => {
			const userStarData = {
				name: data.securityName,
				id: data.isin_code,
				assetGroupName: data.assetGroupName ? data.assetGroupName : "Wealth",
				assetTypeName: data.assetTypeName ? data.assetTypeName : "Wealth",
			};

			const container = {
				key: index,
				fund: <UserStarDetails UserStarDetails={userStarData} />,
				units: data.units,
				bookValue: `${data.currencySymbol} ${data.book_cost} Unit`,
				income: `${data.currencySymbol} ${data.gain_loss} Reinvested`,
				marketValues: `${data.currencySymbol} ${data.fcy_amount} (${data.fcy_gainLossPercentage}%) `,
				// newMarketValues: `$ ${data.amount} (${data.gainLossPercentage}%) `,
				accounts: data?.lstAccountCode?.map((account) => (
					<Avatar style={{ marginRight: "13px", size: "small" }}>{account?.accCode} </Avatar>
				)),
			};
			return container;
		});

		setModalData(mappedData2);
	}, [stockHoldings]);

	const onChange = (key, selectedOption) => {
		switch (key) {
			case "issuer":
				if (marketType === "Secondary") {
					executeGetSecuritiesForIssuerOGT(selectedOption, whichInvestment).then((securityOptions) => {
						setSecurityOptions(securityOptions);
					});
				}

				handleFormValues({ issuer: selectedOption });
				break;
			case "security":
				let selectedSec = securityOptions.find((eachSec) => eachSec.security === selectedOption);
				if (marketType === "Secondary") {
					handleFormValues({ security: selectedOption });
					executeGetSecurityCard(
						selectedOption,
						returnFormField("selectedAccount"),
						marketType,
						returnFormField("clientId")
					).then((secInfo) => {
						setSecurityInfo(secInfo[0]);
						setSecurityList(secInfo[0]);
						setShowCard(true);
						dispatch(
							setSecondaryOrder({
								security: selectedOption,
								assetType: selectedSec.asset_type,
								currency: selectedSec.currency,
							})
						);
						dispatch(
							setSMCalculator({
								security: selectedOption,
								assetType: selectedSec.asset_type,
								currency: selectedSec.currency,
								interest: selectedSec.interest,
								matDate: selectedSec.matDate,
								faceValue: selectedSec.faceValue,
								recompYN: "Y",
							})
						);
					});
				} else {
					handleFormValues({
						price: selectedSec.premium ? selectedSec.premium.toString() : "",
						security: selectedOption,
					});
				}
				break;
			default:
				handleFormValues({ [key]: selectedOption });
				return;
		}
	};

	useEffect(() => {
		setPlaceButtonFlag(securityInfo.alertType === "HARD" ? true : false);
		setMinInvestmentAmt(securityInfo.minInvestmentAmt);
	}, [securityInfo]);

	useEffect(() => {
		if (marketType === "PRIMARY") {
			executeGetSecuritiesForIssuer(formValues.issuer, whichInvestment).then((securityOptions) => {
				setSecurityOptions(securityOptions);
			});
		}
	}, [formValues.issuer, marketType, whichInvestment]);

	useEffect(() => {
		if (securityOptions.length > 0) {
			let selectedSec = securityOptions.find((eachSec) => eachSec.security === formValues.security);
			if (selectedSec) {
				setFaceValue(selectedSec.faceValue);
				executeGetSecurityCard(formValues.security, formValues.selectedAccount, marketType, formValues.clientId).then(
					(secInfo) => {
						setSecurityInfo(secInfo[0]);
						setSecurityList(secInfo[0]);
						dispatch(
							setPrimaryOrder({
								premium: selectedSec.premium,
								appAmount: selectedSec.premium,
								fcyArrangerFee: selectedSec.pm_oth_chrg_perc,
								arrangerFeePer: selectedSec.pm_oth_chrg_perc,
								security: formValues.security,
								assetType: selectedSec.asset_type,
								currency: selectedSec.currency,
								faceValue: selectedSec.faceValue,
								interest: selectedSec.interest,
								isSecuritySuitability: secInfo.isSecuritySuitability,
							})
						);
						handleFormValues({
							price: selectedSec.premium ? selectedSec.premium.toString() : "",
						});
						setShowCard(true);
					}
				);
			}
		}
	}, [securityOptions, formValues.clientId, formValues.selectedAccount, formValues.security]);

	return (
		<>
			<Row>
				{Object.keys(formDetails).map((key, idx) => (
					<GenericCardInput
						item={formDetails[key]}
						key={key + idx}
						onChange={(option) => onChange(key, option)}
						value={returnFormField[key]}
						itemName={key}
					/>
				))}
				<Col
					span="8"
					// hidden={formDetails[key].hiddenField ?? false}
				>
					<Form.Item
						label="Security Name"
						colon={false}
						labelCol={{ span: "24" }}
						className="cardColumn"
						labelAlign="left"
						rules={returnValidators("security")}
						validateTrigger={["onBlur", "onSubmit", "onChange"]}
						name="security"
					>
						<Select
							size="large"
							defaultValue={returnFormField("security")}
							onChange={(option) => onChange("security", option)}
							bordered={true}
							showSearch
							onSearch={(input, _) => {
								return securityOptions.filter((eachClient) =>
									JSON.stringify(eachClient).toLowerCase().includes(input.toLowerCase())
								);
							}}
							// filterOption={(input, opt) => {
							//   return (
							//     opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							//   );
							// }}
						>
							{securityOptions.map((eachOption, idx) => (
								<Row key={eachOption + idx} value={eachOption.security}>
									<Col span={24}>{OrderRow(eachOption)}</Col>
								</Row>
							))}
							{securityOptions &&
								securityOptions.map((item, index) => (
									<Option hidden value={item.security} key={index}>
										{item.name}
									</Option>
								))}
						</Select>
					</Form.Item>
				</Col>
				{marketType === "Secondary" && (
					<Col offset={2} style={{ marginTop: "3em" }}>
						<h1 onClick={() => setVisible(true)}>Holdings</h1>
					</Col>
				)}

				{marketType === "PRIMARY" && whichInvestment ==="EQ" && (<Col offset={2} style={{ marginTop: "3em" }}>
						<h1 onClick={() => setVisibleExplore(true)}>Explore</h1>
					</Col>
				)}
			</Row>
			<CustomModal
				visible={visible}
				width={"150vw"}
				closable={true}
				handleCancel={() => setVisible(false)}
				handleOk={() => setVisible(true)}
				title={"Stocks Holdings"}
			>
				<GenericTable
					tableColumns={tablecolumns}
					tableRows={modalData}
					tableOptions={modalTableOpt}
					// pageSize={5}
					scroll={{ x: 1000 }}
				></GenericTable>
			</CustomModal>

			{/* start for explore product */}
			{marketType === "PRIMARY" && whichInvestment ==="EQ" &&(
			<CustomModal
      visible={visibleExplore}
      width={"90vw"}
      closable={true}
      handleCancel={() => setVisibleExplore(false)}
      handleOk={() => setVisibleExplore(true)}
      title={"Explore Securities"}
    >
      <GenericTable
        tableColumns={tablecolumnsExploreProd}
        tableRows={exploreModalDataVal}
        tableOptions={modalTableOpt}
        scroll={{ x: 1000 }}
      ></GenericTable>
    </CustomModal>
			)}
			{/* end for explore product */}
			{showCard && <SecurityCard data={securityInfo?.security} showBorder={true} marketType={marketType} />}
			{securityInfo?.isWaiver && (
				<Title style={{ color: "#C15555", marginLeft: "1em", marginTop: "1em" }} level={5}>
					Risk rating of security you are investing in is higher than/ lower than /within the recommended range. <br />
					You may need to upload a waiver Form / You may not be able to submit the Application.
				</Title>
			)}
			{securityInfo?.lstMessage &&
				securityInfo?.lstMessage.map((eachMessage) => (
					<Title style={{ color: "#C15555", marginLeft: "1em", marginTop: "1em" }} level={5}>
						{eachMessage.message}
					</Title>
				))}
		</>
	);
};

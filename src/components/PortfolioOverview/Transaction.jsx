import React, { useState } from "react";
import { Tabs, Row, Col, Card } from "antd";
import IconDetailComponent from "../../screens/HomeScreen/IconDetailComponent";
import GenericBadge from "../../components/GenericBadge/GenericBadge";
import UserStarDetails from "../../components/PortfolioHoldingTable/UserStarDetails";
import GenericCard from "../../components/GenericCard/GenericCard";
import {
    faExchange,
    faTag,
    faShoppingCart,
} from "@fortawesome/pro-regular-svg-icons";
import { palette, theme } from "../../theme";
import { connect } from "react-redux";
import RupeeOrNonRupee from "../RupeeOrNonRupee/RupeeOrNonRupee";
const { TabPane } = Tabs;


const transactionTabs = [
    {
        tab: "Open Orders",
        key: "OpenOrders",
    },
];

const defaultOrderList = [
    {
        id: 0,
        type: "Buy",
        status: "Complete",
        total: "$ 600",
        perUnit: "$ 60/Unit",
        name: "Alexandra Cortez",
        portfolio: "Retirement Portfolio",
        tag: "Advisory",
    },
    {
        id: 1,
        type: "Sell",
        status: "Complete",
        total: "$ 600",
        perUnit: "$ 60/Unit",
        name: "Alexandra Cortez",
        portfolio: "Retirement Portfolio",
        tag: "Advisory",
    },
    {
        id: 2,
        type: "Buy",
        status: "Complete",
        total: "$ 600",
        perUnit: "$ 60/Unit",
        name: "Alexandra Cortez",
        portfolio: "Retirement Portfolio",
        tag: "Advisory",
    },
];

const callback = (key) => {
    console.log(key);
};


const styleSet = {
    tabCard: {
        border: "none",
    },
    headerRow: {
        textAlign: "center",
    },
    rowStyle: {
        padding: "24px 0px",
        color: palette.secondary.light,
        borderBottom: "1px solid #CBD6FF",
    },
};

const OrderRow = (item) => {
    return (
        <>
            <Row style={styleSet.rowStyle}>
                <Col lg={24} xl={9}>
                    {/* <UserStarDetails UserStarDetails={item.userStarData} /> */}
                </Col>
                <Col lg={12} xl={5}>
                    <GenericBadge badgeBody={item.type} width={"100px"} />
                    <div>{item.status}</div>
                </Col>
                <Col lg={12} xl={4}>
                    <div>
                        {item?.currency} <RupeeOrNonRupee amount={item.total} />
                    </div>
                    <div>
                        {/* {item.currency} <RupeeOrNonRupee amount={item.perUnit} />  */}
                        {item.currency} {item.perUnit}
                    </div>
                </Col>
                <Col lg={24} xl={6}>
                    <div style={theme.subPrimaryHeader}>{item.name}</div>
                    <div>{item.portfolio}</div>
                    <div>
                        <GenericBadge badgeBody={item.tag} />
                    </div>
                </Col>
            </Row>
        </>
    );
};

const renderTabContent = (item) => {
    const apiOrderDetails = item?.orderDetails?.map((record, index) => {
        return {
            id: index,
            type: record.tranTypeName,
            status: record.statusName,
            total: record.amount,
            perUnit: `${record.rate}/Unit`,
            name: record.customerName,
            portfolio: record.schemeName,
            tag: record.accountNature,
            currency: record.currencySymbol,
            userStarData: {
                name: record.securityName,
                id: record.isin,
                initial:record.securityInitial,
                tagName: record.fundType,
                typeName: record.assetTypeName,
                secondaryTag: record.assetGroupName,
                rate: 2,
            },
        };
    });

    // let currency = "$";
    // const headerData = [
    //     {
    //         id: 0,
    //         icon: faShoppingCart,
    //         headText: item?.buyOrder ? `${currency} ${item?.buyOrder}` : " ",
    //         body: `Buy Orders (${item?.buyOrderCount ? item?.buyOrderCount : "3"})`,
            
    //     },
    //     {
    //         id: 1,
    //         icon: faTag,
    //         headText: item?.sellOrder ? `${currency} ${item?.sellOrder}` : " ",
    //         body: `Sell Orders (${item?.sellOrderCount ? item?.sellOrderCount : "3"})`,
    //     },
    //     {
    //         id: 2,
    //         icon: faExchange,
    //         headText: item?.netTrade ? `${currency} ${item?.netTrade}` : " ",
    //         body: `Net Trade (${item?.netTradeCount ? item?.netTradeCount : "3"})`,
    //     },
    //     console.log("Header Data", headerData)
    // ];
    
    const headerData = [
        
        {
          id: 0,
          icon: faShoppingCart,
          headText: 
            (
              <>
                {item.currencySymbol} {<RupeeOrNonRupee amount={item.buyOrder} />}
              </>
            ) ,
        //   body: `Buy Orders ( ${item?.buyOrderCount ? item?.buyOrderCount : "3"})`,
          body: `Buy Orders ( ${item?.buyOrderCount })`,
        },
        {
          id: 1,
          icon: faTag,
          headText: 
            (
              <>
                {item.currencySymbol} {<RupeeOrNonRupee amount={item.sellOrder} />}
              </>
            ) ,
          body: `Sell Orders ( ${item?.sellOrderCount })`,
        },
        {
          id: 2,
          icon: faExchange,
          headText: 
            (
              <>
                {item.currencySymbol} {<RupeeOrNonRupee amount={item.netTrade} />}
              </>
            ) ,
          body: `Net Trade ( ${item?.netTradeCount })`,
        },
        
    ];
    return (
        <>
            <Row style={styleSet.headerRow}>
                {headerData?.map((item) => (
                    <Col lg={24} xl={8} key={item?.id}>
                        <IconDetailComponent
                            icon={item?.icon}
                            headText={item?.headText}
                            body={item?.body}
                            iconSize={"2x"}
                        />
                    </Col>
                    
                ))}
            </Row>

            {apiOrderDetails?.map((item, index) => (
                    <Row key={index}>
                        <Col span={24}>{OrderRow(item)}</Col>
                    </Row>
                )
            )}
            
        </>
    );
};

const Transaction = ({ openOrders }) => {
    const contentListNoTitle = {
        OpenOrders: renderTabContent(openOrders)
    };
    

    const onTabChange = (key, type) => {
        setKey(key);
    };
    const [key, setKey] = useState("OpenOrders");
    return (
        <>
            <GenericCard
                header={"Transaction"}
            // viewAll={true}
            >
                <Card
                    style={styleSet.tabCard}
                    tabList={transactionTabs}
                    activeTabKey={key}
                    onTabChange={(key) => {
                        onTabChange(key, "key");
                    }}
                >
                    {contentListNoTitle[key]}
                </Card>
            </GenericCard>
        </>
    );
};



const mapStateToProps = (state) => {
    return {
        openOrders: state?.portfolioOverview?.openOrders,
    };
};

export default connect(mapStateToProps)(Transaction);

import React, { useState } from "react";
import { Tabs, Row, Col, Card } from "antd";
import IconDetailComponent from "./IconDetailComponent";
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
import { useHistory } from "react-router-dom";
import RupeeOrNonRupee from "../../components/RupeeOrNonRupee/RupeeOrNonRupee";
import { executeGetOpenOrdersData } from "../../redux/actions/crmHomeActions";
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
          <UserStarDetails UserStarDetails={item.userStarData} />
        </Col>
        <Col lg={12} xl={6}>
          <GenericBadge badgeBody={item.type} width={"100px"} />
          <div>{item.status}</div>
        </Col>
        <Col lg={12} xl={3}>
          <div>
            {item.currency} <RupeeOrNonRupee amount={item.total} />
          </div>
          <div>
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
        secondaryTag: record.assetTypeName,
        rate: 2,
      },
    };
  });

  const headerData = [
    // {
    //   id: 0,
    //   icon: faShoppingCart,
    //   headText: item?.buyOrder ?
    //     (
    //       <>
    //         {item.currencySymbol} {<RupeeOrNonRupee amount={item.buyOrder} />}
    //       </>
    //     ) : "",
    //   body: `Buy Orders ( ${item?.buyOrderCount ? item?.buyOrderCount : "0"})`,
    // },
    {
      id: 0,
      icon: faShoppingCart,
      headText: item ?
          (
            <> 
              {item?.currencySymbol} {<RupeeOrNonRupee amount={item?.buyOrder} />}
            </>
          ) : "",
      body: `Buy Orders ( ${item?.buyOrderCount })`,
    },
    {
      id: 1,
      icon: faTag,
      headText: item ?
        (
          <>
            {item?.currencySymbol} {<RupeeOrNonRupee amount={item?.sellOrder} />}
          </>
        ): "" ,
      body: `Sell Orders ( ${item?.sellOrderCount})`,
    },
    {
      id: 2,
      icon: faExchange,
      headText: item ?
        (
          <>
            {item?.currencySymbol} {<RupeeOrNonRupee amount={item?.netTrade} />}
          </>
        ): "" ,
      body: `Net Trade ( ${item?.netTradeCount })`,
    },
  ];
  return (
    <>
      <Row style={styleSet.headerRow}>
        {headerData.map((item) => (
          <Col lg={24} xl={8} key={item.id}>
            <IconDetailComponent
              icon={item.icon}
              headText={item.headText}
              body={item.body}
              iconSize={"2x"}
            />
          </Col>
        ))}
      </Row>
      
      { apiOrderDetails?.map(
                (item, index) => (
                    <Row key={index}>
                        <Col span={24}>{OrderRow(item)}</Col>
                    </Row>
                )
            )}

      {/* {(item?.orderDetails ? apiOrderDetails : defaultOrderList).map(
        (item, index) => (
          <Row key={index}>
            <Col span={24}>{OrderRow(item)}</Col>
          </Row>
        )
      )} */}
    </>
  );
};

const Transaction = ({ allOpenOrdersData }) => {
  const contentListNoTitle = {
    OpenOrders: renderTabContent(allOpenOrdersData),
  };
  const history = useHistory();

  const viewClick = (event) => {
    history.push(`/dashboard/orderBook`);
  };

  const onTabChange = (key, type) => {
    setKey(key);
  };
  const [key, setKey] = useState("OpenOrders");
  return (
    <>
      <GenericCard
        header={"Transaction"}
        viewAll={true}
        viewClick={viewClick}
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
    allOpenOrdersData: state.crmHome.openOrders,
    // openorders: state?.portfolioOverview?.openordersData,
  };
};


export default connect(mapStateToProps)(Transaction);

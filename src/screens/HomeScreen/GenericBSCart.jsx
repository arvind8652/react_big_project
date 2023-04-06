import React from "react";
import { Tabs, Row, Col } from "antd";
import IconDetailComponent from "./IconDetailComponent";
import GenericBadge from "../../components/GenericBadge/GenericBadge";
import UserStarDetails from "../../components/PortfolioHoldingTable/UserStarDetails";

import {
  faExchange,
  faTag,
  faShoppingCart,
} from "@fortawesome/pro-regular-svg-icons";
import { palette, theme } from "../../theme";
const { TabPane } = Tabs;

const defaultTabs = [
  {
    tab: "Tab 1",
    key: "tab1",
  },
  {
    tab: "Tab 2",
    key: "tab2",
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
        <Col lg={24} xl={10}>
          <UserStarDetails />
        </Col>
        <Col lg={12} xl={4}>
          <GenericBadge badgeBody={item.type} />
          <div>{item.status}</div>
        </Col>
        <Col lg={12} xl={4}>
          <div>{item.total}</div>
          <div>{item.perUnit}</div>
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

const headerData = [
  {
    id: 0,
    icon: faShoppingCart,
    headText: "$ 12,000",
    body: "Buy Orders (3)",
  },
  {
    id: 1,
    icon: faTag,
    headText: "$ 1,000",
    body: "Sell Orders (3)",
  },
  {
    id: 2,
    icon: faExchange,
    headText: "$ 7,000",
    body: "Net Trade (4)",
  },
];

const renderTabContent = (item) => {
  let orderList = defaultOrderList;

  return (
    <>
      <Row style={styleSet.headerRow}>
        {headerData.map((item) => (
          <Col lg={24} xl={8}>
            <IconDetailComponent
              icon={item.icon}
              headText={item.headText}
              body={item.body}
              iconSize={"2x"}
            />
          </Col>
        ))}

        {/* <Col lg={24} xl={8}>
          <IconDetailComponent />
        </Col>
        <Col lg={24} xl={8}>
          <IconDetailComponent />
        </Col> */}
      </Row>
      <Row>
        <Col span={24}>{orderList.map((item) => OrderRow(item))}</Col>
      </Row>
    </>
  );
};

const GenericBSCart = ({ tabs = defaultTabs }) => {
  return (
    <>
      <Tabs defaultActiveKey={defaultTabs[0].key} onChange={callback}>
        {tabs.map((item, index) => (
          <TabPane tab={item.tab} key={index}>
            {/* {item.tab} */}
            {renderTabContent(item)}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default GenericBSCart;

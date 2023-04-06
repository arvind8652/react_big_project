import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import {
  Table,
  Tag,
  Card,
  Space,
  Row,
  Col,
  Avatar,
  Divider,
  Tooltip,
  Menu,
  Tabs,
} from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import ConsolidatedPortfolio from "../../components/MutualFundsTab/ConsolidatedPortfolio";
import GenericTable from "../../components/GenericTable/GenericTable";
import UserDetails from "../../components/UserDetail/UserDetail";
import PortfolioButton from "./PortfolioButton";
import { fontSet } from "../../theme";
import UserStarDetails from "./UserStarDetails";

const PortfolioHoldingSubTable = () => {
  const styleSet = {
    cardStyle: {
      text: fontSet.heading.large,
    },
    card: {
      borderRadius: "5px",
      //color: "#696A91",
    },
  };

  const menuData = (
    <Menu>
      <Menu.Item key="1">Sell</Menu.Item>
      <Menu.Item key="2">Trade</Menu.Item>
      <Menu.Item key="3">Switch</Menu.Item>
    </Menu>
  );
  const dataSource = [
    {
      key: "1",
      fundName: <UserStarDetails />,
      units: "120 Locked-in",
      bookValue: "$120,000 $1000 Unit",
      //income: "$128,000 Reinvested",
      marketValues: "$128,000 +$8000(+12%)",
      newMarketValues: "$120,000 +$8000(+11.5%)",
      accounts: <PortfolioButton style={styleSet.card} />,
    },
    {
      key: "2",
      fundName: <UserStarDetails />,
      units: "120 Locked-in",
      bookValue: "$120,000 $1000 Unit",
      //income: "$128,000 Reinvested",
      marketValues: "$128,000 +$8000(+12%)",
      newMarketValues: "$120,000 +$8000(+11.5%)",
      accountName: "",
      accounts: <PortfolioButton style={styleSet.card} />,
    },
  ];

  const tablecolumns = [
    {
      title: "Fund Name",
      dataIndex: "fundName",
      key: "fundName",
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
      title: "Market Values",
      dataIndex: "marketValues",
      key: "marketValues",
      align: "center",
    },
    {
      title: "Market Values",
      dataIndex: "newMarketValues",
      key: "newMarketValues",
      align: "center",
    },
    {
      title: "",
      dataIndex: "accounts",
      key: "accounts",
      align: "center",
    },
  ];

  return (
    <>
      <Row style={styleSet.cardStyle}>
        <Col span={24}>
          <GenericTable
            onRow={(record, recordIndex) => ({
              onClick: (event) => {},
            })}
            menuOptions={menuData}
            tableOptions={{ checkbox: false }}
            tableRows={dataSource}
            tableColumns={tablecolumns}
            //   onRow={(record, recordIndex) => ({
            //     onClick: event => { <ProfileBannerList /> }
            //   })}
          />
        </Col>
      </Row>
    </>
  );
};
export default PortfolioHoldingSubTable;

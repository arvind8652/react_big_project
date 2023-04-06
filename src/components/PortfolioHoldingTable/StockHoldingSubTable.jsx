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
  Button,
} from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import ConsolidatedPortfolio from "../../components/MutualFundsTab/ConsolidatedPortfolio";
import GenericTable from "../../components/GenericTable/GenericTable";
import UserDetails from "../../components/UserDetail/UserDetail";
import PortfolioButton from "./PortfolioButton";
import { fontSet } from "../../theme";
import UserStarDetails from "./UserStarDetails";

const StockHoldingSubTable = () => {
  const styleSet = {
    cardStyle: {
      text: fontSet.heading.large,
    },
    card: {
      borderRadius: "5px",
      //color: "#696A91",
    },
  };

  const dataSource = [
    {
      key: "1",
      fundName: <UserStarDetails />,
      units: "120 Locked-in",
      bookValue: "$120,000 Unit",
      //income: "$128,000 Reinvested",
      marketValues: "$128,000 (+12%)",
      newMarketValues: "$120,000 (+11.5%)",
      accountName: "",
      accounts: <Button style={styleSet.card}>Select</Button>,
    },
    {
      key: "2",
      fundName: <UserStarDetails />,
      units: "120 Locked-in",
      bookValue: "$120,000 Unit",
      //income: "$128,000 Reinvested",
      marketValues: "$128,000 (+12%)",
      newMarketValues: "$120,000 (+11.5%)",
      accountName: "",
      accounts: <Button style={styleSet.card}>Select</Button>,
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
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
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
              onClick: (event) => {
                console.log("Hi");
              },
            })}
            //menuOptions={menuData}
            tableOptions={{ checkbox: false, pagination: false }}
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
export default StockHoldingSubTable;

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
  Modal,
  Button,
} from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import ConsolidatedPortfolio from "../../components/MutualFundsTab/ConsolidatedPortfolio";
import GenericTable from "../../components/GenericTable/GenericTable";
import UserDetails from "../../components/UserDetail/UserDetail";
import PortfolioHoldingSubTable from "./PortfolioHoldingSubTable";
import UserStarDetails from "./UserStarDetails"
//import OverViewTab from "./OverviewTab";
import { fontSet } from "../../theme";

const PortfolioHoldingTable = () => {
  const styleSet = {
    cardStyle: {
      text: fontSet.heading.large,
    },
    card: {
      borderRadius: "12px",
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
      fund: <UserStarDetails />,
      units: "120 Locked-in",
      bookValue: "$120,000 Unit",
      income: "$128,000 Reinvested",
      marketValues: "$128,000(+12%)",
      newMarketValues: "$120,000(+11.5%)",
      accounts: <Avatar style={{ size: "small" }} />,
    },
    {
      key: "2",
      fund: <UserStarDetails />,
      units: "120 Locked-in",
      bookValue: "$120,000 Unit",
      income: "$128,000 Reinvested",
      marketValues: "$128,000 (+12%)",
      newMarketValues: "$120,000 (+11.5%)",
      accounts: (
        <Avatar.Group
          maxCount={2}
          size="small"
        //maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
          <Avatar size="small" icon={<UserOutlined />} />
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Avatar size="small" icon={<UserOutlined />} />
          <Avatar size="small" icon={<UserOutlined />} />
          <Avatar size="small" icon={<UserOutlined />} />
          {/* <Tooltip title="Ant User" placement="top">
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Tooltip>
        <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} /> */}
        </Avatar.Group>
      ),
    },
  ];

  const tablecolumns = [
    {
      title: "Fund",
      dataIndex: "fund",
      key: "fund",
      align: "center",
      color: "#5D6DD1",
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
      title: "Accounts",
      dataIndex: "accounts",
      key: "accounts",
      align: "center",
    },
  ];

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
  return (
    <>
      <card style={styleSet.card}>
        <Row style={styleSet.cardStyle} onClick={showModal}>
          <Col span={24}>
            <GenericTable
              const
              menuOptions={menuData}
              tableOptions={{ checkbox: false, pagination: true }}
              tableRows={dataSource}
              tableColumns={tablecolumns}
              onRow={(record, recordIndex) => ({
                onClick: (event) => {
                  console.log("onRow onClick");
                },
              })}
            />
          </Col>
        </Row>
      </card>
      <Modal
        title="Mutual Fund Portfolio Holdings"
        visible={isModalVisible}
        width={1300}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <Col>
          <PortfolioHoldingSubTable />
        </Col>
      </Modal>
    </>
  );
};
export default PortfolioHoldingTable;

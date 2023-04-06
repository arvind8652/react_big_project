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
//import OverViewTab from "./OverviewTab";
import { fontSet } from "../../theme";
import StockHoldingSubTable from "./StockHoldingSubTable";
import UserStarDetails from "./UserStarDetails";
import CustomModal from "../Modal/CustomModal/CustomModal";
import { getSecurityDetail } from "../../api/portfolioHoldingsApi";
import { executeGetStockSecurityDetail } from "../../redux/actions/portfolioHoldingsAction";

const defaultTableOpt = {
  checkbox: false,
  expandableRow: false,
  favorite: false,
  pagination: true,
  isMenuOptions: false,
};

const modalTableOpt = {
  checkbox: false,
  expandableRow: false,
  favorite: false,
  pagination: false,
  isMenuOptions: false,
};

const StockHoldingTable = ({
  tableData,
  modalTitle,
  requestData,
  stockSecurityDetail,
}) => {
  const styleSet = {
    cardStyle: {
      text: fontSet.heading.large,
    },
    card: {
      borderRadius: "12px",
    },
  };

  const onRowSelect = () => {};
  const mappedData = tableData?.map((data, index) => {
    const userStarData = {
      name: data.securityName,
      id: data.isin_code,
      tagName: "Wealth",
      secondaryTag: "Wealth",
      //  :
      //  : data.securityInitials
      //  :
      //  : data.starRating
    };

    const container = {
      key: index,
      fund: <UserStarDetails UserStarDetails={userStarData} />,
      units: data.units,
      security: data.security,
      bookValue: `${data.currencySymbol} ${data.book_cost} Unit`,
      income: `${data.currencySymbol} ${data.gain_loss} Reinvested`,
      marketValues: `${data.currencySymbol} ${data.fcy_amount} (${data.fcy_gainLossPercentage}%) `,
      newMarketValues: `${data.currencySymbol} ${data.amount} (${data.gainLossPercentage}%) `,
      accounts: data?.lstAccountCode?.map((account) => (
        <Avatar style={{ marginRight: "13px", size: "small" }}>
          {account?.accCode}{" "}
        </Avatar>
      )),
    };
    return container;
  });

  const dataSource = [
    {
      key: "1",
      fund: <UserStarDetails />,
      units: "120 Locked-in",
      bookValue: "$120,000 Unit",
      income: "$128,000 Reinvested",
      marketValues: "$128,000 (+12%)",
      newMarketValues: "$120,000 (+11.5%)",
      accounts: <Avatar style={{ marginRight: "13px", size: "small" }} />,
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
    {
      title: "Market Values (Client Currency)",
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

  const [visible, setVisible] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState("");
  const [modalData, setModalData] = useState(dataSource);
  const [rowSelected, setRowSelected] = useState(false);

  useEffect(() => {
    const stockDefaultBody = {
      userID: requestData?.userID,
      businessDate: requestData?.businessDate,
      CustomerID: requestData?.CustomerID,
      assetTab: requestData?.assetTab,
      security: selectedSecurity,
    };
    executeGetStockSecurityDetail(stockDefaultBody);
  }, [selectedSecurity]);

  useEffect(() => {
    const mappedData2 = stockSecurityDetail?.map((data, index) => {
      const userStarData = {
        name: data.securityName,
        id: data.isin_code,
        assetGroupName: data.assetGroupName ? data.assetGroupName : "Wealth",
        assetTypeName: data.assetTypeName ? data.assetTypeName : "Wealth",
        //  :
        //  : data.securityInitials
        //  :
        //  : data.starRating
      };

      const container = {
        key: index,
        fund: <UserStarDetails UserStarDetails={userStarData} />,
        units: data.units,
        bookValue: `${data.currencySymbol} ${data.book_cost} Unit`,
        income: `${data.currencySymbol} ${data.gain_loss} Reinvested`,
        marketValues: `${data.currencySymbol} ${data.fcy_amount} (${data.fcy_gainLossPercentage}%) `,
        newMarketValues: `${data.currencySymbol} ${data.amount} (${data.gainLossPercentage}%) `,
        accounts: data?.lstAccountCode?.map((account) => (
          <Avatar style={{ marginRight: "13px", size: "small" }}>
            {account?.accCode}{" "}
          </Avatar>
        )),
      };
      return container;
    });

    setModalData(mappedData2);
    if (rowSelected) {
      setVisible(true);
    }
    setRowSelected(false);
  }, [stockSecurityDetail]);

  const onClick = (event) => {
    setRowSelected(true);
    setSelectedSecurity(event.security);
  };

  return (
    <>
      {/* <Card style={styleSet.card}> */}
      <Row style={styleSet.cardStyle}>
        <Col span={24}>
          <GenericTable
            tableColumns={tablecolumns}
            tableRows={mappedData ? mappedData : dataSource}
            tableOptions={defaultTableOpt}
            onRowClick={onClick}
            pageSize={25}
            scroll={{ x: 1000 }}
          />
        </Col>
      </Row>
      <CustomModal
        visible={visible}
        width={"150vw"}
        closable={true}
        handleCancel={() => setVisible(false)}
        handleOk={() => setVisible(true)}
        title={modalTitle}
      >
        <GenericTable
          tableColumns={tablecolumns}
          tableRows={modalData}
          tableOptions={modalTableOpt}
          // onRowClick={() => setVisible(true)}
          // pageSize={5}
          scroll={{ x: 1000 }}
        ></GenericTable>
      </CustomModal>
      {/* </Card> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    stockSecurityDetail:
      state.portfolioHoldings.stockSecurityDetail?.securityDetail,
  };
};
const mapDispatchToProps = {
  // executeGetCustomerOnboardingListingCs,
  // executeGetAllCustomerOnboardingData,
  // executeGetAllPendingAccounts,
};
export default connect(mapStateToProps, mapDispatchToProps)(StockHoldingTable);

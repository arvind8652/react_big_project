import { palette, fontSet, theme } from "../../theme";
import React from "react";
import { Row, Col, Menu } from "antd";
import GenericTable from "../../components/GenericTable/GenericTable";
import ProspectUserDetails from "./ProspectUserDetails";
import GenericBadge from "../GenericBadge/GenericBadge";
const defaultValue = {
  primaryID: "",
  primaryIDNumber: "",
  expiryDate: "",
  FATCAValidation: "",
  PEP: "PEP",
  potentiallyVulnerable: "",
  AMLA: "",
  bannedList: "",
};
const ProspectMutualFund = ({ TopBarSearch = defaultValue }) => {
  const styleSet = {
    validationBlock: {
      color: palette.secondary.light,
    },
    contactBlock: {
      color: palette.secondary.light,
      height: 0.5,
      //border-width:0,
      //color:gray,
      //background-color:gray,
    },
    container: {
      flex: 1,
      width: "100%",
      marginTop: "10px",
      marginBottom: "15px",
    },
    subCardHeader: {
      fontSize: fontSet.body.xlarge,
      color: palette.text.dark,
    },
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
      fund: <ProspectUserDetails />,
      tagName: "Mutual Fund",
      cap: "Multi Cap",
      category: "Category",
      growth: "Industrial",
      plan: "Sector",
      per: "Equity",
      newReturn: "Type",
    },
  ];

  const renderBookValues = (bookValue, dataSource) => {
    return (
      <>
        <Col>
          <Row style={theme.profileTopName}>{dataSource.cap}</Row>
          <Row style={theme.profileTag}>
            {dataSource.category}
            {/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
          </Row>
        </Col>
      </>
    );
  };
  const renderIncomeValues = (income, dataSource) => {
    return (
      <>
        <Col>
          <Row style={theme.profileTopName}>{dataSource.growth}</Row>
          <Row>
            {dataSource.plan}
            {/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
          </Row>
        </Col>
      </>
    );
  };
  const renderMarketValues = (marketValues, dataSource) => {
    return (
      <>
        <Col>
          <Row style={theme.profileTopName}>
            {dataSource.per}
            {/* <GenericBadge badgeBody={ProspectUserDetails.secondaryTag} /> */}
          </Row>
          <Row>
            {dataSource.newReturn}
            {/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}
          </Row>
        </Col>
      </>
    );
  };
  const renderNewMarketValues = (newMarketValues, dataSource) => {
    return (
      <>
        <Col>
          <Row style={{ alignItems: "center", margin: "5px 0px" }}>
            <GenericBadge badgeBody={dataSource.tagName} />
            {/* <GenericBadge badgeBody={ProspectUserDetails.secondaryTag} /> */}
          </Row>
        </Col>
      </>
    );
  };

  const tablecolumns = [
    {
      //title: "fund",
      dataIndex: "fund",
      key: "fund",
      align: "center",
      color: "#5D6DD1",
    },

    {
      //title: "Book Value",
      dataIndex: "bookValue",
      key: "bookValue",
      align: "center",
      render: (bookValue, dataSource) =>
        renderBookValues(bookValue, dataSource),
    },
    {
      //title: "Income",
      dataIndex: "income",
      key: "income",
      align: "center",
      render: (income, dataSource) => renderIncomeValues(income, dataSource),
    },
    {
      //title: "Market Values",
      dataIndex: "marketValues",
      key: "marketValues",
      align: "center",
      render: (marketValues, dataSource) =>
        renderMarketValues(marketValues, dataSource),
    },
    {
      //title: "Market Values",
      dataIndex: "newMarketValues",
      key: "newMarketValues",
      align: "center",
      render: (newMarketValues, dataSource) =>
        renderNewMarketValues(newMarketValues, dataSource),
    },
  ];
  return (
    <>
      <card style={styleSet.card}>
        <Row style={styleSet.cardStyle}>
          <Col span={24}>
            <GenericTable
              const
              menuOptions={menuData}
              tableOptions={{ checkbox: false, pagination: false }}
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
    </>
  );
};
export default ProspectMutualFund;

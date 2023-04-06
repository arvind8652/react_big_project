// in-built imports
import React, { useState } from "react";
// external imports
import { Row, Space, Spin, Tabs } from "antd";
// internal imports
import { Opportunityview } from "./Opportunityview";
import { TopBarCustomers } from "./TopBarCustomers";
import { TopBarSearchAll } from "./TopBarSearchAll";
import { Product } from "./Product";
import { TopBarProspects } from "./TopBarProspects";
import { TopBarLeads } from "./TopBarLeads";

const { TabPane } = Tabs;

export const TopBarSearchTabs = (props) => {
  const {
    topBarData = {},
    isLoading = false,
    onClose = () => {
      console.log("clicked");
    },
  } = props;
  const [currentTab, setCurrentTab] = useState("all");
  const callback = (key) => {
    setCurrentTab(key);
  };

  return (
    <>
      <Tabs defaultActiveKey={"all"} activeKey={currentTab} onChange={callback}>
        <TabPane tab="All" key="all">
          <div style={{ overflow: "auto", height: "550px" }}>
            {isLoading ? (
              <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Spin size="large" />
              </div>
            ) : (
              <TopBarSearchAll
                searchResult={topBarData}
                onViewAllPress={callback}
                onClose={onClose}
              />
            )}
          </div>
        </TabPane>
        <TabPane tab="Products" key="products">
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <Product
              productList={
                topBarData.hasOwnProperty("searchProductResponse")
                  ? topBarData.searchProductResponse
                  : []
              }
              showFilter={true}
              allowScroll={true}
            />
          )}
        </TabPane>
        <TabPane tab="Opportunities" key="opportunities">
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <Space direction="vertical">
              <Opportunityview
                opprotunityList={
                  topBarData.hasOwnProperty("searchOpportunityResponse")
                    ? topBarData.searchOpportunityResponse
                    : []
                }
                showFilter={true}
                onClose={onClose}
              />
            </Space>
          )}
        </TabPane>
        <TabPane tab="Client" key="customers">
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <TopBarCustomers
              clientList={
                topBarData.hasOwnProperty("searchClientResponse")
                  ? topBarData.searchClientResponse
                  : []
              }
              showFilter={true}
              allowScroll={true}
              onClose={onClose}
            />
          )}
        </TabPane>
        <TabPane tab="Prospects" key="prospects">
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <TopBarProspects
              prospectList={
                topBarData.hasOwnProperty("searchProspectResponse")
                  ? topBarData.searchProspectResponse
                  : []
              }
              showFilter={true}
              allowScroll={true}
              onClose={onClose}
            />
          )}
        </TabPane>
        <TabPane tab="Leads" key="leads">
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <TopBarLeads
              leadsList={
                topBarData.hasOwnProperty("searchLeadResponse")
                  ? topBarData.searchLeadResponse
                  : []
              }
              onClose={onClose}
            />
          )}
        </TabPane>
      </Tabs>
    </>
  );
};

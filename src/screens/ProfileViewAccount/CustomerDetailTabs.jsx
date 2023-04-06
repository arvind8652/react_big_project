import React, { useState } from "react";
import { Card, Col, Button } from "antd";
import CustomerDetails from "./CustomerDetails";
import { NavLink } from "react-router-dom";
import ProfileAccountTableData from "../../components/CommonCards/ProfileAccountTableData";
import ProfileVerticalTimeline from "../../components/VerticalTimeline/ProfileVerticalTimeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-light-svg-icons";

const CustomerDetailTabs = ({
  profileContactDetails,
  verticalDataTimeline,
  ProfileAccountTable,
}) => {
  const [key, setKey] = useState("CustomerDetails");
  const [noTitleKey, setNoTitleKey] = useState("CustomerDetails");
  const onTabChange = (key, type) => {
    setNoTitleKey(key);
  };
  const tabListNoTitle = [
    {
      key: "CustomerDetails",
      tab: "Customer Details",
    },
    {
      key: "Accounts",
      tab: "Accounts",
    },
    {
      key: "Timeline",
      tab: "Timeline",
    },
  ];

  const contentListNoTitle = {
    CustomerDetails: (
      <CustomerDetails customerDetails={profileContactDetails} />
    ),

    Accounts: (
      <ProfileAccountTableData profileTableData={ProfileAccountTable} />
    ),
    Timeline: <ProfileVerticalTimeline timelineData={verticalDataTimeline} />,
  };
  return (
    <Card
      tabList={tabListNoTitle}
      activeTabKey={noTitleKey}
      onTabChange={(key) => {
        onTabChange(key, "noTitleKey");
      }}
      extra={
        <Button

          type="text"
          style={{ color: "#ffffff", fontSize: "16px", backgroundColor: "rgb(114, 126, 198)", borderRadius: "8px", textAlign: "center" }}

        >
          <NavLink to={{
            pathname: "/dashboard/AccountCreate",
            state: { contactDetails: profileContactDetails }
          }}>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ marginRight: 8 }}
            />
            Add</NavLink>
        </Button>
      }
    >
      {contentListNoTitle[noTitleKey]}

    </Card>
  );
};

export default CustomerDetailTabs;

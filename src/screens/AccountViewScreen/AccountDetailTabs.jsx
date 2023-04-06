import React, { useState } from "react";
import { Card } from "antd";
import AccountDetails from "./AccountDetails";
import AccountVerticalTimeline from "./AccountVerticalTimeline";
const AccountDetailTabs = ({ accountDetailsData = {}, timelineDetails = [], jointHolder = [] }) => {
    const [key, setKey] = useState("AccountDetails");
    const [noTitleKey, setNoTitleKey] = useState("AccountDetails");

    const onTabChange = (key, type) => {
        setNoTitleKey(key);
    };
    const tabListNoTitle = [
        {
            key: "AccountDetails",
            tab: "Account Details",
        },
        {
            key: "Timeline",
            tab: "Timeline",
        },
    ];

    const contentListNoTitle = {
        AccountDetails: <AccountDetails customerDetails={accountDetailsData} jointHolder={jointHolder} />,
        Timeline: <AccountVerticalTimeline timelineData={timelineDetails} />,
    };
    return (
        <Card
            tabList={tabListNoTitle}
            activeTabKey={noTitleKey}
            onTabChange={(key) => {
                onTabChange(key, "noTitleKey");
            }}
        >
            {contentListNoTitle[noTitleKey]}
        </Card>
    );
};

export default AccountDetailTabs;

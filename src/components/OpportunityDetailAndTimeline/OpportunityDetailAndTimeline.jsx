import React from 'react';
import { Tabs } from 'antd'
import "./OpportunityViewScreen.scss";

const OpportunityDetailAndTimelineTabDetails = (props) => {
    const tabListNoTitle = [
        {
            key: "OpportunityDetails",
            tab: "Opportunity Details",
        },
        {
            key: "Timeline",
            tab: "Timeline",
        },
    ];


    const timelines = props.timelines;
    const opportunityViewRules = props.opportunityViewRules;
    const controlStructure = props.controlStructure;
    const fullControlStructure = props.fullControlStructure;

    const opportunityDetail = {
        status: props.detail.isOpen,
        stage: props.detail.stage,
        probability: props.detail.probability,
        opportunityId: props.detail.opportunityId,
        opportunityName: props.detail.opportunityName,
        targetAmount: props.detail.targetAmount,
        opportunityType: props.detail.opportunityType,
        expectedDate: props.detail.dueDate,
        closureAmount: props.detail.amount,
        closureDate: props.detail.closeDate,
        product: props.detail.productOrService,
        currency: props.detail.preferredCurrency,
        countryCode: props.detail.countryCodeData_Value,
        remarks: props.detail.remark,
        lastUpdate: props.detail.inputDateTime,
        relationshipManager: props.detail.relationshipManager,
        branchName: props.detail.branchName,
        creationDate: props.detail.creationDate,
        closeReason: props.detail.closeReason,
    };

    const contentListActiveKey = {
        OpportunityDetails: <OpportunityDetails data={opportunityDetail} />,
        Timeline: <OpportunityTimeline data={timelines} />,
    };

    const [activeKey, setActiveKey] = useState("OpportunityDetails");
    const onTabChange = (activeKey, type) => {
        setActiveKey(activeKey);
    };

    return (
        <>
            <Card
                className="opportunityViewCardDetail"
                bordered={false}
                style={{ width: "100%" }}
                tabList={tabListNoTitle}
                activeTabKey={activeKey}
                onTabChange={(key) => {
                    onTabChange(key, "activeKey");
                }}
            >
                {contentListActiveKey[activeKey]}
            </Card>
        </>
    );
};
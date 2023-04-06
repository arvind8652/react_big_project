import React, { useState } from "react";
import { connect } from "react-redux";
import GenericCard from "../../components/GenericCard/GenericCard";
import { feeds, investmentCart, transaction } from "./constant";
import { Row, Col, Carousel, Button, Tabs, List, Rate, Card } from "antd";
import { faBookOpen, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericBadge from "../../components/GenericBadge/GenericBadge";
import "antd/dist/antd.css";
import Avatar from "antd/lib/avatar/avatar";
import { faCartArrowDown, faCarTilt, faExchange, faTags } from "@fortawesome/pro-regular-svg-icons";
import GenericCardWithoutMenuButton from "../../components/GenericCard/GenericCardWithoutMenuButton";
import { palette } from "../../theme";
import { faTag } from "@fortawesome/pro-light-svg-icons";
import TabPage from "./TabPage";

const { TabPane } = Tabs;

const InvestmentCart = () => {

    const RenderTabs = () => {
        const [activeTab, setActiveTab] = useState("0");
        const [loading, setLoading] = useState(true);
        const RenderHeaderTabs = ({ tabs, activeTab, setActiveTab }) => {
            const handleTabChange = (key) => {
                setActiveTab(key);
            };
            return (
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    {tabs.map((tab, index) => {
                        return <TabPane tab={<div>{tab.title}</div>} key={index} />;
                    })}
                </Tabs>
            );
        };

        const tabs = [
            {
                title: "Orders (5)",
                component: (<TabPage />),
            },
            {
                title: "Mandates (4)",
                component: (<TabPage />),
            },
        ];
        return (
            <Card
                // className="rc-m-d-card"
                title={
                    <RenderHeaderTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                }
            >
                {tabs[activeTab].component}
            </Card>
        );
    };

    const feedsStyle = {
        button: {
            borderRadius: "8px",
            fontSize: "22px",
            width: "max-content",
        },
    };

    return (
        <>
            <GenericCardWithoutMenuButton cardTitle={investmentCart}>
                <RenderTabs />
                <Row>
                    <Col span={24}>
                        <Button size={"large"} style={feedsStyle.button}>
                            View All
                        </Button>
                    </Col>
                </Row>
            </GenericCardWithoutMenuButton>
        </>
    )
};
export default connect()(InvestmentCart);

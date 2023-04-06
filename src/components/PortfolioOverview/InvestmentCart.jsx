import React, { useState } from "react";
import GenericCard from "../../components/GenericCard/GenericCard";
import { investmentCart } from "../../components/PortfolioOverview/PortfolioHoldingConstant";
import { Row, Col, Carousel, Button, Tabs, List, Rate, Card, Modal } from "antd";
import "antd/dist/antd.css";
import OrdersTabPage from "./OrdersTabPage";
import MandatesTabPage from "./MandatesTabPage";
import DemoModal from "./DemoModal";

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
                component: (<OrdersTabPage />),

            },
            // {
            //     title: "Mandates (4)",
            //     component: (<MandatesTabPage />),
            // },
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
            //fontSize: "22px",
            width: "max-content",
            float: "right",
            color: "#47518B",
        },
    };
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
            <GenericCard header={investmentCart}>
                <RenderTabs />
                <Row>
                    <Col span={24}>
                        <Button size={"large"} style={feedsStyle.button} onClick={showModal}>
                            View All
                        </Button>
                    </Col>
                </Row>
            </GenericCard>
            <Modal
                title="Accounts"
                visible={isModalVisible}
                width={1600}
                onCancel={handleCancel}
                footer={[
                    //             <Button key="back" onClick={handleCancel}>
                    //                 Close
                    //   </Button>,
                ]}
            >
                <Col>
                    <DemoModal />
                </Col>
            </Modal>
        </>
    )
};
export default InvestmentCart;

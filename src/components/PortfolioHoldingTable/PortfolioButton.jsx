import React, { useState } from 'react';
import { Modal, Button, Card, Col, Row, Typography, Divider, Menu, Dropdown, message, Select, Input } from 'antd';

//import { Table, Tag, Card, Space, Row, Col, Avatar, Divider, Tooltip, Menu, Tabs, Button } from "antd";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import PortfolioHoldingSubTable from "./PortfolioHoldingSubTable";
import { palette, fontSet } from "../../theme";

const PortfolioButton = () => {
  const { Option } = Select;
  const styleSet = {

    relationBlock: {
      color: palette.secondary.light,
      width: "250px",
      size: "large",
    },
    card: {
      color: palette.text.banner,
      borderRadius: "5px",
    },
    subCard: {
      fontSize: fontSet.body.medium,
      color: palette.secondary.main,
      borderRadius: "5px",
    },
    container: {
      color: palette.text.main,
      marginBottom: "5px"

    },
    default: {
      flex: 1,
      marginBottom: "15px",
      color: palette.text.banner,
    },
    invest: {
      color: palette.secondary.heavy,
      borderRadius: "12px",
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
      <>
        <Col span={12}>
          <Button style={styleSet.subCard} onClick={showModal}>
            Invest
          </Button>
          <Modal title="Invest" visible={isModalVisible} width={300} onOk={handleOk} onCancel={handleCancel}
            style={{ width: "100%", resize: "none" }}
            footer={[
              <Button key="back" style={styleSet.subCard} onClick={handleCancel}>
                Add to Cart
              </Button>,
              <Button key="submit" type="primary" style={styleSet.card} onClick={handleOk}>
                Continue
              </Button>,]}

          >
            <p>
              <Col>
                <Row style={styleSet.container}>
                  Account
                </Row>
              </Col>
              <Col span={12}>
                <Select defaultValue="RetirementPortfolio" style={styleSet.relationBlock} bordered={false} >
                  <Option value="RetirementPortfolio">Retirement Portfolio</Option>
                  <Option value="retirement">Retirement</Option>
                  <Option value="education">Education</Option>
                  <Option value="helth">Helth</Option>
                  <Option value="assurance">Assurance</Option>
                </Select>
              </Col>
            </p>
            <p>
              <Row style={styleSet.container}>
                Systematic Investment
              </Row>
              <Col span={12}>
                <Input style={styleSet.relationBlock} placeholder="Enter amount (minimum $100)" />
              </Col>
            </p>
            <p>
              <Row style={styleSet.container}>
                Lumpsum investment
              </Row>
              <Col span={12}>
                <Input style={styleSet.relationBlock} placeholder="Amount (minimum $100)" />
              </Col>
            </p>

          </Modal>
        </Col>
      </>
    </>
  );
};
export default PortfolioButton;
import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Column } from "@ant-design/charts";
import { Select, Row, Col, Space, Typography, Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisHAlt } from "@fortawesome/pro-light-svg-icons";
import { palette, theme } from "../../theme";
import GenericCard from "../../components/GenericCard/GenericCard";
import GenericBadge from "../../components/GenericBadge/GenericBadge";
import SmallUserDetail from "../../screens/HomeScreen/SmallUserDetail";
import OpportunityTableModal from "./OpportunityTableModal";
import {
  ScButtonText,
  ScRate,
} from "../../components/StyledComponents/genericElements";
import RupeeOrNonRupee from "../../components/RupeeOrNonRupee/RupeeOrNonRupee";
import { getOpportunities } from "../../api/portfolioOverviewApi";
// import portfolioOverviewReducer from "../../redux/reducers/portfolioOverviewReducer";
import { useSelector } from "react-redux";

const { Option } = Select;
const { Text } = Typography;
const menuItems = ["Modify", "Delete"];

const badgeText = (open) => `${open}`;

const styleSet = {
  rowStyle: {
    padding: "24px 0px",
    borderBottom: "1px solid #CBD6FF",
  },
};

const opportunitylist = [
  {
    id: 0,
    name: "Chris Ramos",
    role: "Prospect",
    amount: "$ 25,000",
    title: "AIF fund investment",
    date: "31 Mar 2021",
    stage: "Negotiation & Review",
    status: "Closed",
    currency: "$",
  },
  {
    id: 1,
    name: "Chris Ramos",
    role: "Prospect",
    amount: "$ 25,000",
    title: "AIF fund investment",
    date: "31 Mar 2021",
    stage: "Negotiation & Review",
    status: "Closed",
    currency: "$",
  },
  {
    id: 2,
    name: "Chris Ramos",
    role: "Prospect",
    amount: "$ 25,000",
    title: "AIF fund investment",
    date: "31 Mar 2021",
    stage: "Negotiation & Review",
    status: "Closed",
    currency: "$",
  },
];

const Opportunities = ({ executeGetOpportunity, opportunities }) => {
    const [componentData, setComponentData] = useState(opportunitylist);
  useEffect(() => {
    const apiData = opportunities?.lstOpportunity.map((item, index) => {
      return {
        id: index,
        name: item.clientProspectName,
        role: item.opportunityTypeName,
        amount: item.targetAmount,
        title: item.opportunityName,
        date: item.dueDate,
        status: item.isOpen,
        stage: item.stageName,
        currency: item.currencySymbol,
        isFavourite: item.isFavourite,
        opportunityId: item.opportunityId,
        refType: item.refType,
      };
    });
      setComponentData(apiData);
  }, [opportunities]);
  

  const Style = {
    card: {
      borderRadius: "12px",
    },
    button: {
      borderRadius: "8px",
      //fontSize: "22px",
      // width: "max-content",
        float: "right",
      marginTop: "10px",
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
      <GenericCard header={"Opportunites"} viewAll={false}>
              {componentData?.map((item) => (
            <div key={item.id} style={styleSet.rowStyle}>
                
            <Space direction="vertical">
              <Row>
                <Col lg={24} xl={20}>
                  <div style={theme.primaryHeader}>{item.title}</div>
                  <div style={theme.secondaryHeader}>
                    {item.currency}
                    <RupeeOrNonRupee amount={item.amount} />
                  </div>
                  <div style={theme.secondaryHeader}>{item.stage}</div>
                </Col>
                <Col lg={24} xl={4} style={theme.dFlex}>
                  <ScRate
                    allowHalf={false}
                    count={1}
                    style={{
                      marginRight: 15,
                      color: "#354081",
                    }}
                    value={item.isFavourite}
                            />
                             <FontAwesomeIcon icon={faEllipsisHAlt} size={"2x"} style={{marginTop:8}} />
                </Col>
              </Row>
              <Row>
                <Col lg={24} xl={20}></Col>

                <Col lg={24} xl={4}>
                  {componentData.status != null ? (
                    <GenericBadge badgeBody={item.status} />
                  ) : (
                    <GenericBadge badgeBody={"close"} />
                  )}
                  {/* <GenericBadge badgeBody={item.status} />    */}
                </Col>
              </Row>
              <Row>
                <Col lg={24} xl={16}>
                  {/* {item !== undefined && (
                                        <SmallUserDetail item={item} />
                                    )
                                    } */}
                  <SmallUserDetail name={item.name} role={item.role} />
                </Col>
                <Col lg={24} xl={8}>
                  <div style={theme.secondaryHeader}>{item.date}</div>
                  <div>Due Date</div>
                </Col>
              </Row>
            </Space>
          </div>
        ))}
        <Col span={24}>
          <Button size={"large"} style={Style.button} onClick={showModal}>
            View All
          </Button>
        </Col>
      </GenericCard>
      <Modal
        // title="Accounts"
        visible={isModalVisible}
        width={1600}
        onCancel={handleCancel}
        footer={
          [
            //             <Button key="back" onClick={handleCancel}>
            //                 Close
            //   </Button>,
          ]
        }
      >
        <Col>
          <OpportunityTableModal />
        </Col>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
    return {
      opportunities: state.portfolioOverview.opportunities,
    };
  };

export default connect(mapStateToProps)(Opportunities);

import { Card, Col, Row, Typography, Radio } from "antd";
import { fontSet } from "../../theme";
import Avatar from "antd/lib/avatar/avatar";
import { theme } from "../../theme";
import GenericBadge from "../GenericBadge/GenericBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/pro-solid-svg-icons";
import { useState, useEffect } from "react";
import { uniqueByKey } from "./TopbarUtils";
import { useHistory } from "react-router-dom";
import { NoDataFound } from "./NoDataFound";

const defaultValues = {
  name: "Peter Dudchenko",
  family: "Sandralock Family",
  id: "BD190048",
  tagName: "Wealth",
  secondaryTag: "Mutual Fund",
  add: "Central ave",
  city: "Albany",
};
export const TopBarCustomers = ({
  clientList = [defaultValues],
  showFilter = false,
  allowScroll = false,
  onClose = () => {
    console.log("clicked");
  },
}) => {
  const styleSet = {
    name: {
      fontSize: fontSet.heading.large,
    },
  };
  const history = useHistory();

  const [filterArray, setFilterArray] = useState([]);
  const [tabValue, setTabValue] = useState("All");
  const [clientFilterList, setClientFilterList] = useState(clientList);

  useEffect(() => {
    let result = uniqueByKey(clientList, "customerType");
    setFilterArray(result);
    setClientFilterList(clientList);
  }, [clientList]);

  const changeTabPosition = (e) => {
    setTabValue(e.target.value);
    if (e.target.value === "All") {
      setClientFilterList(clientList);
    } else {
      setClientFilterList(
        clientList.filter((item) => item.customerType === e.target.value)
      );
    }
  };

  const onCellDefault = (row) => {
    const customerOnboardingIds = clientFilterList.map((item) => item.clientId);
    // May be used in future
    // const customerOnboardingIds = clientFilterList.map((item) => item.customerId);

    // const index = [
    //   ...clientFilterList.map((item, index) => {
    //     if (item.clientId === row.clientId) {
    //       // if (item.customerId === row.customerId) {
    //       return index;
    //     } else return null;
    //   }),
    // ].filter((item) => item !== null);

    const toObject = {

      pathname: `/dashboard/Profile`,
      state: {
        customerOnboardingtIds: customerOnboardingIds, 
        clientObject: clientFilterList[0],
      },

    };

    history.push(toObject);
    onClose();
  };

  const CustomerWrapper = () => {
    return clientFilterList.length > 0 ? (
      <CustomerCardView />
    ) : (
      <NoDataFound name={"Client"} />
    );
  };

  const CustomerCardView = () => {
    return clientFilterList.map((ins) => {
      return (
        <Col span={8}>
          <Card style={{ borderRadius: "12px" }}>
            <Row onClick={() => onCellDefault(ins)}>
              <Col sm={6}>
                {ins.profileImage != null ? (
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
                    size={75}
                    src={ins.profileImage}
                  ></Avatar>
                ) : (
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
                    size={75}
                  >
                    {ins.profileInitial}
                  </Avatar>
                )}
              </Col>
              <Col
                sm={12}
                style={(styleSet.containerStyle, { marginLeft: "15px" })}
              >
                <Row style={theme.profileName}>
                  <Typography.Text
                    ellipsis={{ tooltip: [ins.fullName] }}
                    style={{ width: "192px" }}
                  >
                    {ins.fullName}
                  </Typography.Text>
                </Row>
                <Row style={{ marginTop: "5px" }}>
                  <div style={theme.profileTag}>
                    <Typography.Text
                      ellipsis={{ tooltip: [ins.address] }}
                      style={{
                        width: "192px",
                        marginLeft: "5px",
                      }}
                    >
                      {ins.clientCode + " | " + ins.familyName}
                    </Typography.Text>
                  </div>
                </Row>
                <Row style={{ marginTop: "5px" }}>
                  <div style={theme.profileTag}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <Typography.Text
                      ellipsis={{ tooltip: [ins.address] }}
                      style={{
                        width: "192px",
                        marginLeft: "5px",
                      }}
                    >
                      {ins.address + ", " + ins.permCity}
                    </Typography.Text>
                  </div>
                </Row>
                <Row style={{ marginTop: "5px"}}>
                  <GenericBadge badgeBody={ins.legalStatus} />
                </Row>
              </Col>
              <Col sm={5}>
                <Row style={theme.profileTag}>{ins.currencySymbol + " "}{ins.netAsset}</Row>
                <Row style={theme.profileTag}>{"AUM"}</Row>

                <Row style={{ marginTop: "45px"}}>
                  <span style={theme.profileTag}>
                    <FontAwesomeIcon icon={faPhoneAlt} />{""}
                    {ins.mobileNo}
                  </span>
                </Row>
                </Col>
            </Row>
          </Card>
        </Col>
      );
    });
  };
  return (
    <>
      <Row style={{ width: "100%" }}>
        {showFilter && filterArray.length > 0 ? (
          <Radio.Group
            value={tabValue}
            buttonStyle="solid"
            onChange={changeTabPosition}
          >
            <Radio.Button value="All">All</Radio.Button>
            {filterArray.map((ele) => {
              return (
                <Radio.Button
                  style={{ marginLeft: "5px" }}
                  value={ele.customerType}
                >
                  {ele.customerType}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        ) : null}
      </Row>
      {allowScroll ? (
        <div style={{ overflow: "auto", height: "550px", marginTop: "10px" }}>
          <Row gutter={[16, 16]}>
            <CustomerWrapper />
          </Row>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          <CustomerWrapper />
        </Row>
      )}
    </>
  );
};

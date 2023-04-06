import React from "react";
import { fontSet, theme } from "../../theme";
import { Row, Col, Button } from "antd";
import { Opportunityview } from "./Opportunityview";
import { TopBarCustomers } from "./TopBarCustomers";
import { Product } from "./Product";
import { TopBarProspects } from "./TopBarProspects";
import { TopBarLeads } from "./TopBarLeads";
import { retunListLength, returSliceListFromObject } from "./TopbarUtils";

export const TopBarSearchAll = (props) => {
  const {
    onViewAllPress,
    searchResult,
    onClose = () => {
      console.log("Clicked");
    },
  } = props;
  const styleSet = {
    cardStyle: {
      text: fontSet.heading.large,
    },
    card: {
      borderRadius: "12px",
    },
    subCard: {
      borderRadius: "12px",
      marginTop: "40%",
    },
  };

  return (
    <>
      <card style={styleSet.card}>
        <Row style={styleSet.cardStyle}>
          <Col span={24}>
            <Row style={theme.profileTag}>
              <Col span={21}>
                Products (
                {retunListLength(searchResult, "searchProductResponse")})
              </Col>
              {retunListLength(searchResult, "searchProductResponse") > 2 ? (
                <Button
                  type="link"
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => onViewAllPress("products")}
                >
                  View All
                </Button>
              ) : null}
            </Row>
            <Product
              productList={returSliceListFromObject(
                searchResult,
                "searchProductResponse",
                2
              )}
            />
          </Col>
        </Row>
      </card>
      <card style={styleSet.subCard}>
        <Row style={styleSet.cardStyle}>
          <Col span={24}>
            <Row style={theme.profileTag}>
              <Col span={21}>
                Opportunities (
                {retunListLength(searchResult, "searchOpportunityResponse")})
              </Col>
              {retunListLength(searchResult, "searchOpportunityResponse") >
              2 ? (
                <Button
                  type="link"
                  onClick={() => onViewAllPress("opportunities")}
                >
                  View All
                </Button>
              ) : null}
            </Row>
            <Opportunityview
              opprotunityList={returSliceListFromObject(
                searchResult,
                "searchOpportunityResponse",
                2
              )}
              onClose={onClose}
            />
          </Col>
        </Row>
      </card>
      <card style={styleSet.subCard}>
        <Row style={styleSet.cardStyle}>
          <Col span={24}>
            <Row style={theme.profileTag}>
              <Col span={21}>
                Client (
                {retunListLength(searchResult, "searchClientResponse")})
              </Col>
              {retunListLength(searchResult, "searchClientResponse") > 3 ? (
                <Button type="link" onClick={() => onViewAllPress("customers")}>
                  View All
                </Button>
              ) : null}
            </Row>
            <TopBarCustomers
              clientList={returSliceListFromObject(
                searchResult,
                "searchClientResponse",
                3
              )}
              onClose={onClose}
            />
          </Col>
        </Row>
      </card>
      <card style={styleSet.subCard}>
        <Row style={styleSet.cardStyle}>
          <Col span={24}>
            <Row style={theme.profileTag}>
              <Col span={21}>
                Prospects (
                {retunListLength(searchResult, "searchProspectResponse")})
              </Col>
              {retunListLength(searchResult, "searchProspectResponse") > 3 ? (
                <Button type="link" onClick={() => onViewAllPress("prospects")}>
                  View All
                </Button>
              ) : null}
            </Row>
            <TopBarProspects
              prospectList={returSliceListFromObject(
                searchResult,
                "searchProspectResponse",
                3
              )}
              onClose={onClose}
            />
          </Col>
        </Row>
      </card>
      <card style={styleSet.subCard}>
        <Row style={styleSet.cardStyle}>
          <Col span={24}>
            <Row style={theme.profileTag}>
              <Col span={21}>
                Leads ({retunListLength(searchResult, "searchLeadResponse")})
              </Col>
              {retunListLength(searchResult, "searchLeadResponse") > 3 ? (
                <Button type="link" onClick={() => onViewAllPress("leads")}>
                  View All
                </Button>
              ) : null}
            </Row>

            <TopBarLeads
              leadsList={returSliceListFromObject(
                searchResult,
                "searchLeadResponse",
                3
              )}
              onClose={onClose}
            />
          </Col>
        </Row>
      </card>
    </>
  );
};

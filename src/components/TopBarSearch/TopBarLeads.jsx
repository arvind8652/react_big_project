import { Card, Col, Row, Typography } from "antd";
import { fontSet } from "../../theme";
import Avatar from "antd/lib/avatar/avatar";
import { theme } from "../../theme";
import GenericBadge from "../GenericBadge/GenericBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/pro-solid-svg-icons";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";
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
export const TopBarLeads = ({
  leadsList = [],
  TopBarLeads = defaultValues,
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

  const onCellDefault = (row) => {
    const filters = {
      branch: null,
      category: null,
      filterParam: null,
      firstName: null,
      interestLevel: null,
      relationshipManager: null,
      sorting: null,
      source: null,
      type: null,
    };
    const toObject = {
      pathname: `/dashboard/MyLead/leadView`,
      state: { leadId: row.leadId, rowNumber: row.ids, filters: filters }, 
    };

    history.push(toObject);
    onClose();
  };

  const LeadsWrapper = () => {
    return leadsList.length > 0 ? (
      <LeadsCardView />
    ) : (
      <NoDataFound name={"Leads"} />
    );
  };

  const LeadsCardView = () => {
    return leadsList.map((ele) => {
      return (
        <Col span={8}>
          <Card style={{ borderRadius: "12px" }}>
            <Row onClick={() => onCellDefault(ele)}>
              <Col>
                {ele.profileImage != null ? (
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
                    size={75}
                    src={ele.profileImage}
                  ></Avatar>
                ) : (
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
                    size={75}
                  >
                    {" "}
                    {ele.profileInitial}
                  </Avatar>
                )}
              </Col>
              <Col style={(styleSet.containerStyle, { marginLeft: "15px" })}>
                <Row
                  style={theme.profileName}
                >{`${ele.firstName} ${ele.lastName}`}</Row>
                <Row style={{ marginTop: "5px" }}>
                  <div style={theme.profileTag}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <Typography.Text
                      ellipsis={{ tooltip: [ele.address, ele.city] }}
                      style={{
                        width: "192px",
                        marginLeft: "5px",
                      }}
                    >
                      {ele.address},{ele.city}
                    </Typography.Text>
                  </div>
                </Row>
                <Row style={{ marginTop: "5px" }}>
                  <GenericBadge badgeBody={ele.category} />
                  {ele.interestlevel === "H" ? (
                    <span style={{ marginLeft: "15px" }}>
                      <FontAwesomeIcon
                        icon={faHotjar}
                        style={{ color: "#EF7C5B" }}
                      />
                    </span>
                  ) : null}
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
      {allowScroll ? (
        <div style={{ overflow: "auto", height: "550px", marginTop: "10px" }}>
          <Row gutter={[16, 16]}>
            <LeadsWrapper />
          </Row>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          <LeadsWrapper />
        </Row>
      )}
      {}
    </>
  );
};

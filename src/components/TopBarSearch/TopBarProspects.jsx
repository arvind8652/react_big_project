import { Card, Col, Row, Typography, Radio } from "antd";
import { fontSet } from "../../theme";
import Avatar from "antd/lib/avatar/avatar";
import { theme } from "../../theme";
import GenericBadge from "../GenericBadge/GenericBadge"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/pro-solid-svg-icons";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";
import { faFileCheck } from "@fortawesome/pro-light-svg-icons";
import { useState, useEffect } from "react";
import { uniqueByKey } from "./TopbarUtils";
import { useHistory } from "react-router-dom";
import { NoDataFound } from "./NoDataFound";

export const TopBarProspects = ({
  prospectList = [],
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
  const [filterArray, setFilterArray] = useState([]);
  const [tabValue, setTabValue] = useState("All");
  const [prospectListFilter, setprospectListFilter] = useState(prospectList);
  const history = useHistory();

  useEffect(() => {
    let result = uniqueByKey(prospectList, "interestlevel");
    let qualificationResult = uniqueByKey(prospectList, "qualificationStatus");
    let resp = [];
    if (result.length > 0) {
      result.map((ele) => {
        let obj = {
          key: ele.interestlevel,
          value: ele.interestlevelName,
        };
        resp.push(obj);
      });
    }
    if (qualificationResult.length > 0) {
      qualificationResult.map((ele) => {
        let obj = {
          key: ele.qualificationStatus,
          value: ele.qualificationStatusName,
        };
        resp.push(obj);
      });
    }

    setFilterArray(resp);
    setprospectListFilter(prospectList);
  }, [prospectList]);

  const changeTabPosition = (e) => {
    setTabValue(e.target.value);
    if (e.target.value === "All") {
      setprospectListFilter(prospectList);
    } else if (e.target.value === "H" || e.target.value === "C") {
      setprospectListFilter(
        prospectList.filter((item) => item.interestlevel === e.target.value)
      );
    } else if (e.target.value === "N" || e.target.value === "Q") {
      setprospectListFilter(
        prospectList.filter(
          (item) => item.qualificationStatus === e.target.value
        )
      );
    }
  };

  const onCellDefault = (row) => {
    const prospectIds = prospectListFilter.map((item) => item.prospectId);
    const index = [
      ...prospectListFilter.map((item, index) => {
        if (item.prospectId === row.prospectId) {
          return index;
        } else return null;
      }),
    ].filter((item) => item !== null);
    const toObject = {
      pathname: `/dashboard/MyProspect/ProspectView`,
      state: {
        prospectIds: prospectIds,
        rowIndex: index[0],
      },
    };
    history.push(toObject);
    onClose();
  };

  const ProspectWrapper = () => {
    return prospectListFilter.length > 0 ? (
      <ProspectCardView />
    ) : (
      <NoDataFound name={"Prospects"} />
    );
  };
  const ProspectCardView = () => {
    return prospectListFilter.map((ele) => {
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
                    {ele.profileInitial}
                  </Avatar>
                )}
              </Col>
              <Col style={(styleSet.containerStyle, { marginLeft: "15px" })}>
                <Row style={theme.profileName}>
                  <Typography.Text
                    ellipsis={{
                      tooltip: [`${ele.firstName} ${ele.lastName}`],
                    }}
                    style={{ width: "192px" }}
                  >
                    {`${ele.firstName} ${ele.lastName}`}
                  </Typography.Text>
                </Row>
                <Row style={{ marginTop: "5px" }}>
                  <div style={theme.profileTag}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <Typography.Text
                      ellipsis={{
                        tooltip: [ele.address, ele.city],
                      }}
                      style={{ width: "192px", marginLeft: "10px" }}
                    >
                      {ele.address},{ele.city}
                    </Typography.Text>
                  </div>
                </Row>
                <Row style={{ marginTop: "5px" }}>
                  <GenericBadge badgeBody={ele.customerCategory} />
                  {ele.interestlevel === "H" ? (
                    <span style={{ marginLeft: "15px" }}>
                      <FontAwesomeIcon
                        icon={faHotjar}
                        style={{ color: "#EF7C5B" }}
                      />
                    </span>
                  ) : null}
                  {ele.qualificationStatus === "Q" ? (
                    <span style={{ marginLeft: "15px" }}>
                      <FontAwesomeIcon
                        icon={faFileCheck}
                        style={{ color: "#696A91" }}
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
                <Radio.Button style={{ marginLeft: "5px" }} value={ele.key}>
                  {ele.value}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        ) : null}
      </Row>
      {allowScroll ? (
        <div style={{ overflow: "auto", height: "550px", marginTop: "10px" }}>
          <Row gutter={[16, 16]}>
            <ProspectWrapper />
          </Row>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          <ProspectWrapper />
        </Row>
      )}
    </>
  );
};

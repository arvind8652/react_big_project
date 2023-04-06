import { List, Avatar, Tag, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { apiRequestUrls } from "../../../config/apiConfig";

import {
  faMapMarkerAlt,
  faClipboardCheck,
  faPhoneAlt
} from "@fortawesome/pro-solid-svg-icons";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";

import { palette } from "../../../theme";

const defaultValues = [];

const styleSet = {
  avatar: {
    color: "#fff",
    backgroundColor: "#696A91",
    fontSize: "1.8rem",
    padding: "0.65em",
    width: "2.5em",
    height: "2.5em"
  },
  avSize: "220",
  faviconStyleMargin: { marginRight: "1em" },
  avatarPic: {
    color: "#fff",
    backgroundColor: "#696A91",
    width: "5em",
    height: "5em"
  }
};

const Prospects = ({ data = defaultValues }) => {
  data = useSelector((state) => state?.favouritesReducer.PROSPECTADD);
  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.clientCode}>
          <List.Item.Meta
            avatar={
              item.profileImage !== "" ? (
                <Avatar
                  style={styleSet.avatarPic}
                  src={"data:image/jpeg;base64," + item.profileImage}
                  size={styleSet.avSize}
                ></Avatar>
              ) : (
                <Avatar style={styleSet.avatar} size={styleSet.avSize}>
                  {item.profileInitial}
                </Avatar>
              )
            }
            title={
              <p
                style={{
                  marginBottom: "0px",
                  color: "#222747",
                  fontSize: "1rem",
                  width: "75%"
                }}
              >
                {item.name}
              </p>
            }
            description={
              <>
                <Row>
                  <Col>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      size="small"
                      style={{
                        ...styleSet.faviconStyleMargin,
                        marginRight: "5px",
                        color: palette.text.main
                      }}
                    />
                  </Col>
                  <Col>
                    {item.city}, {item.state}
                  </Col>
                </Row>
                <Row style={{ marginTop: "0.3em" }}>
                  <Col span={7}>
                    {item.customerCategory && (
                      <Tag
                        style={{
                          borderRadius: "1em",
                          color: "#696A91",
                          backgroundColor: "#F0F2FB",
                          fontSize: "1rem",
                          marginRight: "2.5em"
                        }}
                      >
                        {item.customerCategory}
                      </Tag>
                    )}
                  </Col>
                  <Col span={2}>
                    <FontAwesomeIcon
                      icon={faHotjar}
                      size="small"
                      style={{
                        ...styleSet.faviconStyleMargin,
                        color: "#EF7C5B"
                      }}
                    />
                  </Col>
                  <Col span={2}>
                    <FontAwesomeIcon
                      icon={faClipboardCheck}
                      size="small"
                      style={{
                        ...styleSet.faviconStyleMargin,
                        color: "#696A91"
                      }}
                    />
                  </Col>
                  {item.mobile && (
                    <Col flex={3} offset={3}>
                      <FontAwesomeIcon
                        icon={faPhoneAlt}
                        size="small"
                        style={{
                          marginRight: "0.4em",
                          color: palette.text.main
                        }}
                      />
                      {item.mobile}
                    </Col>
                  )}
                </Row>
              </>
            }
          />
        </List.Item>
      )}
    ></List>
  );
};

export default Prospects;

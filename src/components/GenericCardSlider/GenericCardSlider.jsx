import React from "react";
import GenericCard from "../../components/GenericCard/GenericCard";
// import { feeds } from "./constant";
import { Row, Col, Carousel, Button } from "antd";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericBadge from "../../components/GenericBadge/GenericBadge";
import GenericButton from "../../components/GenericButton/GenericButton";
import { theme } from "../../theme";
import "antd/dist/antd.css";
// function onChange(a, b, c) {
// }

// const contentStyle = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

const feedsList = {
  slides: [
    {
      id: 0,
      image: "",
    },
    {
      id: 1,
      image: "",
    },
    {
      id: 2,
      image: "",
    },
  ],
  feedTitle: "What does the mark look like ahead of festival season?",
  feedBody:
    "Lorem ipsum dolor sit amet. Et asperiores nisi et omnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ip...",
  tag: "Wealth",
  type: "book",
  date: "22 May 2020",
};

const onChange = (a, b, c) => {
  console.log(a, b, c);
};

const styleSet = {
  //Carousel Style
  contentStyle: {
    height: "296.72px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundColor: "#364d79",
    marginTop: "36px",
    borderRadius: "7px 7px 0px 0px",
  },
  feedsStyle: {
    button: {
      borderRadius: "8px",
      fontSize: "22px",
      width: "max-content",
    },
  },

  //
};

const card = () => {
  return (
    <GenericCard header={"Feeds"} viewAll={true}>
      <Row>
        <Col>
          Carousel
          {/* <Carousel afterChange={onChange}>
            <div>
              <h3 style={styleSet.contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={styleSet.contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={styleSet.contentStyle}>3</h3>
            </div>
          </Carousel> */}
        </Col>
      </Row>
      <Row style={theme.headerM}>
        <Col span={12} style={theme.dFlex}>
          <div>
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div>
            <GenericBadge badgeBody={feedsList.tag} />
          </div>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          {feedsList.date}
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ padding: "0px 12px" }}>
          <Row style={{ marginBottom: "12px" }}>
            <Col>
              <div style={{ ...theme.primaryHeader, ...theme.headerM }}>
                {feedsList.feedTitle}
              </div>
              <div style={theme.secondaryBody}>{feedsList.feedBody}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </GenericCard>
  );
};

const GenericCardSlider = () => {
  return (
    <GenericCard style={styleSet.contentStyle}>
      <Carousel afterChange={onChange}>
        <div>
          <h3 style={styleSet.contentStyle}>{card}</h3>
        </div>
        <div>
          <h3 style={styleSet.contentStyle}>{card}</h3>
        </div>
        <div>
          <h3 style={styleSet.contentStyle}>{card}</h3>
        </div>
        <div>
          <h3 style={styleSet.contentStyle}>{card}</h3>
        </div>
      </Carousel>
    </GenericCard>
  );
};

export default GenericCardSlider;

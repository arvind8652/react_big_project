import React from "react";
import { useSelector } from "react-redux";

import { List } from "antd";

import { StarFilled, StarOutlined } from "@ant-design/icons";

import "../../TopBar/topBar.scss";

const Product = () => {
  const data = useSelector((state) => state?.favouritesReducer.SECURITY);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={false}
      dataSource={data}
      renderItem={(item) => <ProductItem data={item} />}
    />
  );
};

const ProductItem = ({ data }) => {
  const styleSet = {
    title: {
      fontSize: "24px",
      color: "#222747"
    },
    name: {
      fontSize: "18px",
      color: "#222747"
    },
    description: {
      fontSize: "14px",
      color: "#696A91"
    },
    badge: {
      backgroundColor: "#F0F2FB",
      borderRadius: "16px",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingLeft: "10px",
      paddingRight: "10px",
      color: "#696A91",
      fontSize: "18px"
    },
    type: {
      fontSize: "14px",
      color: "#696A91",
      textAlign: "right"
    }
  };

  function renderStars() {
    let i = 0;
    let stars = [];
    let max = 5;
    for (i; i < max; i++) {
      if (i < data.grade) {
        stars.push(<StarFilled />);
      } else {
        stars.push(<StarOutlined />);
      }
    }
    return stars;
  }

  return (
    <List.Item
      key={data.securityName}
      extra={
        <>
          <div style={styleSet.badge}>{data.assetGroup}</div>
          <div style={styleSet.type}>{data.assetGroup}</div>
        </>
      }
    >
      <div style={styleSet.title}>{data.securityName}</div>
      <div className="productItem">
        <div style={styleSet.description}>{data.isinCode + " "}|</div>
        {renderStars()}
      </div>
    </List.Item>
  );
};

export default Product;

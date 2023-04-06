import React from 'react';
import { useSelector } from "react-redux";

import { List } from "antd";

const Opportunity = () => {
  const data = useSelector((state) => state?.favouritesReducer.OPPORTUNITYADD);
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={false}
      dataSource={data}
      renderItem={(item) => <OpportunityItem data={item} />}
    />
  );
};

const OpportunityItem = ({ data }) => {
  const styleSet = {
    title: {
      fontSize: "1.2rem",
      color: "#222747"
    },
    name: {
      fontSize: "0.75rem",
      color: "#222747"
    },
    description: {
      fontSize: "0.8rem",
      color: "#696A91"
    }
  };

  return (
    <List.Item
      key={data.opportunityName}
      extra={
        <>
          <div style={styleSet.name}>{data.name}</div>
          <div style={styleSet.description}>
            {data.currencySymbol} {data.targetAmount}
          </div>
        </>
      }
    >
      <div>
        <div style={styleSet.title}>{data.opportunityName}</div>
        <div style={styleSet.description}>{data?.description}</div>
      </div>
    </List.Item>
  );
};

export default Opportunity;

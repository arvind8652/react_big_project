import { useState } from 'react';
import { Card } from 'antd';
import { theme } from '../../theme';

/*
    EXAMPLE FOR IMPLEMENTATION

    const renderObject = {
        fundDetails: {
            title: 'Fund Details',
            render: <FundDetails />,
        },
        timeline: {
            title: 'Timeline',
            render: <OrderVerticalTimeline />,
        },
    };

*/

const GenericCardWithTabs = ({
  renderObject = {},
  activeTabKeyName = null,
  headStyle = theme.cardHeaderStyle,
  titleStyle = {},
  useCardsStyle = true
}) => {
  const [selectedTab, onTabChange] = useState(
    activeTabKeyName ? activeTabKeyName : Object.keys(renderObject)[0]
  );

  const styles = {
    cardStyle: { borderRadius: "8px", border: "1px solid rgb(203, 214, 255)" },
    tabBarActive: {
      color: "#354081",
      fontSize: "18px"
    },
    tabBarNormal: {
      color: "#898EA9",
      fontSize: "18px"
    }
  };

  const titleDefaultStyle = (key) => {
    const defaultStyleObj =
      selectedTab === key ? styles.tabBarActive : styles.tabBarNormal;

    return { ...defaultStyleObj, ...titleStyle };
  };

  const tabList = Object.keys(renderObject).map((key) => {
    return {
      key: key,
      tab: <span style={titleDefaultStyle(key)}>{renderObject[key].title}</span>
    };
  });

  return (
    <Card
      tabList={tabList}
      activeTabKey={selectedTab}
      headStyle={headStyle}
      onTabChange={(key) => onTabChange(key)}
      style={useCardsStyle ? styles.cardStyle : {}}
    >
      {renderObject[selectedTab].render}
    </Card>
  );
};

export default GenericCardWithTabs;

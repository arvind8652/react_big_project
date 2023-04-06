import React from "react";
import { Badge, Tooltip, Typography } from "antd";
const { Text } = Typography;
const GenericBadge = ({
  badgeBody = " badgeBody",
  width = "60px",
  marginValue = "5px",
}) => {
  const style = {
    borderRadius: "16px",
    backgroundColor: "#F0F2FB",
    width: "max-content",
    padding: "4px 16px",
    maxWidth: "150px",
    margin: marginValue,
  };
  return (
    <>
      {/* <div style={style}> */}
      <Badge>
        <div style={style}>
          <Tooltip title={badgeBody}>
            <Text ellipsis={true} style={{ lineHeight: "20px" }}>
              {/* NOTE: Fragment is necessary to avoid showing the title */}
              {badgeBody}
            </Text>
          </Tooltip>
        </div>
      </Badge>
      {/* </div> */}
    </>
  );
};
export default GenericBadge;

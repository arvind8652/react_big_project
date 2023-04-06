import React, { useEffect } from "react";
import { Row, Col } from "antd";
import AvatarLogo from "../../components/Avatar/AvatarLogo";
import { AvatarSize } from "../../constants/AvatarSize";
import { theme } from "../../theme";
const SmallUserDetail = ({
  name = "Chris Ramos",
  role = "Prospect",
  img = "",
  avatarSize
}) => {
  const styleSet = {
    rowStyle: {}
  };

  return (
    <div>
      <Row style={styleSet.rowStyle}>
        <Col xxl={6} xl={24}>
          <AvatarLogo
            imgsrc={img}
            profileName={"image"}
            avatarSize={avatarSize || AvatarSize.small}
          />
        </Col>
        <Col xxl={18} xl={24}>
          <div style={theme.secondaryHeader}>{ name} </div>
          <div style={theme.secondaryHeader}>{role} </div>

        </Col>
      </Row>
    </div>
  );
};

export default SmallUserDetail;

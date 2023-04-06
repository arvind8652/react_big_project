import { Col, Row, Typography, Rate, Tooltip, Progress, Space } from "antd";
import { palette, fontSet, avatar, theme } from "../../theme";
import Avatar from "antd/lib/avatar/avatar";
import GenericBadge from "../GenericBadge/GenericBadge";

const defaultValues = {
  name: "BDO Global Equity...",
  family: "Sandralock Family",
  id: "BD190048",
  tagName: "Equity",
  secondaryTag: "Mutual Fund",
  rate: 2,
  securityInitials: "GT",
  iSIN_Code: "A0123",
};
const UserStarDetails = ({ UserStarDetails }) => {
  const { Text } = Typography;

  const styleSet = {
    name: {
      fontSize: fontSet.heading.large,
    },
    leftSpace: {
      marginLeft: "2rem",
    },
    leftSpaceLess: {
      marginLeft: "1rem",
    },
    smallAvatar: {
      height: "50px",
      width: "50px",
      align: "center",
      backgroundColor: "#FAF9F6",
      color: "#6D9BF1	",
      fontWeight: "bold",
    },
  };
  return (
    <>
      <Row gutter={[16, 0]}>
        <Col xxl={5} xl={5} lg={24}>
          <Avatar
            size={45}
            style={styleSet.smallAvatar}
            icon={UserStarDetails.profileImg ? UserStarDetails.profileImg : UserStarDetails.initial}
          />
        </Col>
        <Col xxl={19} xl={19} lg={24} style={styleSet.containerStyle}>
          <Row>
            <Col span={24}>
              <div
                style={{
                  ...theme.profileName,
                  ...{ maxWidth: "250px", width: "250px" },
                }}
              >
                <Tooltip title={UserStarDetails.name}>
                  <Text ellipsis={true} style={UserStarDetails.issuer && styleSet.leftSpace}>
                    {/* NOTE: Fragment is necessary to avoid showing the title */}
                    {UserStarDetails.name}
                  </Text>
                </Tooltip>
              </div>
            </Col>
          </Row>
          <Row style={styleSet.bannerId}>
            <Col span={24} style={UserStarDetails.issuer && styleSet.leftSpace}>
              {UserStarDetails.id ? UserStarDetails.id : UserStarDetails.iSIN_Code}|
              {
                <Rate
                  defaultValue={UserStarDetails.rating ? UserStarDetails.rating : UserStarDetails.rate}
                  style={{
                    fontSize: "14px",
                    display: "inline-block",
                    verticalAlign: "middle",
                    color: "#48528D",
                  }}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col style={UserStarDetails.issuer && styleSet.leftSpaceLess}>
              <GenericBadge badgeBody={UserStarDetails?.assetGroupName ?? ""} />
              <GenericBadge badgeBody={UserStarDetails?.assetTypeName ?? ""} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default UserStarDetails;

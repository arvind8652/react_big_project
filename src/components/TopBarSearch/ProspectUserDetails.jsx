import { Col, Row, Rate, Typography } from "antd";
import { fontSet } from "../../theme";
import { theme } from "../../theme";

const defaultValues = {
  name: "BDO Global Equity",
  family: "Sandralock Family",
  id: "BD190048",
  tagName: "Equity",
  secondaryTag: "Mutual Fund",
};
export const ProspectUserDetails = ({
  ProspectUserDetails = defaultValues,
}) => {
  const styleSet = {
    name: {
      fontSize: fontSet.heading.large,
    },
  };
  return (
    <>
      <Row>
        <Col style={(styleSet.containerStyle, { marginLeft: "10px" })}>
          <Row style={theme.profileName}>
            <Typography.Text
              ellipsis={{ tooltip: [ProspectUserDetails.securityName] }}
              style={{
                width: "192px",
                marginLeft: "10px",
              }}
            >
              {ProspectUserDetails.securityName}
            </Typography.Text>
          </Row>
          <Row style={theme.profileTag}>
            {ProspectUserDetails.isinCode}|
            {
              <Rate
                style={{
                  fontSize: "12px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  color: "#48528D",
                }}
                value={ProspectUserDetails.rating}
              />
            }
          </Row>
        </Col>
      </Row>
    </>
  );
};

import { Avatar, Row, Col } from "antd";
import { fontSet } from "../../theme";
import GenericBadge from "../GenericBadge/GenericBadge";

const defaultValues = {
  name: "Alexandra Sandralock",
  family: "Sandralock Family",
  id: "Asan102104",
  tags: "Wealth",
};
const UserDetail = ({
  name = defaultValues.name,
  family = defaultValues.family,
  id = defaultValues.id,
  tags = defaultValues.tags,
}) => {
  const styleSet = {
    name: {
      fontSize: fontSet.heading.large,
    },
  };
  return (
    <>
      <Row>
        <Col span={4}>
          <Avatar size={56} />
        </Col>
        <Col span={20}>
          <div style={styleSet.name}>{name}</div>
          <div>
            <span>
              {id} | {family}
            </span>
          </div>
          <div>
            <GenericBadge badgeBody={tags} />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default UserDetail;

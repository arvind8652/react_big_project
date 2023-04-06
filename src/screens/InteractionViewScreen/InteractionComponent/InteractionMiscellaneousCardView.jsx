import { Row, Space, Card,Button, Col } from "antd";
import TextSubText from "../../ProspectViewScreen/ProspectComponent/TextSubText";
import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../InteractionViewScreen.scss"

const MiscellaneousCardView = (props) => {
  const miscellaneousDetails = props.detail;
  if (!miscellaneousDetails) {
    return null;
  }
  return (
    <Card
      title="Miscellaneous"
      style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
      className="interactionViewCardDetails"
      // extra={
      //   <Button
      //     type="text"
      //     style={{ color: "#354081" }}
      //     // onClick={() => setAddAttachmentModalVisible(true)}
      //   >
      //     Add <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
      //   </Button>
      // }
    >
      <Space
        direction="vertical"
        class="prospect-details"
        style={{ width: "100%" }}
        size={5}
      >
        <Row>
          {miscellaneousDetails.length === 0 ? (
            <Col type="flex" align="middle" span={24}>
              No Records Found
            </Col>
          ) : (
              miscellaneousDetails.map((item, index) => {
                return (
                  <Col span={8}>
                    <TextSubText
                      text={item.fieldValueName}
                      subtext={item.fieldLabel}
                    />
                  </Col>
                );
              })
            )}
        </Row>
      </Space>
    </Card>
  );
};

export default MiscellaneousCardView;

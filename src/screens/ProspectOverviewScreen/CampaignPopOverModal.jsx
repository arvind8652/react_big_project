import { Modal, Card, Typography } from "antd";

export default function CampaignPopOverModal(props) {
  return (
    <Modal
      show={props.showModal}
      setShow={(val) => props.setShowModal(val)}
      title={props.title}
      // graph={props.graph}
    >
      <Card title={<Typography.Text>Campaign Effectiveness</Typography.Text>}>
        {props.title}
      </Card>
    </Modal>
  );
}

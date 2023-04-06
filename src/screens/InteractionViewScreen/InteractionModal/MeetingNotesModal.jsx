import { Modal, Row, Form, Typography, Divider, Button } from "antd";

import TextArea from "antd/lib/input/TextArea";

const { Title } = Typography;

const MeetingNotesModal = (props) => {
  return (
    <>
      <Modal
        centered
        visible={props.modal.open}
        onCancel={() => props.setModal({ ...props.modal, open: false })}
        footer={null}
        className="occurence-modal"
        width={900}
      >
        <div>
          <Title level={3} style={{ color: "#354081" }}>
            Meeting Notes
          </Title>
          <Divider />
          <Form layout="vertical">
            <Form.Item>
              <TextArea rows={15} value={props.modal.notes}>
                {props.modal.notes}
              </TextArea>
            </Form.Item>
          </Form>
          <Row justify="end">
            <Button type="primary" onClick={() => props.setModal(false)}>
              Done
            </Button>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default MeetingNotesModal;

import { Modal, Row, Typography, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/pro-solid-svg-icons";

import "./modalView.scss";

const { Title } = Typography;

export default function ModalView(props) {
  return (
    <Modal
      centered
      visible={props.show}
      onCancel={() => props.setShow(false)}
      closeIcon={<></>}
      footer={null}
      className="modal-container"
      width="auto"
    >
      <Row justify="space-between" className="modal-title-container">
        <Title className="modal-title">{props.title}</Title>
        <Button type="text" className="modal-close-btn">
          <FontAwesomeIcon icon={faTimes} size="2x" color="#354081" />
        </Button>
      </Row>
      {props.table && props.table}
      <Row justify={props.buttons.position}>
        {props.buttons
          ? props.buttons.button.map((button, index) => (
              <Button
                key={index}
                type={button.type}
                style={button.style}
                onClick={button.onClick}
              >
                {button.icon}
                {button.name}
              </Button>
            ))
          : ""}
      </Row>
    </Modal>
  );
}

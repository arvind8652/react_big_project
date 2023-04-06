import { Card, Row, Col, Typography, Form, List } from "antd";
import { useState } from "react";
import MiscellaneousFormModal from "../../Modal/MiscellaneousFormModal/MiscellaneousFormModal";

export default function Miscellaneous({
  form,
  formData,
  onValuesChange,
  rules,
  csObject,
}) {
  const [showMiscellaneousFormModal, setShowMiscellaneousFormModal] = useState(
    false
  );
  const mfmHandleOk = (values) => {
    let miscellaneous;

    if (
      formData &&
      formData.miscellaneous &&
      Array.isArray(formData.miscellaneous) &&
      formData.miscellaneous.length > 0
    ) {
      miscellaneous = {
        miscellaneous: [
          ...formData.miscellaneous,
          ...values.map((v) => ({
            type: v.key,
            miscellaneous: v.value,
          })),
        ],
      };
    } else {
      miscellaneous = {
        miscellaneous: [
          ...values.map((v) => ({
            type: v.key,
            miscellaneous: v.value,
          })),
        ],
      };
    }
    onValuesChange(miscellaneous);
    toggleShowMiscellaneousFormModal();
  };
  const mfmHandleCancel = () => {
    toggleShowMiscellaneousFormModal();
  };
  const toggleShowMiscellaneousFormModal = () => {
    setShowMiscellaneousFormModal(!showMiscellaneousFormModal);
  };
  return (
    <Card
      title="Miscellaneous"
      className="no-card-body"
      extra={
        <Typography.Title level={5} onClick={toggleShowMiscellaneousFormModal}>
          <Typography.Link>+ Add</Typography.Link>
        </Typography.Title>
      }
    >
      {showMiscellaneousFormModal && (
        <MiscellaneousFormModal
          visible={showMiscellaneousFormModal}
          handleOk={mfmHandleOk}
          handleCancel={mfmHandleCancel}
          csObject={csObject}
          rules={rules}
        />
      )}
      {formData.miscellaneous &&
        Array.isArray(formData.miscellaneous) &&
        formData.miscellaneous.length > 0 && (
          <Row align="middle" justify="space-between">
            {formData.miscellaneous.map((item) => (
              <Col span={8}>
                <Row>
                  <strong>{item.miscellaneous}</strong>
                </Row>
                <Row>{item.type}</Row>
              </Col>
            ))}
          </Row>
        )}
    </Card>
  );
}

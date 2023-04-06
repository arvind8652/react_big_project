import { Form, Card, Input, Radio, Select, Row, Col } from "antd";

const LeadTypeFormCard = ({ form, formData, onValuesChange, rules, csObject }) => {
  return (
    <Card className="lead-type-card-type">
      <Form
        className="form-container"
        layout="vertical"
        initialValues={formData}
        form={form}
        onValuesChange={onValuesChange}
      >
        <Row align="middle" justify="space-between" className="pt-section">
          <Col span={8}>
            <Form.Item
              name="leadType"
              label={<div className="lead-text">Lead Type</div>}
              validateTrigger={["onChange", "onBlur"]}
              rules={rules ? rules.type : []}
              style={{ width: "100%" }}
            >
              <Radio.Group className="field pt-field" value={formData.leadtType} size="large" style={{ width: "95%" }}>
                {csObject &&
                  csObject.Type &&
                  csObject.Type.dropDownValue.map((radioOption) => (
                    <Radio.Button
                      style={{ width: "50%" }}
                      className={`lead-radio-field ${formData.leadType === radioOption.dataValue ? "active" : ""}`}
                      value={radioOption.dataValue}
                    >
                      {radioOption.displayValue}
                    </Radio.Button>
                  ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default LeadTypeFormCard;

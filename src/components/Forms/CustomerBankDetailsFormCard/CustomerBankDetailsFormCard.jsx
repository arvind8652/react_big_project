import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Checkbox,
  Select,
  Form,
  Input,
} from "antd";

export default function BankDetails({
  form,
  formData,
  onValuesChange,
  rules,
  csObject,
}) {
  const [bankDetailsList, setBankDetailsList] = React.useState([]);
  return (
    <Card
      title="Bank Details"
      className={bankDetailsList.length === 0 ? "no-card-body" : ""}
      extra={
        <Typography.Title level={5}>
          <Typography.Link
            onClick={() => {
              setBankDetailsList([
                ...bankDetailsList,
                {
                  default: true,
                  bank_name: "",
                  branch: "",
                  account_type: "",
                  account_number: "",
                  currency: "",
                  status: "",
                  remarks: "",
                },
              ]);
            }}
          >
            + Add
          </Typography.Link>
        </Typography.Title>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        onValuesChange={onValuesChange}
      >
        {bankDetailsList.map((item, index) => (
          <>
            <Row justify="space-between">
              <Col>
                <Checkbox
                  checked={item.default}
                  onChange={(e) =>
                    setBankDetailsList([
                      ...bankDetailsList.slice(0, index),
                      {
                        ...bankDetailsList[index],
                        default: e.target.checked,
                      },
                      ...bankDetailsList.slice(index + 1),
                    ])
                  }
                >
                  Default
                </Checkbox>
              </Col>
              <Col>
                <Typography.Link
                  onClick={() =>
                    setBankDetailsList([
                      ...bankDetailsList.slice(0, index),
                      ...bankDetailsList.slice(index + 1),
                    ])
                  }
                >
                  Remove
                </Typography.Link>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Bank Name">
                  <Select placeholder="Enter bank name" size="large">
                    <Select.Option>Option 1</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Account Number">
                  <Input placeholder="Enter account number" size="large" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Branch">
                  <Select placeholder="Enter branch" size="large">
                    <Select.Option>Option 1</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Currency">
                  <Select placeholder="Enter currency" size="large">
                    <Select.Option>Option 1</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Account Type">
                  <Select placeholder="Select" size="large">
                    <Select.Option>Option 1</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Status">
                  <Select placeholder="Type value" size="large">
                    <Select.Option>Option 1</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Form.Item label="Remarks">
                  <Input.TextArea rows={4} size="large" />
                </Form.Item>
              </Col>
            </Row>
          </>
        ))}
      </Form>
    </Card>
  );
}

import { Form, Card, Select, Row, Col } from "antd";

const { Option } = Select;

const MiscellaneousForm = () => {
  return (
    <>
      <Form
        className="miscellaneous-form"
        onChange={(e) => console.log(e)}
        layout="vertical"
      >
        <Card title="Miscellaneous" style={{ marginTop: "35px" }}>
          <Card.Grid style={{ width: "100%" }} hoverable={false}>
            <Row
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <Col
                span={8}
                style={{
                  paddingRight: "20px",
                }}
              >
                <Form.Item label="Hobby">
                  <div>
                    <Select
                      required
                      defaultValue="Enter Hobby"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Option value="mh">Mumbai</Option>
                      <Option value="tn">Chennai</Option>
                      <Option value="as">Delhi</Option>
                    </Select>
                  </div>
                </Form.Item>
              </Col>
              <Col
                span={8}
                style={{
                  paddingRight: "20px",
                }}
              >
                <Form.Item label="Hobby">
                  <div>
                    <Select
                      required
                      defaultValue="Enter Hobby"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Option value="mh">Mumbai</Option>
                      <Option value="tn">Chennai</Option>
                      <Option value="as">Delhi</Option>
                    </Select>
                  </div>
                </Form.Item>
              </Col>
              <Col
                span={8}
                style={{
                  paddingRight: "20px",
                }}
              >
                <Form.Item label="Hobby">
                  <div>
                    <Select
                      required
                      defaultValue="Enter Hobby"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Option value="mh">Mumbai</Option>
                      <Option value="tn">Chennai</Option>
                      <Option value="as">Delhi</Option>
                    </Select>
                  </div>
                </Form.Item>
              </Col>
              <Col
                span={8}
                style={{
                  paddingRight: "20px",
                }}
              >
                <Form.Item label="Occupation">
                  <div>
                    <Select
                      required
                      defaultValue="Enter Occupation"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Option value="mh">Mumbai</Option>
                      <Option value="tn">Chennai</Option>
                      <Option value="as">Delhi</Option>
                    </Select>
                  </div>
                </Form.Item>
              </Col>
              <Col
                span={8}
                style={{
                  paddingRight: "20px",
                }}
              >
                <Form.Item label="Hobby">
                  <div>
                    <Select
                      required
                      defaultValue="Enter Hobby"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Option value="mh">Mumbai</Option>
                      <Option value="tn">Chennai</Option>
                      <Option value="as">Delhi</Option>
                    </Select>
                  </div>
                </Form.Item>
              </Col>
              <Col
                span={8}
                style={{
                  paddingRight: "20px",
                }}
              >
                <Form.Item label="Branch">
                  <div>
                    <Select
                      required
                      defaultValue="Enter Branch"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Option value="mh">Mumbai</Option>
                      <Option value="tn">Chennai</Option>
                      <Option value="as">Delhi</Option>
                    </Select>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Card.Grid>
        </Card>
      </Form>
    </>
  );
};

export default MiscellaneousForm;

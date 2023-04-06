import React, { useEffect } from "react";
import { Card, Row, Col, Typography, Select, Form, Input } from "antd";

import { getServiceProviders } from "../../../api/commonApi";

export default function AccountSecurityAccountsFormCard({
  form,
  formData,
  onValuesChange,
  rules,
  csObject,
}) {
  let addNewSecurityDetails;

  const [bankDetailsList, setBankDetailsList] = React.useState([]);
  const [getSProvider, setGetSProvider] = React.useState([]);
  const [lengths, setLengths] = React.useState();
  //const defaultData = form.getFieldsValue();

  const onChange = (value, key, idx) => {
    setBankDetailsList((prevBankDetailsList) => {
      const newObj = [...prevBankDetailsList];
      newObj[idx] = { ...newObj[idx], [key]: value, srlNo: idx + 1 };
      return newObj;
    });
  };

  useEffect(() => {
    if (Array.isArray(formData?.securityAccountDetails)) {
      setBankDetailsList([...formData?.securityAccountDetails]);
      formData?.securityAccountDetails?.forEach((e, idx) => {
        getSP(e?.type, idx);
      });
    }
  }, []);

  useEffect(() => {
    onValuesChange({ securityAccountDetails: bankDetailsList });
  }, [bankDetailsList]);

  const getSP = async (value, idx) => {
    try {
      const response = await getServiceProviders(value);
      setGetSProvider((prev) => {
        const newPrev = [...prev];
        newPrev[idx] = response.data.lookUpValues || [];
        return newPrev;
      });
    } catch (error) {}
  };

  useEffect(() => {
    setLengths(bankDetailsList.length > 0 && bankDetailsList?.length - 1);
    if (formData?.securityAccountDetails?.length > 0) {
      //const provider = defaultData.SecurityAccountsFormCard[lengths].serviceProvider;
      if (formData?.securityAccountDetails[lengths]?.type !== "") {
        formData.securityAccountDetails[lengths].serviceProvider = "DIRECT";
        //form.setFieldsValue({ [provider]: "DIRECT" })
      }
    }
  }, [formData]);

  return (
    <Card
      title="Security Accounts"
      className={bankDetailsList.length === 0 ? "no-card-body" : ""}
      extra={
        <Typography.Title level={5}>
          <Typography.Link
            onClick={() => {
              setBankDetailsList([
                ...bankDetailsList,
                {
                  type: "",
                  serviceProvider: "",
                  accountNumber: "",
                  subAssetClass: "",
                  accountStatus: "",
                  remarks: "",
                  serviceProviders: [],
                },
              ]);
              addNewSecurityDetails();
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
        <Form.List
          initialValue={formData?.securityAccountDetails}
          name="SecurityAccountsFormCard"
        >
          {(fields, { add, remove }) => {
            addNewSecurityDetails = () => add();
            return fields?.map(
              ({ key, name, fieldKey, ...restField }, index) => {
                return (
                  <React.Fragment key={key}>
                    <Row justify="end">
                      <Col>
                        <Typography.Link
                          onClick={() => {
                            setBankDetailsList([
                              ...bankDetailsList.slice(0, index),
                              ...bankDetailsList.slice(index + 1),
                            ]);
                            remove(index);
                          }}
                        >
                          Remove
                        </Typography.Link>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Form.Item
                          required={csObject?.SecurityAccountType?.isRequired}
                          //maybe in the future
                          //rules={rules?.securityaccountype}
                          label="Type"
                          name={[name, "type"]}
                        >
                          <Select
                            onChange={(value) => {
                              onChange(value, "type", index);
                              getSP(value, index);
                            }}
                            placeholder="Enter Type"
                            size="large"
                          >
                            {csObject?.SecurityAccountType?.dropDownValue?.map(
                              (item) => (
                                <Select.Option
                                  key={item?.dataValue?.toString()}
                                  value={item?.dataValue}
                                >
                                  {item?.displayValue}
                                </Select.Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name={[name, "subAssetClass"]}
                          required={csObject?.SubAssetClass?.isRequired}
                          //may be used in the future
                          //rules={rules?.subassetclass}
                          label="Sub Asset Class"
                        >
                          <Select
                            // mode="multiple"
                            onChange={(value) => {
                              onChange(value, "subAssetClass", index);
                            }}
                            placeholder="Select Sub Asset Class"
                            size="large"
                          >
                            {csObject?.SubAssetClass?.lookupValue?.lookUpValues?.map(
                              (item) => (
                                <Select.Option
                                  key={item?.asset_type?.toString()}
                                  value={item?.asset_type}
                                >
                                  {item?.name}
                                </Select.Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          required={csObject?.ServiceProvider?.isRequired}
                          //may be used in the future
                          //rules={rules?.serviceprovider}
                          label="Service Provider"
                          name={[name, "serviceProvider"]}
                        >
                          <Select
                            onChange={(value) =>
                              onChange(value, "serviceProvider", index)
                            }
                            placeholder="Enter Service Provider"
                            size="large"
                            defaultValue="DIRECT"
                          >
                            {getSProvider[index]?.map((e) => (
                              <Select.Option value={e.data_value}>
                                {e.display_value}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          required={csObject?.SecurityAccountStatus?.isRequired}
                          //may be used in the future
                          //rules={rules?.securityaccountstatus}
                          label="Status"
                          name={[name, "accountStatus"]}
                        >
                          <Select
                            onChange={(value) =>
                              onChange(value, "accountStatus", index)
                            }
                            placeholder="Enter Active"
                            size="large"
                          >
                            {csObject?.SecurityAccountStatus?.dropDownValue?.map(
                              (item) => (
                                <Select.Option value={item?.dataValue}>
                                  {item?.displayValue}
                                </Select.Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          required={csObject?.AccountNumber?.isRequired}
                          //may be used in the future
                          //rules={rules?.accountnumber}
                          label="Account Number"
                          name={[name, "accountNumber"]}
                        >
                          <Input
                            onChange={(evt) =>
                              onChange(evt.target.value, "accountNumber", index)
                            }
                            maxLength={20}
                            placeholder="Enter Account Number"
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16}>
                        <Form.Item
                          required={csObject?.Remarks?.isRequired}
                          // may be used in the future
                          //rules={rules?.remarks}
                          label="Remarks"
                          name={[name, "remarks"]}
                        >
                          <Input.TextArea
                            onChange={(evt) =>
                              onChange(evt.target.value, "remarks", index)
                            }
                            maxLength={350}
                            rows={4}
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </React.Fragment>
                );
              }
            );
          }}
        </Form.List>
      </Form>
    </Card>
  );
}

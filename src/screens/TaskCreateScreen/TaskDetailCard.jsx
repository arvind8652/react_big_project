import { Form, Card, Input, Select, Row, Col } from 'antd';
import { CONSTANTS } from '../../constants/constants';
import { useEffect } from 'react';
// import { CompassOutlined } from "@ant-design/icons";

const TaskDetailCard = ({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	mode,
	singleOrMultiple
}) => {
	// const [statusDropdown, setStatusDropdown] = useState([]);
	// const [probabilityDropdown, setProbabilityDropdown] = useState();
	const { TextArea } = Input;

	useEffect(() => {}, [formData.stage]);
	useEffect(() => {}, [formData.status]);

	useEffect(() => {}, [formData.status]);
	const handleOnValuesChange = (key, value) => {
		onValuesChange({ [key]: value });
	};

	return (
		<Card className='opp-det-card-type' title='Task Details'>
			<Form
				className='opp-det-form'
				layout='vertical'
				initialValues={formData}
				form={form}
				onValuesChange={onValuesChange}
			>
				<Form.Item
					name='subject'
					required
					label={<div className='opp-text'>{CONSTANTS.taskCreate.taskDetails.subject}</div>}
					rules={rules ? rules.subject : []}
				>
					<Input
						onChange={(evt) => handleOnValuesChange('subject', evt.target.value)}
						size='large'
						maxLength='350'
						className='interaction-input-field'
						placeholder={formData.subject}
						defaultValue={formData.subject}
						disabled={singleOrMultiple === 1 ? true : false}
					/>
					{/* <TextArea
            rows={2}
            className="text-area-field"
            disabled={
              mode === "edit" && csObject && csObject.Subject.isKeyColumn
            }
          /> */}
				</Form.Item>
				<Row gutter={16}>
					{/* <Col className="gutter-row" span={8}>
            <Form.Item
              label={<div className="opp-text">Type</div>}
              name="type"
              rules={rules ? rules.type : []}
            >
              <Select
                className="opp-filter-dropdown"
                placeholder="Select Option"
                size="large"
                mode="single"
                value={formData.type}
                disabled={
                  mode === "edit" &&
                  csObject &&
                  csObject.ActivityType.isKeyColumn
                }
                filterOption={(input, opt) => {
                  return (
                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                showSearch
              >
                {csObject &&
                  csObject.ActivityType &&
                  csObject.ActivityType.dropDownValue.length > 0 &&
                  csObject.ActivityType.dropDownValue.map((item, index) => (
                    <Select.Option value={item.dataValue} key={index}>
                      {item.displayValue}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col> */}
					<Col className='gutter-row' span={8}>
						<Form.Item
							label={<div className='opp-text'>Purpose</div>}
							name='purpose'
							required
							rules={rules ? rules.activitypurpose : []}
						>
							<Select
								className='opp-filter-dropdown'
								onChange={(value) => handleOnValuesChange('purpose', value)}
								placeholder='Select Option'
								size='large'
								mode='single'
								value={formData.purpose}
								defaultValue={formData.activityPurpose}
								disabled={singleOrMultiple === 1 ? true : false}
								// disabled={mode === 'edit' && csObject && csObject.ActivityPurpose.isKeyColumn}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{csObject &&
									csObject.ActivityPurpose &&
									csObject.ActivityPurpose.dropDownValue.length > 0 &&
									csObject.ActivityPurpose.dropDownValue.map((item, index) => (
										<Select.Option value={item.dataValue} key={index}>
											{item.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col className='gutter-row' span={8}>
						<Form.Item
							label={<div className='opp-text'>Priority</div>}
							name='priority'
							required
							rules={rules ? rules.priority : []}
						>
							<Select
								className='opp-filter-dropdown'
								onChange={(value) => handleOnValuesChange('priority', value)}
								placeholder='Select Option'
								size='large'
								mode='single'
								value={formData.priority}
								disabled={singleOrMultiple === 1 ? true : false}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{csObject &&
									csObject.Priority &&
									csObject.Priority.dropDownValue.length > 0 &&
									csObject.Priority.dropDownValue.map((item, index) => (
										<Select.Option value={item.dataValue} key={index}>
											{item.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col className='gutter-row' span={16}>
						<Form.Item
							name='remark'
							label={<div className='opp-text'>{CONSTANTS.taskCreate.taskDetails.description}</div>}
							rules={rules ? rules.remark : []}
						>
							<TextArea
								rows={4}
								onChange={(evt) => handleOnValuesChange('remark', evt.target.value)}
								className='text-area-field'
								disabled={singleOrMultiple === 1 ? true : false}
								// disabled={mode === 'edit' && csObject && csObject?.Description?.isKeyColumn}
							/>
						</Form.Item>
					</Col>
				</Row>
				{/* <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <Form.Item
              label={<div className="opp-text">Status</div>}
              name="priority"
              rules={rules ? rules.priority : []}
            >
              <Select
                className="opp-filter-dropdown"
                placeholder="Select Option"
                size="large"
                mode="single"
                value={formData.priority}
                filterOption={(input, opt) => {
                  return (
                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                showSearch
              >
                {csObject &&
                  csObject.Priority &&
                  csObject.Priority.dropDownValue.length > 0 &&
                  csObject.Priority.dropDownValue.map((item, index) => (
                    <Select.Option value={item.dataValue} key={index}>
                      {item.displayValue}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} className="gutter-row">
            <Form.Item
              name="startDate"
              label={
                <div className="opp-text">
                  {CONSTANTS.opportunityCreate.opportunityDetails.startDate}
                </div>
              }
              rules={rules ? rules.creationdate : []}
            >
              <DatePicker
                placeholder="dd-mm-yyyy"
                value={formData.startDate}
                style={{
                  width: "100%",
                  height: "44px",
                }}
                size="large"
                format="DD-MM-YYYY"
                disabledDate={(d) =>
                  !d || d.isAfter(new Date().setDate(new Date().getDate()))
                }
                disabled={
                  mode === "edit" && csObject && csObject.StartDate.isKeyColumn
                }
              />
            </Form.Item>
          </Col>
        </Row> */}
				{/* {formData.status === "OPEN" ? (
          <Row gutter={16}>
            <Col className="gutter-row" span={5}>
              <Form.Item
                label={
                  <div className="opp-text">
                    {CONSTANTS.opportunityCreate.opportunityDetails.stage}
                  </div>
                }
                name="stage"
                rules={rules ? rules.stage : []}
              >
                <Select
                  className="opp-filter-dropdown"
                  size="large"
                  mode="single"
                  placeholder="Select Option"
                  value={formData.stage}
                  // onClick={() => {
                  //   form.setFieldsValue({
                  //     Probability: "",
                  //   });
                  //   formData.probability = "";
                  // }}
                  filterOption={(input, opt) => {
                    return (
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    );
                  }}
                  disabled={
                    mode === "edit" && csObject && csObject.Stage.isKeyColumn
                  }
                  showSearch
                >
                  {statusDropdown &&
                    statusDropdown.map((item) => (
                      <Select.Option
                        key={item.data_value}
                        value={item.data_value}
                      >
                        {item.display_value}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={3}>
              <Form.Item
                name="probability"
                label={
                  <div className="opp-text">
                    {CONSTANTS.opportunityCreate.opportunityDetails.probability}
                  </div>
                }
                rules={rules ? rules.probability : []}
              >
                <Input
                  value={probabilityDropdown}
                  className="opp-text"
                  size="large"
                  placeholder={probabilityDropdown}
                  defaultValue={probabilityDropdown}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="targetAmount"
                label={
                  <div className="opp-text">
                    {
                      CONSTANTS.opportunityCreate.opportunityDetails
                        .targetAmount
                    }
                  </div>
                }
              >
                <Row>
                  <Col span={6}>
                    <Form.Item
                      name="preferredCurrency"
                      rules={rules ? rules.preferredcurrency : []}
                    >
                      <Select
                        size="large"
                        mode="single"
                        value={formData.preferredCurrency}
                        filterOption={(input, opt) => {
                          return (
                            opt.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }}
                        disabled={
                          mode === "edit" &&
                          csObject &&
                          csObject.PreferredCurrency.isKeyColumn
                        }
                        showSearch
                      >
                        {csObject &&
                          csObject.PreferredCurrency &&
                          csObject.PreferredCurrency.dropDownValue &&
                          csObject.PreferredCurrency.dropDownValue.map(
                            (item, index) => (
                              <Select.Option value={item.dataValue} key={index}>
                                {item.dataValue}
                              </Select.Option>
                            )
                          )}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <Form.Item
                      name="targetAmount"
                      rules={rules ? rules.targetamount : []}
                    >
                      <Input
                        className="opp-input-field quantity"
                        type="number"
                        disabled={
                          mode === "edit" &&
                          csObject &&
                          csObject.TargetAmount.isKeyColumn
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="expectedDate"
                label={
                  <div className="opp-text">
                    {
                      CONSTANTS.opportunityCreate.opportunityDetails
                        .expectedDate
                    }
                  </div>
                }
                rules={rules ? rules.duedate : []}
              >
                <DatePicker
                  value={formData.expectedDate}
                  style={{
                    width: "100%",
                    height: "44px",
                  }}
                  placeholder="dd-mm-yyyy"
                  format="DD-MM-YYYY"
                  disabledDate={(d) =>
                    !d || d.isBefore(new Date().setDate(new Date().getDate()))
                  }
                  disabled={
                    mode === "edit" && csObject && csObject.DueDate.isKeyColumn
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <Row gutter={16}>
            <Col className="gutter-row" span={5}>
              <Form.Item
                label={
                  <div className="opp-text">
                    {CONSTANTS.opportunityCreate.opportunityDetails.stage}
                  </div>
                }
                name="stage"
                rules={rules ? rules.stage : []}
              >
                <Select
                  className="opp-filter-dropdown"
                  size="large"
                  mode="single"
                  placeholder="Select Option"
                  value={formData.stage}
                  filterOption={(input, opt) => {
                    return (
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    );
                  }}
                  disabled={
                    mode === "edit" && csObject && csObject.Stage.isKeyColumn
                  }
                  showSearch
                >
                  {statusDropdown &&
                    statusDropdown.map((item) => (
                      <Select.Option
                        key={item.data_value}
                        value={item.data_value}
                      >
                        {item.display_value}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            {formData.stage === "WON" ? (
              <>
                <Col className="gutter-row" span={3}>
                  <Form.Item
                    name="probability"
                    label={
                      <div className="opp-text">
                        {
                          CONSTANTS.opportunityCreate.opportunityDetails
                            .probability
                        }
                      </div>
                    }
                  // rules={rules ? rules.probability : []}
                  >
                    <Input
                      value={probabilityDropdown}
                      className="opp-text"
                      size="large"
                      placeholder={probabilityDropdown}
                      defaultValue={probabilityDropdown}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    name="closureAmount"
                    label={
                      <div className="opp-text">
                        {
                          CONSTANTS.opportunityCreate.opportunityDetails
                            .closureAmount
                        }
                      </div>
                    }
                    rules={rules ? rules.amount : []}
                  >
                    <Row>
                      <Col span={6}>
                        <Form.Item name="preferredCurrency">
                          <Select
                            className="opp-filter-dropdown"
                            size="large"
                            mode="single"
                            value={formData.preferredCurrency}
                            filterOption={(input, opt) => {
                              return (
                                opt.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
                            disabled={
                              mode === "edit" &&
                              csObject &&
                              csObject.PreferredCurrency.isKeyColumn
                            }
                            showSearch
                          >
                            {csObject &&
                              csObject.PreferredCurrency &&
                              csObject.PreferredCurrency.dropDownValue &&
                              csObject.PreferredCurrency.dropDownValue.map(
                                (item, index) => (
                                  <Select.Option
                                    value={item.dataValue}
                                    key={index}
                                  >
                                    {item.dataValue}
                                  </Select.Option>
                                )
                              )}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={16}>
                        <Input
                          className="opp-input-field quantity"
                          type="number"
                          disabled={
                            mode === "edit" &&
                            csObject &&
                            csObject.Amount.isKeyColumn
                          }
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </>
            ) : (
              <>
                <Col className="gutter-row" span={3}>
                  <Form.Item
                    name="probability"
                    label={
                      <div className="opp-text">
                        {
                          CONSTANTS.opportunityCreate.opportunityDetails
                            .probability
                        }
                      </div>
                    }
                  // rules={rules ? rules.probability : []}
                  >
                    <Input
                      value={probabilityDropdown}
                      className="opportunity-input-field"
                      size="large"
                      placeholder={probabilityDropdown}
                      defaultValue={probabilityDropdown}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    name="closeReason"
                    label={<div className="opp-text">Reason</div>}
                    rules={rules ? rules.closereason : []}
                  >
                    <Select
                      className="opp-filter-dropdown"
                      size="large"
                      mode="single"
                      placeholder="Select Option"
                      value={formData.closeReason}
                      filterOption={(input, opt) => {
                        return (
                          opt.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                      disabled={
                        mode === "edit" &&
                        csObject &&
                        csObject.CloseReason.isKeyColumn
                      }
                      showSearch
                    >
                      {csObject &&
                        csObject.CloseReason &&
                        csObject.CloseReason.dropDownValue &&
                        csObject.CloseReason.dropDownValue.length > 0 &&
                        csObject.CloseReason.dropDownValue.map(
                          (item, index) => (
                            <Select.Option value={item.dataValue} key={index}>
                              {item.displayValue}
                            </Select.Option>
                          )
                        )}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )}
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="closeDate"
                label={
                  <div className="opp-text">
                    {CONSTANTS.opportunityCreate.opportunityDetails.closureDate}
                  </div>
                }
                rules={rules ? rules.closedate : []}
              >
                <DatePicker
                  value={formData.closeDate}
                  style={{
                    width: "100%",
                    height: "44px",
                  }}
                  placeholder="dd-mm-yyyy"
                  format="DD-MM-YYYY"
                  disabledDate={(d) =>
                    !d || d.isAfter(new Date().setDate(new Date().getDate()))
                  }
                  disabled={
                    mode === "edit" &&
                    csObject &&
                    csObject.CloseDate.isKeyColumn
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        )} */}
			</Form>
		</Card>
	);
};
export default TaskDetailCard;

import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Typography,
  Divider,
  Select,
  Button,
  Radio,
} from "antd";
import CustomModal from "../../../components/Modal/CustomModal/CustomModal";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import TextArea from "antd/lib/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateCloseOccurrenceApi } from "../../../api/interactionViewApi";
const { Option } = Select;

const { Title, Text } = Typography;

const CloseOccurenceModal = (
  props,
  setShowCloseInteractionModal,
  showCloseInteractionModal,
  selectedInteraction,
  closeInteractionApi,
) => {
  const controlStructureView = props.controlStructureView;
  const [form] = Form.useForm();
  const [isDeffered,setIsDeffered]= useState(false)
  const [
    showSuccessFailureOccurenceModal,
    setShowSuccessFailureOccurenceModal,
  ] = useState(false);
  const [showDeferredModal, setShowDeferredModal] = useState(false);
  const [radioValue, setRadioValue] = useState('selectedOccurence')
  const [
    updateOccurenceSuccessFailureyMessage,
    setUpdateOccurenceSuccessFailureyMessage,
  ] = useState("");

  const [updateOccurenceFormDetail, setUpdateOccurenceFormDetail] = useState({
    FollowUpId: props.modal.followUpID,
    CloseReason: "",
    Remarks: "",
  });
  const closeInteraction = () => {
    let requestObject = {};
    
    // requestObject.FollowUpId = selectedInteraction.FollowUpId;
    // requestObject.id = selectedInteraction.id;
    if (updateOccurenceFormDetail.CloseReason === 'C') {
      requestObject.CloseReason = updateOccurenceFormDetail.CloseReason;
    } else if (radioValue === 'selectedOccurence') {
      requestObject.CloseReason = 'D';
    } else {
      requestObject.CloseReason = 'DA'
    }
    requestObject.Remarks = updateOccurenceFormDetail.Remarks
    closeInteractionApi(requestObject);
    setShowDeferredModal(false);
    setShowCloseInteractionModal(false);
  }

  const handleUpdateOccurenceFormChange = (values) => {
    if (values && values.CloseReason === 'D') {
      setShowDeferredModal(true);
    }
    setUpdateOccurenceFormDetail({
      ...updateOccurenceFormDetail,
      ...values,
    });
  };
  const closeDeferredModal = () => {
    setShowDeferredModal(false)
    setShowCloseInteractionModal(false);
    // setSelectedRowKeys([]);
    // setSelectedRows([]);
  }
  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  function updateOccurence() {

    form.setFieldsValue({
      CloseReason: null,
      Remarks: null,
    });
    updateCloseOccurrenceApi(updateOccurenceFormDetail).then((res) => {
      setUpdateOccurenceSuccessFailureyMessage(res.data.message);
      showSuccessFailureOccurenceModal(true);
    });
  }

  function cancelCloseOccurenceModal() {
    form.setFieldsValue({
      CloseReason: null,
      Remarks: null,
    });
    props.setModal(false);
  }
  const handleSuccessFailureUpdateOccurenceModalOk = () => {
    props.setModal(false);
    setShowSuccessFailureOccurenceModal(false);
  };
  const RenderUpdateOccurenceSuccessFailureModal = () => {
    return (
      <CustomModal
        visible={showSuccessFailureOccurenceModal}
        handleOk={handleSuccessFailureUpdateOccurenceModalOk}
      >
        <div
          className="modal-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="header-icon">
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="header-title">Update Occurence</div>
        </div>
        <div className="modal-body">
          {updateOccurenceSuccessFailureyMessage}
        </div>
        <div className="modal-footer">
          <Button
            className="submit-btn"
            key="submit"
            type="primary"
            onClick={handleSuccessFailureUpdateOccurenceModalOk}
          >
            OK
          </Button>
        </div>
      </CustomModal>
    );
  };

  return (
    <>
      <RenderUpdateOccurenceSuccessFailureModal />
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
            Add Occurence
          </Title>
          <Divider />
          <Form
            layout="vertical"
            form={form}
            onValuesChange={handleUpdateOccurenceFormChange}
          >
            <Row>
              <Col span={8}>
                <Form.Item label="Reason" name="CloseReason">
                  <Select
                    size="large"
                    placeholder="Select option"
                    style={{ width: "90%" }}
                    value={updateOccurenceFormDetail.CloseReason}
                  >
                    {controlStructureView.Activity_CloseReason &&
                      controlStructureView.Activity_CloseReason.dropDownValue
                        .length > 0 &&
                      controlStructureView.Activity_CloseReason.dropDownValue.map(
                        (item, index) => (
                          <Option value={item.dataValue} key={index}>
                            {item.displayValue}
                          </Option>
                        )
                      )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Meeting Notes" name="Remarks">
              <TextArea rows={7} value={updateOccurenceFormDetail.Remarks} />
            </Form.Item>
          </Form>
          <Row justify="end">
            <Button
              type="text"
              style={{ marginRight: "15px" }}
              onClick={cancelCloseOccurenceModal}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit"
              onClick={updateOccurence}
              // onClick={closeInteraction}
            >
              Done
            </Button>
          </Row>
        </div>
      </Modal>
      <Modal
        visible={showDeferredModal}
        onCancel={closeDeferredModal}
        footer={null}
        width={700}
        centered
      >
        <div>
          <Title level={3} style={{ color: '#354081' }}>Close Interaction</Title>
          <Divider />
          <div className="deferred-modal-body">
            Are you sure you want to Close the selected Interaction?
            <div className="modal-radio">
              <Radio.Group
                onChange={onRadioChange}
                value={radioValue}
              >
                <Radio value='selectedOccurence' className='radio-style'>
                  Selected Occurence
                </Radio>
                <Radio value='allOccurences' className='radio-style'>
                  All Occurences
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <Row justify="end">
            <Button
              className="text-only-btn"
              key="back"
              type="text"
              onClick={closeDeferredModal}
            >
              Cancel
            </Button>
            <Button
              className="submit-btn"
              key="submit"
              type="primary"
              onClick={closeInteraction}
            >
              Delete
            </Button>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default CloseOccurenceModal;

import React, { useState } from "react";
import { Modal, Form, Typography, Divider, Select, Button } from "antd";

import CustomModal from "../../../components/Modal/CustomModal/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-regular-svg-icons";
import TextArea from "antd/lib/input/TextArea";
import "../TaskViewScreen.scss";
import { updateTaskCloseOccurrenceApi } from "../../../api/taskViewApi";
const { Option } = Select;

const { Title } = Typography;

const EditStatusModal = (props) => {
  const controlStructure = props.controlStructureAdd;
  // const controlStructureRules = props.controlStructureAddRules;

  const [form] = Form.useForm();

  const [showSuccessFailureOccurenceModal, setShowSuccessFailureOccurenceModal] = useState(false);
  const [updateOccurenceSuccessFailureyMessage, setUpdateOccurenceSuccessFailureyMessage] = useState("");

  const [updateOccurenceFormDetail, setUpdateOccurenceFormDetail] = useState({
    FollowUpId: "",
    CloseReason: "",
    Remarks: "",
  });

  const handleUpdateOccurenceFormChange = (values) => {
    setUpdateOccurenceFormDetail({
      ...updateOccurenceFormDetail,
      ...values,
    });
  };

  function updateOccurence() {
    form.setFieldsValue({
      CloseReason: null,
      Remarks: null,
    });
    updateTaskCloseOccurrenceApi(updateOccurenceFormDetail).then((res) => {
      setUpdateOccurenceSuccessFailureyMessage(res.data.message);
      setShowSuccessFailureOccurenceModal(true);
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
      <CustomModal visible={showSuccessFailureOccurenceModal} handleOk={handleSuccessFailureUpdateOccurenceModalOk}>
        <div className="modal-header" style={{ display: "flex", alignItems: "center" }}>
          <div className="header-icon">
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="header-title">Update Occurence</div>
        </div>
        <div className="modal-body">{updateOccurenceSuccessFailureyMessage}</div>
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
        visible={props.modal.open && props.followUpID.followUpID}
        onClick={() => props.setModal({ ...props.modal, open: false })}
        footer={null}
        className="occurence-modal"
        width={500}
      >
        <div>
          <Title level={2} style={{ color: "#354081" }}>
            Edit Status
          </Title>
          <Divider />
          <Form
            layout="vertical"
            form={form}
            onValuesChange={handleUpdateOccurenceFormChange}
            // initialValues={addOccurenceFormData}
          >
            <Form.Item name="CloseReason" label="Status">
              <Select
                className="interaction-filter-dropdown"
                size="large"
                placeholder="Select option"
                mode="single"
                style={{ width: "60%" }}
                value={updateOccurenceFormDetail.CloseReason}
              >
                {controlStructure.Activity_CloseReason &&
                  controlStructure.Activity_CloseReason.dropDownValue &&
                  controlStructure.Activity_CloseReason.dropDownValue.length > 0 &&
                  controlStructure.Activity_CloseReason.dropDownValue.map((item, index) => (
                    <Option value={item.dataValue} key={index} style={{ width: "50%" }}>
                      {item.displayValue}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item name="Remarks" label="Remarks">
              <TextArea style={{ height: "100px", width: "99%" }} value={updateOccurenceFormDetail.Remarks}></TextArea>
            </Form.Item>

            <Button type="text" style={{ marginLeft: "65%" }} onClick={cancelCloseOccurenceModal}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: "right", backgroundColor: "#354081" }}
              onClick={updateOccurence}
            >
              Done
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default EditStatusModal;

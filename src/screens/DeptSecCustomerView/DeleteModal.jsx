import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Select } from "antd";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";
import { theme } from "../../theme";
import { deleteSMOrder } from "../../api/pNBApi";
const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const DeleteModal = ({
  showDeleteModalFlag,
  reasonList,
  handleDeleteModal,
  customerId,
}) => {
  const [form] = Form.useForm();
  const [deleteProspectMessage, setDeleteProspectMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(showDeleteModalFlag);
  const [
    showSuccessFailureDeleteModal,
    setShowSuccessFailureDeleteModal,
  ] = useState(false);

  const handleConfirmDeleteModalOk = (values) => {
    let payload = {
      lstRefID: [customerId],
      reason: values.reason,
      remark: values.remark,
    };

    deleteSMOrder(payload).then((res) => {
      setShowSuccessFailureDeleteModal(true);
      setDeleteProspectMessage(res.data[0].message);
      setShowDeleteModal(false);
    });
  };

  const handleConfirmDeleteModalCancel = () => {
    setShowDeleteModal(false);
    handleDeleteModal();
  };

  const handleSuccessFailureDeleteModalOk = () => {
    setShowSuccessFailureDeleteModal(false);
    // history.push("/dashboard/MyCustomer/Onboarding");
  };

  const RenderSuccessFailureDeleteModal = () => {
    return (
      <CustomModal
        visible={showSuccessFailureDeleteModal}
        handleOk={handleSuccessFailureDeleteModalOk}
      >
        <div
          className="modal-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="header-icon">
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="header-title">Delete Client</div>
        </div>
        <div className="modal-body">{deleteProspectMessage}</div>
        <div className="modal-footer">
          <Button
            className="submit-btn"
            key="submit"
            type="primary"
            onClick={handleSuccessFailureDeleteModalOk}
          >
            OK
          </Button>
        </div>
      </CustomModal>
    );
  };

  return (
    <div>
      <CustomModal
        visible={showDeleteModal}
        // handleCancel={handleConfirmDeleteModalCancel}
        // handleOk={handleConfirmDeleteModalOk}
      >
        <div
          className="modal-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="header-icon">
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="header-title">Delete Client</div>
        </div>

        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={handleConfirmDeleteModalOk}
        >
          <Form.Item
            name="reason"
            label="Reason"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a reason" allowClear>
              {reasonList &&
                reasonList.map((option) => (
                  <Option value={option.data_value}>
                    {option.display_value}
                  </Option>
                ))}
              {/* <Option value="female">female</Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            name="remark"
            label="Remark"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item style={theme.textRight}>
            <Button
              className="text-only-btn"
              key="back"
              type="text"
              onClick={handleConfirmDeleteModalCancel}
            >
              Cancel
            </Button>
            <Button
              className="submit-btn"
              key="submit"
              type="primary"
              htmlType="submit"
            >
              Delete
            </Button>
          </Form.Item>
        </Form>
      </CustomModal>
      <RenderSuccessFailureDeleteModal />
    </div>
  );
};

export default DeleteModal;

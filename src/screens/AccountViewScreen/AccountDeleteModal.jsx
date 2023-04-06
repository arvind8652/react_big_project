import { Button, Select, Form, Input, Row } from "antd";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import "../../screens/ProspectViewScreen/ProspectComponent/CardView.scss";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";
import { deleteAccountApi } from "../../api/accountViewApi";

const AccountDeleteModal = (props) => {
  const {
    showDeleteModalFlag = false,
    accountId = "",
    isUpload = true,
    handleDeleteModal,
    controlStructure
  } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(true);
  const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] =
    useState(false);
  const [deleteProspectMessage, setDeleteProspectMessage] = useState("");
  const [dropDownReason, setDropDownReason] = useState("");
  const [terminateReason, setTerminateReason] = useState("");
  const history = useHistory();

  const handleConfirmDeleteModalCancel = () => {
    setShowDeleteModal(false);
    handleDeleteModal();
  };

  const handleCDeleteModalOk =(dropDownReason, terminateReason) => {
    let payload = { lstRefID: [accountId],
      Reason: dropDownReason,
      Remark: terminateReason 
    };
    deleteAccountApi(payload).then((res) => {
      setShowSuccessFailureDeleteModal(true);
      setDeleteProspectMessage(res.data[0].message);
      setShowDeleteModal(false);
    });
  };

  const handleConfirmDeleteModalOk =() => {
    handleCDeleteModalOk(dropDownReason, terminateReason);
  };

  const handleTerminateReasonChange = (e) => {
    setTerminateReason(e.target.value);
  };

  const onChange = (value)  =>{
    setDropDownReason(value);
  };

  const handleSuccessFailureDeleteModalOk = () => {
    setShowSuccessFailureDeleteModal(false);
    history.push("/dashboard/MyAccount");
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
          <div className="header-title">Delete Prospect</div>
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
    <>
      {/* <RenderConfirmDeleteModal /> */}
      <RenderSuccessFailureDeleteModal />
      <CustomModal
        visible={showDeleteModal}
        handleCancel={handleConfirmDeleteModalCancel}
        handleOk={handleConfirmDeleteModalOk}
      >
        <div className="header-icon">
           <h1 className="aprroval">
           <FontAwesomeIcon icon={faTrashAlt} />
              &nbsp; Terminate Account
           </h1>
        </div>
        <h3 className="approve-heading" style={{ marginBottom: "20px" }}>
        Are you sure you want to Terminate selected Account?
        </h3>
        <div>
          <Row>
            <label className="required" style={{ marginTop: "10px" }}>
              Please Specify Reason for Rejection
            </label>
            <br />
          </Row>
          <Select
            showSearch
            size="large"
            mode="single"
            style={{ width: "50%" }}
            placeholder="Specify a Reason"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {controlStructure &&
              controlStructure?.AccountTerminateReason.dropDownValue.map(
                (option) => (
                  <Select.Option
                    key={option.dataValue}
                    value={option.dataValue}
                  >
                    {option.displayValue}
                  </Select.Option>
                )
              )}
          </Select>
        </div>
        <br />
        
          <Form.Item name="otherRejectReason">
            <Input
              maxLength={15}
              size="large"
              style={{ width: "50%" }}
              value={terminateReason}
              placeholder="Other Reasons"
              onChange={(e) => handleTerminateReasonChange(e)}
            />
          </Form.Item>
        
        <Row>
          <div className="modal-footer">
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
              onClick={handleConfirmDeleteModalOk}
            >
              Terminate
            </Button>
          </div>
        </Row>
      </CustomModal>
    </>
  );
};

export default AccountDeleteModal;

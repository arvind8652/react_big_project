import React from "react";
import { useHistory } from "react-router-dom";
import "../LeadViewScreen/LeadViewScreen.scss";
import { Button } from "antd";
import { faTrashAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";

const RenderSuccessFailureDeleteModal = ({
  deleteMessage,
  showSuccessFailureDeleteModal,
  setShowSuccessFailureDeleteModal,
  textLP,
  setShowDeleteModal,
}) => {
  const history = useHistory();
  const handleSuccessFailureDeleteModalOk = () => {
    setShowSuccessFailureDeleteModal(false);
    setShowDeleteModal(false);
    history.push("/dashboard/LeadProspectOverview");
  };

  return (
    <CustomModal visible={showSuccessFailureDeleteModal} handleOk={handleSuccessFailureDeleteModalOk}>
      <div className="modal-header" style={{ display: "flex", alignItems: "center" }}>
        <div className="header-icon">
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
        <div className="header-title">Delete {textLP}</div>
      </div>
      <div className="modal-body">{deleteMessage}</div>
      <div className="modal-footer">
        <Button className="submit-btn" key="submit" type="primary" onClick={handleSuccessFailureDeleteModalOk}>
          OK
        </Button>
      </div>
    </CustomModal>
  );
};

export default RenderSuccessFailureDeleteModal;

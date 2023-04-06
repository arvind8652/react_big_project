import React from "react";
import { deleteLeadApi } from "../../api/leadViewApi";
import { deleteProspectApi } from "../../api/prospectViewApi";
import "../LeadViewScreen/LeadViewScreen.scss";
import { Button } from "antd";
import { faTrashAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";

const RenderConfirmDeleteModal = ({
  id,
  setShowDeleteModal,
  showDeleteModal,
  setShowSuccessFailureDeleteModal,
  setDeleteMessage,
  flag,
  textLP,
}) => {
  const handleConfirmDeleteModalOk = () => {
    if (flag)
      deleteLeadApi(id).then((res) => {
        setShowSuccessFailureDeleteModal(true);
        setDeleteMessage(res.data[0].message);
      });
    else
      deleteProspectApi(id).then((res) => {
        setShowSuccessFailureDeleteModal(true);
        setDeleteMessage(res.data[0].message);
      });
  };

  const handleConfirmDeleteModalCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <CustomModal
      visible={showDeleteModal}
      handleCancel={handleConfirmDeleteModalCancel}
      handleOk={handleConfirmDeleteModalOk}
    >
      <div className="modal-header" style={{ display: "flex", alignItems: "center" }}>
        <div className="header-icon">
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
        <div className="header-title">Delete {textLP}</div>
      </div>
      <div className="modal-body">Are you sure you want to delete this particular {textLP}?</div>
      <div className="modal-footer">
        <Button className="text-only-btn" key="back" type="text" onClick={handleConfirmDeleteModalCancel}>
          Cancel
        </Button>
        <Button className="submit-btn" key="submit" type="primary" onClick={handleConfirmDeleteModalOk}>
          Delete
        </Button>
      </div>
    </CustomModal>
  );
};

export default RenderConfirmDeleteModal;

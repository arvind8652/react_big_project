import { Button } from "antd";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import CustomModal from "../../../components/Modal/CustomModal/CustomModal";
import { deleteWorkflowOrder } from "../../../api/primaryMarketApi";

export const DeleteOrder = (props) => {
  const {
    showDeleteModalFlag = false,
    dealId = "",
    isUpload = true,
    handleDeleteModal,
  } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(showDeleteModalFlag);
  const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] =
    useState(false);
  const [deleteProspectMessage, setDeleteProspectMessage] = useState("");
  const history = useHistory();
  const handleConfirmDeleteModalCancel = () => {
    setShowDeleteModal(false);
    handleDeleteModal();
  };
  const handleConfirmDeleteModalOk = () => {
    deleteWorkflowOrder([dealId]).then((response) =>
      setDeleteProspectMessage(response.data[0].message)
    );

    setShowSuccessFailureDeleteModal(true);
    setShowDeleteModal(false);
  };

  const handleSuccessFailureDeleteModalOk = () => {
    setShowSuccessFailureDeleteModal(false);
    history.push("/dashboard/OrderBook");
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
          <div className="header-title">Delete Order</div>
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

  const RenderConfirmDeleteModal = () => {
    return (
      <CustomModal
        visible={showDeleteModal}
        handleCancel={handleConfirmDeleteModalCancel}
      >
        <div
          className="modal-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="header-icon">
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="header-title">Cancel Order</div>
        </div>
        <div className="modal-body">
          Are you sure you want to cancel this particular order?
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            key="back"
            type="text"
            onClick={handleConfirmDeleteModalCancel}
          >
            Exit
          </Button>
          <Button
            className="submit-btn"
            key="submit"
            type="primary"
            onClick={handleConfirmDeleteModalOk}
          >
            Confirm cancel
          </Button>
        </div>
      </CustomModal>
    );
  };
  return (
    <>
      <RenderConfirmDeleteModal />
      <RenderSuccessFailureDeleteModal />
    </>
  );
};

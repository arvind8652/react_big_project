import { useHistory } from "react-router-dom";
import "./LeadViewScreen.scss";
import { Button } from "antd";
import { faTrashAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";

const RenderSuccessFailureDeleteModal = ({
  deleteLeadMessage,
  showSuccessFailureDeleteModal,
  setShowSuccessFailureDeleteModal,
}) => {
  const history = useHistory();
  const handleSuccessFailureDeleteModalOk = () => {
    setShowSuccessFailureDeleteModal(false);
    history.push("/dashboard/myLead");
  };

  return (
    <CustomModal visible={showSuccessFailureDeleteModal} handleOk={handleSuccessFailureDeleteModalOk}>
      <div className="modal-header" style={{ display: "flex", alignItems: "center" }}>
        <div className="header-icon">
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
        <div className="header-title">Delete Lead</div>
      </div>
      <div className="modal-body">{deleteLeadMessage}</div>
      <div className="modal-footer">
        <Button className="submit-btn" key="submit" type="primary" onClick={handleSuccessFailureDeleteModalOk}>
          OK
        </Button>
      </div>
    </CustomModal>
  );
};

export default RenderSuccessFailureDeleteModal;

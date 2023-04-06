import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
// import "../../screens/ProspectViewScreen/ProspectComponent/CardView.scss";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";
// import { deleteClientApi } from "../../api/customerViewApi";
const { Text, Link, Title } = Typography;

const ReportDeleteModal = (props) => {
    const {
        showDeleteModalFlag = false,
        customerId = "",
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
        // let payload = { lstRefID: [customerId] };
        // deleteClientApi(payload).then((res) => {
        //     setShowSuccessFailureDeleteModal(true);
        //     setDeleteProspectMessage(res.data[0].message);
        //     setShowDeleteModal(false);
        // });
    };

    const handleSuccessFailureDeleteModalOk = () => {
        setShowSuccessFailureDeleteModal(false);
        history.push("/dashboard/MyCustomer/Onboarding");
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

    const RenderConfirmDeleteModal = () => {
        return (
            <CustomModal
                visible={showDeleteModal}
                handleCancel={handleConfirmDeleteModalCancel}
                handleOk={handleConfirmDeleteModalOk}
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
                <div className="modal-body">
                    Are you sure you want to delete this particular client ?
        </div>
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
                        Delete
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

export default ReportDeleteModal;

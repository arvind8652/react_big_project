import React, { useState, useEffect } from "react";

// styles
import "./OrderBook.scss";
import { useHistory } from "react-router-dom";
import GenericTable from "../../components/GenericTable/GenericTable";
import {
  renderAvatarColumn,
  renderOrderDetailsColumn,
  renderMoreOptions,
  renderProfileColumn,
  renderTypeColumn,
  renderStatusColumn,
  renderAccountColumn,
} from "./TableComponent";
import SecurityDetails from "./SecurityDetails";
import { ApproveOrder } from "../PrimaryMarket/OrderBookView/ApproveOrder";
import { RejectOrder } from "../PrimaryMarket/OrderBookView/RejectOrder";
import { DeleteOrder } from "../PrimaryMarket/OrderBookView/DeleteOrder";

const TableUI = ({
  tableData,
  activeTab,
  userRole,
  setBoolean,
  setShowApproveModal,
  setShowRejectModal,
  showApproveModal,
  showRejectModal,
  handleCallBack,
  selRow,
  showLoader = false,
}) => {
  const [selectedRow, setSeletedRow] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const selectedOption = (data, funName) => {
    setSeletedRow(data);
    switch (funName) {
      case "Approve":
        handleApproveModal(data);
        break;
      case "Reject":
        handleRejectModal();
        break;
      case "Cancel":
        handleDeleteModal();
        break;
      case "View":
        navigateToView(data);
        break;
      case "Edit":
        handleEditModal(data);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      float: "right",
      title: " ",
      dataIndex: "profileImage",
      key: "avatar",
      width: 16.6,
      // onCell: onCellDefault,
      render: (profileImage, dataObject) =>
        renderAvatarColumn(profileImage, dataObject),
    },
    {
      float: "left",
      title: "Security",
      dataIndex: "security",
      key: "security",
      width: 16.6,
      // onCell: onCellDefault,
      render: (security, dataObject) =>
        renderProfileColumn(security, dataObject),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 16.6,
      // onCell: onCellDefault,
      render: (type, dataObject) => renderTypeColumn(type, dataObject),
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      align: "center",
      width: 16.6,
      // onCell: onCellDefault,
      render: (orderDetails, dataObject) =>
        renderOrderDetailsColumn(orderDetails, dataObject),
    },
    // {
    // 	title: "Compliance",
    // 	dataIndex: "compliance",
    // 	key: "compliance",
    // 	align: "left",
    // 	// onCell: onCellDefault,
    // 	render: (compliance, dataObject) => renderComplianceColumn(compliance, dataObject),
    // },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      // onCell: onCellDefault,
      width: 16.6,
      render: (status, dataObject) => renderStatusColumn(status, dataObject),
    },
    {
      title: "Account",
      key: "account",
      dataIndex: "account",
      align: "center",
      // onCell: onCellDefault,
      width: 16.6,
      render: (account, dataObject) => renderAccountColumn(account, dataObject),
    },
    {
      float: "left",
      title: "",
      dataIndex: "options",
      key: "options",
      width: 16.6,

      render: (options, dataObject) =>
        renderMoreOptions(options, dataObject, selectedOption, userRole),
    },
  ];

  const navigateToView = (data) => {
    const { marketType, dealId } = data;
    let toObject = {};
    if ("primary" === marketType.toLowerCase()) {
      toObject = {
        pathname: `/dashboard/OrderBook/OrderView`,
        state: {
          marketType: marketType,
          dealId: dealId,
        },
      };
    } else {
      toObject = {
        pathname: `/dashboard/OrderBook/OrderBookView`,
        state: {
          marketType: marketType,
          dealId: dealId,
        },
      };
    }
    history.push(toObject);
  };

  const handleEditModal = (data) => {
    const { marketType, dealId, tranType } = data;

    let toObject = {};
    if (marketType.toLowerCase() === "primary") {
      toObject = {
        pathname: `/dashboard/orderBook/investment`,
        state: {
          dealId: dealId,
          pmOrderData: data,
          activeTab: activeTab,
        },
      };
    } else {
      toObject = {
        pathname: `/dashboard/orderBook/OrderBookInput`,
        state: {
          dealId: dealId,
          data: data,
          tranType: tranType,
          buySell: tranType,
        },
      };
    }

    history.push(toObject);
  };

  const history = useHistory();
  const showSecurityModal = (data) => {
    setSeletedRow(data);
    setShowModal(true);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const handleApproveModal = (data) => {
    setShowApproveModal(!showApproveModal);
    setSeletedRow(data);
  };
  const handleRejectModal = () => {
    setShowRejectModal(!showRejectModal);
  };

  return (
    <>
      {showApproveModal && (
        <ApproveOrder
          showApproveModal={showApproveModal}
          setShowApproveModal={setShowApproveModal}
          handleApproveModal={handleApproveModal}
          dealId={selectedRow?.dealId}
          marketType={selectedRow?.marketType}
          setBoolean={setBoolean}
          selRow={selRow}
          selectedRows={selectedRows}
          selectedRowKeys={selectedRowKeys}
          setSelectedRows={setSelectedRows}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      )}
      {showRejectModal && (
        <RejectOrder
          showRejectModal={showRejectModal}
          setShowRejectModal={setShowRejectModal}
          handleRejectModal={handleRejectModal}
          dealId={selectedRow?.dealId}
          marketType={selectedRow?.marketType}
          setBoolean={setBoolean}
          selRow={selRow}
          selectedRows={selectedRows}
          selectedRowKeys={selectedRowKeys}
          setSelectedRows={setSelectedRows}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      )}
      {showDeleteModal && (
        <DeleteOrder
          showDeleteModalFlag={showDeleteModal}
          handleDeleteModal={handleDeleteModal}
          dealId={selectedRow?.dealId}
          setBoolean={setBoolean}
        />
      )}
      <SecurityDetails
        show={showModal}
        setShow={(val) => setShowModal(val)}
        data={selectedRow}
      />
      <GenericTable
        tableRows={tableData}
        tableColumns={columns}
        tableData={tableData}
        pageSize={25}
        scroll={{ x: "max-content" }}
        tableOptions={{
          checkbox: true,
          expandableRow: false,
          favorite: false,
          pagination: true,
          isMenuOptions: false,
        }}
        onRowClick={(rowData) => {
          showSecurityModal(rowData);
        }}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        handleCallBack={handleCallBack}
        loading={showLoader}
      />
    </>
  );
};

export default TableUI;

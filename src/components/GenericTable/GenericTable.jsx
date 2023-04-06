import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Row, Col, Menu, Popover, Button } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { faEllipsisHAlt } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
  },
];

const rows = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const menuOptions = () => (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

const menuComponent = {
  align: "right",
  menu: true,
  render: () => {
    return (
      <div className="col-more">
        <Popover placement="bottomLeft" content={menuOptions} overlayClassName="genericTable-listing-actions-popover">
          <FontAwesomeIcon icon={faEllipsisHAlt} size="2x" className="row-actions-menu-icon" />
        </Popover>
      </div>
    );
  },
};

const someHandler = (rowIndex) => {
  // alert("RowHover")
};
const defaultTableOpt = {
  checkbox: true,
  expandableRow: true,
  favorite: false,
  pagination: false,
  isMenuOptions: false,
};

const GenericTable = ({
  rowKey,
  tableColumns = columns,
  tableRows = rows,
  tableOptions = defaultTableOpt,
  menuOptions,
  pageSize = 25,
  scroll = false,
  showHeader = true,
  loading = false,
  onRowClick = (rowData, rowIndex) => {
    // console.log(rowData, rowIndex, "Row Clicked");
  },
  onRowSelection = () => {},
  onChange = () => {},
  tableData = [],
  handleCallBack = () => {},
  selectedRows = [],
  setSelectedRows = () => {},
  selectedRowKeys = [],
  setSelectedRowKeys = () => {},
}) => {
  const [favoriteUser, favoriteHandler] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [checkOrderTrade, setCheckOrderTrade] = useState(false);
  let checkFlag = 0;
  if (tableData && tableData.length > 0 && tableData[0]?.workFlowFormType) checkFlag = 1;
  const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);
  const setFavorite = () => {
    favoriteHandler(!favoriteUser);
  };

  const rowSelection = {
    onChange: (rowKeys, rows) => {
      setSelectedRowKeys(rowKeys);
      setSelectedRows(rows);
      handleCallBack(rowKeys, rows);
    },
    onSelectAll: (enabled) => {
      if (enabled) {
        setShowSelectAllofAllPrompt(true);
      } else {
        setShowSelectAllofAllPrompt(false);
        setSelectedRowKeys([]);
        setSelectedRows([]);
      }
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",

      name: record.name,
    }),
    selectedRowKeys: selectedRowKeys,
  };
  const selectAllRecords = () => {
    if (checkFlag === 1) setSelectedRowKeys(tableData.map((item) => item.dealId));
    if (checkFlag === 0) setSelectedRowKeys(tableRows.map((item) => item.fundName));
    if (rowKey === "documentId") setSelectedRowKeys(tableData.map((item) => item.documentId));
    setSelectedRows(tableData);
  };
  const clearSelection = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  useEffect(() => {
    const favComponent = {
      align: "right",
      // menu:true,
      render: () => {
        if (favoriteUser) {
          return (
            <div onClick={() => setFavorite}>
              <StarFilled />
            </div>
          );
        } else {
          return <StarOutlined onClick={() => setFavorite} />;
        }
      },
    };

    if (tableOptions.favorite) {
      tableColumns.push(favComponent);
    }
    if (tableOptions.isMenuOptions) {
      if (!tableColumns.find((e) => e.menu === "true")) {
        /* vendors contains the element we're looking for */
        tableColumns.push(menuComponent);
      }
    }
  }, [tableOptions, tableColumns, favoriteUser]);

  const [selectionType, setSelectionType] = useState("checkbox");

  const expandedRow = (rowData) => {
    return (
      <Row>
        <Col span={4}>
          <p style={{ margin: 0 }}>{rowData[0].title}</p>
          <p style={{ margin: 0 }}>{rowData[0].value}</p>
        </Col>
        <Col span={4}>
          <p style={{ margin: 0 }}>{rowData[1].title}</p>
          <p style={{ margin: 0 }}>{rowData[1].value}</p>
        </Col>
        <Col span={4}>
          <p style={{ margin: 0 }}>{rowData[2].title}</p>
          <p style={{ margin: 0 }}>{rowData[3].value}</p>
        </Col>
      </Row>
    );
  };

  return (
    <div>
      {selectedRowKeys.length > 0 && (
        <span>
          {showSelectAllofAllPrompt ? (
            <>
              <div>All {selectedRowKeys.length} Orders on this page are selected.&nbsp;</div>
              {selectedRowKeys.length !== tableData.length ? (
                <Button
                  type="link"
                  className="link"
                  onClick={() => {
                    selectAllRecords();
                  }}
                  style={{ padding: 0 }}
                >
                  Select all {tableData.length} Orders
                </Button>
              ) : (
                <Button
                  type="link"
                  className="link"
                  onClick={() => {
                    clearSelection();
                  }}
                  style={{ padding: 0 }}
                >
                  Clear Selection
                </Button>
              )}
            </>
          ) : (
            <div>
              {selectedRowKeys.length} Order
              {selectedRowKeys.length > 1 ? "s" : ""}
              &nbsp;on this page {selectedRowKeys.length > 1 ? "are" : "is"} selected.&nbsp;
            </div>
          )}
        </span>
      )}
      <Table
        // rowKey="fundName"
        rowKey={rowKey === "documentId" ? rowKey : checkFlag === 1 ? "dealId" : "fundName"}
        // rowKey="dealId"
        showHeader={showHeader}
        onHeaderRow={(columns, index) => {
          return {
            onClick: () => {}, // click header row
          };
        }}
        loading={loading}
        expandable={
          -!tableOptions.favorite &&
          tableOptions.expandableRow && {
            expandedRowRender: (record) => expandedRow(record.subData),
            rowExpandable: (record) => record.name !== "Not Expandable",
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <PlayCircleTwoTone twoToneColor="#696A91" onClick={(e) => onExpand(record, e)} />
              ) : (
                <PlayCircleTwoTone twoToneColor="#696A91" onClick={(e) => onExpand(record, e)} />
              ),
          }
        }
        expandIconColumnIndex={tableColumns.length}
        rowSelection={
          tableOptions.checkbox && {
            type: selectionType,
            ...rowSelection,
          }
        }
        // rowSelection={rowSelection}
        columns={tableColumns}
        pagination={
          tableOptions.pagination && {
            position: ["topRight"],
            pageSize: pageSize,
            size: "small",
            showSizeChanger: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} `,
          }
        }
        onChange={onChange}
        dataSource={tableRows}
        onRow={(rowData, rowIndex) => {
          return {
            onMouseEnter: (event) => {
              event.stopPropagation();
              someHandler(rowData);
            }, // mouse enter row
            onClick: (event) => {
              event.stopPropagation();
              onRowClick(rowData, rowIndex);
            }, // click row
          };
        }}
        scroll={scroll}
      />
    </div>
  );
};

export default GenericTable;

import React from "react";
import { Table } from "antd";

import "./tableListing.scss";

const TableListing = (props) => {
  return (
    <div>
      <Table
        className="table-container"
        columns={props.columns}
        pagination={false}
        // sticky
        dataSource={props.data}
      />
    </div>
  );
};

export default TableListing;

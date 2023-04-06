import React, { useState } from "react";
import "antd/dist/antd.css";
import { Avatar } from "antd";
import { InfoCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import GenericTable from "../../components/GenericTable/GenericTable";
import "./OrderBookScreen.scss";
const columns = [
	{
		title: "Fund Name",
		dataIndex: "fundName",
		render: (text) => {
			return (
				<div>
					<div style={{ float: "left", height: 68, width: 40, paddingTop: 18, marginLeft: 0 }}>
						<Avatar style={{ backgroundColor: "#ededfa", color: "black" }}>
							<p className="bg">BG</p>
						</Avatar>
					</div>
					<p className="Banco-De-Oro">{text}</p>
					<p style={{ marginBottom: 2 }} className="table-content">
						BD190048|
						<StarFilled className="starfilled" /> <StarFilled className="starfilled" />{" "}
						<StarFilled className="starfilled" /> <StarFilled className="starfilled" />{" "}
						<StarOutlined className="starOutlined" />
					</p>
					<button className="equity-btn">Equity</button>
					<button className="stocks-btn">Stocks</button>
				</div>
			);
		},
	},
	{
		title: "Type",
		dataIndex: "type",
		render: (text) => {
			return (
				<div style={{ paddingRight: 30 }}>
					<button className="buy-btn">{text}</button>
					<p className="table-content">Systematic Mandate</p>
				</div>
			);
		},
	},
	{
		title: "Order Details",
		dataIndex: "orderDetails",
		render: (text) => {
			return (
				<div style={{ paddingRight: 30 }}>
					<p style={{ marginBottom: 2 }} className="table-content1">
						{text} <InfoCircleOutlined className="infoCircleOutlined" />
					</p>
					<p className="table-content">100 Units</p>
				</div>
			);
		},
	},
	{
		title: "Compliance",
		dataIndex: "compliance",
		render: (text) => {
			return (
				<div style={{ paddingRight: 30 }}>
					<p style={{ marginBottom: 0 }} className="table-content1">
						{text}
					</p>
				</div>
			);
		},
	},
	{
		title: "Status",
		dataIndex: "status",
		render: (text) => {
			return (
				<div style={{ paddingRight: 30 }}>
					<button className="placed-btn">{text}</button>
					<p className="table-content">Authorization Pending</p>
				</div>
			);
		},
	},
	{
		title: "Account",
		dataIndex: "account",
		render: (text) => {
			return (
				<div style={{ paddingRight: 30 }}>
					<p className="Retirement-Portfo">{text}</p>
					<p style={{ marginBottom: 0 }} className="table-content1">
						Account Nature
					</p>
					<button className="advisory-btn">Advisory</button>
				</div>
			);
		},
	},
];
const data = [
	{
		key: "1",
		fundName: "Banco De Oro",
		type: "Buy",
		orderDetails: "$ 6000",
		compliance: "Breached",
		status: "Placed",
		account: "Retirement Portfolio",
	},
	{
		key: "2",
		fundName: "Banco De Oro",
		type: "Buy",
		orderDetails: "$ 6000",
		compliance: "Breached",
		status: "Placed",
		account: "Retirement Portfolio",
	},
	{
		key: "3",
		fundName: "Banco De Oro",
		type: "Buy",
		orderDetails: "$ 6000",
		compliance: "Breached",
		status: "Placed",
		account: "Retirement Portfolio",
	},
];
const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
	},
	getCheckboxProps: (record) => ({
		disabled: record.name === "Disabled User",
		name: record.name,
	}),
};
const OrderBookTable = () => {
	const [selectionType] = useState("checkbox");
	return (
		<div>
			<GenericTable tableColumns={columns} tableRows={data} className="table-striped-rows" />
		</div>
	);
};
export default OrderBookTable;

import UserDetails from "../UserDetail/UserDetail";
import { Avatar, Row, Col } from "antd";
export const BANKDETAILS_COL_M = [
    {
        title: "Fund",
        dataIndex: "fund",
        key: "fund",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Units",
        dataIndex: "units",
        key: "units",
    },
    {
        title: "Book Value",
        dataIndex: "bookValue",
        key: "bookValue",
    },
    {
        title: "Income",
        key: "income",
        dataIndex: "income",

    },
    {
        title: "Market Value",
        key: "marketValue",
        dataIndex: "marketValue",

    },
    {
        title: "Market Value",
        key: "marketValue",
        dataIndex: "marketValue",

    },
    {
        title: "Accounts",
        key: "account",
        dataIndex: "account",

    },
];


export const BANKDETAILS_DATA_M = [
    {
        key: "1",
        fund: <UserDetails />,
        units: "120 Locked-in",
        bookValue: "$120,000 $1000 Unit",
        income: "$128,000 Reinvested",
        marketValue: "$128,000 +$8000(+12%)",
        marketValue: "$120,000 +$8000(+11.5%)",
        account: <Avatar style={{ marginRight: "13px", }} />,
    },


];

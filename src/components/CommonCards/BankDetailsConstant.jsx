export const BANKDETAILS_COL = [
  {
    title: "Bank Name",
    dataIndex: "bankNameDisplayValue",
    key: "bankNameDisplayValue",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Office",
    dataIndex: "branchName",
    key: "branchName",
  },
  {
    title: "Account Number",
    dataIndex: "accountNo",
    key: "accountNo",
  },
  {
    title: "Account Type",
    key: "accountTypeName",
    dataIndex: "accountTypeName",
  },
  {
    title: "Status",
    key: "accountStatusName",
    dataIndex: "accountStatusName",
  },
  {
    title: "Currency",
    key: "currencyName",
    dataIndex: "currencyName",
  },
  {
    title: "Remarks",
    key: "remarks",
    dataIndex: "remarks",
  },
];

export const MISCELLANEOUSDETAILS_COL = [
  {
    title: "Hobby",
    dataIndex: "bankName",
    key: "bankName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Occupation",
    dataIndex: "branchName",
    key: "branchName",
  },
  {
    title: "Text Value",
    dataIndex: "accountNo",
    key: "accountNo",
  },
  {
    title: "Date Value",
    key: "accountTypeName",
    dataIndex: "accountTypeName",
  },
  {
    title: "Numeric Value",
    key: "accountStatusName",
    dataIndex: "accountStatusName",
  },
];

export const BANKDETAILS_DATA = [
  {
    key: "1",
    name: "ICICI",
    branch: "Nariman Point",
    accountNumber: "0123456789",
    accountType: "Saving",
    status: "Active",
  },
];

export const SECURITYACCOUNTS_COL = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Service Provider",
    dataIndex: "serviceProviderName",
    key: "serviceProviderName",
  },
  {
    title: "Account Number",
    dataIndex: "accountNumber",
    key: "accountNumber",
  },
  {
    title: "Sub Asset Class",
    key: "accountNumber",
    dataIndex: "accountNumber",
  },
  {
    title: "Status",
    key: "accStatusName",
    dataIndex: "accStatusName",
  },
];

export const columns = [
  {
    title: "Bank Name",
    dataIndex: "bankName",
    key: "bankName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Branch",
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
    dataIndex: "accountTypeName",
    key: "accountTypeName",
  },
  {
    title: "Status",
    dataIndex: "accountStatusName",
    key: "accountStatusName",
  },
];

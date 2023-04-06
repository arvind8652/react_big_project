
import { Table, Tag, Card, Space, Row, Col, Avatar, Divider, Tooltip, Menu, Tabs, } from "antd";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import PortfolioHoldingSubTable from "./PortfolioHoldingSubTable";

const DemoTable = () => {
const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return(
      <>
  <Table 
  onRow={(record, recordIndex) => ({
    onClick: event => {console.log("Hi") } 
  })}
  dataSource={dataSource} columns={columns} />;
  </>
  );
};
export default DemoTable;
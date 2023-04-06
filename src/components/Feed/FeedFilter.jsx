import React from 'react'
import { Card, Row, Col, Select, Input } from 'antd'
// import './Feed.scss';
import './Feed.scss';
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Search } = Input;

const FeedFilter = ({ tagFilterHandler }) => {

    const styles = {
        cardStyle: { margin: "16px 0", borderRadius: "8px" },
        // cardLeft: { margin: "0 auto 0 0", width: "160px", display: "flex", justifyContent: "left" },
        commonStyle: { textAlign: "right" },


    }
    return (

        <Card style={styles.cardStyle}>
            {/* <div style={styles.cardLeft}></div>
            <div style={styles.commonStyle}>
                <div className="filterDiv">test1</div>
            </div>
            <div style={styles.commonStyle}>
                <div className="filterDiv">test2</div>
            </div> */}
            <Row>
                <Col span={10}></Col>
                <Col span={8}><div className="searchDiv" style={styles.commonStyle}>
                    {/* <Search placeholder="input search text" style={{ width: 200 }} /> */}
                    <Input className="searchInput" placeholder="Search Feed" /><span className="searchIcon"><SearchOutlined onClick={() => { alert('test') }} /></span>
                </div></Col>
                <Col span={6}><div style={styles.commonStyle} className="searchDropdown">
                    <Select

                        placeholder="All Tags"
                        onChange={(event) => { tagFilterHandler(event) }}
                        allowClear
                    >
                        <Option value="Wealth">Wealth</Option>
                        <Option value="Bond">Bond</Option>
                        <Option value="Equity">Equity</Option>
                    </Select>
                </div></Col>
            </Row>

        </Card>
    )
}

export default FeedFilter

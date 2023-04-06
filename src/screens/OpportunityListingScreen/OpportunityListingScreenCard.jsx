import React from "react";
import "antd/dist/antd.css";
import {
  Avatar,
  Button,
  Select,
  Tag,
  Card,
  Col,
  Row,
  Checkbox,
} from "antd";
import "./OpportunityListingScreen.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faPlus,
  faTrashAlt,
  faStar,
  faEllipsisHAlt,
} from "@fortawesome/pro-light-svg-icons";
import {
  faFilter,
  faArrowAltToBottom,
  faThLarge,
} from "@fortawesome/pro-solid-svg-icons";

import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";

const RenderTopBar = ({ url, history }) => {
  return (
    <div className="dashboard-topbar-container">
      <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" />
      <div>My Opportunities</div>
      <Button className="topbar-btn">
        <NavLink to="opportunityCreate">
          <FontAwesomeIcon
            icon={faPlus}
            style={{ marginRight: 8 }}
            // onClick={() => {
            //   history.push("leadInput");
            // }}
          />
          Add
        </NavLink>
      </Button>
    </div>
  );
};

const RenderDropdown = ({ mode, onSelect }) => {
  let options = [];
  if (mode === "filter") {
    options = [
      { label: "Show All", value: "Show All" },
      { label: "Recently Modified", value: "Recently Modified" },
      { label: "Created in last 7 days", value: "Created in last 7 days" },
      { label: "Created in last 15 days", value: "Created in last 15 days" },
      { label: "Created in last 30 days", value: "Created in last 30 days" },
      { label: "None", value: "" },
    ];
  } else if (mode === "sort") {
    options = [
      { label: "Recently Modified", value: "Recently Modified" },
      { label: "Recently Created", value: "Recently Created" },
      { label: "None", value: "" },
    ];
  }
  return (
    <div style={{ position: "relative" }}>
      <div className="dropdown-prefix">
        {mode.charAt(0).toUpperCase() + mode.substring(1)}:
      </div>
      <Select
        className={"filter-sort-dropdown " + mode}
        size="large"
        defaultValue=""
        onSelect={onSelect}
        showArrow
      >
        {options.map((option, index) => (
          <Select.Option key={index} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
const RenderFiltersPanel = () => {
  return (
    <div className="filters-panel">
      <div className="left">
        <FontAwesomeIcon
          // onClick={() => setShowUpgradeModal(true)}
          icon={faWindowClose}
          // className={loading ? "disabled-icon" : "icon"}
        />

        <FontAwesomeIcon
          // onClick={() => setShowDeleteModal(true)}
          icon={faTrashAlt}
          // className={loading ? "disabled-icon" : "icon"}
        />
      </div>
      <RenderDropdown
        mode="filter"
        //onSelect={onFilterSelect}
      />
      <RenderDropdown
        mode="sort"
        //onSelect={onSortSelect}
      />
      <div className="right">
        <FontAwesomeIcon
          icon={faFilter}
          // className={loading ? "disabled-icon" : "icon"}
          //onClick={() => {
          //toggleDrawer();
          //}}
        />
        <FontAwesomeIcon
          icon={faArrowAltToBottom}
          // className={loading ? "disabled-icon" : "icon"}
        />
        <FontAwesomeIcon
          icon={faThLarge}
          // className={loading ? "disabled-icon" : "icon"}
        />
      </div>
    </div>
  );
};
function OpportunityListingScreenCard() {
  // const rowSelection = {
  //     onChange: (selectedRowKeys, selectedRows) => {
  //     },
  //     getCheckboxProps: (record) => ({
  //       disabled: record.name === 'Disabled User',
  //       // Column configuration not to be checked
  //       name: record.name,
  //     }),
  //   };
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <div className="opportunity-listing-container">
      <RenderTopBar />
      <RenderFiltersPanel />
      <div className="site-card-wrapper">
        <Row gutter={24}>
          <Col span={8}>
            <Card bordered={false}>
              <Row>
                <Col span={2}>
                  <Checkbox onChange={onChange} />
                </Col>
                <Col span={14}>
                  <strong>AIF Fund Investment</strong>
                </Col>
                <Col span={1} offset={5}>
                  <FontAwesomeIcon icon={faStar} />
                </Col>
                <Col span={1} offset={1}>
                  <FontAwesomeIcon icon={faEllipsisHAlt} />
                </Col>
              </Row>
              <Row>
                <Col span={14} offset={2}>
                  $ 25000
                </Col>
              </Row>
              <Row>
                <Col span={14} offset={2} style={{ color: "#696A91" }}>
                  Negotiation and Review
                </Col>
                <Col span={3} offset={5}>
                  <Tag
                    style={{
                      backgroundColor: "#F0F2FB",
                      color: "#696A91",
                      borderRadius: "16px",
                    }}
                  >
                    Closed
                  </Tag>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={2} offset={2}>
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    U
                  </Avatar>
                </Col>
                <Col span={10}>
                  Chris Ramos
                  <Row style={{ color: "#696A91" }}>Prospect</Row>
                </Col>
                <Col span={5} offset={5} style={{ flex: "end" }}>
                  31 Mar 2021
                  <Row style={{ color: "#696A91" }}>Due Date</Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Row>
                <Col span={2}>
                  <Checkbox onChange={onChange} />
                </Col>
                <Col span={14}>
                  <strong>AIF Fund Investment</strong>
                </Col>
                <Col span={1} offset={5}>
                  <FontAwesomeIcon icon={faStar} />
                </Col>
                <Col span={1} offset={1}>
                  <FontAwesomeIcon icon={faEllipsisHAlt} />
                </Col>
              </Row>
              <Row>
                <Col span={14} offset={2}>
                  $ 25000
                </Col>
              </Row>
              <Row>
                <Col span={14} offset={2} style={{ color: "#696A91" }}>
                  Negotiation and Review
                </Col>
                <Col span={3} offset={5}>
                  <Tag
                    style={{
                      backgroundColor: "#F0F2FB",
                      color: "#696A91",
                      borderRadius: "16px",
                    }}
                  >
                    Closed
                  </Tag>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={2} offset={2}>
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    U
                  </Avatar>
                </Col>
                <Col span={10}>
                  Chris Ramos
                  <Row style={{ color: "#696A91" }}>Prospect</Row>
                </Col>
                <Col span={5} offset={5} style={{ flex: "end" }}>
                  31 Mar 2021
                  <Row style={{ color: "#696A91" }}>Due Date</Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Row>
                <Col span={2}>
                  <Checkbox onChange={onChange} />
                </Col>
                <Col span={14}>
                  <strong>AIF Fund Investment</strong>
                </Col>
                <Col span={1} offset={5}>
                  <FontAwesomeIcon icon={faStar} />
                </Col>
                <Col span={1} offset={1}>
                  <FontAwesomeIcon icon={faEllipsisHAlt} />
                </Col>
              </Row>
              <Row>
                <Col span={14} offset={2}>
                  $ 25000
                </Col>
              </Row>
              <Row>
                <Col span={14} offset={2} style={{ color: "#696A91" }}>
                  Negotiation and Review
                </Col>
                <Col span={3} offset={5}>
                  <Tag
                    style={{
                      backgroundColor: "#F0F2FB",
                      color: "#696A91",
                      borderRadius: "16px",
                    }}
                  >
                    Closed
                  </Tag>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={2} offset={2}>
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    U
                  </Avatar>
                </Col>
                <Col span={10}>
                  Chris Ramos
                  <Row style={{ color: "#696A91" }}>Prospect</Row>
                </Col>
                <Col span={5} offset={5} style={{ flex: "end" }}>
                  31 Mar 2021
                  <Row style={{ color: "#696A91" }}>Due Date</Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default OpportunityListingScreenCard;

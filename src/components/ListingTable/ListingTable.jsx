import { faHotjar } from "@fortawesome/free-brands-svg-icons";
import { faEllipsisHAlt, faSnowflake } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import { AvatarSize } from "../../constants/AvatarSize";
import AvatarLogo from "../Avatar/AvatarLogo";
import { ScTable } from "../StyledComponents/genericElements";
import CustomerOnboardingTextSubText from "../CustomerOnboardingTable/CustomerOnboardingTextSubText";
import { faCaretCircleDown, faCaretCircleUp } from "@fortawesome/pro-light-svg-icons";

const defaultTableOpt = {
  checkbox: true,
  expandableRow: true,
  favorite: true,
};

const ListingTable = ({
  onRow,
  setSelectedRowKeys,
  selectedRowKeys,
  setSelectedRows,
  setShowSelectAllofAllPrompt,
  allLeadData,
  setShowUpgradeModal,
  setShowAssignModal,
  executeGetAllLeadsData,
  filters,
  setAllLeadData,
  loading,
  tableOptions = defaultTableOpt,
}) => {
  const history = useHistory();
  const renderAvatarColumn = (profileImage, dataObject) => {
    return (
      <div>
        <AvatarLogo imgsrc={profileImage} profileName={dataObject.profileInitial} avatarSize={AvatarSize.small} />
      </div>
    );
  };
  const renderProfileColumn = (profile, dataObject) => {
    if (!dataObject) return null;
    return (
      <div className="col-profile">
        <div className="name">{dataObject.name}</div>
        <div className="profile-tags">
          <div className="category">{dataObject.categoryName}</div>
          <div className="interest-level">
            {dataObject.interestLevelName && dataObject.interestLevelName.toLowerCase() === "hot" ? (
              <FontAwesomeIcon icon={faHotjar} style={{ color: "#EF7C5B" }} />
            ) : (
              <FontAwesomeIcon icon={faSnowflake} style={{ color: "#0085FF" }} />
            )}
          </div>
        </div>
      </div>
    );
  };
  const renderContactColumn = (contact, dataObject) => {
    return (
      <div className="col-text">
        <div>{dataObject.mobile}</div>
        <div>{dataObject.email}</div>
      </div>
    );
  };
  const renderSourceColumn = (source, dataObject) => {
    return <div className="col-text">{source}</div>;
  };
  const renderTypeColumn = (type, dataObject) => {
    return <div className="col-text">{type}</div>;
  };
  const renderRelationshipManagerColumn = (manager, dataObject) => {
    return <div className="col-text">{manager}</div>;
  };
  const renderMoreOptions = (leadId, dataObject) => {
    const options = ["Modify", "Move Up", "Assign"];
    const content = () => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {options.map((option) => (
          <div className="row-action-option">
            <span
              onClick={() => {
                setSelectedRowKeys([leadId]);
                setSelectedRows([dataObject]);

                if (option.toLowerCase() === "modify") {
                  const toObject = {
                    pathname: "/dashboard/MyLead/leadCreate",
                    state: { screen: "list", data: leadId, mode: "edit" },
                  };
                  history.push(toObject);
                }
                option.toLowerCase() === "move up" && setShowUpgradeModal(true);
                option.toLowerCase() === "assign" && setShowAssignModal(true);
              }}
            >
              {option}
            </span>
          </div>
        ))}
      </div>
    );
    return (
      <span
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Popover placement="bottomLeft" content={content} overlayClassName="lead-listing-actions-popover">
          <FontAwesomeIcon icon={faEllipsisHAlt} size="2x" className="row-actions-menu-icon" />
        </Popover>
      </span>
    );
  };
  const columns = [
    {
      float: "right",
      title: " ",
      dataIndex: "profileImage",
      key: "avatar",
      width: 64,
      render: (profileImage, dataObject) => renderAvatarColumn(profileImage, dataObject),
    },
    {
      float: "left",
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, dataObject) => renderProfileColumn(name, dataObject),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      // width: 300,
      render: (contact, dataObject) => renderContactColumn(contact, dataObject),
    },
    {
      title: "Source",
      dataIndex: "sourceName",
      key: "source",
      render: (source, dataObject) => renderSourceColumn(source, dataObject),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "typeName",
      render: (type, dataObject) => renderTypeColumn(type, dataObject),
    },
    {
      title: "Relationship Manager",
      key: "relationship",
      dataIndex: "relationshipManagerName",
      render: (manager, dataObject) => renderRelationshipManagerColumn(manager, dataObject),
    },
    {
      float: "right",
      title: "",
      dataIndex: "leadId",
      key: "leadId",
      render: (leadId, dataObject) => renderMoreOptions(leadId, dataObject),
    },
  ];
  const rowSelection = {
    onChange: (rowKeys, rows) => {
      setSelectedRowKeys(rowKeys);
      setSelectedRows(rows);
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
    selectedRowKeys: selectedRowKeys,
  };

  const expandedRow = (dataObject) => {
    return (
      <div>
        <Row gutter={7}>
          <Col span={4}>
            <CustomerOnboardingTextSubText text={dataObject.FATCAClassificationName} subtext="FATCA Classification" />
          </Col>
          <Col span={4}>
            <CustomerOnboardingTextSubText text={dataObject.PoliticallyExposed} subtext="Politically Exposed" />
          </Col>
          <Col span={4}>
            <CustomerOnboardingTextSubText
              text={dataObject.PotentiallyVulnerableName}
              subtext="Potentially Vulnerable"
            />
          </Col>
          <Col span={4}>
            <CustomerOnboardingTextSubText text={dataObject.AMLAName} subtext="AMLA" />
          </Col>
          <Col span={4}>
            <CustomerOnboardingTextSubText text={dataObject.BannedListName} subtext="Banned List" />
          </Col>
          <Col span={4}>
            <CustomerOnboardingTextSubText text={dataObject.RiskProfileName} subtext="Risk Profile" />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <ScTable
      id="lead-table"
      onRow={onRow}
      rowKey="leadId"
      rowClassName="leadlist-table-row"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={allLeadData}
      loading={loading}
      expandable={
        !tableOptions.favorite &&
        tableOptions.expandableRow && {
          expandedRowRender: (record) => expandedRow(record),
          // rowExpandable: (record) => record.name !== "Not Expandable",
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <FontAwesomeIcon
                className="expandIcon"
                style={{ color: "#6770A2", fill: "#6770A2" }}
                icon={faCaretCircleUp}
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              // <UpCircleFilled
              //   twoToneColor="#696A91"
              //   onClick={(e) => onExpand(record, e)}
              // />
              <FontAwesomeIcon
                className="expandIcon"
                style={{ color: "#6770A2", fill: "#6770A2" }}
                icon={faCaretCircleDown}
                onClick={(e) => onExpand(record, e)}
              />
            ),
        }
      }
      expandIconColumnIndex={columns.length}
      pagination={{
        position: ["topRight"],
        pageSize: 25,
        showSizeChanger: false,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total <= 100 ? total : "100+"} items`,
      }}
      onChange={(e) => {
        if (allLeadData.length - e.current * e.pageSize <= e.pageSize) {
          executeGetAllLeadsData(filters, setAllLeadData, allLeadData, e.current * e.pageSize);
        }
      }}
    />
  );
};

export default ListingTable;

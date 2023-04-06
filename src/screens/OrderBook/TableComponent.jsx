import { faEllipsisHAlt } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Rate } from "antd";

import AvatarLogo from "../../components/Avatar/AvatarLogo";
import { AvatarSize } from "../../constants/AvatarSize";
import "../../components/CustomerOnboardingTable/CustomerOnboardingTable.scss";
// import { theme } from "../../theme";
import "./TableComponent.scss";

export const renderAvatarColumn = (profileImage, dataObject) => {
  return (
    <div>
      {dataObject.securityLogo === null || dataObject.securityLogo === "U" ? (
        <AvatarLogo
          imgsrc={dataObject.securityLogo}
          profileName={dataObject.securityInitial}
          avatarSize={AvatarSize.extrasmall}
        />
      ) : (
        <AvatarLogo
          imgsrc={dataObject.securityLogo}
          profileName={dataObject.securityInitial}
          avatarSize={AvatarSize.extrasmall}
        />
      )}
    </div>
  );
};

export const renderTaxStatusColumn = (taxStatus, dataObject) => {
  return (
    <div>
      <div>{dataObject.taxStatusName}</div>
    </div>
  );
};

export const renderProfileColumn = (profile, dataObject) => {
  if (!dataObject) return null;
  return (
    <div className="security">
      <div className="securityName">{dataObject.securityName}</div>
      <div className="rate">
        <div>{dataObject.originalRefid ?? dataObject.dealId} |{" "}</div>
        <div className="stars">
          <Rate
          // className="rate"
            disabled
            defaultValue={dataObject && dataObject?.starRating}
          />
        </div>
      </div>
      <div>{dataObject.customerCategoryName}</div>
      {/* <div>
        <div className="subHeaderName">
          {dataObject.originalRefid ?? dataObject.dealId} |{" "}
          <Rate
            className="rate"
            disabled
            defaultValue={dataObject && dataObject?.starRating}
          />
        </div>
        <div className="subHeaderName">
            {dataObject.customerCategoryName}
          </div>
      </div> */}
    </div>
  );
};
export const renderTypeColumn = (branchName, dataObject) => {
  return (
    <div className="type">
      <div>{dataObject.tranTypeName}</div>
      <div>{dataObject.marketType}</div>
    </div>
  );
};
export const renderOrderDetailsColumn = (type, dataObject) => {
  return (
    <div className="type">
      <div>{`${dataObject.currencySymbol} ${dataObject.amount}`}</div>
      <div>{`${dataObject.units} Units`}</div>
    </div>
  );
};
export const renderTradeDetailsColumn = (type, dataObject) => {
  return (
    <div className="subHeaderName">
      <p>
        {dataObject.allotmentCurrencySymbol}
        {dataObject.allotmentAmount}
      </p>
      <p>
        {dataObject.allotmentUnits}
        {" Units"}
      </p>
    </div>
  );
};
export const renderComplianceColumn = (status, dataObject) => {
  return <div className="subHeaderName">{dataObject.complianceName}</div>;
};
export const renderStatusColumn = (status, dataObject) => {
  const arr = dataObject.nextStatusName.split(' ');
  return (
    <div className="type">
      <div>{dataObject.statusName ?? "-"}</div>
      <div className="subName">
        <div>{arr.slice(0, 2).join(' ')}</div>
        <div>{arr.slice(2, dataObject.nextStatusName.length).join(' ')}</div>
      </div>
    </div>
  );
};

export const renderAccountColumn = (status, dataObject) => {
  return (
    <div className="type">
      <div className="accountName">{dataObject.schemeName}</div>
      <div>{"Account Nature"}</div>
      <div>{dataObject.accountNature}</div>
      {/* <p style={{ color: "#222747", fontWeight: 'bold' }}>{dataObject.schemeName}</p>
      <p>{"Account Nature"}</p>
      <p>{dataObject.accountNature}</p> */}
    </div>
  );
};

export const renderMoreOptions = (
  customerCode,
  dataObject,
  callBack,
  userRole
) => {
  let options = ["View"];
  if (
    dataObject.workFlowFormType === "ApproveReject" &&
    dataObject.workFlowUserGroup === userRole
  ) {
    options.push("Approve", "Reject");
  } else if (
    dataObject.workFlowFormType === "Modificaiton" &&
    dataObject.workFlowUserGroup === userRole
  ) {
    options.push("Edit", "Cancel");
  }

  const content = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: "20px",
      }}
    >
      {options.map((option, index) => (
        <div key={index} className="row-action-option">
          <span
            onClick={(e) => {
              e.stopPropagation();
              option === "Approve" && callBack(dataObject, "Approve");
              option === "Reject" && callBack(dataObject, "Reject");
              option === "Cancel" && callBack(dataObject, "Cancel");
              option === "View" && callBack(dataObject, "View");
              option === "Edit" && callBack(dataObject, "Edit");
            }}
          >
            {option}
          </span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="col-more">
      <Popover
        placement="bottomLeft"
        content={content}
        // trigger="click"
        overlayClassName="customerOnboarding-listing-actions-popover"
      >
        <FontAwesomeIcon
          icon={faEllipsisHAlt}
          size="2x"
          className="row-actions-menu-icon"
        />
      </Popover>
    </div>
  );
};

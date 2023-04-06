import { AvatarSize } from "../../../constants/AvatarSize";
import AvatarLogo from "../../../components/Avatar/AvatarLogo";
import GenericBadge from "../../../components/GenericBadge/GenericBadge";
import { theme } from "../../../theme";


const renderAvatarColumn = (profileImage, dataObject) => {
  return (
    <div>
      <AvatarLogo
        imgsrc={dataObject?.clientCard?.profileImage}
        profileName={dataObject?.clientCard?.profileInitial}
        avatarSize={AvatarSize.small}
      />
    </div>
  );
};
const renderProfileColumn = (profile, dataObject) => {
  if (!dataObject) return null;
  return (
    <div>
      <div style={theme.profileName}>{dataObject?.clientCard?.clientName}</div>
      <div style={theme.profileTag}>
        {dataObject?.clientCard?.customerId}
        {dataObject?.clientCard?.familyName &&
          `|${dataObject?.clientCard?.familyName}`}
      </div>

      <div>
        <div>{}</div>
        <div style={theme.profileTag}>
          <GenericBadge badgeBody={dataObject?.clientCard?.category} />
        </div>
      </div>
    </div>
  );
};
const renderContactColumn = (contact, dataObject) => {
  return (
    <div>
      <div>{dataObject.aum}</div>
    </div>
  );
};
const renderSourceColumn = (source, dataObject) => {
  return (
    <div>
      <div>{dataObject.revenue}</div>
    </div>
  );
};

export const TABLECOL = [
  {
    float: "right",
    title: " ",
    dataIndex: "profileImage",
    key: "avatar",
    width: 64,
    render: (profileImage, dataObject) =>
      renderAvatarColumn(profileImage, dataObject),
  },
  {
    float: "left",
    title: "Client",
    dataIndex: "clientName",
    key: "clientName",
    render: (clientName, dataObject) =>
      renderProfileColumn(clientName, dataObject),
  },
  {
    title: "Transaction value",
    dataIndex: "aum",
    key: "aum",
    render: (contact, dataObject) => renderContactColumn(contact, dataObject),
  },
  {
    title: "Status",
    dataIndex: "source",
    key: "source",
    render: (source, dataObject) => renderSourceColumn(source, dataObject),
  },
];

const renderAvatarTOPVColumn = (profileImage, dataObject) => {
  return (
    <div>
      <AvatarLogo
        imgsrc={dataObject?.profileImage}
        avatarSize={AvatarSize.small}
      />
    </div>
  );
};
const renderTopVProfileColumn = (profile, dataObject) => {
  if (!dataObject) return null;
  return (
    <div>
      <div>{dataObject?.customerName}</div>
      <div>
        {dataObject?.customerId} &nbsp;
        {dataObject?.familyName && `| ${dataObject?.familyName}`}
      </div>

      <div>
        <div>
          <GenericBadge badgeBody={dataObject?.category} />
        </div>
      </div>
    </div>
  );
};
const renderTopVContactColumn = (contact, dataObject) => {
  return (
    <div>
      <div>{dataObject.currencySymbol}&nbsp;{dataObject.aumTotal.toLocaleString()}</div>
    </div>
  );
};
const renderTopVSourceColumn = (source, dataObject) => {
  return (
    <div>
      <div>{dataObject.revenueTotal}</div>
    </div>
  );
};


export const TABLECOL_TOPV = [
  {
    float: "right",
    title: " ",
    dataIndex: "profileImage",
    key: "avatar",
    width: 150,
    render: (profileImage, dataObject) =>
      renderAvatarTOPVColumn(profileImage, dataObject),
  },
  {
    title: "Client",
    dataIndex: "clientName",
    key: "clientName",
    render: (clientName, dataObject) =>
      renderTopVProfileColumn(clientName, dataObject),
  },
  {
    float: "left",
    title: "AUM",
    dataIndex: "aumTotal",
    key: "aumTotal",
    width: 350,
    render: (contact, dataObject) =>
      renderTopVContactColumn(contact, dataObject),
  },
  // may be used in the future
  // {
  //   title: "Revenue",
  //   dataIndex: "revenueTotal",
  //   key: "revenueTotal",
  //   render: (source, dataObject) => renderTopVSourceColumn(source, dataObject),
  // },
  
];

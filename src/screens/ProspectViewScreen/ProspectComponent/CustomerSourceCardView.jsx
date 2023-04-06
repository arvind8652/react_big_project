import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Space, Typography, Row } from "antd";
import { faFire, faSnowflake } from "@fortawesome/pro-solid-svg-icons";
const { Text } = Typography;

const CustomerSourceView = (props) => {
  const customerDetails = props.data;
  const prospectDetail = props.prospectDetail;
  if (!customerDetails) {
    return null;
  }
  return (
    <Space>
      {customerDetails.profileImage ? (
        <img
          src={`data:image/jpeg;base64,${customerDetails.profileImage}`}
          className="card-img"
          style={{ width: "60px" }}
          alt="user-img"
        />
      ) : (
        <div
          className="prospectSourceInitialsCircleImg"
          style={{ width: "70px", height: "75px" }}
        >
          {customerDetails.profileInitial}
        </div>
      )}
      <Space direction="vertical" size={2}>
        <Text style={{ fontWeight: "600" }}>{customerDetails.name}</Text>
        {customerDetails.recordId && customerDetails.familyName ? (
          <Text
            style={{
              color: "#696A91",
            }}
          >{`${customerDetails.recordId} | ${customerDetails.familyName}`}</Text>
        ) : customerDetails.recordId ? (
          <Text
            style={{
              color: "#696A91",
            }}
          >
            {customerDetails.recordId}
          </Text>
        ) : (
          <Text
            style={{
              color: "#696A91",
            }}
          >
            {customerDetails.familyName}
          </Text>
        )}
        <Row>
          {customerDetails.customerCategory && (
            <Text
              style={{
                backgroundColor: "#F0F2FB",
                color: "#354081",
                padding: "2px 10px",
                borderRadius: "20px",
                fontSize: "14px",
                marginRight: "2px",
              }}
            >
              {customerDetails.customerCategory}
            </Text>
          )}
          {prospectDetail &&
            prospectDetail.interestlevel &&
            prospectDetail.interestlevel === "Hot" && (
              <FontAwesomeIcon
                icon={faFire}
                style={{ color: "orange", marginLeft: "8px" }}
              />
            )}
          {prospectDetail &&
            prospectDetail.interestlevel &&
            prospectDetail.interestlevel === "Cold" && (
              <FontAwesomeIcon
                icon={faSnowflake}
                style={{ color: "#fff", marginLeft: "8px" }}
              />
            )}
        </Row>
      </Space>
    </Space>
  );
};

export default CustomerSourceView;

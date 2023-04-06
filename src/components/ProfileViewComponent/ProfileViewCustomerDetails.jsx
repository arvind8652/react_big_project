import { Row, Col } from "antd";
import TypoGraphy from "../../components/TypoGraphy/TypoGraphy";

const CustomerDetails = () => {
  const customerDetails = {
    fullName: "Mr. Alexandra Romus",
    category: "Wealth",
    CIF: "788758778",
    dateOfBirth: "12 Jan 1967",
    gender: "Female",
    nationality: "Philippines",
    taxStatus: "Mr. Alexandra Romus",
    natureOfBusiness: "Wealth",
    occupation: "1345432345",
    sourceOfFund: "Source of Fund",
    annualIncome: "5441235444",
    netWorth: "1345432345",
    relationshipManager: "Johnathan Doe",
    branch: "Central Avenue",
  };

  const styleSet = {
    wrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "5px",
      gridAutoRows: "80px",
    },
  };
  return (
    <>
      <Row>
        <Col span={8}>
          <TypoGraphy label={"Full Name"}>
            {customerDetails.fullName}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Category"}>{customerDetails.category}</TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"CIF"}>{customerDetails.CIF}</TypoGraphy>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <TypoGraphy label={"Date Of Birth"}>
            {customerDetails.dateOfBirth}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Gender"}>{customerDetails.gender}</TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Nationality"}>
            {customerDetails.nationality}
          </TypoGraphy>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <TypoGraphy label={"Tax Status"}>
            {customerDetails.taxStatus}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Nature Of Business"}>
            {customerDetails.natureOfBusiness}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Occupation"}>
            {customerDetails.occupation}
          </TypoGraphy>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <TypoGraphy label={"Source Of Fund"}>
            {customerDetails.sourceOfFund}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Annual Income"}>
            {customerDetails.annualIncome}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Net Worth"}>
            {customerDetails.netWorth}
          </TypoGraphy>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <TypoGraphy label={"Relationship Manager"}>
            {customerDetails.relationshipManager}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Branch"}>{customerDetails.branch}</TypoGraphy>
        </Col>
      </Row>
    </>
  );
};
export default ProfileViewCustomerDetails;

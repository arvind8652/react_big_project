import { Button, Card, Col, Row, Typography, Divider, Menu, Dropdown, message, Select, Rate, Progress } from "antd";
import { palette, fontSet, avatar } from "../../theme";
import Avatar from "antd/lib/avatar/avatar";
import { theme } from "../../theme";


const defaultValues = {
    name: "Alexandra Sandralock",
    family: "Sandralock Family",
    nature: "Account Nature",
    tagName: "Wealth",
    secondaryTag: "Advisory",
};
const SimpleUserDetail = ({ SimpleUserDetail = defaultValues }) => {
    const styleSet = {
        name: {
            fontSize: fontSet.heading.large,
        },
    };
    return (
        <>
            {SimpleUserDetail.profileTableData.map(item => (
                <Row>

                    <Col style={styleSet.containerStyle, { marginLeft: "10px" }} >
                        <Row style={theme.subProfileName}>
                            {item.name}
                        </Row>
                        <Row style={theme.subHeaderName}>
                            {item.nature}
                            {/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}

                        </Row>
                        <Row style={{ alignItems: "center", margin: "5px 0px" }}>
                            <div className="opportunityTag">{item.tagName}</div>
                            {/* <div className="opportunityTag">{UserDetailView.secondaryTag}</div> */}
                        </Row>
                    </Col>
                </Row>
            ))}
        </>
    );
};
export default SimpleUserDetail;

import { Button, Card, Col, Row, Typography, Divider, Menu, Dropdown, message, Select, Rate, Progress } from "antd";
import { palette, fontSet, avatar } from "../../theme";
import Avatar from "antd/lib/avatar/avatar";
import { theme } from "../../theme";


const defaultValues = {
    name: "Alexandra Sandralock",
    family: "Sandralock Family",
    id: "Asan102104",
    tagName: "Wealth",
    secondaryTag: "Wealth",
};
const UserDetailView = ({ UserDetailView = defaultValues }) => {
    const styleSet = {
        name: {
            fontSize: fontSet.heading.large,
        },
        bannerId: {

        },
    };
    return (
        <>
            {UserDetailView.profileTableData?.map(item => (
                <Row>

                    <Col span={3}>
                        {item.profileImage != null ? (
                            <Avatar style={avatar.smallAvatar} src={item.profileImage} ></Avatar>
                        ) : (
                            <Avatar style={avatar.smallAvatar}>{item.profileInitial}</Avatar>
                        )}
                    </Col>
                    <Col style={styleSet.containerStyle, { marginLeft: "10px" }} >
                        <Row style={theme.profileName}>
                            {item.name}
                        </Row>
                        <Row style={theme.profileTag}>
                            {item.id} | {item.family}
                            {/* {<Rate style={{ fontSize: '12px', display: 'inline-block', verticalAlign: 'middle', color: "#48528D" }} />} */}

                        </Row>
                        <Row style={{ alignItems: "center", margin: "5px 0px" }}>
                            <div className="opportunityTag">{item.tagName}</div>
                            {/* <div className="opportunityTag">{item.secondaryTag}</div> */}
                        </Row>
                    </Col>
                </Row>
            ))
            }
        </>
    );
};
export default UserDetailView;

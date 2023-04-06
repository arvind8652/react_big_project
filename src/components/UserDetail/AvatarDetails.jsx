
import { Tooltip, Row } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import UserDetailView from "../UserDetail/UserDetailView";
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
const AvatarDetails = ({ avatarDetails = defaultValues }) => {
    const styleSet = {
        name: {
            fontSize: fontSet.heading.large,
        },
        bannerId: {

        },
    };
    return (
        <>
            <Row>

            </Row>
        </>
    )
}
export default AvatarDetails;
import { Space, Typography } from "antd";
import { fetchAsset } from "../../../utils/utils";
const { Text, Link } = Typography;

const TaskTextSubText = (props) => {
    return (
        <Space direction="vertical" size={0}>
            <Space size="small">
                {props.flag && (
                    <img
                        src={fetchAsset("countryFlags", props.flag)}
                        alt={props.text}
                        style={{ width: "15px", height: "15px", marginRight: "5px" }}
                    />
                )}
                {props.icon && props.icon}
                {props.link ? (
                    <Link href={props.link} style={{ fontSize: "16px" }}>
                        {props.text}
                    </Link>
                ) : (
                    <Text style={{ fontSize: "16px", color: "#2C2D33" }}>
                        {props.text}
                    </Text>
                )}
            </Space>
            {props.subtext && (
                <Text type="secondary" style={{ fontSize: "14px", color: "#696A91" }}>
                    {props.subtext}
                </Text>
            )}
        </Space>
    );
};

export default TaskTextSubText;

import { Space, Typography } from "antd";

const { Text, Link } = Typography;

const TextSubText = (props) => {
  return (
    <Space direction="vertical" size={1}>
      <Space size={2}>
        {props.flag && (
          <img
            src={`https://www.countryflags.io/${props.flag}/flat/24.png`}
            alt={props.text}
            className="coun-icons"
          />
        )}
        {props.icon && props.icon}
        {props.link ? (
          <Link href="" style={props.textStyle}>
            {props.text}
          </Link>
        ) : (
          <Text style={props.textStyle}>{props.text}</Text>
        )}
      </Space>
      {props.subtext && (
        <Text
          type="secondary"
          style={{ ...props.subtextStyle, fontSize: "14px", color: "#696A91" }}
        >
          {props.subtext}
        </Text>
      )}
    </Space>
  );
};

export default TextSubText;

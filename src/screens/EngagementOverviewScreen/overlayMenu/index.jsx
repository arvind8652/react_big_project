import { Menu } from "antd";

const MenuOverlay = (props) => (
  <Menu
    style={{
      paddingBlock: "10px",
      borderRadius: "10px",
      boxShadow: "0px 0px 20px 13px rgba(0,0,0,0.05)",
    }}
  >
    {props.menu.map((item, index) => (
      <Menu.Item key={index}>{item}</Menu.Item>
    ))}
  </Menu>
);

export default MenuOverlay;

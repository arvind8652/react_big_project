import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { fontSet, palette } from "../../theme";

const GenericButton = ({ buttonBody = " buttonBody", size = "default" }) => {
  const style = {
    borderRadius: "8px",
    height: "44px",
    width: "141px",
    fontSize: fontSet.body.xlarge,
    color: palette.secondary.heavy,
    border: `1px solid ${palette.secondary.heavy}`,
  };
  return (
    <>
      <div>
        <Button style={style}>{buttonBody}</Button>
      </div>
    </>
  );
};
export default connect()(GenericButton);

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/pro-regular-svg-icons";
import { palette, theme } from "../../theme";
const IconDetailComponent = ({
  icon = faShoppingCart,
  headText = "Head Text",
  body = "Body",
  iconSize = "2x",
  // icon ,
  // headText ,
  // body ,
  // iconSize
}) => {
  const styleSet = {
    mainBlock: {
      display: "inline-flex",
    },
    headText: {
      color: palette.primary.main,
    },
    bodyText: {
      color: palette.text.head,
    },
    iconBlock: {
      padding: "18px",
    },
  };
  return (
    <>
      <div style={styleSet.mainBlock}>
        <div style={styleSet.iconBlock}>
          <FontAwesomeIcon
            size={iconSize}
            icon={icon}
            style={{ color: palette.primary.main }}
          />
        </div>
        <div>
          <div style={{ ...theme.mediumText, ...styleSet.headText }}>
            {headText}
          </div>
          <div style={{ ...theme.secondaryBody, ...styleSet.bodyText }}>
            {body}
          </div>
        </div>
      </div>
    </>
  );
};

export default IconDetailComponent;

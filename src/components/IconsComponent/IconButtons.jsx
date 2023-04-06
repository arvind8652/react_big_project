import React from "react";
import { Badge, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendar,
  faPlus,
  faSearch,
  faShoppingCart,
  faStar,
} from "@fortawesome/pro-regular-svg-icons";

const IconButtons = () => {
  return (
    <>
      <div className="navIconContainer">
        <FontAwesomeIcon icon={faSearch} className="navIcon" />
      </div>
      <div className="navIconContainer">
        <FontAwesomeIcon icon={faStar} className="navIcon" />
      </div>
      <div className="navIconContainer">
        <Badge dot color="#CD0000">
          <FontAwesomeIcon icon={faBell} className="navIcon" />
        </Badge>
      </div>
      <div className="navIconContainer">
        <FontAwesomeIcon icon={faCalendar} className="navIcon" />
      </div>
      <div className="navIconContainer">
        <FontAwesomeIcon icon={faShoppingCart} className="navIcon" />
      </div>
      <div className="navIconContainer">
        <FontAwesomeIcon icon={faPlus} className="navIcon" />
      </div>
    </>
  );
};

export default IconButtons;

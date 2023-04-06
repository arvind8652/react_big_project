import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

const MenuList = (url, submenu) => {
  const { path } = useRouteMatch();
  if (submenu === []) return null;
  return (
    <div className="smallLeftPanelPopup">
      {submenu.map((item) => (
        <NavLink to={`${path}/${item.routeURL}`} className="popupContent">
          <div className="popupTitle">{item.subMenuTitle}</div>
        </NavLink>
      ))}
    </div>
  );
};
export default MenuList;

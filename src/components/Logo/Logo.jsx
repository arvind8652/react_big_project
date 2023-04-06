import React from "react";
import { useHistory } from "react-router-dom";
import threeILogo from "../../assets/img/logos/3i.svg";

const Logo = ({ logo, altLogo, logoSize, logoClassName }) => {
  const history = useHistory();

  const styleSet = {
    logoclass: {},
  };

  return (
    <img
      width={window.innerWidth / 2}
      src={logo}
      alt={altLogo}
      className={logoClassName}
    />
  );
};

export default Logo;

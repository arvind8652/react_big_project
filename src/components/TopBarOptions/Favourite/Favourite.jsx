import React from "react";
import GenericDrawer from "../../GenericDrawer/GenericDrawer";
import Opportunity from "./Opportunity";
import Product from "./Product";
import Prospects from "./Prospects";
import Customers from "./Customers";

import GenericCardWithTabs from "../../GenericCard/GenericCardWithTabs";

const DrawerWithTabs = ({onClose}) => {
  const headerStyle = {
    fontSize: "0.85rem"
  };

  const renderObject = {
    PROSPECTADD: {
      title: "Prospects",
      render: <Prospects />
    },
    CLIENTADD: {
      title: "Client",
      render: <Customers onCloseDrawer={onClose} />
    },
    OPPORTUNITYADD: {
      title: "Opportunities",
      render: <Opportunity />
    },
    SECURITY: {
      title: "Products",
      render: <Product />
    }
  };

  return (
    <GenericCardWithTabs
      renderObject={renderObject}
      titleStyle={headerStyle}
      useCardsStyle={false}
    />
  );
};

export const Favourite = ({ isFavouriteVisible, onCloseFavouriteDrawer }) => {
  return (

    <GenericDrawer
      showDrawer={isFavouriteVisible}
      onCloseDrawer={onCloseFavouriteDrawer}
      renderBody={<DrawerWithTabs onClose={onCloseFavouriteDrawer} />}
      bodyStyle={{ paddingLeft: 0, paddingRight: 0, marginBottom: "4em" }}
      drawerWidth={"55vh"}
    />
  );
};

export default Favourite;

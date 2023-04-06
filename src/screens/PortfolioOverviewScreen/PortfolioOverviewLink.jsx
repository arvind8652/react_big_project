import React, { useState } from "react";
import { Button, Col, } from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, } from "@fortawesome/pro-light-svg-icons";
import { faArrowLeft, } from "@fortawesome/pro-solid-svg-icons";
import { faChevronLeft, } from "@fortawesome/pro-regular-svg-icons";


const PortfolioOverviewLink = () => {

    return (
        <div className="dashboard-topbar-container">
            {/* <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" /> */}

            {/* <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={() => {
                    //  history.push("/dashboard/MyAccount")
                }}
                className="opportunityViewTopBarIcons"
                size="15x"
            /> */}

            <div>Portfolio Overview</div>
            {/* <Button className="topbar-btn">
                <NavLink to="/dashboard/MyCustomers/CustomerCreate">
                    <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 8 }}
                        onClick={() => {
                            // history.push("MyCustomers/CustomerCreate");
                        }}
                    />
                    Add
              </NavLink>
            </Button> */}
        </div>
    );
};


export default PortfolioOverviewLink;
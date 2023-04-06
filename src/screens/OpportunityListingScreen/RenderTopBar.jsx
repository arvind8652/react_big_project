import { faChevronLeft, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";

const RenderTopBar = () => {
    const { path } = useRouteMatch();
    const history = useHistory();
    return (
        <div className="dashboard-topbar-container">
            <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" />
            <div>My Opportunities</div>
            <Button className="topbar-btn">
                <NavLink to={`${path}/OpportunityCreate`}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 8 }}
                        onClick={() => {
                            history.push("MyOpportunity/OpportunityCreate");
                        }}
                    />
            Add
          </NavLink>
            </Button>
        </div>
    );
}

export default RenderTopBar;
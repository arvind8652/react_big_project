import { fontSet } from "../../theme";
import React from "react";
import { connect } from "react-redux";
import { Row, Col, Drawer } from "antd";
import { TopBarSearchTabs } from "./TopBarSearchTabs";
import { TopBarSearch } from "./TopBarSearch";
import "./topBarSearch.css";
import {
  executegetSearchResults,
  setSearchResults,
} from "../../redux/actions/topSearchMainAction";
import { useState } from "react";
import { store } from "../../redux/configureStore";

const TopSearchMain = ({ topBarData = {}, onClose, visible }) => {
  const styleSet = {
    cardStyle: {
      text: fontSet.heading.large,
    },
  };
  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  //call back method of input field
  const textToSearch = async (searchText) => {
    setSearchText(searchText);
    if (searchText.length > 3) {
      setIsLoading(true);
      await executegetSearchResults(searchText);
      setIsLoading(false);
    }
    if (searchText.length === 0) {
      store.dispatch(setSearchResults(""));
    }
  };

  const clearSearchData = () => {
    setSearchText("");
    store.dispatch(setSearchResults(""));
    onClose();
  };
  return (
    <>
      <Drawer
        placement="right" 
        onClose={onClose}
        visible={visible}
        width={window.innerWidth}
      >
        <card style={styleSet.card}>
          <Row style={styleSet.cardStyle}>
            <Col span={24}>
              <TopBarSearch
                searchText={searchText}
                textToSearch={textToSearch}
              />
            </Col>
          </Row>
        </card>

        <card style={styleSet.card}>
          <Row style={styleSet.cardStyle}>
            <Col span={24}>
              <TopBarSearchTabs
                isLoading={isLoading}
                onClose={clearSearchData}
                topBarData={topBarData} 
              />
            </Col>
          </Row>
        </card>
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => {
  return { topBarData: state.topSearchData.topSearchMainData };
};
export default connect(mapStateToProps)(TopSearchMain);

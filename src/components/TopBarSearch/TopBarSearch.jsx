import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { setSearchResults } from "../../redux/actions/topSearchMainAction";
import { store } from "../../redux/configureStore";

export const TopBarSearch = ({ textToSearch, searchText = "" }) => {
  //const { onSearch } = props;

  const handleInput = (e) => {
    const text = e.target.value;
    textToSearch(text);
  };
  // useEffect(() => {
  //   if (searchText.length === 0) {
  //     store.dispatch(setSearchResults(""));
  //   }
  // }, [searchText]);
  // Input field onchange event -> callback function call after the string lenth is > 3

  return (
    <>
      <div>
        <div className="control">
          <Input.Search
            allowClear
            style={{ width: "40%" }}
            placeholder="Type to search result"
            value={searchText}
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>
    </>
  );
};

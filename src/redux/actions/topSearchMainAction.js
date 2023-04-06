
import { GET_SEARCH_RESULTS } from "./actionTypes";
import { getSearchResultsApi } from "../../api/topSearchMainApi";
import { store } from "../configureStore";

export const setSearchResults = (payload) => ({
    type: GET_SEARCH_RESULTS,
    payload,
});

export const executegetSearchResults = async (searchText) => {
    
    try {
        const response = await getSearchResultsApi(searchText);
        if (response.data) {
            
            store.dispatch(setSearchResults(response.data));
        }

    } catch (error) {
    }
};






import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";



export const getSearchResultsApi = (searchText) => {
    const postObject = {
        "RefType":null,
        "SearchText":searchText,
        "BusinessDate":"2020-01-15"
        }
    return Api.post(apiRequestUrls.getSearchResults, { data: postObject });
};

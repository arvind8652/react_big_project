import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getFavourites = data => Api.post(apiRequestUrls.getFavourites, { data : { refType : data.toString(), "BusinessDate": "2021-06-02"}});
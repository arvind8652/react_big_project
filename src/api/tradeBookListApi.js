import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getTradeBookListCs = () => Api.get(apiRequestUrls.getTradeBookListCs);

export const getTradeBookList = (data) => Api.post(apiRequestUrls.getTradeBookList, data);

export const getAdvanceFilter = (data) => Api.post(apiRequestUrls.getAdvancedFilterTradeBook, data);

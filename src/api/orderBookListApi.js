import { orderBookListApiUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getOrderbookControlStructureApi = () => {
  return Api.get(orderBookListApiUrls.orderBookCS);
};

export const getAdvanceFilter = (data) =>
  Api.post(orderBookListApiUrls.orderBookAdvanceFilter, data);

export const getOrderBookListApi = (data) =>
  Api.post(orderBookListApiUrls.getOrderBookList, data);

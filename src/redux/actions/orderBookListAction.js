import {
  SET_ORDER_BOOK_ADVANCED_FILTER,
  SET_ORDER_BOOK_CONTROL_STRUCTURE_DATA,
  SET_ORDER_BOOK_LISTING_DATA,
} from "./actionTypes";
import { store } from "../configureStore";
import {
  getAdvanceFilter,
  getOrderbookControlStructureApi,
  getOrderBookListApi,
} from "../../api/orderBookListApi";

const setData = (action, payload) => {
  return { type: action, payload: payload };
};

export const orderBookListCS = async () => {
  try {
    const response = await getOrderbookControlStructureApi();
    if (response.data) {
      store.dispatch(
        setData(SET_ORDER_BOOK_CONTROL_STRUCTURE_DATA, response.data)
      );
    }
  } catch (error) {
    console.log("GET TRADE BOOK LIST CS ERROR", error);
  }
};

export const OrderBookAdvancedFilter = async (data) => {
  try {
    const response = await getAdvanceFilter(data);
    if (response.data) {
      store.dispatch(setData(SET_ORDER_BOOK_ADVANCED_FILTER, response.data));
    }
  } catch (error) {
    console.log("GET ORDER BOOK ADVANCED FILTER ERROR", error);
  }
};

export const OrderBookListData = async (data) => {
  try {
    const response = await getOrderBookListApi(data);
    if (response.data && response.status === 200) {
      store.dispatch(setData(SET_ORDER_BOOK_LISTING_DATA, response.data));
      return response.data;
    } else return false;
  } catch (error) {
    console.log("GET ORDER BOOK ADVANCED FILTER ERROR", error);
  }
};

import {
  getTradeBookListCs,
  getTradeBookList,
  getAdvanceFilter,
} from "../../api/tradeBookListApi";
import {
  getTradeBookViewDetails,
  getTradeBookViewVerticalTimeline,
} from "../../api/tradeBookViewApi";

import { store } from "../configureStore";
import {
  SET_TRADE_BOOK_LIST_CS,
  SET_TRADE_BOOK_LIST,
  SET_TRADE_BOOK_LIST_ADVANCED_FILTER,
  GET_TRADE_BOOK_VIEW_DETAILS,
  GET_TRADE_BOOK_VIEW_VERTICAL_TIMELINE_DETAILS,
} from "./actionTypes";

const setTradeBookListCs = (payload) => ({
  type: SET_TRADE_BOOK_LIST_CS,
  payload,
});

const setTradeBookList = (payload) => ({
  type: SET_TRADE_BOOK_LIST,
  payload,
});
const setTradeBookListAdvanceFilter = (payload) => ({
  type: SET_TRADE_BOOK_LIST_ADVANCED_FILTER,
  payload,
});

const getTradeBookDetails = (payload) => ({
  type: GET_TRADE_BOOK_VIEW_DETAILS,
  payload,
});

const getVerticalTimeline = (payload) => ({
  type: GET_TRADE_BOOK_VIEW_VERTICAL_TIMELINE_DETAILS,
  payload,
});

export const executeGetTradeBookListCs = async () => {
  try {
    const response = await getTradeBookListCs();
    if (response.data) {
      store.dispatch(setTradeBookListCs(response.data));
    }
  } catch (error) {
    console.log("GET TRADE BOOK LIST CS ERROR", error);
  }
};

export const executeGetTradeBookList = async (data) => {
  try {
    const response = await getTradeBookList(data);
    if (response.data && response.status === 200) {
      store.dispatch(setTradeBookList(response.data));
      return response.data;
    } else return false;
  } catch (error) {
    console.log("GET TRADE BOOK LIST ERROR", error);
  }
};

export const executeGetTradeBookListAdvancedFilter = async (data) => {
  try {
    const response = await getAdvanceFilter(data);
    if (response.data) {
      store.dispatch(setTradeBookListAdvanceFilter(response.data));
    }
  } catch (error) {
    console.log("GET TRADE BOOK ADVANCED FILTER ERROR", error);
  }
};

export const executeTradeBookView = async (dealId, refType) => {
  try {
    const response = await getTradeBookViewDetails(dealId, refType);
    if (response.data) {
      store.dispatch(getTradeBookDetails(response.data));
    }
  } catch (error) {
    console.log("GET TRADE BOOK VIEW ERROR", error);
  }
};

export const executeTradeBookVerticalTimeline = async (dealId, refType) => {
  try {
    const response = await getTradeBookViewVerticalTimeline(dealId, refType);
    if (response.data) {
      store.dispatch(getVerticalTimeline(response.data));
    }
  } catch (error) {
    console.log("GET TRADE BOOK VERTICAL TIMELINE ERROR", error);
  }
};

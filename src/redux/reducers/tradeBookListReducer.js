import {
    SET_TRADE_BOOK_LIST_CS,
    SET_TRADE_BOOK_LIST,
    SET_TRADE_BOOK_LIST_ADVANCED_FILTER,
} from '../actions/actionTypes';

const initialState = {
    controlStructure: "",
    tradeBookList: undefined,
    advancedFilter: undefined,
};

export const tradeBookListReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_TRADE_BOOK_LIST_CS:
            return { ...state, controlStructure: payload };
        case SET_TRADE_BOOK_LIST:
            return { ...state, tradeBookList: payload };
        case SET_TRADE_BOOK_LIST_ADVANCED_FILTER:
            return { ...state, advancedFilter: payload };
        default:
            return state;
    }
};

export default tradeBookListReducer;
import {
    SET_TRADE_BOOK_VIEW_DOCUMENT_DETAILS,
    GET_TRADE_BOOK_VIEW_DETAILS,
    GET_TRADE_BOOK_VIEW_VERTICAL_TIMELINE_DETAILS,
    SET_TRADE_BOOK_VIEW_SECURITY_DETAILS,
    SET_TRADE_BOOK_VIEW_ATTACHMENT_DETAILS
} from '../actions/actionTypes';

const initialState = {
    tradeBookViewDocumentDetails: [],
    tradeBookViewSecurityDetails: {},
    tradeBookViewDetails: {},
    tradeBookViewVerticalTimelineDetails: [],
    tradeBookViewAttachmentDetails: []
};

export const tradeBookViewReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_TRADE_BOOK_VIEW_DOCUMENT_DETAILS:
            return {
                ...state,
                tradeBookViewDocumentDetails: payload,
            };
        case GET_TRADE_BOOK_VIEW_DETAILS:
            return {
                ...state,
                tradeBookViewDetails: payload,
            };
        case GET_TRADE_BOOK_VIEW_VERTICAL_TIMELINE_DETAILS:
            return {
                ...state,
                tradeBookViewVerticalTimelineDetails: payload,
            };
        case SET_TRADE_BOOK_VIEW_SECURITY_DETAILS:
            return {
                ...state,
                tradeBookViewSecurityDetails: payload,
            };
        case SET_TRADE_BOOK_VIEW_ATTACHMENT_DETAILS: {
            return {
                ...state,
                tradeBookViewAttachmentDetails: payload
            }
        }
        default:
            return state;
    }
};

export default tradeBookViewReducer;
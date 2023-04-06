import {
    getTradeBookAttachmentDetails,
    getTradeBookViewDetails,
    getTradeBookViewDocumentForDownload,
    getTradeBookViewSecurityDetails,
    getTradeBookViewVerticalTimeline,
} from '../../api/tradeBookViewApi';

import { store } from '../configureStore';

import {
    SET_TRADE_BOOK_VIEW_DOCUMENT_DETAILS,
    // SET_TRADE_BOOK_VIEW_DETAILS,
    // SET_TRADE_BOOK_VIEW_VERTICAL_TIMELINE_DETAILS,
    SET_TRADE_BOOK_VIEW_SECURITY_DETAILS,
    SET_TRADE_BOOK_VIEW_ATTACHMENT_DETAILS
} from "./actionTypes";

const setTradeBookViewDocumentDetails = payload => ({
    type: SET_TRADE_BOOK_VIEW_DOCUMENT_DETAILS,
    payload,
});

const setTradeBookAttachmentDetails = payload => ({
    type: SET_TRADE_BOOK_VIEW_ATTACHMENT_DETAILS,
    payload,
})

// const setTradeBookViewDetails = payload => ({
//     type: SET_TRADE_BOOK_VIEW_DETAILS,
//     payload
// });

// const setTradeBookViewVerticalTimelineDetails = payload => ({
//     type: SET_TRADE_BOOK_VIEW_VERTICAL_TIMELINE_DETAILS,
//     payload
// });

const setTradeBookViewSecurityDetails = payload => ({
    type: SET_TRADE_BOOK_VIEW_SECURITY_DETAILS,
    payload
});

// export const executeGetTradeBookViewDetails = async (dealId, refType) => {
//     try {
//         const response = await getTradeBookViewDetails(dealId, refType);

//         if (response.data) {
//             store.dispatch(setTradeBookViewDetails(response.data));
//         }
//     } catch (error) {

//     }
// };

// export const executeGetTradeBookViewVerticalTimeline = async (dealId, refType) => {
//     try {
//         const response = await getTradeBookViewVerticalTimeline(dealId, refType);

//         if (response.data) {
//             store.dispatch(setTradeBookViewVerticalTimelineDetails(response.data));
//         }
//     } catch (error) {

//     }
// };

export const executeGetTradeBookViewSecurityDetails = async (postObject) => {
    try {
        const response = await getTradeBookViewSecurityDetails(postObject);
        if (response.data?.length > 0) {
            store.dispatch(setTradeBookViewSecurityDetails(response.data));
        }
        else {
            store.dispatch(setTradeBookViewSecurityDetails([]));
        }
    } catch (error) {
        store.dispatch(setTradeBookViewSecurityDetails([]));

    }
};
export const executeGetTradeBookViewDocumentForDownload = async (postObject) => {
    try {
        const response = await getTradeBookViewDocumentForDownload(postObject);
        if (response.data) {
            store.dispatch(setTradeBookViewDocumentDetails(response.data))
        }
    } catch (error) {

    }
};

export const executeGetAttachmentDetails = async (progName, recordID) => {
    try {
        const response = await getTradeBookAttachmentDetails(progName, recordID);
        if (response.data) {
            store.dispatch(setTradeBookAttachmentDetails(response.data))
        }
    } catch (error) {

    }
};
import {
    GET_VERTICAL_TIMELINE,
    GET_ATTACHMENT_DETAILS,
    GET_CUSTOMER_DETAILS,
    SET_CLIENT_RELATION,
    GET_MISCELLANEOUS,
    SET_DOWNLOAD_ATTACHMENTS,
    SET_UPLOAD_FILES,
    GET_DOCUMENT_DETAILS,
    GET_CLIENT_ACCOUNT_DETAILS_BY_ID,
    GET_PROSPECT_RELATION,
    GET_COMMON_CUSTOMER_DETAILS,
    GET_ACCOUNT_DETAILS,
} from "../actions/actionTypes";
const initialState = {
    verticalTimelineData: "",
    attachmentDetailsData: "",
    customerDetailsData: "",
    clientRelationsData: "",
    miscellaneousData: "",
    downloadAttachmentsData: "",
    uploadFilesData: "",
    documentDetailsData: "",
    clientAccountDetailsByID: "",
    prospectRelations: "",
    CommonCustomerDetails: "",
    accountDetailsData: "",
};

const profileViewAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VERTICAL_TIMELINE:
            return {
                ...state,
                verticalTimelineData: action.payload,
            };
        case GET_ACCOUNT_DETAILS:
            return {
                ...state,
                accountDetailsData: action.payload,
            };
        case GET_COMMON_CUSTOMER_DETAILS:
            return {
                ...state,
                CommonCustomerDetails: action.payload,
            };
        case GET_PROSPECT_RELATION:
            return {
                ...state,
                prospectRelations: action.payload,
            };
        case GET_ATTACHMENT_DETAILS:
            return {
                ...state,
                attachmentDetailsData: action.payload,
            };
        case GET_CUSTOMER_DETAILS:
            return {
                ...state,
                customerDetailsData: action.payload,
            };
        case SET_CLIENT_RELATION:
            return {
                ...state,
                clientRelationsData: action.payload,
            };
        case GET_MISCELLANEOUS:
            return {
                ...state,
                miscellaneousData: action.payload,
            };
        case SET_DOWNLOAD_ATTACHMENTS:
            return {
                ...state,
                downloadAttachmentsData: action.payload,
            };
        case SET_UPLOAD_FILES:
            return {
                ...state,
                uploadFilesData: action.payload,
            };
        case GET_DOCUMENT_DETAILS:
            return {
                ...state,
                documentDetailsData: action.payload,
            };
        case GET_CLIENT_ACCOUNT_DETAILS_BY_ID:
            return {
                ...state,
                clientAccountDetailsByID: action.payload,
            };
        default:
            return state;
    }
};

export default profileViewAccountReducer;

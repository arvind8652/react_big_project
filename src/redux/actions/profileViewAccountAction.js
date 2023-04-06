
import {
    GET_VERTICAL_TIMELINE, GET_ACCOUNT_DETAILS, GET_COMMON_CUSTOMER_DETAILS, GET_PROSPECT_RELATION, GET_ATTACHMENT_DETAILS, GET_CUSTOMER_DETAILS, SET_CLIENT_RELATION, GET_MISCELLANEOUS, SET_DOWNLOAD_ATTACHMENTS, SET_UPLOAD_FILES, GET_DOCUMENT_DETAILS, GET_CLIENT_ACCOUNT_DETAILS_BY_ID,
} from "./actionTypes";
import {
    getProfileVerticalTimeline,
    getProfileAttachmentDetails,
    getCustomerDetails,
    clientRelations,
    getProfileMiscellaneous,
    downloadAttachments,
    uploadFiles,
    getDocumentDetails,
    getClientAccountDetailsByID,
    getProspectRelations,
    getCommonCustomerDetails,
    getAccountDetails,
} from "../../api/profileViewAccountApi";
import { store } from "../configureStore";


const setVerticalTimeline = (payload) => ({
    type: GET_VERTICAL_TIMELINE,
    payload,
});

const setAccountDetails = (payload) => ({
    type: GET_ACCOUNT_DETAILS,
    payload,
});

const setCommonCustomerDetails = (payload) => ({
    type: GET_COMMON_CUSTOMER_DETAILS,
    payload,
});

const setProspectRelations = (payload) => ({
    type: GET_PROSPECT_RELATION,
    payload,
});

const setAttachmentDetails = (payload) => ({
    type: GET_ATTACHMENT_DETAILS,
    payload,
});

const setCustomerDetails = (payload) => ({
    type: GET_CUSTOMER_DETAILS,
    payload,
});
const setClientRelations = (payload) => ({
    type: SET_CLIENT_RELATION,
    payload,
});

const setMiscellaneous = (payload) => ({
    type: GET_MISCELLANEOUS,
    payload,
});

const setDownloadAttachments = (payload) => ({
    type: SET_DOWNLOAD_ATTACHMENTS,
    payload,
});
const setUploadFiles = (payload) => ({
    type: SET_UPLOAD_FILES,
    payload,
});

const setDocumentDetails = (payload) => ({
    type: GET_DOCUMENT_DETAILS,
    payload,
});

const setClientAccountDetailsByID = (payload) => ({
    type: GET_CLIENT_ACCOUNT_DETAILS_BY_ID,
    payload,
});


export const profileDetailsAllApi = async (clientObject) => {
    // let customerId= clientObject.customerCode;
    let customerId = clientObject?.clientCode ? clientObject?.clientCode : clientObject?.customerCode;
    let promises = [
        executegetProfileVerticalTimeline(customerId),
        executegetProfileAttachmentDetails('CLIENTADD',customerId),
        executeGetCustomerDetails(customerId), ,
        executegetProfileMiscellaneous('CLIENTADD',customerId),
        executeGetDocumentDetails(customerId),
        executeGetProspectRelations(customerId),
        executeGetAccountDetails(customerId)
    ];
    const data = await Promise.all(promises);
};


const verticalTimelineDetail = (verticalTimelineData) => {

    let verticalData = verticalTimelineData;

    return { ...verticalTimelineData, profileVerticalTimeline: verticalData };
}
export const executegetProfileVerticalTimeline = async (refID) => {
    try {
        const response = await getProfileVerticalTimeline(refID);
        if (response.data) {
            let finalObj1 = verticalTimelineDetail(response.data)
            store.dispatch(setVerticalTimeline(finalObj1));
        }
    } catch (error) {
        console.log("Get Customer Details ERROR", error);
    }
};
const profileAccountDetail = (accountDetailsData) => {

    let accountData = accountDetailsData.lstAccountList;

    return { ...accountDetailsData, profileAccountDetails: accountData };
}
export const executeGetAccountDetails = async (refID) => {

    try {
        const response = await getAccountDetails(refID);
        if (response.data) {
            let finalObj2 = profileAccountDetail(response.data)
            store.dispatch(setAccountDetails(finalObj2));

        }

    } catch (error) {
        console.log("Get Customer Details ERROR", error);
    }
};

export const executeGetCommonCustomerDetails = async (refID) => {

    try {
        const response = await getCommonCustomerDetails(refID);
        if (response.data) {
            store.dispatch(setCommonCustomerDetails(response.data));
        }
    } catch (error) {
        console.log("Get Customer Details ERROR", error);
    }
};

const profileRelationDetail = (prospectRelations) => {


    let filteredData1 = prospectRelations && prospectRelations.filter(item => item.isCustomer === true)
    let filteredData2 = prospectRelations && prospectRelations.filter(item => item.isCustomer === false)

    let d1 = filteredData1 && filteredData1.map(item => {
        return {

            dateOfBirth: item.dob,
            fullName: item.relationName,
            email: item.email,
            contactNumber: item.mobile,
            name: item.relationName,
            family: item.familyName,
            id: item.recordId,
            tagName: item.customerCategory,
            profileImage: item.profileImage,
            profileInitial: item.profileInitial,
            relation: item.relation,
            contactNumber: item.mobile,
        }
    })
    let d2 = filteredData2 && filteredData2.map(item => {
        return {
            relation: item.relation,
            dateOfBirth: item.dob,
            fullName: item.relationName,
            email: item.email,
            contactNumber: item.mobile,
        }
    })
    return { ...prospectRelations, relationDetailData: d1, relationDetailfalseData: d2 };
}

export const executeGetProspectRelations = async (refID) => {

    try {
        const response = await getProspectRelations(refID);
        if (response.data) {
            let finalObj3 = profileRelationDetail(response.data)
            store.dispatch(setProspectRelations(finalObj3));
        }
    } catch (error) {
        console.log("Get Customer Details ERROR", error);
    }
};

export const executegetProfileAttachmentDetails = async (progName,refID) => {

    try {
        // const response = await getProfileAttachmentDetails(refID);
        const response = await getProfileAttachmentDetails(progName,refID);
        if (response.data) {
            store.dispatch(setAttachmentDetails(response.data));
        }
    } catch (error) {
        console.log(`${GET_ATTACHMENT_DETAILS} ERROR`, error);
    }
};

const createCustomerDetails = (customerDetailsData) => {

    let profileData = customerDetailsData.clientRequisition;
    let obj = {
        referralType: profileData.sourceValueName,
        sourcedByValue: profileData.sourcedBy,
        familyName: profileData.familyName,
        name: profileData.fullName,
        currencyName: profileData.currencyName,
        remark: profileData.remarks,
        InputDateTime: profileData.inputDateTime,
        permAdd1: profileData.permAdd1,
        permCityName: profileData.permCityName,
        legalStatusName: profileData.legalStatusName,
        mobileNo: profileData.mobileNo,
        eMail: profileData.eMail,
        customerTypeName: profileData.customerTypeName,
        permCountryName: profileData.permCountryName,
        workFlowStatus: profileData.accountStatusName,
        taxStatusName: profileData.taxStatusName,
        profileImage: profileData.profileImage,
        profileInitial: profileData.profileInitial,
        salutation: profileData.salutation,
        category: profileData.legalStatusName,
        CIF: profileData.prospectId,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.genderName,
        nationality: profileData.nationalityName,
        taxStatus: profileData.taxStatusName,
        natureOfBusiness: profileData.natureofbusinessName,
        occupation: profileData.occupationName,
        sourceOfFund: profileData.sourceNetworthName,
        annualIncome: profileData.income,
        netWorth: profileData.networthName,
        relationshipManager: profileData.custRelMgrName,
        branch: profileData.branch,
        contactNumber: profileData.mobileNo,
        alternateContactNumber: profileData.telephoneHome,
        email: profileData.eMail,
        twitterUrl: customerDetailsData.socialList.Twitter,
        facebookUrl: customerDetailsData.socialList.Facebook,
        linkedinUrl: customerDetailsData.socialList.LinkedIn,
        comAddress: profileData.mailAdd1,
        comCity: profileData.mailCityName,
        comPinCode: profileData.mailAddPin,
        perAddress: profileData.permAdd1,
        perCity: profileData.permCityName,
        perPinCode: profileData.permAddPin,
        primaryID: profileData.idType,
        primaryIDNumber: profileData.resPermitNo,
        expiryDate: profileData.idExpDate,
        FATCAValidation: profileData.fatcaClassificationName,
        PEP: profileData.riskCategoryAmlaName,
        potentiallyVulnerable: profileData.potentiallyVulnerableName,
        AMLA: profileData.amlaName,
        bannedList: profileData.bannedListName,
        source: profileData.sourceName,
        sourceType: profileData.sourceType,
        clientId: profileData?.clientId,
        clientType: profileData.clientType,
        branchName: profileData.branchName,
        sophisticatedYn: profileData.sophisticatedYn
    }
    return { ...customerDetailsData, profileTopBannerData: obj };
}
export const executeGetCustomerDetails = async (refID) => {

    try {
        const response = await getCustomerDetails(refID);
        if (response.data) {
            let finalObj = createCustomerDetails(response.data)
            store.dispatch(setCustomerDetails(finalObj));
        }
    } catch (error) {
        console.log(`${GET_CUSTOMER_DETAILS} ERROR`, error);
    }
};

export const executeClientRelations = async (refID) => {

    try {
        const response = await clientRelations(refID);
        if (response.data) {
            store.dispatch(setClientRelations(response.data));
        }
    } catch (error) {
        console.log(`${SET_CLIENT_RELATION} ERROR`, error);
    }
};

export const executegetProfileMiscellaneous = async (progName,refID) => {

    try {
        const response = await getProfileMiscellaneous(progName,refID);
        if (response?.data) {          
            store.dispatch(setMiscellaneous(response?.data));
        }
    } catch (error) {
        console.log("Get Miscellaneous ERROR", error);
    }
};

export const executeDownloadAttachments = async (refID) => {

    try {
        const response = await downloadAttachments(refID);
        if (response.data) {
            store.dispatch(setDownloadAttachments(response.data));
        }
    } catch (error) {
        console.log("Download Attachments  ERROR", error);
    }
};

export const execUteuploadFiles = async (refID) => {

    try {
        const response = await uploadFiles(refID);
        if (response.data) {
            store.dispatch(setUploadFiles(response.data));
        }
    } catch (error) {
        console.log(`${SET_UPLOAD_FILES} ERROR`, error);
    }
};

export const executeGetDocumentDetails = async (refID) => {

    try {
        const response = await getDocumentDetails(refID);
        if (response.data) {
            store.dispatch(setDocumentDetails(response.data));
        }
    } catch (error) {
        console.log(`${GET_DOCUMENT_DETAILS} ERROR`, error);
    }
};

export const executeGetClientAccountDetailsByID = async (refID) => {

    try {
        const response = await getClientAccountDetailsByID(refID);
        if (response.data) {
            store.dispatch(setClientAccountDetailsByID(response.data));
        }
    } catch (error) {
        console.log(`${GET_CLIENT_ACCOUNT_DETAILS_BY_ID} ERROR`, error);
    }
};
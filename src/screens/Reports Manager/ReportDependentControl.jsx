import { getReportClientNameDependentDataApi, getReportAssetTypeDependentDataApi, getReportSecurityNameDependentDataApi, getReportClientAccountDependentDataApi, getReportReportNameDependentDataApi } from "../../api/commonApi";
import { getReportDependentDataApi } from "../../redux/actions/reportsActions/reportsActions";


export const cleaningData = (data) => {
    let ab = [];
    let returnVal = data ?.returnColumn;
    let displayVal = data ?.displayColumn;

    data ?.lookUpValues ?.forEach((element) => {
        ab.push({ key: element[returnVal], value: element[displayVal] })
    });
    return ab
}

// export const getClientName = async (value = null) => {
//     let ab = [];
//     try {
//         const response = await getReportClientNameDependentDataApi(value);
//         // let returnVal = response ?.data ?.returnColumn;
//         // let displayVal = response ?.data ?.displayColumn;

//         // response ?.data ?.lookUpValues ?.forEach(element => {
//         //     ab.push({ key: element[returnVal], value: element[displayVal] })
//         // });
//         // return ab;

//         return (cleaningData(response ?.data));
//     } catch (error) {
//     }
// };




export const getClientName = async (value) => {
    try {
        const response = await getReportClientNameDependentDataApi(value);
        return (cleaningData(response ?.data));
    } catch (error) {
        console.log(error);
    }
};

export const getAssetType = async (value = null) => {
    try {
        const response = await getReportAssetTypeDependentDataApi(value);
        return (cleaningData(response ?.data))
    } catch (error) {
        console.log(error);
    }
};


export const getSecurityName = async (assetGroup = null, assetType = null) => {
    try {
        const response = await getReportSecurityNameDependentDataApi(assetGroup, assetType);
        return (cleaningData(response ?.data));
    } catch (error) {
        console.log(error);
    }
};

export const getClientAccount = async (value) => {
    try {
        const response = await getReportClientAccountDependentDataApi(value);
        return (cleaningData(response ?.data));
    } catch (error) {
        console.log(error);
    }
};



export const getReportName = async (value) => {
    try {
        const response = await getReportReportNameDependentDataApi(value);
        return (cleaningData(response ?.data));
    } catch (error) {
        console.log(error);
    }
};


export const getDepenedentData = async (fieldListID, dependentValue) => {

    // let dependentValueArrayData = dependentValue.map(data => ({ [Object.keys(data)[0]]: typeof Object.values(data)[0] === Array ? Object.values(data)[0].toString() : Object.values(data)[0] }));
    let dependentValueArrayData = dependentValue.map(data => ({ [Object.keys(data)[0]]: Object.values(data)[0].toString() }));
    let dependentValueObjData = Object.assign({}, ...dependentValueArrayData);

    try {
        const response = await getReportDependentDataApi(fieldListID, dependentValueObjData);
        return (cleaningData(response ?.data));
    } catch (error) {
        console.log(error);
    }
}

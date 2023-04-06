import {
  SET_LEAD_CREATION_CS,
  SET_LEAD_CREATION_SUCCESS,
  SET_SOURCE_SUCCESS,
  SET_LEAD_CREATION_FULL_CS,
} from "./actionTypes";
import {
  getControlStructure,
  getDependentDataApi,
} from "../../api/controlStructureApi";
import { postLeadApi } from "../../api/leadCreationApi";
import { generateCsObject } from "../../utils/utils";
import { clearLeadEdit } from "./leadViewActions";

export function getLeadAddCs() {
  return function (dispatch, getState) {
    return getControlStructure("LEADADD")
      .then((resp) => {
        const { data } = resp;
        const { csList } = data;
        let leadAddCs = [];
        csList.length > 1 &&
          (leadAddCs = [
            ...csList[0].controlStructureField,
            ...csList[1].controlStructureField,
          ]);
        leadAddCs = generateCsObject(leadAddCs);
        dispatch(setLeadCreationFullCs(csList));
        dispatch(setLeadCreationCs(leadAddCs));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

const setLeadCreationCs = (payload) => {
  return { type: SET_LEAD_CREATION_CS, payload: payload };
};
const setLeadCreationFullCs = (payload) => {
  return { type: SET_LEAD_CREATION_FULL_CS, payload: payload };
};

export function postNewLead(payload) {
  return function (dispatch, getState) {
    let data = {
      data: payload,
    };

    return postLeadApi(data)
      .then((resp) => {
        dispatch(setLeadCreationSuccess(resp));
        dispatch(clearLeadEdit());
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

const setLeadCreationSuccess = (payload) => {
  return { type: SET_LEAD_CREATION_SUCCESS, payload: payload };
};

export function getSource(payload, fieldName) {
  return function (dispatch, getState) {
    return getDependentDataApi(payload)
      .then((resp) => {
        let values = {};
        values[fieldName] = resp.data;
        dispatch(setSource(values));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

const setSource = (payload) => {
  return { type: SET_SOURCE_SUCCESS, payload: payload };
};

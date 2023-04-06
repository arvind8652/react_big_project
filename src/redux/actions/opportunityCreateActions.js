import {
  SET_OPPORTUNITY_CREATION_CS,
  SET_OPPORTUNITY_CREATION_SUCCESS,
  SET_OPPORTUNITY_DEPENDANT_DATA_SUCCESS,
  SET_OPPORTUNITY_CREATION_FULL_CS,
  GET_OPPORTUNITY_CREATION_PROBABILITY,
} from "./actionTypes";
import {
  postOpportunityApi,
  getOpportunityProbabilityApi,
} from "../../api/opportunityCreateApi";
import {
  getControlStructure,
  getDependentDataApi,
} from "../../api/controlStructureApi";
import { generateCsObject } from "../../utils/utils";

export function getOpportunityAddCs() {
  return function (dispatch, getState) {
    return getControlStructure("OPPORTUNITYADD")
      .then((resp) => {
        const { data } = resp;
        const { csList } = data;
        let opportunityAddCs = [];
        csList.length > 1 &&
          (opportunityAddCs = [
            ...csList[0].controlStructureField,
            ...csList[1].controlStructureField,
          ]);
        opportunityAddCs = generateCsObject(opportunityAddCs);
        dispatch(setOpportunityCreationFullCs(csList));
        dispatch(setOpportunityCreationCs(opportunityAddCs));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

const setOpportunityCreationCs = (payload) => {
  return { type: SET_OPPORTUNITY_CREATION_CS, payload: payload };
};
const setOpportunityCreationFullCs = (payload) => {
  return { type: SET_OPPORTUNITY_CREATION_FULL_CS, payload: payload };
};

export function postNewOpportunity(payload) {
  return function (dispatch, getState) {
    let data = {
      data: payload,
    };
    return postOpportunityApi(data)
      .then((resp) => {
        dispatch(setOpportunityCreationSuccess(resp));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

const setOpportunityCreationSuccess = (payload) => {
  return { type: SET_OPPORTUNITY_CREATION_SUCCESS, payload: payload };
};

export function getOpportunityDependantData(payload, fieldName) {
  return function (dispatch, getState) {
    return getDependentDataApi(payload)
      .then((resp) => {
        let values = {};
        values[fieldName] = resp.data;
        dispatch(setOpportunityDependantData(values));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

const setOpportunityDependantData = (payload) => {
  return { type: SET_OPPORTUNITY_DEPENDANT_DATA_SUCCESS, payload: payload };
};

export function getOpportunityCreationProbability(payload) {
  return function (dispatch, getState) {
    let data = {
      data: payload,
    };
    return getOpportunityProbabilityApi(data)
      .then((resp) => {
        dispatch(setOpportunityCreationProbability(resp));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

const setOpportunityCreationProbability = (payload) => {
  return { type: GET_OPPORTUNITY_CREATION_PROBABILITY, payload: payload };
};

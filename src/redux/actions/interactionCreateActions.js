import {
  getInteractionCreateCsApi,
  getExistingInteractionApi,
} from "../../api/interactionCreateApi";
import {
  SET_INTERACTION_CREATE_CS,
  SET_EXISTING_INTERACTION,
} from "./actionTypes";
import { store } from "../configureStore";

const setInteractionCreateCs = (payload) => {
  return { type: SET_INTERACTION_CREATE_CS, payload: payload };
};
const setExistingInteraction = (payload) => {
  return { type: SET_EXISTING_INTERACTION, payload: payload };
};
export const executeGetInteractionCreateCs = () => {
  // return (dispatch) => {
  getInteractionCreateCsApi()
    .then((res) => {
      res.data && store.dispatch(setInteractionCreateCs(res.data.csList));
    })
    .catch((err) => {
      console.log("GET INTERACTION CREATE CS ERROR: ", err);
    });
  // };
};

export const executeGetExistingInteraction = (refID) => {
  // return (dispatch) => {
  getExistingInteractionApi(refID)
    .then((res) => {
      res.data && store.dispatch(setExistingInteraction(res.data));
    })
    .catch((error) => {
      console.log(error);
    });
  // };
};

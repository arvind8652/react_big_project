import { getProspectCreateCsApi } from "../../api/prospectCreateApi";
import { SET_PROSPECT_CREATE_CS } from "./actionTypes";
import { store } from "../configureStore";

const setProspectCreateCs = (payload) => {
  return { type: SET_PROSPECT_CREATE_CS, payload: payload };
};

export const executeGetProspectCreateCs = () => {
  // return (dispatch) => {
  getProspectCreateCsApi()
    .then((res) => {
      res.data &&
        res.data.csList !== null &&
        store.dispatch(setProspectCreateCs(res.data.csList));
    })
    .catch((err) => {
      console.log("GET PROSPECT CREATE CS ERROR: ", err);
    });
  // };
};

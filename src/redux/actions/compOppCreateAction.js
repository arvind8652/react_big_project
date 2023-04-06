import { SET_COMP_OPP_CREATE_CS } from "./actionTypes";
import { getOpportunityCreateCs } from "../../api/opportunityCreateApi";
import { store } from "../configureStore";

const setOppCreateCs = (payload) => {
  return { type: SET_COMP_OPP_CREATE_CS, payload: payload };
};
export const executeGetOppCreateCs = () => {
  getOpportunityCreateCs()
    .then((res) => {
      res.data && store.dispatch(setOppCreateCs(res.data.csList));
    })
    .catch((err) => {
      console.log("GET OPP CREATE CS ERROR: ", err);
    });
};

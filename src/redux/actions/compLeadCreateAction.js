import { SET_COMP_LEAD_CREATE_CS } from "./actionTypes";
import { getLeadCreationCsApi } from "../../api/leadCreationApi";
import { store } from "../configureStore";
const setLeadCreateCs = (payload) => {
  return { type: SET_COMP_LEAD_CREATE_CS, payload: payload };
};
export const executeGetLeadCreateCs = () => {
  getLeadCreationCsApi()
    .then((res) => {
      res.data && store.dispatch(setLeadCreateCs(res.data.csList));
    })
    .catch((err) => {
      console.log("GET LEAD CREATE CS ERROR: ", err);
    });
};

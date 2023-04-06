import { SET_TASK_CREATE_CS } from "./actionTypes";
import { getTaskCreateCs } from "../../api/taskCreateApi";
import { store } from "../configureStore";

const setTaskCreateCs = (payload) => {
  return { type: SET_TASK_CREATE_CS, payload: payload };
};
export const executeGetTaskCreateCs = () => {
  getTaskCreateCs()
    .then((res) => {
      res.data && store.dispatch(setTaskCreateCs(res.data.csList));
    })
    .catch((err) => {
      console.log("GET Task CREATE CS ERROR: ", err);
    });
};

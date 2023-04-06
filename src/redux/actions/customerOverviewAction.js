import { getCustomerOverviewCS } from "../../api/customerOverviewApi";
import { store } from "../configureStore";
import { SET_CUSTOMER_OVERVIEW_CONTROL_STRUCTURE } from "./actionTypes";

const setCOControlStructure = (payload) => ({
  type: SET_CUSTOMER_OVERVIEW_CONTROL_STRUCTURE,
  payload,
});
export const executeCustomerOverviewCS = async () => {
  try {
    const response = await getCustomerOverviewCS();
    // const returnData = response.data.csList[0].controlStructureField
    if (response.data) {
      store.dispatch(setCOControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET TRADE BOOK LIST CS ERROR", error);
  }
};

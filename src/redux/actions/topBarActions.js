import { getQuickAddMenuItems } from "../../api/topBarApi";


import { store } from '../configureStore';

import {
    SET_QUICK_ADD_MENU_ITEMS,
} from "./actionTypes";


const setQuickAddMenuItems = payload => ({
    type: SET_QUICK_ADD_MENU_ITEMS,
    payload,
})

export const executeGetQuickAddMenuItems = async () => {
    try {
        const response = await getQuickAddMenuItems();
        if (response.data) {
            store.dispatch(setQuickAddMenuItems(response.data));
        }
    } catch (error) {
    }
};
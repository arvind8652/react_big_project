import { getNotifications, updateNotificationStatus } from '../../api/notificationsApi';

import { store } from "../configureStore";
import {
    SET_TOPBAR_NOTIFICATIONS,
} from "./actionTypes";

const setTopBarNotifications = (payload) => ({
    type: SET_TOPBAR_NOTIFICATIONS,
    payload,
});

export const executeGetNotifications = async () => {
    try {
        getNotifications().then((response)=> {
            if (response.data) {
                store.dispatch(setTopBarNotifications(response.data))
            }
        });
    } catch (error) {
        console.log("SET TOPBAR NOTIFICATIONS CS ERROR", error);
    }
};

export const executeUpdateNotifications = async (data) => {
    try {
        const response = await updateNotificationStatus(data);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.log("GET TRADE BOOK LIST ERROR", error);
    }
};
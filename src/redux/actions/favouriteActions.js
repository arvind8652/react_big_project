import { getFavourites } from '../../api/favouriteApi.js'
import { store } from "../configureStore";

import {
    SET_FAVOURITES
} from "./actionTypes";

const setFavourites = (payload, refType) => ({
    type: SET_FAVOURITES,
    payload,
    refType
});

export const executeGetFavourites = async (refType) => {
    try {
        const response = await getFavourites(refType);
        if (response.data) {
            store.dispatch(setFavourites(response.data, refType))
        }
    } catch (error) {
        console.log("ERROR IN FAVOURITES", error);
    }
};
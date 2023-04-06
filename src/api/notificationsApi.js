import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getNotifications = () => Api.post(apiRequestUrls.getNotifications);

export const updateNotificationStatus = data => Api.post(apiRequestUrls.updateNotificationStatus, {data: data});
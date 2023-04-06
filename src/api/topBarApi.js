import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getQuickAddMenuItems = () => Api.post(apiRequestUrls.getQuickAddMenuItems);
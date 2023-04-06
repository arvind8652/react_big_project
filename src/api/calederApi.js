import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getCalederDataApi = (payload) => Api.post(apiRequestUrls.getCalederData, { data: payload });
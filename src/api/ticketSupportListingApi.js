import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getAllTicketSupportListingDataApi = (postData) =>
	Api.post(apiRequestUrls.getAllTicketSupportListingData, postData);

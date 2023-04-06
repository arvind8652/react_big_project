import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const postSingleSignOn = async (userId, authcode) => {
	return await Api.get(apiRequestUrls.singleSignOn(userId, authcode));
};
export const getEncryptedString = async (userName, authID) => {
	return await Api.get(apiRequestUrls.encryptedString(userName, authID));
};

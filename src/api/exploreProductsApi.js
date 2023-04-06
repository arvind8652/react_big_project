import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getExploreProductCS = () => Api.get(apiRequestUrls.getExpProdControlStructure);
export const getExploreProductAdvancedFilter = postObject => Api.post(apiRequestUrls.getExpProdAdvancedFilter, {data : postObject});

export const getExploreProductsDetails = postObject => Api.post(apiRequestUrls.getExploreProductsDetails, postObject);
export const makeFavorite = postObject => Api.post(apiRequestUrls.assignFavoriteOpportunity, postObject);
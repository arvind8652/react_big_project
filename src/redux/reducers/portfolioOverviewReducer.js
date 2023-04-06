
import { SET_CUSTOMER_INFO, SET_INVESTMENT_ACCOUNT_DATA, SET_OPPORTUNITIES,SET_CALEDERDATA} from '../actions/actionTypes';
import { SET_OPEN_ORDERS_DATA, SET_PORTFOLIO_OVERVIEW_RISK_PROFILE_MODEL, SET_PORTFOLIO_OVERVIEW_TRENDING_PRODUCTS, SET_NOTESDATA } from '../actions/actionTypes';
// import {SET_NOTESDATA } from "../actions/actionTypes;"

const initialState = {
    customerInfo: {},
};

const portfolioOverviewReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case  SET_CUSTOMER_INFO:
            return {
                ...state,
                customerInfo: payload
            };
          
        case SET_INVESTMENT_ACCOUNT_DATA: 
            return {
                ...state,
                investmentAccountData: payload,
                
                
            };

        
        case SET_CALEDERDATA: {
            
            return {
                ...state,
                calederData: payload,
            };
        }
           
        case SET_OPPORTUNITIES:
                return {
                    ...state,
                    opportunities: payload,
            };
        case SET_NOTESDATA:
            return {
                ...state,
                notesData: payload,
            }
       
        case SET_PORTFOLIO_OVERVIEW_RISK_PROFILE_MODEL: {
            return {
                ...state,
                riskProfileModel: payload,
            }
        };
        case SET_PORTFOLIO_OVERVIEW_TRENDING_PRODUCTS: {
            return {
                ...state,
                trendingProducts: payload,
            }
        }
        case SET_OPEN_ORDERS_DATA: {
            return {
                ...state,
                openOrders: payload,
            }
            
        }
            
        default: return state;
          
    }
};

export default portfolioOverviewReducer;

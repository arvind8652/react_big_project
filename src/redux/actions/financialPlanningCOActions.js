import {
	getFinancialPlanningCOCsApi,
	getFinancialPlanningGoalsCOApi,
	getGoalApi
} from '../../api/financialPlanningCOApi';
import {
	SET_FINANCIAL_PLANNING_CO_CS,
	SET_FINANCIAL_PLANNING_GOAL_CO,
	SET_GET_GOAL
} from './actionTypes';

export const setFinancialPlanningCOCs = (payload) => {
	return { type: SET_FINANCIAL_PLANNING_CO_CS, payload: payload };
};
export const setGetGoal = (payload) => {
	return { type: SET_GET_GOAL, payload: payload };
};

const setFinancialPlanningGoalsCO = (payload) => {
	return { type: SET_FINANCIAL_PLANNING_GOAL_CO, payload: payload };
};

export const executeFinancialPlanningCOCs = async () => {
	try {
		return (await getFinancialPlanningCOCsApi()).data.csList;
	} catch (err) {
		console.error(err);
	}
};
export const executeFinancialPlanningGetGoal = async () => {
	try {
		return (await getGoalApi()).data;
	} catch (error) {
		console.log('GET GOAL ERROR', error);
	}
};
export const getFinancialCalculation = async () => {
	try {
		return (await getFinancialCalculation()).data;
	} catch (error) {
		console.log('error', error);
	}
};

export const executeFinancialPlanningGoalsCO = (clientId, setErrorMsg) => {
	return (dispatch) => {
		getFinancialPlanningGoalsCOApi(clientId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setFinancialPlanningGoalsCO(res.data));
				} else {
					setErrorMsg(res.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

import {
	SET_FINANCIAL_PLANNING_CO_CS,
	SET_FINANCIAL_PLANNING_GOAL_CO,
	SET_GET_GOAL
} from '../actions/actionTypes';

const initialState = {
	controlStructure: null,
	financialPlanningGoalsCO: []
};

const financialPlanningCOReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FINANCIAL_PLANNING_CO_CS:
			return { ...state, controlStructure: action.payload };
		case SET_GET_GOAL:
			return { ...state, getGoal: action.payload };
		case SET_FINANCIAL_PLANNING_GOAL_CO:
			return { ...state, financialPlanningGoalsCO: action.payload };
		default:
			return state;
	}
};

export default financialPlanningCOReducer;

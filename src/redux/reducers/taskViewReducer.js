import {
	SET_TASK_VIEW_CS,
	SET_TASK_VIEW_FULL_CS,
	SET_TASK_ADD_CS,
	SET_TASK_ADD_FULL_CS,
	GET_TASK_VIEW_DATA,
	GET_TASK_MISCELLANEOUS_DETAILS,
	GET_TASK_ATTACHMENT_DETAILS,
	SET_TASK_UPLOAD_ATTACHMENT,
	GET_TASK_HISTORY_DETAIL,
	SET_TASK_EDIT_DETAIL,
	CLEAR_TASK_EDIT_DETAIL
} from '../actions/actionTypes';

const initialState = {
	taskiewControlStructure: [],
	taskViewControlStructureFull: [],
	taskAddControlStructure: [],
	taskAddControlStructureFull: [],
	taskViewData: null,
	taskHistoryDetail: null,
	taskMiscellaneousDetail: null,
	taskAttachments: null,
	taskEditDetail: null,
	error: ''
};

const taskViewReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TASK_VIEW_FULL_CS: {
			const newState = {
				...state,
				taskViewControlStructureFull: action.payload
			};
			return newState;
		}
		case SET_TASK_VIEW_CS: {
			const newState = {
				...state,
				taskViewControlStructure: action.payload
			};

			return newState;
		}
		case SET_TASK_ADD_FULL_CS: {
			const newState = {
				...state,
				taskAddControlStructureFull: action.payload
			};
			return newState;
		}
		case SET_TASK_ADD_CS: {
			const newState = {
				...state,
				taskAddControlStructure: action.payload
			};

			return newState;
		}

		case GET_TASK_VIEW_DATA:
			return {
				...state,
				taskViewData: action.payload,
				taskHistoryDetail: '',
				taskMiscellaneousDetail: '',
				taskAttachments: '',
				taskEditDetail: '',
				error: ''
			};
		case GET_TASK_HISTORY_DETAIL:
			return {
				...state,
				taskHistoryDetail: action.payload,
				taskEditDetail: '',
				error: ''
			};
		case GET_TASK_MISCELLANEOUS_DETAILS:
			return {
				...state,
				taskMiscellaneousDetail: action.payload,
				taskEditDetail: '',
				error: ''
			};
		case GET_TASK_ATTACHMENT_DETAILS:
			return {
				...state,
				taskAttachments: action.payload,
				taskEditDetail: '',
				error: ''
			};
		case SET_TASK_EDIT_DETAIL:
			return {
				...state,
				taskEditDetail: action.payload,
				error: ''
			};
		case CLEAR_TASK_EDIT_DETAIL:
			return {
				...state,
				taskEditDetail: null,
				error: ''
			};
		default:
			return state;
	}
};

export default taskViewReducer;

import {
	getTaskViewCsApi,
	getTaskAddCsApi,
	getTaskViewApi,
	deleteTaskApi,
	getTaskMiscellaneousDetailApi,
	getTaskAttachmentDetailApi,
	uploadTaskAttachmentApi,
	getTaskHistoryApi
} from '../../api/taskViewApi';
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
} from './actionTypes';
import { generateCsObject } from '../../utils/utils';

const getTaskViewData = (payload) => {
	return { type: GET_TASK_VIEW_DATA, payload: payload };
};

export const clearTaskEdit = () => {
	return { type: CLEAR_TASK_EDIT_DETAIL };
};

const getTaskViewAttachmentDetail = (payload) => {
	return { type: GET_TASK_ATTACHMENT_DETAILS, payload: payload };
};

const getTaskViewMiscellaneousDetail = (payload) => {
	return { type: GET_TASK_MISCELLANEOUS_DETAILS, payload: payload };
};

const saveTaskEditViewDetail = (payload) => {
	return { type: SET_TASK_EDIT_DETAIL, payload: payload };
};

const setTaskViewCs = (payload) => {
	return { type: SET_TASK_VIEW_CS, payload: payload };
};
const setTaskViewFullCs = (payload) => {
	return { type: SET_TASK_VIEW_FULL_CS, payload: payload };
};
const setTaskAddCs = (payload) => {
	return { type: SET_TASK_ADD_CS, payload: payload };
};
const setTaskAddFullCs = (payload) => {
	return { type: SET_TASK_ADD_FULL_CS, payload: payload };
};
const getTaskHistoryDetail = (payload) => {
	return { type: GET_TASK_HISTORY_DETAIL, payload: payload };
};
export function excecuteGetTaskViewCs() {
	return function (dispatch, getState) {
		return getTaskViewCsApi()
			.then((res) => {
				const { data } = res;
				const { csList } = data;
				let taskViewCs = [];
				csList.length > 1 &&
					(taskViewCs = [...csList[0].controlStructureField, ...csList[1].controlStructureField]);
				taskViewCs = generateCsObject(taskViewCs);
				dispatch(setTaskViewFullCs(csList));
				dispatch(setTaskViewCs(taskViewCs));
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
}

export function excecuteGetTaskAddCs() {
	return function (dispatch, getState) {
		return getTaskAddCsApi()
			.then((res) => {
				const { data } = res;
				const { csList } = data;
				let taskAddCs = [];
				csList.length > 1 &&
					(taskAddCs = [...csList[0].controlStructureField, ...csList[1].controlStructureField]);
				taskAddCs = generateCsObject(taskAddCs);
				dispatch(setTaskAddFullCs(csList));
				dispatch(setTaskAddCs(taskAddCs));
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
}

export const excecuteGetTaskView = (followUpId, id, setErrorMsg, activityID) => {
	return (dispatch) => {
		setErrorMsg('');
		getTaskViewApi(followUpId, id, activityID, false)
			.then((res) => {
				if (res.status === 200) {
					dispatch(
						excecuteGetTaskAttachmentDetail(res.data.taskScheduler?.activityID, setErrorMsg)
					);
					dispatch(
						excecuteGetTaskMiscellaneousDetail(res.data.taskScheduler?.activityID, setErrorMsg)
					);
					dispatch(excecuteGetTaskHistoryDetail(res.data.taskScheduler?.activityID, setErrorMsg));
					dispatch(getTaskViewData(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				setErrorMsg(error);
			});
	};
};
export const excecuteGetTaskAttachmentDetail = (taskId, setErrorMsg) => {
	return (dispatch) => {
		setErrorMsg('');
		getTaskAttachmentDetailApi(taskId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(getTaskViewAttachmentDetail(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				setErrorMsg(error);
			});
	};
};

export const excecuteGetTaskMiscellaneousDetail = (taskId, setErrorMsg) => {
	return (dispatch) => {
		// setErrorMsg("");
		getTaskMiscellaneousDetailApi(taskId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(getTaskViewMiscellaneousDetail(res.data));
				} else {
					// setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				// setErrorMsg(error);
			});
	};
};

export const excecuteGetTaskHistoryDetail = (taskId, setErrorMsg) => {
	return (dispatch) => {
		setErrorMsg('');
		getTaskHistoryApi(taskId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(getTaskHistoryDetail(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				setErrorMsg(error);
			});
	};
};

export const executeSaveTaskEditDetail = (taskEditDetail) => {
	return (dispatch) => {
		dispatch(saveTaskEditViewDetail(taskEditDetail));
	};
};

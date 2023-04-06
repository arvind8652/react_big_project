import { getAllTaskDataApi, getTaskListingCsApi } from '../../api/taskListingApi';
import { SET_TASK_LISTING_DATA, SET_TASK_LISTING_CS } from './actionTypes';

const setTaskListingCs = (payload) => {
	return { type: SET_TASK_LISTING_CS, payload: payload };
};

const setTaskListingData = (payload) => {
	return { type: SET_TASK_LISTING_DATA, payload: payload };
};

export const executeGetTaskListingCs = () => {
	return (dispatch) => {
		getTaskListingCsApi()
			.then((res) => {
				dispatch(setTaskListingCs(res.data.csList));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetAllTaskData = (setLocalTaskData, setLoading, startDate, endDate) => {
	return (dispatch) => {
		setLoading(true);
		getAllTaskDataApi(startDate, endDate)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setTaskListingData(res.data));
					setLocalTaskData(res.data.taskListResponseModel);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
};

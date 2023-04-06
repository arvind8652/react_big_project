import {
	getInteractionViewCsApi,
	getInteractionAddCsApi,
	getInteractionViewApi,
	getAttachmentDetailApi,
	getMiscellaneousDetailApi,
	getInteractionVerticalTimelineApi,
	getInteractionHistoryApi
} from '../../api/interactionViewApi';
import {
	SET_INTERACTION_VIEW_CS,
	SET_INTERACTION_VIEW_FULL_CS,
	SET_INTERACTION_ADD_CS,
	SET_INTERACTION_ADD_FULL_CS,
	GET_INTERACTION_VIEW_DATA,
	GET_INTERACTION_VERTICAL_TIMELINE,
	GET_INTERACTION_ATTACHMENT_DETAILS,
	GET_INTERACTION_MISCELLANEOUS_DETAILS,
	SET_INTERACTION_UPLOAD_ATTACHMENT,
	GET_INTERACTION_HISTORY_DETAIL,
	SET_INTERACTION_EDIT_DETAIL,
	CLEAR_INTERACTION_EDIT_DETAIL
} from './actionTypes';
import { generateCsObject } from '../../utils/utils';

const getInteractionViewData = (payload) => {
	return { type: GET_INTERACTION_VIEW_DATA, payload: payload };
};

export const clearInteractionEdit = () => {
	return { type: CLEAR_INTERACTION_EDIT_DETAIL };
};

const getInteractionViewAttachmentDetail = (payload) => {
	return { type: GET_INTERACTION_ATTACHMENT_DETAILS, payload: payload };
};

const getInteractionViewMiscellaneousDetail = (payload) => {
	return { type: GET_INTERACTION_MISCELLANEOUS_DETAILS, payload: payload };
};

const saveInteractionEditViewDetail = (payload) => {
	return { type: SET_INTERACTION_EDIT_DETAIL, payload: payload };
};

const getInteractionVerticalTimelineDetail = (payload) => {
	return { type: GET_INTERACTION_VERTICAL_TIMELINE, payload: payload };
};

const setInteractionViewCs = (payload) => {
	return { type: SET_INTERACTION_VIEW_CS, payload: payload };
};
const setInteractionViewFullCs = (payload) => {
	return { type: SET_INTERACTION_VIEW_FULL_CS, payload: payload };
};
const setInteractionAddCs = (payload) => {
	return { type: SET_INTERACTION_ADD_CS, payload: payload };
};
const setInteractionAddFullCs = (payload) => {
	return { type: SET_INTERACTION_ADD_FULL_CS, payload: payload };
};
const getInteractionHistoryDetail = (payload) => {
	return { type: GET_INTERACTION_HISTORY_DETAIL, payload: payload };
};

export function excecuteGetInteractionViewCs() {
	return function (dispatch, getState) {
		return getInteractionViewCsApi()
			.then((res) => {
				const { data } = res;
				const { csList } = data;
				let interactionViewCs = [];
				csList.length > 1 &&
					(interactionViewCs = [
						...csList[0].controlStructureField,
						...csList[1].controlStructureField
					]);
				interactionViewCs = generateCsObject(interactionViewCs);
				dispatch(setInteractionViewFullCs(csList));
				dispatch(setInteractionViewCs(interactionViewCs));
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
}

export function excecuteGetInteractionAddCs() {
	return function (dispatch, getState) {
		return getInteractionAddCsApi()
			.then((res) => {
				const { data } = res;
				const { csList } = data;
				let interactionAddCs = [];
				csList.length > 1 &&
					(interactionAddCs = [
						...csList[0].controlStructureField,
						...csList[1].controlStructureField
					]);
				interactionAddCs = generateCsObject(interactionAddCs);
				dispatch(setInteractionAddFullCs(csList));
				dispatch(setInteractionAddCs(interactionAddCs));
			})
			.catch((error) => {
				console.log('Error', error);
			});
	};
}

export const excecuteGetInteractionView = (interactionId, id, setErrorMsg, activityID) => {
	return (dispatch) => {
		setErrorMsg('');
		getInteractionViewApi(interactionId, id, activityID, false)
			.then((res) => {
				if (res.status === 200) {
					dispatch(excecuteGetAttachmentDetail(res.data.taskScheduler.activityID, setErrorMsg));
					dispatch(excecuteGetMiscellaneousDetail(res.data.taskScheduler.activityID, setErrorMsg));
					dispatch(excecuteInteractionVerticalTimeline(res.data.taskScheduler.refID, setErrorMsg));
					dispatch(
						excecuteGetInteractionHistoryDetail(res.data.taskScheduler.activityID, setErrorMsg)
					);
					dispatch(getInteractionViewData(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
				setErrorMsg(error);
			});
	};
};

export const excecuteInteractionVerticalTimeline = (interactionId, setErrorMsg) => {
	return (dispatch) => {
		setErrorMsg('');
		getInteractionVerticalTimelineApi(interactionId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(getInteractionVerticalTimelineDetail(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				setErrorMsg(error);
			});
	};
};

export const excecuteGetAttachmentDetail = (interactionId, setErrorMsg) => {
	return (dispatch) => {
		setErrorMsg('');
		getAttachmentDetailApi(interactionId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(getInteractionViewAttachmentDetail(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				setErrorMsg(error);
			});
	};
};

export const excecuteGetMiscellaneousDetail = (interactionId, setErrorMsg) => {
	return (dispatch) => {
		setErrorMsg('');
		getMiscellaneousDetailApi(interactionId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(getInteractionViewMiscellaneousDetail(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				setErrorMsg(error);
			});
	};
};

export const excecuteGetInteractionHistoryDetail = (interactionId, setErrorMsg) => {
	return (dispatch) => {
		setErrorMsg('');
		getInteractionHistoryApi(interactionId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(getInteractionHistoryDetail(res.data));
				} else {
					setErrorMsg(res.data.message);
				}
			})
			.catch((error) => {
				setErrorMsg(error);
			});
	};
};

export const executeSaveInteractionEditDetail = (interactionEditDetail) => {
	return (dispatch) => {
		dispatch(saveInteractionEditViewDetail(interactionEditDetail));
	};
};

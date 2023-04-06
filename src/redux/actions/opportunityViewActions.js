import {
  getOpportunityViewCsApi,
  getOpportunityAddCsApi,
  getOpportunityDependentDataApi,
  getOpportunityViewApi,
  getHorizontalTimelineApi,
  getVerticalTimelineApi,
  getProbablityByStageApi,
  getNextOrPreviousOpportunityViewApi,
  getAttachmentDetailApi,
  getMiscellaneousDetailApi,
  deleteOpportunityApi,
} from "../../api/opportunityViewApi";
import {
  SET_OPPORTUNITY_ADD_FULL_CS,
  SET_OPPORTUNITY_VIEW_FULL_CS,
  SET_OPPORTUNITY_ADD_CS,
  SET_OPPORTUNITY_VIEW_CS,
  GET_OPPORTUNITY_VIEW_DATA,
  SET_OPPORTUNITY_VIEW_NEXT_OR_PREVIOUS_DATA,
  GET_HORIZONTAL_TIMELINE,
  GET_VERTICAL_TIMELINE,
  GET_OPPORTUNITY_ATTACHMENT_DETAILS,
  GET_OPPORTUNITY_MISCELLANEOUS_DETAILS,
  SET_UPLOAD_ATTACHMENT,
  GET_OPPORTUNITY_STAGE_DETAIL,
  GET_PROBABILITY_BY_STAGE,
  SET_OPPORTUNITY_EDIT_DETAIL,
  CLEAR_OPPORTUNITY_EDIT_DETAIL,
} from "./actionTypes";
import { generateCsObject } from "../../utils/utils";

const getOpportunityViewData = (payload) => {
  return { type: GET_OPPORTUNITY_VIEW_DATA, payload: payload };
};

const setOpportunityViewNextOrPreviousData = (payload) => {
  return { type: SET_OPPORTUNITY_VIEW_NEXT_OR_PREVIOUS_DATA, payload: payload };
};

export const clearOpportunityEdit = () => {
  return { type: CLEAR_OPPORTUNITY_EDIT_DETAIL };
};

const getOpportunityViewAttachmentDetail = (payload) => {
  return { type: GET_OPPORTUNITY_ATTACHMENT_DETAILS, payload: payload };
};

const getOpportunityViewMiscellaneousDetail = (payload) => {
  return { type: GET_OPPORTUNITY_MISCELLANEOUS_DETAILS, payload: payload };
};

const saveOpportunityEditViewDetail = (payload) => {
  return { type: SET_OPPORTUNITY_EDIT_DETAIL, payload: payload };
};

const getOpportunityViewDependentDetail = (payload) => {
  return { type: GET_OPPORTUNITY_STAGE_DETAIL, payload: payload };
};

const getOpportunityVerticalTimelineDetail = (payload) => {
  return { type: GET_VERTICAL_TIMELINE, payload: payload };
};

const getOpportunityHorizontalTimelineDetail = (payload) => {
  return { type: GET_HORIZONTAL_TIMELINE, payload: payload };
};

const setOpportunityViewCs = (payload) => {
  return { type: SET_OPPORTUNITY_VIEW_CS, payload: payload };
};
const setOpportunityViewFullCs = (payload) => {
  return { type: SET_OPPORTUNITY_VIEW_FULL_CS, payload: payload };
};

const setOpportunityAddCs = (payload) => {
  return { type: SET_OPPORTUNITY_ADD_CS, payload: payload };
};
const setOpportunityAddFullCs = (payload) => {
  return { type: SET_OPPORTUNITY_ADD_FULL_CS, payload: payload };
};

export function excecuteGetOpportunityViewCs() {
  return function (dispatch, getState) {
    return getOpportunityViewCsApi()
      .then((res) => {
        const { data } = res;
        const { csList } = data;
        let opportunityViewCs = [];
        csList.length > 1 &&
          (opportunityViewCs = [
            ...csList[0].controlStructureField,
            ...csList[1].controlStructureField,
          ]);
        opportunityViewCs = generateCsObject(opportunityViewCs);
        dispatch(setOpportunityViewFullCs(csList));
        dispatch(setOpportunityViewCs(opportunityViewCs));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

export function excecuteGetOpportunityAddCs() {
  return function (dispatch, getState) {
    return getOpportunityAddCsApi()
      .then((res) => {
        const { data } = res;
        const { csList } = data;
        let opportunityAddCs = [];
        csList.length > 1 &&
          (opportunityAddCs = [
            ...csList[0].controlStructureField,
            ...csList[1].controlStructureField,
          ]);
        opportunityAddCs = generateCsObject(opportunityAddCs);
        dispatch(setOpportunityAddFullCs(csList));
        dispatch(setOpportunityAddCs(opportunityAddCs));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
}

export const excecuteGetOpportunityView = (opportunityId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getOpportunityViewApi(opportunityId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            excecuteGetAttachmentDetail(res.data.opportunityId, setErrorMsg)
          );
          dispatch(
            excecuteGetMiscellaneousDetail(res.data.opportunityId, setErrorMsg)
          );
          dispatch(
            excecuteOpportunityHorizontalTimeline(
              res.data.opportunityId,
              setErrorMsg
            )
          );
          dispatch(
            excecuteOpportunityVerticalTimeline(
              res.data.opportunityId,
              setErrorMsg
            )
          );
          dispatch(getOpportunityViewData(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const executeOpportunityViewNextOrPreviousData = (opportunityId) => {
  return (dispatch) => {
    dispatch(setOpportunityViewNextOrPreviousData(opportunityId));
  };
};

export const excecuteOpportunityHorizontalTimeline = (
  opportunityId,
  setErrorMsg
) => {
  return (dispatch) => {
    setErrorMsg("");
    getHorizontalTimelineApi(opportunityId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOpportunityHorizontalTimelineDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteOpportunityVerticalTimeline = (
  opportunityId,
  setErrorMsg
) => {
  return (dispatch) => {
    setErrorMsg("");
    getVerticalTimelineApi(opportunityId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOpportunityVerticalTimelineDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteGetAttachmentDetail = (opportunityId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getAttachmentDetailApi(opportunityId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOpportunityViewAttachmentDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteGetMiscellaneousDetail = (opportunityId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getMiscellaneousDetailApi(opportunityId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOpportunityViewMiscellaneousDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteOpportunityDependentData = (detail, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getOpportunityDependentDataApi(detail)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOpportunityViewDependentDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const executeSaveOpportunityEditDetail = (opportunityEditDetail) => {
  return (dispatch) => {
    dispatch(saveOpportunityEditViewDetail(opportunityEditDetail));
  };
};

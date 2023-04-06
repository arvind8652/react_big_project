import {
  getProspects360ViewApi,
  deleteProspectApi,
  downgradeProspectApi,
  getAttachmentDetailApi,
  getMiscellaneousDetailApi,
  getProspectRelationsApi,
  getProspectOpportunityApi,
  getProspectInteractionApi,
  getProspectTaskApi,
  getProspectNotesApi,
  getProspectVerticalTimelineApi,
  uploadAttachmentApi,
  getCustomerDetailApi,
} from "../../api/prospectViewApi";
import {
  getDependentDataApi,
} from "../../api/controlStructureApi";
import {
  GET_PROSPECT360_VIEW_DATA,
  GET_PROSPECT_VERTICAL_TIMELINE,
  GET_PROSPECT_ATTACHMENT_DETAILS,
  GET_PROSPECT_MISCELLANEOUS_DETAILS,
  GET_PROSPECT_CUSTOMER_DETAIL,
  GET_PROSPECT_OPPORUNTIY_DETAILS,
  GET_PROSPECT_REALTION_DETAILS,
  GET_PROSPECT_INTERACTION_DETAILS,
  GET_PROSPECT_TASK_DETAILS,
  GET_PROSPECT_NOTES_DETAILS,
  SET_PROSPECT_UPLOAD_ATTACHMENT,
  SET_PROSPECT_EDIT_DETAIL,
  CLEAR_PROSPECT_EDIT_DETAIL,
  GET_PROSPECT_CONVERSION_DEPENDANT_DATA
} from "./actionTypes";
// import { store } from "../configureStore";

const getProspect360ViewData = (payload) => {
  return { type: GET_PROSPECT360_VIEW_DATA, payload: payload };
};

const getProspectOpporunityDetail = (payload) => {
  return { type: GET_PROSPECT_OPPORUNTIY_DETAILS, payload: payload };
};

export const clearProspectEdit = () => {
  return { type: CLEAR_PROSPECT_EDIT_DETAIL };
};

const getProspectViewAttachmentDetail = (payload) => {
  return { type: GET_PROSPECT_ATTACHMENT_DETAILS, payload: payload };
};

const getProspectViewMiscellaneousDetail = (payload) => {
  return { type: GET_PROSPECT_MISCELLANEOUS_DETAILS, payload: payload };
};

const saveProspectEditViewDetail = (payload) => {
  return { type: SET_PROSPECT_EDIT_DETAIL, payload: payload };
};

const getProspectViewRelationDetail = (payload) => {
  return { type: GET_PROSPECT_REALTION_DETAILS, payload: payload };
};

const getProspectVerticalTimelineDetail = (payload) => {
  return { type: GET_PROSPECT_VERTICAL_TIMELINE, payload: payload };
};

const getProspectViewCustomerDetail = (payload) => {
  return { type: GET_PROSPECT_CUSTOMER_DETAIL, payload: payload };
};

const getProspectViewNotesDetail = (payload) => {
  return { type: GET_PROSPECT_NOTES_DETAILS, payload: payload };
};

const getProspectViewInteractionsDetail = (payload) => {
  return { type: GET_PROSPECT_INTERACTION_DETAILS, payload: payload };
};

const getProspectViewTaskDetail = (payload) => {
  return { type: GET_PROSPECT_TASK_DETAILS, payload: payload };
};

const setProspectConverionDependantData = (payload) => {
  return { type: GET_PROSPECT_CONVERSION_DEPENDANT_DATA, payload: payload };
}
export const excecuteGetProspect360View = (refId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getProspects360ViewApi(refId)
      .then((res) => {;
        if (res.status === 200) {
          dispatch(
            excecuteGetAttachmentDetail(
              res.data.prospectDetail.refID,
              setErrorMsg
            )
          );
          dispatch(
            excecuteGetMiscellaneousDetail(
              res.data.prospectDetail.refID,
              setErrorMsg
            )
          );
          dispatch(
            excecuteGetInteractionDetail(
              res.data.prospectDetail.refID,
              setErrorMsg
            )
          );
          dispatch(
            excecuteGetTaskDetail(res.data.prospectDetail.refID, setErrorMsg)
          );
          dispatch(
            excecuteGetNotesDetail(res.data.prospectDetail.refID, setErrorMsg)
          );
          dispatch(
            excecuteProspectVerticalTimeline(
              res.data.prospectDetail.refID,
              setErrorMsg
            )
          );
          dispatch(
            excecuteProspectOpportunityDetail(
              res.data.prospectDetail.refID,
              setErrorMsg
            )
          );
          dispatch(
            excecuteGetRelationsDetail(
              res.data.prospectDetail.refID,
              setErrorMsg
            )
          );
          dispatch(
            executeGetCustomerDetail(
              res.data.prospectDetail.sourceType,
              res.data.prospectDetail.sourceValue
            )
          );
          dispatch(getProspect360ViewData(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};


export const getProspectDependantData = (payload) => {
  return (dispatch) => {
    getDependentDataApi(payload)
    .then((resp) => {
      dispatch(setProspectConverionDependantData(resp.data));
    })
    .catch((error) => {
      console.log('ERRR', error);
    })
  }
};

export const excecuteProspectOpportunityDetail = (refId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getProspectOpportunityApi(refId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProspectOpporunityDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteProspectVerticalTimeline = (refId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getProspectVerticalTimelineApi(refId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProspectVerticalTimelineDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteGetAttachmentDetail = (prospectId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getAttachmentDetailApi(prospectId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProspectViewAttachmentDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteGetMiscellaneousDetail = (refId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getMiscellaneousDetailApi(refId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProspectViewMiscellaneousDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteGetRelationsDetail = (refId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getProspectRelationsApi(refId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProspectViewRelationDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteGetInteractionDetail = (refId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getProspectInteractionApi(refId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProspectViewInteractionsDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteGetNotesDetail = (refId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getProspectNotesApi(refId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProspectViewNotesDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const excecuteGetTaskDetail = (refId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getProspectTaskApi(refId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProspectViewTaskDetail(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const executeGetCustomerDetail = (sourceType, sourceValue) => {
  return (dispatch) => {
    getCustomerDetailApi(sourceType, sourceValue)
      .then((res) => {
        dispatch(getProspectViewCustomerDetail(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const executeSaveProspectEditDetail = (prospectEditDetail) => {
  return (dispatch) => {
    dispatch(saveProspectEditViewDetail(prospectEditDetail));
  };
};

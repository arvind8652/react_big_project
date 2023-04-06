import { SET_REPORT_MANAGER_CONTROL_STRUCTURE, SET_CLIENT_STATEMENT_CONTROL_STRUCTURE, SET_HOLDING_STATEMENT_CONTROL_STRUCTURE, SET_SECURITY_HOLDING_CONTROL_STRUCTURE, SET_DOCUMENT_STATUS_CONTROL_STRUCTURE, SET_ORDER_STATUS_CONTROL_STRUCTURE, SET_CUSTOMER_LIST_CONTROL_STRUCTURE, SET_TRANSACTION_STATEMENT_CONTROL_STRUCTURE, SET_WINNER_LAGGERS_CONTROL_STRUCTURE, SET_TABLE_DATA, SET_FILTER_REPORT_MANAGER, SET_ADVANCED_FILTER_CONTROL_STRUCTURE } from '../../actions/actionTypes';

const initialState = {

};

const reportsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        //common case
        case SET_FILTER_REPORT_MANAGER:
            return { ...state, reportFilterControlStructure: payload };
        case SET_TABLE_DATA:
            return { ...state, tableReportData: payload }
        case SET_ADVANCED_FILTER_CONTROL_STRUCTURE:
            return { ...state, advancedFilterControlStructure: payload }

        // client statement case
        case SET_REPORT_MANAGER_CONTROL_STRUCTURE:
            return { ...state, reportManagerControlStructure: payload };




        // client statement case
        case SET_CLIENT_STATEMENT_CONTROL_STRUCTURE:
            return { ...state, clientStatementControlStructure: payload };

        // holding statement case
        case SET_HOLDING_STATEMENT_CONTROL_STRUCTURE:
            return { ...state, holdingStatementControlStructure: payload };

        case SET_SECURITY_HOLDING_CONTROL_STRUCTURE:
            return { ...state, securityHoldingControlStructure: payload };

        case SET_CUSTOMER_LIST_CONTROL_STRUCTURE:
            return { ...state, customerListControlStructure: payload };
        case SET_DOCUMENT_STATUS_CONTROL_STRUCTURE:
            return { ...state, documentStatusControlStructure: payload };
        case SET_ORDER_STATUS_CONTROL_STRUCTURE:
            return { ...state, orderStatusControlStructure: payload };
        case SET_TRANSACTION_STATEMENT_CONTROL_STRUCTURE:
            return { ...state, transactionStatementControlStructure: payload };
        case SET_WINNER_LAGGERS_CONTROL_STRUCTURE:
            return { ...state, winnerLaggersControlStructure: payload };

        default: return state;
    }

};

export default reportsReducer;
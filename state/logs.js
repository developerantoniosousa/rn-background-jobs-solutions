
const INITIAL_STATE = {
    data: []
}

export const ActionTypes = {
    'ADD_LOG': '@logs/ADD_LOG'
}

export const reducer = (state = INITIAL_STATE, action) => {
    if (action.type === ActionTypes.ADD_LOG) {
        return {
            ...state,
            data: [
                ...state.data,
                action.payload.log
            ]
        }
    }

    return state;
}

function addLog(log) {
    return {
        type: ActionTypes.ADD_LOG,
        payload: { log }
    }
}

export const Actions = ({
    addLog
});
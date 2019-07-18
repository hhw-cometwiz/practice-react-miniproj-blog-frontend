const ReduxActions = require("redux-actions");
const Immutable = require("immutable");

const actionTypePrefix = "modal";

const SET_VISIBLE = `${actionTypePrefix}/SET_VISIBLE`;

export const setVisible = ReduxActions.createAction(SET_VISIBLE);

/** @type {Immutable.Map.<string, Immutable.Map.<string, any>>} */
const initialState = Immutable.Map({});

const getOrCreateModal = (/** @type {Immutable.Map.<string, Immutable.Map.<string, any>>} */state, name) => {
    return state.get(
        name,
        Immutable.Map(
            {
                isVisible : false
            }
        )
    );
};

const reducerMap = {
    [SET_VISIBLE] : (/** @type {Immutable.Map.<string, Immutable.Map.<string, any>>} */state, action) => {
        const {name, visible} = action.payload;
        
        const nextState = state.set(
            name,
            getOrCreateModal(state, name).set("isVisible", !!visible)
        );
        
        return nextState;
    }
};

export default ReduxActions.handleActions(reducerMap, initialState);

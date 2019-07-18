const ReduxActions = require("redux-actions");
const ReduxPender = require("redux-pender");
const Immutable = require("immutable");
const api = require("../../lib/api");

const actionTypePrefix = "auth";

const INITIALIZE = `${actionTypePrefix}/INITIALIZE`;
const IS_SIGNED_IN = `${actionTypePrefix}/IS_SIGNED_IN`;
const SIGN_IN = `${actionTypePrefix}/SIGN_IN`;
const SIGN_OUT = `${actionTypePrefix}/SIGN_OUT`;

export const initialize = ReduxActions.createAction(INITIALIZE);
export const isSignedIn = ReduxActions.createAction(IS_SIGNED_IN, api.isSignedIn);
export const signIn = ReduxActions.createAction(SIGN_IN, api.signIn);
export const signOut = ReduxActions.createAction(SIGN_OUT, api.signOut);

const initialState = Immutable.fromJS({
    isSignedIn : false,
    isSignInFailed : false
});

const reducerMap = {
    [INITIALIZE] : (state, action) => {
        return state.set("isSignInFailed", false);
    },
    ...ReduxPender.pender({
        type : IS_SIGNED_IN,
        onSuccess : (state, action) => {
            const {isSignedIn} = action.payload.data;

            return state.set("isSignedIn", isSignedIn);
        }
    }),
    ...ReduxPender.pender({
        type : SIGN_IN,
        onSuccess : (state, action) => {
            return Immutable.fromJS({
                isSignedIn : true,
                isSignInFailed : false
            });
        },
        onFailure : (state, action) => {
            console.log("onFailure");
            return Immutable.fromJS({
                isSignedIn : false,
                isSignInFailed : true
            });
        }
    }),
    ...ReduxPender.pender({
        type : SIGN_OUT,
        onSuccess : (state, action) => {
            return initialState
        }
    })
};

export default ReduxActions.handleActions(reducerMap, initialState);

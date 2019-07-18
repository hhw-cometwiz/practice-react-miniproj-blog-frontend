const Immutable = require("immutable");
const ReduxActions = require("redux-actions");
const ReduxPender = require("redux-pender");
const api = require("../../lib/api");

const actionTypePrefix = "post";

const READ = `${actionTypePrefix}/READ`;

export const read = ReduxActions.createAction(READ, api.readPostById);

const initialState = Immutable.fromJS({
    post : {
        title : "",
        content : "",
        publishedDate : new Date(0).toString(),
        tags : []
    }
});

const reducerMap = {
    ...ReduxPender.pender({
        type : READ,
        onSuccess : (state, action) => {
            const {data : post} = action.payload;
            
            const nextState = state.set("post", Immutable.fromJS(post));

            return nextState;
        }
    })
};

export default ReduxActions.handleActions(
    reducerMap,
    initialState
);

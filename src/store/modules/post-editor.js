const Immutable = require("immutable");
const ReduxActions = require("redux-actions");
const ReduxPender = require("redux-pender");
const api = require("../../lib/api");

const actionTypePrefix = "post-editor";

const INITIALIZE = `${actionTypePrefix}/INITIALIZE`;
const SET_PROPERTY = `${actionTypePrefix}/SET_PROPERTY`;
const READ = `${actionTypePrefix}/READ`;
const WRITE = `${actionTypePrefix}/WRITE`;
const UPDATE = `${actionTypePrefix}/UPDATE`;
const REMOVE = `${actionTypePrefix}/REMOVE`;

export const initialize = ReduxActions.createAction(INITIALIZE);
export const setProperty = ReduxActions.createAction(SET_PROPERTY);
export const read = ReduxActions.createAction(READ, api.readPostById);
export const write = ReduxActions.createAction(WRITE, api.writePost);
export const update = ReduxActions.createAction(UPDATE, api.updatePost);
export const remove = ReduxActions.createAction(REMOVE, api.removePost);

const initialState = Immutable.fromJS(
    {
        title : "",
        content : "",
        tags : [],
        publishedDate : new Date(0).toString(),
        postId : null
    }
);

const reducerMap = {
    [INITIALIZE] : (state, action) => {
        return initialState;
    },
    [SET_PROPERTY] : (state, action) => {
        let {name, value} = action.payload;
        
        switch(name) {
        case "tags":
            if(Array.isArray(value)) {
                value = value.map((tag) => tag.toString());
            }
            else if("string" === typeof value) {
                value = Array.from(new Set(value.split(",").map((tag) => tag.trim())));
            }
            else {
                value = Array.from(value) || [];
            }
        break;
        default:
            
        }

        const nextState = state.set(name, value);

        return nextState;
    },
    ...ReduxPender.pender({
        type : READ,
        onSuccess : (state, action) => {
            const {data : post} = action.payload;

            post.postId = post._id;

            const nextState = Immutable.fromJS(post);

            return nextState;
        }
    }),
    ...ReduxPender.pender({
        type : WRITE,
        onSuccess : (state, action) => {
            const {_id} = action.payload.data;

            return state.set("postId", _id);
        }
    }),
    ...ReduxPender.pender({
        type : UPDATE,
        onSuccess : (state, action) => {
            const {data : post} = action.payload;

            post.postId = post._id;

            const nextState = Immutable.fromJS(post);

            return nextState;
        }
    }),
    ...ReduxPender.pender({
        type : REMOVE,
        onSuccess : (state, action) => {
            return initialState;
        }
    })
};

export default ReduxActions.handleActions(
    reducerMap,
    initialState
);

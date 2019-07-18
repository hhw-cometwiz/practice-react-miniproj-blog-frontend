import * as ReduxActions from "redux-actions";
import * as ReduxPender from "redux-pender";
import * as Immutable from "immutable";
const api = require("../../lib/api");

const actionTypePrefix = "list";

const GET = `${actionTypePrefix}/GET`;

export const get = ReduxActions.createAction(GET, api.getPostList);

const initialState = Immutable.fromJS(
    {
        posts : [],
        lastPage : 0
    }
);

const reducerMap = {
    ...ReduxPender.pender({
        type : GET,
        onSuccess : (state, action) => {
            const {posts, lastPage} = action.payload.data;
            
            const nextState = Immutable.fromJS(
                Object.assign(
                    state.toJS(),
                    {
                        posts : posts.map((post) => {post.postId = post._id; return post}),
                        lastPage : lastPage
                    }
                )
            );

            return nextState;
        }
    })
};

export default ReduxActions.handleActions(
    reducerMap,
    initialState
);

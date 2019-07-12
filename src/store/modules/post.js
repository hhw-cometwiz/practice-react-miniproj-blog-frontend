import * as ReduxActions from "redux-actions";
import * as ReduxPender from "redux-pender";
import * as Immutable from "immutable";

const initialState = Immutable.Map(
    {}
);

export default ReduxActions.handleActions(
    {},
    initialState
);

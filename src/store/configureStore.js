import * as Redux from "redux";
import * as ReduxPender from "redux-pender";
import * as modules from "./modules/modules";

const rootReducer = Redux.combineReducers(modules);
const middlewares = [
    ReduxPender.default()
];
const enhancers = [
    Redux.applyMiddleware(...middlewares)
];

function configureStore(preloadedState) {
    return Redux.createStore(
        rootReducer,
        preloadedState,
        Redux.compose(...enhancers)
    );
}

export default configureStore;

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

let composeEnhancers = Redux.compose;
if("object" === typeof window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

function configureStore(preloadedState) {
    return Redux.createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(...enhancers)
    );
}

export default configureStore;

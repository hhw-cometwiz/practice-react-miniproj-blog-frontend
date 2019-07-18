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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

function configureStore(preloadedState) {
    return Redux.createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(...enhancers)
    );
}

export default configureStore;

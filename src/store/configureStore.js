const Redux = require("redux");
const ReduxPender = require("redux-pender");
const modules = require("./modules/modules");

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

module.exports = configureStore;

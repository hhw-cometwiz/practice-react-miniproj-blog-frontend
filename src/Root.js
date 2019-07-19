const React = require("react");
const ReactRedux = require("react-redux");
const ReactRouterDom = require("react-router-dom");
const transit = require("transit-immutable-js");
const configureStore = require("./store/configureStore");
const App = require("./components/App").default;

let preloadedState = null;
if("undefined" !== typeof window) {
    if("undefined" !== typeof window.__PRELOADED_STATE__) {
        console.log("preloadedState exists!!!");
        preloadedState = transit.fromJSON(window.__PRELOADED_STATE__);
    }
}
let store = null;
if(preloadedState === null) {
    store = configureStore();
}
else {
    store = configureStore(preloadedState);
}

class Root extends React.Component {
    render() {
        return (
            <ReactRedux.Provider store={store}>
                <ReactRouterDom.BrowserRouter>
                    <App />
                </ReactRouterDom.BrowserRouter>
            </ReactRedux.Provider>
        );
    }
}

export default Root;

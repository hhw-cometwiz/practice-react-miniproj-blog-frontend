import React from "react";
import * as ReactRedux from "react-redux";
import * as ReactRouterDom from "react-router-dom";
import configureStore from "./store/configureStore";
import App from "./components/App";

const store = configureStore();

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

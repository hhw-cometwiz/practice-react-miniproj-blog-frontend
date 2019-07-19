const React = require("react");
const ReactDOMServer = require("react-dom/server");
const ReactRouter = require("react-router");
const ReactRedux = require("react-redux");
const configureStore = require("./store/configureStore");
const App = require("./components/App");

const render = (ctx) => {
    const {url} = ctx;

    const store = configureStore();

    const html = ReactDOMServer.renderToString(
        <ReactRedux.Provider
            store={store}>
            <ReactRouter.StaticRouter
                location={url}>
                <App />
            </ReactRouter.StaticRouter>
        </ReactRedux.Provider>
    );

    return html;
};

module.exports = render;

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const ReactRouter = require("react-router");
const ReactRedux = require("react-redux");
const configureStore = require("./store/configureStore");
const Axios = require("axios").default;
const transit = require("transit-immutable-js");
const {routeSettings} = require("./route-settings");
const App = require("./components/App").default;

export const render = async (ctx) => {
    console.log(ctx);
    const {url, query, origin} = ctx;

    Axios.defaults.baseURL = origin;

    const store = configureStore();
    
    const promises = [];
    routeSettings.forEach(
        (setting) => {
            let urlWithoutQueryString = url;
            const queryStringIndex = url.lastIndexOf('?' + ctx.querystring);
            if(queryStringIndex >= 0) {
                urlWithoutQueryString = url.slice(0, queryStringIndex);
            }
            
            const match = ReactRouter.matchPath(urlWithoutQueryString, setting);
            if(match) {
                const {component: Component} = setting;

                if("function" === typeof Component.preload) {
                    const {params} = match;

                    const promise = Component.preload(store.dispatch, params, query);

                    promises.push(promise);
                }
            }
        }
    );
    try {
        await Promise.all(promises);
    }
    catch(e) {

    }

    const html = ReactDOMServer.renderToString(
        <ReactRedux.Provider
            store={store}>
            <ReactRouter.StaticRouter
                location={url}>
                <App />
            </ReactRouter.StaticRouter>
        </ReactRedux.Provider>
    );

    const preloadedState = 
        JSON.stringify(
            transit.toJSON(store.getState())
        )
        .replace(/\</g, "\\u003c")
    ;

    return ({
        html : html,
        preloadedState : preloadedState
    });
};

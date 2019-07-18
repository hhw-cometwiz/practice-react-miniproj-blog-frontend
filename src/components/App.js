const React = require("react");
const ReactRouterDom = require("react-router-dom");
const pages = require("../pages/pages");
const GlobalComponentContainer = require("../containers/common/GlobalComponentContainer").default;

class App extends React.Component {
    render() {
        return (
            <div>
                <ReactRouterDom.Switch>
                    <ReactRouterDom.Route
                        path="/posts/:page?/:count?/:length?"
                        component={pages.PostList} />
                    <ReactRouterDom.Route
                        path="/posts/tag/:tag/:page?"
                        component={pages.PostList} />
                    <ReactRouterDom.Route
                        path="/post/:postId"
                        component={pages.Post} />
                    <ReactRouterDom.Route
                        path="/editor/:postId?"
                        component={pages.PostEditor} />
                    <ReactRouterDom.Route
                        component={pages.ErrorReport}/>
                </ReactRouterDom.Switch>
                <GlobalComponentContainer />
            </div>
        );
    }
}

export default App;

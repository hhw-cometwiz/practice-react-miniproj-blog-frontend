import React from "react";
import * as ReactRouterDom from "react-router-dom";
import * as pages from "../pages/pages";
import PageTemplate from "./common/PageTemplate";

class App extends React.Component {
    render() {
        return (
            <PageTemplate/>
        );

        // return (
        //     <div>
        //         <ReactRouterDom.Switch>
        //             <ReactRouterDom.Route
        //                 path="/posts/:page?/:count?/:length?"
        //                 component={pages.PostList} />
        //             <ReactRouterDom.Route
        //                 path="/posts/tag/:tag/:page?"
        //                 component={pages.PostList} />
        //             <ReactRouterDom.Route
        //                 path="/post/:postId"
        //                 component={pages.Post} />
        //             <ReactRouterDom.Route
        //                 path="/editor"
        //                 component={pages.PostEditor} />
        //             <ReactRouterDom.Route
        //                 component={pages.ErrorReport}/>
        //         </ReactRouterDom.Switch>
        //     </div>
        // );
    }
}

export default App;

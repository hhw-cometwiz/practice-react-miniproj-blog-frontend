const React = require("react");
const PostListStoreModule = require("../store/modules/post-list");
const PostListWrapperContainer = require("../containers/post-list/PostListWrapperContainer").default;
const appUtils = require("../lib/app-utils");

class PostList extends React.Component {
    static preload = function (dispatch, urlMatchParams, urlQuery) {
        return dispatch(
            PostListStoreModule.get(...Object.values(appUtils.parsePageListQueryString(urlQuery)))
        );
    }
    
    render() {
        return (
            <PostListWrapperContainer />
        );
    }
}

export default PostList;

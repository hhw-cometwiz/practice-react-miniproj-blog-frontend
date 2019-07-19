const React = require("react");
const PostStoreModule = require("../store/modules/post");
const PostContainer = require("../containers/post/PostContainer").default;

class Post extends React.Component {
    static preload = function (dispatch, urlMatchParams, urlQuery) {
        return dispatch(
            PostStoreModule.read(urlMatchParams.postId)
        );
    }

    render() {
        const {match} = this.props;

        return (
            <PostContainer
                postId={match.params.postId} />
        );
    }
}

export default Post;

import React from "react";
import PostContainer from "../containers/post/PostContainer";

class Post extends React.Component {
    render() {
        const {match} = this.props;

        return (
            <PostContainer
                postId={match.params.postId} />
        );
    }
}

export default Post;

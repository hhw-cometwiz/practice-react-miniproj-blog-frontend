import React from "react";
import UiPageTemplate from "../components/common/PageTemplate"
import UiPostListWrapper from "../components/post-list/PostListWrapper";
import UiPostList from "../components/post-list/PostList";

class PostList extends React.Component {
    render() {
        return (
            <UiPageTemplate>
                <UiPostListWrapper>
                    <UiPostList />
                </UiPostListWrapper>
            </UiPageTemplate>
        );
    }
}

export default PostList;

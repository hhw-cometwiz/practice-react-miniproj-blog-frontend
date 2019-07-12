import React from "react";
import classNames from "classnames/bind";
import PostListItem from "./PostListItem";
import styles from "./PostList.module.scss";

const cx = classNames.bind(styles);

class PostList extends React.Component {
    render() {
        const posts = [
            {
                title : "title1",
                publishedDate : new Date().toString(),
                content : "some texts.",
                tags : ["tag1", "tag2", "tag3"]
            },
            {
                title : "title2",
                publishedDate : new Date().toString(),
                content : "some texts.",
                tags : ["tag1", "tag2", "tag3"]
            },
            {
                title : "title3",
                publishedDate : new Date().toString(),
                content : "some texts.",
                tags : ["tag1", "tag2", "tag3"]
            }
        ];

        return (
            <ul className={cx("post-list")}>{posts.map((post, index) => (
                <PostListItem key={index} {...post}/>
            ))}</ul>
        );
    }
}

export default PostList;

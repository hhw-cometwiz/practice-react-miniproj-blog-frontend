import React from "react";
import PostList from "./PostList"
import classNames from "classnames/bind"
import styles from "./PostListWrapper.module.scss";

const cx = classNames.bind(styles);

class PostListWrapper extends React.Component {
    render() {
        return (
            <div className={cx("post-list-wrapper")}>{this.props.children}</div>
        );
    }
}

export default PostListWrapper;

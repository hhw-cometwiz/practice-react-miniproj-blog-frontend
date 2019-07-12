import React from "react";
import classNames from "classnames/bind";
import styles from "./PostListItem.module.scss";

const cx = classNames.bind(styles);

class PostListItem extends React.Component {
    render() {
        const {title, publishedDate, content, tags} = this.props;

        return (
            <li className={cx("post-list-item")}>
                <h2><a>{title}</a></h2>
                <h3 className={cx("date")}>{publishedDate}</h3>
                <div className={cx("content")}>{content}</div>
                <div className={cx("tags")}>{tags && Array.from(tags).map((tag, index) => (<a key={index}>&#x23;{tag}</a>))}</div>
            </li>
        );
    }
}

export default PostListItem;

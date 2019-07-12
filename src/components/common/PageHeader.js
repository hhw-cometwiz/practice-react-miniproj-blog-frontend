import React from "react";
import classNames from "classnames/bind";
import styles from "./PageHeader.module.scss";
import Button from "./Button";

const cx = classNames.bind(styles);

class PageHeader extends React.Component {
    render() {
        return (
            <header className={cx("page-header")}>
                <div className={cx("content")}>
                    <div className={cx("logo")}>miniproj-blog</div>
                    <div className={cx("buttons")}>
                        <Button theme="outline">Modify</Button>
                        <Button theme="outline">Remove</Button>
                        <Button theme="outline">New Post</Button>
                    </div>
                </div>
            </header>
        );
    }
}

export default PageHeader;

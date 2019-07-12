import React from "react";
import classNames from "classnames/bind";
import styles from "./PageFooter.module.scss";

const cx = classNames.bind(styles);

class PageFooter extends React.Component {
    render() {
        return (
            <footer className={cx("page-footer")}>
                <div className={cx("logo")}>miniproj-blog</div>
                <div className={cx("sign-in")}>Sign in</div>
            </footer>
        );
    }
}

export default PageFooter;

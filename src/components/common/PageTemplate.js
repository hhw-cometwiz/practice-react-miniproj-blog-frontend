import React from "react";
import classNames from "classnames/bind";
import styles from "./PageTemplate.module.scss";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

const cx = classNames.bind(styles);

class PageTemplate extends React.Component {
    render() {
        const {children} = this.props;

        return (
            <div className={cx("page-template")}>
                <PageHeader />
                <main>{children}</main>
                <PageFooter />
            </div>
        );
    }
}

export default PageTemplate;

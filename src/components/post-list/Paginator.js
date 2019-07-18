import React from "react";
import classNames from "classnames/bind";
import Button from "../common/Button";
import styles from "./Paginator.module.scss";

const cx = classNames.bind(styles);

class Paginator extends React.Component {
    render() {
        const {
            pageCount = 0, contentLength = 0, lastPage = 1, tags = [],
            pageListPathGenerator = () => "#"
        } = this.props;
        let {page = 1} = this.props;

        const isBtnPreviousDisabled = page <= 1;
        const isBtnNextDisabled = page >= lastPage;

        return (
            <div className={cx("paginator")}>
                <Button
                    disabled={isBtnPreviousDisabled}
                    to={(isBtnPreviousDisabled ? "#" : pageListPathGenerator(Number.parseInt(page) - 1, pageCount, contentLength, tags))}>Previous</Button>
                <div className={cx("number")}>Page {page} / {lastPage}</div>
                <Button
                    disabled={isBtnNextDisabled}
                    to={(isBtnNextDisabled ? "#" : pageListPathGenerator(Number.parseInt(page) + 1, pageCount, contentLength, tags))}>Next</Button>
            </div>
        );
    }
}

export default Paginator;

import React from "react";
import classNames from "classnames/bind";
import styles from "./PageFooter.module.scss";

const cx = classNames.bind(styles);

class PageFooter extends React.Component {
    render() {
        const {isSignedIn = false} = this.props;
        
        return (
            <footer className={cx("page-footer")}>
                <div className={cx("logo")}>miniproj-blog</div>
                <div className={cx("sign-in")} onClick={this._onBtnSignInClick}>{(isSignedIn ? "Sign out" : "Sign in")}</div>
            </footer>
        );
    }

    /**
     * 
     * @type {MouseEvent} e 
     */
    _onBtnSignInClick = (e) => {
        this._invokeEventHandler(
            "onSignInButtonClick",
            {
                source : this,
                mouseEvent : e
            }
        );
    }

    /**
     * 
     * @param {string} eventName 
     * @param {object} eventArgs
     */
    _invokeEventHandler = (eventName, eventArgs) => {
        const handler = this.props[eventName];
        if("function" === typeof handler) {
            handler(eventArgs);
        }
    }
}

export default PageFooter;

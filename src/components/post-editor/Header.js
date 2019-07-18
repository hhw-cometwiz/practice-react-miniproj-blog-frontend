const React = require("react");
const classNames = require("classnames/bind");
const Button = require("../common/Button").default;
const styles = require("./Header.module.scss");

const cx = classNames.bind(styles);

class Header extends React.Component {
    /**
     * 
     * @param {MouseEvent} e 
     */
    onBtnBackClick = (e) => {
        this._invokeEventHandler("onCancelButtonClick", e);
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    onBtnSubmitClick = (e) => {
        this._invokeEventHandler("onSubmitButtonClick", e);
    }

    render() {
        const {postId} = this.props;

        return (
            <div className={cx("header")}>
                <div className={cx("back")}><Button onClick={this.onBtnBackClick}>Back</Button></div>
                <div className={cx("submit")}><Button onClick={this.onBtnSubmitClick}>{(postId ? "Modify" : "Post")}</Button></div>
            </div>
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

export default Header;

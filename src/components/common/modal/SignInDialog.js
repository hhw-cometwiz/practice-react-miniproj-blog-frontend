const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./SignInDialog.module.scss");
const Modal = require("../Modal").default;

const cx = classNames.bind(styles);

class SignInDialog extends React.Component {
    render() {
        const {
            isVisible, isSignInFailed = false
        } = this.props;

        return (
            <Modal
                isVisible={isVisible}>
                <div className={cx("sign-in")}>
                    <div onClick={this._onBtnCancelClick} className={cx("close")}>&times;</div>
                    <div className={cx("title")}>Sign in</div>
                    <div className={cx("message")}>Enter the password of the administrator.</div>
                    <input
                        ref={(r) => this._plainPassword = r}
                        autoFocus
                        type="password"
                        name="plain-password"
                        placeholder="Enter the password on here." />
                    {isSignInFailed && <div className={cx("error")}>Failed to sign in.</div>}
                    <div className={cx("button")} onClick={this._onBtnSignInClick}>Sign in</div>
                </div>
            </Modal>
        );
    }

    /**
     * 
     * @type {MouseEvent} e 
     */
    _onBtnCancelClick = (e) => {
        this._invokeEventHandler(
            "onCancelButtonClick",
            {
                source : this,
                mouseEvent : e
            }
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
                plainPassword : this._plainPassword.value,
                mouseEvent : e
            }
        );
    }

    /**
     * 
     * @type {Event} e 
     */
    _onInputChange = (e) => {
        switch(e.target.name) {
        case "plain-password":
            this._invokeEventHandler(
                "onPlainPasswordChanged",
                {
                    source : this,
                    event : e
                }
            );
        break;
        default:

        }
    }

    /**
     * 
     * @type {KeyboardEvent} e 
     */
    _onInputKeyPress = (e) => {
        switch(e.target.name) {
        case "plain-password":
            this._invokeEventHandler(
                "onPlainPasswordKeyDown",
                {
                    source : this,
                    keyboardEvent : e
                }
            );
        break;
        default:
            
        }
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

export default SignInDialog;

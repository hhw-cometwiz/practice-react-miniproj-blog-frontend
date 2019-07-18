const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./YesNoDialog.module.scss");
const Modal = require("../Modal").default;
const Button = require("../Button").default;

const cx = classNames.bind(styles);

class YesNoDialog extends React.Component {
    render() {
        const {
            isVisible,
            backgroundColor, baseZIndex,
            title = "", message = "", yesLabel = "Yes", noLabel = "No"
        } = this.props;
        
        return (
            <Modal
                isVisible={isVisible}
                backgroundColor={backgroundColor}
                foregroundClassNames={cx("yes-no-dialog")}
                baseZIndex={baseZIndex} >
                <div className={cx("title")}>{title}</div>
                <div className={cx("message")}>{message}</div>
                <div className={cx("options")}>
                    <Button onClick={this._onBtnYesClick}>{yesLabel}</Button>
                    <Button onClick={this._onBtnNoClick}>{noLabel}</Button>
                </div>
            </Modal>
        );
    }
    
    /**
     * 
     * @param {MouseEvent} e 
     */
    _onBtnYesClick = (e) => {
        this._invokeEventHandler(
            "onOptionClick",
            {
                source : this,
                optionName : "yes",
                mouseEvent : e
            }
        );
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    _onBtnNoClick = (e) => {
        this._invokeEventHandler(
            "onOptionClick",
            {
                source : this,
                optionName : "no",
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

export default YesNoDialog;

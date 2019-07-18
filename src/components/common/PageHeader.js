const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./PageHeader.module.scss");
const Button = require("./Button").default;
const appUtils = require("../../lib/app-utils");

const cx = classNames.bind(styles);

class PageHeader extends React.Component {
    render() {
        const {isSignedIn, postId} = this.props;
        
        return (
            <header className={cx("page-header")}>
                <div className={cx("content")}>
                    <div className={cx("logo")}>miniproj-blog</div>
                    <div className={cx("buttons")}>
                        {
                            (postId && isSignedIn)
                            && (
                                <React.Fragment>
                                    <Button
                                        to={appUtils.getEditorPath(postId)}
                                        theme="outline">Modify</Button>
                                    <Button
                                        onClick={this._onRemovePostButtonClick}
                                        theme="outline">Remove</Button>
                                </React.Fragment>
                            )
                        }
                        {
                            isSignedIn
                            && <Button
                                onClick={this._onNewPostButtonClick}
                                theme="outline">New Post</Button>
                        }
                    </div>
                </div>
            </header>
        );
    }

    /**
     * 
     * @private
     */
    _onModifyPostButtonClick = (e) => {

    }

    /**
     * 
     * @private
     */
    _onRemovePostButtonClick = (e) => {
        this._invokeEventHandler(
            "onRemovePostButtonClick",
            {
                source : this,
                mouseEvent : e
            }
        );
    }

    /**
     * 
     * @private
     */
    _onNewPostButtonClick = (e) => {
        this._invokeEventHandler(
            "onNewPostButtonClick",
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

export default PageHeader;

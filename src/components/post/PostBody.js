const React = require("react");
const classNames = require("classnames/bind");
const MarkdownRenderer = require("../common/MarkdownRenderer").default;
const styles = require("./PostBody.module.scss");

const cx = classNames.bind(styles);

class PostBody extends React.Component {
    componentDidMount() {
        this._invokeEventHandler("onReactComponentMounted", {source : this});
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.post.content !== this.props.post.content) {
            this._invokeEventHandler("onReactComponentMounted", {source : this});
        }
    }

    render() {
        const {post} = this.props;
        
        return (
            <div className={cx("post-body")}>
                <div className={cx("paper")}>
                    <MarkdownRenderer markdown={post.content} />
                </div>
            </div>
        );
    }
    
    _invokeEventHandler = (eventName, args) => {
        
    }
}

export default PostBody;

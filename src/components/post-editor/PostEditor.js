const React = require("react");
const Template = require("./Template").default;
const Header = require("./Header").default;
const Editor = require("./Editor").default;
const Preview = require("./Preview").default;

class PostEditor extends React.Component {
    goToPreviousPage() {
        if(this.props.history) {
            this.props.history.goBack();
        }
    }

    goToPostPage(postId) {
        if(this.props.history) {
            this.props.history.push(`/post/${postId}`);
        }
    }

    componentDidMount() {
        this._invokeEventHandler(
            "onReactComponentMounted",
            {
                source : this
            }
        );
    }
    
    render() {
        const {post} = this.props;

        return (
            <Template
                header={
                    <Header
                        postId={post.postId}
                        onCancelButtonClick={this._onCancelButtonClick}
                        onSubmitButtonClick={this._onSubmitButtonClick} />
                } 
                left={
                    <Editor
                        post={post}
                        onPropertyChanged={this._onPropertyChanged} />
                }
                right={
                    <Preview
                        post={post} />
                } />
        );
    }

    componentWillUnmount() {
        this._invokeEventHandler(
            "onReactComponentUnmounting",
            {
                source : this
            }
        );
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    _onCancelButtonClick = (e) => {
        this._invokeEventHandler(
            "onEditCancelRequested",
            {
                source : this,
                mouseEvent : e
            }
        );
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    _onSubmitButtonClick = (e) => {
        const args = {
            source : this,
            mouseEvent : e,
            post : this.props.post
        };
        args.post.publishedDate = new Date().toString();
        
        this._invokeEventHandler(
            "onEditSubmitRequested",
            args
        );
    }

    /**
     * 
     * @param {object} e 
     */
    _onPropertyChanged = (e) => {
        this._invokeEventHandler(
            "onPropertyChanged",
            {
                source : this,
                name : e.name,
                value : e.value
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

export default PostEditor;

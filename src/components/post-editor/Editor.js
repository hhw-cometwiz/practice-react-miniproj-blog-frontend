const {isBrowser} = require("browser-or-node");
const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./Editor.module.scss");

const cx = classNames.bind(styles);

let CodeMirror = null;
if(isBrowser) {
    CodeMirror = require("codemirror");
    require("codemirror/mode/markdown/markdown");
    require("codemirror/mode/javascript/javascript");
    require("codemirror/mode/jsx/jsx");
    require("codemirror/mode/css/css");
    require("codemirror/mode/shell/shell");

    require("codemirror/lib/codemirror.css");
    require("codemirror/theme/monokai.css");
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this._editor = null;
    }

    componentDidMount() {
        this._initializeCodeMirror();
    }
    
    componentDidUpdate(prevProps, prevState) {
        const oldPost = prevProps.post;
        const newPost = this.props.post;

        const content = {
            oldValue : (oldPost ? oldPost.content : ""),
            newValue : (newPost ? newPost.content : "")
        }
        if(content.oldValue !== content.newValue) {
            this._updateCodeMirror(content.newValue);
        }
    }

    render() {
        const {
            post = {
                title : "",
                tags : []
            }
        } = this.props;
        
        return (
            <div className={cx("editor")}>
                <input
                    name="title"
                    type="text"
                    onChange={this._onInputChange}
                    className={cx("title")}
                    defaultValue={(post ? post.title : "")}
                    placeholder={(!post ? "Input the title." : null)} />
                <div ref={(r) => this._editor = r} className={cx("code")}></div>
                <div className={cx("tags")}>
                    <div className={cx("label")}>Tags</div>
                    <input
                        name="tags"
                        type="text"
                        onChange={this._onInputChange}
                        defaultValue={(post ? post.tags.join(",") : "")}
                        placeholder={(!post ? "Input some tags. (separated by comma)" : null)} />
                </div>
            </div>
        );
    }

    /**
     * 
     * @private
     * @param {Event} e 
     */
    _onInputChange = (e) => {
        this._invokePropertyChanged(
            {
                source : this,
                name : e.target.name,
                value : e.target.value
            }
        );
    }

    /**
     * 
     * @private
     * @param {CodeMirror} codeMirror
     */
    _onCodeMirrorChange = (codeMirror) => {
        this._cursor = codeMirror.getCursor();
        
        this._invokePropertyChanged(
            {
                source : this,
                name : "content",
                value : codeMirror.getValue()
            }
        );
    }

    /**
     * 
     * @private
     */
    _invokePropertyChanged(e) {
        const {onPropertyChanged} = this.props;
        if("function" === typeof onPropertyChanged) {
            onPropertyChanged(e);
        }
    }
    
    /**
     * 
     * @private
     */
    _initializeCodeMirror() {
        this._codeMirror = CodeMirror && CodeMirror(
            this._editor,
            {
                mode : "markdown",
                theme : "monokai",
                lineNumbers : true,
                lineWrapping : false
            }
        );
        if(this._codeMirror) {
            this._codeMirror.on("change", this._onCodeMirrorChange);
        }

        this._updateCodeMirror("");
    }

    /**
     * 
     * @private
     * @param {string} content 
     */
    _updateCodeMirror(content) {
        if(this._codeMirror) {
            this._codeMirror.setValue(content);
            
            if(this._cursor) {
                this._codeMirror.setCursor(this._cursor);
            }
        }
    }
    
    /** @private @type {HTMLDivElement} */ _editor = null;
    
    /** @private @type {CodeMirror.Editor} */ _codeMirror = null;
}

export default Editor;

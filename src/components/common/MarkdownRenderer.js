const {isBrowser} = require("browser-or-node");
const React = require("react");
const marked = require("marked");
const classNames = require("classnames/bind");
const styles = require("./MarkdownRenderer.module.scss");

let Prism = null;
if(isBrowser) {
    Prism = require("prismjs");
    require("prismjs/themes/prism-okaidia.css");
    require("prismjs/components/prism-bash.min.js");
    require("prismjs/components/prism-javascript.min.js");
    require("prismjs/components/prism-jsx.min.js");
    require("prismjs/components/prism-css.min.js");
}

class MarkdownRenderer extends React.Component {
    constructor(props) {
        super(props);
    
        this._cx = classNames.bind(styles);

        this.state = {
            html : MarkdownRenderer._renderMarkdown(this.props.markdown)
        };
    }

    componentDidMount() {
        this._highlightMarkdown();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.markdown !== this.props.markdown) {
            this.setState(
                {
                    html : MarkdownRenderer._renderMarkdown(this.props.markdown)
                }
            );
        }

        if(prevState.html !== this.state.html) {
            this._highlightMarkdown();
        }
    }

    render() {
        return (
            //dangerouslySetInnerHTML is react's replacement of innerHTML property.
            <div
                ref={(r) => this._root = r}
                className={this._cx("markdown-renderer")}
                dangerouslySetInnerHTML={{__html : this.state.html}}></div>
        );
    }

    /**
     * 
     * @memberof {MarkdownRenderer}
     * @private
     * @param {string} markdown 
     */
    static _renderMarkdown(markdown) {
        return marked(
            markdown,
            {
                breaks : true
                //sanitize : true
            }
        );
    }

    /**
     * 
     * @private
     */
    _highlightMarkdown() {
        if(this._root) {
            Prism && Prism.highlightAllUnder(this._root);
        }
    }
}

export default MarkdownRenderer;

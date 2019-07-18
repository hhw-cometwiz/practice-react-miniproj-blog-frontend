const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./Preview.module.scss");
const MarkdownRenderer = require("../../components/common/MarkdownRenderer").default;

const cx = classNames.bind(styles);

class Preview extends React.Component {
    render() {
        const {
            post = {
                title : "",
                content : ""
            }
        } = this.props;
        const {title, content} = post;
        
        return (
            <div className={cx("preview")}>
                <h1 className={cx("title")}>{title}</h1>
                <div><MarkdownRenderer markdown={content} /></div>
            </div>
        );
    }
}

export default Preview;

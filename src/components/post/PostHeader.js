const React = require("react");
const styles = require("./PostHeader.module.scss");
const classNames = require("classnames/bind");

const cx = classNames.bind(styles);

class PostHeader extends React.Component {
    componentDidMount() {
        const handler = this.props.onReactComponentMounted;
        if("function" == typeof handler) {
            handler({source : this});
        }
    }
    
    render() {
        const {
            post,
            pageListPathGenerator = () => "#",
            pageCount, contentLength
        } = this.props;
        
        return (
            <div className={cx("post-header")}>
                <div className={cx("info")}>
                    <h1>{post.title}</h1>
                    <div className={cx("tags")}>{
                        Array.from(post.tags).map((tag, index) => {
                            return (<a key={index} href={pageListPathGenerator(1, pageCount, contentLength, tag)}>#{tag}</a>);
                        })
                    }</div>
                    <div className={cx("date")}>{post.publishedDate}</div>
                </div>
            </div>
        );
    }
}

export default PostHeader;

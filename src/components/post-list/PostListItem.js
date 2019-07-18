const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./PostListItem.module.scss");
const removeMarkdown = require("remove-markdown");

const cx = classNames.bind(styles);

class PostListItem extends React.Component {
    render() {
        const {
            post,
            pagePathGenerator = () => "#",
            pageListPathGenerator = () => "#",
            page, pageCount, contentLength
        } = this.props;
        
        return (
            <li className={cx("post-list-item")}>
                <h2><a href={pagePathGenerator(post.postId, page, pageCount, contentLength, post.tags)}>{post.title}</a></h2>
                <h3 className={cx("date")}>{post.publishedDate}</h3>
                <div className={cx("content")}>{removeMarkdown(post.content)}</div>
                <div className={cx("tags")}>{
                    post.tags && Array.from(post.tags).map(
                        (tag, index) => (
                            <a key={index} href={pageListPathGenerator(1, pageCount, contentLength, tag)}>&#x23;{tag}</a>
                        )
                    )
                }</div>
            </li>
        );
    }
}

export default PostListItem;

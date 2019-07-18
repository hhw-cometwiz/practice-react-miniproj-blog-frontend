const React = require("react");
const classNames = require("classnames/bind");
const PostListItem = require("./PostListItem").default;
const styles = require("./PostList.module.scss");

const cx = classNames.bind(styles);

class PostList extends React.Component {
    render() {
        const {posts} = this.props;
        
        return (
            <ul className={cx("post-list")}>{
                posts.map(
                    (post, index) => (
                        <PostListItem key={index} post={post} {...this.props} />
                    )
                )
            }</ul>
        );
    }
}

export default PostList;

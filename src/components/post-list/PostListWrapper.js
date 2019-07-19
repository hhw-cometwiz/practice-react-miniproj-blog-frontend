const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./PostListWrapper.module.scss");
const PostList = require("./PostList").default;
const Paginator = require("./Paginator").default;

const cx = classNames.bind(styles);

class PostListWrapper extends React.Component {
    componentDidMount() {
        const {
            page = 1, pageCount = 0, contentLength = 0, tags = []
        } = this.props;
        
        this._invokeEventHandler(
            "onShouldPostListBeFetched",
            {
                source : this,
                page : page,
                pageCount : pageCount,
                contentLength : contentLength,
                tags : tags
            }
        );
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(
            prevProps.page !== this.props.page
        ) {
            this._invokeEventHandler(
                "onShouldPostListBeFetched",
                {
                    source : this,
                    page : this.props.page,
                    pageCount : this.props.pageCount,
                    contentLength : this.props.contentLength,
                    tags : this.props.tags
                }
            );
            
            if(document) {
                document.documentElement.scrollTop = 0;
            }
        }
    }
    
    render() {
        return (
            <div className={cx("post-list-wrapper")}>
                <PostList {...this.props} />
                <Paginator {...this.props} />
            </div>
        );
    }

    _invokeEventHandler = (handlerName, e) => {
        const handler = this.props[handlerName];
        if("function" === typeof handler) {
            handler(e);
        }
    }
}

export default PostListWrapper;

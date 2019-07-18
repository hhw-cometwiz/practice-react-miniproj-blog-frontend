const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./PageTemplate.module.scss");
const PageHeader = require("./PageHeader").default;
const PageFooter = require("./PageFooter").default;

const cx = classNames.bind(styles);

class PageTemplate extends React.Component {
    render() {
        const {
            isSignedIn,
            history,
            page, pageCount, contentLength, tags,
            postId, children,
            onModifyPostButtonClick, onRemovePostButtonClick, onNewPostButtonClick,
            onSignInButtonClick
        } = this.props;

        return (
            <div ref={(r) => this._root = r} className={cx("page-template")}>
                <PageHeader
                    history={history}
                    isSignedIn={isSignedIn}
                    page={page}
                    pageCount={pageCount}
                    contentLength={contentLength}
                    tags={tags}
                    postId={postId}
                    onModifyPostButtonClick={onModifyPostButtonClick}
                    onRemovePostButtonClick={onRemovePostButtonClick}
                    onNewPostButtonClick={onNewPostButtonClick} />
                <main>{children}</main>
                <PageFooter
                    isSignedIn={isSignedIn}
                    onSignInButtonClick={onSignInButtonClick}/>
            </div>
        );
    }
}

export default PageTemplate;

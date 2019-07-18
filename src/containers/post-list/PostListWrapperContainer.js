const React = require("react");
const ReactRedux = require("react-redux");
const ReactRouter = require("react-router");
const PageTemplate = require("../../components/common/PageTemplate").default;
const PostListWrapper = require("../../components/post-list/PostListWrapper").default;
const AuthStoreModule = require("../../store/modules/auth");
const ModalStoreModule = require("../../store/modules/modal");
const PostListStoreModule = require("../../store/modules/post-list");
const PostEditorStoreModule = require("../../store/modules/post-editor");
const appUtils = require("../../lib/app-utils");

class PostListWrapperContainer extends React.Component {
    componentDidMount() {
        this._invokeEventHandler(
            "onPostListWrapperContainerMounted",
            {
                source : this
            }
        );
    }

    render() {
        const {
            location,
            isSignedIn,
            history,
            onSignInButtonClick,
            onNewPostButtonClick
        } = this.props;
        const {
            page = 1, pageCount = 10, contentLength = 200,
            tags = ""
        } = appUtils.parseUrlQueryString(location.search);
        
        return (
            <PageTemplate
                isSignedIn={isSignedIn}
                history={history}
                onNewPostButtonClick={onNewPostButtonClick}
                onSignInButtonClick={onSignInButtonClick}>
                <PostListWrapper
                    isSignedIn={isSignedIn}
                    page={page}
                    pageCount={pageCount}
                    contentLength={contentLength}
                    tags={Array.from(new Set(tags.split(",").map((tag) => tag.trim())))}
                    pageListPathGenerator={appUtils.getPageListPath}
                    pagePathGenerator={appUtils.getPagePath}
                    {...this.props} />
            </PageTemplate>
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

const mapStateToProps = (state) => {
    return ({
        ...state.PostList.toJS(),
        ...state.Auth.toJS()
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        onPostListWrapperContainerMounted : (e) => {
            return dispatch(AuthStoreModule.isSignedIn());
        },
        onSignInButtonClick : (e) => {
            let result = null;
            
            if(!e.source.props.isSignedIn) {
                result = dispatch(ModalStoreModule.setVisible(
                    {
                        name : "SignInDialog",
                        visible : true
                    }
                ));
            }
            else {
                result = dispatch(AuthStoreModule.signOut());
            }
            
            return result;
        },
        onShouldPostListBeFetched : (e) => {
            return dispatch(
                PostListStoreModule.get(e.page, e.pageCount, e.contentLength, e.tags)
            );
        },
        onNewPostButtonClick : (e) => {
            dispatch(PostEditorStoreModule.initialize());
            e.source.props.history.push(appUtils.getEditorPath());
        }
    });
};

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactRouter.withRouter(PostListWrapperContainer));

const React = require("react");
const ReactRouter = require("react-router");
const ReactRedux = require("react-redux");
const PageTemplate = require("../../components/common/PageTemplate").default;
const PostHeader = require("../../components/post/PostHeader").default;
const PostBody = require("../../components/post/PostBody").default;
const PostRemovalDialogContainer = require("../../containers/common/modal/PostRemovalDialogContainer").default;
const AuthStoreModule = require("../../store/modules/auth");
const PostStoreModule = require("../../store/modules/post");
const PostEditorStoreModule = require("../../store/modules/post-editor");
const ModalStoreModule = require("../../store/modules/modal");
const appUtils = require("../../lib/app-utils");

class PostContainer extends React.Component {
    componentDidMount() {
        this._invokeEventHandler(
            "onPostContainerMounted",
            {
                source : this
            }
        );
    }
    
    render() {
        const {
            location,
            history,
            isSignedIn,
            postId, post,
            onReactComponentMounted,
            onRemovePostButtonClick,
            onNewPostButtonClick,
            isDialogVisible
        } = this.props;
        
        const pageListQueryParams = appUtils.parsePageListQueryString(location.search);
        
        return (
            <PageTemplate
                isSignedIn={isSignedIn}
                postId={postId}
                history={history}
                onNewPostButtonClick={onNewPostButtonClick}
                onRemovePostButtonClick={onRemovePostButtonClick}>
                <PostHeader
                    isSignedIn={isSignedIn}
                    postId={postId}
                    post={post}
                    onReactComponentMounted={onReactComponentMounted}
                    {...pageListQueryParams}
                    pageListPathGenerator={appUtils.getPageListPath} />
                <PostBody
                    isSignedIn={isSignedIn}
                    postId={postId}
                    post={post}
                    onReactComponentMounted={onReactComponentMounted} />
                <PostRemovalDialogContainer
                    {...pageListQueryParams}
                    postId={postId}
                    post={post}
                    isVisible={isDialogVisible} />
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
        post : state.Post.toJS().post,
        isDialogVisible : state.Modal.getIn(["PostRemovalDialog", "isVisible"], false),
        ...state.Auth.toJS()
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        onPostContainerMounted : (e) => {
            return dispatch(AuthStoreModule.isSignedIn());
        },
        onReactComponentMounted : (e) => {
            return dispatch(PostStoreModule.read(e.source.props.postId));
        },
        onRemovePostButtonClick : (e) => {
            return dispatch(ModalStoreModule.setVisible({
                name : "PostRemovalDialog",
                visible : true
            }));
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
)(ReactRouter.withRouter(PostContainer));

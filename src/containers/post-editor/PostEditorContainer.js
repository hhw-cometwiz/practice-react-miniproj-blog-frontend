const React = require("react");
const ReactRedux = require("react-redux");
const ReactRouter = require("react-router");
const PostEditor = require("../../components/post-editor/PostEditor").default;
const PostEditorStoreModule = require("../../store/modules/post-editor");

function PostEditorContainer(props) {
    const {
        history,
        postId, post,
        onReactComponentMounted, onReactComponentUnmounting,
        onEditCancelRequested, onEditSubmitRequested, onPropertyChanged
    } = props;

    return (
        <PostEditor
            postId={postId}
            post={post}
            history={history}
            onReactComponentMounted={onReactComponentMounted}
            onReactComponentUnmounting={onReactComponentUnmounting}
            onEditCancelRequested={onEditCancelRequested}
            onEditSubmitRequested={onEditSubmitRequested}
            onPropertyChanged={onPropertyChanged} />
    );
}

const mapStateToProps = (state) => {
    //They came from Redux.combineReducers function.
    return ({
        post : state.PostEditor.toJS()
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        onReactComponentMounted : (e) => {
            let promise = null;
            if(e.source.props.postId) {
                promise = dispatch(PostEditorStoreModule.read(e.source.props.postId));
            }
            
            return promise;
        },
        onReactComponentUnmounting : (e) => {
            dispatch(PostEditorStoreModule.initialize());
        },
        onEditCancelRequested : (e) => {
            e.source.goToPreviousPage();
        },
        onEditSubmitRequested : (e) => {
            let promise = null;
            
            if(e.post.postId) {
                promise = dispatch(PostEditorStoreModule.update(e.post))
                    .then((res) => {
                        e.source.goToPostPage(res.data.postId);
                    })
                    .catch((error) => {
                        alert("error!");
                    })
                ;
            }
            else {
                promise = dispatch(PostEditorStoreModule.write(e.post))
                    .then((res) => {
                        e.source.goToPostPage(res.data._id);
                    })
                    .catch((error) => {
                        alert("error!");
                    })
                ;
            }

            return promise;
        },
        onPropertyChanged : (e) => {
            return dispatch(PostEditorStoreModule.setProperty(e));
        }
    });
};

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactRouter.withRouter(PostEditorContainer));

const React = require("react");
const ReactRedux = require("react-redux");
const ReactRouter = require("react-router");
const YesNoDialog = require("../../../components/common/modal/YesNoDialog").default;
const PostEditorStoreModule = require("../../../store/modules/post-editor");
const PostListStoreModule = require("../../../store/modules/post-list");
const ModalStoreModule = require("../../../store/modules/modal");
const appUtils = require("../../../lib/app-utils");

const modalName = "PostRemovalDialog";

function PostRemovalDialogContainer(props) {
    return (
        <YesNoDialog 
            title = "Post removal"
            message = "Are you sure to remove this post?"
            {...props} />
    );
}

function mapStateToProps(state) {
    return ({
        isVisible : state.Modal.getIn([modalName, "isVisible"], false),
        post : state.PostEditor.toJS()
    });
};

function mapDispatchToProps(dispatch) {
    return ({
        onOptionClick : (e) => {
            let result = null;

            switch(e.optionName) {
            case "yes":
            {
                const {
                    postId,
                    page, pageCount, contentLength, tags
                } = e.source.props;
                
                if(postId) {
                    result = dispatch(PostEditorStoreModule.remove(postId))
                        .then((res) => {
                            dispatch(PostListStoreModule.get(
                                page, pageCount, contentLength, tags
                            ));
                        })
                        .then((res) => {
                            e.source.props.history.push(appUtils.getPageListPath(1, pageCount, contentLength, tags));
                        })
                    ;
                }
            }
            break;
            case "no":
                result = dispatch(ModalStoreModule.setVisible({
                    name : modalName,
                    visible : false
                }));
            break;
            default:
                
            }

            return result;
        }
    });
}

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactRouter.withRouter(PostRemovalDialogContainer));

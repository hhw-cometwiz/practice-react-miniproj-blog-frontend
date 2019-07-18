const React = require("react");
const PostEditorContainer = require("../containers/post-editor/PostEditorContainer").default;

class PostEditor extends React.Component {
    render() {
        const {postId} = this.props.match.params;
        
        return (
            <PostEditorContainer
                postId={postId} />
        );
    }
}

export default PostEditor;

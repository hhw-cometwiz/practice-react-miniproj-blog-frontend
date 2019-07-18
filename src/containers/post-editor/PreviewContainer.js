const React = require("react");
const ReactRedux = require("react-redux");
const Preview = require("../../components/post-editor/Preview").default;

function PreviewContainer(props) {
    const {post} = props;

    return (
        <Preview
            title={post.title} 
            content={post.content} />
    );
}

const mapStateToProps = (state) => {
    //They came from Redux.combineReducers function.
    return ({
        post : state.PostEditor.toJS()
    });
};

export default ReactRedux.connect(
    mapStateToProps
)(PreviewContainer);

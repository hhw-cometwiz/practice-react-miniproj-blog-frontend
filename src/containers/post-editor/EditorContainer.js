import React from "react";
import Editor from "../../components/post-editor/Editor";
import * as ReactRedux from "react-redux";
import * as PostEditor from "../../store/modules/post-editor";

function EditorContainer(props) {
    const {post, onPropertyChanged} = props;
    
    return (
        <Editor
            title={post.title}
            content={post.tcontent}
            tags={post.tags}
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
        onPropertyChanged : (e) => {
            return dispatch(PostEditor.setProperty(e));
        }
    });
};

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorContainer);

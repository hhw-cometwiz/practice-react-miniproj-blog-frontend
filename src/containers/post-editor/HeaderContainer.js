const React = require("react");
const ReactRedux = require("react-redux");
const ReactRouterDom = require("react-router-dom");
const Header = require("../../components/post-editor/Header").default;
const PostEditor = require("../../store/modules/post-editor");

function HeaderContainer(props) {
    //history is propagated by ReactRouterDom.withRouter function.
    const {
        post,
        history,
        onReactComponentMounted, onEditCancelRequested, onEditSubmitRequested
    } = props;
    
    return (
        <Header
            post={post}
            history={history}
            onReactComponentMounted={onReactComponentMounted}
            onEditCancelRequested={onEditCancelRequested}
            onEditSubmitRequested={onEditSubmitRequested} />
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
            console.log("onReactComponentMounted");
            //Will this work...?
            PostEditor.initialize();
        },
        onEditCancelRequested : (e) => {
            e.source.goToPreviousPage();
        },
        onEditSubmitRequested : (e) => {
            e.post.publishedDate = new Date().toString();
            
            const promise = dispatch(PostEditor.write(e.post))
                .then((res) => {
                    e.source.goToPreviousPage();
                })
                .catch((error) => {
                    alert("error!");
                })
            ;

            return promise;
        }
    });
};

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactRouterDom.withRouter(HeaderContainer));

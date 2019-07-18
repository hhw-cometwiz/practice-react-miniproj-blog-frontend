const React = require("react");
const ReactRedux = require("react-redux");
const SignInDialog = require("../../../components/common/modal/SignInDialog").default;
const ModalStoreModule = require("../../../store/modules/modal");
const AuthStoreModule = require("../../../store/modules/auth");

const modalName = "SignInDialog";

function SignInDialogContainer(props) {
    return (
        <SignInDialog
            {...props} />
    );
}

const mapStateToProps = (state) => {
    return ({
        isVisible : state.Modal.getIn([modalName, "isVisible"], false),
        ...state.Auth.toJS()
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        onCancelButtonClick : (e) => {
            dispatch(AuthStoreModule.initialize());
            
            return dispatch(ModalStoreModule.setVisible({
                name : modalName,
                visible : false
            }));
        },
        onSignInButtonClick : (e) => {
            const {isSignedIn} = e.source.props;

            return dispatch((isSignedIn ? AuthStoreModule.signOut() : AuthStoreModule.signIn(e.plainPassword)))
                .then((res) => {
                    if(res.data.isSignedIn) {
                        dispatch(ModalStoreModule.setVisible({
                            name : modalName,
                            visible : false
                        }));
                    }
                })
                .catch((error) => {
                    
                })
            ;
        }
    });
};

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInDialogContainer);

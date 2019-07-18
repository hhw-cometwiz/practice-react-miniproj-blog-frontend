const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./Modal.module.scss");
const appUtils = require("../../lib/app-utils");

const cx = classNames.bind(styles);

class Modal extends React.Component {
    constructor(props) {
        super(props);
        
        const {backgroundColor = 128} = this.props;
        this.state = {
            backgroundColor : backgroundColor
        };

    }
    
    get backgroundColor() {
        return this.state.backgroundColor;
    }
    
    set backgroundColor(color) {
        if(Number.isSafeInteger(color)) {
            this.setState({backgroundColor : color});
        }
    }
    
    render() {
        const {
            isVisible  = false,
            baseZIndex = 1000, foregroundClassNames = "",
            children
        } = this.props;
        const {backgroundColor} = this.state;
        const backgroundSytle = {
            backgroundColor : appUtils.toCssRgbaColorText(backgroundColor),
            zIndex : baseZIndex + 1
        };
        const modalWrapperStyle = {
            zIndex : backgroundSytle.zIndex + 1
        };
    
        let result = null;
        if(isVisible) {
            result = (
                <div><div className={cx("background")} style={backgroundSytle}><div className={cx("modal-wrapper")} style={modalWrapperStyle}><div className={[cx("modal"), ...foregroundClassNames.split(" ")].join(" ")}>{children}</div></div></div></div>
            );
        }
        
        return result;
    }
}

export default Modal;

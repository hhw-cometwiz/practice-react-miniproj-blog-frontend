const React = require("react");
const ReactRouterDom = require("react-router-dom");
const classNames = require("classnames/bind");
const styles = require("./Button.module.scss");

//A wrapper of HTML div tag.
const Div = ({children, ...rest}) => (
    <div {...rest}>{children}</div>
);

class Button extends React.Component {
    render() {
        const cx = classNames.bind(styles);
        const {children, to, disabled, onClick, theme = "default"} = this.props;
        const ButtonTag = (!to || disabled ? Div : ReactRouterDom.Link);

        return (
            <ButtonTag
                className={cx("custom-button", theme, {disabled})}
                to={to}
                onClick={disabled ? () => null : onClick}>{children}</ButtonTag>
        );
    }
}

export default Button;

const React = require("react");
const classNames = require("classnames/bind");
const styles = require("./Template.module.scss");

const cx = classNames.bind(styles);

class Template extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftRatio : 0.5
        };
    }

    get leftRatio() {
        return this.state.leftRatio;
    }

    set leftRatio(ratio) {
        if(!Number.isFinite(ratio)) {
            throw new RangeError(`'${"leftRatio"}' must be a finite number.`);
        }
        else if(ratio < 0.0 || ratio > 1.0) {
            throw new RangeError(`'${"leftRatio"}' must be in range [${0.0},${1.0}].`);
        }

        this.setState({leftRatio : ratio});
    }

    render() {
        const {header, left, right} = this.props;
        const leftRatio = this.leftRatio;
        const leftStyle = {
            flex : leftRatio
        };
        const rightStyle = {
            flex : 1.0 - leftRatio
        };
        const separatorStyle = {
            left : `${leftRatio * 100}%`
        };

        return (
            <div className={cx("template")}>
                <div className={cx("header")}>{header}</div>
                <div className={cx("panes")}>
                    <div className={cx("pane", "editor")} style={leftStyle}>{left}</div>
                    <div className={cx("pane", "preview")} style={rightStyle}>{right}</div>
                    <div
                        className={cx("separator")}
                        style={separatorStyle}
                        onMouseDown={this.onSeparatorMouseDown}></div>
                </div>
            </div>
        );
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    onSeparatorMouseDown = (e) => {
        document.body.addEventListener("mousemove", this.onSeparatorMouseMove);
        window.addEventListener("mouseup", this.onSeparatorMouseUp);
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    onSeparatorMouseUp = (e) => {
        document.body.removeEventListener("mousemove", this.onSeparatorMouseMove);
        window.removeEventListener("mouseup", this.onSeparatorMouseUp);
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    onSeparatorMouseMove = (e) => {
        this.leftRatio = (window.innerWidth > 0 ? e.clientX / window.innerWidth : 0);
    }
}

export default Template;

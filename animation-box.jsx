import React from "react";
import 'animate.css';
import reactDom from "react-dom";

class AnimationBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleScroll.bind(this));
    }

    shouldComponentUpdate(_ , { visible }) {
        return visible;
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleScroll);
    }

    handleScroll() {
        if (this.state.visible) {
            return false;

        }
        this.setState({
            visible: this.checkVisible(),
        });
    }

    checkVisible() {
        const node = reactDom.findDOMNode(this);
        if (!node) {
            return false;
        }
        const WINDOW_HEIGHT = window.innerHeight;
        const EYE_SIGHT = WINDOW_HEIGHT - (WINDOW_HEIGHT * 0.1);
        const { top } = node.getBoundingClientRect();
        return EYE_SIGHT >= top;
    }

    mergeProps(childProps) {
        const { visible } = this.state;
        const { animation, duration, delay } = this.props;
        return {
            ...childProps,
            className: `${childProps.className || ''} ${visible ? 'animate__animated animate__' + animation : ''}`,
            style: {
                ...childProps.style,
                opacity: Number(visible),
                animationDuration: duration,
                animationDelay: delay,
            }
        }
    }

    render() {
        const { children } = this.props;
        return (
            <>
                {React.Children.map(children, (child) => React.cloneElement(child, this.mergeProps(children.props)))}
            </>
        )
    }
}

export default AnimationBox;
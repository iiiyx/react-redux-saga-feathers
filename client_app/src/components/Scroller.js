import React, { Component } from 'react';
import TweenFunctions from 'tween-functions';
import detectPassiveEvents from 'detect-passive-events';

const data = {
  startValue: 0,
  currentTime: 0, // store current time of animation
  startTime: null,
  rafId: null,
};

class Scroller extends Component {
  constructor(props) {
    super(props);
    this.data = { ...data };
    this.state = {
      show: false,
    };
  }

  static defaultProps = {
    duration: 250,
    easing: 'easeOutCubic',
    topPosition: 0,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.show !== this.state.show;
  }

  componentDidMount() {
    this.handleScroll(); // initialize state
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener(
      'wheel',
      this.stopScrolling,
      detectPassiveEvents.hasSupport ? { passive: true } : false,
    );
    window.addEventListener(
      'touchstart',
      this.stopScrolling,
      detectPassiveEvents.hasSupport ? { passive: true } : false,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('wheel', this.stopScrolling, false);
    window.removeEventListener('touchstart', this.stopScrolling, false);
  }

  handleScroll = () => {
    if (window.pageYOffset > this.props.showUnder) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  };

  handleClick = () => {
    this.stopScrolling();
    this.data.startValue = window.pageYOffset;
    this.data.currentTime = 0;
    this.data.startTime = null;
    this.data.rafId = window.requestAnimationFrame(this.scrollStep);
  };

  scrollStep = timestamp => {
    if (!this.data.startTime) {
      this.data.startTime = timestamp;
    }

    this.data.currentTime = timestamp - this.data.startTime;

    var position = TweenFunctions[this.props.easing](
      this.data.currentTime,
      this.data.startValue,
      this.props.topPosition,
      this.props.duration,
    );

    if (window.pageYOffset <= this.props.topPosition) {
      this.stopScrolling();
    } else {
      window.scrollTo(window.pageYOffset, position);
      this.data.rafId = window.requestAnimationFrame(this.scrollStep);
    }
  };

  stopScrolling = () => {
    window.cancelAnimationFrame(this.data.rafId);
  };

  render() {
    var propStyle = this.props.style;
    var element = React.createElement(
      'div',
      { style: propStyle, onClick: this.handleClick, className: 'scroller' },
      this.props.children,
    );

    var style = Object.assign({}, propStyle);
    style.opacity = this.state.show ? 1 : 0;
    style.visibility = this.state.show ? 'visible' : 'hidden';
    style.transitionProperty = 'opacity, visibility';

    return React.cloneElement(element, { style: style });
  }
}

export default Scroller;

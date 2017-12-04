import React, { Component } from 'react';
import TweenFunctions from 'tween-functions';
import detectPassiveEvents from 'detect-passive-events';

import '../styles/Scroller.css';

const initialData = {
  startValue: 0,
  currentTime: 0, // store current time of animation
  startTime: null,
  rafId: null,
};

class Scroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialData,
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
    const show = window.pageYOffset > this.props.showUnder;
    this.setState({ show: show });
  };

  handleClick = () => {
    this.stopScrolling();
    const data = {
      startValue: window.pageYOffset,
      currentTime: 0,
      startTime: null,
      rafId: window.requestAnimationFrame(this.scrollStep),
    };
    this.setState({
      ...data,
      show: this.state.show,
    });
  };

  scrollStep = timestamp => {
    const nextState = {};
    nextState.startTime = this.state.startTime || timestamp;
    nextState.currentTime = timestamp - nextState.startTime;

    const position = TweenFunctions[this.props.easing](
      nextState.currentTime,
      this.state.startValue,
      this.props.topPosition,
      this.props.duration,
    );

    if (window.pageYOffset <= this.props.topPosition) {
      this.stopScrolling();
    } else {
      window.scrollTo(window.pageYOffset, position);
      nextState.rafId = window.requestAnimationFrame(this.scrollStep);
    }
    const newState = {
      ...this.state,
      ...nextState,
    };
    this.setState(newState);
  };

  stopScrolling = () => {
    window.cancelAnimationFrame(this.state.rafId);
  };

  render() {
    const style = {
      ...this.props.style,
      opacity: this.state.show ? 1 : 0,
      visibility: this.state.show ? 'visible' : 'hidden',
      transitionProperty: 'opacity, visibility',
    };
    return (
      <div style={style} onClick={this.handleClick} className="scroller">
        {React.cloneElement(this.props.children)}
      </div>
    );
  }
}

export default Scroller;

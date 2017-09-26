import React, { Component } from 'react';

class Player extends Component {
  componentDidMount() {
    // initial iframe loading
    this.updateIframe();
  }

  componentDidUpdate() {
    // change iframe src on episode change
    this.updateIframe();
  }

  updateIframe() {
    // This hack is against the iframe src history issue:
    // when iframe's src is changed there is a new record appeared in browser history.
    // That's why we should remove iframe from DOM, change its src and add it again to DOM.
    const url = `http://smotri-tut.tk/v/?mw=${this.props.sid}`;
    const iframe = `<iframe title=${url} allowFullScreen frameBorder="0" height="100%" scrolling="no" src=${url} width="100%" id="player_iframe"></iframe>`;
    document.querySelector('#player > .embed').innerHTML = iframe;
  }

  render() {
    if (!this.props.sid) return null;
    return (
      <div className="ui active embed" id="player">
        <i className="video play icon" />
        <div className="embed" />
      </div>
    );
  }
}

export default Player;

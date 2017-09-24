import React, { Component } from 'react';

class Player extends Component {
  componentDidMount() {
    this.updateIframe();
  }

  componentDidUpdate() {
    this.updateIframe();
  }

  updateIframe() {
    const iframe = `<iframe title=${this
      .url} allowFullScreen frameBorder="0" height="100%" scrolling="no" src=${this
      .url} width="100%" id="player_iframe"></iframe>`;
    document.querySelectorAll('#player > .embed')[0].innerHTML = iframe;
  }

  render() {
    if (!this.props.sid) return null;
    this.url = `http://smotri-tut.tk/v/?mw=${this.props.sid}`;
    return (
      <div className="ui active embed" id="player">
        <i className="video play icon" />
        <div className="embed">
          <iframe title={this.url} />
        </div>
      </div>
    );
  }
}

export default Player;

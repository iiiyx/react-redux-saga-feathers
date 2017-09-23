import React from 'react';

const Player = props => {
  if (!props.sid) return null;
  const url = `http://smotri-tut.tk/v/?mw=${props.sid}`;
  return (
    <div className="ui active embed" id="player">
      <i className="video play icon" />
      <div className="embed">
        <iframe
          title={url}
          allowFullScreen
          frameBorder="0"
          height="100%"
          scrolling="no"
          src={url}
          width="100%"
        />
      </div>
    </div>
  );
};

export default Player;

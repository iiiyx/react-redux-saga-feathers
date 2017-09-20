import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/App.css';

class App extends Component {
  addTrack(e) {
    e.preventDefault();
    console.log('addTrack', this.trackInput.value);
    const nextIdx = this.props.tracks.length
      ? this.props.tracks[this.props.tracks.length - 1].idx + 1
      : 0;
    this.props.onAddTrack({
      idx: nextIdx,
      name: this.trackInput.value,
    });
    this.trackInput.value = '';
  }

  deleteTrack(e) {
    e.preventDefault();
    const idx = +e.target.getAttribute('data-key');
    console.log('delete track', idx);
    this.props.onDeleteTrack(idx);
  }

  changeFilter() {
    this.props.onFindTrack(this.searchInput.value);
  }

  clearSearch() {
    this.searchInput.value = '';
    this.changeFilter();
  }

  render() {
    console.log(this.props.tracks);
    return (
      <div>
        <form onSubmit={this.addTrack.bind(this)}>
          <input
            type="text"
            ref={input => {
              this.trackInput = input;
            }}
          />
          <input
            type="submit"
            onClick={this.addTrack.bind(this)}
            value="Add track"
          />
        </form>
        <div>
          <input
            type="text"
            // value={this.state.trackFilter}
            onChange={this.changeFilter.bind(this)}
            ref={input => {
              this.searchInput = input;
            }}
          />
          <button onClick={this.clearSearch.bind(this)}>X</button>
        </div>
        <ul>
          {this.props.tracks.map(track => (
            <li key={track.idx}>
              <span>{track.name}</span>
              <button
                className="App-button"
                data-key={track.idx}
                onClick={this.deleteTrack.bind(this)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    tracks: state.tracks.filter(track =>
      track.name.toLowerCase().startsWith(state.trackFilter.toLowerCase()),
    ),
    playlists: state.playlists,
  }),
  dispath => ({
    onAddTrack: trackName => {
      dispath({ type: 'ADD_TRACK', payload: trackName });
    },
    onDeleteTrack: idx => {
      dispath({ type: 'DELETE_TRACK', payload: idx });
    },
    onFindTrack: name => {
      dispath({ type: 'FIND_TRACK', payload: name });
    },
  }),
)(App);

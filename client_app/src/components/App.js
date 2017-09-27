import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { Icon, Divider, Image, Header, Container } from 'semantic-ui-react';

import * as actionCreators from '../actions';

import {
  getUrlDecodedSearchPath,
  getUrlEncodedSearchPath,
  getUrlDecodedMoviePath,
  getUrlEncodedMoviePath,
} from '../helpers/utils';

import ConnectedSwitch from './ConnectedSwitch';

import Scroller from './Scroller';
import NavBar from './NavBar';
import MovieList from './MovieList';
import SingleMovie from './SingleMovie';

import '../styles/App.css';

class App extends Component {
  toMain = e => {
    e.preventDefault();
    if (this.props.history.location.pathname !== '/') {
      this.props.history.push('/');
    }
    window.scrollTo(0, 0);
  };

  render() {
    const topNavClass = 'topNav';
    return (
      <Container>
        <Divider hidden />
        <a href="/" onClick={this.toMain}>
          <Header as="h1" textAlign="center">
            <Image shape="circular" src="/150.png" />{' '}
            <Header.Content className="alike">
              Смотри ТУТ!
              <Header.Subheader>Все новые сериалы и фильмы</Header.Subheader>
            </Header.Content>
          </Header>
        </a>
        <Divider hidden />
        <NavBar {...this.props} className={topNavClass} />
        <ConnectedSwitch>
          <Route exact path="/" render={() => <MovieList {...this.props} />} />
          <Route
            path={getUrlEncodedMoviePath()}
            render={({ match }) => (
              <SingleMovie {...{ ...this.props, match, topNavClass }} />
            )}
          />
          <Route
            path={getUrlDecodedMoviePath()}
            render={({ match }) => (
              <SingleMovie {...{ ...this.props, match, topNavClass }} />
            )}
          />
          <Route
            path={getUrlEncodedSearchPath()}
            render={({ match }) => <MovieList {...{ ...this.props, match }} />}
          />
          <Route
            path={getUrlDecodedSearchPath()}
            render={({ match }) => <MovieList {...{ ...this.props, match }} />}
          />
        </ConnectedSwitch>
        <Divider hidden />
        <Header
          as="h5"
          textAlign="center"
          content="Inspired by ReactJS | 2017"
        />
        <Divider hidden />
        <Scroller showUnder={160}>
          <Icon name="arrow up" size="big" />
        </Scroller>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(App);

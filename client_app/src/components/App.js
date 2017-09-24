import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { matchPath } from 'react-router';

import { Icon, Divider, Image, Header, Container } from 'semantic-ui-react';

import * as actionCreators from '../actions';

import {
  getQueryTypes,
  getUrlDecodedSearchPath,
  getUrlEncodedSearchPath,
  getUrlDecodedMoviePath,
  getUrlEncodedMoviePath,
} from '../helpers/Utils';

import Scroller from './Scroller';
import NavBar from './NavBar';
import MovieList from './MovieList';
import SingleMovie from './SingleMovie';

import '../styles/App.css';

function loadMovieList(props) {
  const search =
    props.match.params.text != null
      ? decodeURIComponent(props.match.params.text)
      : null;
  props.fetchMovies(
    search,
    0,
    getQueryTypes(props.location.search) || null,
    false,
  );
}

function pageIsMoviePage(props) {
  const matchObj = path => ({
    path: path,
    exact: false,
    strict: false,
  });
  return (
    matchPath(props.location.pathname, matchObj(getUrlEncodedMoviePath())) ||
    matchPath(props.location.pathname, matchObj(getUrlDecodedMoviePath()))
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.toMain = this.toMain.bind(this);
  }

  componentWillMount() {
    loadMovieList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      pageIsMoviePage(nextProps) ||
      pageIsMoviePage(this.props) ||
      // eslint-disable-next-line
      (getQueryTypes(nextProps.location.search) == getQueryTypes(this.props.location.search) &&
        // eslint-disable-next-line
        nextProps.match.params.text == this.props.match.params.text)
    )
      return;
    loadMovieList(nextProps);
  }

  toMain(e) {
    e.preventDefault();
    this.props.history.push('/');
    window.scrollTo(0, 0);
  }

  render() {
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
        <NavBar {...this.props} />
        <Switch>
          <Route exact path="/" render={() => <MovieList {...this.props} />} />
          <Route
            path={getUrlEncodedMoviePath()}
            render={({ match }) => (
              <SingleMovie {...{ ...this.props, match }} />
            )}
          />
          <Route
            path={getUrlDecodedMoviePath()}
            render={({ match }) => (
              <SingleMovie {...{ ...this.props, match }} />
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
        </Switch>
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

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

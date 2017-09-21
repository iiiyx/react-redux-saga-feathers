import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import * as actionCreators from '../actions';
import { getQueryTypes } from '../helpers/Utils';
import { Icon, Divider, Image, Header, Container } from 'semantic-ui-react';

import '../styles/App.css';

import Scroller from './Scroller';
import NavBar from './NavBar';
import MovieList from './MovieList';
import SingleMovie from './SingleMovie';

// const toMain = () => (window.location.href = '/');
const loadData = props => {
  const currPage = 0;
  const searchText =
    props.match.params.text != null
      ? decodeURIComponent(props.match.params.text)
      : null;
  props.fetchMovies(
    searchText,
    currPage,
    getQueryTypes(props.history.location.search),
    false,
  );
};

class App extends Component {
  toMain(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

  constructor(props) {
    super(props);
    this.toMain = this.toMain.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname !== this.props.location.pathname ||
      nextProps.location.search !== this.props.location.search
    ) {
      loadData(nextProps);
    }
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
        <ConnectedRouter history={this.props.history}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <MovieList {...this.props} />}
            />
            <Route
              path={
                '/%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD/:type/:name/:id'
              }
              render={() => <SingleMovie {...this.props} />}
            />
            <Route
              path={'/смотреть-онлайн/:type/:name/:id'}
              render={() => <SingleMovie {...this.props} />}
            />
            <Route
              path="/%D0%B8%D1%81%D0%BA%D0%B0%D1%82%D1%8C/:text"
              render={() => <MovieList {...this.props} />}
            />
            <Route
              path="/искать/:text"
              render={() => <MovieList {...this.props} />}
            />
          </Switch>
        </ConnectedRouter>
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

function mapStateToProps({ series, movies, currMovie }) {
  return {
    series,
    movies,
    currMovie,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

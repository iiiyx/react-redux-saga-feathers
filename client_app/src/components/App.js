import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Icon, Divider, Image, Header, Container } from 'semantic-ui-react';

import * as actionCreators from '../actions';

import Scroller from './Scroller';
import NavBar from './NavBar';

import '../styles/App.css';

function loadMovieList(props) {
  const search =
    props.params.text != null ? decodeURIComponent(props.params.text) : null;
  props.fetchMovies(search, 0, props.location.query.types || null, false);
}

class App extends Component {
  toMain(e) {
    e.preventDefault();
    browserHistory.push('/');
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.query.types !== this.props.location.query.types ||
      // nextProps.location.pathname !== this.props.location.pathname ||
      nextProps.params.text !== this.props.params.text
    )
      this.loadData(nextProps);
  }

  loadData(props) {
    loadMovieList(props);
    return;
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
        {React.cloneElement(this.props.children, this.props)}
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

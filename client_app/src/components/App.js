import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { MuiThemeProvider, Avatar, Divider, Card, CardHeader, CardTitle, FontIcon } from 'material-ui';

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
      <MuiThemeProvider>
        <div className="container">
          <Divider hidden />
          <a href="/" onClick={this.toMain}>
            <Card style={{ boxShadow: 'none' }}>
              <CardHeader
                className="alike flex-center-middle"
                title="Смотри ТУТ!"
                titleColor="#4183c4"
                titleStyle={{ fontSize: '28px' }}
                subtitle="Все новые сериалы и фильмы"
                subtitleStyle={{ fontSize: '16px', fontWeight: 'normal' }}
                avatar={<Avatar src="/150.png" size={70} backgroundColor="none" />}>
              </CardHeader>
            </Card>
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
          <Card style={{ boxShadow: 'none' }}>
            <CardTitle
              className="flex-center-middle"
              titleStyle={{ fontSize: '14px', fontWeight: 'bold' }}
              title="Inspired by ReactJS | 2017"
            />
          </Card>
          <Divider hidden />
          <Scroller showUnder={160}>
            <FontIcon className="material-icons" style={{ fontSize: '50px' }}>arrow_upward</FontIcon>
          </Scroller>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(App);

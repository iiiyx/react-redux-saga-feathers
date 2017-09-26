import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import {
  Divider,
  Message,
  Segment,
  Label,
  Loader,
  Dimmer,
  Item,
} from 'semantic-ui-react';

import {
  findElementPos,
  getUrlEncodedEpisodePath,
  getUrlDecodedEpisodePath,
  getUrlEncodedMoviePath,
  getUrlDecodedMoviePath,
} from '../helpers/utils';

import Series from './Series';
import Player from './Player';

class SingleMovie extends Component {
  componentDidMount() {
    const topNav = document.querySelector(`.${this.props.topNavClass}`);
    if (topNav) {
      const scrollTo = +topNav.offsetHeight + findElementPos(topNav);
      window.scrollTo(0, scrollTo);
    }
  }

  render() {
    const movie = this.props.movie;
    if (movie == null || (movie.sid == null && !movie.isFetching))
      return (
        <Message
          icon="frown"
          color="red"
          header="Увы, мы не нашли ни одного элемента для вашего запроса!"
          content="Попробуйте изменить запрос"
        />
      );
    if (movie != null && movie.isFetching)
      return (
        <div>
          <Segment>
            <Dimmer inverted active={movie.isFetching}>
              <Loader>Загрузка...</Loader>
            </Dimmer>
            <Item.Group>
              <Item>
                <Item.Image
                  src={
                    'https://st.kp.yandex.net/images/film_iphone/iphone360_' +
                    (movie.kpid != null && movie.kpid !== '' ? movie.kpid : 0) +
                    '.jpg'
                  }
                  size="medium"
                />
              </Item>
            </Item.Group>
          </Segment>
        </div>
      );
    return (
      <div>
        <Segment>
          <Dimmer inverted active={movie.isFetching}>
            <Loader>Загрузка...</Loader>
          </Dimmer>
          <Item.Group>
            <Item>
              <Item.Image
                src={
                  'https://st.kp.yandex.net/images/film_iphone/iphone360_' +
                  (movie.kpid != null && movie.kpid !== '' ? movie.kpid : 0) +
                  '.jpg'
                }
                size="medium"
              />
              <Item.Content>
                <Item.Header as="a">{movie.ru}</Item.Header>
                <Item.Meta>
                  <span className="cinema">{movie.en}</span>
                </Item.Meta>
                {movie.moon_tran && (
                  <Item.Description>
                    <Label>{movie.moon_tran.name}</Label>
                  </Item.Description>
                )}
                <Item.Extra>
                  {/*TODO: add kinopoisk ratings API*/}
                  {/*<div>{movie.descr}</div><div>Рейтинг: ...</div>*/}
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
          <Divider hidden />
          {movie.type.isSer ? (
            <Switch>
              <Route
                exact
                path={getUrlEncodedMoviePath()}
                render={({ match }) => <Series {...{ ...this.props, match }} />}
              />
              <Route
                exact
                path={getUrlDecodedMoviePath()}
                render={({ match }) => <Series {...{ ...this.props, match }} />}
              />
              <Route
                path={getUrlEncodedEpisodePath()}
                render={({ match }) => <Series {...{ ...this.props, match }} />}
              />
              <Route
                path={getUrlDecodedEpisodePath()}
                render={({ match }) => <Series {...{ ...this.props, match }} />}
              />
            </Switch>
          ) : (
            <Player sid={movie.sid} />
          )}
        </Segment>
        <Divider hidden />
      </div>
    );
  }
}

const findMovieInFetchedCurrentMovie = (state, ownProps) => {
  return (
    state.currMovie &&
    state.currMovie.sid === ownProps.match.params.id &&
    state.currMovie
  );
};

const findMovieInFetchedList = (state, ownProps) => {
  return (
    state.movies &&
    state.movies.data &&
    state.movies.data.length &&
    state.movies.data.find(movie => movie.sid === ownProps.match.params.id)
  );
};

const findMovieInAlreadyFetchedData = (state, ownProps) => {
  return (
    findMovieInFetchedCurrentMovie(state, ownProps) ||
    findMovieInFetchedList(state, ownProps)
  );
};
const mapStateToProps = (state, ownProps) => {
  const newMovie = findMovieInAlreadyFetchedData(state, ownProps);
  if (newMovie) {
    return {
      ...ownProps,
      movie: newMovie,
    };
  }
  if (!state.currMovie || !state.currMovie.isFetching)
    ownProps.fetchMovie(ownProps.match.params.id);
  return {
    ...ownProps,
    movie: { isFetching: true },
  };
};

export default connect(mapStateToProps)(SingleMovie);

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

import { findElementPos } from '../helpers/Utils';

import Series from './Series';
import Player from './Player';

class SingleMovie extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    const topNav = document.getElementsByClassName('topNav')[0];
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
                path="/%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD/:type/:name/:id"
                render={({ match }) => <Series {...{ ...this.props, match }} />}
              />
              <Route
                exact
                path="/смотреть-онлайн/:type/:name/:id"
                render={({ match }) => <Series {...{ ...this.props, match }} />}
              />
              <Route
                path="/%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD/:type/:name/:id/:season/:episode"
                render={({ match }) => <Series {...{ ...this.props, match }} />}
              />
              <Route
                path="/смотреть-онлайн/:type/:name/:id/:season/:episode"
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

const mapStateToProps = (state, ownProps) => {
  const newMovie =
    (state.currMovie &&
      state.currMovie.sid === ownProps.match.params.id &&
      state.currMovie) ||
    (state.movies &&
      state.movies.data &&
      state.movies.data.length &&
      state.movies.data.find(movie => movie.sid === ownProps.match.params.id));
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

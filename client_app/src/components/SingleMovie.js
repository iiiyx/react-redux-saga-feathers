import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  componentDidMount() {
    const topNav = document.getElementsByClassName('topNav')[0];
    if (topNav) {
      const scrollTo = +topNav.offsetHeight + findElementPos(topNav);
      window.scrollTo(0, scrollTo);
    }
  }

  getChildren(movie, props) {
    if (movie.type.isSer) {
      const seriesProps = { movie: movie, params: this.props.params };
      if (
        props.children &&
        props.children.props &&
        props.children.props.children
      ) {
        // when season and episode path is specified
        console.log('cloneElement');
        return React.cloneElement(props.children.props.children, {
          data: seriesProps,
        });
      } else {
        // when season and episode path is NOT specified
        return <Series data={seriesProps} />;
      }
    } else {
      // when "single episode" - odinary movie
      return <Player sid={movie.sid} />;
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
          {this.getChildren(movie, this.props)}
        </Segment>
        <Divider hidden />
      </div>
    );
  }
}

// function loadMovie(props) {
//   const newMovie =
//     (props.currMovie &&
//       props.currMovie.sid === props.params.id &&
//       props.currMovie) ||
//     (props.movies &&
//       props.movies.data &&
//       props.movies.data.length &&
//       props.movies.data.find(movie => movie.sid === props.params.id));
//   if (newMovie) {
//     return newMovie;
//   }
//   props.fetchMovie(props.params.id);
//   return { isFetching: true };
// }

const mapStateToProps = (state, ownProps) => {
  const newMovie =
    (state.currMovie &&
      state.currMovie.sid === ownProps.params.id &&
      state.currMovie) ||
    (state.movies &&
      state.movies.data &&
      state.movies.data.length &&
      state.movies.data.find(movie => movie.sid === ownProps.params.id));
  if (newMovie) {
    return {
      ...ownProps,
      movie: newMovie,
    };
  }
  if (!state.currMovie || state.currMovie.isFetching)
    ownProps.fetchMovie(ownProps.params.id);
  return {
    ...ownProps,
    movie: { isFetching: true },
  };
};

export default connect(mapStateToProps)(SingleMovie);

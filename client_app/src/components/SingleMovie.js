import React, { Component } from 'react';

import {
  Divider,
  Message,
  Segment,
  Label,
  Loader,
  Dimmer,
  Item,
} from 'semantic-ui-react';

import Series from './Series';
import Player from './Player';

function findPos(obj) {
  let curtop = 0;
  while (obj.offsetParent) {
    curtop += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return curtop;
}

class SingleMovie extends Component {
  componentDidMount() {
    const topNav = document.getElementsByClassName('topNav')[0];
    if (topNav) {
      const scrollTo = +topNav.offsetHeight + findPos(topNav);
      window.scrollTo(0, scrollTo);
    }
    // if (this.state.movie == null) {
    //   this.setState({ movie: { isFetching: true } });
    //   this.props.fetchMovie(this.props.match.params.id);
    // }
  }

  render() {
    const movie = this.props.currMovie;
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
            <Series movie={movie} />
          ) : (
            <Player sid={movie.sid} />
          )}
        </Segment>
        <Divider hidden />
      </div>
    );
  }
}

export default SingleMovie;

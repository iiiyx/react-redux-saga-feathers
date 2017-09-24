import React, { Component } from 'react';

import { Segment, Card, Message, Dimmer, Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

import MovieCard from './MovieCard';
import LoadSpinner from './LoadSpinner';

import AppConsts from '../helpers/Consts';
import { getQueryTypes } from '../helpers/Utils';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    if (this.props.movies && this.props.movies.isFetching) return;
    const currPage = this.props.movies.skip / AppConsts.limit + 1;
    const search =
      this.props.match.params.text != null
        ? decodeURIComponent(this.props.match.params.text)
        : null;
    this.props.fetchMovies(
      search,
      currPage,
      getQueryTypes(this.props.location.search) || null,
      true,
    );
  }

  render() {
    if (
      this.props.movies &&
      this.props.movies.data &&
      this.props.movies.data.length
    )
      return (
        <div>
          <Dimmer
            active={this.props.movies && this.props.movies.isFetching === true}
            page>
            <Loader>Загрузка...</Loader>
          </Dimmer>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={
              this.props.movies.total - this.props.movies.skip > AppConsts.limit
            }
            loader={<LoadSpinner />}>
            <Card.Group>
              {this.props.movies.data.map((movie, i) =>
                MovieCard(movie, i, this.props.history.push),
              )}
            </Card.Group>
          </InfiniteScroll>
        </div>
      );
    if (this.props.movies && !this.props.movies.isFetching)
      return (
        <Segment>
          <Message
            icon="frown"
            color="red"
            header="Увы, мы не нашли ни одного элемента для вашего запроса!"
            content="Попробуйте изменить запрос"
          />
        </Segment>
      );
    return <LoadSpinner />;
  }
}

export default MovieList;

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

  componentWillMount() {
    this.loadMovieList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadMovieList(nextProps);
  }

  loadMovieList(props) {
    const dataWasAlreadyFetched =
      this.lastData &&
      //eslint-disable-next-line
      getQueryTypes(props.location.search) == this.lastData.types &&
      //eslint-disable-next-line
      props.match.params.text == this.lastData.text;

    if (dataWasAlreadyFetched) return;

    const search =
      props.match.params.text != null
        ? decodeURIComponent(props.match.params.text)
        : null;

    const types = getQueryTypes(props.location.search) || null;
    const currentPage = 0;
    const isLoadMore = false;

    props.fetchMovies(search, currentPage, types, isLoadMore);

    this.lastData = {
      text: props.match.params.text,
      types,
    };
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

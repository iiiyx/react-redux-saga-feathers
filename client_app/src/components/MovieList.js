import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Segment, Card, Message, Dimmer, Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

import MovieCard from './MovieCard';
import LoadSpinner from './LoadSpinner';

import consts from '../helpers/consts';
import { getQueryTypes } from '../helpers/utils';

class MovieList extends Component {
  componentWillMount() {
    this.loadMovieList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadMovieList(nextProps);
  }

  loadMovieList(props) {
    const text =
      props.match.params.text != null
        ? decodeURIComponent(props.match.params.text)
        : null;

    const types = getQueryTypes(props.history.location.search) || null;
    const currentPage = 0;
    const isLoadMore = false;

    const dataWasAlreadyFetched =
      props.movies &&
      props.movies.request &&
      //eslint-disable-next-line
      types == props.movies.request.types &&
      //eslint-disable-next-line
      text == props.movies.request.text;

    if (dataWasAlreadyFetched) return;

    props.fetchMovies(text, currentPage, types, isLoadMore);
  }

  loadMore = () => {
    if (this.props.movies && this.props.movies.isFetching) return;
    const currPage = this.props.movies.skip / consts.limit + 1;
    const search =
      this.props.match.params.text != null
        ? decodeURIComponent(this.props.match.params.text)
        : null;
    this.props.fetchMovies(
      search,
      currPage,
      getQueryTypes(this.props.history.location.search) || null,
      true,
    );
  };

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
              this.props.movies.total - this.props.movies.skip > consts.limit
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

function mapStateToProps({ movies }, { match, history, fetchMovies }) {
  return {
    movies,
    fetchMovies,
    match,
    history,
  };
}

export default connect(mapStateToProps)(MovieList);

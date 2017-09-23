import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  buildSerieUri,
  seasonRegx,
  episodeRegx,
  findElementPos,
} from '../helpers/Utils';

import {
  Container,
  Divider,
  Header,
  Segment,
  Dimmer,
  Loader,
  Button,
} from 'semantic-ui-react';

import Player from './Player';

const findIndexOfSerie = props => {
  if (!props.params.season || !props.params.episode) return 0;
  const seasonUriMatch = props.params.season.match(seasonRegx);
  const episodeUriMatch = props.params.episode.match(episodeRegx);
  if (
    !seasonUriMatch ||
    seasonUriMatch.length < 2 ||
    !episodeUriMatch ||
    episodeUriMatch < 2
  )
    return 0;
  const i = props.movie.moonall_sers.findIndex(
    serie => serie.s === +seasonUriMatch[1] && serie.e === +episodeUriMatch[1],
  );
  return i === -1 ? 0 : i;
};

class Series extends Component {
  getOnClickFunction(serie) {
    return e => {
      // const player = document.getElementById('player');
      // if (player) {
      //   const scrollTo = +player.offsetHeight + findElementPos(player);
      //   window.scrollTo(0, scrollTo);
      // }
      browserHistory.push(buildSerieUri(this.props.params, serie));
    };
  }

  render() {
    if (
      this.props.movie &&
      this.props.movie.moonall_sers &&
      this.props.movie.moonall_sers.length
    ) {
      const current = findIndexOfSerie(this.props);
      return (
        <div>
          <Segment>
            <Header as="h5" content="Выберите серию: " />
            <Container textAlign="justified">
              {this.props.movie.moonall_sers.map((serie, i) => (
                <Button
                  onClick={this.getOnClickFunction(serie)}
                  className="margined"
                  primary={i === current}
                  key={i}>
                  {serie.s} - {serie.e}
                </Button>
              ))}
            </Container>
          </Segment>
          <Divider hidden />
          <Player sid={this.props.movie.moonall_sers[current].eid} />
        </div>
      );
    }
    return (
      <Segment>
        <Dimmer
          inverted
          active={
            this.props.movie &&
            this.props.movie.moonall_sers &&
            this.props.movie.moonall_sers.isFetching === true
          }>
          <Loader>Загрузка...</Loader>
        </Dimmer>
        <Button>...</Button>
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ ...ownProps.data });

export default connect(mapStateToProps)(Series);

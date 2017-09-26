import React from 'react';

import {
  buildSerieUri,
  seasonRegx,
  episodeRegx,
  // findElementPos,
} from '../helpers/utils';

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
// import Dummy from './Dummy';

const findIndexOfSerie = props => {
  if (!props.match.params.season || !props.match.params.episode) return 0;
  const seasonUriMatch = props.match.params.season.match(seasonRegx);
  const episodeUriMatch = props.match.params.episode.match(episodeRegx);
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

const Series = props => {
  if (
    props.movie &&
    props.movie.moonall_sers &&
    props.movie.moonall_sers.length
  ) {
    const current = findIndexOfSerie(props);
    return (
      <div>
        <Segment>
          <Header as="h5" content="Выберите серию: " />
          <Container textAlign="justified">
            {props.movie.moonall_sers.map((serie, i) => {
              const link = buildSerieUri(props.match.params, serie);
              return (
                <Button
                  href={link}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.history.push(link);
                  }}
                  className="margined"
                  primary={i === current}
                  key={i}>
                  {serie.s} - {serie.e}
                </Button>
              );
            })}
          </Container>
        </Segment>
        <Divider hidden />
        {/* <Dummy /> */}
        <Player sid={props.movie.moonall_sers[current].eid} />
      </div>
    );
  }
  return (
    <Segment>
      <Dimmer
        inverted
        active={
          props.movie &&
          props.movie.moonall_sers &&
          props.movie.moonall_sers.isFetching === true
        }>
        <Loader>Загрузка...</Loader>
      </Dimmer>
      <Button>...</Button>
    </Segment>
  );
};

export default Series;

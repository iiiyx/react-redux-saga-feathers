import React, { Component } from 'react';

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

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = { i: 0 };
  }

  render() {
    if (
      this.props.movie &&
      this.props.movie.moonall_sers &&
      this.props.movie.moonall_sers.length
    )
      return (
        <div>
          <Segment>
            <Header as="h5" content="Выберите серию: " />
            <Container textAlign="justified">
              {this.props.movie.moonall_sers.map((serie, i) => (
                <Button
                  onClick={e => this.setState({ i: i })}
                  className="margined"
                  primary={i === this.state.i}
                  key={i}>
                  {serie.s} - {serie.e}
                </Button>
              ))}
            </Container>
          </Segment>
          <Divider hidden />
          <Player sid={this.props.movie.moonall_sers[this.state.i].eid} />
        </div>
      );
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

export default Series;

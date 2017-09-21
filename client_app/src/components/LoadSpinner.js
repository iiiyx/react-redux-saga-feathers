import React from 'react';
import { Segment, Message, Icon } from 'semantic-ui-react';

const LoadSpinner = () => (
  <Segment>
    <Message icon info>
      <Icon name="spinner" loading />
      <Message.Content>
        <Message.Header>Идет загрузка...</Message.Header>
        Ожидайте, пожалуйста
      </Message.Content>
    </Message>
  </Segment>
);

export default LoadSpinner;

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import NavBar from '../components/NavBar';

describe('<NavBar />', () => {
  const initialState = {
    routing: {
      location: { "pathname": "/", "search": "", "hash": "" }
    }
  };
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(<NavBar store={store} location={initialState.routing.location} />);
  });

  it('renders self and ...', () => {
    console.log(container.debug());
  })
});
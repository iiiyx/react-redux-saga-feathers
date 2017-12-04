import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import App from '../components/App';

describe('<App />', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<App store={store} />);
  });

  it('renders self and ...', () => {
    console.log(container.debug());
  })
});
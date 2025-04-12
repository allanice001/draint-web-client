import { applyMiddleware, createStore } from 'redux';

import OnSwipeDownWrapper from './on-swipe-down-wrapper';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';

describe('OnSwipeDownWrapper', () => {
  const initialState = {};

  const store = createStore(
    (state = initialState) => state,
    applyMiddleware(thunk)
  );

  const testProperties = {
    action: jest.fn(),
    children: [],
  };

  const component = renderer.create(
    <Provider store={store}>
      <OnSwipeDownWrapper
        children={testProperties.children}
        action={testProperties.action}
      />
    </Provider>
  );

  it('renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});

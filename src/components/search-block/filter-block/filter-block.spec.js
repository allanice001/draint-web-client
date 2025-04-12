import { applyMiddleware, createStore } from 'redux';

import FilterBlock from './filter-block';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';

describe('FilterBlock', () => {
  const initialState = {
    filters: {
      artworksSearch: {
        hashtag: [],
        style: [],
        medium: [],
        surface: [],
        country: [],
        completed: [],
      },
    },
  };

  const testProperties = {
    initialize: jest.fn(),
    filters: [],
    handleSubmit: jest.fn(),
    initialValues: {},
    results: 0,
    onClose: jest.fn(),
    isOpen: false,
    query: '',
  };

  const store = createStore(
    (state = initialState) => state,
    applyMiddleware(thunk)
  );

  const component = renderer.create(
    <Provider store={store}>
      <FilterBlock
        filters={testProperties.filters}
        handleSubmit={testProperties.handleSubmit}
        initialize={testProperties.initialize}
        initialValues={testProperties.initialValues}
        isOpen={testProperties.isOpen}
        onClose={testProperties.onClose}
        query={testProperties.query}
        results={testProperties.results}
      />
    </Provider>
  );

  it('renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});

import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedReddit, { Reddit } from './Reddit';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup(
  subreddit = 'frontend',
  isFetching = false,
  posts = [{ name: 'Wick' }],
  selectedSubreddit
) {
  const mockStore = configureStore({});
  const eventArgs = { preventDefault: jest.fn() };
  const store = mockStore({
    postsBySubreddit: {
      [subreddit]: {
        isFetching: isFetching,
        items: posts,
        lastUpdated: 1487076708000,
        loadNextPage: 'post_id'
      }
    },
    selectedSubreddit: selectedSubreddit || subreddit
  });
  store.dispatch = jest.fn();
  const wrapper = mount(<ConnectedReddit store={store} />);

  return {
    eventArgs,
    store,
    wrapper,
    selectDOM: wrapper.find('select'),
    refreshLink: wrapper.find({ href: '#refresh' }),
    loadMoreLink: wrapper.find({ href: '#load' })
  };
}

it('renders without crashing', () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it('should handle invalid subreddit', () => {
  const { wrapper } = setup('frontend', false, [], 'random');

  expect(wrapper).toMatchSnapshot();
});

it('should call fetch post action when props are changed', () => {
  let fakeDispatch = jest.fn();
  let props = {
    dispatch: fakeDispatch,
    selectedSubreddit: 'reactjs',
    posts: [],
    isFetching: false
  };

  let wrapper = mount(<Reddit {...props} />);

  expect(fakeDispatch.mock.calls.length).toEqual(1);

  wrapper.setProps({ selectedSubreddit: 'frontend' });

  expect(fakeDispatch.mock.calls.length).toEqual(2);
});

it('should do nothing when props are not changed', () => {
  let fakeDispatch = jest.fn();
  let props = {
    dispatch: fakeDispatch,
    selectedSubreddit: 'reactjs',
    posts: [],
    isFetching: false
  };

  let wrapper = mount(<Reddit {...props} />);

  expect(fakeDispatch.mock.calls.length).toEqual(1);

  wrapper.setProps({ selectedSubreddit: 'reactjs' });

  expect(fakeDispatch.mock.calls.length).toEqual(1);
});

it('should call refreshLink action on Refresh link', () => {
  const { wrapper, store, eventArgs, refreshLink } = setup('reactjs', true);

  expect(store.dispatch.mock.calls.length).toEqual(1);

  refreshLink.simulate('click', eventArgs);

  expect(store.dispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      subreddit: 'reactjs',
      type: 'INVALIDATE_SUBREDDIT'
    })
  );
});

it('should render loading when there are no post and is loading', () => {
  const { wrapper } = setup('reactjs', true, []);

  expect(wrapper.find('h2').text()).toEqual('Loading...');
});

it('should call loadMoreLink action on Load More link', () => {
  const { wrapper, store, eventArgs, loadMoreLink } = setup('reactjs');

  expect(store.dispatch.mock.calls.length).toEqual(1);

  loadMoreLink.simulate('click', eventArgs);

  expect(store.dispatch.mock.calls.length).toEqual(2);
});

it('should call select subreddit action on clicking select', () => {
  const { wrapper, store, eventArgs, selectDOM } = setup('reactjs');

  expect(store.dispatch.mock.calls.length).toEqual(1);

  selectDOM.simulate('change', { target: { value: 'reactjs' } });

  expect(store.dispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      subreddit: 'reactjs',
      type: 'SELECT_SUBREDDIT'
    })
  );
});

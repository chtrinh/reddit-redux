import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as creators from './creators';
import * as types from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('sync action creators', () => {
  it('selectSubreddit() should create an action to select a subreddit', () => {
    const subreddit = 'funny';
    const expectedAction = {
      type: types.SELECT_SUBREDDIT,
      subreddit
    };

    expect(creators.selectSubreddit(subreddit)).toEqual(expectedAction);
  });

  it('invalidateSubreddit() should create an action to refresh subreddit', () => {
    const subreddit = 'funny';
    const expectedAction = {
      type: types.INVALIDATE_SUBREDDIT,
      subreddit
    };

    expect(creators.invalidateSubreddit(subreddit)).toEqual(expectedAction);
  });

  it('fetchPostsIfNeeded() should do nothing when currently fetching', () => {
    const subreddit = 'funny';
    const store = mockStore({
      postsBySubreddit: {
        [subreddit]: {
          isFetching: true,
          didInvalidate: false,
          items: []
        }
      }
    });

    store.dispatch(creators.fetchPostsIfNeeded(subreddit));

    expect(store.getActions()).toEqual([]);
  });
});

describe('async action creators', () => {
  it('fetchNextPagePosts() should create an action when fetching next page post has been done', () => {
    const subreddit = 'funny';
    const currentTime = 1487076708000;
    const store = mockStore({
      postsBySubreddit: {
        [subreddit]: {
          isFetching: false,
          didInvalidate: false,
          items: []
        }
      }
    });
    const response = JSON.stringify({
      data: {
        after: 'some_id',
        children: [{ data: { author: 'John', name: 'some_name' } }]
      }
    });
    const expectedActions = [
      { type: types.REQUEST_POSTS, subreddit: subreddit },
      {
        type: types.RECEIVE_POSTS,
        subreddit: subreddit,
        nextPage: 'some_id',
        posts: [{ author: 'John', name: 'some_name' }],
        receivedAt: currentTime
      }
    ];

    Date.now = jest.fn(() => currentTime);
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockResponse(200, null, response))
      );

    expect.assertions(1);
    return store.dispatch(creators.fetchNextPagePosts(subreddit)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      jest.resetAllMocks();
    });
  });

  it('fetchPostsIfNeeded() should create an action when posts are invalidated', () => {
    const subreddit = 'funny';
    const currentTime = 1487076708000;
    const store = mockStore({
      postsBySubreddit: {
        [subreddit]: {
          isFetching: false,
          didInvalidate: true,
          items: []
        }
      }
    });
    const response = JSON.stringify({
      data: {
        after: 'some_id',
        children: [{ data: { author: 'Tommy', name: 'some_name' } }]
      }
    });
    const expectedActions = [
      { type: types.REQUEST_POSTS, subreddit: subreddit },
      {
        type: types.RECEIVE_POSTS,
        subreddit: subreddit,
        nextPage: 'some_id',
        posts: [{ author: 'Tommy', name: 'some_name' }],
        receivedAt: currentTime
      }
    ];

    Date.now = jest.fn(() => currentTime);
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockResponse(200, null, response))
      );

    expect.assertions(1);
    return store.dispatch(creators.fetchPostsIfNeeded(subreddit)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      jest.resetAllMocks();
    });
  });

  it('fetchPostsIfNeeded() should create an action when there are no posts', () => {
    const subreddit = 'funny';
    const currentTime = 1487076708000;
    const store = mockStore({
      postsBySubreddit: {
        [subreddit]: false
      }
    });
    const response = JSON.stringify({
      data: {
        after: 'some_id',
        children: [{ data: { author: 'Tommy', name: 'some_name' } }]
      }
    });
    const expectedActions = [
      { type: types.REQUEST_POSTS, subreddit: subreddit },
      {
        type: types.RECEIVE_POSTS,
        subreddit: subreddit,
        nextPage: 'some_id',
        posts: [{ author: 'Tommy', name: 'some_name' }],
        receivedAt: currentTime
      }
    ];

    Date.now = jest.fn(() => currentTime);
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockResponse(200, null, response))
      );

    expect.assertions(1);
    return store.dispatch(creators.fetchPostsIfNeeded(subreddit)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      jest.resetAllMocks();
    });
  });
});

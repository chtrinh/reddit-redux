import reducer from './';
import * as types from '../actions/types';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      postsBySubreddit: {},
      selectedSubreddit: 'reactjs'
    });
  });

  it('should handle SELECT_SUBREDDIT', () => {
    expect(
      reducer(undefined, {
        type: types.SELECT_SUBREDDIT,
        subreddit: 'funny'
      })
    ).toEqual({
      postsBySubreddit: {},
      selectedSubreddit: 'funny'
    });
  });

  it('should handle INVALIDATE_SUBREDDIT', () => {
    expect(
      reducer(undefined, {
        type: types.INVALIDATE_SUBREDDIT,
        subreddit: 'reactjs'
      })
    ).toEqual({
      postsBySubreddit: {
        reactjs: { didInvalidate: true, isFetching: false, items: [] }
      },
      selectedSubreddit: 'reactjs'
    });
  });

  it('should handle INVALIDATE_SUBREDDIT', () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_POSTS,
        subreddit: 'reactjs'
      })
    ).toEqual({
      postsBySubreddit: {
        reactjs: { didInvalidate: false, isFetching: true, items: [] }
      },
      selectedSubreddit: 'reactjs'
    });
  });

  it('should handle RECEIVE_POSTS', () => {
    expect(
      reducer(undefined, {
        type: types.RECEIVE_POSTS,
        subreddit: 'reactjs',
        posts: [{ name: 'Wick' }],
        receivedAt: 1487076708000,
        nextPage: 'some_id'
      })
    ).toEqual({
      postsBySubreddit: {
        reactjs: {
          didInvalidate: false,
          isFetching: false,
          items: [{ name: 'Wick' }],
          lastUpdated: 1487076708000,
          loadNextPage: 'some_id'
        }
      },
      selectedSubreddit: 'reactjs'
    });
  });
});

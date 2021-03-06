import Api from '../Api';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from './types';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

function receivePosts(subreddit, json, state) {
  const posts = state.postsBySubreddit[subreddit].items;

  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: posts
      ? posts.concat(json.data.children.map(child => child.data))
      : json.data.children.map(child => child.data),
    receivedAt: Date.now(),
    nextPage: json.data.after
  };
}

function fetchPosts(subreddit) {
  return (dispatch, getState) => {
    dispatch(requestPosts(subreddit));
    return fetch(Api.subreddit(subreddit))
      .then(req => req.json())
      .then(json => dispatch(receivePosts(subreddit, json, getState())));
  };
}

export function fetchNextPagePosts(subreddit, after) {
  return (dispatch, getState) => {
    dispatch(requestPosts(subreddit));
    return fetch(Api.subreddit(subreddit, { after: after }))
      .then(req => req.json())
      .then(json => dispatch(receivePosts(subreddit, json, getState())));
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}

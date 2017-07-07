import Api from './Api';

it('subreddit() returns a request object with acceptable query params', () => {
  let params = {
    after: 'July'
  };
  let request = Api.subreddit('reactjs', params);

  expect(request.url).toEqual(
    'http://www.reddit.com/r/reactjs.json?after=July'
  );
  expect(request.method).toEqual('GET');
});

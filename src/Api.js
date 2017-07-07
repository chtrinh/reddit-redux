function queryString(params) {
  return Object.entries(params)
    .map(([key, value]) => {
      let encodedKey = window.encodeURIComponent(key);
      let encodedValue = window.encodeURIComponent(value);

      return `${encodedKey}=${encodedValue}`;
    })
    .join('&');
}

export default class Api {
  static subreddit(name, params) {
    let query = params ? `?${queryString(params)}` : '';
    let url = `http://www.reddit.com/r/${name}.json${query}`;

    return new Request(url, {
      method: 'GET',
      cache: 'no-store'
    });
  }
}

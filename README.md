## Yet Another Reddit Redux Example

Based off Dan Abramov's awesome [example/docs Reddit](http://redux.js.org/docs/advanced/ExampleRedditAPI.html)

A simple yet comprehensive example bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). With other opinioned best practices/tools. It attempts to provide reasonable test coverage to help get you started on how to test react and redux.

## API

One major difference is that there is a `Api.js`. This is just a centralized client side class and just returns `Request` objects. I did not want to couple the implementation of constructing REST API calls with `action creators`. In most real world usage there will be need to set headers `e.g. CORS` or HTTP verbs for various REST API calls.

## Redux middlewares
  1. [redux-thunk](https://github.com/gaearon/redux-thunk)
  2. [redux-logger](https://github.com/evgenyrodionov/redux-logger)

## Testing

There are examples here to snapshot, middleware, async api, connected component, dumb component testing.

- Testing framework [Jest](https://facebook.github.io/jest/)
- Test Helper [Enzyme](http://airbnb.io/enzyme/index.html)
- Test Helper [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store)

## Feedback

Feel free to make a pull request to improve this or update packages.

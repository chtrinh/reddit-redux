import React from 'react';
import App from './App';

it('renders without crashing', () => {
  const selectedSubreddit = 'frontend';
  const handleChange = jest.fn();

  const wrapper = shallow(<App />);

  expect(wrapper).toMatchSnapshot();
});

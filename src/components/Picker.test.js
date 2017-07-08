import React from 'react';
import Picker from './Picker';

it('renders without crashing', () => {
  const selectedSubreddit = 'frontend';
  const handleChange = jest.fn();

  const wrapper = shallow(
    <Picker
      value={selectedSubreddit}
      onChange={handleChange}
      options={['reactjs', 'frontend']}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('should handle select change event', () => {
  const selectedSubreddit = 'frontend';
  const mockedEvent = { target: {} };
  const handleChange = jest.fn();

  const wrapper = shallow(
    <Picker
      value={selectedSubreddit}
      onChange={handleChange}
      options={['reactjs', 'frontend']}
    />
  );

  wrapper.find('select').simulate('change', mockedEvent);

  expect(handleChange).toHaveBeenCalled();
});

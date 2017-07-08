import React from 'react';
import Picker from './Picker';

it('renders without crashing', () => {
  const selectedSubreddit = 'frontend';
  const handleChange = () => {};

  shallow(
    <Picker
      value={selectedSubreddit}
      onChange={handleChange}
      options={['reactjs', 'frontend']}
    />
  );
});

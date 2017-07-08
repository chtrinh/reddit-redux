import React from 'react';
import Posts from './Posts';

it('renders without crashing', () => {
  const posts = [];
  shallow(<Posts posts={posts} />);
});

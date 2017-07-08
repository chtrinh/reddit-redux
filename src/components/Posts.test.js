import React from 'react';
import Posts from './Posts';

it('renders without crashing', () => {
  const posts = [
    { url: 'http://example.com/blah', title: 'blah' },
    { url: 'http://example.com/others', title: 'others' }
  ];

  const wrapper = shallow(<Posts posts={posts} />);

  expect(wrapper).toMatchSnapshot();
});

import 'jest-enzyme';
import { shallow, render, mount } from 'enzyme';

global.shallow = shallow;
global.render = render;
global.mount = mount;

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

global.mockResponse = mockResponse;

// Disable all fetch request for testing!
beforeEach(() => {
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(
        console.error(
          'Override this function with a mockResponse in your it block!'
        )
      )
    );
});

import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';

//const localStorage;
const renderer = new ShallowRenderer();
renderer.render(<App/>);
const result = renderer.getRenderOutput();
test('The MinesweeperCell mined cell should be rendered with correct structure', () => {
  expect(result.type).toBe('div');
});
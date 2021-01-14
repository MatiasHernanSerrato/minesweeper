import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MinesweeperBoard from '../components/minesweeper-board';

const renderer = new ShallowRenderer();
renderer.render(<MinesweeperBoard isMined="true" />);
const result = renderer.getRenderOutput();

test('The MinesweeperBoard should be rendered with correct structure', () => {
  expect(result.type).toBe('div');
});

// test('There should be 4 children elements from the root element', () => {
//   expect(result.props.children.length).toBe(4);
// });

// test('The first element of a mined cell should have "mineShell" for its class name', () => {
//   expect(result.props.children[0].props.className).toEqual('mineShell');
// });

// test('The first element of a mined cell should have "mineShell" for its class name', () => {
//   expect(result.props.children[0].props.className).toEqual('mineShell');
// });



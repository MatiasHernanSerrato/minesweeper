import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LevelSelector from '../components/minesweeper-smiley-button';
import SmileyButtonModel from '../model/smiley-button-model';

const renderer = new ShallowRenderer();
renderer.render(<LevelSelector/>);
const result = renderer.getRenderOutput();

test('The MinesweeperSmileyButton should be rendered with correct structure', () => {
  expect(result.type).toBe('div');
});
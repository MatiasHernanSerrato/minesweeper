import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ScoreBoard from '../components/scoreboard';

const renderer = new ShallowRenderer();
renderer.render(<ScoreBoard />);
const result = renderer.getRenderOutput();

test('The ThreeDigitCounter should be rendered with correct structure', () => {
  expect(result.type).toBe('div');
});
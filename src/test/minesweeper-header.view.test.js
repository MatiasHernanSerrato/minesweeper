import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MinesweeperHeader from '../components/three-digit-counter';
import MinesweeperGameModel from '../model/minesweeper-game-model';
import MouseModel from '../model/mouse-model';
import ThreeDigitCounterModel from '../model/three-digit-counter-model';
import MinesweeperHeaderModel from '../model/minesweeper-header-model';

const renderer = new ShallowRenderer();
var game = new MinesweeperGameModel({
    "mines":10,
    "width": 9,
    "height": 9
  });
var mouse = new MouseModel();
//header.timeCounter = new ThreeDigitCounterModel();
var header = new MinesweeperHeaderModel(9, 9, 10);
header.minesCounter = new ThreeDigitCounterModel(10);
header.timeCounter = new ThreeDigitCounterModel();
renderer.render(<MinesweeperHeader headerModel={header} mouse={mouse} />);
const result = renderer.getRenderOutput();

test('The ThreeDigitCounter should be rendered with correct structure', () => {
  expect(result.type).toBe('div');
});

test('The root element should have 3 children elements', () => {
  expect(result.props.children.length).toEqual(3);
});
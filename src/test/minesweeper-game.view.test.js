import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MinesweeperGame from '../components/three-digit-counter';
import MinesweeperGameModel from '../model/minesweeper-game-model';
import MouseModel from '../model/mouse-model';
import ThreeDigitCounterModel from '../model/three-digit-counter-model';
import MinesweeperHeader from '../components/minesweeper-header.js';
import MinesweeperBoard from '../components/minesweeper-board.js';

const renderer = new ShallowRenderer();
var game = new MinesweeperGameModel({
    "mines":10,
    "width": 9,
    "height": 9
  });
var mouse = new MouseModel();
renderer.render(<MinesweeperHeader headerModel={game.header} mouse={mouse} />);
renderer.render(<MinesweeperGame game={game} mouse={mouse} />);
const result = renderer.getRenderOutput();

test('The App component should be rendered with correct structure', () => {
    expect(result.props.children).toEqual([
        <MinesweeperHeader headerModel={game.header} mouse={mouse}/>,
        <MinesweeperBoard game={game} mouse={mouse}/>
    ]);
  });

test('The ThreeDigitCounter should be rendered with correct structure', () => {
  expect(result.type).toBe('div');
});

// test('The root element should have 3 children elements', () => {
//     expect(result.props.children.length).toEqual(3);
// });
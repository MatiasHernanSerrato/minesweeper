import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ThreeDigitCounter from '../components/three-digit-counter';
import ThreeDigitCounterModel from '../model/three-digit-counter-model';

const renderer = new ShallowRenderer();
const timeCounter = new ThreeDigitCounterModel()
renderer.render(<ThreeDigitCounter model={timeCounter} />);
const result = renderer.getRenderOutput();

test('The ThreeDigitCounter should be rendered with correct structure', () => {
  expect(result.type).toBe('div');
});

test('The root element should have 3 children elements', () => {
    expect(result.props.children.length).toEqual(3);
});
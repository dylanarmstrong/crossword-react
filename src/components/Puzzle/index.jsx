import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { Stage, Layer, Group } from 'react-konva';

import Cell, { CELL_SIZE } from '../Cell';

const Puzzle = ({
  grid,
  height,
  onSelect,
  width,
}) => {
  const body = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const cell = grid[y][x];
      if (cell) {
        const {
          clueIndex,
          highlighted: isHighlighted,
          selected: isSelected,
          isStart,
          value,
        } = cell;

        row.push(
          <Cell
            clueIndex={isStart ? clueIndex : undefined}
            highlighted={isHighlighted}
            key={`cell-${y}-${x}`}
            onSelect={onSelect}
            selected={isSelected}
            text={value}
            x={x}
            y={y}
          />,
        );
      }
    }

    body.push(
      <Group key={`row-${y}`}>
        {row}
      </Group>,
    );
  }

  return (
    <Stage
      height={CELL_SIZE * height}
      width={CELL_SIZE * width}
    >
      <Layer>
        {body}
      </Layer>
    </Stage>
  );
};

Puzzle.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        across: PropTypes.shape({
          cells: PropTypes.arrayOf(PropTypes.number),
          clue: PropTypes.string,
          len: PropTypes.number,
        }),
        cell: PropTypes.number,
        clueIndex: PropTypes.number,
        down: PropTypes.shape({
          cells: PropTypes.arrayOf(PropTypes.number),
          clue: PropTypes.string,
          len: PropTypes.number,
        }),
        highlighted: PropTypes.bool,
        isBlack: PropTypes.bool,
        isStart: PropTypes.bool,
        selected: PropTypes.bool,
        value: PropTypes.string,
      }),
    ),
  ).isRequired,
  height: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default Puzzle;

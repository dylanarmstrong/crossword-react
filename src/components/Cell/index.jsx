import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Rect, Text } from 'react-konva';

import { colors } from '../../css';

export const CELL_SIZE = 25;

const Cell = ({
  clueIndex,
  highlighted,
  onSelect,
  selected,
  text,
  x,
  y,
}) => {
  const onMouseDown = useCallback((e) => {
    onSelect(x, y);
    e.cancelBubble = true;
  }, [onSelect, x, y]);

  const isBlack = text === '.';
  let fill = colors.white;
  if (selected) {
    fill = colors.selected;
  } else if (highlighted) {
    fill = colors.highlighted;
  } else if (isBlack) {
    fill = colors.black;
  }

  return (
    <>
      <Rect
        fill={fill}
        height={CELL_SIZE}
        stroke={colors.black}
        strokeWidth={1}
        width={CELL_SIZE}
        x={x * CELL_SIZE}
        y={y * CELL_SIZE}
      />
      {clueIndex > 0 && (
        <Text
          fontFamily="Raleway"
          fontSize={10}
          offsetX={-1}
          text={String(clueIndex)}
          x={x * CELL_SIZE}
          y={y * CELL_SIZE}
        />
      )}
      {!isBlack && (
        <Text
          align="center"
          fontFamily="Raleway"
          fontSize={20}
          fontVariant="small-caps"
          height={CELL_SIZE}
          onMouseDown={onMouseDown}
          onTouchEnd={onMouseDown}
          text={text}
          verticalAlign="middle"
          width={CELL_SIZE}
          x={x * CELL_SIZE}
          y={y * CELL_SIZE + 4}
        />
      )}
    </>
  );
};

Cell.defaultProps = {
  clueIndex: 0,
  highlighted: false,
  selected: false,
  text: '',
};

Cell.propTypes = {
  clueIndex: PropTypes.number,
  highlighted: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  text: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default React.memo(Cell);

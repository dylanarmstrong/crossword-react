import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

import { colors } from '../../css';

const Index = styled.span`
  width: 25px;
  align-self: flex-start;
`;

const Text = styled.p`
  margin: 0;
`;

const Empty = styled.div``;
const ClueContainer = styled(
  // eslint-disable-next-line react/display-name
  React.forwardRef(
    // eslint-disable-next-line no-unused-vars, react/prop-types
    ({ isHighlighted, isMode, ...props }, ref) => <Empty {...props} ref={ref} />,
  ),
)`
  width: 100%;
  display: flex;
  padding-top: 3px;
  padding-bottom: 3px;
  ${(props) => props.isHighlighted && !props.isMode && css`
    background-color: ${colors.lightBlue};
  `}

  ${(props) => props.isHighlighted && props.isMode && css`
    background-color: ${colors.blue};
  `}
`;

// eslint-disable-next-line react/no-multi-comp
const Clue = ({ clue, isHighlighted, index, innerRef, isMode, mode, onClick }) => {
  const handleClick = useCallback((e) => {
    onClick(index, mode);
    e.preventDefault();
  }, [index, mode, onClick]);

  return (
    <ClueContainer isHighlighted={isHighlighted} isMode={isMode} onClick={handleClick} ref={innerRef}>
      <Index>
        {index}
        .
      </Index>
      <Text>{clue}</Text>
    </ClueContainer>
  );
};

Clue.defaultProps = {
  innerRef: null,
};

Clue.propTypes = {
  clue: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  innerRef: PropTypes.shape(),
  isHighlighted: PropTypes.bool.isRequired,
  isMode: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Clue);

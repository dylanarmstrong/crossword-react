import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

import { colors } from '../../css';
import Clue from './Clue';

const Empty = styled.div``;
// eslint-disable-next-line no-unused-vars, react/jsx-props-no-spreading
const ClueList = styled(({ height, ...props }) => <Empty {...props} />)`
  height: ${(props) => props.height - 22}px;
  overflow-y: scroll;

  @media print {
    overflow-y: hidden;
    height: 100%;
  }
`;

const ClueContainer = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 10px;
  }
`;

const Title = styled.strong`
  height: 20px;
  grid-row: 1/1;
  background-color: ${colors.white};
  border-bottom: 2px solid ${colors.black};

  ${(props) => props.one && css`
    grid-column: 1/1;
  `}

  ${(props) => props.two && css`
    grid-column: 2/2;
  `}
`;

const Active = styled.div`
  padding: 10px;
  background-color: ${colors.blue};
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 2px solid ${colors.darkBlue};
  display: block;
  width: ${(props) => props.width - 20}px;

  @media (min-width: 992px) {
    display: none;
  }
`;

const Clues = ({ acrossClues, clueIndex, downClues, height, mode, onClick, width }) => {
  const acrossRef = useRef(null);
  const downRef = useRef(null);

  useEffect(() => {
    if (acrossRef.current && typeof acrossRef.current.scrollIntoViewIfNeeded === 'function') {
      acrossRef.current.scrollIntoViewIfNeeded();
    }

    if (downRef.current && typeof downRef.current.scrollIntoViewIfNeeded === 'function') {
      downRef.current.scrollIntoViewIfNeeded();
    }
  }, [clueIndex]);

  const { clue: activeClue } = (mode === 'across' ? acrossClues : downClues)
    .find(({ index }) => index === clueIndex) || { clue: null };

  return (
    <>
      <Active width={width}>
        <strong>
          {clueIndex}
          .
        </strong>
        {activeClue}
      </Active>
      <ClueContainer>
        {acrossClues.length > 0 && (
          <>
            <Title one>Across</Title>
            <ClueList height={height}>
              {acrossClues.map(({ clue, index }, i) => {
                const isHighlighted = clueIndex === index;
                return (
                  <Clue
                    clue={clue}
                    index={index}
                    innerRef={isHighlighted ? acrossRef : null}
                    isHighlighted={isHighlighted}
                    isMode={mode === 'across'}
                    key={`clue-across-${i}`}
                    mode="across"
                    onClick={onClick}
                  />
                );
              })}
            </ClueList>
          </>
        )}

        {downClues.length > 0 && (
          <>
            <Title two>Down</Title>
            <ClueList height={height}>
              {downClues.map(({ clue, index }, i) => {
                const isHighlighted = clueIndex === index;
                return (
                  <Clue
                    clue={clue}
                    index={index}
                    innerRef={isHighlighted ? downRef : null}
                    isHighlighted={isHighlighted}
                    isMode={mode === 'down'}
                    key={`clue-down-${i}`}
                    mode="down"
                    onClick={onClick}
                  />
                );
              })}
            </ClueList>
          </>
        )}
      </ClueContainer>
    </>
  );
};

Clues.defaultProps = {
  acrossClues: [],
  clueIndex: 0,
  downClues: [],
};

Clues.propTypes = {
  acrossClues: PropTypes.arrayOf(PropTypes.shape({
    clue: PropTypes.string,
    index: PropTypes.number,
  })),
  clueIndex: PropTypes.number,
  downClues: PropTypes.arrayOf(PropTypes.shape({
    clue: PropTypes.string,
    index: PropTypes.number,
  })),
  height: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default Clues;

import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { colors } from '../../css';

const KeyboardContainer = styled.div`
  display: block;

  @media (min-width: 1200px) {
    display: none;
  }
`;

const Key = styled.div`
  display: flex;
  height: 35px;
  font-size: 18px;
  background-color: ${colors.lightBlue};
  justify-content: center;
  align-items: center;
  box-shadow: 1px 2px 1px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border: 1px solid ${colors.darkBlue};
  user-select: none;
  touch-action: manipulation;
`;

const Row1 = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 35px);
  grid-gap: 5px;
  width: 100%;
  margin-bottom: 5px;
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 35px);
  grid-gap: 5px;
  width: 100%;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const Row3 = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 35px) 75px;
  grid-gap: 5px;
  width: 100%;
  margin-bottom: 5px;
  margin-left: 20px;
`;

const Keyboard = ({ onClick }) => {
  const handleClick = useCallback((e) => {
    onClick(e.target.textContent);
    e.preventDefault();
  }, [onClick]);

  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
    <Key
      key={`key-${key}`}
      onClick={handleClick}
      onTouchEnd={handleClick}
    >
      {key}
    </Key>
  ));

  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
    <Key
      key={`key-${key}`}
      onClick={handleClick}
      onTouchEnd={handleClick}
    >
      {key}
    </Key>
  ));

  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'CLEAR'].map((key) => (
    <Key
      key={`key-${key}`}
      onClick={handleClick}
      onTouchEnd={handleClick}
    >
      {key}
    </Key>
  ));

  return (
    <KeyboardContainer>
      <Row1>{row1}</Row1>
      <Row2>{row2}</Row2>
      <Row3>{row3}</Row3>
    </KeyboardContainer>
  );
};

Keyboard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Keyboard;

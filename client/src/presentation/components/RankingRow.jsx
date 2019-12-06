import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { STYLE_COLORS } from '../../utils';

const Row = styled.div`
  display: flex;
  background-color: ${STYLE_COLORS.THEME_COLOR};
  color: ${STYLE_COLORS.BASE_WHITE_COLOR};
  margin-bottom: ${props => (props.isHeader ? '0.4rem' : '0.2rem')};
`;

const Cell = styled.div`
  flex: 1;
  text-align: center;
  padding: 0.5rem 1rem;
  font-size: 2rem;
`;

const RankingRow = ({ rank, nickname, score, isHeader }) => {
  return (
    <Row isHeader={isHeader}>
      <Cell>{rank}</Cell>
      <Cell>{nickname}</Cell>
      <Cell>{score}</Cell>
    </Row>
  );
};

RankingRow.propTypes = {
  rank: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  isHeader: PropTypes.bool.isRequired,
};

export default RankingRow;

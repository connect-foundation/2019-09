import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { STYLE_COLORS } from '../../utils';

const RankPodiumBar = styled.div`
  height: ${props => {
    if (props.rank === '1') return '75%';
    if (props.rank === '2') return '50%';
    return '25%';
  }};
  border: 2px solid ${STYLE_COLORS.THEME_COLOR};
  display: flex;
  font-size: 5rem;
  flex-direction: colun;
  justify-content: center;
  align-items: center;
  background-color: ${STYLE_COLORS.PURE_WHITE_COLOR};
  color: ${STYLE_COLORS.THEME_COLOR};
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 9rem;
  }
`;

const RankPodiumWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const RankerInformation = styled.div`
  height: ${props => {
    if (props.rank === '1') return '25%';
    if (props.rank === '2') return '50%';
    return '75%';
  }};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const RankerDescription = styled.div`
  font-size: 2.5rem;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 4rem;
  }
`;

const RankPodium = ({ rank, rankerScore, rankerNickname }) => {
  return (
    <RankPodiumWrapper>
      <RankerInformation rank={rank}>
        <RankerDescription>
          <div>{rankerNickname}</div>
          <div>{rankerScore}</div>
        </RankerDescription>
      </RankerInformation>
      <RankPodiumBar rank={rank}>{rank}</RankPodiumBar>
    </RankPodiumWrapper>
  );
};

RankPodium.propTypes = {
  rank: PropTypes.string.isRequired,
  rankerScore: PropTypes.number.isRequired,
  rankerNickname: PropTypes.string.isRequired,
};

export default RankPodium;

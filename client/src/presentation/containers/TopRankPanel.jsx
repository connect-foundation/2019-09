import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { RankPodium } from '../components';

const useStyle = makeStyles(() => ({
  topRankContainer: {
    height: '50rem',
    display: 'flex',
    width: '30%',
    marginBottom: '2.5rem',
  },
}));

const findRanker = (rank, rankingList) => {
  return rankingList.find(ranking => {
    return ranking.rank === rank;
  });
};

const TopRankPanel = ({ rankingList }) => {
  const classes = useStyle();
  const firstPlace = findRanker('1', rankingList);
  const secondPlace = findRanker('2', rankingList);
  const thirdPlace = findRanker('3', rankingList);

  return (
    <Container className={classes.topRankContainer}>
      <RankPodium
        rank={secondPlace.rank}
        rankerScore={secondPlace.score}
        rankerNickname={secondPlace.nickname}
      />
      <RankPodium
        rank={firstPlace.rank}
        rankerScore={firstPlace.score}
        rankerNickname={firstPlace.nickname}
      />
      <RankPodium
        rank={thirdPlace.rank}
        rankerScore={thirdPlace.score}
        rankerNickname={thirdPlace.nickname}
      />
    </Container>
  );
};

TopRankPanel.propTypes = {
  rankingList: PropTypes.shape.isRequired,
};

export default TopRankPanel;

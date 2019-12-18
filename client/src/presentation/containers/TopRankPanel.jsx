/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { RankPodium } from '../components';

const useStyle = makeStyles(theme => ({
  topRankContainer: {
    height: '50rem',
    display: 'flex',
    width: '50rem',
    marginBottom: '2.5rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
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
        rank={secondPlace ? secondPlace.rank : '2'}
        rankerScore={secondPlace ? secondPlace.score : '0'}
        rankerNickname={secondPlace ? secondPlace.nickname : '2등'}
      />
      <RankPodium
        rank={firstPlace ? firstPlace.rank : '1'}
        rankerScore={firstPlace ? firstPlace.score : '0'}
        rankerNickname={firstPlace ? firstPlace.nickname : '1등'}
      />
      <RankPodium
        rank={thirdPlace ? thirdPlace.rank : '3'}
        rankerScore={thirdPlace ? thirdPlace.score : '0'}
        rankerNickname={thirdPlace ? thirdPlace.nickname : '3등'}
      />
    </Container>
  );
};

TopRankPanel.defaultProps = {
  rankingList: [],
};

TopRankPanel.propTypes = {
  rankingList: PropTypes.array,
};

export default TopRankPanel;

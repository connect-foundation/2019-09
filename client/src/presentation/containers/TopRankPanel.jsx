/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { RankPodium } from '../components';
import {
  DEFAULT_SCORE,
  DEFAULT_NICKNAMES,
  FIRST_PLACE,
  SECOND_PLACE,
  THIRD_PLACE,
} from '../../constants/ranking';

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
  const firstPlace = findRanker(FIRST_PLACE, rankingList);
  const secondPlace = findRanker(SECOND_PLACE, rankingList);
  const thirdPlace = findRanker(THIRD_PLACE, rankingList);
  return (
    <Container className={classes.topRankContainer}>
      <RankPodium
        rank={secondPlace ? secondPlace.rank : SECOND_PLACE}
        rankerScore={secondPlace ? secondPlace.score : DEFAULT_SCORE}
        rankerNickname={
          secondPlace ? secondPlace.nickname : DEFAULT_NICKNAMES.SECOND_PLACEC
        }
      />
      <RankPodium
        rank={firstPlace ? firstPlace.rank : FIRST_PLACE}
        rankerScore={firstPlace ? firstPlace.score : DEFAULT_SCORE}
        rankerNickname={
          firstPlace ? firstPlace.nickname : DEFAULT_NICKNAMES.FIRST_PLACE
        }
      />
      <RankPodium
        rank={thirdPlace ? thirdPlace.rank : THIRD_PLACE}
        rankerScore={thirdPlace ? thirdPlace.score : DEFAULT_SCORE}
        rankerNickname={
          thirdPlace ? thirdPlace.nickname : DEFAULT_NICKNAMES.THIRD_PLACE
        }
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

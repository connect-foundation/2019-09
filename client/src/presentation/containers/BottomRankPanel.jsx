import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { RankingRow } from '../components';

const useStyle = makeStyles(() => ({
  bottomRankContainer: {
    width: '30%',
  },
}));

const BottomRankPanel = ({ rankingList }) => {
  const classes = useStyle();

  return (
    <Container className={classes.bottomRankContainer}>
      <RankingRow
        // key={}
        rank="Rank"
        nickname="Name"
        score="Score"
        isHeader
      />

      {rankingList.map(ranking => {
        return (
          <RankingRow
            // key={}
            rank={ranking.rank}
            nickname={ranking.nickname}
            score={ranking.score}
          />
        );
      })}
    </Container>
  );
};

BottomRankPanel.propTypes = {
  rankingList: PropTypes.shape.isRequired,
};

export default BottomRankPanel;

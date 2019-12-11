import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Container, Box } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { RankingRow } from '../components';

const useStyle = makeStyles(theme => ({
  bottomRankContainer: {
    width: '50rem',
    marginBottom: '3rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  skeleton: {
    '& > span > *': {
      marginBottom: '0.5rem',
    },
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

      {rankingList.length === 0 ? (
        <SkeletonTheme color="#dfe4ea" highlightColor="#f1f2f6">
          <Box className={classes.skeleton}>
            <Skeleton height={30} count={10} />
          </Box>
        </SkeletonTheme>
      ) : (
        rankingList.map(ranking => {
          return (
            <RankingRow
              // key={}
              rank={ranking.rank}
              nickname={ranking.nickname}
              score={ranking.score}
            />
          );
        })
      )}
    </Container>
  );
};

BottomRankPanel.propTypes = {
  rankingList: PropTypes.shape.isRequired,
};

export default BottomRankPanel;

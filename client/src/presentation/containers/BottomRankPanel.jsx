/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Container, Box } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { BeatLoader } from 'react-spinners';
import { RankingRow } from '../components';
import styleColors from '../../constants/styleColors';

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
  loading: {
    textAlign: 'center',
    marginTop: '1rem',
  },
}));

const BottomRankPanel = ({ rankingList, loading, isBottomRankingVisible }) => {
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

      {isBottomRankingVisible ? (
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
      ) : (
        <SkeletonTheme
          color={styleColors.SKELETON_COMPONENT_COLOR}
          highlightColor={styleColors.SKELETON_HIGHLIGHT_COLOR}
        >
          <Box className={classes.skeleton}>
            <Skeleton height={30} count={10} />
          </Box>
        </SkeletonTheme>
      )}
      <Box className={classes.loading}>
        <BeatLoader
          sizeUnit="rem"
          size={1.5}
          margin={2}
          color={styleColors.LOADING_DOT_COLOR}
          loading={loading}
        />
      </Box>
    </Container>
  );
};

BottomRankPanel.defaultProps = {
  rankingList: [],
};

BottomRankPanel.propTypes = {
  rankingList: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  isBottomRankingVisible: PropTypes.bool.isRequired,
};

export default BottomRankPanel;

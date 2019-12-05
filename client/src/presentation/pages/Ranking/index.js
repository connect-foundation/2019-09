import React from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { TopRankPanel, BottomRankPanel } from '../../containers';
import { ExitButton } from '../../components';
import { rankingList } from '../../../demoData';
import useStyle from './style';

const getTopRankingList = totalRankingList => {
  return totalRankingList.slice(0, 3);
};

const getBottomRankingList = totalRankingList => {
  return totalRankingList.slice(3);
};

const Ranking = () => {
  const classes = useStyle();
  const topRankingList = getTopRankingList(rankingList);
  const bottomRankingList = getBottomRankingList(rankingList);
  return (
    <Box className={classes.mainPageWrapper}>
      <Box className={classes.exitButtonWrapper}>
        <Link to="/">
          <ExitButton />
        </Link>
      </Box>
      <TopRankPanel rankingList={topRankingList} />
      <BottomRankPanel rankingList={bottomRankingList} />
    </Box>
  );
};

export default Ranking;

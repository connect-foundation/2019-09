import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { TopRankPanel, BottomRankPanel } from '../../containers';
import { ExitButton } from '../../components';
import useStyle from './style';
import { getRankingsTop100 } from '../../../api';

const getTopRankingList = totalRankingList => {
  return totalRankingList.slice(0, 3);
};

const getBottomRankingList = totalRankingList => {
  return totalRankingList.slice(3);
};

const setRankingLists = async (setTopRankingList, setBottomRankingList) => {
  const rankingsData = await getRankingsTop100();
  const rankingList = rankingsData.map((ranking, index) => {
    return {
      rank: `${index + 1}`,
      nickname: ranking.nickname,
      score: `${ranking.score}`,
    };
  });

  setTopRankingList(getTopRankingList(rankingList));
  setBottomRankingList(getBottomRankingList(rankingList));
};

const Ranking = () => {
  const classes = useStyle();

  const [topRankingList, setTopRankingList] = useState([]);
  const [bottomRankingList, setBottomRankingList] = useState([]);

  useEffect(() => {
    setRankingLists(setTopRankingList, setBottomRankingList);
  }, []);

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

import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { MoreButton } from '../../components/Buttons';
import { TopRankPanel, BottomRankPanel } from '../../containers';
import { ExitButton } from '../../components';
import useStyle from './style';
import { getRankings } from '../../../api';

const getTopRankingList = totalRankingList => {
  return totalRankingList.slice(0, 3);
};

const getBottomRankingList = totalRankingList => {
  return totalRankingList.slice(3);
};

const Ranking = () => {
  const classes = useStyle();
  const [offset, setOffset] = useState(0);
  const [moreButtonLock, setMoreButtonLock] = useState(false);
  const [topRankingList, setTopRankingList] = useState([]);
  const [bottomRankingList, setBottomRankingList] = useState([]);

  /**
   * offset이 변경되면 서버에 랭킹 데이터 요청 후 렌더링
   */
  const setRankingLists = async () => {
    setMoreButtonLock(true);
    const rankingsData = await getRankings(offset);
    const rankingList = rankingsData.map((ranking, index) => {
      return {
        rank: `${index + 1 + topRankingList.length + bottomRankingList.length}`,
        nickname: ranking.nickname,
        score: `${ranking.score}`,
      };
    });
    setTimeout(() => {
      if (offset === 0) {
        setTopRankingList(getTopRankingList(rankingList));
        setBottomRankingList(getBottomRankingList(rankingList));
      } else {
        setBottomRankingList([...bottomRankingList, ...rankingList]);
      }
      setMoreButtonLock(false);
    }, 500);
  };

  const onClick = () => {
    if (moreButtonLock) return;
    setOffset(offset + 1);
  };

  useEffect(() => {
    setRankingLists();
  }, [offset]);

  return (
    <Box className={classes.mainPageWrapper}>
      <Box className={classes.exitButtonWrapper}>
        <Link to="/">
          <ExitButton />
        </Link>
      </Box>
      <TopRankPanel rankingList={topRankingList} />
      <BottomRankPanel
        rankingList={bottomRankingList}
        loading={moreButtonLock}
      />
      <Box className={classes.MoreButton}>
        <MoreButton onClick={onClick}>MORE</MoreButton>
      </Box>
    </Box>
  );
};

export default Ranking;

import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
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
  const [pageHeight, setPageHeight] = useState(0);
  const [scrollLock, setScrollLock] = useState(false);
  const [topRankingList, setTopRankingList] = useState([]);
  const [bottomRankingList, setBottomRankingList] = useState([]);
  const ref = useRef();

  const isScrollBottom = () =>
    ref.current.offsetHeight + ref.current.scrollTop ===
    ref.current.scrollHeight;
  const isPageHeightChanged = () => pageHeight !== ref.current.scrollHeight;

  /**
   * offset이 변경되면 서버에 랭킹 데이터 요청 후 렌더링
   */
  const setRankingLists = async () => {
    setScrollLock(true);
    const rankingsData = await getRankings(offset);
    const rankingList = rankingsData.map((ranking, index) => {
      return {
        rank: `${index + 1 + topRankingList.length + bottomRankingList.length}`,
        nickname: ranking.nickname,
        score: `${ranking.score}`,
      };
    });

    if (offset === 0) {
      setTopRankingList(getTopRankingList(rankingList));
      setBottomRankingList(getBottomRankingList(rankingList));
    } else {
      setBottomRankingList([...bottomRankingList, ...rankingList]);
    }
    setScrollLock(false);
  };
  /**
   * 스크롤이 가장 아래로 내려갔을때, offset을 변경하고 컴포넌트 높이를 업데이트
   */
  const onScrollHandler = () => {
    if (isScrollBottom() && isPageHeightChanged() && !scrollLock) {
      setOffset(offset + 1);
      setPageHeight(ref.current.scrollHeight);
    }
  };

  useEffect(() => {
    setRankingLists();
  }, [offset]);

  return (
    <Box
      className={classes.mainPageWrapper}
      ref={ref}
      onScroll={onScrollHandler}
    >
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

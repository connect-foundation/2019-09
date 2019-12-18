import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { MoreButton } from '../../components/Buttons';
import { TopRankPanel, BottomRankPanel } from '../../containers';
import { ExitButton } from '../../components';
import useStyle from './style';
import { getRankings, getRankingInformation } from '../../../api';
import exitImageSource from '../../../assets/exit-black.png';

const getTopRankingList = totalRankingList => {
  return totalRankingList.slice(0, 3);
};

const getBottomRankingList = totalRankingList => {
  return totalRankingList.slice(3);
};

const isAllRankingsFetched = ({
  rankingCount,
  bottomRankingList,
  topRankingList,
}) => {
  return (
    rankingCount !== -1 &&
    rankingCount <= bottomRankingList.length + topRankingList.length
  );
};

const Ranking = () => {
  const classes = useStyle();
  const [offset, setOffset] = useState(0);
  const [rankingCount, setRankingCount] = useState(-1);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [moreButtonLock, setMoreButtonLock] = useState(false);
  const [topRankingList, setTopRankingList] = useState([]);
  const [bottomRankingList, setBottomRankingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMoreButtomVisibile, setIsMoreButtomVisibile] = useState(true);
  const [isBottomRankingVisible, setIsBottomRankingVisible] = useState(false);

  const onMoreButtonClick = () => {
    if (moreButtonLock) return;
    setOffset(offset + 1);
  };

  /**
   * offset이 변경되면 서버에 랭킹 데이터 요청 후 렌더링
   */
  const setRankingLists = async () => {
    setMoreButtonLock(true);
    setLoading(true);

    const rankingsData = await getRankings(offset, currentDateTime);
    const rankingList = rankingsData.map((ranking, index) => {
      return {
        rank: `${index + 1 + topRankingList.length + bottomRankingList.length}`,
        nickname: ranking.nickname,
        score: `${ranking.score}`,
      };
    });
    setTimeout(async () => {
      if (offset === 0) {
        const rankingInformaion = await getRankingInformation();
        setRankingCount(rankingInformaion.rankingCount);
        setCurrentDateTime(rankingInformaion.currentTime);
        setTopRankingList(getTopRankingList(rankingList));
        setBottomRankingList(getBottomRankingList(rankingList));
        setIsBottomRankingVisible(true);
      } else {
        setBottomRankingList([...bottomRankingList, ...rankingList]);
      }
      setLoading(false);
      setMoreButtonLock(false);
    }, 500);
  };

  useEffect(() => {
    /**
     * 모든 랭킹 데이터를 가져왔을때, 버튼과 loading 컴포넌트를 제거하고
     * api 요청은 lock을 걸어 놓음
     */
    if (
      isAllRankingsFetched({ rankingCount, bottomRankingList, topRankingList })
    ) {
      setTimeout(() => {
        setLoading(false);
        setMoreButtonLock(true);
        setIsMoreButtomVisibile(false);
      }, 0);
    }
  }, [bottomRankingList, rankingCount]);
  useEffect(() => {
    setRankingLists();
  }, [offset]);

  return (
    <Box className={classes.mainPageWrapper}>
      <Box className={classes.exitButtonWrapper}>
        <Link to="/">
          <ExitButton imageSource={exitImageSource} />
        </Link>
      </Box>
      <TopRankPanel rankingList={topRankingList} />
      <BottomRankPanel
        rankingList={bottomRankingList}
        loading={loading}
        isBottomRankingVisible={isBottomRankingVisible}
      />
      <Box className={classes.MoreButton}>
        <MoreButton
          onClick={onMoreButtonClick}
          isMoreButtomVisibile={isMoreButtomVisibile}
        >
          MORE
        </MoreButton>
      </Box>
    </Box>
  );
};

export default Ranking;

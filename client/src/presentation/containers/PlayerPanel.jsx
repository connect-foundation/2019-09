import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { PlayerProfile, ReadyButton } from '../components';

const useStyle = makeStyles({
  playerPanel: {
    height: '48rem',
    position: 'relative',
    border: '1px solid #e7e7e7',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  readyButtonWrapper: {
    position: 'absolute',
    left: '1rem',
    right: '1rem',
    bottom: '1rem',
  },
});

const PlayerPanel = ({ clientManager }) => {
  const classes = useStyle();
  const playerList = [
    {
      nickname: 'mosball',
      score: 100,
      isReady: true,
      isStreamer: false,
      isYourProfile: false,
    },
    {
      nickname: 'jacob',
      score: 20,
      isReady: false,
      isStreamer: false,
      isYourProfile: false,
    },
    {
      nickname: 'young',
      score: 0,
      isReady: false,
      isStreamer: true,
      isYourProfile: false,
    },
    {
      nickname: 'origin',
      score: 1000,
      isReady: false,
      isStreamer: false,
      isYourProfile: true,
    },
  ];
  return (
    <Box className={classes.playerPanel}>
      {playerList.map((player, index) => {
        return (
          <PlayerProfile
            order={index}
            nickname={player.nickname}
            score={player.score}
            isReady={player.isReady}
            isStreamer={player.isStreamer}
            isYourProfile={player.isYourProfile}
          />
        );
      })}
      <Box className={classes.readyButtonWrapper}>
        <ReadyButton
          onClick={() => {
            clientManager.toggleReady();
          }}
        >
          Ready
        </ReadyButton>
      </Box>
    </Box>
  );
};

PlayerPanel.propTypes = {
  clientManager: PropTypes.shape.isRequired,
};

export default PlayerPanel;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { GlobalContext } from '../../contexts';
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
  const { viewPlayerList } = useContext(GlobalContext);
  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);
  return (
    <Box className={classes.playerPanel}>
      {viewPlayerList.map((player, index) => {
        return (
          <PlayerProfile
            order={index}
            nickname={player.nickname}
            score={player.score}
            isReady={player.isReady}
            type={player.type}
            isLocalPlayer={player.isLocalPlayer}
          />
        );
      })}
      <Box className={classes.readyButtonWrapper}>
        <ReadyButton
          onClick={() => {
            clientManager.toggleReady();
          }}
        >
          {localPlayer && localPlayer.isReady ? 'Cancel' : 'Ready'}
        </ReadyButton>
      </Box>
    </Box>
  );
};

PlayerPanel.propTypes = {
  clientManager: PropTypes.shape.isRequired,
};

export default PlayerPanel;

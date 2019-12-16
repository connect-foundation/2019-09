import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { GlobalContext } from '../../contexts';
import { PlayerProfile, ReadyButton } from '../components';
import { STYLE_COLORS } from '../../utils';

const useStyle = makeStyles(theme => ({
  playerPanel: {
    height: '100%',
    position: 'relative',
    padding: '1rem',
    boxSizing: 'border-box',
    backgroundColor: STYLE_COLORS.PANEL_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.5)',
    borderRadius: '0.3rem',
    [theme.breakpoints.down('xs')]: {
      width: '20rem',
      height: 'auto',
      backgroundColor: 'rgba(255,255,255,0.5)',
      boxShadow: 'none',
      borderRadius: '0.5rem',
    },
  },
  readyButtonWrapper: {
    position: 'absolute',
    left: '1rem',
    right: '1rem',
    bottom: '1rem',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  gameStartHide: {
    display: 'none',
  },
}));

const PlayerPanel = ({ clientManager }) => {
  const classes = useStyle();
  const { viewPlayerList, gameStatus } = useContext(GlobalContext);
  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);

  const readyButtonContainerClasses = () => {
    if (gameStatus === 'waiting') {
      return classes.readyButtonWrapper;
    }
    return classes.gameStartHide;
  };

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
            isCorrectPlayer={player.isCorrectPlayer}
          />
        );
      })}
      <Box className={readyButtonContainerClasses()}>
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

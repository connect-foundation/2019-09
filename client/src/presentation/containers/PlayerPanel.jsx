/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { GlobalContext } from '../../contexts';
import { PlayerProfile, ReadyButton, ShareUrlButton } from '../components';
import { shareUrlButtonClickHandler } from '../../utils';
import styleColors from '../../constants/styleColors';
import { WAITING_STATUS } from '../../constants/game';
import useIsMobile from '../../hooks/useIsMobile';
import { MOBILE_VIEW_BREAKPOINT } from '../../constants/responsiveView';

const useStyle = makeStyles(theme => ({
  playerPanel: {
    height: '100%',
    position: 'relative',
    padding: '1rem',
    boxSizing: 'border-box',
    backgroundColor: styleColors.PANEL_COLOR,
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
  bottomLeftButtonContainer: {
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
  shareUrlButton: {
    marginBottom: '1rem',
  },
}));

const PlayerPanel = ({ clientManager }) => {
  const classes = useStyle();
  const { viewPlayerList, gameStatus } = useContext(GlobalContext);
  const currentIsMobile = useIsMobile(MOBILE_VIEW_BREAKPOINT);
  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);
  const isGameStatusWaiting = gameStatus === WAITING_STATUS;
  const isReadyButtonVisible = !currentIsMobile && isGameStatusWaiting;

  return (
    <Box className={classes.playerPanel}>
      {viewPlayerList.map((player, index) => {
        const key = `${player.nickname}${index}`;
        return (
          <PlayerProfile
            key={key}
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
      {isReadyButtonVisible && (
        <Box className={classes.bottomLeftButtonContainer}>
          {clientManager.getIsRoomPrivate() && (
            <ShareUrlButton
              onClick={shareUrlButtonClickHandler}
              classNames={[classes.shareUrlButton]}
            />
          )}
          <ReadyButton
            onClick={() => {
              clientManager.toggleReady();
            }}
          >
            {localPlayer && localPlayer.isReady ? 'Cancel' : 'Ready'}
          </ReadyButton>
        </Box>
      )}
    </Box>
  );
};

PlayerPanel.defaultProps = {
  clientManager: {},
};

PlayerPanel.propTypes = {
  clientManager: PropTypes.object,
};

export default PlayerPanel;

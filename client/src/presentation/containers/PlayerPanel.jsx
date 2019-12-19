/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { GlobalContext, DispatchContext } from '../../contexts';
import { PlayerProfile, ReadyButton, ShareUrlButton } from '../components';
import styleColors from '../../constants/styleColors';
import { READY_BUTTON_TEXT, GAME_STATUS } from '../../constants/game';
import useIsMobile from '../../hooks/useIsMobile';
import { useToast } from '../../hooks';
import actions from '../../actions';
import { MOBILE_VIEW_BREAKPOINT } from '../../constants/responsiveView';
import { createShareUrlButtonClickHandler } from '../../utils';

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
  const { viewPlayerList, gameStatus, isRoomIdReceived, toast } = useContext(
    GlobalContext,
  );
  const globalDispatch = useContext(DispatchContext);

  const { openToast, closeToast } = useToast({
    open: toast.open,
    dispatch: globalDispatch,
    actions,
  });

  const shareUrlButtonClickHandler = createShareUrlButtonClickHandler(
    openToast,
    closeToast,
  );
  const currentIsMobile = useIsMobile(MOBILE_VIEW_BREAKPOINT);
  const localPlayer = viewPlayerList.find(player => player.isLocalPlayer);
  const isGameStatusWaiting = gameStatus === GAME_STATUS.WAITING;
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
          {isRoomIdReceived && (
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
            {localPlayer && localPlayer.isReady
              ? READY_BUTTON_TEXT.CANCEL
              : READY_BUTTON_TEXT.READY}
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

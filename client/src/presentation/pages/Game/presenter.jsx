/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import {
  Timer,
  QuizDisplay,
  ExitButton,
  ReadyButton,
  Toast,
  ShareUrlButton,
} from '../../components';
import {
  StreamingPanel,
  ChattingPanel,
  PlayerPanel,
  MobileChattingPanel,
} from '../../containers';
import { shareUrlButtonClickHandler } from '../../../utils';
import exitImageSource from '../../../assets/exit.png';

const GamePresentation = ({ gameProps }) => {
  const {
    quiz,
    quizLength,
    exitButtonHandler,
    clientManager,
    showPlayersButtonHandler,
    localPlayer,
    currentSeconds,
    classes,
    readyButtonHandler,
    mobileChattingPanelVisibility,
    toast,
    closeToast,
    isReadyButtonVisible,
    isRoomIdReceived,
  } = gameProps;

  return (
    <div className={classes.root}>
      <MetaTags>
        <meta
          name="viewport"
          content="initial-scale=1.0, user-scalable=no, width=device-width"
        />
      </MetaTags>
      <Toast
        open={toast.open}
        toastType={toast.toastType}
        message={toast.message}
        closeHandler={closeToast}
      />
      <Grid container spacing={0} className={classes.gameHeader}>
        <Grid item xs>
          <Box className={classes.timerBox}>
            <Timer currentSeconds={currentSeconds} />
          </Box>
        </Grid>
        <Grid item xs justify="center" alignItems="center" container>
          <Box className={classes.paper}>
            <QuizDisplay quiz={quiz} quizLength={quizLength} />
          </Box>
        </Grid>
        <Grid item xs className={classes.topRightGrid}>
          <Box className={classes.exitButtonContainer}>
            <Link to="/" onClick={exitButtonHandler}>
              <ExitButton imageSource={exitImageSource} />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={0} className={classes.bottomGrid}>
        <Grid
          item
          xs={2}
          className={`${classes.bottomGridContent} ${classes.leftGridContent}`}
        >
          <Box className={classes.playerPanelContainer}>
            <PlayerPanel clientManager={clientManager} />
          </Box>
          <Box className={classes.playerPanelButton}>
            <Button
              variant="outlined"
              color="primary"
              onClick={showPlayersButtonHandler}
            >
              Players
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={7}
          className={`${classes.bottomGridContent} ${classes.mobileFullWidth} ${classes.streamingPanelGrid}`}
        >
          <StreamingPanel
            className={classes.mobileFullWidth}
            clientManager={clientManager}
          />
          {isReadyButtonVisible && (
            <Box className={classes.bottomLeftButtonContainer}>
              {isRoomIdReceived && (
                <ShareUrlButton
                  onClick={shareUrlButtonClickHandler}
                  classNames={[classes.shareUrlButton]}
                />
              )}
              <ReadyButton onClick={readyButtonHandler}>
                {localPlayer && localPlayer.isReady ? 'Cancel' : 'Ready'}
              </ReadyButton>
            </Box>
          )}
        </Grid>
        {mobileChattingPanelVisibility ? (
          <>
            <Grid
              item
              xs={4}
              className={`${classes.bottomGridContent} ${classes.mobileChattingPanel}`}
            >
              <MobileChattingPanel clientManager={clientManager} />
            </Grid>
            <Grid
              item
              xs={3}
              className={`${classes.bottomGridContent} ${classes.chattingContainer}`}
            >
              <ChattingPanel
                clientManager={clientManager}
                mobileChattingPanelVisibility={mobileChattingPanelVisibility}
              />
            </Grid>
          </>
        ) : (
          <Grid
            item
            xs={3}
            className={`${classes.bottomGridContent} ${classes.chattingContainer}`}
          >
            <ChattingPanel clientManager={clientManager} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default GamePresentation;

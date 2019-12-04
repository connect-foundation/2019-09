/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { Timer, QuizDisplay, ExitButton, ReadyButton } from '../../components';
import {
  StreamingPanel,
  ChattingPanel,
  PlayerPanel,
  MobileChattingPanel,
} from '../../containers';

const GamePresentation = ({ gameProps }) => {
  const {
    quizWord,
    exitButtonHandler,
    clientManager,
    showPlayersButtonHandler,
    candidateWords,
    playerPanelContainerClasses,
    readyButtonContainerClasses,
    localPlayer,
    currentSeconds,
    classes,
    readyButtonHandler,
  } = gameProps;

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.gameHeader}>
        <Grid item xs>
          <Box className={classes.timerBox}>
            <Timer currentSeconds={currentSeconds} />
          </Box>
        </Grid>
        <Grid item xs justify="center" alignItems="center" container>
          <Box className={classes.paper}>
            <QuizDisplay word={quizWord} isSecret />
          </Box>
        </Grid>
        <Grid item xs className={classes.topRightGrid}>
          <Box className={classes.exitButtonContainer}>
            <Link to="/" onClick={exitButtonHandler}>
              <ExitButton />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={0} className={classes.bottomGrid}>
        <Grid
          item
          xs={2}
          className={[classes.bottomGridContent, classes.leftGridContent]}
        >
          <Box className={playerPanelContainerClasses}>
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
          className={[classes.bottomGridContent, classes.mobileFullWidth]}
        >
          <StreamingPanel
            words={candidateWords}
            isVisible={false}
            className={classes.mobileFullWidth}
          />
          <Box className={readyButtonContainerClasses}>
            <ReadyButton onClick={readyButtonHandler}>
              {localPlayer && localPlayer.isReady ? 'Cancel' : 'Ready'}
            </ReadyButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          className={[
            classes.bottomGridContent,
            classes.desktopViewHide,
            classes.mobileChattingPanel,
          ]}
        >
          <MobileChattingPanel clientManager={clientManager} />
        </Grid>
        <Grid
          item
          xs={3}
          className={[classes.bottomGridContent, classes.chattingContainer]}
        >
          <ChattingPanel clientManager={clientManager} />
        </Grid>
      </Grid>
    </div>
  );
};

export default GamePresentation;

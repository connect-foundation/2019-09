/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { StreamerVideo, GameMessageBox } from '../../components';
import ScoreBoard from '../ScoreBoard';

const StreamingPanelPresentation = ({ streamingPanelProps }) => {
  const {
    classes,
    showScoreBoard,
    showGameMessageBox,
    gameMessageContent,
    stream,
    videoVisibility,
    scoreList,
    message,
  } = streamingPanelProps;
  return (
    <Box className={classes.container}>
      {videoVisibility ? <StreamerVideo stream={stream} /> : ''}
      {showScoreBoard && <ScoreBoard scoreRows={scoreList} title={message} />}
      {showGameMessageBox && <GameMessageBox content={gameMessageContent} />}
    </Box>
  );
};

StreamingPanelPresentation.defaultProps = {
  streamingPanelProps: {},
  classes: {},
  showScoreBoard: false,
  showGameMessageBox: false,
  gameMessageContent: {},
  stream: {},
  videoVisibility: false,
};

StreamingPanelPresentation.propTypes = {
  streamingPanelProps: PropTypes.object,
  classes: PropTypes.object,
  showScoreBoard: PropTypes.bool,
  showGameMessageBox: PropTypes.bool,
  gameMessageContent: PropTypes.object,
  stream: PropTypes.object,
  videoVisibility: PropTypes.bool,
};

export default StreamingPanelPresentation;

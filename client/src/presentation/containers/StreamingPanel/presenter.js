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
    // quizCandidates,
    // quizCandidateButtonHandler,
  } = streamingPanelProps;
  return (
    <Box className={classes.container}>
      {videoVisibility ? <StreamerVideo stream={stream} /> : ''}
      {showScoreBoard && <ScoreBoard scoreRows={scoreList} title={message} />}
      {showGameMessageBox && (
        <GameMessageBox
          content={gameMessageContent}
          // quizCandidates={quizCandidates}
          // quizCandidateButtonHandler={quizCandidateButtonHandler}
        />
      )}
    </Box>
  );
};

StreamingPanelPresentation.propTypes = {
  streamingPanelProps: PropTypes.shape.isRequired,
  classes: PropTypes.shape.isRequired,
  showScoreBoard: PropTypes.bool.isRequired,
  showGameMessageBox: PropTypes.bool.isRequired,
  gameMessageContent: PropTypes.shape.isRequired,
  stream: PropTypes.shape.isRequired,
  videoVisibility: PropTypes.bool.isRequired,
  // quizCandidates: PropTypes.arrayOf.isRequired,
  // quizCandidateButtonHandler: PropTypes.func.isRequired,
};

export default StreamingPanelPresentation;

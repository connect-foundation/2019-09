import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { StreamerVideo, GameMessageBox } from '../../components';
import ScoreBoard from '../ScoreBoard';
import { scoreRows } from '../../../demoData';

const StreamingPanelPresentation = ({ streamingPanelProps }) => {
  const {
    classes,
    showScoreBoard,
    showGameMessageBox,
    gameMessageContent,
  } = streamingPanelProps;
  return (
    <Box className={classes.container}>
      <StreamerVideo />
      {showScoreBoard && <ScoreBoard scoreRows={scoreRows} />}
      {showGameMessageBox && <GameMessageBox content={gameMessageContent} />}
    </Box>
  );
};

StreamingPanelPresentation.propTypes = {
  streamingPanelProps: PropTypes.shape.isRequired,
  classes: PropTypes.shape.isRequired,
  showScoreBoard: PropTypes.bool.isRequired,
  showGameMessageBox: PropTypes.bool.isRequired,
  gameMessageContent: PropTypes.shape.isRequired,
};

export default StreamingPanelPresentation;

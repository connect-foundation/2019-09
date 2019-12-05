/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import WordCandidates from '../WordCandidates';
import { CenterTimer } from '../../components';
import walkingCatImageSource from '../../../assets/cat.gif';
import { STREAMER_LOADING_MESSAGE } from '../../../config';
import StreamingPanelPresentation from './presenter';
import useStyles from './style';

const makeGameMessageContent = ({
  messageType,
  currentSeconds,
  words,
  loadingImageSource,
  loadingMessage,
}) => {
  if (messageType === 'streamerLoading') {
    return {
      center: <img alt="loading" src={loadingImageSource} />,
      bottom: <p>{loadingMessage}</p>,
    };
  }
  if (messageType === 'centerTimer') {
    return {
      center: <CenterTimer currentSeconds={currentSeconds} />,
      bottom: <WordCandidates words={words} />,
    };
  }
  return [];
};

const StreamingPanel = ({
  words,
  showScoreBoard,
  showGameMessageBox,
  messageType,
  currentSeconds,
}) => {
  let gameMessageContent;
  if (showGameMessageBox) {
    gameMessageContent = makeGameMessageContent({
      messageType,
      currentSeconds,
      words,
      loadingImageSource: walkingCatImageSource,
      loadingMessage: STREAMER_LOADING_MESSAGE,
    });
  }

  const streamingPanelProps = {
    classes: useStyles(),
    showScoreBoard,
    showGameMessageBox,
    gameMessageContent,
  };

  return (
    <StreamingPanelPresentation streamingPanelProps={streamingPanelProps} />
  );
};

StreamingPanel.propTypes = {
  words: PropTypes.array.isRequired,
  messageType: PropTypes.string.isRequired,
  currentSeconds: PropTypes.number.isRequired,
  showScoreBoard: PropTypes.bool.isRequired,
  showGameMessageBox: PropTypes.bool.isRequired,
};

export default StreamingPanel;

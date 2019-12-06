/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../contexts';
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
  quizCandidateButtonHandler,
}) => {
  if (messageType === 'streamerLoading') {
    return {
      center: <img alt="loading" src={loadingImageSource} />,
      bottom: <p>{loadingMessage}</p>,
    };
  }
  if (messageType === 'quizSelection') {
    return {
      center: <CenterTimer currentSeconds={currentSeconds} />,
      bottom: (
        <WordCandidates words={words} onClick={quizCandidateButtonHandler} />
      ),
    };
  }
  return [];
};

const StreamingPanel = ({ showScoreBoard, clientManager }) => {
  const {
    quizCandidatesNotice,
    stream,
    isVideoVisible,
    currentSeconds,
  } = useContext(GlobalContext);

  let showGameMessageBox = false;
  let messageType;
  const { isVisible, quizCandidates } = quizCandidatesNotice;
  const quizCandidateButtonHandler = quiz => {
    clientManager.selectQuiz(quiz);
  };

  if (isVisible) {
    messageType = 'quizSelection';
    showGameMessageBox = true;
  }

  let gameMessageContent;
  if (showGameMessageBox) {
    gameMessageContent = makeGameMessageContent({
      messageType,
      currentSeconds,
      loadingImageSource: walkingCatImageSource,
      loadingMessage: STREAMER_LOADING_MESSAGE,
      words: quizCandidates,
      quizCandidateButtonHandler,
    });
  }

  const streamingPanelProps = {
    classes: useStyles(),
    showScoreBoard,
    showGameMessageBox,
    gameMessageContent,
    stream,
    isVideoVisible,
  };

  return (
    <StreamingPanelPresentation streamingPanelProps={streamingPanelProps} />
  );
};

StreamingPanel.propTypes = {
  clientManager: PropTypes.shape.isRequired,
  showScoreBoard: PropTypes.bool.isRequired,
};

export default StreamingPanel;

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

const StreamingPanel = ({ clientManager }) => {
  const {
    quizCandidatesNotice,
    stream,
    isVideoVisible,
    currentSeconds,
    scoreNotice,
  } = useContext(GlobalContext);

  let showGameMessageBox = false;
  let showScoreBoard = false;
  let messageType;
  const { isVisible, quizCandidates } = quizCandidatesNotice;
  const { message, scoreList } = scoreNotice;
  const isScoreBoardVisible = scoreNotice.isVisible;
  const quizCandidateButtonHandler = quiz => {
    clientManager.selectQuiz(quiz);
  };

  if (isVisible) {
    messageType = 'quizSelection';
    showGameMessageBox = true;
  }

  if (isScoreBoardVisible) {
    messageType = 'scoreBoard';
    showScoreBoard = true;
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
    scoreList,
    message,
  };

  return (
    <StreamingPanelPresentation streamingPanelProps={streamingPanelProps} />
  );
};

StreamingPanel.propTypes = {
  clientManager: PropTypes.shape.isRequired,
};

export default StreamingPanel;

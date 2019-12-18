/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../contexts';
import WordCandidates from '../WordCandidates';
import { CenterTimer } from '../../components';
import walkingCatImageSource from '../../../assets/cat.gif';
import StreamingPanelPresentation from './presenter';
import useStyles from './style';
import { STREAMING_PANEL_MESSAGE_TYPE } from '../../../constants/game';

const makeGameMessageContent = ({
  messageType,
  currentSeconds,
  words,
  loadingImageSource,
  loadingMessage,
  quizCandidateButtonHandler,
}) => {
  if (messageType === STREAMING_PANEL_MESSAGE_TYPE.STREAMER_LOADING) {
    return {
      center: <img alt="loading" src={loadingImageSource} />,
      bottom: <p>{loadingMessage}</p>,
    };
  }
  if (messageType === STREAMING_PANEL_MESSAGE_TYPE.QUIZ_SELECTION) {
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
    videoVisibility,
    currentSeconds,
    scoreNotice,
    messageNotice,
  } = useContext(GlobalContext);

  let showGameMessageBox = false;
  let showScoreBoard = false;
  let messageType;
  const { quizCandidates } = quizCandidatesNotice;
  const { message, scoreList } = scoreNotice;
  const quizCandidateButtonHandler = quiz => {
    clientManager.selectQuiz(quiz);
  };

  if (quizCandidatesNotice.isVisible) {
    messageType = STREAMING_PANEL_MESSAGE_TYPE.QUIZ_SELECTION;
    showGameMessageBox = true;
  }

  if (scoreNotice.isVisible) {
    messageType = STREAMING_PANEL_MESSAGE_TYPE.SCORE_BOARD;
    showScoreBoard = true;
  }

  if (messageNotice.isVisible) {
    messageType = STREAMING_PANEL_MESSAGE_TYPE.STREAMER_LOADING;
    showGameMessageBox = true;
  }

  let gameMessageContent;
  if (showGameMessageBox) {
    gameMessageContent = makeGameMessageContent({
      messageType,
      currentSeconds,
      loadingImageSource: walkingCatImageSource,
      loadingMessage: messageNotice.message,
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
    videoVisibility,
    scoreList,
    message,
  };

  return (
    <StreamingPanelPresentation streamingPanelProps={streamingPanelProps} />
  );
};

StreamingPanel.defaultProps = {
  clientManager: {},
};

StreamingPanel.propTypes = {
  clientManager: PropTypes.object,
};

export default StreamingPanel;

import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../contexts';
import WordCandidates from './WordCandidates';
import { StreamerVideo } from '../components';
import { STYLE_COLORS } from '../../utils';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    height: '100%',
    maxHeight: '48rem',
    backgroundColor: STYLE_COLORS.PANEL_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.5)',
    borderRadius: '0.3rem',
  },
}));

const StreamingPanel = ({ clientManager }) => {
  const { quizCandidatesNotice } = useContext(GlobalContext);
  const { isVisible, quizCandidates } = quizCandidatesNotice;

  const classes = useStyles();

  const quizCandidateButtonHandler = quiz => {
    clientManager.selectQuiz(quiz);
  };

  return (
    <Container className={classes.container}>
      <StreamerVideo />
      {isVisible ? (
        <WordCandidates
          words={quizCandidates}
          onClick={quizCandidateButtonHandler}
        />
      ) : (
        ''
      )}
    </Container>
  );
};

StreamingPanel.propTypes = {
  clientManager: PropTypes.shape.isRequired,
};

export default StreamingPanel;

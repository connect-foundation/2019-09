/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import WordCandidates from './WordCandidates';
import { StreamerVideo } from '../components';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
  },
}));

const StreamingPanel = ({ words, isVisible }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <StreamerVideo />
      {isVisible ? <WordCandidates words={words} /> : ''}
    </Container>
  );
};

StreamingPanel.propTypes = {
  words: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default StreamingPanel;

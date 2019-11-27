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
    height: '100%',
    maxHeight: '48rem',
    border: '1px solid #e7e7e7',
    backgroundColor: '#F3F4FE',
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

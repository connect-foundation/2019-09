/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Candidates from './Candidates';
import { StreamerVideo } from '../components';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
  },
}));

const StreamingPanel = ({ words, isStreamer }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <StreamerVideo />
      {isStreamer ? <Candidates words={words} /> : ''}
    </Container>
  );
};

StreamingPanel.propTypes = {
  words: PropTypes.array.isRequired,
  isStreamer: PropTypes.bool.isRequired,
};

export default StreamingPanel;

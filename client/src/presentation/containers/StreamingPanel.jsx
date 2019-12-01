/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
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

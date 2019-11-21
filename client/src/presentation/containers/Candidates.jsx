/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { LargeButton } from '../components';

const useStyles = makeStyles(() => ({
  candidateContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: '1rem',
    left: 0,
    right: 0,
  },
}));

const Candidates = ({ words }) => {
  const candidateWords = words;
  const classes = useStyles();
  const candidateButtonStyle = {
    width: '10rem',
    height: '3rem',
  };
  return (
    <Container className={classes.candidateContainer}>
      {candidateWords.map(candidate => {
        return (
          <LargeButton
            style={candidateButtonStyle}
            text={candidate}
            onClick={() => {}}
          />
        );
      })}
    </Container>
  );
};

Candidates.propTypes = {
  words: PropTypes.array.isRequired,
};

export default Candidates;

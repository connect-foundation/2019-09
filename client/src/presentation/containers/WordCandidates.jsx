import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CandidateButton } from '../components';

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

const WordCandidates = ({ words, onClick }) => {
  const wordCandidates = words;
  const classes = useStyles();
  return (
    <Container className={classes.candidateContainer}>
      {wordCandidates.map(wordCandidate => {
        return (
          <CandidateButton key={wordCandidate} onClick={onClick}>
            {wordCandidate}
          </CandidateButton>
        );
      })}
    </Container>
  );
};

WordCandidates.propTypes = {
  words: PropTypes.arrayOf.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default WordCandidates;

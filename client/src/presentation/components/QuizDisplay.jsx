import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UnderlinedLetter from './UnderlinedLetter';
import UnderlinedSpace from './UnderlinedSpace';

const QuizDisplay = ({ word, isSecret }) => {
  const useStyles = makeStyles(() => ({
    quizDisplay: {
      '& > *': {
        marginRight: '0.5rem',
        color: '#ffffff',
      },
    },
  }));
  const classes = useStyles();
  const quizWord = word;
  const letters = quizWord.split('');

  return (
    <div className={classes.quizDisplay}>
      {isSecret
        ? letters.map((letter, index) => {
            const key = `${letter}${index}`;
            return <UnderlinedSpace key={key} />;
          })
        : letters.map((letter, index) => {
            const key = `${letter}${index}`;
            return <UnderlinedLetter letter={letter} key={key} />;
          })}
    </div>
  );
};

QuizDisplay.propTypes = {
  word: PropTypes.string.isRequired,
  isSecret: PropTypes.bool.isRequired,
};

export default QuizDisplay;
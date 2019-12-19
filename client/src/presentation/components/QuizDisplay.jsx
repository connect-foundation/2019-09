import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UnderlinedLetter from './UnderlinedLetter';
import UnderlinedSpace from './UnderlinedSpace';
import styleColors from '../../constants/styleColors';

const QuizDisplay = ({ quiz, quizLength }) => {
  const useStyles = makeStyles(() => ({
    quizDisplay: {
      '& > *': {
        marginRight: '0.5rem',
        color: styleColors.PURE_WHITE_COLOR,
      },
    },
  }));
  const classes = useStyles();
  const quizToDisplay = typeof quiz === 'undefined' ? '' : quiz;
  const letters =
    quizToDisplay !== ''
      ? quizToDisplay.split()
      : new Array(quizLength).fill(' ');

  return (
    <div className={classes.quizDisplay}>
      {quizToDisplay === ''
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
  quiz: PropTypes.string.isRequired,
  quizLength: PropTypes.number.isRequired,
};

export default QuizDisplay;

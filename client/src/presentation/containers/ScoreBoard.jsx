import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ScoreBoardScoreRow } from '../components';
import styleColors from '../../constants/styleColors';
import { DEFAULT_SCOREBOARD_TITLE } from '../../constants/message';

const useStyle = makeStyles({
  scoreBoard: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: styleColors.BASE_BLACK_COLOR_TRANSLUCENT,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: '4rem',
    textAlign: 'center',
    color: styleColors.PURE_WHITE_COLOR,
  },
});

const ScoreBoard = ({ title, scoreRows }) => {
  const classes = useStyle();

  const scoreRowsComponents = scoreRows.map(scoreRow => {
    return (
      <ScoreBoardScoreRow nickname={scoreRow.nickname} score={scoreRow.score} />
    );
  });

  return (
    <Box className={classes.scoreBoard}>
      <Typography className={classes.title}>
        {title || DEFAULT_SCOREBOARD_TITLE}
      </Typography>
      <Box className={classes.scoreRows}>{scoreRowsComponents}</Box>
    </Box>
  );
};

ScoreBoard.propTypes = {
  title: PropTypes.string.isRequired,
  scoreRows: PropTypes.shape.isRequired,
};

export default ScoreBoard;

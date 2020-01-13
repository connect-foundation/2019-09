import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import styleColors from '../../constants/styleColors';

const useStyle = makeStyles({
  gameMessageBox: {
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
  imageComponentWrapper: {
    maxHeight: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
  textComponentWrapper: {
    width: '100%',
    textAlign: 'center',
    '& > *': {
      fontSize: '3rem',
      color: styleColors.PURE_WHITE_COLOR,
    },
  },
});

const GameMessageBox = ({ content }) => {
  const classes = useStyle();

  return (
    <Box className={classes.gameMessageBox}>
      <Box className={classes.imageComponentWrapper}>
        {content.center && content.center}
      </Box>
      <Box className={classes.textComponentWrapper}>
        {content.bottom && content.bottom}
      </Box>
    </Box>
  );
};

GameMessageBox.propTypes = {
  content: PropTypes.shape.isRequired,
};

export default GameMessageBox;

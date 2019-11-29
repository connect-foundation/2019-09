import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { STYLE_COLORS } from '../../utils';

const useStyles = makeStyles({
  message: {
    fontSize: '1.4rem',
    color: STYLE_COLORS.WHITE_COLOR,
    wordWrap: 'break-word',
  },
});

const Message = ({ children }) => {
  const classes = useStyles();
  return (
    <Box component="span" className={classes.message}>
      {children}
    </Box>
  );
};

Message.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Message;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  message: {},
});

const Message = ({ message }) => {
  const classes = useStyles();
  return (
    <Box component="span" className={classes.message}>
      {message}
    </Box>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  nickname: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
  },
});

const Nickname = ({ children }) => {
  const classes = useStyles();
  return (
    <Box component="span" className={classes.nickname}>
      {children}
    </Box>
  );
};

Nickname.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Nickname;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const UnderlinedSpace = () => {
  const useStyles = makeStyles(() => ({
    underlinedEmpty: {
      textDecoration: 'underline',
      fontSize: '2rem',
      fontWeight: 'bold',
      minWidth: '2rem',
    },
  }));

  const classes = useStyles();

  return <span className={classes.underlinedEmpty}>&nbsp;&nbsp;</span>;
};

export default UnderlinedSpace;

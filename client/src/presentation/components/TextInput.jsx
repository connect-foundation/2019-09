/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const TextInput = ({ label, style }) => {
  const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      boxSizing: 'border-box',
      width: style.width || '',
    },
  }));

  const classes = useStyles();

  return (
    <TextField label={label} className={classes.textField} variant="outlined" />
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

export default TextInput;

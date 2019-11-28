import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const TextInput = ({ label, style, value, textChangeHandler, onKeyPress }) => {
  const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      boxSizing: 'border-box',
      width: style.width || '',
      '& > *': {
        fontSize: '1.2rem',
        fontWeight: '600',
      },
    },
  }));

  const classes = useStyles();

  return (
    <TextField
      onKeyPress={onKeyPress}
      onChange={e => {
        textChangeHandler(e.target.value);
      }}
      label={label}
      className={classes.textField}
      variant="outlined"
      value={value}
    />
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.shape.isRequired,
  value: PropTypes.string.isRequired,
  textChangeHandler: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

export default TextInput;

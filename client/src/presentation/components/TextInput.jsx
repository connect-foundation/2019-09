import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { DEFAULT_TEXT_INPUT_MAX_LENGTH } from '../../constants/inputConstraints';

const TextInput = ({
  label,
  style,
  value,
  textChangeHandler,
  onKeyPress,
  maxLength,
}) => {
  const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      boxSizing: 'border-box',
      width: style.width || '',
      '& > *': {
        fontSize: '1.6rem',
        fontWeight: '600',
      },
    },
  }));

  const classes = useStyles();

  return (
    <TextField
      onKeyPress={onKeyPress}
      onChange={textChangeHandler}
      label={label}
      className={classes.textField}
      variant="outlined"
      value={value}
      inputProps={{
        maxLength: maxLength || `${DEFAULT_TEXT_INPUT_MAX_LENGTH}`,
      }}
    />
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.shape.isRequired,
  value: PropTypes.string.isRequired,
  textChangeHandler: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  maxLength: PropTypes.string.isRequired,
};

export default TextInput;

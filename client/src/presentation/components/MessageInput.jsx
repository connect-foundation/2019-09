import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  input: {
    fontSize: '1.5rem ',
    flex: 8,
  },
});
const MessageInput = ({ value, valueChangeHandler }) => {
  const classes = useStyles();
  return (
    <Input
      value={value}
      onChange={e => {
        valueChangeHandler(e.target.value);
      }}
      placeholder="Please enter a message."
      className={classes.input}
      inputProps={{
        'aria-label': 'description',
      }}
    />
  );
};

MessageInput.propTypes = {
  valueChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MessageInput;

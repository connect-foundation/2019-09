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
const MessageInput = ({ value, onChange, onKeyUp }) => {
  const classes = useStyles();
  return (
    <Input
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      placeholder="Please enter a message."
      className={classes.input}
      inputProps={{
        'aria-label': 'description',
      }}
    />
  );
};

MessageInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
};

export default MessageInput;

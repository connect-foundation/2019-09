import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { STYLE_COLORS } from '../../utils';

const useStyles = makeStyles({
  input: {
    color: STYLE_COLORS.BASE_BLACK_COLOR,
    fontSize: '1.5rem ',
    flex: 8,
  },
});
const MessageInput = ({ value, onChange, onKeyPress, isChattingDisabled }) => {
  const classes = useStyles();
  return (
    <Input
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder="Please enter a message."
      className={classes.input}
      inputProps={{
        'aria-label': 'description',
      }}
      disabled={isChattingDisabled}
    />
  );
};

MessageInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  isChattingDisabled: PropTypes.bool.isRequired,
};

export default MessageInput;

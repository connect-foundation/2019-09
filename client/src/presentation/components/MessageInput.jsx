import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { STYLE_COLORS } from '../../utils';
import { DEFAULT_TEXT_INPUT_MAX_LENGTH } from '../../constants/inputConstraints';

const useStyles = makeStyles({
  input: {
    color: STYLE_COLORS.BASE_BLACK_COLOR,
    fontSize: '1.5rem ',
    flex: 8,
  },
});
const MessageInput = ({
  value,
  onChange,
  onKeyPress,
  chattingDisabled,
  maxLength,
}) => {
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
        maxLength: maxLength || `${DEFAULT_TEXT_INPUT_MAX_LENGTH}`,
      }}
      disabled={chattingDisabled}
    />
  );
};

MessageInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  chattingDisabled: PropTypes.bool.isRequired,
  maxLength: PropTypes.string.isRequired,
};

export default MessageInput;

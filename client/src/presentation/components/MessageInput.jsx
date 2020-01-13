import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import styleColors from '../../constants/styleColors';
import { DEFAULT_TEXT_INPUT_MAX_LENGTH } from '../../constants/inputConstraints';
import { CHATTING_INPUT_PLACEHOLER } from '../../constants/chatting';

const useStyles = makeStyles({
  input: {
    color: styleColors.BASE_BLACK_COLOR,
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
      placeholder={CHATTING_INPUT_PLACEHOLER}
      className={classes.input}
      inputProps={{
        'aria-label': 'description',
        maxLength: maxLength || `${DEFAULT_TEXT_INPUT_MAX_LENGTH}`,
      }}
      disabled={chattingDisabled}
    />
  );
};

MessageInput.defaultProps = {
  maxLength: 0,
};

MessageInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  chattingDisabled: PropTypes.bool.isRequired,
  maxLength: PropTypes.number,
};

export default MessageInput;

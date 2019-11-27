import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  input: {
    fontSize: '1.5rem ',
    flex: 8,
  },
});
const MessageInput = () => {
  const classes = useStyles();
  return (
    <Input
      placeholder="Please enter a message."
      className={classes.input}
      inputProps={{
        'aria-label': 'description',
      }}
    />
  );
};

export default MessageInput;

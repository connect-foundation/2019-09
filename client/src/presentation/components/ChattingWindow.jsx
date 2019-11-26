import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ChattingRow from './ChattingRow';

const useStyle = makeStyles({
  chattingWindow: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    right: '1rem',
    padding: '1rem',
    '& > *': {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
  },
});

const ChattingWindow = ({ chatList }) => {
  const classes = useStyle();
  return (
    <Box className={classes.chattingWindow}>
      {chatList.map((chat, index) => {
        const key = `${index}${chat.nickname}`;
        return (
          <ChattingRow
            key={key}
            nickname={chat.nickname}
            message={chat.message}
          />
        );
      })}
    </Box>
  );
};

/**
 * propstype 지정시 array는 arrayOf / object는 shape
 */
ChattingWindow.propTypes = {
  chatList: PropTypes.arrayOf.isRequired,
};

export default ChattingWindow;

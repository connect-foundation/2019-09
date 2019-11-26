import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ChattingRow from './ChattingRow';

const useStyle = makeStyles({
  chattingWindow: {
    padding: '1rem',
    '& > *': {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
  },
});

const ChattringWindow = ({ chatList }) => {
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
ChattringWindow.propTypes = {
  chatList: PropTypes.arrayOf.isRequired,
};

export default ChattringWindow;

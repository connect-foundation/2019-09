import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ChattingRow from './ChattingRow';

const useStyle = makeStyles({
  chattingWindow: {
    overflowY: 'auto',
    padding: '1rem',
    height: '90%',
    boxSizing: 'border-box',
    '& > *': {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
  },
});

const ChattingWindow = ({ chattingList }) => {
  const classes = useStyle();
  const messageEndRef = useRef(null);
  const scrollToButtom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(scrollToButtom, [chattingList]);
  return (
    <Box className={classes.chattingWindow}>
      {chattingList.map((chat, index) => {
        const key = `${index}${chat.nickname}`;
        return (
          <ChattingRow
            key={key}
            nickname={chat.nickname}
            message={chat.message}
          />
        );
      })}
      <div ref={messageEndRef} />
    </Box>
  );
};

/**
 * propstype 지정시 array는 arrayOf / object는 shape
 */
ChattingWindow.propTypes = {
  chattingList: PropTypes.arrayOf.isRequired,
};

export default ChattingWindow;

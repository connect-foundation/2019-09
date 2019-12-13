import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { ChattingWindow } from '../components';
import { GlobalContext } from '../../contexts';

const useStyle = makeStyles(() => ({
  mobileChattingPanel: {
    height: '100%',
    border: 'none',
    wordWrap: 'break-word',
  },
  mobileChattingWindow: {
    height: '100%',
  },
}));

const MobileChattingPanel = () => {
  const classes = useStyle();
  const { chattingList } = useContext(GlobalContext);

  return (
    <Box className={classes.mobileChattingPanel}>
      <Box className={classes.mobileChattingWindow}>
        <ChattingWindow chattingList={chattingList} />
      </Box>
    </Box>
  );
};

export default MobileChattingPanel;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { ChattingWindow, InputWindow } from '../components';
import { GlobalContext } from '../../contexts';

const useStyle = makeStyles({
  chattingPanel: {
    height: '48rem',
    position: 'relative',
    border: '1px solid #e7e7e7',
    backgroundColor: '#F3F4FE',
  },
});

const ChattingPanel = ({ clientManager }) => {
  const classes = useStyle();
  const { chattingList, nickname } = useContext(GlobalContext);
  return (
    <Box className={classes.chattingPanel}>
      <ChattingWindow chattingList={chattingList} />
      <InputWindow clientManager={clientManager} nickname={nickname} />
    </Box>
  );
};

ChattingPanel.propTypes = {
  clientManager: PropTypes.shape.isRequired,
};

export default ChattingPanel;

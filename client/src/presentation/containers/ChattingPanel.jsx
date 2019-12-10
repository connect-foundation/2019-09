import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { ChattingWindow, InputWindow } from '../components';
import { GlobalContext } from '../../contexts';
import { browserLocalStorage, STYLE_COLORS } from '../../utils';

const useStyle = makeStyles(theme => ({
  chattingPanel: {
    height: '100%',
    position: 'relative',
    backgroundColor: STYLE_COLORS.PANEL_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.5)',
    borderRadius: '0.3rem',
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
  chattingWindow: {
    height: '90%',
    overflow: 'auto',
    wordWrap: 'break-word',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const ChattingPanel = ({ clientManager }) => {
  const classes = useStyle();
  const { chattingList, isChattingDisabled } = useContext(GlobalContext);
  const nickname = browserLocalStorage.getNickname();

  return (
    <Box className={classes.chattingPanel}>
      <Box className={classes.chattingWindow}>
        <ChattingWindow chattingList={chattingList} />
      </Box>
      <InputWindow
        clientManager={clientManager}
        nickname={nickname}
        isChattingDisabled={isChattingDisabled}
      />
    </Box>
  );
};

ChattingPanel.propTypes = {
  clientManager: PropTypes.shape.isRequired,
};

export default ChattingPanel;

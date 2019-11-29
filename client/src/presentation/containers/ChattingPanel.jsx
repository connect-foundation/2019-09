import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { ChattingWindow, InputWindow } from '../components';
import { GlobalContext } from '../../contexts';
import { browserLocalStorage, STYLE_COLORS } from '../../utils';

const useStyle = makeStyles({
  chattingPanel: {
    height: '48rem',
    position: 'relative',
    backgroundColor: STYLE_COLORS.PANEL_BACKGROUND_COLOR,
  },
});

const ChattingPanel = ({ clientManager }) => {
  const classes = useStyle();
  const { chattingList } = useContext(GlobalContext);
  const nickname = browserLocalStorage.getNickname();

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

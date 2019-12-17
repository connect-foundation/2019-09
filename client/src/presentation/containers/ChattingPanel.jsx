import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { ChattingWindow, InputWindow } from '../components';
import { GlobalContext } from '../../contexts';
import styleColors from '../../constants/styleColors';

const useStyle = makeStyles(theme => ({
  chattingPanel: {
    height: '100%',
    position: 'relative',
    backgroundColor: styleColors.PANEL_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.5)',
    borderRadius: '0.3rem',
    [theme.breakpoints.down('xs')]: {
      borderRadius: '0',
    },
  },
  chattingWindow: {
    height: '90%',
    overflow: 'auto',
    wordWrap: 'break-word',
  },
}));

const ChattingPanel = ({ clientManager, mobileChattingPanelVisibility }) => {
  const classes = useStyle();
  const { chattingList, chattingDisabled } = useContext(GlobalContext);

  return (
    <Box className={classes.chattingPanel}>
      {!mobileChattingPanelVisibility && (
        <Box className={classes.chattingWindow}>
          <ChattingWindow chattingList={chattingList} />
        </Box>
      )}
      <InputWindow
        clientManager={clientManager}
        chattingDisabled={chattingDisabled}
      />
    </Box>
  );
};

ChattingPanel.propTypes = {
  clientManager: PropTypes.shape.isRequired,
  mobileChattingPanelVisibility: PropTypes.bool.isRequired,
};

export default ChattingPanel;

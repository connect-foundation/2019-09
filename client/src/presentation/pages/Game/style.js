import { makeStyles } from '@material-ui/core/styles';
import { STYLE_COLORS } from '../../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
    height: '100%',
    background: STYLE_COLORS.BACKGROUND_COLOR,
    overflow: 'auto',
  },
  timerBox: {
    padding: '1rem 2rem',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  gameHeader: {
    backgroundColor: STYLE_COLORS.THEME_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.7)',
  },
  videoBox: {
    padding: theme.spacing(2),
    height: '100%',
  },
  leftGridContent: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      position: 'absolute',
      zIndex: '1',
    },
  },
  playerPanelContainer: {
    display: 'block',
  },
  playerPanelButton: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'relative',
      top: '1rem',
      left: '1rem',
    },
  },
  mobileViewHide: {
    display: 'none',
  },
  topRightGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  exitButtonContainer: {
    padding: '0.5rem 2rem',
  },
  bottomGrid: {
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'relative',
    },
  },
  bottomGridContent: {
    padding: '1rem',
  },
  mobileFullWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: 'none',
    },
  },
  chattingContainer: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: 'none',
      position: 'fixed',
      height: 'auto',
      bottom: '0',
    },
  },
  desktopViewHide: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  mobileChattingPanel: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    overflow: 'auto',
  },
  mobileReadyButtonContainer: {
    width: '8rem',
    position: 'absolute',
    bottom: '2rem',
    left: '2rem',
  },
  gameStartHide: {
    display: 'none',
  },
  streamingPanelGrid: {
    minHeight: '20rem',
  },
}));

export default useStyles;

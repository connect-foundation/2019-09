import { makeStyles } from '@material-ui/core/styles';
import { STYLE_COLORS } from '../../../utils';
import { MOBILE_PANEL_HEIGHT } from '../../../config';

const useStyles = makeStyles(theme => ({
  root: props => ({
    flexGrow: 1,
    margin: 0,
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      height: `${props.gamePageRootHeight / 10}rem`,
    },
    overflow: 'auto',
  }),
  timerBox: {
    padding: '1rem 2rem',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  gameHeader: {
    backgroundColor: STYLE_COLORS.THEME_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.7)',
    height: '10%',
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
    height: '100%',
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
    height: '90%',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'relative',
    },
  },
  bottomGridContent: {
    padding: '1rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  mobileFullWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: 'none',
    },
  },
  chattingContainer: {
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '10%',
      maxWidth: 'none',
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
    height: MOBILE_PANEL_HEIGHT,
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
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      height: MOBILE_PANEL_HEIGHT,
    },
  },
}));

export default useStyles;

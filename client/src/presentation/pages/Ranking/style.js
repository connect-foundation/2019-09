import { makeStyles } from '@material-ui/core/styles';
import backgroundImageSource from '../../../assets/background.png';

const useStyle = makeStyles({
  mainPage: {
    width: '40rem',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: '2rem',
    },
  },
  mainPageWrapper: {
    margin: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImageSource})`,
    overflow: 'auto',
  },
  exitButtonWrapper: {
    position: 'fixed',
    top: '1.5rem',
    right: '2.5rem',
  },
});

export default useStyle;

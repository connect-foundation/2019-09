import { makeStyles } from '@material-ui/core/styles';

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
    overflow: 'auto',
  },
  exitButtonWrapper: {
    position: 'fixed',
    top: '1.5rem',
    right: '2.5rem',
  },
  MoreButton: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
});

export default useStyle;
